import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Users, Building2, Globe, Star, BadgeCheck, TrendingUp } from "lucide-react";
import { JobCard } from "@/components/site/JobCard";
import { COMPANIES, JOBS, POPULAR_SEARCHES, jobOpenings } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RozgarHub Pakistan — Find Your Dream Career" },
      { name: "description", content: "Explore thousands of jobs, internships and freelance opportunities from top companies across Pakistan." },
      { property: "og:title", content: "RozgarHub Pakistan — Find Your Dream Career" },
      { property: "og:description", content: "Explore jobs, internships and freelance opportunities from top Pakistani companies." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedJobs />
      <TopCompanies />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-24 pb-24 text-white min-h-[92vh] flex items-center">
      {/* Animated video background */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=60"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-an-aerial-view-of-the-city-2633/1080p.mp4"
          type="video/mp4"
        />
      </video>
      {/* Color wash over video */}
      <div className="absolute inset-0 -z-10 hero-gradient opacity-80" aria-hidden />
      <div className="absolute inset-0 -z-10 geo-pattern opacity-20" aria-hidden />
      {/* Ambient orbs */}
      <div className="orb -top-20 left-1/4 h-72 w-72 bg-primary/40" aria-hidden />
      <div className="orb -bottom-32 right-1/4 h-96 w-96 bg-accent/30" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Pakistan's modern career platform
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Find Your Dream <span className="text-gradient">Career</span> in Pakistan
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 sm:text-lg">
            Explore thousands of jobs, internships, and freelance opportunities from top companies across Pakistan.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 grid max-w-5xl gap-2 glass-card p-2 sm:grid-cols-[1fr_1fr_auto] sm:gap-0 sm:rounded-full"
        >
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 sm:rounded-l-full">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Job title, skills or keywords"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 sm:border-l sm:border-white/10">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Islamabad, Lahore, Karachi or Remote"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)] transition hover:scale-[1.02] active:scale-[0.98] sm:rounded-full"
          >
            <Search className="h-4 w-4" />
            Find Jobs
          </Link>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70"
        >
          <span className="text-white/50">Popular:</span>
          {POPULAR_SEARCHES.map((s) => (
            <Link
              key={s}
              to="/jobs"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur transition hover:bg-white/10"
            >
              {s}
            </Link>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/jobs" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)] transition hover:scale-[1.03]">
            Find Jobs <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}


function useCounter(target: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return { ref, val };
}

function Stat({ value, label, suffix, icon: Icon }: { value: number; label: string; suffix: string; icon: typeof Briefcase }) {
  const { ref, val } = useCounter(value);
  return (
    <div className="glass-card p-6">

      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-display text-3xl font-extrabold text-foreground">
        <span ref={ref}>{val.toLocaleString()}</span>{suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={25000} suffix="+" label="Active Jobs" icon={Briefcase} />
        <Stat value={5000} suffix="+" label="Companies" icon={Building2} />
        <Stat value={120000} suffix="+" label="Candidates" icon={Users} />
        <Stat value={50} suffix="+" label="Cities Covered" icon={Globe} />
      </div>
    </section>
  );
}

function FeaturedJobs() {
  const featured = JOBS.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> Featured Jobs
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Hand-picked opportunities for you</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">Curated openings from Pakistan's most respected employers, updated daily.</p>
        </div>
        <Link to="/jobs" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View all jobs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((j, i) => (
          <JobCard key={j.id} job={j} index={i} />
        ))}
      </div>
    </section>
  );
}

function TopCompanies() {
  return (
    <section className="relative py-20">
      <div className="orb top-20 left-10 h-72 w-72 bg-primary/20" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            <BadgeCheck className="h-3.5 w-3.5" /> Top Companies Hiring
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Pakistan's leading employers</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Join household names already trusted by thousands of professionals.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 transition-shadow hover:shadow-[0_25px_60px_-25px_var(--primary)]"

            >
              <div className="flex items-start gap-4">
                <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl text-lg font-bold text-white ${c.logoColor}`}>
                  {c.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <Link to="/companies/$slug" params={{ slug: c.slug }} className="block truncate font-display text-lg font-bold hover:text-primary">
                    {c.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{c.industry}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary">
                      {jobOpenings(c.slug)} open roles
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl hero-gradient p-10 text-white sm:p-16">
        <div className="absolute inset-0 geo-pattern opacity-20" aria-hidden />

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/40 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Hiring? Find the perfect candidate today.</h2>
            <p className="mt-3 max-w-xl text-white/75">Post your first job in minutes and reach over 120,000 active professionals across Pakistan.</p>

          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:scale-[1.03]">Post a Job <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10">Talk to Sales</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
