// API Client untuk menggantikan Convex
// Same-origin via Vercel rewrite proxy (/api/* -> backend).
// Tidak ada CORS, tidak ada masalah IPv6 — browser cuma bicara ke domain sendiri.
// Bisa dioverride lewat Vercel env: VITE_API_URL=https://aqualibrya.my.id
const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_URL || '';

// Helper to resolve avatar URLs
export function resolveAvatarUrl(url: string | undefined): string {
  if (!url) return '';
  // If already full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Resolve relative URL with page origin (Vercel proxy same-origin)
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${url}`;
  }
  return url;
}

class ApiClient {
  // Profile methods
  async getProfile() {
    const res = await fetch(`${API_BASE_URL}/api/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }

  async updateProfile(password, updates) {
    const res = await fetch(`${API_BASE_URL}/api/profile/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, ...updates }),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  }

  async checkPassword(password) {
    const res = await fetch(`${API_BASE_URL}/api/profile/check-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error('Failed to check password');
    return res.json();
  }

  async setPassword(currentPassword, newPassword) {
    const res = await fetch(`${API_BASE_URL}/api/profile/set-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!res.ok) throw new Error('Failed to set password');
    return res.json();
  }

  async uploadAvatar(password, file) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('file', file);

    const res = await fetch(`${API_BASE_URL}/api/profile/upload-avatar`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload avatar');
    const data = await res.json();
    // data.url relatif (/uploads/...) — resolve via origin (Vercel proxy)
    const rel = data.url.startsWith('http') ? new URL(data.url).pathname : data.url;
    const full = typeof window !== 'undefined' ? `${window.location.origin}${rel}` : rel;
    return { ...data, url: full };
  }

  // Media methods
  async listMedia() {
    const res = await fetch(`${API_BASE_URL}/api/media`);
    if (!res.ok) throw new Error('Failed to fetch media');
    const media = await res.json();
    return media.map(m => ({
      ...m,
      _id: m.id.toString(),
      url: m.url.startsWith('http') ? m.url : `${window.location.origin}${m.url}`,
      order: m.orderNum,
    }));
  }

  async listMediaByKind(kind) {
    const res = await fetch(`${API_BASE_URL}/api/media/${kind}`);
    if (!res.ok) throw new Error('Failed to fetch media');
    const media = await res.json();
    return media.map(m => ({
      ...m,
      _id: m.id.toString(),
      url: m.url.startsWith('http') ? m.url : `${window.location.origin}${m.url}`,
      order: m.orderNum,
    }));
  }

  async uploadMedia(password, kind, file, title, url) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('kind', kind);
    if (file) formData.append('file', file);
    if (url) formData.append('url', url);
    if (title) formData.append('title', title);

    const res = await fetch(`${API_BASE_URL}/api/media/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload media');
    return res.json();
  }

  async updateMedia(password, id, updates) {
    const res = await fetch(`${API_BASE_URL}/api/media/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, ...updates }),
    });
    if (!res.ok) throw new Error('Failed to update media');
    return res.json();
  }

  async removeMedia(password, id) {
    const res = await fetch(`${API_BASE_URL}/api/media/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error('Failed to remove media');
    return res.json();
  }
}

export const api = new ApiClient();
