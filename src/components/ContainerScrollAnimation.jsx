import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const features = [
  { label: "Performance", value: "98/100", desc: "Lighthouse Score" },
  { label: "Traffic", value: "+240%", desc: "Organic Growth" },
  { label: "Conversion", value: "3.2x", desc: "Rate Increase" },
  { label: "Load Time", value: "0.8s", desc: "Average Speed" },
];

const steps = [
  { title: "Discovery", desc: "Deep research into your brand, audience, and competitors to uncover opportunities." },
  { title: "Architecture", desc: "Information architecture, wireframes, and user flows that prioritize clarity." },
  { title: "Design System", desc: "A cohesive visual language with reusable components for consistent branding." },
  { title: "Delivery", desc: "Performance-optimized build with CI/CD, analytics, and ongoing support." },
];

export function ContainerScrollAnimation() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };
  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 0.35], [0.4, 1]), springConfig);
  const borderRadius = useSpring(useTransform(scrollYProgress, [0, 0.35], [40, 0]), springConfig);
  const cardOpacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, 1]), springConfig);
  const firstSlideY = useSpring(useTransform(scrollYProgress, [0.2, 0.4], [40, 0]), springConfig);
  const firstSlideOpacity = useSpring(useTransform(scrollYProgress, [0.2, 0.35], [0, 1]), springConfig);
  const secondSlideY = useSpring(useTransform(scrollYProgress, [0.4, 0.6], [40, 0]), springConfig);
  const secondSlideOpacity = useSpring(useTransform(scrollYProgress, [0.4, 0.55], [0, 1]), springConfig);
  const thirdSlideY = useSpring(useTransform(scrollYProgress, [0.6, 0.8], [40, 0]), springConfig);
  const thirdSlideOpacity = useSpring(useTransform(scrollYProgress, [0.6, 0.75], [0, 1]), springConfig);

  return (
    <section ref={containerRef} className="w-full relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background p-4">
        <motion.div
          style={{ scale: scaleProgress, borderRadius: borderRadius, opacity: cardOpacity }}
          className="w-full max-w-6xl bg-card border shadow-2xl overflow-hidden origin-center"
        >
          <div className="p-6 md:p-10 lg:p-14 space-y-8 md:space-y-12">
            <motion.div
              style={{ y: firstSlideY, opacity: firstSlideOpacity }}
              className="text-center"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Case Study</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-3 tracking-tight">
                Results That <span className="text-primary">Speak</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4">
                Every project starts with a conversation and ends with measurable impact. Here is what we delivered.
              </p>
            </motion.div>

            <motion.div
              style={{ y: secondSlideY, opacity: secondSlideOpacity }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
            >
              {features.map((f, i) => (
                <div key={i} className="text-center p-4 md:p-6 rounded-xl bg-muted/50 border">
                  <div className="text-2xl md:text-4xl font-black text-primary">{f.value}</div>
                  <div className="text-xs md:text-sm font-semibold mt-1">{f.label}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ y: thirdSlideY, opacity: thirdSlideOpacity }}
              className="grid md:grid-cols-4 gap-4 md:gap-6"
            >
              {steps.map((step, i) => (
                <div key={i} className="relative p-4 md:p-6 rounded-xl border bg-card hover:shadow-md transition-shadow group">
                  <span className="text-3xl md:text-5xl font-black text-primary/10 absolute top-2 right-3 select-none">0{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <span className="text-sm font-bold text-primary">{i + 1}</span>
                  </div>
                  <h4 className="font-semibold text-sm md:text-base">{step.title}</h4>
                  <p className="text-[11px] md:text-xs text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
