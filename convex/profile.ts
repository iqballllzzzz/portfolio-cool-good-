import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

interface Defaults {
  name: string;
  discordUsername: string;
  email: string;
  avatarUrl: string;
  heroRole: string;
  heroTagline: string;
  heroNameTop: string;
  heroNameBottom: string;
  aboutBody: string;
  aboutAge: string;
  aboutCity: string;
  aboutRole: string;
  karyaTitle: string;
  karyaSubtitle: string;
  skillsLabels: string[];
  contactTitle: string;
  contactSubtitle: string;
  footer: string;
}

// Default profile saat pertama kali — bisa di-edit lewat admin panel.
const DEFAULTS: Defaults = {
  name: "wazouzkii",
  discordUsername: "z1_ks",
  email: "hi@sinar.dev",
  avatarUrl: "",
  heroRole: "Designer & Animator",
  heroTagline: "16-year-old creator from Jakarta — turning ideas into living visuals.",
  heroNameTop: "wazouzkii",
  heroNameBottom: "",
  aboutBody: "Hi! I'm wazouzkii. I'm a designer and animator who loves making visual work — from 2D animation to 3D modeling. I believe every idea can become something amazing when crafted right.",
  aboutAge: "16 years old",
  aboutCity: "South Jakarta",
  aboutRole: "Designer & Animator",
  karyaTitle: "My 3D Works",
  karyaSubtitle: "Animation and modeling projects I've made",
  skillsLabels: ["Animation", "Design 3D", "Design 2D", "Builder"],
  contactTitle: "Let's Connect",
  contactSubtitle: "Find me on Discord or send an email",
  footer: "Made with passion by wazouzkii — © 2026",
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
      name: DEFAULTS.name,
      discordUsername: DEFAULTS.discordUsername,
      email: DEFAULTS.email,
      avatarUrl: "",
      heroRole: DEFAULTS.heroRole,
      heroTagline: DEFAULTS.heroTagline,
      heroNameTop: DEFAULTS.heroNameTop,
      heroNameBottom: DEFAULTS.heroNameBottom,
      aboutBody: DEFAULTS.aboutBody,
      aboutAge: DEFAULTS.aboutAge,
      aboutCity: DEFAULTS.aboutCity,
      aboutRole: DEFAULTS.aboutRole,
      karyaTitle: DEFAULTS.karyaTitle,
      karyaSubtitle: DEFAULTS.karyaSubtitle,
      skillsLabels: DEFAULTS.skillsLabels,
      contactTitle: DEFAULTS.contactTitle,
      contactSubtitle: DEFAULTS.contactSubtitle,
      footer: DEFAULTS.footer,
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

/** Ganti foto profil — upload file ke storage Convex, simpan URL-nya. */
export const setAvatar = mutation({
  args: {
    password: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.password))) throw new Error("Password salah");
    const row = await ctx.db.query("profile").first();
    if (!row) throw new Error("Profil tidak ditemukan");
    const url = (await ctx.storage.getUrl(args.storageId)) ?? "";
    if (!url) throw new Error("File tidak ditemukan");
    await ctx.db.patch(row._id, {
      avatarUrl: url,
      updatedAt: Date.now(),
    });
    return { ok: true, url };
  },
});
