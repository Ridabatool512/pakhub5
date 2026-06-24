import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { JobCard } from "@/components/site/JobCard";
import { CITIES, EXPERIENCE_LEVELS, INDUSTRIES, JOBS, JOB_TYPES, SALARY_RANGES } from "@/lib/mock-data";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Find Jobs in Pakistan — RozgarHub" },
      { name: "description", content: "Browse thousands of jobs from top Pakistani companies." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [exp, setExp] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState<"newest" | "salary" | "relevance">("newest");
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);
  const perPage = 6;

  const filtered = useMemo(() => {
    let r = JOBS.filter((j) => {
      if (query && !`${j.title} ${j.company} ${j.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (city && j.location !== city) return false;
      if (type && j.type !== type) return false;
      if (exp && j.experience !== exp) return false;
      if (industry && j.industry !== industry) return false;
      if (minSalary && j.salaryMax < minSalary) return false;
      return true;
    });
    if (sort === "newest") r = [...r].sort((a, b) => a.postedDays - b.postedDays);
    if (sort === "salary") r = [...r].sort((a, b) => b.salaryMax - a.salaryMax);
    return r;
  }, [query, city, type, exp, industry, minSalary, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const reset = () => { setCity(""); setType(""); setExp(""); setIndustry(""); setMinSalary(0); setQuery(""); setPage(1); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Find your next role</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} jobs available across Pakistan</p>
      </motion.div>

      <div className="flex gap-2 glass-card p-2 shadow-sm">
        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by title, company or skill..."
            className="w-full bg-transparent py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button onClick={() => setOpenFilters((o) => !o)} className="inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-2 text-sm font-medium lg:hidden">
          <Filter className="h-4 w-4" /> Filters
        </button>
        <div className="relative hidden sm:block">
          <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "salary" | "relevance")} className="appearance-none rounded-xl border border-border bg-background py-2 pl-3 pr-9 text-sm font-medium focus:outline-none">
            <option value="newest">Newest</option>
            <option value="salary">Highest salary</option>
            <option value="relevance">Relevance</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className={`${openFilters ? "block" : "hidden"} lg:block`}>
          <div className="space-y-6 glass-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold">Filters</h3>
              <button onClick={reset} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                <X className="h-3 w-3" /> Reset
              </button>
            </div>
            <FilterGroup label="Location" options={CITIES as unknown as string[]} value={city} onChange={(v) => { setCity(v); setPage(1); }} />
            <FilterGroup label="Job Type" options={JOB_TYPES} value={type} onChange={(v) => { setType(v); setPage(1); }} />
            <FilterGroup label="Experience" options={EXPERIENCE_LEVELS as unknown as string[]} value={exp} onChange={(v) => { setExp(v); setPage(1); }} />
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Salary Range</div>
              <div className="space-y-1">
                {SALARY_RANGES.map((s) => (
                  <label key={s.label} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-white/5">
                    <input type="radio" name="salary" checked={minSalary === s.min} onChange={() => { setMinSalary(s.min); setPage(1); }} className="accent-primary" />
                    {s.label}
                  </label>
                ))}
              </div>
            </div>
            <FilterGroup label="Industry" options={INDUSTRIES as unknown as string[]} value={industry} onChange={(v) => { setIndustry(v); setPage(1); }} />
          </div>
        </aside>

        <div>
          {pageData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-display text-lg font-bold">No jobs match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try resetting filters or searching different keywords.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pageData.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold ${page === p ? "bg-primary text-primary-foreground" : "glass hover:bg-white/5"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="space-y-1">
        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-white/5">
          <input type="radio" name={label} checked={value === ""} onChange={() => onChange("")} className="accent-primary" />
          All
        </label>
        {options.map((o) => (
          <label key={o} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-white/5">
            <input type="radio" name={label} checked={value === o} onChange={() => onChange(o)} className="accent-primary" />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}