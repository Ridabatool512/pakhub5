import { createFileRoute } from "@tanstack/react-router";
import { JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/internships")({
  head: () => ({ meta: [{ title: "Internships in Pakistan — RozgarHub" }, { name: "description", content: "Kick off your career with internships from leading Pakistani companies." }] }),
  component: InternshipsPage,
});

function InternshipsPage() {
  const list = JOBS.filter((j) => j.type === "Internship" || j.experience === "Fresh Graduate");
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl hero-gradient p-8 text-white sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          <GraduationCap className="h-4 w-4" /> Fresh Graduates
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Internships for emerging talent</h1>
        <p className="mt-2 max-w-2xl text-white/75">Earn real-world experience at Pakistan's most respected employers.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
      </div>
    </div>
  );
}