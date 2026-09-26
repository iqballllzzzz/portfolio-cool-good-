# Portfolio Backend API

Backend API untuk portfolio menggunakan Express.js + SQLite.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3001`

## Database

Database SQLite akan otomatis dibuat di `backend/portfolio.db` saat pertama kali server dijalankan.

## API Endpoints

### Profile
- `GET /api/profile` - Get profile data
- `POST /api/profile/update` - Update profile (requires password)
- `POST /api/profile/check-password` - Check password
- `POST /api/profile/set-password` - Change password
- `POST /api/profile/upload-avatar` - Upload avatar (multipart/form-data)

### Media
- `GET /api/media` - Get all media
- `GET /api/media/:kind` - Get media by kind (photo/video)
- `POST /api/media/upload` - Upload media (multipart/form-data)
- `POST /api/media/update/:id` - Update media
- `DELETE /api/media/:id` - Delete media

### Static Files
- `/uploads/*` - Serve uploaded files

## Environment Variables

Create `.env` file:
```
PORT=3001
NODE_ENV=production
```

## Production Deployment

Gunakan PM2 untuk production:
```bash
npm install -g pm2
cd backend
pm2 start src/server.js --name portfolio-api
pm2 save
pm2 startup
```
