import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  className = "",
  pad = 0,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [val, setVal] = useState(() =>
    reduce ? to : from,
  )

  useEffect(() => {
    if (reduce) return
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, from, to, duration])

  const formatted = String(val).padStart(pad, "0")
  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}