import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Monitor, ShoppingCart, Search, Smartphone, Rocket, Database, Send, Bot, Share2, Mic2, GitBranch, Archive, BarChart3, Wrench, Tablet, Plug, ArrowRight } from "lucide-react";


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
  },
  {
    icon: Database,
    title: "Lead Generation",
    description: "Custom scrapers, Google Maps mining, and data enrichment pipelines that find your ideal prospects at scale."
  },
  {
    icon: Send,
    title: "AI Outreach Campaigns",
    description: "Research-backed cold email sequences that visit each lead's site, analyze their business, and personalize every message."
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Smart chatbots, automated booking, follow-up workflows, and AI receptionists that handle your business 24/7."
  },
  {
    icon: Share2,
    title: "Social Media Autopilot",
    description: "Content scheduling, cross-platform posting, and engagement automation that keeps your brand active without the daily grind."
  },
  {
    icon: Mic2,
    title: "AI Voice Agent",
    description: "Voice-controlled AI copilot that hears commands, talks back, and can see screens, navigate apps, and automate tasks."
  },
  {
    icon: GitBranch,
    title: "Business Automation Workflows",
    description: "Custom pipelines connecting CRMs, email, calendars, and SMS into unified systems that run on autopilot."
  },
  {
    icon: Archive,
    title: "Content Vault & Management",
    description: "Centralized asset storage, AI-powered content generation, and automated repurposing across all your channels."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboards",
    description: "Custom reporting, conversion tracking, lead source attribution, and real-time metrics that actually inform decisions."
  },
  {
    icon: Wrench,
    title: "Website Maintenance & Support",
    description: "Hosting, updates, security monitoring, backups, and ongoing support so your site never skips a beat."
  },
  {
    icon: Tablet,
    title: "Mobile App Development",
    description: "Cross-platform iOS and Android apps built with modern frameworks for a native feel on every device."
  },
  {
    icon: Plug,
    title: "API & Integration Development",
    description: "Custom connectors between your tools — CRMs, payment gateways, analytics, and legacy systems talking to each other."
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
