import { useRef, useState, useEffect } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { SectionTitle } from "./motion/SectionTitle"
import { CameraPass } from "./motion/CameraPass"

const NODES = [
  { label: "Websites & Apps", role: "bring them in", color: "#8b9cf6", x: 260, y: 90 },
  { label: "Lead Gen + Outreach", role: "fill the pipeline", color: "#8b9cf6", x: 480, y: 260 },
  { label: "Ads & Content", role: "earn attention", color: "#8b9cf6", x: 260, y: 430 },
  { label: "AI Automation", role: "keep them coming back", color: "#8b9cf6", x: 40, y: 260 },
]

export default function SystemFlywheel() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const on = () => setIsDesktop(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  return (
    <section id="system" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          center
          label="The System"
          title="One system. Four engines."
          sub="Websites, lead generation, content, and automation wired together so customers come in and keep coming back."
        />

        <div ref={ref} className="relative mt-14">
          {reduce || !isDesktop ? (
            /* Mobile + reduced motion: compact static grid */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {NODES.map((n) => (
                <div key={n.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                  <div className="text-sm font-bold text-foreground">{n.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{n.role}</div>
                </div>
              ))}
            </div>
          ) : (
            <CameraPass className="mx-auto w-full max-w-2xl">
            <svg
              viewBox="0 0 520 520"
              className="w-full"
              role="img"
              aria-label="System flywheel"
            >
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#8b9cf6" />
                </marker>
                <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8b9cf6" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#8b9cf6" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* orbit ring */}
              <circle cx="260" cy="260" r="150" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 6" />

              {/* wires (directed toward center so they "bring in") */}
              {NODES.map((n, i) => {
                const cx2 = 260
                const cy2 = 260
                const d = `M${n.x},${n.y} C ${(n.x + cx2) / 2},${(n.y + cy2) / 2 - 40} ${(n.x + cx2) / 2 + 30},${(n.y + cy2) / 2 + 40} ${cx2},${cy2}`
                return (
                  <g key={n.label}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="url(#wire)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                      markerEnd="url(#arrow)"
                    />
                  </g>
                )
              })}

              {/* pulsing customer core */}
              <circle cx="260" cy="260" r="44" fill="hsl(var(--primary) / 0.12)" stroke="#8b9cf6" strokeWidth="1.5">
                <animate attributeName="r" values="38;46;38" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="260" y="255" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700" fontFamily="inherit">
                Your customers
              </text>
              <text x="260" y="272" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">
                wired together
              </text>

              {/* orbit nodes */}
              {NODES.map((n, i) => (
                <motion.g
                  key={n.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                >
                  <circle cx={n.x} cy={n.y} r="52" fill="var(--card)" stroke="#8b9cf6" strokeWidth="1.2">
                    <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
                  </circle>
                  <text x={n.x} y={n.y - 4} textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" fontFamily="inherit">
                    {n.label.split(" + ").slice(0, 2).map((p) => p.split(" ")[0]).join("\n")}
                  </text>
                  <text x={n.x} y={n.y + 16} textAnchor="middle" fill="var(--muted-foreground)" fontSize="9">
                    {n.role}
                  </text>
                </motion.g>
              ))}

              {/* glow embers drifting toward core */}
              {NODES.map((n, i) => (
                <circle key={`ember-${i}`} r="3" fill="#8b9cf6" opacity="0.7">
                  <animateMotion dur={`${3 + i * 0.6}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${n.x},${n.y} Q ${(n.x + 260) / 2},${(n.y + 260) / 2} 260,260`} />
                </circle>
              ))}
            </svg>
            </CameraPass>
          )}

          {/* connective callout strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border/70 bg-card/50 p-4 text-center"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-foreground">{n.role}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}