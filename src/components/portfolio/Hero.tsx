import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import NameTag3D from "./NameTag3D";
import avatar from "@/assets/avatar-wizard.jpg";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-5 text-xs sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">{t("hero.role")}</span>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground mb-2">{t("hero.greet")}</p>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-4">
            <span className="block text-gradient">Arkana Farras</span>
            <span className="block text-foreground">Abiputra</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6">
            {t("hero.tagline")}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-white font-medium shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 transition-transform"
            >
              {t("hero.cta")} <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-md opacity-70" />
              <img
                src={avatar}
                alt="Arkana — Wizard avatar"
                className="relative w-14 h-14 rounded-full object-cover border-2 border-primary/50"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">@arkanaguys177</p>
              <p className="text-xs text-muted-foreground">aka "Wizard" in-game</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="glass rounded-3xl p-2 sm:p-4 relative overflow-hidden">
            <div className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-muted-foreground z-10">
              ◆ {t("hero.nicknameLabel")}
            </div>
            <NameTag3D />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground flex flex-col items-center gap-1"
      >
        <span>{t("hero.scroll")}</span>
        <ArrowDown className="w-3 h-3" />
      </motion.div>
    </section>
  );
}