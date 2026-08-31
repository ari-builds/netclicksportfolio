import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { createPortal } from "react-dom"
import { Target, BarChart3, Zap, Users, X, ChevronDown } from "lucide-react"
import { SectionTitle } from "./motion/SectionTitle"
import { Reveal } from "./motion/Reveal"
import { Magnetic } from "./motion/Magnetic"
import { Spotlight } from "./Spotlight"
import { WordReveal } from "./motion/WordReveal"

const whyUsFeatures = [
  {
    icon: Target,
    title: "Built to convert",
    description: "Every decision we make is aimed at one thing: getting your customer to take action. Design, copy, and flow all serve that goal.",
  },
  {
    icon: BarChart3,
    title: "Based on what works",
    description: "We track what performs with real analytics and iterate from the numbers. Creative decisions are built on measured results, not guesses.",
  },
  {
    icon: Zap,
    title: "Fast without shortcuts",
    description: "We ship production-ready work quickly, then keep improving it. Speed matters, but we never break what you rely on.",
  },
  {
    icon: Users,
    title: "One team for everything",
    description: "Websites, content, ads, automation. One team handles it all, so you never juggle five agencies or point fingers between them.",
  },
]

export function WhyUs() {
  return (
    <section id="why" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          center
          label="The Difference"
          title="Why NetClicks"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUsFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="relative rounded-2xl p-8 border border-border bg-card hover:bg-card/80 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-[#8B5CF6]/10 border border-blue-600/20 flex items-center justify-center text-blue-600 mb-5">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FounderNote() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const avatarY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  return (
    <section id="founder" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 block">
            A Note From Our Founder
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <motion.div
            style={{ y: avatarY }}
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
                <div className="text-sm text-muted-foreground font-medium">Founder</div>
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
              <WordReveal
                as="p"
                text="I am Ariana and I went into this industry to help other ambitious entrepreneurs like myself."
                className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                baseDelay={0.1}
              />
              <WordReveal
                as="p"
                text="In today's age, sometimes it feels like everyone is promising guaranteed success and ROI. They try to differentiate themselves from their competitors but honestly, for 99% of them, there is no difference. Most of them are incompetent, and now with AI, everyone thinks they are a software engineer, but they don't even know how to use it correctly."
                className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                baseDelay={0.3}
              />
              <WordReveal
                as="p"
                text="A lot of people looking for the help they offer have been burned, so they start trying to do things themselves. I get that, but that is because most victims looked at the most convenient or maybe even cheapest option in front of them without looking at the stats. They focused on the short-term and ended up losing right at that moment, and in the long-term."
                className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                baseDelay={0.5}
              />
              <WordReveal
                as="p"
                text="We are not trying to sell you on just one project and then leave you to figure out the rest. We value building strong relationships with our clients so that we can grow together."
                className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                baseDelay={0.7}
              />
              <WordReveal
                as="p"
                text="If you are ambitious and want to grow your business, we don't guarantee all our clients will achieve the same level of success, but how successful you are depends on how much you work for it."
                className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8"
                baseDelay={0.9}
              />
              <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
              <span className="text-foreground font-semibold italic text-lg">— Ariana</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-3">Work with us. Grow with us.</p>
              <p className="text-sm text-muted-foreground">Your future depends on what you do right now.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const faqData = [
  {
    q: "What if I'm not satisfied with the result?",
    a: "Before building, we agree on the scope, timeline, and what both parties need to do. If everything is done correctly on your end and the results aren't achieved, you get your money back plus what was negotiated.",
  },
  {
    q: "Do you handle SEO as well?",
    a: "Yes. Every site we build comes with on-page SEO, and we offer ongoing SEO strategy as a standalone service.",
  },
  {
    q: "Do you work with my industry?",
    a: "Yes — we work with all industries. Whether you're a local service business, an e-commerce brand, or a B2B company, our systems adapt to your market.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is scoped before we start, so you always know the full price upfront. You approve the scope and the fixed cost first — no surprise invoices after we begin.",
  },
  {
    q: "How long does it take?",
    a: "A standard website goes live in about two to four weeks. Larger systems are scoped with a committed timeline before we start, and we hold ourselves to that deadline.",
  },
  {
    q: "Who owns the website?",
    a: "You do. The domain, the content, the build, and all the accounts are yours. There's no lock-in — if you ever want to leave, you keep everything and can take it anywhere.",
  },
  {
    q: "Do I have to commit to a monthly retainer?",
    a: "No. Ongoing services like lead generation, content, and automation run month to month, and you can pause or cancel anytime. There's no locked-in contract.",
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-card/80 transition-colors"
      >
        <span className="font-semibold text-foreground">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5"
        >
          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
        </motion.div>
      )}
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          center
          label="FAQ"
          title="Common Questions"
          className="mb-12"
          sub="Answers to the questions we hear most before we start."
        />
        <div className="flex flex-col gap-3">
          {faqData.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <FAQItem item={item} />
            </Reveal>
          ))}
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
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/10 text-muted-foreground">
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

export function EmailCapture() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
            Get a Free Website Audit
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We will review your current site and show you exactly where you are losing leads — for free.
          </p>
          <a
            href="mailto:netclicksbyari@gmail.com?subject=Free%20Website%20Audit&body=Hi%20Ariana%2C%20I%27d%20like%20a%20free%20website%20audit.%20My%20website%20is%3A%20"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-card hover:bg-card/80 text-foreground font-semibold transition-all hover:scale-105"
          >
            Request Your Free Audit
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export function CTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Spotlight />
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
            Want to grow?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Book a free discovery call. We listen first, then tell you honestly what we can build and what it will take. No pressure, no fluff.
          </p>
          <Magnetic>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              Book a Discovery Call
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Magnetic>
          <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <p className="mt-6 text-sm text-muted-foreground">
            Free 15 to 30 minute call &middot; No commitment
          </p>
        </motion.div>
      </div>
    </section>
  )
}
