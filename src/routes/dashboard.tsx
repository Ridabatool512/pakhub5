import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, FileText, Bookmark, Bell, Upload, BarChart3, Plus, Edit, Eye, CheckCircle2, User as UserIcon, Award, Target } from "lucide-react";
import { JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RozgarHub" }, { name: "description", content: "Manage your applications, saved jobs and listings." }] }),
  component: DashboardPage,
});

type View = "candidate" | "employer";

function DashboardPage() {
  const [view, setView] = useState<View>("candidate");
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Welcome back, Ayesha</h1>
          <p className="text-muted-foreground">Here's what's happening with your account today.</p>
        </div>
        <div className="flex rounded-xl glass p-1 text-sm font-semibold">
          {(["candidate", "employer"] as View[]).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`rounded-lg px-4 py-2 capitalize transition ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{v}</button>
          ))}
        </div>
      </div>

      {view === "candidate" ? <CandidateDashboard /> : <EmployerDashboard />}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color = "text-primary" }: { icon: typeof Briefcase; label: string; value: string; color?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-5 shadow-sm">
      <div className={`grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ${color}`}><Icon className="h-5 w-5" /></div>
      <div className="mt-4 font-display text-2xl font-extrabold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function CandidateDashboard() {
  const recommended = JOBS.slice(0, 3);
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileText} label="Applied" value="12" />
          <StatCard icon={Bookmark} label="Saved" value="34" />
          <StatCard icon={Eye} label="Profile views" value="218" color="text-success" />
          <StatCard icon={Bell} label="Interviews" value="3" color="text-warning" />
        </div>

        <section className="glass-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">Profile completion</h2>
              <p className="text-sm text-muted-foreground">Complete your profile to get 3x more views.</p>
            </div>
            <span className="font-display text-2xl font-extrabold text-primary">72%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold">Recommended for you</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recommended.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <div className="glass-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><UserIcon className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">Ayesha Khan</div>
              <div className="text-xs text-muted-foreground">Frontend Developer</div>
            </div>
          </div>
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-white/5/30 px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-white/5">
            <Upload className="h-4 w-4" /> Upload Resume
          </button>
        </div>
        <div className="glass-card p-6 shadow-sm">
          <h3 className="font-display font-bold">Upcoming interview</h3>
          <div className="mt-3 rounded-xl bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase text-primary">Tomorrow · 3:00 PM</div>
            <div className="mt-1 font-semibold">Techlogix Pakistan</div>
            <div className="text-xs text-muted-foreground">Frontend Developer — Tech Screen</div>
          </div>
        </div>
        <div className="glass-card p-6 shadow-sm">
          <h3 className="font-display font-bold">Recently viewed</h3>
          <ul className="mt-3 space-y-3">
            {JOBS.slice(3, 6).map((j) => (
              <li key={j.id}>
                <Link to="/jobs/$id" params={{ id: j.id }} className="block rounded-lg p-2 hover:bg-white/5">
                  <div className="text-sm font-semibold">{j.title}</div>
                  <div className="text-xs text-muted-foreground">{j.company} · {j.location}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function EmployerDashboard() {
  const myJobs = JOBS.slice(0, 4);
  const funnel = [
    { label: "Viewed", value: 4820, pct: 100 },
    { label: "Applied", value: 342, pct: 68 },
    { label: "Shortlisted", value: 47, pct: 32 },
    { label: "Hired", value: 6, pct: 12 },
  ];
  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Active listings" value="8" />
        <StatCard icon={FileText} label="Applicants" value="342" color="text-success" />
        <StatCard icon={Target} label="Shortlisted" value="47" color="text-warning" />
        <StatCard icon={Award} label="Hires this month" value="6" />
      </div>

      <section className="glass-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">Hiring funnel</h2>
            <p className="text-sm text-muted-foreground">Performance across your active jobs this month.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Post a job</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {funnel.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-xl font-extrabold">{s.value.toLocaleString()}</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Your job listings</h2>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Position</th><th>Applicants</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {myJobs.map((j, i) => (
                <tr key={j.id} className="border-t border-border">
                  <td className="py-3"><div className="font-semibold">{j.title}</div><div className="text-xs text-muted-foreground">{j.location}</div></td>
                  <td>{20 + i * 17}</td>
                  <td><span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success"><CheckCircle2 className="h-3 w-3" /> Active</span></td>
                  <td className="text-right"><button className="rounded-lg p-2 hover:bg-white/5"><Edit className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}