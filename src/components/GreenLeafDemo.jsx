import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Check, X, Menu, ChevronRight, TrendingUp, Users, Target, Eye, Zap, BarChart3, Award, Star, Quote, Clock, Sparkles, Leaf, Palette, Globe, FileText, Search, Lightbulb, Mail, MessageCircle, Link2 } from "lucide-react"
import { Link } from "react-router-dom"

const services = [
  { icon: Palette, title: "Brand Identity", desc: "Logo, color systems, typography, and brand guidelines that communicate your mission at a glance." },
  { icon: Globe, title: "Web Design", desc: "Beautiful, responsive websites built with sustainability in mind — fast, accessible, and carbon-aware." },
  { icon: FileText, title: "Content Strategy", desc: "Messaging frameworks, copywriting, and visual storytelling that connects with your audience." },
  { icon: Search, title: "SEO Optimization", desc: "Technical SEO, keyword strategy, and content optimization to get you found by the right people." }
]

const projects = [
  {
    title: "Beco", tag: "Brand Identity", color: "#059669",
    desc: "Complete rebrand for a zero-waste home goods company.",
    hero: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    challenge: "Beco was growing rapidly but their brand felt generic and didn't communicate their zero-waste mission. Their existing identity was created in-house and lacked consistency across packaging, web, and retail.",
    approach: "We developed a complete brand system rooted in circular design principles — every element reusable, every color derived from natural pigments. The logo mark combines a leaf with an infinity loop, symbolizing endless reuse.",
    results: ["Brand awareness +156% in 6 months", "Packaging redesign reduced material use by 34%", "Website conversion rate up 2.8x", "Featured in Sustainable Design Awards 2025"],
    stats: [{ label: "Revenue Growth", value: "214%", icon: TrendingUp }, { label: "Social Followers", value: "89K+", icon: Users }, { label: "Retention Rate", value: "94%", icon: Award }]
  },
  {
    title: "Solara", tag: "Web Design", color: "#d97706",
    desc: "E-commerce platform for a solar panel installer with carbon-tracking dashboard.",
    hero: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    challenge: "Solara needed an e-commerce platform that could handle complex B2B and B2C pricing tiers while educating customers about solar ROI. Their old site had a 62% bounce rate.",
    approach: "We designed a carbon-aware web experience that tracks each page's footprint and displays it. The product configurator lets customers see real-time savings estimates and carbon offset data as they build their system.",
    results: ["Bounce rate dropped from 62% to 23%", "Average order value increased 47%", "Page load time reduced by 58%", "Carbon dashboard featured at CleanTech Summit"],
    stats: [{ label: "Pages/Session", value: "6.2", icon: Eye }, { label: "Load Time", value: "0.8s", icon: Zap }, { label: "Conversion", value: "12.4%", icon: TrendingUp }]
  },
  {
    title: "Roots", tag: "Content Strategy", color: "#7c3aed",
    desc: "Content overhaul for an organic farm-to-table restaurant group.",
    hero: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    challenge: "Roots Kitchen had amazing food and a loyal local following but their online presence was virtually invisible. They ranked on page 7 for key terms like 'organic dining [city]' and had zero content strategy.",
    approach: "We created a farm-to-table content ecosystem: seasonal menu stories, farmer interviews, recipe videos, and a sustainability blog. Each piece of content tied back to local SEO targets and was optimized for Google's Helpful Content update.",
    results: ["Moved from page 7 to #1 for 27 keywords", "Organic traffic increased 340% in 4 months", "Email list grew from 2K to 18K subscribers", "Featured in Bon Appétit's Best Organic Dining list"],
    stats: [{ label: "Keyword #1 Rankings", value: "27", icon: Target }, { label: "Traffic Increase", value: "340%", icon: TrendingUp }, { label: "Email Growth", value: "18K", icon: Users }]
  },
  {
    title: "Tide", tag: "Brand + Web", color: "#0284c7",
    desc: "Full identity and website for an ocean cleanup nonprofit.",
    hero: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
    challenge: "Tide was a grassroots nonprofit with a powerful mission but no cohesive brand. Donors couldn't easily understand where their money went, and volunteer signups were declining.",
    approach: "We built a transparent brand system including a live impact dashboard that shows exactly how many pounds of plastic removed, cost per pound, and real-time project updates. The visual identity uses ocean-derived colors and wave motifs.",
    results: ["Donations increased 189% in first quarter", "Volunteer signups up 420%", "Cost per acquisition dropped 63%", "Won AIGA Design for Good award"],
    stats: [{ label: "Donations Growth", value: "189%", icon: TrendingUp }, { label: "Volunteers", value: "4.2K+", icon: Users }, { label: "CPA Decrease", value: "63%", icon: BarChart3 }]
  }
]

const team = [
  { name: "Maya Chen", role: "Creative Director", avatar: "MC", bio: "15 years shaping brand identities for purpose-driven companies. Formerly at Pentagram." },
  { name: "Jamie Park", role: "Lead Designer", avatar: "JP", bio: "Award-winning web designer. Obsessed with accessible, performant, and beautiful interfaces." },
  { name: "Sam Rivera", role: "Strategy Lead", avatar: "SR", bio: "Helped 50+ brands find their voice. Deep expertise in content strategy and SEO." }
]

const testimonials = [
  { text: "The team understood our mission from day one. The brand identity they created perfectly captures who we are.", name: "Alice Torres", org: "Beco, Founder" },
  { text: "Our website traffic doubled after the redesign. More importantly, our conversion rate went up 40%.", name: "David Kim", org: "Solara, CMO" },
  { text: "Working with GreenLeaf felt like a true partnership. They care about the planet as much as we do.", name: "Rachel Green", org: "Roots Kitchen, CEO" }
]

const blogPosts = [
  {
    title: "Why sustainable design is good for business", tag: "Design", date: "Mar 12, 2026", readTime: "5 min",
    excerpt: "Data shows that brands with clear sustainability messaging outperform competitors by 32% in customer loyalty.",
    body: "For years, sustainability was viewed as a nice-to-have in the business world — a moral checkbox rather than a strategic advantage. That perception has flipped.\n\nAccording to a 2025 study by the Sustainable Brand Index, companies that communicate their environmental impact clearly see 32% higher customer retention rates and 27% higher willingness-to-pay from consumers.\n\nThe data is clear: consumers, especially Gen Z and Millennials, are voting with their wallets. 73% say they'd pay more for a product from a brand they trust to be sustainable.\n\nBut here's the catch — greenwashing is punished harshly. Brands that make vague or unsubstantiated claims lose trust rapidly. The key is authenticity: measurable goals, transparent reporting, and a genuine commitment baked into the business model.\n\nAt GreenLeaf, we've seen it firsthand. Beco's rebrand focused on circular design and transparent materials sourcing. Within 6 months, their revenue grew 214%. Not despite the sustainability focus — because of it.\n\nSustainable design isn't just better for the planet. It's better for business."
  },
  {
    title: "The carbon footprint of a website", tag: "Tech", date: "Feb 28, 2026", readTime: "7 min",
    excerpt: "The internet produces 3.7% of global emissions. Here's how we build carbon-aware web experiences.",
    body: "If the internet were a country, it would be the fourth-largest emitter of CO2 in the world. Between data centers, network infrastructure, and the devices we use, the digital realm accounts for 3.7% of global greenhouse gas emissions — roughly the same as the entire aviation industry.\n\nA single web page produces an average of 1.76 grams of CO2 per view. For a site getting 100,000 monthly visits, that's over 2 metric tons of CO2 per year.\n\nSo how do we build greener websites?\n\nFirst, optimize images. The average webpage is 2MB — over half of which is images. Using next-gen formats like WebP and AVIF, responsive image sets, and lazy loading can cut that by 60-80%.\n\nSecond, choose efficient hosting. Green hosting providers that use renewable energy and carbon offset programs make a real difference.\n\nThird, reduce JavaScript bloat. Every kilobyte of JS costs energy to parse and execute. Framework overhead adds up fast.\n\nWe built Solara's e-commerce platform using these principles. The result: pages load in under a second, the site runs on 100% renewable energy, and every page displays its carbon footprint. Bounce rate dropped from 62% to 23%.\n\nSustainable web design isn't a trade-off. It's a better experience for everyone."
  },
  {
    title: "Finding your brand's authentic voice", tag: "Strategy", date: "Feb 14, 2026", readTime: "4 min",
    excerpt: "A practical framework for developing messaging that resonates with eco-conscious audiences.",
    body: "Brand voice is one of those things every startup knows they need but few know how to build. It's not a tagline. It's not a color palette. It's how you show up in the world.\n\nFor eco-conscious brands, finding an authentic voice is especially critical. Consumers are skeptical of green messaging, and generic sustainability language gets tuned out.\n\nHere's the framework we use with every client:\n\n1. Define your core belief. What's the one thing you believe that your competitors don't? This becomes your north star.\n\n2. Find your tension. Every great brand exists at the intersection of two opposing ideas. Patagonia: love of nature vs. love of consumption. Tesla: luxury vs. sustainability.\n\n3. Write like a person. Corporate speak is the enemy of authenticity. Would you say this sentence to a friend over coffee? If not, rewrite it.\n\n4. Prove it. Every claim needs evidence. If you say you're sustainable, show the data. If you say you're transparent, publish your supply chain.\n\nRoots Kitchen came to us with amazing food and no voice. We helped them find the tension: farm traditions versus modern convenience. Their content now tells stories of the farmers, the seasons, and the craft — and their traffic grew 340%.\n\nAuthenticity isn't something you create. It's something you uncover."
  }
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(end / (duration * 60))
    const timer = setInterval(() => { start += step; if (start >= end) { setCount(end); clearInterval(timer) } else setCount(start) }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />
  )
}

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 })
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xVal = (e.clientX - rect.left) / rect.width - 0.5
    const yVal = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xVal)
    y.set(yVal)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}>
      {children}
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(16,185,129,0.06), transparent 60%)` }} />
    </motion.div>
  )
}

function FloatingLeaves({ count = 6 }) {
  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 100 + Math.random() * 200,
    size: 12 + Math.random() * 16,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 5,
    drift: -30 + Math.random() * 60,
    rotation: Math.random() * 360
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map(l => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.x}%`, top: "-5%" }}
          animate={{
            y: [`${-l.y}vh`, `${100 + l.y}vh`],
            x: [0, l.drift, l.drift / 2, 0],
            rotate: [l.rotation, l.rotation + 180, l.rotation + 360],
            opacity: [0, 0.15, 0.2, 0]
          }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
        >
          <Leaf className="text-emerald-400/30" style={{ width: l.size, height: l.size }} />
        </motion.div>
      ))}
    </div>
  )
}

export default function GreenLeafDemo() {
  const [mobileNav, setMobileNav] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [caseStudy, setCaseStudy] = useState(null)
  const [reading, setReading] = useState(null)
  const [expandedService, setExpandedService] = useState(null)
  const [toast, setToast] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroBlur = useTransform(scrollYProgress, [0, 0.12], [0, 4])

  const blobX = useTransform(useMotionValue(mousePos.x), [0, 1], [-30, 30])
  const blobY = useTransform(useMotionValue(mousePos.y), [0, 1], [-30, 30])

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  const boxRef = useRef(null)
  const { scrollYProgress: sectionProgress } = useScroll({ target: boxRef, offset: ["start end", "end start"] })
  const parallaxY = useTransform(sectionProgress, [0, 1], [100, -100])

  const sectionProgresses = {}
  const sectionRefs = {}

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white relative" onMouseMove={handleMouseMove}>

      <NoiseOverlay />

      {/* DOTTED GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)`, backgroundSize: "32px 32px" }} />

      {/* SCROLL PROGRESS */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-emerald-400 to-teal-300 origin-left" style={{ scaleX: scrollYProgress }} />

      {/* NAV */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b0b]/85 backdrop-blur-md border-b border-white/[0.04]"
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: -10, scale: 1.1 }} className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </motion.div>
            <span className="font-medium tracking-tight">GreenLeaf</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {["Services", "Work", "Process", "Journal", "Contact"].map((item, i) => {
              const id = item === "Journal" ? "blog" : item.toLowerCase()
              return (
                <motion.button key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-zinc-500 hover:text-emerald-300 transition-colors tracking-tight"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.button>
              )
            })}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => scrollTo("contact")}
              className="px-4 py-1.5 rounded-full bg-emerald-500/90 text-white text-sm font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a Project
            </motion.button>
          </div>
          <button className="md:hidden p-1.5" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </motion.nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0, rotateX: -10, transformOrigin: "top" }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
            className="fixed inset-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-7"
            onClick={() => setMobileNav(false)}
          >
            <button className="absolute top-4 right-4 p-1.5" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Services", "Work", "Process", "Journal", "Contact"].map((item) => {
              const id = item === "Journal" ? "blog" : item.toLowerCase()
              return <button key={item} onClick={() => { setMobileNav(false); scrollTo(id) }} className="text-xl font-medium text-zinc-400 hover:text-emerald-300 transition-colors">{item}</button>
            })}
            <button onClick={() => { setMobileNav(false); scrollTo("contact") }} className="px-5 py-2 rounded-full bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors">Start a Project</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-[#0b0b0b] to-[#0b0b0b]" />

        {/* Floating leaves */}
        <FloatingLeaves count={6} />

        {/* 3D parallax glow blobs — follow mouse */}
        <div className="absolute inset-0 opacity-[0.12]">
          <motion.div
            style={{ x: useTransform(useMotionValue(mousePos.x), [0, 1], [-40, 40]), y: useTransform(useMotionValue(mousePos.y), [0, 1], [-30, 30]) }}
            animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute top-28 left-1/4 w-[28rem] h-[28rem] rounded-full bg-emerald-500 blur-[140px]"
          />
          <motion.div
            style={{ x: useTransform(useMotionValue(mousePos.x), [0, 1], [30, -30]), y: useTransform(useMotionValue(mousePos.y), [0, 1], [20, -20]) }}
            animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-24 right-1/4 w-[22rem] h-[22rem] rounded-full bg-teal-500 blur-[120px]"
          />
        </div>

        {/* Organic decorative blob */}
        <motion.div
          style={{ rotateZ: useTransform(useMotionValue(mousePos.x), [0, 1], [-5, 5]) }}
          className="absolute top-[15%] right-[8%] w-24 h-24 opacity-[0.06] pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-emerald-400">
            <path d="M50 0C77.6 0 100 22.4 100 50C100 77.6 77.6 100 50 100C22.4 100 0 77.6 0 50C0 22.4 22.4 0 50 0ZM50 15C40.1 15 31.3 19.6 25.4 26.8L26.8 25.4C22.1 30.9 19.2 37.9 18.3 45.6L18.1 48C17.7 52.8 18.1 57.6 19.3 62.2L19.8 64C23.1 75.3 31.9 84.1 43.2 87.4L45 87.9C49.6 89.1 54.4 89.5 59.2 89.1L61.6 88.9C69.3 88 76.3 85.1 81.8 80.4L80.4 81.8C86.6 76.6 91.2 69.8 94.1 62.2C96.9 54.5 98 46.3 97.1 38.2C96.3 31.2 93.6 24.7 89.2 19.3C85.1 14.3 79.7 10.3 73.3 7.8C66.9 5.2 59.8 4.3 52.8 5.1C51.8 5.2 50.9 5.6 50 6V0Z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute bottom-[20%] left-[5%] w-16 h-16 opacity-[0.04] pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-emerald-300">
            <path d="M50 0C77.6 0 100 22.4 100 50C100 77.6 77.6 100 50 100C22.4 100 0 77.6 0 50C0 22.4 22.4 0 50 0Z" />
          </svg>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur}px)` }} className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/[0.08] text-emerald-300/90 border border-emerald-500/10 mb-5 tracking-wide"
            >
              Sustainable Digital Agency
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] mb-5 tracking-tight"
            >
              Brands that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">do good</span>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block ml-0.5 text-emerald-400/70"
              >.</motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-base md:text-lg text-zinc-500 mb-9 max-w-xl mx-auto leading-relaxed"
            >
              We help eco-conscious businesses build brands and websites that make a real impact — on your audience and the planet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <motion.button
                onClick={() => scrollTo("work")}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-emerald-500 text-sm font-medium hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
              >
                View Our Work <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/[0.06] text-sm font-medium text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-300 transition-colors"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="flex flex-col items-center gap-1 text-zinc-600"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.section
        ref={boxRef}
        style={{ y: parallaxY }}
        className="py-14 px-4 border-y border-white/[0.04]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 120, suffix: "+", label: "Brands Built", icon: Sparkles },
            { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
            { value: 15, suffix: "+", label: "Awards", icon: Award },
            { value: 340, suffix: "%", label: "Avg. Traffic Boost", icon: TrendingUp }
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 150, damping: 20 }}
              style={{ transformStyle: "preserve-3d", perspective: 600 }}
              className="text-center"
            >
              <s.icon className="w-4 h-4 text-emerald-400/60 mx-auto mb-1.5" />
              <div className="text-2xl md:text-3xl font-bold text-emerald-200/90 tracking-tight"><CountUp end={s.value} />{s.suffix}</div>
              <div className="text-xs text-zinc-600 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Services</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">From strategy to execution — everything you need to build a brand that matters.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s, i) => (
              <TiltCard key={s.title}>
                <motion.button
                  initial={{ opacity: 0, y: 20, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setExpandedService(expandedService === s.title ? null : s.title)}
                  className="group relative w-full text-left p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-colors overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    className="w-9 h-9 rounded-lg bg-emerald-500/[0.07] flex items-center justify-center mb-3 group-hover:bg-emerald-500/[0.12] transition-colors"
                  >
                    <s.icon className="w-4.5 h-4.5 text-emerald-400/80" />
                  </motion.div>
                  <h3 className="font-medium text-sm mb-1.5">{s.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  <AnimatePresence>
                    {expandedService === s.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, rotateX: -15 }}
                        animate={{ height: "auto", opacity: 1, rotateX: 0 }}
                        exit={{ height: 0, opacity: 0, rotateX: -15 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        style={{ transformStyle: "preserve-3d", perspective: 600, transformOrigin: "top" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/[0.04] text-xs text-zinc-500 space-y-2">
                          <p>Our {s.title.toLowerCase()} process includes research, strategy, execution, and measurement. Each engagement begins with a discovery workshop and ends with a detailed handoff.</p>
                          <span className="inline-flex items-center gap-1 text-emerald-400/80 font-medium">Book a consultation <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-24 md:py-28 px-4 bg-white/[0.005] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">Recent Projects</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Featured Work</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">Brands we've helped grow, told through the work we've done together.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-3">
            {projects.map((p, i) => (
              <TiltCard key={p.title}>
                <motion.button
                  initial={{ opacity: 0, y: 20, rotateY: -5 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setCaseStudy(p)}
                  className="group relative w-full text-left p-6 md:p-7 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] transition-colors overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] opacity-40 origin-left"
                    style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                  />
                  <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none" style={{ background: `radial-gradient(circle at center, ${p.color}, transparent)` }} />
                  <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                    <div className="flex items-center gap-2 mb-2.5" style={{ transform: "translateZ(20px)" }}>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium tracking-wide" style={{ backgroundColor: `${p.color}15`, color: p.color }}>{p.tag}</span>
                      <Leaf className="w-3 h-3 text-emerald-500/30" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1.5" style={{ transform: "translateZ(15px)" }}>{p.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">{p.desc}</p>
                    <motion.div
                      className="flex items-center gap-1 text-xs font-medium text-emerald-400/70 group-hover:text-emerald-300 transition-colors"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      View Full Case Study <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </motion.div>
                  </div>
                </motion.button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ transformStyle: "preserve-3d", perspective: 800, transformOrigin: "center" }}
              className="w-full max-w-2xl my-8 rounded-xl border border-white/[0.06] bg-[#0b0b0b] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-44 md:h-56" style={{ background: `linear-gradient(135deg, ${caseStudy.color}25, transparent)` }}>
                <img src={caseStudy.hero} alt={caseStudy.title} className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />
                <button onClick={() => setCaseStudy(null)} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition-colors"><X className="w-3.5 h-3.5" /></button>
                <div className="absolute bottom-3 left-5" style={{ transform: "translateZ(20px)" }}>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: `${caseStudy.color}25`, color: caseStudy.color }}>{caseStudy.tag}</span>
                  <h2 className="text-xl md:text-2xl font-bold mt-1 tracking-tight">{caseStudy.title}</h2>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1.5">The Challenge</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{caseStudy.challenge}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1.5">Our Approach</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{caseStudy.approach}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">Results</h3>
                  <ul className="space-y-1.5">
                    {caseStudy.results.map((r, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" /> {r}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.04]">
                  {caseStudy.stats.map((s, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.03, y: -1 }}
                      className="text-center p-3 rounded-lg bg-white/[0.01] border border-white/[0.04]">
                      <s.icon className="w-4 h-4 text-emerald-400/70 mx-auto mb-1" />
                      <div className="text-base font-bold text-emerald-200/90">{s.value}</div>
                      <div className="text-[10px] text-zinc-600">{s.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
                <button onClick={() => setCaseStudy(null)} className="w-full py-2 rounded-lg bg-white/[0.04] text-xs font-medium hover:bg-white/[0.06] transition-colors">Close Case Study</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Our Process</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">A proven framework that takes your brand from concept to launch.</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discover", desc: "We learn about your mission, audience, and goals through deep-dive workshops.", icon: Lightbulb },
              { step: "02", title: "Design", desc: "Our team crafts a unique visual identity and experience tailored to your brand.", icon: Palette },
              { step: "03", title: "Build", desc: "We develop your website or product with clean, sustainable, performant code.", icon: Globe },
              { step: "04", title: "Grow", desc: "Launch, monitor, and iterate — with ongoing support and optimization.", icon: TrendingUp }
            ].map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30, rotateY: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
                className="relative text-center p-5"
              >
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-12 h-12 rounded-xl bg-emerald-500/[0.06] flex items-center justify-center mx-auto mb-3"
                >
                  <p.icon className="w-5 h-5 text-emerald-400/80" style={{ backfaceVisibility: "hidden" }} />
                </motion.div>
                <div className="text-xs font-bold text-emerald-400/50 mb-1">{p.step}</div>
                <h3 className="font-medium text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 left-[60%] w-[calc(80%)] h-px bg-gradient-to-r from-emerald-500/20 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-28 px-4 bg-white/[0.005] border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Kind Words</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <TiltCard key={t.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 150, damping: 20 }}
                  className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Quote className="w-4 h-4 text-emerald-500/15 mb-2" />
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-[10px] font-medium text-emerald-300/80">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-medium">{t.name}</div>
                      <div className="text-[10px] text-zinc-600">{t.org}</div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">Journal</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Latest Insights</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">Thoughts on branding, web design, and building a better digital future.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-3">
            {blogPosts.map((post, i) => (
              <TiltCard key={post.title}>
                <motion.button
                  initial={{ opacity: 0, y: 20, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setReading(post)}
                  className="group w-full text-left p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-emerald-500/15 hover:bg-white/[0.02] transition-colors"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80">{post.tag}</span>
                    <span className="flex items-center gap-1 text-[10px] text-zinc-600"><Clock className="w-2.5 h-2.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight mb-1.5 leading-snug group-hover:text-emerald-300 transition-colors">{post.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-3">{post.excerpt}</p>
                  <span className="text-[10px] text-zinc-600">{post.date}</span>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-400/60 group-hover:text-emerald-300 transition-colors mt-2 opacity-0 group-hover:opacity-100">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE READER */}
      <AnimatePresence>
        {reading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={() => setReading(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="w-full max-w-xl my-8 rounded-xl border border-white/[0.06] bg-[#0b0b0b] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="p-5 pb-3 border-b border-white/[0.04]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80">{reading.tag}</span>
                    <span className="text-[10px] text-zinc-600">{reading.date}</span>
                  </div>
                  <button onClick={() => setReading(null)} className="p-1 rounded-md hover:bg-white/[0.04] transition-colors"><X className="w-3.5 h-3.5" /></button>
                </div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight leading-snug">{reading.title}</h2>
                <div className="flex items-center gap-1 text-[10px] text-zinc-600 mt-1"><Clock className="w-2.5 h-2.5" /> {reading.readTime} read</div>
              </div>
              <div className="p-5 overflow-y-auto max-h-[60vh]">
                {reading.body.split("\n\n").map((paragraph, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                    className="text-sm text-zinc-400 leading-[1.8] mb-4 last:mb-0">{paragraph}</motion.p>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/[0.04] flex items-center justify-between">
                <button onClick={() => setReading(null)} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Close</button>
                <button onClick={() => { setReading(null); scrollTo("contact") }} className="text-xs text-emerald-400/80 hover:text-emerald-300 transition-colors">Start a project →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TEAM */}
      <section className="py-24 md:py-28 px-4 bg-white/[0.005] border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Meet the Leaf</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">A small, passionate team dedicated to making sustainability beautiful.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
                className="text-center p-5 rounded-xl border border-white/[0.04] bg-white/[0.01]"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotateZ: -3 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-3 text-base font-bold shadow-lg shadow-emerald-500/5"
                >
                  {m.avatar}
                </motion.div>
                <h3 className="font-medium text-sm">{m.name}</h3>
                <p className="text-xs text-zinc-500 mb-2">{m.role}</p>
                <p className="text-[11px] text-zinc-600 leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-28 px-4 bg-gradient-to-b from-emerald-900/10 to-[#0b0b0b]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/[0.07] text-emerald-300/80 border border-emerald-500/10 mb-3 tracking-wider uppercase">Start a Project</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Ready to grow<br />the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">green</span> way?</h2>
            <p className="text-sm text-zinc-500 mb-8 max-w-md mx-auto">Tell us about your project. We'll get back to you within 48 hours with ideas and a timeline.</p>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03]"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-400" />
                </motion.div>
                <p className="text-base font-semibold tracking-tight">Message sent!</p>
                <p className="text-xs text-zinc-500">We'll be in touch within 48 hours.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }) }} className="text-xs text-emerald-400/80 hover:text-emerald-300 transition-colors">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (formData.name && formData.email && formData.message) setSubmitted(true) }} className="max-w-sm mx-auto space-y-3">
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                  <input type="email" placeholder="Your email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <textarea rows={3} placeholder="Tell us about your project" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700 resize-none" />
                </motion.div>
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 rounded-lg bg-emerald-500 text-sm font-medium hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/5"
                >
                  Send Message <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.04] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/5"><Leaf className="w-3.5 h-3.5 text-white" /></div>
                <span className="font-medium text-sm tracking-tight">GreenLeaf</span>
              </motion.div>
              <p className="text-xs text-zinc-600 mb-3">Sustainable brands, beautifully built.</p>
              <motion.button whileHover={{ x: 2 }} className="text-xs text-zinc-600 hover:text-emerald-300 transition-colors flex items-center gap-1.5"><Mail className="w-3 h-3" /> hello@greenleaf.studio</motion.button>
            </div>
            {[
              { title: "Services", links: [{ name: "Brand Identity", id: "services" }, { name: "Web Design", id: "services" }, { name: "Content Strategy", id: "services" }, { name: "SEO", id: "services" }] },
              { title: "Company", links: [{ name: "Process", id: "process" }, { name: "Work", id: "work" }, { name: "Journal", id: "blog" }, { name: "Contact", id: "contact" }] },
              { title: "Connect", links: [{ name: "Instagram", handle: "@greenleaf.studio" }, { name: "LinkedIn", handle: "/company/greenleaf" }, { name: "X", handle: "@greenleaf" }, { name: "Dribbble", handle: "greenleaf" }] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-zinc-400 mb-3 tracking-wider uppercase">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.links.map(link => (
                    <li key={link.name}>
                      <motion.button whileHover={{ x: 3 }}
                        onClick={() => { if (link.id) scrollTo(link.id); else if (link.handle) showToast(`${link.name}: ${link.handle} (demo)`) }}
                        className="text-xs text-zinc-600 hover:text-emerald-300 transition-colors"
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/[0.04]"
          >
            <p className="text-[10px] text-zinc-700">2026 GreenLeaf. Demo.</p>
            <div className="flex items-center gap-2">
              {[
                { icon: Leaf, label: "Dribbble" },
                { icon: Link2, label: "LinkedIn" },
                { icon: MessageCircle, label: "X" }
              ].map((s, i) => (
                <motion.button key={s.label}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                  onClick={() => showToast(`${s.label}: @greenleaf (demo)`)}
                  className="p-1.5 rounded-md text-zinc-600 hover:text-emerald-300 hover:bg-white/[0.03] transition-colors"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/[0.06] text-xs shadow-2xl flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
