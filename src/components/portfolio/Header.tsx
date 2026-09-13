import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/use-portfolio";

const langs = [
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { profile } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navItems = [
    { id: "about", label: t("nav.about") },
    { id: "karya", label: t("nav.karya") },
    { id: "discord", label: t("nav.discord") },
    { id: "skills", label: t("nav.skills") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-4 sm:px-6 py-2.5">
          <a href="#hero" className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span>{profile.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-9 w-9" aria-label="Toggle theme">
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Moon className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Sun className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="rounded-full h-9 w-9" aria-label="Menu">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">— Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex flex-col gap-1 mb-8">
                {navItems.map((n, i) => (
                  <motion.a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-3xl font-display py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                  >
                    {n.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  <Languages className="w-3 h-3" strokeWidth={1.5} />
                  <span>Language</span>
                </div>
                <div className="grid gap-2">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        i18n.changeLanguage(l.code);
                        setOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                        i18n.language === l.code
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <span className="text-2xl">{l.flag}</span>
                      <span className="font-medium text-sm">{l.label}</span>
                      {i18n.language === l.code && <span className="ml-auto text-xs">●</span>}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}