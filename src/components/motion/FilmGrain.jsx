import { useEffect, useRef } from "react"

export function FilmGrain() {
  const ref = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const el = ref.current
    if (!el) return
    let target = 0.06
    let current = 0.06

    const loop = () => {
      const y = window.scrollY
      const v = Math.abs(y - lastY)
      lastY = y
      target = v > 60 ? 0.12 : v > 12 ? 0.085 : 0.05
      current += (target - current) * 0.12
      el.style.opacity = String(current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] mix-blend-overlay transition-none will-change-opacity"
      style={{
        opacity: 0.05,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}