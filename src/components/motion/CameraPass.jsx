import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"

export function CameraPass({ children, className = "" }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const rotateXSpring = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [14, 0, -6]),
    { stiffness: 90, damping: 20 },
  )
  const rotateYSpring = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [-10, 0, 8]),
    { stiffness: 90, damping: 20 },
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.95, 1, 0.98])

  return (
    <motion.div ref={ref} style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, scale, transformPerspective: 1400 }} className={className}>
      {children}
    </motion.div>
  )
}