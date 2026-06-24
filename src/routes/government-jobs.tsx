import { createFileRoute } from "@tanstack/react-router";
import { JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";
import { BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/government-jobs")({
  head: () => ({ meta: [{ title: "Government Jobs in Pakistan — RozgarHub" }, { name: "description", content: "Latest government jobs across Pakistan from federal and provincial departments." }] }),
  component: GovPage,
});

function GovPage() {
  const list = JOBS.filter((j) => j.type === "Government");
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl hero-gradient p-8 text-white sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          <BadgeCheck className="h-4 w-4" /> Government of Pakistan
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Government Jobs in Pakistan</h1>
        <p className="mt-2 max-w-2xl text-white/75">Federal, provincial and autonomous body opportunities — verified and updated regularly.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
      </div>
    </div>
  );
}