import { motion } from "framer-motion";
import { Clapperboard, Box, Shapes, Hammer } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";

const ICONS = [Clapperboard, Box, Shapes, Hammer];

export default function Skills() {
  const { profile } = usePortfolio();
  const labels = profile.skillsLabels.length === 4 ? profile.skillsLabels : ["Animation", "Design 3D", "Design 2D", "Builder"];
  // Deskripsi teknis — statis, tidak perlu diubah dari admin.
  const descs = ["Motion · 2D · FX", "Modeling · Render", "UI · Ilustrasi", "Build · Sculpt"];

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
          Yang Aku Kerjakan
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {labels.map((label, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
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
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground font-mono">{descs[i % descs.length]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}