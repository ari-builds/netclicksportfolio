import { useEffect, useState } from "react"

export function ArcGalleryHero({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = "",
  onGetStarted,
  onExploreGallery,
}) {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm })
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd })
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg })
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm])

  const count = Math.max(images.length, 2)
  const step = (endAngle - startAngle) / (count - 1)

  return (
    <section className={`relative bg-[#faf7f2] text-stone-800 min-h-screen flex flex-col overflow-x-hidden pt-16 ${className}`}>
      <div
        className="relative mx-auto"
        style={{ width: "100%", height: dimensions.radius * 1.2 }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i
            const angleRad = (angle * Math.PI) / 180
            const x = Math.cos(angleRad) * dimensions.radius
            const y = Math.sin(angleRad) * dimensions.radius
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animation: `arc-fade-in-up 0.8s ease-out ${i * 100}ms forwards`,
                  opacity: 0,
                  zIndex: count - i,
                }}
              >
                <div
                  className="rounded-2xl shadow-lg overflow-hidden ring-1 ring-stone-200 bg-white transition-transform hover:scale-105 w-full h-full"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Artwork ${i + 1}`}
                    className="block w-full h-full object-cover"
                    draggable={false}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x400/1a1a2e/e2e8f0?text=Art`
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div
          className="text-center max-w-2xl px-6"
          style={{ animation: "arc-fade-in 0.8s ease-out 800ms forwards", opacity: 0 }}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900">
            Your art<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">deserves a gallery</span>
          </h1>
          <p className="mt-4 text-lg text-stone-500">
            Create a stunning portfolio, connect with collectors, and sell prints — all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onGetStarted} className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 text-white hover:bg-amber-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Free
            </button>
            <button onClick={onExploreGallery} className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-200/80 text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all duration-200">
              Explore Gallery
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes arc-fade-in-up {
          from { opacity: 0; transform: translate(-50%, 60%); }
          to { opacity: 1; transform: translate(-50%, 50%); }
        }
        @keyframes arc-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
