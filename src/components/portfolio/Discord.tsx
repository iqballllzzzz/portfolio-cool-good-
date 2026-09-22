import { motion } from "framer-motion";
import { Gamepad2, MessagesSquare, User, Trophy } from "lucide-react";
import { usePortfolio, STOCK_AVATAR } from "@/hooks/use-portfolio";

/**
 * Discord — menampilkan username Discord owner (default: z1_ks).
 * Menggantikan section "Gaming Life / Forsaken" sesuai permintaan.
 */
export default function Discord() {
  const { profile } = usePortfolio();
  const username = profile.discordUsername.startsWith("@")
    ? profile.discordUsername
    : `@${profile.discordUsername}`;

  return (
    <section id="discord" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3 inline-flex items-center gap-2">
            <Gamepad2 className="w-3 h-3" strokeWidth={1.5} /> 03 / Discord
          </p>
          <h2 className="font-display text-5xl sm:text-6xl mb-3">I'm on Discord</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Find me on Discord — hit me up for a collab or just to chat
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-border bg-card/40"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profile.avatarUrl || STOCK_AVATAR}
                alt="Profile"
                loading="lazy"
                className="w-16 h-16 rounded-2xl object-cover border border-border grayscale"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Discord Username</p>
                <p className="font-display text-3xl">{username}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  <span>Display Name</span>
                </div>
                <span className="font-mono text-sm">{profile.name}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4" strokeWidth={1.5} />
                  <span>Status</span>
                </div>
                <span className="font-mono text-sm">Open to collab</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-border bg-foreground text-background"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-background/60 font-mono mb-3">Discord Server</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl border border-background/20">
                <MessagesSquare className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-4xl">{profile.name}'s Server</h3>
                <p className="text-xs text-background/60 font-mono">Design · Animation · Chill</p>
              </div>
            </div>
            <p className="text-sm text-background/70 mb-5 leading-relaxed">
              A community to share work, talk design & animation, and collab
              with other creators.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {["Design", "Editor", "Builder"].map((b) => (
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