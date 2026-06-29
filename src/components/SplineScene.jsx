import { useEffect, useRef, useState } from "react"

export function SplineScene({ scene, className = "" }) {
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let app
    async function load() {
      try {
        const { Application } = await import("@splinetool/runtime")
        if (!canvasRef.current) return
        app = new Application(canvasRef.current)
        await app.load(scene)
        setLoaded(true)
      } catch (e) {
        console.warn("Spline load failed:", e.message)
      }
    }
    load()
    return () => { if (app) app.dispose?.() }
  }, [scene])

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
        </div>
      )}
      <canvas ref={canvasRef} className={`w-full h-full ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700`} />
    </div>
  )
}
