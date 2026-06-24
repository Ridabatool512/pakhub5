import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — RozgarHub Pakistan" }, { name: "description", content: "Get in touch with the RozgarHub Pakistan team." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Have questions about hiring, posting jobs, or your account? We're here to help.</p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <InfoCard icon={Mail} title="Email us" body="hello@rozgarhub.pk" />
          <InfoCard icon={Phone} title="Call us" body="+92 51 123 4567" />
          <InfoCard icon={MapPin} title="Visit us" body="Constitution Avenue, Islamabad, Pakistan" />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="glass-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" placeholder="Your name" />
            <Field label="Email" placeholder="you@email.com" type="email" />
          </div>
          <div className="mt-4">
            <Field label="Subject" placeholder="How can we help?" />
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea rows={5} placeholder="Tell us a bit more..." className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02]">
            <Send className="h-4 w-4" /> Send message
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: typeof Mail; title: string; body: string }) {
  return (
    <div className="glass-card p-5 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <div className="mt-4 font-display font-bold">{title}</div>
      <div className="text-sm text-muted-foreground">{body}</div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}