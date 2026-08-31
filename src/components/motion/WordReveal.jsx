import { Fragment, useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

export function WordReveal({ text, className = "", as = "p", stagger = 0.012, baseDelay = 0 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const Tag = as
  const words = text.split(" ").filter(Boolean)

  if (reduce) {
    return <Tag ref={ref} className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: "60%", filter: "blur(4px)" }}
                animate={inView ? { opacity: 1, y: "0%", filter: "blur(0px)" } : undefined}
                transition={{ duration: 0.5, delay: baseDelay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? <span>{" "}</span> : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}