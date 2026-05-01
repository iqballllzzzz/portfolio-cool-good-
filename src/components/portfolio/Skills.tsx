import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2, Film, Gamepad2, Palette } from "lucide-react";

export default function Skills() {
  const { t } = useTranslation();
  const items = [
    { icon: Code2, label: t("skills.coding"), desc: "JavaScript · Lua · Python", color: "from-violet-500 to-purple-700" },
    { icon: Film, label: t("skills.animation"), desc: "Motion · 3D · FX", color: "from-pink-500 to-rose-700" },
    { icon: Gamepad2, label: t("skills.gaming"), desc: "Roblox · Strategy", color: "from-cyan-500 to-blue-700" },
    { icon: Palette, label: t("skills.design"), desc: "UI · Character", color: "from-amber-500 to-orange-700" },
  ];
  return (
    <section id="skills" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-black text-center mb-12"
        >
          <span className="text-gradient">{t("skills.title")}</span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="glass rounded-3xl p-5 sm:p-6 text-center group cursor-default"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${it.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <it.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg mb-1">{it.label}</h3>
              <p className="text-xs text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}