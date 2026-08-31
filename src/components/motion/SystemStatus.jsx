import { useReducedMotion } from "motion/react"

const SYSTEMS = [
  { key: "WEBSITES", state: "LIVE" },
  { key: "LEAD GEN", state: "ACTIVE" },
  { key: "SOCIAL", state: "SCHEDULED" },
  { key: "AUTOMATION", state: "RUNNING" },
  { key: "NETWORK", state: "NOMINAL" },
]

export function SystemStatus({ className = "" }) {
  const reduce = useReducedMotion()
  const row = [...SYSTEMS, ...SYSTEMS, ...SYSTEMS, ...SYSTEMS]
  return (
    <section
      aria-hidden="true"
      className={`relative overflow-hidden border-y border-border/60 bg-muted/25 py-3 ${className}`}
    >
      <div className="flex w-max whitespace-nowrap animate-[sysmarq_38s_linear_infinite]">
        {row.map((s, i) => (
          <span
            key={i}
            className="mx-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/80"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "hsl(var(--primary) / 0.9)",
                animation: reduce ? "none" : "sysblink 1.4s steps(1,end) infinite",
              }}
            />
            <span className="text-muted-foreground/60">{s.key}:</span>
            <span className="text-foreground">{s.state}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes sysmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      <style>{`@keyframes sysblink { 0%,100% { opacity: 1 } 50% { opacity: 0.15 } }`}</style>
    </section>
  )
}