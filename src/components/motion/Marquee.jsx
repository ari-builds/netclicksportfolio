import { useReducedMotion } from "motion/react"

export function Marquee({ items = [] }) {
  const reduce = useReducedMotion()
  const row = [...items, ...items, ...items, ...items]
  if (reduce) {
    return (
      <div className="overflow-hidden border-y border-border/60 bg-muted/30 py-6">
        <div className="flex max-w-7xl mx-auto px-6 text-lg font-semibold text-muted-foreground">
          {items.map((it, i) => (
            <span key={i}>
              {it}
              {i < items.length - 1 ? "  \u00b7  " : ""}
            </span>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-muted/30 py-6">
      <div className="flex whitespace-nowrap w-max animate-[marquee_40s_linear_infinite]">
        {row.map((item, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 text-lg font-semibold uppercase tracking-widest text-muted-foreground/80"
          >
            {item}
            <span className="text-muted-foreground/40">{"\u2022"}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
