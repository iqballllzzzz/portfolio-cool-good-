import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import NameTag3D from "./NameTag3D";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function Hero() {
  const { t } = useTranslation();
  const { profile } = usePortfolio();
  const username = profile.discordUsername.startsWith("@")
    ? profile.discordUsername
    : `@${profile.discordUsername}`;
  const nameTop = profile.heroNameTop || profile.name;
  const nameBottom = profile.heroNameBottom;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-6 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
            </span>
            <span className="text-muted-foreground font-mono tracking-widest uppercase text-[10px]">{profile.heroRole}</span>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground mb-3 font-mono tracking-widest uppercase">{t("hero.greet")}</p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mb-5">
            <span className="block">{nameTop}</span>
            {nameBottom && <span className="block italic text-muted-foreground">{nameBottom}</span>}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-7 leading-relaxed">
            {profile.heroTagline}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              {t("hero.cta")}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-muted text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <img
              src={profile.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80"}
              alt={`${profile.name} — avatar`}
              className="w-12 h-12 rounded-full object-cover border border-border grayscale"
            />
            <div className="text-left">
              <p className="text-sm font-mono">{username}</p>
              <p className="text-xs text-muted-foreground">aka "{profile.name}" in 3D</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="relative">
            <div className="absolute -top-2 left-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground z-10 font-mono">
              — {t("hero.nicknameLabel")}
            </div>
            <NameTag3D />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex flex-col items-center gap-1 font-mono"
      >
        <span>{t("hero.scroll")}</span>
        <ArrowDown className="w-3 h-3" />
      </motion.div>
    </section>
  );
}