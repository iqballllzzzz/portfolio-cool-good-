import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cake, MapPin, GraduationCap, Code2 } from "lucide-react";

export default function About() {
  const { t } = useTranslation();
  const chips = [
    { icon: Cake, label: t("about.chips.age"), color: "from-pink-500 to-rose-500" },
    { icon: MapPin, label: t("about.chips.city"), color: "from-cyan-500 to-blue-500" },
    { icon: GraduationCap, label: t("about.chips.school"), color: "from-purple-500 to-indigo-500" },
    { icon: Code2, label: t("about.chips.role"), color: "from-amber-500 to-orange-500" },
  ];
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl font-black text-center mb-3"
        >
          <span className="text-gradient">{t("about.title")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10"
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
              className="glass rounded-2xl p-4 sm:p-5 text-center"
            >
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${c.color} mb-3`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-medium">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}