import { motion } from "motion/react"

export function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-10">
          <div className="relative">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              NET<span className="bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">CLICKS</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: "Services", id: "services" },
              { label: "Why Us", id: "why" },
              { label: "Work", id: "work" },
              { label: "Contact", id: "cta" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <a href="mailto:netclicksbyari@gmail.com" className="hover:text-foreground transition-colors">netclicksbyari@gmail.com</a>
            <a href="tel:+19784965735" className="hover:text-foreground transition-colors">+1 (978) 496-5735</a>
          </div>

          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} NetClicks. All rights reserved. Built for brands that refuse to be average.
          </p>
        </div>
      </div>
    </footer>
  )
}
