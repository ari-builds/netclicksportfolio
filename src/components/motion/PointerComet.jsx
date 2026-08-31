import { useEffect, useRef, useState } from "react"

export function PointerComet() {
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(!coarse.matches && !reduce.matches)
    update()
    coarse.addEventListener("change", update)
    reduce.addEventListener("change", update)
    return () => {
      coarse.removeEventListener("change", update)
      reduce.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let raf = 0
    let px = null
    let py = null

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
    }
    window.addEventListener("pointermove", onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (px !== null) {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 14)
        grad.addColorStop(0, "rgba(139, 156, 246, 0.22)")
        grad.addColorStop(1, "rgba(139, 156, 246, 0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, 14, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
    }
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65]" />
}