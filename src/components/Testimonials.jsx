import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextShimmer } from "@/components/TextShimmer";

const testimonials = [
  {
    quote: "They transformed our outdated website into a modern, high-performance platform. Our traffic increased by 200% and conversions doubled within the first month.",
    name: "Sarah Chen",
    designation: "CEO, Luxe Boutique",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "The team's attention to detail and understanding of our brand was exceptional. They delivered beyond our expectations.",
    name: "James Wilson",
    designation: "Founder, CloudBase Inc",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Working with them was a game-changer. Our new site loads in under a second and the design is absolutely stunning.",
    name: "Maria Garcia",
    designation: "Marketing Director, GreenLeaf",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Professional, creative, and technically brilliant. They don't just build websites — they create digital experiences.",
    name: "Alex Thompson",
    designation: "CTO, FitTrack",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <section id="testimonials" className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <TextShimmer duration={4} spread={3}>What Our Clients Say</TextShimmer>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Don't take our word for it
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px]">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) =>
                  index === active && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotateY: randomRotateY() }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: randomRotateY() }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-xl"
                      />
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg md:text-xl italic text-muted-foreground mb-6">
                    "{testimonials[active].quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[active].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[active].designation}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => { handlePrev(); setAutoplay(false); }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2 px-2">
                  {testimonials.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => { setActive(i); setAutoplay(false); }}
                      className="rounded-full"
                      style={{ width: i === active ? 24 : 8, height: 8 }}
                      animate={{
                        width: i === active ? 24 : 8,
                        backgroundColor: i === active
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground) / 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => { handleNext(); setAutoplay(false); }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
