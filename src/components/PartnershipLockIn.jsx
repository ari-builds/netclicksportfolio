import { Link } from "react-router-dom"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ShieldCheck, Handshake, Clock, FileLock, ChevronRight } from "lucide-react"
import { SectionTitle } from "./motion/SectionTitle"

const PARTNERSHIP_PROMISES = [
  { icon: ShieldCheck, text: "Clear scope, no surprises" },
  { icon: Clock, text: "Committed deadline, on time" },
  { icon: FileLock, text: "NDA anytime you need it" },
  { icon: Handshake, text: "Fixed price, honest work" },
]

const MOTIONS =
  "White-label builds, referrals, co-delivery, or a fuller growth partnership. If you already run a business selling to those businesses, we can be the quiet build arm behind you."

export default function PartnershipLockIn() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section id="partners" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          center
          label="Partnerships"
          title="Built for partners, not just clients"
          sub="You have the relationship with the business. We handle the build. Together we move faster."
        />

        <div ref={ref} className="relative mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-stretch">
          {/* Partner card (slides in from left) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -70 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center"
          >
            <div className="text-4xl font-black tracking-tight text-foreground">You</div>
            <p className="mt-2 text-sm text-muted-foreground">Own the client relationship, the account, and the brand.</p>
            <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />Tell us the outcome they need</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />We scope and build it</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />You deliver it as yours</li>
            </ul>
          </motion.div>

          {/* Connect mark (self-drawing) */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" fill="none" stroke="#8b9cf6" strokeWidth="2">
                {!reduce && <animate attributeName="stroke-dasharray" values="0 200; 164 200" dur="0.8s" begin="0.6s" fill="freeze" />}
                {!reduce && <animate attributeName="opacity" values="0;0;1" dur="0.8s" begin="0.6s" fill="freeze" />}
              </circle>
              <text x="28" y="33" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700" fontFamily="inherit">+</text>
            </svg>
          </motion.div>

          {/* NetClicks card (slides in from right) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 70 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center"
          >
            <div className="text-4xl font-black tracking-tight text-foreground">NetClicks</div>
            <p className="mt-2 text-sm text-muted-foreground">Do the strategy, design, build, and launch on a fixed scope.</p>
            <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />Websites, lead gen, content, automation</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />Your brand on everything</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" />NDA and confidentiality on request</li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-xl text-center text-base text-muted-foreground"
        >
          {MOTIONS}
        </motion.p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {PARTNERSHIP_PROMISES.map((p, i) => (
            <motion.div
              key={p.text}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground"
            >
              <p.icon className="w-4 h-4 text-primary" />
              {p.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/#cta"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
            style={{ background: "linear-gradient(90deg, #00F2FF, #8b9cf6)" }}
          >
            Partner with us <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}