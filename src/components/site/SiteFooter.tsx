import { Link } from "@tanstack/react-router";
import { Briefcase, Globe, Send, MessageSquare, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 glass-nav text-foreground">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Briefcase className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-extrabold">
              Rozgar<span className="text-accent">Hub</span> Pakistan
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-secondary-foreground/70">
            Pakistan's modern career platform — discover jobs, internships and freelance work from leading companies across the country.
          </p>
          <form className="mt-6 flex max-w-sm overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="grid w-11 place-items-center text-secondary-foreground/60">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-transparent py-2.5 text-sm placeholder:text-secondary-foreground/40 focus:outline-none"
            />
            <button type="button" className="bg-primary px-4 text-sm font-semibold text-primary-foreground">
              Subscribe
            </button>
          </form>
        </div>

        <FooterCol title="For Candidates" links={[
          { to: "/jobs", label: "Browse Jobs" },
          { to: "/internships", label: "Internships" },
          { to: "/dashboard", label: "My Dashboard" },
          { to: "/freelance-jobs", label: "Freelance" },
        ]} />
        <FooterCol title="For Employers" links={[
          { to: "/dashboard", label: "Post a Job" },
          { to: "/companies", label: "Browse Companies" },
          { to: "/dashboard", label: "Hiring Insights" },
          { to: "/contact", label: "Talk to Sales" },
        ]} />
        <FooterCol title="Company" links={[
          { to: "/", label: "About" },
          { to: "/contact", label: "Contact" },
          { to: "/", label: "Privacy" },
          { to: "/", label: "Terms" },
        ]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-secondary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} RozgarHub Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Website" className="hover:text-secondary-foreground"><Globe className="h-4 w-4" /></a>
            <a href="#" aria-label="Email" className="hover:text-secondary-foreground"><Mail className="h-4 w-4" /></a>
            <a href="#" aria-label="Chat" className="hover:text-secondary-foreground"><MessageSquare className="h-4 w-4" /></a>
            <a href="#" aria-label="Send" className="hover:text-secondary-foreground"><Send className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-secondary-foreground/90">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-secondary-foreground">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
