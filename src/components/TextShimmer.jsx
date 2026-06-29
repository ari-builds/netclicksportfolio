import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TextShimmer({ children, className, duration = 4 }) {
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, hsl(var(--muted-foreground) / 0.3) 0%, hsl(var(--foreground)) 25%, hsl(var(--muted-foreground) / 0.3) 50%, hsl(var(--foreground)) 75%, hsl(var(--muted-foreground) / 0.3) 100%)`,
        backgroundSize: "200% 100%",
      }}
      initial={{ backgroundPosition: "100% 0" }}
      animate={{ backgroundPosition: "-100% 0" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}
