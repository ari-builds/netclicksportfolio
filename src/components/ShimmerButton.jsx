import { cn } from "@/lib/utils"

export function ShimmerButton({ href, className, children, ...props }) {
  const Tag = href ? "a" : "button"
  return (
    <Tag
      href={href}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-3 text-sm font-medium inline-flex items-center justify-center",
        "bg-primary text-primary-foreground",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
        "hover:brightness-110 transition-all",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  )
}
