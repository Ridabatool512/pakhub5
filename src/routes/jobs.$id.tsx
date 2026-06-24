import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Banknote, Clock, Briefcase, CheckCircle2, Building2, ArrowRight, Bookmark } from "lucide-react";
import { JOBS, formatPKR } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";

export const Route = createFileRoute("/jobs/$id")({
  component: JobDetailPage,
});

function JobDetailPage() {
  const { id } = useParams({ from: "/jobs/$id" });
  const job = JOBS.find((j) => j.id === id);
  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Job not found</h1>
        <Link to="/jobs" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">Back to jobs <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const similar = JOBS.filter((j) => j.id !== job.id && (j.industry === job.industry || j.type === job.type)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start gap-5">
          <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-bold text-white ${job.logoColor}`}>{job.logo}</div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{job.title}</h1>
            <Link to="/companies/$slug" params={{ slug: job.companySlug }} className="text-muted-foreground hover:text-primary">{job.company}</Link>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span className="inline-flex items-center gap-1"><Banknote className="h-4 w-4" /> PKR {formatPKR(job.salaryMin)} – {formatPKR(job.salaryMax)}</span>
              <span className="inline-flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {job.postedDays}d ago</span>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.03]">
              Apply Now
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-white/5">
              <Bookmark className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Section title="About the role"><p className="leading-relaxed text-muted-foreground">{job.description}</p></Section>
          <Section title="Responsibilities"><BulletList items={job.responsibilities} /></Section>
          <Section title="Requirements"><BulletList items={job.requirements} /></Section>
          <Section title="Benefits"><BulletList items={job.benefits} /></Section>
        </div>
        <aside className="space-y-6">
          <div className="glass-card p-6 shadow-sm">
            <h3 className="font-display font-bold">About the company</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-white ${job.logoColor}`}>{job.logo}</div>
              <div>
                <div className="font-semibold">{job.company}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Building2 className="h-3 w-3" /> {job.industry}</div>
              </div>
            </div>
            <Link to="/companies/$slug" params={{ slug: job.companySlug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View company <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="glass-card p-6 shadow-sm">
            <h3 className="font-display font-bold">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-extrabold">Similar jobs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {similar.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-card p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}