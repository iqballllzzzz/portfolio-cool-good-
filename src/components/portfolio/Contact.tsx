import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Gamepad2, Mail } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2rem] p-8 sm:p-14 text-center relative overflow-hidden border border-border bg-card/40 backdrop-blur-sm"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-4">— 05 / Connect</p>
          <h2 className="font-display text-5xl sm:text-7xl mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground mb-10">{t("contact.subtitle")}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.roblox.com/users/profile?username=arkanaguys177"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <Gamepad2 className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-mono text-sm">@arkanaguys177</span>
            </a>
            <a
              href="mailto:arkana@example.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              Say Hi
            </a>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-8 font-mono">{t("footer")}</p>
      </div>
    </section>
  );
}