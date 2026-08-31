import { useReducedMotion } from "motion/react"

const PATHS = {
  target: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-3a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />,
  send: <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />,
  layers: <path d="m12 2 10 6-10 6L2 8Z M2 16l10 6 10-6" />,
  sparkles: <path d="M12 3v18M3 12h18M5 5l14 14M19 5 5 19" />,
  default: <path d="M6 3h12v18l-6-4-6 4Z" />,
}

const ICON_SIZE = 24

export function SelfDrawIcon({ iconName = "default", className = "", useAnimation = true }) {
  const reduce = useReducedMotion()
  const d = PATHS[iconName] || PATHS.default

  return (
    <svg
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <g>
        {!reduce && useAnimation ? (
          <g style={{ animation: "iconDraw 2.4s ease forwards", strokeDasharray: 400, strokeDashoffset: 400 }}>
            {d}
          </g>
        ) : (
          d
        )}
      </g>
      <style>{`@keyframes iconDraw { to { stroke-dashoffset: 0 } }`}</style>
    </svg>
  )
}