import { Link } from "react-router-dom"
import { useRef } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { serviceCategories } from "../svc/ServiceConfig"
import { SectionTitle } from "./motion/SectionTitle"
import { Reveal } from "./motion/Reveal"
import { BladeWipe } from "./motion/BladeWipe"
import { SelfDrawIcon } from "./motion/SelfDrawIcon"

function TiltCard({ children }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * 8)
    ry.set(px * 10)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

export default function CategoryOverview() {
  const reduce = useReducedMotion()
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          label="What we do"
          title="Four ways to grow your business"
          sub="Everything we build fits into one of four areas. Pick a category to see what it does and how it works."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {serviceCategories.map((cat, i) => (
            <Reveal
              key={cat.slug}
              delay={i * 0.08}
              className={reduce ? "" : "sm:even:mt-10"}
            >
              <BladeWipe delay={i * 0.12}>
                <TiltCard>
                <motion.div whileHover={reduce ? undefined : { y: -8 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={`/${cat.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-shadow duration-300"
                    style={{ boxShadow: `0 0 0 0 transparent` }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 20px 60px -20px ${cat.color}44`)}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      <SelfDrawIcon iconName={cat.slug === "lead-gen-outreach" ? "target" : cat.slug === "ads-content" ? "layers" : cat.slug === "websites-apps" ? "sparkles" : "send"} />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">{cat.label}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed flex-1">{cat.how}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      View services
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
                </TiltCard>
              </BladeWipe>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
