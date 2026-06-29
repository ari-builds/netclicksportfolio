import { useState } from "react"
import { motion } from "motion/react"
import { createPortal } from "react-dom"
import { Target, BarChart3, Zap, Users, X } from "lucide-react"

const whyUsFeatures = [
  {
    icon: Target,
    title: "Conversion-First Thinking",
    description: "Every design decision, every word, every pixel is reverse-engineered from a single goal: getting your ideal customer to act.",
  },
  {
    icon: BarChart3,
    title: "Data-Backed Creativity",
    description: "We don't guess. We test, measure, and iterate. Our creative process is built on analytics, not assumptions.",
  },
  {
    icon: Zap,
    title: "Speed to Market",
    description: "In B2B, velocity wins. We move fast without breaking things — shipping production-ready work in days, not months.",
  },
  {
    icon: Users,
    title: "Full-Stack Partnership",
    description: "Design, brand, ads, automation — all under one roof. No more coordinating five agencies. One team, one vision, total accountability.",
  },
]

export function WhyUs() {
  return (
    <section id="why" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#F472B6] mb-4 block">
            The Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-[#F472B6] to-[#8B5CF6] bg-clip-text text-transparent">
              NetClicks
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUsFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-8 border border-border bg-card hover:bg-card/80 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-[#8B5CF6]/10 border border-blue-600/20 flex items-center justify-center text-blue-600 mb-5">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FounderNote() {
  return (
    <section id="founder" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#8B5CF6] mb-4 block">
            A Note From Our Founder
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,242,255,0.08) 0%, rgba(139,92,246,0.12) 50%, rgba(244,114,182,0.08) 100%)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
              </div>
              <svg viewBox="0 0 200 260" className="w-40 h-auto relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="72" r="38" fill="url(#avatarGrad)" />
                <path d="M30 260 Q30 180 100 165 Q170 180 170 260Z" fill="url(#avatarGrad)" />
                <defs>
                  <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#F472B6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-6 left-6">
                <div className="text-xl font-bold text-foreground">Ariana</div>
                <div className="text-sm text-muted-foreground font-medium">Founder & CEO</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl p-8 md:p-10 border border-border bg-card">
              <svg className="w-10 h-10 text-blue-600/30 mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                I started NetClicks because I saw too many brilliant B2B companies pouring money into digital marketing and getting mediocre results. The problem was never the budget — it was the architecture. Bad funnels, forgettable brands, disconnected campaigns.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                We built NetClicks to be the partner I wish existed — one that combines world-class design, relentless performance optimization, and the latest in AI to create growth systems that actually compound.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
                If you're serious about scaling, let's talk. No pitch decks. No fluff. Just a real conversation about what's possible.
              </p>
              <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
              <span className="text-foreground font-semibold italic text-lg">— Ariana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const callOptions = [
  {
    label: "15 Minute Call",
    description: "Quick intro — perfect if you have a focused question or want a fast overview.",
    duration: "15 min",
    url: "https://cal.com/netclicksbyari/15min",
  },
  {
    label: "30 Minute Call",
    description: "Deep dive — we map out your growth strategy and explore what's possible together.",
    duration: "30 min",
    url: "https://cal.com/netclicksbyari/30min",
  },
]

function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: "28rem" }}
      >
        <div
          className="relative w-full rounded-2xl border border-border bg-white p-8"
          style={{
            boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="mb-8 pr-4">
            <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">Book a Discovery Call</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Choose a time that works for you. All calls are free with no obligations.</p>
          </div>
          <div className="flex flex-col gap-4">
            {callOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => { window.open(opt.url, "_blank"); onClose() }}
                className="group relative w-full rounded-xl border border-border bg-gradient-to-br from-blue-600/10 to-[#8B5CF6]/5 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/10 text-blue-600">
                      <span className="w-3 h-3 inline-block" />{opt.duration}
                    </div>
                    <span className="text-base font-semibold text-foreground">{opt.label}</span>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed pl-0.5">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

export function CTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, rgba(244,114,182,0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Ready to Scale?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Book a free discovery call and let's map out a growth plan tailored to your brand. No obligations, no pitch decks — just strategy.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            Book a Discovery Call
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <p className="mt-6 text-sm text-muted-foreground">
            Free 15-to-30-minute call &middot; No commitment &middot; Results-focused
          </p>
        </motion.div>
      </div>
    </section>
  )
}
