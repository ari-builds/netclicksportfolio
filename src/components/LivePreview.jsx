import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Loader2, Play } from "lucide-react"

export function LivePreview({
  url,
  name,
  className = "",
  height = 640,
  badgeColor = "#8B5CF6",
  category = "",
  screenshot = "",
}) {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(() => !("IntersectionObserver" in window))
  const [error, setError] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: "600px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const activate = () => {
    setActive(true)
    setLoading(true)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${className}`}
    >
      {badgeColor && (
        <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: badgeColor }}
          >
            {category}
          </span>
        </div>
      )}
      <div className={`relative w-full overflow-hidden rounded-[calc(1rem-1px)]`} style={{ height }}>
        <div className="h-8 w-full flex items-center gap-1.5 border-b border-border bg-muted/40 px-4">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 flex-1 truncate text-[11px] text-muted-foreground/70">{url}</span>
        </div>
        <div className="relative h-[calc(100%-2rem)] w-full">
          {!active && visible && screenshot ? (
            <div className="group/clip relative h-full w-full overflow-hidden bg-white">
              <img
                src={screenshot}
                alt={`${name} website preview`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={activate}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4" /> Load live preview
                </button>
              </div>
            </div>
          ) : active && !error ? (
            <>
              <iframe
                key={url}
                title={name}
                src={url}
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false)
                  setError(true)
                }}
                className="h-full w-full border-0 bg-white"
                style={{ pointerEvents: "auto" }}
                allow="fullscreen"
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              )}
            </>
          ) : active && error ? (
            <div className="flex h-full w-full items-center justify-center p-8 text-center">
              <p className="text-sm text-muted-foreground">
                This site can&apos;t be previewed inline. Open the real site directly.
              </p>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card/60">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">Live preview {category ? `· ${category}` : ""}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          Open site <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}
