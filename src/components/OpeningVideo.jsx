import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VideoOverlays } from "@/components/VideoOverlays"

export function OpeningVideo({ videoSrc = "/netclicksportfolio/videos/opening.mp4", duration = 42000 }) {
  const [show, setShow] = useState(true)
  const [fading, setFading] = useState(false)
  const [played, setPlayed] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (played) return
    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => setShow(false), 1200)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, played])

  const handleEnded = () => {
    setPlayed(true)
    setFading(true)
    setTimeout(() => setShow(false), 1200)
  }

  const handleSkip = () => {
    setPlayed(true)
    setFading(true)
    setTimeout(() => setShow(false), 600)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fading ? 1.2 : 0.3 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            onEnded={handleEnded}
            onError={handleEnded}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <VideoOverlays videoRef={videoRef} />

          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-all z-20"
          >
            Skip
          </button>

          <div className="absolute bottom-8 left-8 z-20">
            <span className="text-xl font-bold tracking-tight text-white">
              NET<span className="bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">CLICKS</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
