import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const brandingFrames = [
  { label: "Logo Mark", shape: "M100 20L180 160H20Z" },
  { label: "Icon", shape: "M20 20h160v160H20z" },
  { label: "Emblem", shape: "M100 10C50 10 10 50 10 100s40 90 90 90 90-40 90-90S150 10 100 10z" },
];

function BrandingScene() {
  const [frame, setFrame] = useState(0);
  const swatches = ["#6366f1", "#ec4899", "#10b981", "#f59e0b"];

  useEffect(() => {
    const t = setInterval(() => setFrame((p) => (p + 1) % brandingFrames.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <motion.div key={frame} initial={{ scale: 0.6, rotate: -10, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 1.2, rotate: 10, opacity: 0 }} transition={{ duration: 0.6 }} className="w-16 h-16">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path d={brandingFrames[frame].shape} fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" className="text-primary" />
        </svg>
      </motion.div>
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <motion.div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }} />
        ))}
      </div>
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Brand Identity</span>
    </div>
  );
}

function AdScene() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
      <div className="flex items-end gap-1.5 h-12">
        {[60, 85, 45].map((h, i) => (
          <motion.div
            key={i}
            className="w-5 rounded-t-sm"
            style={{ backgroundColor: i === 1 ? "#6366f1" : "#8B5CF6" }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs font-bold tabular-nums text-primary">3.2x ROAS</motion.div>
        )}
        {phase === 1 && (
          <motion.div key="1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs font-bold tabular-nums text-[#ec4899]">+240% Conv.</motion.div>
        )}
        {phase === 2 && (
          <motion.div key="2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs font-bold tabular-nums text-[#10b981]">$0.12 CPC</motion.div>
        )}
      </AnimatePresence>
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Performance</span>
    </div>
  );
}

function AutoScene() {
  const [step, setStep] = useState(0);
  const bubbles = [
    { text: "Hi! How can I help?", side: "left" },
    { text: "Book a consultation", side: "right" },
    { text: "Got it! Let me check available slots...", side: "left" },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % (bubbles.length + 1)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
      <div className="w-full flex flex-col gap-1.5">
        {bubbles.slice(0, step).map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: b.side === "left" ? -12 : 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`text-[10px] px-2.5 py-1.5 rounded-xl max-w-[80%] ${
              b.side === "left" ? "bg-primary/15 self-start" : "bg-[#8B5CF6]/20 self-end"
            }`}
          >
            {b.text}
          </motion.div>
        ))}
        {step > 0 && step <= bubbles.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary self-center" />
        )}
      </div>
      <div className="flex gap-1 mt-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{ backgroundColor: i < step ? "#6366f1" : "rgba(100,116,139,0.3)", scale: i < step ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">Workflow</span>
    </div>
  );
}

const demos = [
  { title: "Branding", component: BrandingScene },
  { title: "Advertising", component: AdScene },
  { title: "AI Automation", component: AutoScene },
];

export function LaunchDemo() {
  const [videoMuted, setVideoMuted] = useState(true);
  const [showPlayHint, setShowPlayHint] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowPlayHint(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
            Showcase
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Brand in{" "}
            <span className="text-primary">Motion</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4">
            See what we create across brand, ads, and automation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden border shadow-2xl mb-16 md:mb-20 bg-black aspect-video max-w-5xl mx-auto group cursor-pointer"
          onClick={() => { videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause(); setVideoMuted(!videoMuted) }}
        >
          <video
            ref={videoRef}
            src="/netclicksportfolio/videos/launch-demo.mp4"
            muted={videoMuted}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <AnimatePresence>
            {showPlayHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-center max-w-5xl mx-auto">
          {demos.map((demo, i) => {
            const offsets = [20, -15, 25];
            return (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="w-full md:w-1/3 group"
                style={{ marginTop: `${offsets[i]}px` }}
              >
                <div className="relative rounded-xl border bg-card/60 backdrop-blur overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded-md border">
                      {demo.title}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-primary ml-0.5" />
                    </div>
                  </div>
                  <div className="aspect-[4/3]">
                    <demo.component />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
