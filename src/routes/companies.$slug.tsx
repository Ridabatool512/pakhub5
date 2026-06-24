import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Building2, MapPin, Users, Globe, ArrowRight } from "lucide-react";
import { COMPANIES, JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/site/JobCard";

export const Route = createFileRoute("/companies/$slug")({
  component: CompanyPage,
});

function CompanyPage() {
  const { slug } = useParams({ from: "/companies/$slug" });
  const company = COMPANIES.find((c) => c.slug === slug);
  const openings = JOBS.filter((j) => j.companySlug === slug);

  if (!company) return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold">Company not found</h1>
      <Link to="/companies" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">Back to companies <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );

  return (
    <div>
      <div className="hero-gradient relative -mt-16 h-56 overflow-hidden pt-16">
        <div className="absolute inset-0 geo-pattern opacity-30" aria-hidden />
      </div>
      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 shadow-xl sm:p-8">
          <div className="flex flex-wrap items-start gap-6">
            <div className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white shadow-lg ${company.logoColor}`}>{company.logo}</div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {company.industry}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {company.location}</span>
                <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {company.employees}</span>
                <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {company.rating} rating</span>
              </div>
            </div>
            <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-white/5">
              <Globe className="h-4 w-4" /> Website
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="glass-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold">About {company.name}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{company.about}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Open positions ({openings.length})</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {openings.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
              </div>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="glass-card p-6 shadow-sm">
              <h3 className="font-display font-bold">Reviews</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="font-display text-4xl font-extrabold">{company.rating}</div>
                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(company.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Based on 240+ employee reviews</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}