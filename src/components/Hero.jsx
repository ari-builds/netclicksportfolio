import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { ArrowDown, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ShimmerButton } from "@/components/ShimmerButton";
import { Magnetic } from "@/components/motion/Magnetic";

const headline = ["Digital", "systems", "that", "get", "your", "business", "noticed"];

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]),
    { stiffness: 120, damping: 24 },
  );
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <AuroraBackground className="w-full min-h-screen">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 py-20 lg:py-36 items-center justify-center flex-col text-center">
          <motion.div style={{ scale, opacity, y }}>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold tracking-widest text-muted-foreground uppercase"
            >
              NetClicks by Ari
            </motion.span>

            <h1 className="mt-6 text-5xl md:text-7xl max-w-4xl tracking-tight font-bold text-foreground">
              <span className="sr-only">{headline.join(" ")}</span>
              <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-[0.28em]">
                {headline.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: "110%", filter: "blur(8px)" }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, y: "0%", filter: "blur(0px)" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.25 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            >
              Websites, lead generation, social content, and automation that work together to bring customers in and keep them. Built to be simple, honest, and effective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-row justify-center gap-3"
            >
              <Magnetic>
                <ShimmerButton href="#work">
                  See the work <ArrowDown className="w-4 h-4" />
                </ShimmerButton>
              </Magnetic>
              <Magnetic>
                <motion.a href="#cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gap-4" variant="outline">
                    Get in touch <PhoneCall className="w-4 h-4" />
                  </Button>
                </motion.a>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-3 text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
              <motion.div
                animate={reduce ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-8 w-8 items-center justify-center border border-foreground/25 rounded-full"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.div>
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-widest opacity-70">
              <span className="h-px w-8 bg-foreground/30" />
              <span className="text-xs">+</span>
              <span className="h-px w-8 bg-foreground/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}
