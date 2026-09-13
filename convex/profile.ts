import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Default profile saat pertama kali — bisa di-edit lewat admin panel.
const DEFAULTS: Record<string, string | string[]> = {
  name: "Sinar",
  discordUsername: "z1_ks",
  email: "hi@sinar.dev",
  avatarUrl: "",
  heroRole: "Designer & Animator",
  heroTagline: "Kreator berusia 16 tahun dari Jakarta — membawa ide menjadi visual yang hidup.",
  heroNameTop: "Sinar",
  heroNameBottom: "",
  aboutBody: "Hai! Aku Sinar. Aku desainer dan animator yang suka membuat karya visual — dari animasi 2D sampai modeling 3D. Aku percaya setiap ide punya potensi jadi sesuatu yang luar biasa kalau dituangkan dengan tepat.",
  aboutAge: "16 tahun",
  aboutCity: "Jakarta Selatan",
  aboutRole: "Designer & Animator",
  karyaTitle: "Karya 3D Ku",
  karyaSubtitle: "Proyek animasi dan modeling yang telah aku buat",
  skillsLabels: ["Animation", "Design 3D", "Design 2D", "Builder"],
  contactTitle: "Mari Terhubung",
  contactSubtitle: "Temukan aku di Discord atau kirim email",
  footer: "Dibuat dengan semangat oleh Sinar — © 2026",
};

// ── QUERIES ──────────────────────────────────────────────────────────────────

/** Ambil profil (dokumen tunggal "main"). NULL kalau belum ada — klien memanggil ensureProfile. */
export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("profile").first();
  },
});

/** Buat profil default kalau belum ada (idempotent — aman dipanggil berulang). */
export const ensureProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("profile").first();
    if (existing) return existing._id;
    return await ctx.db.insert("profile", {
      ...DEFAULTS,
      skillsLabels: DEFAULTS.skillsLabels as string[],
      updatedAt: Date.now(),
    });
  },
});

// ── MUTATIONS ────────────────────────────────────────────────────────────────

/** Update field profil — dipanggil dari admin panel. */
export const updateProfile = mutation({
  args: {
    password: v.string(),
    name: v.optional(v.string()),
    discordUsername: v.optional(v.string()),
    email: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    heroRole: v.optional(v.string()),
    heroTagline: v.optional(v.string()),
    heroNameTop: v.optional(v.string()),
    heroNameBottom: v.optional(v.string()),
    aboutBody: v.optional(v.string()),
    aboutAge: v.optional(v.string()),
    aboutCity: v.optional(v.string()),
    aboutRole: v.optional(v.string()),
    karyaTitle: v.optional(v.string()),
    karyaSubtitle: v.optional(v.string()),
    skillsLabels: v.optional(v.array(v.string())),
    contactTitle: v.optional(v.string()),
    contactSubtitle: v.optional(v.string()),
    footer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.password))) {
      throw new Error("Password salah");
    }
    const row = await ctx.db.query("profile").first();
    if (!row) throw new Error("Profil tidak ditemukan");

    const patch: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(args)) {
      if (k === "password") continue;
      if (v !== undefined) patch[k] = v;
    }
    patch.updatedAt = Date.now();
    await ctx.db.patch(row._id, patch);
    return { ok: true };
  },
});

// ── HELPERS ──────────────────────────────────────────────────────────────────

async function _cekPassword(ctx: any, input: string): Promise<boolean> {
  const row = await ctx.db.query("profile").first();
  // Password default: "admin123" — di-hash jika perlu nanti.
  const stored = (row as any)?.passwordHash ?? "admin123";
  return input === stored;
}

/** Check password (dipanggil dari admin panel sebelum update). */
export const checkPassword = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    return { ok: await _cekPassword(ctx, args.password) };
  },
});

/** Set password baru (hanya dari panel yang sudah login). */
export const setPassword = mutation({
  args: { currentPassword: v.string(), newPassword: v.string() },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.currentPassword))) {
      throw new Error("Password lama salah");
    }
    const row = await ctx.db.query("profile").first();
    if (!row) throw new Error("Profil tidak ditemukan");
    await ctx.db.patch(row._id, {
      passwordHash: args.newPassword,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});
