import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Flip to black 0.5s before the "dreams into reality" reveal so the baked
// watermark frames are never visible on mobile.
const FADE_TO_BLACK = 4.49

const cues = [
  { id: 1, text: "Every business starts with a dream", start: 0.5, end: 4.99 },
  { id: 9, text: "We turn your dreams into reality", start: 4.99, end: 999, linger: true },
]

export function VideoOverlays({ videoRef }) {
  const [activeId, setActiveId] = useState(null)
  const [fadedToBlack, setFadedToBlack] = useState(false)

  const evaluate = useCallback(
    (t) => {
      const active = cues.find((c) => t >= c.start && t <= c.end)
      setActiveId((prev) => {
        const next = active ? active.id : null
        return prev === next ? prev : next
      })
      setFadedToBlack((prev) => {
        const next = t >= FADE_TO_BLACK
        return prev === next ? prev : next
      })
    },
    []
  )

  useEffect(() => {
    const vid = videoRef?.current
    if (!vid) return
    let raf = 0
    // Per-frame polling beats the 250ms-granular timeupdate event, so the
    // black overlay flips the instant currentTime crosses the threshold.
    const loop = () => {
      evaluate(vid.currentTime)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [videoRef, evaluate])

  const activeCue = cues.find((c) => c.id === activeId)

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-black"
        initial={false}
        animate={{ opacity: fadedToBlack ? 1 : 0 }}
        transition={{ duration: 0 }}
        style={{ zIndex: 5 }}
      />
      <AnimatePresence mode="wait">
        {activeCue && (
          <motion.p
            key={activeCue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center max-w-4xl px-8"
            style={{
              fontFamily: "'Syne', sans-serif",
              textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,242,255,0.3)",
              letterSpacing: "-0.02em",
              zIndex: 10,
            }}
          >
            {activeCue.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}