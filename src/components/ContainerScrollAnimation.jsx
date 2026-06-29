import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  const isLockedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const progressRef = useRef(0);
  const touchStartYRef = useRef(0);
  const initialFireRef = useRef(false);
  const unlockTimeRef = useRef(0);

  const progress = useMotionValue(0);

  const scaleProgress = useTransform(progress, [0, 0.3], [0.4, 1]);
  const borderRadius = useTransform(progress, [0, 0.3], [40, 0]);
  const cardOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const firstSlideY = useTransform(progress, [0.15, 0.35], [40, 0]);
  const firstSlideOpacity = useTransform(progress, [0.15, 0.3], [0, 1]);
  const secondSlideY = useTransform(progress, [0.35, 0.55], [40, 0]);
  const secondSlideOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);
  const thirdSlideY = useTransform(progress, [0.55, 0.75], [40, 0]);
  const thirdSlideOpacity = useTransform(progress, [0.55, 0.7], [0, 1]);

  const lockScroll = useCallback(() => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    if (containerRef.current) containerRef.current.style.touchAction = "none";
  }, []);

  const unlockScroll = useCallback(() => {
    if (!isLockedRef.current) return;
    isLockedRef.current = false;
    unlockTimeRef.current = Date.now();
    document.documentElement.style.overflow = "";
    document.body.style.overscrollBehavior = "";
    if (containerRef.current) containerRef.current.style.touchAction = "";
  }, []);

  const advance = useCallback((dir, magnitude = 1) => {
    const step = 0.035 * magnitude;
    const next = Math.max(0, Math.min(1, progressRef.current + dir * step));
    progressRef.current = next;
    progress.set(next);

    if (next >= 1 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      unlockScroll();
    }
  }, [progress]);

  const handleWheel = useCallback((e) => {
    if (!isLockedRef.current) return;
    e.preventDefault();
    const magnitude = Math.abs(e.deltaY) / 120;
    advance(e.deltaY > 0 ? 1 : -1, magnitude);
  }, [advance]);

  const handleTouchStart = useCallback((e) => {
    if (!isLockedRef.current) return;
    e.preventDefault();
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isLockedRef.current) return;
    e.preventDefault();
    const delta = touchStartYRef.current - e.touches[0].clientY;
    touchStartYRef.current = e.touches[0].clientY;
    advance(delta > 0 ? 1 : -1, Math.min(3, Math.abs(delta) / 10));
  }, [advance]);

  const handleKeyDown = useCallback((e) => {
    if (!isLockedRef.current) return;
    const down = ["ArrowDown", "PageDown", " "];
    const up = ["ArrowUp", "PageUp"];
    if (down.includes(e.key)) { e.preventDefault(); advance(1); }
    else if (up.includes(e.key)) { e.preventDefault(); advance(-1); }
  }, [advance]);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!initialFireRef.current) {
        initialFireRef.current = true;
        return;
      }
      if (Date.now() - unlockTimeRef.current < 800) return;
      if (hasCompletedRef.current) return;

      const rect = el.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom > 0 && !isLockedRef.current) {
        progressRef.current = 0;
        progress.set(0);
        lockScroll();
      } else if ((rect.bottom < 0 || rect.top > window.innerHeight) && isLockedRef.current) {
        unlockScroll();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
    };
  }, [lockScroll, unlockScroll, handleWheel, handleTouchStart, handleTouchMove, handleKeyDown, progress, isMobile]);

  const [isMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  if (isMobile) {
    return (
      <section className="w-full py-20 px-6 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="w-full bg-card border shadow-2xl rounded-xl overflow-hidden">
            <div className="w-full p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Case Study</span>
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mt-3 tracking-tight">
                  Results That <span className="text-primary">Speak</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4">
                  Every project starts with a conversation and ends with measurable impact. Here is what we delivered.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {features.map((f, i) => (
                  <div key={i} className="text-center p-3 md:p-6 rounded-xl bg-muted/50 border">
                    <div className="text-lg md:text-4xl font-black text-primary">{f.value}</div>
                    <div className="text-xs md:text-sm font-semibold mt-1">{f.label}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="relative p-3 md:p-6 rounded-xl border bg-card hover:shadow-md transition-shadow group">
                    <span className="text-3xl md:text-5xl font-black text-primary/10 absolute top-2 right-3 select-none">0{i + 1}</span>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <h4 className="font-semibold text-sm md:text-base">{step.title}</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="w-full relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center p-1" style={{ height: "100vh" }}>
      <motion.div
        style={{ scale: scaleProgress, borderRadius: borderRadius, opacity: cardOpacity }}
        className="w-full h-full max-w-6xl bg-card border shadow-2xl overflow-hidden origin-center flex items-center"
      >
        <div className="w-full p-3 md:p-6 lg:p-8 space-y-3 md:space-y-6">
          <motion.div
            style={{ y: firstSlideY, opacity: firstSlideOpacity }}
            className="text-center"
          >
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Case Study</span>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mt-2 md:mt-3 tracking-tight">
              Results That <span className="text-primary">Speak</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4">
              Every project starts with a conversation and ends with measurable impact. Here is what we delivered.
            </p>
          </motion.div>

          <motion.div
            style={{ y: secondSlideY, opacity: secondSlideOpacity }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
          >
            {features.map((f, i) => (
              <div key={i} className="text-center p-2 md:p-6 rounded-xl bg-muted/50 border">
                <div className="text-lg md:text-4xl font-black text-primary">{f.value}</div>
                <div className="text-xs md:text-sm font-semibold mt-1">{f.label}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{f.desc}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            style={{ y: thirdSlideY, opacity: thirdSlideOpacity }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
          >
            {steps.map((step, i) => (
              <div key={i} className="relative p-2 md:p-6 rounded-xl border bg-card hover:shadow-md transition-shadow group">
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
    </section>
  );
}
