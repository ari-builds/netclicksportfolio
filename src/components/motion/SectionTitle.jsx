import { TextShimmer } from "@/components/TextShimmer"
import { Reveal } from "./Reveal"
import { SplitText } from "./SplitText"

export function SectionTitle({ label, title, sub, center = false, className = "" }) {
  return (
    <Reveal
      className={`${center ? "text-center mx-auto" : ""} max-w-2xl ${className}`}
    >
      {label && (
        <div
          className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
        >
          <span className="h-px w-6 bg-foreground/40" />
          <TextShimmer className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </TextShimmer>
        </div>
      )}
      {title && (
        <SplitText
          as="h2"
          text={title}
          amount={0.4}
          stagger={0.06}
          duration={0.7}
          blur={6}
          className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground"
        />
      )}
      {sub && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {sub}
        </p>
      )}
    </Reveal>
  )
}