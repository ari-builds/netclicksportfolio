import { motion } from "framer-motion"

export function Spotlight({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 mx-auto max-w-6xl h-full ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-full w-full"
      >
        <motion.div
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 left-0 h-screen z-40 pointer-events-none"
        >
          <div
            style={{ transform: "translateY(-350px) rotate(-45deg)", background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210,100%,85%,.08) 0, hsla(210,100%,55%,.02) 50%, hsla(210,100%,45%,0) 80%)", width: "560px", height: "1380px" }}
            className="absolute top-0 left-0"
          />
          <div
            style={{ transform: "rotate(-45deg) translate(5%, -50%)", background: "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,.06) 0, hsla(210,100%,55%,.02) 80%, transparent 100%)", width: "240px", height: "1380px" }}
            className="absolute top-0 left-0 origin-top-left"
          />
          <div
            style={{ transform: "rotate(-45deg) translate(-180%, -70%)", background: "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,.04) 0, hsla(210,100%,45%,.02) 80%, transparent 100%)", width: "240px", height: "1380px" }}
            className="absolute top-0 left-0 origin-top-left"
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 right-0 h-screen z-40 pointer-events-none"
        >
          <div
            style={{ transform: "translateY(-350px) rotate(45deg)", background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210,100%,85%,.08) 0, hsla(210,100%,55%,.02) 50%, hsla(210,100%,45%,0) 80%)", width: "560px", height: "1380px" }}
            className="absolute top-0 right-0"
          />
          <div
            style={{ transform: "rotate(45deg) translate(-5%, -50%)", background: "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,.06) 0, hsla(210,100%,55%,.02) 80%, transparent 100%)", width: "240px", height: "1380px" }}
            className="absolute top-0 right-0 origin-top-right"
          />
          <div
            style={{ transform: "rotate(45deg) translate(180%, -70%)", background: "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,.04) 0, hsla(210,100%,45%,.02) 80%, transparent 100%)", width: "240px", height: "1380px" }}
            className="absolute top-0 right-0 origin-top-right"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
