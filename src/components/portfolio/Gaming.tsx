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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-3 text-xs">
            <Gamepad2 className="w-3 h-3 text-accent" />
            <span className="text-muted-foreground">PLAYTIME</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-2">
            <span className="text-gradient">{t("gaming.title")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t("gaming.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/30 blur-3xl group-hover:bg-accent/50 transition-colors" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-md opacity-70" />
                  <img src={avatar} alt="Wizard" className="relative w-20 h-20 rounded-2xl object-cover border-2 border-primary/50" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("gaming.nickname")}</p>
                  <p className="font-display text-2xl font-bold text-gradient">Wizard</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{t("gaming.username")}</span>
                  </div>
                  <span className="font-mono font-semibold text-sm">@arkanaguys177</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Level</span>
                  </div>
                  <span className="font-mono font-semibold text-sm">13 IRL</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
          >
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl group-hover:bg-primary/50 transition-colors" />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("gaming.favorite")}</p>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-600 to-red-900">
                  <Skull className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black">FORSAKEN</h3>
                  <p className="text-xs text-muted-foreground">Roblox · Horror Survival</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                A 1v16 horror experience where survivors must outsmart killers to escape. Pure adrenaline.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["🔪 Killer", "🏃 Survivor", "⚡ Pro"].map((b) => (
                  <div key={b} className="px-2 py-2 rounded-xl bg-muted/50 text-xs font-medium">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}