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
  const line1Y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -40])
  const line2Y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -80])
  const line1Opacity = useTransform(scrollYProgress, [0, 0.2], reduce ? [1, 1] : [0, 1])
  const line2Opacity = useTransform(scrollYProgress, [0.1, 0.3], reduce ? [1, 1] : [0, 1])

  return (
    <section id="founder" ref={ref} className="relative py-32 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground block">
            A Note From The Founder
          </span>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: line1Y, opacity: line1Opacity }}
            className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-foreground"
          >
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              I built NetClicks by Ari
            </span>
          </motion.div>
          <motion.div
            style={{ y: line2Y, opacity: line2Opacity }}
            className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight"
          >
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em] bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">
              for the ambitious ones.
            </span>
          </motion.div>

          <div className="mt-20 md:mt-28 space-y-14 md:space-y-20">
            <div>
              <WordReveal
                as="p"
                text="Digital systems that get you noticed."
                className="font-syne text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90 leading-snug"
                baseDelay={0.05}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
              <WordReveal
                as="p"
                text="Websites that convert."
                className="font-syne text-xl sm:text-2xl font-semibold text-foreground/80 leading-snug"
                baseDelay={0}
              />
              <WordReveal
                as="p"
                text="Lead gen that fills your calendar."
                className="font-syne text-xl sm:text-2xl font-semibold text-foreground/80 leading-snug"
                baseDelay={0.1}
              />
              <WordReveal
                as="p"
                text="Ads that only get paid when you do."
                className="font-syne text-xl sm:text-2xl font-semibold text-foreground/80 leading-snug"
                baseDelay={0.2}
              />
            </div>

            <div className="pt-2 md:pt-4">
              <div className="h-px w-full bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent mb-8 md:mb-10" />
              <WordReveal
                as="p"
                text="We guarantee results."
                className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-snug mb-4"
                baseDelay={0}
              />
              <WordReveal
                as="p"
                text="How good they get depends on how hard you work for it."
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                baseDelay={0.15}
              />
            </div>
          </div>
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
