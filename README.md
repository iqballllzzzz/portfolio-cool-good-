# Portfolio Cool Good

Modern portfolio website with admin panel. **Migrated from Convex to self-hosted backend on VPS.**

## Tech Stack

**Frontend:**
- React + Vite + TypeScript
- Tailwind CSS + Shadcn UI
- Framer Motion + Three.js

**Backend:**
- Express.js + SQLite
- Multer for file uploads
- REST API

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3001`

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Variables

**Frontend (`.env`):**
```
VITE_API_URL=http://localhost:3001
```

**Backend (`backend/.env`):**
```
PORT=3001
NODE_ENV=production
```

## Admin Panel

Access admin at `/admin` with default password: `admin123`

Features:
- Update profile info
- Upload avatar
- Manage photos & videos
- Change password

## Production Deployment

### Backend (PM2)
```bash
cd backend
pm2 start src/server.js --name portfolio-api
pm2 save
pm2 startup
```

### Frontend
```bash
npm run build
# Deploy 'dist' folder to your hosting
```

Update `VITE_API_URL` in production `.env` with your backend URL.

## Database

SQLite database auto-created at `backend/portfolio.db`. Uploads stored in `backend/uploads/`.

## Migration Notes

✅ Migrated from Convex to self-hosted backend
✅ All data now stored on your VPS
✅ No external dependencies

## License

MIT - Made with love ❤️
