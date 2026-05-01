import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Gamepad2, Skull, User, Trophy } from "lucide-react";
import avatar from "@/assets/avatar-wizard.jpg";

export default function Gaming() {
  const { t } = useTranslation();
  return (
    <section id="gaming" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3 inline-flex items-center gap-2">
            <Gamepad2 className="w-3 h-3" strokeWidth={1.5} /> 03 / Playtime
          </p>
          <h2 className="font-display text-5xl sm:text-6xl mb-3">{t("gaming.title")}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t("gaming.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-border bg-card/40"
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={avatar} alt="Wizard" className="w-16 h-16 rounded-2xl object-cover border border-border grayscale" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">{t("gaming.nickname")}</p>
                <p className="font-display text-3xl">Wizard</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  <span>{t("gaming.username")}</span>
                </div>
                <span className="font-mono text-sm">@arkanaguys177</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4" strokeWidth={1.5} />
                  <span>Level</span>
                </div>
                <span className="font-mono text-sm">13 IRL</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-border bg-foreground text-background"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-background/60 font-mono mb-3">{t("gaming.favorite")}</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl border border-background/20">
                <Skull className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-4xl">Forsaken</h3>
                <p className="text-xs text-background/60 font-mono">Roblox · Horror Survival</p>
              </div>
            </div>
            <p className="text-sm text-background/70 mb-5 leading-relaxed">
              A 1v16 horror experience where survivors must outsmart killers to escape. Pure adrenaline.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {["Killer", "Survivor", "Pro"].map((b) => (
                <div key={b} className="px-2 py-2 rounded-xl border border-background/20 text-xs font-mono uppercase tracking-widest">
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}