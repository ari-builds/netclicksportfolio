import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Palette,
    title: "Discovery & Strategy",
    desc: "We dive deep into your brand, audience, and goals to craft a strategy that drives results.",
    color: "#6366f1",
    detail: "Brand audit, competitor analysis, user research, content strategy, information architecture"
  },
  {
    icon: Code,
    title: "Design & Development",
    desc: "Pixel-perfect designs brought to life with clean, performant code and cutting-edge tech.",
    color: "#ec4899",
    detail: "UI/UX design, prototyping, frontend development, backend integration, QA testing"
  },
  {
    icon: Rocket,
    title: "Launch & Optimize",
    desc: "We deploy, monitor, and continuously optimize to ensure peak performance and growth.",
    color: "#10b981",
    detail: "Deployment, performance tuning, SEO setup, analytics, ongoing support"
  }
];

export function ScrollShowcase() {
  const [ideaIdx, setIdeaIdx] = useState(0);
  const ideaTexts = ["Idea", "Concept", "Vision"];

  useEffect(() => {
    const t = setInterval(() => setIdeaIdx((p) => (p + 1) % ideaTexts.length), 3000);
    return () => clearInterval(t);
  }, []);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardRotateX = useTransform(scrollYProgress, [0, 0.25], [15, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1.1, 0.9]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.7], [0, 1, 1, 0]);

  return (
    <section id="process" ref={containerRef} className="w-full relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
          style={{ scale: bgScale }}
        />
        <div className="max-w-6xl mx-auto px-4 w-full z-10">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Our Process</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4">
              From{" "}
              <span className="text-primary relative inline-block align-baseline rounded-2xl bg-gradient-to-br from-primary/10 via-white/[0.06] to-primary/10 border border-white/15 shadow-lg shadow-primary/5 px-5">
                <span className="invisible whitespace-nowrap">{ideaTexts.reduce((a, b) => a.length > b.length ? a : b)}</span>
                <AnimatePresence initial={false}>
                  <motion.span
                    key={ideaIdx}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                    initial={{ opacity: 0, y: 35, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -35, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  >
                    {ideaTexts[ideaIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              to Launch
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A proven workflow that takes your project from concept to completion
            </p>
          </motion.div>

          <motion.div
            className="w-full rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl"
            style={{
              rotateX: cardRotateX,
              scale: cardScale,
              opacity: cardOpacity,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="p-6 md:p-8 flex flex-col gap-3 relative group"
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-colors"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                    <h3 className="text-lg font-semibold mt-1">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                    {step.detail.split(", ").map((tag, j) => (
                      <span key={j}
                        className="text-[10px] px-2 py-0.5 rounded-full border text-muted-foreground"
                      >{tag}</span>
                    ))}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${step.color}40` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
