import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react"

const STATEMENT = "Digital systems that get your business noticed"

export function ScrollVelocity() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  const lag = useSpring(scrollY, { stiffness: 90, damping: 24, mass: 0.8 })
  const x = useTransform(lag, [0, 2400], [64, -64])

  const half = Array.from({ length: 8 }, () => STATEMENT)
  const row = [...half, ...half]

  if (reduce) {
    return (
      <section aria-hidden="true" className="relative overflow-hidden border-y border-border/60 bg-background py-10 md:py-14">
        <div className="flex w-max whitespace-nowrap px-6 text-4xl md:text-7xl font-extrabold uppercase tracking-tight text-foreground/10">
          {half.map((t, i) => (
            <span key={i} className="mx-6">
              {t} <span className="text-foreground/15">{"\u2022"}</span>
            </span>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section aria-hidden="true" className="relative overflow-hidden border-y border-border/60 bg-background py-10 md:py-14">
      <motion.div style={{ x }} className="relative">
        <div className="flex w-max whitespace-nowrap animate-[vidmarq_36s_linear_infinite] px-6 text-4xl md:text-7xl font-extrabold uppercase tracking-tight text-foreground/10">
          {row.map((t, i) => (
            <span key={i} className="mx-6">
              {t} <span className="text-foreground/15">{"\u2022"}</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes vidmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </motion.div>
    </section>
  )
}