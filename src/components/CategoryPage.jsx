import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, Check } from "lucide-react"
import { serviceCategories } from "../svc/ServiceConfig"
import { Reveal } from "./motion/Reveal"

const iconMap = {
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
  share2: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>,
  fileText: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8M10 9H8" /></svg>,
  palette: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z" /><path d="M8 9a1 1 0 110-2 1 1 0 010 2zM16 9a1 1 0 110-2 1 1 0 010 2zM7 13a1 1 0 110-2 1 1 0 010 2z" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>,
  shoppingCart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" /></svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M14.7 6.3a5 5 0 00-6.8 6.8L2 19l3 3 5.9-5.9a5 5 0 006.8-6.8L14 13l-3-3 3.7-3.7z" /></svg>,
  smartphone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  bot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 8V4M8 4h8" /><circle cx="9" cy="14" r="1" /><circle cx="15" cy="14" r="1" /><path d="M4 14H2v4h2" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.8.7a2 2 0 011.7 2z" /></svg>,
  gitBranch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="6" r="3" /><path d="M6 9v6M18 9a9 9 0 01-9 9" /></svg>,
  barChart3: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M3 3v18h18" /><path d="M7 15v3M12 9v9M17 5v13" /></svg>,
  plug: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-6 h-6"><path d="M12 22v-5M9 10V2M15 10V2M6 10h12v3a6 6 0 01-12 0v-3z" /></svg>,
}

export default function CategoryPage({ categorySlug }) {
  const category = serviceCategories.find((c) => c.slug === categorySlug)
  if (!category) return null
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to overview
        </Link>

        <span className="block text-sm font-semibold tracking-widest text-muted-foreground">
          The service
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          {category.label}
        </motion.h1>

        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">{category.description}</p>

        {category.how && (
          <Reveal className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                How it works
              </span>
              <p className="mt-3 text-foreground/90 leading-relaxed max-w-3xl">{category.how}</p>
              {category.steps && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {category.steps.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 rounded-xl bg-muted/40 p-4"
                    >
                      <span
                        className="flex w-8 h-8 items-center justify-center rounded-lg text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: category.color }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground/90">{step}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        <div className="mt-12 space-y-8">
          {category.services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: service.color }}
                  >
                    {iconMap[service.iconName]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{service.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-6 grid md:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f.title} className="rounded-xl bg-muted/40 p-4">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: service.color }} />
                        <div>
                          <div className="font-semibold text-sm">{f.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
