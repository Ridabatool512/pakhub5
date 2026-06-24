import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, MapPin, Banknote, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Job } from "@/lib/mock-data";
import { formatPKR } from "@/lib/mock-data";

const typeStyles: Record<string, string> = {
  "Full-time": "bg-primary/15 text-primary",
  "Part-time": "bg-warning/15 text-warning",
  Internship: "bg-accent/20 text-accent-foreground",
  Remote: "bg-success/15 text-success",
  Contract: "bg-white/5 text-muted-foreground",
  Government: "bg-emerald-500/15 text-emerald-300",
  Freelance: "bg-amber-400/15 text-amber-300",
};

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative glass-card p-5 transition-shadow hover:shadow-[0_25px_60px_-20px_var(--primary)]"
    >

      <div className="flex items-start gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-base font-bold text-white ${job.logoColor}`}>
          {job.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                to="/jobs/$id"
                params={{ id: job.id }}
                className="block truncate font-display text-base font-bold text-foreground hover:text-primary"
              >
                {job.title}
              </Link>
              <Link
                to="/companies/$slug"
                params={{ slug: job.companySlug }}
                className="truncate text-sm text-muted-foreground hover:text-foreground"
              >
                {job.company}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-primary"
              aria-label={saved ? "Unsave job" : "Save job"}
            >
              {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
            <span className="inline-flex items-center gap-1"><Banknote className="h-3.5 w-3.5" /> PKR {formatPKR(job.salaryMin)} – {formatPKR(job.salaryMax)}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.postedDays}d ago</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles[job.type] ?? "bg-muted text-muted-foreground"}`}>
              {job.type}
            </span>
            <Link
              to="/jobs/$id"
              params={{ id: job.id }}
              className="inline-flex items-center rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.03] active:scale-[0.97]"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
