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
    name: "wazouzkii",
    discordUsername: "z1_ks",
    email: "hi@sinar.dev",
    avatarUrl: "",
    heroRole: "Designer & Animator",
    heroTagline: "16-year-old creator from Jakarta — turning ideas into living visuals.",
    heroNameTop: "wazouzkii",
    heroNameBottom: "",
    aboutBody: "Hi! I'm wazouzkii. I'm a designer and animator who loves making visual work — from 2D animation to 3D modeling.",
    aboutAge: "16 years old",
    aboutCity: "South Jakarta",
    aboutRole: "Designer & Animator",
    karyaTitle: "My 3D Works",
    karyaSubtitle: "Animation and modeling projects I've made",
    skillsLabels: ["Animation", "Design 3D", "Design 2D", "Builder"],
    contactTitle: "Let's Connect",
    contactSubtitle: "Find me on Discord or send an email",
    footer: "Made with passion by wazouzkii — © 2026",
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
