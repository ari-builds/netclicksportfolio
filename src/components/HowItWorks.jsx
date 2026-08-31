import { motion, useReducedMotion } from "motion/react"
import { serviceCategories } from "../svc/ServiceConfig"
import { SectionTitle } from "./motion/SectionTitle"
import { Reveal } from "./motion/Reveal"

export default function HowItWorks() {
  const reduce = useReducedMotion()
  return (
    <section id="impact" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          label="How it works"
          title="Straightforward, start to finish"
          sub="Each area of our work runs the same way. Clear steps, no mystery."
        />

        <div className="mt-14 space-y-8">
          {serviceCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={0.05}>
              <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div
                    className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl text-white text-lg font-bold"
                    style={{ backgroundColor: cat.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold leading-tight">{cat.label}</h3>
                </div>
                <ol className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {cat.steps.map((step, j) => (
                    <motion.li
                      key={step}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: 0.1 + j * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"
                    >
                      <span
                        className="mt-0.5 w-6 h-6 shrink-0 rounded-md flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {j + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground leading-snug">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
