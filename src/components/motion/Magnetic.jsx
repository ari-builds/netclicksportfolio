import { useRef, useState } from "react"
import { motion, useSpring, useReducedMotion } from "motion/react"

export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(pointer: fine)").matches && !reduce
  })

  const x = useSpring(0, { stiffness: 160, damping: 16, mass: 0.1 })
  const y = useSpring(0, { stiffness: 160, damping: 16, mass: 0.1 })

  const onMove = (e) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      style={{ x, y, display: "inline-block", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}