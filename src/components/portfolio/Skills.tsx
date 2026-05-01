import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2, Film, Gamepad2, Palette } from "lucide-react";

export default function Skills() {
  const { t } = useTranslation();
  const items = [
    { icon: Code2, label: t("skills.coding"), desc: "JavaScript · Lua · Python" },
    { icon: Film, label: t("skills.animation"), desc: "Motion · 3D · FX" },
    { icon: Gamepad2, label: t("skills.gaming"), desc: "Roblox · Strategy" },
    { icon: Palette, label: t("skills.design"), desc: "UI · Character" },
  ];
  return (
    <section id="skills" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3">— 04 / Craft</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-6xl text-center mb-12"
        >
          {t("skills.title")}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-6 text-center border border-border bg-card/40 backdrop-blur-sm group cursor-default"
            >
              <div className="inline-flex p-3 rounded-2xl border border-border mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <it.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-1">{it.label}</h3>
              <p className="text-xs text-muted-foreground font-mono">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}