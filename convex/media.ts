import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Ambil seluruh media (foto + video), urut by `order`. */
export const listMedia = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("media").collect();
    // Resolve storage → URL publik
    const out = [];
    for (const m of all) {
      let url = m.url;
      if (!url && m.storageId) {
        url = (await ctx.storage.getUrl(m.storageId)) ?? "";
      }
      out.push({ ...m, url });
    }
    return out.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

/** Ambil media per tipe: "photo" | "video". */
export const listByKind = query({
  args: { kind: v.union(v.literal("photo"), v.literal("video")) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("media").collect();
    const out = [];
    for (const m of all) {
      if (m.kind === args.kind) {
        let url = m.url;
        if (!url && m.storageId) {
          url = (await ctx.storage.getUrl(m.storageId)) ?? "";
        }
        out.push({ ...m, url });
      }
    }
    return out.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

/** Generate URL upload (untuk foto/video dari admin). */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/** Simpan referensi file yang sudah di-upload ke storage. */
export const addMedia = mutation({
  args: {
    password: v.string(),
    kind: v.union(v.literal("photo"), v.literal("video")),
    storageId: v.optional(v.id("_storage")),
    url: v.optional(v.string()), // URL eksternal (stock) — tanpa storage
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.password))) throw new Error("Password salah");
    if (!args.storageId && !args.url) throw new Error("Perlu file atau URL");
    const existing = await ctx.db.query("media").collect();
    const maxOrder = existing.reduce((m, x) => Math.max(m, x.order ?? 0), 0);
    let url = args.url;
    if (args.storageId) {
      url = (await ctx.storage.getUrl(args.storageId)) ?? "";
    }
    await ctx.db.insert("media", {
      kind: args.kind,
      storageId: args.storageId,
      url: url ?? "",
      title: args.title,
      order: maxOrder + 1,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});

/** Hapus media (dari admin) — file storage ikut dihapus. */
export const removeMedia = mutation({
  args: {
    password: v.string(),
    id: v.id("media"),
  },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.password))) throw new Error("Password salah");
    const row = await ctx.db.get(args.id);
    if (row?.storageId) {
      await ctx.storage.delete(row.storageId);
    }
    await ctx.db.delete(args.id);
    return { ok: true };
  },
});

/** Update urutan / title media. */
export const updateMedia = mutation({
  args: {
    password: v.string(),
    id: v.id("media"),
    title: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (!(await _cekPassword(ctx, args.password))) throw new Error("Password salah");
    await ctx.db.patch(args.id, {
      ...(args.title !== undefined && { title: args.title }),
      ...(args.order !== undefined && { order: args.order }),
    });
    return { ok: true };
  },
});

async function _cekPassword(ctx: any, input: string): Promise<boolean> {
  const row = await ctx.db.query("profile").first();
  const stored = (row as any)?.passwordHash ?? "admin123";
  return input === stored;
}