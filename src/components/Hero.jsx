import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { TextShimmer } from "@/components/TextShimmer";
import { ShimmerButton } from "@/components/ShimmerButton";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Stunning", "Modern", "Responsive", "Fast", "Beautiful"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <AuroraBackground className="w-full min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <motion.a href="#work"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button variant="secondary" size="sm" className="gap-4 rounded-full cursor-pointer">
              <Sparkles className="w-4 h-4" /> View our work <MoveRight className="w-4 h-4" />
            </Button>
          </motion.a>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">We build</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    <TextShimmer duration={3}>{title}</TextShimmer>
                  </motion.span>
                ))}
              </span>
              <span className="block">websites for your brand</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center"
            >
              We craft pixel-perfect, conversion-focused web experiences that elevate your digital presence.
              From concept to launch, we bring your vision to life.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-row gap-3"
          >
            <motion.a href="#cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gap-4" variant="outline">
                Get in touch <PhoneCall className="w-4 h-4" />
              </Button>
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <ShimmerButton href="#work" className="gap-2">
                See our work <MoveRight className="w-4 h-4" />
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}
