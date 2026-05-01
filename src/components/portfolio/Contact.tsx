import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Gamepad2, Mail, Sparkles } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-[2rem] p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl sm:text-5xl font-black mb-2">
              <span className="text-gradient">{t("contact.title")}</span>
            </h2>
            <p className="text-muted-foreground mb-8">{t("contact.subtitle")}</p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://www.roblox.com/users/profile?username=arkanaguys177"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:bg-muted transition-colors"
              >
                <Gamepad2 className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{t("contact.roblox")}: @arkanaguys177</span>
              </a>
              <a
                href="mailto:arkana@example.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:scale-105 transition-transform"
              >
                <Mail className="w-4 h-4" />
                Say Hi
              </a>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-8">{t("footer")}</p>
      </div>
    </section>
  );
}