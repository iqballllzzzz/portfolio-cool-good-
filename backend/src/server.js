const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// Helper: check password
function checkPassword(password) {
  const profile = db.prepare('SELECT passwordHash FROM profile LIMIT 1').get();
  const stored = profile?.passwordHash || 'admin123';
  return password === stored;
}

// ========== PROFILE ENDPOINTS ==========

// GET profile
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profile LIMIT 1').get();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    profile.skillsLabels = JSON.parse(profile.skillsLabels || '[]');
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST update profile
app.post('/api/profile/update', (req, res) => {
  try {
    const { password, ...updates } = req.body;
    
    if (!checkPassword(password)) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const profile = db.prepare('SELECT id FROM profile LIMIT 1').get();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const fields = [];
    const values = {};
    
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = @${key}`);
        values[key] = key === 'skillsLabels' ? JSON.stringify(value) : value;
      }
    }

    if (fields.length > 0) {
      fields.push('updatedAt = @updatedAt');
      values.updatedAt = Date.now();
      values.id = profile.id;

      const sql = `UPDATE profile SET ${fields.join(', ')} WHERE id = @id`;
      db.prepare(sql).run(values);
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST check password
app.post('/api/profile/check-password', (req, res) => {
  try {
    const { password } = req.body;
    res.json({ ok: checkPassword(password) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST set password
app.post('/api/profile/set-password', (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!checkPassword(currentPassword)) {
      return res.status(401).json({ error: 'Password lama salah' });
    }

    db.prepare('UPDATE profile SET passwordHash = ?, updatedAt = ? WHERE id = 1')
      .run(newPassword, Date.now());

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload avatar
app.post('/api/profile/upload-avatar', upload.single('file'), (req, res) => {
  try {
    const { password } = req.body;
    
    if (!checkPassword(password)) {
      return res.status(401).json({ error: 'Password salah' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const url = `/uploads/${req.file.filename}`;
    
    db.prepare('UPDATE profile SET avatarUrl = ?, updatedAt = ? WHERE id = 1')
      .run(url, Date.now());

    res.json({ ok: true, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== MEDIA ENDPOINTS ==========

// GET all media
app.get('/api/media', (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media ORDER BY orderNum ASC').all();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET media by kind
app.get('/api/media/:kind', (req, res) => {
  try {
    const { kind } = req.params;
    const media = db.prepare('SELECT * FROM media WHERE kind = ? ORDER BY orderNum ASC').all(kind);
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload media
app.post('/api/media/upload', upload.single('file'), (req, res) => {
  try {
    const { password, kind, title, url: externalUrl } = req.body;
    
    if (!checkPassword(password)) {
      return res.status(401).json({ error: 'Password salah' });
    }

    let url = externalUrl;
    let storageId = null;

    if (req.file) {
      url = `/uploads/${req.file.filename}`;
      storageId = req.file.filename;
    }

    if (!url) {
      return res.status(400).json({ error: 'Perlu file atau URL' });
    }

    const maxOrder = db.prepare('SELECT MAX(orderNum) as max FROM media').get();
    const orderNum = (maxOrder.max || 0) + 1;

    const result = db.prepare(`
      INSERT INTO media (kind, url, storageId, title, orderNum, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(kind, url, storageId, title || null, orderNum, Date.now());

    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST update media
app.post('/api/media/update/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { password, title, orderNum } = req.body;
    
    if (!checkPassword(password)) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (orderNum !== undefined) {
      updates.push('orderNum = ?');
      values.push(orderNum);
    }

    if (updates.length > 0) {
      values.push(id);
      db.prepare(`UPDATE media SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE media
app.delete('/api/media/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    
    if (!checkPassword(password)) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const media = db.prepare('SELECT storageId FROM media WHERE id = ?').get(id);
    
    if (media?.storageId) {
      const filePath = path.join(uploadDir, media.storageId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    db.prepare('DELETE FROM media WHERE id = ?').run(id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
