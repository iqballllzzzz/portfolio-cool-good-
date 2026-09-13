import { motion } from "framer-motion";
import { MessagesSquare, Mail } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";

export default function Contact() {
  const { profile } = usePortfolio();
  const username = profile.discordUsername.startsWith("@")
    ? profile.discordUsername
    : `@${profile.discordUsername}`;

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
          <h2 className="font-display text-5xl sm:text-7xl mb-4">{profile.contactTitle}</h2>
          <p className="text-muted-foreground mb-10">{profile.contactSubtitle}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://discord.com/users/${profile.discordUsername}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <MessagesSquare className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-mono text-sm">{username}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              Say Hi
            </a>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-8 font-mono">{profile.footer}</p>
      </div>
    </section>
  );
}