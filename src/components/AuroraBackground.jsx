import { cn } from "@/lib/utils"

export function AuroraBackground({ className, children, showRadialGradient = true, ...props }) {
  return (
    <div className={cn("relative flex flex-col items-center justify-center bg-background text-foreground", className)} {...props}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `[--aurora:repeating-linear-gradient(100deg,hsl(var(--primary))_10%,#6366f1_20%,hsl(var(--primary))_35%,#818cf8_50%,#a5b4fc_65%,hsl(var(--primary))_80%)]
            [background-image:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%),var(--aurora)]
            dark:[background-image:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%),var(--aurora)]
            after:dark:[background-image:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      {children}
    </div>
  )
}
