import { createFileRoute } from "@tanstack/react-router";
import { JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/freelance-jobs")({
  head: () => ({ meta: [{ title: "Freelance Jobs in Pakistan — RozgarHub" }, { name: "description", content: "Discover freelance and contract opportunities for Pakistani professionals." }] }),
  component: FreelancePage,
});

function FreelancePage() {
  const list = JOBS.filter((j) => j.type === "Freelance" || j.type === "Contract" || j.type === "Remote");
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl hero-gradient p-8 text-white sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          <Zap className="h-4 w-4" /> Work from anywhere
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Freelance & remote opportunities</h1>
        <p className="mt-2 max-w-2xl text-white/75">Independent contracts, project work and remote-first roles for Pakistan's growing freelance economy.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
      </div>
    </div>
  );
}