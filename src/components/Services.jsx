import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Monitor, ShoppingCart, Search, Smartphone, Rocket, ArrowRight } from "lucide-react";


const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Custom, modern UI/UX design tailored to your brand identity and audience."
  },
  {
    icon: Monitor,
    title: "Web Development",
    description: "Clean, performant code using the latest technologies and best practices."
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Full-featured online stores that drive sales and deliver seamless checkout."
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Rank higher and get found. On-page, technical, and content SEO strategies."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Flawless experiences across every device — desktop, tablet, and mobile."
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Lightning-fast load times and smooth interactions that keep users engaged."
  }
];

export function Services() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const serviceTexts = ["What We Do", "Our Services", "What We Build"];

  useEffect(() => {
    const t = setInterval(() => setServiceIdx((p) => (p + 1) % serviceTexts.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="services" className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
            <span className="relative inline-block align-baseline">
              <span className="invisible whitespace-nowrap">{serviceTexts.reduce((a, b) => a.length > b.length ? a : b)}</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={serviceIdx}
                  className="absolute left-0 top-0 whitespace-nowrap"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  {serviceTexts[serviceIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            From concept to launch, we deliver complete digital solutions
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
              className="group p-6 rounded-xl border border-border hover:border-primary/20 bg-card relative overflow-hidden transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.2)" }} />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                <motion.div
                  initial={false}
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
