import { useRef, useState } from "react";
import { motion } from "framer-motion";
import avatar from "@/assets/avatar-wizard.jpg";
import { usePortfolio } from "@/hooks/use-portfolio";

/**
 * Interactive 3D name card built with CSS 3D transforms.
 * Pure CSS/HTML — no WebGL, no fonts to load, never broken.
 * Drag (or move pointer) to tilt; smooth spring follow.
 * Semua teks dari admin panel (Convex).
 */
export default function NameTag3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { profile } = usePortfolio();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 22, y: px * 28 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  const nameTop = profile.heroNameTop || profile.name;
  const nameBottom = profile.heroNameBottom;
  const username = profile.discordUsername.startsWith("@")
    ? profile.discordUsername
    : `@${profile.discordUsername}`;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-full h-[300px] sm:h-[360px] flex items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-[260px] sm:w-[300px] h-[200px] sm:h-[230px]"
      >
        {/* Card */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* shine */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(${135 + tilt.y * 2}deg, hsl(var(--foreground) / 0.08) 0%, transparent 40%, transparent 60%, hsl(var(--foreground) / 0.06) 100%)`,
            }}
          />
          <div className="relative h-full p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono">ID · 2026</p>
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono mt-0.5">JKT — IDN</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono">LV.16</p>
                <p className="text-[10px] tracking-[0.25em] text-foreground font-mono mt-0.5">DESIGNER</p>
              </div>
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="text-center">
              <p className="font-display text-2xl sm:text-3xl leading-none">{nameTop}</p>
              {nameBottom && (
                <p className="font-display text-2xl sm:text-3xl leading-none italic text-muted-foreground">{nameBottom}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ transform: "translateZ(20px)" }}>
                <img src={profile.avatarUrl || avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-border grayscale" />
                <div>
                  <p className="text-[9px] tracking-widest text-muted-foreground font-mono">{username}</p>
                  <p className="text-[9px] tracking-widest text-foreground font-mono">{profile.heroRole.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <div className="w-10 h-1 bg-foreground/80 rounded-full" />
                <div className="w-7 h-1 bg-foreground/40 rounded-full" />
                <div className="w-9 h-1 bg-foreground/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Edge depth */}
        <div
          className="absolute inset-0 rounded-2xl border border-border/40"
          style={{ transform: "translateZ(-12px)", background: "hsl(var(--muted))" }}
        />
      </motion.div>
    </div>
  );
}