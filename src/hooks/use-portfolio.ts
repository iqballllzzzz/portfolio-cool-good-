import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export type PortfolioProfile = {
  _id: string;
  name: string;
  discordUsername: string;
  email: string;
  avatarUrl?: string;
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
  updatedAt: number;
};

export type PortfolioMedia = {
  _id: string;
  kind: "photo" | "video";
  url: string;
  storageId?: string;
  title?: string;
  order: number;
  createdAt: number;
};

/**
 * Hook utama: ambil profil + media dari Convex.
 * Kalau Convex belum dikonfigurasi (dev lokal), fallback ke default statis
 * supaya UI tetap tampil.
 */
export function usePortfolio() {
  const profile = useQuery(api.profile.getProfile);
  const photos = useQuery(api.media.listByKind, { kind: "photo" });
  const videos = useQuery(api.media.listByKind, { kind: "video" });
  // Seed otomatis: kalau deployment masih kosong, buat profil default sekali.
  const ensure = useMutation(api.profile.ensureProfile);
  const [seeded, setSeeded] = useState(false);
  useEffect(() => {
    if (profile === null && !seeded) {
      setSeeded(true);
      void ensure({}).catch(() => {});
    }
  }, [profile, seeded, ensure]);

  const fallbackProfile: PortfolioProfile = {
    _id: "fallback",
    name: "Sinar",
    discordUsername: "z1_ks",
    email: "hi@sinar.dev",
    avatarUrl: "",
    heroRole: "Designer & Animator",
    heroTagline: "Kreator berusia 16 tahun dari Jakarta — membawa ide menjadi visual yang hidup.",
    heroNameTop: "Sinar",
    heroNameBottom: "",
    aboutBody: "Hai! Aku Sinar. Aku desainer dan animator yang suka membuat karya visual — dari animasi 2D sampai modeling 3D.",
    aboutAge: "16 tahun",
    aboutCity: "Jakarta Selatan",
    aboutRole: "Designer & Animator",
    karyaTitle: "Karya 3D Ku",
    karyaSubtitle: "Proyek animasi dan modeling yang telah aku buat",
    skillsLabels: ["Animation", "Design 3D", "Design 2D", "Builder"],
    contactTitle: "Mari Terhubung",
    contactSubtitle: "Temukan aku di Discord atau kirim email",
    footer: "Dibuat dengan semangat oleh Sinar — © 2026",
    updatedAt: Date.now(),
  };

  return {
    profile: profile ?? fallbackProfile,
    photos: photos ?? [],
    videos: videos ?? [],
    loading: profile === undefined,
  };
}

/** Fallback stock untuk panel foto (dipakai kalau belum ada upload). */
export const STOCK_PHOTOS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
];

/** Fallback avatar stock (dipakai kalau admin belum upload foto profil). */
export const STOCK_AVATAR =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80";