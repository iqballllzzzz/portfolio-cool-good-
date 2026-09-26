const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../portfolio.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    discordUsername TEXT NOT NULL,
    email TEXT NOT NULL,
    avatarUrl TEXT,
    heroRole TEXT NOT NULL,
    heroTagline TEXT NOT NULL,
    heroNameTop TEXT NOT NULL,
    heroNameBottom TEXT NOT NULL,
    aboutBody TEXT NOT NULL,
    aboutAge TEXT NOT NULL,
    aboutCity TEXT NOT NULL,
    aboutRole TEXT NOT NULL,
    karyaTitle TEXT NOT NULL,
    karyaSubtitle TEXT NOT NULL,
    skillsLabels TEXT NOT NULL,
    contactTitle TEXT NOT NULL,
    contactSubtitle TEXT NOT NULL,
    footer TEXT NOT NULL,
    updatedAt INTEGER NOT NULL,
    passwordHash TEXT DEFAULT 'admin123'
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind TEXT NOT NULL CHECK(kind IN ('photo', 'video')),
    url TEXT NOT NULL,
    storageId TEXT,
    title TEXT,
    orderNum INTEGER NOT NULL,
    createdAt INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_media_kind ON media(kind);
`);

// Insert default profile if not exists
const checkProfile = db.prepare('SELECT COUNT(*) as count FROM profile').get();
if (checkProfile.count === 0) {
  const defaults = {
    name: 'wazouzkii',
    discordUsername: 'z1_ks',
    email: 'hi@sinar.dev',
    avatarUrl: '',
    heroRole: 'Designer & Animator',
    heroTagline: '16-year-old creator from Jakarta — turning ideas into living visuals.',
    heroNameTop: 'wazouzkii',
    heroNameBottom: '',
    aboutBody: "Hi! I'm wazouzkii. I'm a designer and animator who loves making visual work — from 2D animation to 3D modeling. I believe every idea can become something amazing when crafted right.",
    aboutAge: '16 years old',
    aboutCity: 'South Jakarta',
    aboutRole: 'Designer & Animator',
    karyaTitle: 'My 3D Works',
    karyaSubtitle: 'Animation and modeling projects I have made',
    skillsLabels: JSON.stringify(['Animation', 'Design 3D', 'Design 2D', 'Builder']),
    contactTitle: "Let's Connect",
    contactSubtitle: 'Find me on Discord or send an email',
    footer: 'Made with passion by wazouzkii — © 2026',
    updatedAt: Date.now()
  };

  const insert = db.prepare(`
    INSERT INTO profile (
      name, discordUsername, email, avatarUrl, heroRole, heroTagline,
      heroNameTop, heroNameBottom, aboutBody, aboutAge, aboutCity, aboutRole,
      karyaTitle, karyaSubtitle, skillsLabels, contactTitle, contactSubtitle,
      footer, updatedAt
    ) VALUES (
      @name, @discordUsername, @email, @avatarUrl, @heroRole, @heroTagline,
      @heroNameTop, @heroNameBottom, @aboutBody, @aboutAge, @aboutCity, @aboutRole,
      @karyaTitle, @karyaSubtitle, @skillsLabels, @contactTitle, @contactSubtitle,
      @footer, @updatedAt
    )
  `);
  
  insert.run(defaults);
  console.log('✅ Default profile created');
}

module.exports = db;
