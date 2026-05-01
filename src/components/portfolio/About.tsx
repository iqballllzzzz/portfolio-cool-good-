import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cake, MapPin, GraduationCap, Code2 } from "lucide-react";

export default function About() {
  const { t } = useTranslation();
  const chips = [
    { icon: Cake, label: t("about.chips.age") },
    { icon: MapPin, label: t("about.chips.city") },
    { icon: GraduationCap, label: t("about.chips.school") },
    { icon: Code2, label: t("about.chips.role") },
  ];
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3">— 01 / About</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-6xl text-center mb-4"
        >
          {t("about.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t("about.body")}
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {chips.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 sm:p-6 text-center border border-border bg-card/40 backdrop-blur-sm"
            >
              <div className="inline-flex p-3 rounded-xl bg-muted mb-4 border border-border">
                <c.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm font-medium">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}