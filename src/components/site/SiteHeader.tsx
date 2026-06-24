import { Link } from "@tanstack/react-router";
import { Briefcase, Menu, X, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/internships", label: "Internships" },
  { to: "/companies", label: "Companies" },
  { to: "/government-jobs", label: "Government" },
  { to: "/freelance-jobs", label: "Freelance" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${scrolled ? "glass-nav" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_24px_-4px_var(--primary)]">
            <Briefcase className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Rozgar<span className="text-gradient">Hub</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "bg-primary/15 text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="relative hidden h-9 w-9 items-center justify-center rounded-lg glass text-muted-foreground transition hover:text-foreground sm:flex"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-success" />
          </button>
          <Link
            to="/dashboard"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--primary)] transition hover:scale-[1.03] active:scale-[0.98] md:inline-flex"
          >
            Post a Job
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg glass lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass-nav lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "bg-primary/15 text-primary" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
