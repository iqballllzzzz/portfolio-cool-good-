import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";
import { Lock, Save, Upload, Trash2, AlertCircle, CheckCircle2, Image as ImageIcon, Video, ArrowLeft, KeyRound, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STOCK_AVATAR } from "@/hooks/use-portfolio";

export default function Admin() {
  // ── Password gate ────────────────────────────────────────────────────────
  const [pw, setPw] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwError, setPwError] = useState("");
  const checkPw = useMutation(api.profile.checkPassword);

  const handleLogin = async () => {
    setPwError("");
    try {
      const r = await checkPw({ password: pw });
      if (r.ok) setLoggedIn(true);
      else setPwError("Password salah");
    } catch {
      setPwError("Gagal menghubungi server");
    }
  };

  // ── Data ──────────────────────────────────────────────────────────────────
  const profile = useQuery(api.profile.getProfile);
  const photos = useQuery(api.media.listByKind, { kind: "photo" });
  const videos = useQuery(api.media.listByKind, { kind: "video" });
  const updateProfile = useMutation(api.profile.updateProfile);
  const addMedia = useMutation(api.media.addMedia);
  const removeMedia = useMutation(api.media.removeMedia);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const setAvatar = useMutation(api.profile.setAvatar);
  const setPassword = useMutation(api.profile.setPassword);

  // ── Form state (isi otomatis dari profil) ─────────────────────────────────
  const [form, setForm] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  // Isi form dari server saat pertama load
  const filled = Object.keys(form).length === 0 && profile;
  const f: Record<string, string> = filled
    ? {
        name: profile.name,
        discordUsername: profile.discordUsername,
        email: profile.email,
        heroRole: profile.heroRole,
        heroTagline: profile.heroTagline,
        heroNameTop: profile.heroNameTop,
        heroNameBottom: profile.heroNameBottom,
        aboutBody: profile.aboutBody,
        aboutAge: profile.aboutAge,
        aboutCity: profile.aboutCity,
        aboutRole: profile.aboutRole,
        karyaTitle: profile.karyaTitle,
        karyaSubtitle: profile.karyaSubtitle,
        contactTitle: profile.contactTitle,
        contactSubtitle: profile.contactSubtitle,
        footer: profile.footer,
        skills: profile.skillsLabels.join(", "),
      }
    : form;

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      await updateProfile({
        password: pw,
        name: f.name,
        discordUsername: f.discordUsername,
        email: f.email,
        heroRole: f.heroRole,
        heroTagline: f.heroTagline,
        heroNameTop: f.heroNameTop,
        heroNameBottom: f.heroNameBottom,
        aboutBody: f.aboutBody,
        aboutAge: f.aboutAge,
        aboutCity: f.aboutCity,
        aboutRole: f.aboutRole,
        karyaTitle: f.karyaTitle,
        karyaSubtitle: f.karyaSubtitle,
        skillsLabels: f.skills.split(",").map((s: string) => s.trim()).filter(Boolean),
        contactTitle: f.contactTitle,
        contactSubtitle: f.contactSubtitle,
        footer: f.footer,
      });
      setMsg("✓ Tersimpan");
    } catch (e: any) {
      setMsg(`✕ ${e.message ?? "Gagal"}`);
    } finally {
      setSaving(false);
    }
  };

  // ── Upload file → Convex storage → tambah media ───────────────────────────
  const handleUpload = async (kind: "photo" | "video", file: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Upload gagal");
      const { storageId } = await res.json();
      await addMedia({ password: pw, kind, storageId, title: file.name });
      setMsg(`✓ ${file.name} ditambahkan`);
    } catch (e: any) {
      setMsg(`✕ Upload gagal: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  // ── Hapus media ───────────────────────────────────────────────────────────
  const handleRemove = async (id: string) => {
    if (!confirm("Hapus file ini?")) return;
    try {
      await removeMedia({ password: pw, id: id as any });
      setMsg("✓ Dihapus");
    } catch (e: any) {
      setMsg(`✕ ${e.message}`);
    }
  };

  // ── Upload foto profil (file → storage → avatarUrl) ───────────────────────
  const handleAvatarUpload = async (file: File | null) => {
    if (!file) return;
    setUploadingAvatar(true);
    setMsg("");
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Upload gagal");
      const { storageId } = await res.json();
      const r = await setAvatar({ password: pw, storageId });
      setMsg("✓ Foto profil diganti — langsung tampil di semua kartu");
      return r.url;
    } catch (e: any) {
      setMsg(`✕ Upload gagal: ${e.message}`);
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ── Ganti password admin ──────────────────────────────────────────────────
  const handleChangePw = async () => {
    if (newPw.length < 6) {
      setMsg("✕ Password minimal 6 karakter");
      return;
    }
    if (newPw !== newPw2) {
      setMsg("✕ Konfirmasi password tidak sama");
      return;
    }
    try {
      await setPassword({ currentPassword: pw, newPassword: newPw });
      setMsg("✓ Password diganti — pakai yang baru dari sekarang");
      setNewPw("");
      setNewPw2("");
    } catch (e: any) {
      setMsg(`✕ ${e.message}`);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl p-8 border border-border bg-card/40"
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5" strokeWidth={1.5} />
            <h1 className="font-display text-2xl">Admin Panel</h1>
          </div>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Masukkan password…"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground mb-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
          />
          {pwError && (
            <p className="text-xs text-destructive mb-3 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {pwError}
            </p>
          )}
          <Button onClick={handleLogin} className="w-full">
            Masuk
          </Button>
          <a href="/" className="block text-center text-xs text-muted-foreground mt-4 hover:underline">
            ← Kembali ke portfolio
          </a>
        </motion.div>
      </div>
    );
  }

  const fields: { key: string; label: string; rows?: number }[] = [
    { key: "name", label: "Nama" },
    { key: "discordUsername", label: "Username Discord" },
    { key: "email", label: "Email Say Hi" },
    { key: "heroNameTop", label: "Hero — Baris 1 (Nama)" },
    { key: "heroNameBottom", label: "Hero — Baris 2 (Italic)" },
    { key: "heroRole", label: "Hero Role" },
    { key: "heroTagline", label: "Hero Tagline", rows: 2 },
    { key: "aboutBody", label: "Tentang Saya", rows: 3 },
    { key: "aboutAge", label: "Umur (contoh: 16 tahun)" },
    { key: "aboutCity", label: "Kota" },
    { key: "aboutRole", label: "Peran (About)" },
    { key: "karyaTitle", label: "Judul Section Karya" },
    { key: "karyaSubtitle", label: "Subtitle Karya" },
    { key: "skills", label: "Skills (koma)" },
    { key: "contactTitle", label: "Judul Contact" },
    { key: "contactSubtitle", label: "Subtitle Contact" },
    { key: "footer", label: "Footer" },
  ];

  const renderMediaGrid = (items: any[], kind: "photo" | "video") => (
    <div className="mt-4">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
        {kind === "photo" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
        {kind === "photo" ? "Foto" : "Video"} ({items.length})
      </h3>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground mb-3">Belum ada {kind}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {items.map((item) => (
          <div key={item._id} className="relative rounded-xl overflow-hidden border border-border group">
            {kind === "photo" ? (
              <img src={item.url} alt={item.title} className="w-full aspect-square object-cover" />
            ) : (
              <video src={item.url} className="w-full aspect-square object-cover" preload="metadata" />
            )}
            <button
              onClick={() => handleRemove(item._id)}
              className="absolute top-1 right-1 p-1 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <p className="text-[10px] text-muted-foreground px-1 truncate">{item.title}</p>
          </div>
        ))}
      </div>
      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted cursor-pointer text-sm transition-colors">
        <Upload className="w-4 h-4" />
        <span>{uploading ? "Mengunggah…" : `Upload ${kind === "photo" ? "Foto" : "Video"}`}</span>
        <input
          type="file"
          accept={kind === "photo" ? "image/*" : "video/*"}
          className="hidden"
          onChange={(e) => handleUpload(kind, e.target.files?.[0] ?? null)}
          disabled={uploading}
        />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <h1 className="font-display text-3xl">Admin Panel</h1>
          </div>
          <a href="/" className="text-xs text-muted-foreground hover:underline font-mono">
            Lihat portfolio →
          </a>
        </div>

        {/* PROFIL — foto profil (upload file langsung) */}
        <div className="rounded-3xl p-6 border border-border bg-card/40 mb-6">
          <h2 className="font-display text-xl mb-4 flex items-center gap-2">
            <UserCircle className="w-5 h-5" strokeWidth={1.5} /> Foto Profil
          </h2>
          <div className="flex items-center gap-5">
            <img
              src={profile?.avatarUrl || STOCK_AVATAR}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border border-border grayscale"
            />
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted cursor-pointer text-sm transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploadingAvatar ? "Mengunggah…" : "Upload Foto Profil"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleAvatarUpload(e.target.files?.[0] ?? null)}
                  disabled={uploadingAvatar}
                />
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Foto diganti langsung — tampil di kartu nama 3D, hero, & Discord
              </p>
            </div>
          </div>
        </div>

        {/* PROFIL — teks */}
        <div className="rounded-3xl p-6 border border-border bg-card/40 mb-6">
          <h2 className="font-display text-xl mb-4">Informasi Profil</h2>
          <div className="space-y-3">
            {fields.map(({ key, label, rows }) => (
              <div key={key}>
                <label className="block text-xs font-mono text-muted-foreground mb-1">{label}</label>
                {rows ? (
                  <textarea
                    value={f[key] ?? ""}
                    onChange={(e) => set(key, e.target.value)}
                    rows={rows}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                  />
                ) : (
                  <input
                    value={f[key] ?? ""}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                )}
              </div>
            ))}
          </div>

          {msg && (
            <p className={`mt-4 text-sm flex items-center gap-1 ${msg.startsWith("✓") ? "text-green-500" : "text-destructive"}`}>
              {msg.startsWith("✓") ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {msg}
            </p>
          )}

          <Button onClick={handleSave} disabled={saving} className="mt-4">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Menyimpan…" : "Simpan"}
          </Button>
        </div>

        {/* MEDIA — foto */}
        <div className="rounded-3xl p-6 border border-border bg-card/40 mb-6">
          <h2 className="font-display text-xl mb-2">Foto Karya</h2>
          {renderMediaGrid(photos ?? [], "photo")}
        </div>

        {/* MEDIA — video */}
        <div className="rounded-3xl p-6 border border-border bg-card/40 mb-6">
          <h2 className="font-display text-xl mb-2">Video Karya</h2>
          {renderMediaGrid(videos ?? [], "video")}
        </div>

        {/* GANTI PASSWORD */}
        <div className="rounded-3xl p-6 border border-border bg-card/40 mb-6">
          <h2 className="font-display text-xl mb-4 flex items-center gap-2">
            <KeyRound className="w-5 h-5" strokeWidth={1.5} /> Ganti Password
          </h2>
          <div className="space-y-3 max-w-sm">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Password baru</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">Ulangi password baru</label>
              <input
                type="password"
                value={newPw2}
                onChange={(e) => setNewPw2(e.target.value)}
                placeholder="Ketik ulang"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <Button onClick={handleChangePw} variant="outline">
              <KeyRound className="w-4 h-4 mr-2" />
              Ganti Password
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 font-mono">
          Admin panel: tambahkan <code className="bg-muted px-1 py-0.5 rounded">/admin</code> di akhir URL situs.
        </p>
      </div>
    </div>
  );
}