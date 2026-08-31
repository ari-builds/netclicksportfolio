import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

export function CursorFollower() {
  const reduce = useReducedMotion()
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(pointer: fine)").matches && !reduce
  })
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.4 })
  const ringY = useSpring(my, { stiffness: 260, damping: 26, mass: 0.4 })
  const entered = useRef(false)

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!entered.current) {
        entered.current = true
        setVisible(true)
      }
    }
    const leave = () => {
      entered.current = false
      setVisible(false)
    }
    const start = () => {
      entered.current = true
      setVisible(true)
    }
    window.addEventListener("mousemove", move)
    document.documentElement.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", start)
    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", start)
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <motion.div
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-foreground/70"
        style={{ x: mx, y: my, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full border border-foreground/25"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </div>
  )
}