import { useEffect, useMemo, useState } from "react";
import { useQueries, useMutation } from "convex/react";
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

export function usePortfolio() {
  const queryMap = useMemo(() => ({
    profile: { query: api.profile.getProfile, args: {} },
    photos: { query: api.media.listByKind, args: { kind: "photo" } },
    videos: { query: api.media.listByKind, args: { kind: "video" } },
  }), []);

  const results = useQueries(queryMap);

  const rawProfile = results.profile instanceof Error ? null : results.profile;
  const rawPhotos = results.photos instanceof Error ? null : results.photos;
  const rawVideos = results.videos instanceof Error ? null : results.videos;

  const ensure = useMutation(api.profile.ensureProfile);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (rawProfile === null && !seeded) {
      setSeeded(true);
      void ensure({}).catch(() => {});
    }
  }, [rawProfile, seeded, ensure]);

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
    profile: (rawProfile as PortfolioProfile) ?? fallbackProfile,
    photos: (Array.isArray(rawPhotos) ? rawPhotos : []) as PortfolioMedia[],
    videos: (Array.isArray(rawVideos) ? rawVideos : []) as PortfolioMedia[],
    loading: results.profile === undefined,
  };
}

export const STOCK_PHOTOS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
];

export const STOCK_AVATAR =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80";
