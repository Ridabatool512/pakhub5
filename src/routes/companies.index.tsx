import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Building2, MapPin, Users, ArrowRight } from "lucide-react";
import { COMPANIES, jobOpenings } from "@/lib/mock-data";

export const Route = createFileRoute("/companies/")({
  head: () => ({ meta: [{ title: "Top Companies in Pakistan — RozgarHub" }, { name: "description", content: "Discover top employers in Pakistan and their open roles." }] }),
  component: CompaniesPage,
});

function CompaniesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Top companies in Pakistan</h1>
        <p className="mt-2 text-muted-foreground">Explore employers actively hiring on RozgarHub.</p>
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex items-start gap-4">
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white ${c.logoColor}`}>{c.logo}</div>
              <div className="min-w-0 flex-1">
                <Link to="/companies/$slug" params={{ slug: c.slug }} className="block truncate font-display text-lg font-bold hover:text-primary">{c.name}</Link>
                <p className="text-sm text-muted-foreground inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {c.industry}</p>
              </div>
            </div>
            <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{c.about}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.location}</span>
              <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.employees}</span>
              <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{jobOpenings(c.slug)} open roles</span>
              <Link to="/companies/$slug" params={{ slug: c.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}