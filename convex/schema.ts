import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Schema Convex untuk portfolio.
 *
 * Cuma 2 tabel — kecil & mudah dirawat:
 * - `profile`  : SATU dokumen (id "main") berisi seluruh pengaturan teks profil.
 * - `media`    : foto & video untuk panel "Karya" (bagian yang dulu "Sekolah"),
 *                tipe dibedakan lewat kolom `kind` ("photo" | "video").
 */
export default defineSchema({
  profile: defineTable({
    // Nama & identitas
    name: v.string(),
    // Username Discord (tag), mis. "z1_ks"
    discordUsername: v.string(),
    // Email "say hi"
    email: v.string(),
    // Avatar (URL atau data)
    avatarUrl: v.optional(v.string()),

    // Hero
    heroRole: v.string(),        // "Designer & Animator"
    heroTagline: v.string(),
    heroNameTop: v.string(),     // nama baris 1 hero
    heroNameBottom: v.string(),  // nama baris 2 hero (italic)

    // About
    aboutBody: v.string(),
    aboutAge: v.string(),        // "16 tahun"
    aboutCity: v.string(),       // "Jakarta Selatan"
    aboutRole: v.string(),       // "Designer & Animator"
    // (school dihapus — tidak ada lagi chip sekolah)

    // Section "Karya 3D" (dulu School)
    karyaTitle: v.string(),      // "Karya 3D Ku" / "My 3D Works"
    karyaSubtitle: v.string(),

    // Craft (skills)
    skillsLabels: v.array(v.string()), // ["Animation","Design 3D","Design 2D","Builder"]

    // Contact
    contactTitle: v.string(),
    contactSubtitle: v.string(),

    // Footer
    footer: v.string(),

    // Waktu
    updatedAt: v.number(),
    // Password admin (default "admin123", bisa diganti dari panel)
    passwordHash: v.optional(v.string()),
  }),

  media: defineTable({
    kind: v.union(v.literal("photo"), v.literal("video")),
    url: v.string(),
    storageId: v.optional(v.id("_storage")),
    title: v.optional(v.string()),
    order: v.number(),
    createdAt: v.number(),
  }).index("by_kind", ["kind"]),
});