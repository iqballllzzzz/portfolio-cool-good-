// API Client untuk menggantikan Convex
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

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
    return { ...data, url: `${API_BASE_URL}${data.url}` };
  }

  // Media methods
  async listMedia() {
    const res = await fetch(`${API_BASE_URL}/api/media`);
    if (!res.ok) throw new Error('Failed to fetch media');
    const media = await res.json();
    return media.map(m => ({
      ...m,
      _id: m.id.toString(),
      url: m.url.startsWith('http') ? m.url : `${API_BASE_URL}${m.url}`,
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
      url: m.url.startsWith('http') ? m.url : `${API_BASE_URL}${m.url}`,
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

  // Generate upload URL stub (not needed for REST API, but keeping interface compatible)
  async generateUploadUrl() {
    return null; // Not used in REST implementation
  }
}

export const api = new ApiClient();
