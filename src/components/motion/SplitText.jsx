import { Fragment, useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

export function SplitText({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.75,
  blur = 6,
  amount = 0.35,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  const Tag = as
  const words = text.split(" ").filter(Boolean)

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: "110%", filter: blur ? `blur(${blur}px)` : "blur(0px)" }}
                animate={
                  inView
                    ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration,
                  delay: delay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}