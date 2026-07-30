import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowLeft, ChevronRight, Check, ExternalLink, Play, Terminal, Palette, Code, ShoppingCart, Search,
  Monitor, Zap, Target, Send, Bot, Share2, Phone, GitBranch, FileText, BarChart3, Wrench, Smartphone, Plug, Quote, Star, Sparkles, Shield, Clock, Users, Activity
} from "lucide-react"

const iconMap = {
  palette: Palette, code: Code, shoppingCart: ShoppingCart, search: Search, monitor: Monitor,
  zap: Zap, target: Target, send: Send, bot: Bot, share2: Share2, phone: Phone,
  gitBranch: GitBranch, fileText: FileText, barChart3: BarChart3, wrench: Wrench,
  smartphone: Smartphone, plug: Plug,
}

function CountUp({ value, label, color }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const num = parseInt(value.replace(/[^0-9.]/g, ""))
          const suffix = value.replace(/[0-9.]/g, "")
          const isFloat = value.includes(".")
          const duration = 1500
          const start = performance.now()
          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(isFloat ? Math.round(eased * num * 10) / 10 : Math.floor(eased * num))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold" style={{ color }}>
        {count}{value.replace(/[0-9.]/g, "")}
      </div>
      <div className="text-sm text-zinc-400 mt-1">{label}</div>
    </div>
  )
}

const terminalScripts = {
  "svc-web-design": [
    { text: "$ npx create-design-system portfolio-brand", delay: 200 },
    { text: "✓ Design tokens generated (colors, typography, spacing)", delay: 300 },
    { text: "✓ Component library scaffolded — 43 primitives", delay: 300 },
    { text: "$ netclicks preview --mode=production", delay: 200 },
    { text: "  Building design system...", delay: 400 },
    { text: "  ✓ Accessibility audits passed (WCAG 2.1 AA)", delay: 300 },
    { text: "  ✓ Responsive breakpoints validated (320px → 2560px)", delay: 300 },
    { text: "  ✓ Performance score: 97/100", delay: 300 },
    { text: "", delay: 200 },
    { text: "  URL: https://design.netclicks.app/portfolio-brand", delay: 300 },
    { text: "  Status: Live · Ready for handoff", delay: 200 },
  ],
  "svc-web-dev": [
    { text: "$ git clone https://github.com/netclicks/stack-portfolio", delay: 200 },
    { text: "$ npm install && npm run build", delay: 300 },
    { text: "  ✓ Dependencies installed (1,240 packages)", delay: 300 },
    { text: "  ✓ TypeScript compilation: 0 errors", delay: 300 },
    { text: "  ✓ Unit tests: 284 passed", delay: 300 },
    { text: "  ✓ Bundle size: 142 KB (gzip)", delay: 300 },
    { text: "$ npm run deploy:production", delay: 200 },
    { text: "  Deploying to 12 edge nodes...", delay: 400 },
    { text: "  ✓ Deployment complete! (8.4s)", delay: 300 },
    { text: "", delay: 200 },
    { text: "  URL: https://portfolio.netclicks.app", delay: 300 },
    { text: "  Status: Healthy · Uptime: 99.99%", delay: 200 },
  ],
  "svc-ecommerce": [
    { text: "$ netclicks ecommerce init --store=atlanta-preloved", delay: 200 },
    { text: "  ✓ Storefront scaffolding complete", delay: 300 },
    { text: "  ✓ Product catalog imported (342 SKUs)", delay: 300 },
    { text: "  ✓ Payment gateways configured (Stripe + PayPal)", delay: 300 },
    { text: "  ✓ Shipping zones set up (US, EU, APAC)", delay: 300 },
    { text: "$ netclicks ecommerce preview", delay: 200 },
    { text: "  Running conversion audit...", delay: 400 },
    { text: "  ✓ Cart abandonment flow: active", delay: 300 },
    { text: "  ✓ Email sequences: configured (5 workflows)", delay: 300 },
    { text: "  ✓ SEO metadata: optimized", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Est. monthly revenue: $48,200 | ROAS: 5.8x", delay: 300 },
  ],
  "svc-seo": [
    { text: "$ netclicks seo audit --url=atlantapreloved.com", delay: 200 },
    { text: "  Crawling site... 1,247 pages discovered", delay: 400 },
    { text: "  Analyzing Core Web Vitals...", delay: 300 },
    { text: "  ✓ LCP: 1.2s (pass) | FID: 24ms (pass) | CLS: 0.08 (pass)", delay: 300 },
    { text: "  × 14 pages with missing meta descriptions", delay: 300 },
    { text: "  × 3 broken internal links found", delay: 300 },
    { text: "  × 8 images missing alt text", delay: 300 },
    { text: "$ netclicks seo fix --auto", delay: 200 },
    { text: "  ✓ Issues resolved: 25/25", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Projected ranking improvement: +8 positions (90 days)", delay: 300 },
  ],
  "svc-responsive": [
    { text: "$ netclicks responsive audit --url=atlantapreloved.com", delay: 200 },
    { text: "  Testing across device matrix...", delay: 400 },
    { text: "  iPhone 15 Pro Max — ✓ Pass (LCP 1.1s)", delay: 300 },
    { text: "  Samsung Galaxy S24 — ✓ Pass (LCP 1.3s)", delay: 300 },
    { text: "  iPad Air 13\" — ✓ Pass (Layout stable)", delay: 300 },
    { text: "  Desktop 1920×1080 — ✓ Pass (Score 98)", delay: 300 },
    { text: "  Surface Duo — ✓ Pass (Dual-screen aware)", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Overall responsive score: 96/100", delay: 300 },
    { text: "  Touch targets: ✓ All ≥ 44px", delay: 200 },
  ],
  "svc-performance": [
    { text: "$ netclicks perf audit --url=atlantapreloved.com", delay: 200 },
    { text: "  Running Lighthouse 12.0 analysis...", delay: 400 },
    { text: "  Performance: 94 | Accessibility: 97 | SEO: 100", delay: 300 },
    { text: "  Opportunities found:", delay: 200 },
    { text: "    - Enable text compression (save 124 KB)", delay: 300 },
    { text: "    - Preconnect to required origins (save 0.3s)", delay: 300 },
    { text: "    - Properly size images (save 2.1 MB)", delay: 300 },
    { text: "$ netclicks perf optimize --aggressive", delay: 200 },
    { text: "  Applied 12 optimizations — TTFB: 280ms → 94ms", delay: 400 },
    { text: "", delay: 200 },
    { text: "  Result: LCP improved 64% · Estimated revenue uplift: +18%", delay: 300 },
  ],
  "svc-leadgen": [
    { text: "$ netclicks leadgen init --campaign=q1-2026", delay: 200 },
    { text: "  ✓ Landing page template generated (A/B variants: 4)", delay: 300 },
    { text: "  ✓ Form builder: 12 fields (conditional logic active)", delay: 300 },
    { text: "  ✓ CRM integration: Salesforce mapped", delay: 300 },
    { text: "  ✓ Email sequences: 6-step nurture + 3-touch follow-up", delay: 300 },
    { text: "$ netclicks leadgen preview", delay: 200 },
    { text: "  Predicted conversion rate: 9.2% (±1.1%)", delay: 400 },
    { text: "  Cost per lead estimate: $28.40", delay: 300 },
    { text: "  Monthly lead volume projection: 340 qualified leads", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Ready for launch — 14 tasks complete, 0 pending", delay: 300 },
  ],
  "svc-outreach": [
    { text: "$ netclicks outreach create --campaign=enterprise-q2", delay: 200 },
    { text: "  AI analyzing target accounts (342 companies)...", delay: 400 },
    { text: "  Generating personalized email variants...", delay: 300 },
    { text: "  ✓ 8 sequences created (avg. 4 touches per sequence)", delay: 300 },
    { text: "  ✓ Reply prediction models: trained", delay: 300 },
    { text: "  ✓ A/B test variants: 3 per sequence", delay: 300 },
    { text: "$ netclicks outreach launch", delay: 200 },
    { text: "  Warmup phase: 12% daily send increase", delay: 400 },
    { text: "  Predicted reply rate: 14.2% · Meeting rate: 4.8%", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Campaign live — monitoring engagement in real-time", delay: 300 },
  ],
  "svc-ai-auto": [
    { text: "$ netclicks auto init --workflow=invoice-processing", delay: 200 },
    { text: "  Analyzing current process... 340 invoices/month", delay: 400 },
    { text: "  Training extraction model on sample documents...", delay: 300 },
    { text: "  ✓ Field extraction accuracy: 99.2%", delay: 300 },
    { text: "  ✓ Validation rules: 18 configured", delay: 300 },
    { text: "  ✓ Approval routing: 3-tier (auto, manager, finance)", delay: 300 },
    { text: "$ netclicks auto deploy", delay: 200 },
    { text: "  Deploying automation pipeline...", delay: 400 },
    { text: "  ✓ Estimated time savings: 140 hours/month", delay: 300 },
    { text: "", delay: 200 },
    { text: "  ROI projection: $84,000/year · Break-even: 3.2 months", delay: 300 },
  ],
  "svc-social": [
    { text: "$ netclicks social init --brand=atlanta-preloved", delay: 200 },
    { text: "  Analyzing brand voice...", delay: 300 },
    { text: "  ✓ Content pillars identified: 5", delay: 300 },
    { text: "  ✓ Platform matrix: Instagram, TikTok, LinkedIn, Twitter/X", delay: 300 },
    { text: "  Generating 30-day content calendar...", delay: 400 },
    { text: "  ✓ 42 posts generated (carousels: 12, reels: 8, static: 22)", delay: 300 },
    { text: "  ✓ Hashtag clusters: 24 optimized sets", delay: 300 },
    { text: "  ✓ Optimal posting times calculated per platform", delay: 300 },
    { text: "$ netclicks social schedule", delay: 200 },
    { text: "  Content calendar published · First post: 6:00 AM EST", delay: 300 },
  ],
  "svc-voice": [
    { text: "$ netclicks voice init --agent=support-ai-v2", delay: 200 },
    { text: "  Training neural voice model...", delay: 400 },
    { text: "  ✓ Voice cloned from studio recording (4.7 naturalness score)", delay: 300 },
    { text: "  ✓ Conversation flows: 12 configured", delay: 300 },
    { text: "  ✓ FAQ knowledge base: 87 articles ingested", delay: 300 },
    { text: "  ✓ CRM integration: active (lead creation + update)", delay: 300 },
    { text: "  ✓ Language support: English, Spanish, Mandarin", delay: 300 },
    { text: "$ netclicks voice test --scenario=booking", delay: 200 },
    { text: "  Call simulation: 100% intent recognition · 94% FCR", delay: 400 },
    { text: "", delay: 200 },
    { text: "  Agent ready for production · Capacity: 1,200 calls/day", delay: 300 },
  ],
  "svc-workflows": [
    { text: "$ netclicks workflow create --name=lead-to-cash", delay: 200 },
    { text: "  Scanning connected tools...", delay: 300 },
    { text: "  ✓ Salesforce · HubSpot · Slack · QuickBooks · Asana", delay: 300 },
    { text: "  Designing workflow graph...", delay: 400 },
    { text: "  ✓ Triggers: 4 (form submit, email, API, scheduled)", delay: 300 },
    { text: "  ✓ Actions: 23 across 5 tools", delay: 300 },
    { text: "  ✓ Conditional branches: 8 rules", delay: 300 },
    { text: "  ✓ Error handling: retry (3x) + dead letter queue", delay: 300 },
    { text: "$ netclicks workflow activate", delay: 200 },
    { text: "  Workflow live · Est. processing: 340 runs/day", delay: 400 },
  ],
  "svc-content": [
    { text: "$ netclicks content init --vault=marketing-hub", delay: 200 },
    { text: "  Scanning existing assets... 2,847 files found", delay: 400 },
    { text: "  AI classifying content by type, topic, and usage...", delay: 300 },
    { text: "  ✓ Auto-tagged: 2,847/2,847 (100%)", delay: 300 },
    { text: "  ✓ Duplicates identified: 142 (consolidated)", delay: 300 },
    { text: "  ✓ Content gaps detected: 8 topics underserved", delay: 300 },
    { text: "$ netclicks content deploy", delay: 200 },
    { text: "  Vault live at: content.netclicks.app/marketing-hub", delay: 300 },
    { text: "  Team invited: 14 members · Permissions: configured", delay: 300 },
  ],
  "svc-analytics": [
    { text: "$ netclicks analytics init --dashboard=executive-overview", delay: 200 },
    { text: "  Connecting data sources...", delay: 400 },
    { text: "  ✓ Stripe · Google Analytics · Salesforce · HubSpot · Mixpanel", delay: 300 },
    { text: "  Building data pipeline...", delay: 300 },
    { text: "  ✓ Real-time sync: enabled (sub-1s latency)", delay: 300 },
    { text: "  ✓ Historical backfill: 24 months", delay: 300 },
    { text: "  Generating dashboard widgets...", delay: 400 },
    { text: "  ✓ 18 widgets across 4 sections", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Dashboard ready — live at analytics.netclicks.app", delay: 300 },
  ],
  "svc-maintenance": [
    { text: "$ netclicks maintain init --site=atlantapreloved.com", delay: 200 },
    { text: "  Running health check...", delay: 300 },
    { text: "  ✓ Uptime: 99.97% over last 30 days", delay: 300 },
    { text: "  ✓ SSL certificate: valid (expires in 87 days)", delay: 300 },
    { text: "  ✓ Core Web Vitals: all passing", delay: 300 },
    { text: "  ✓ Backup: verified (last: 2h ago)", delay: 300 },
    { text: "  × Dependencies: 4 packages with available updates", delay: 300 },
    { text: "  × CDN cache hit ratio: 82% (target: >90%)", delay: 300 },
    { text: "$ netclicks maintain update --all", delay: 200 },
    { text: "  Applied 4 updates · Cache strategy optimized → 94%", delay: 400 },
  ],
  "svc-mobile": [
    { text: "$ netclicks mobile init --platform=both --name=atlanta-preloved", delay: 200 },
    { text: "  Generating project scaffold (React Native)...", delay: 400 },
    { text: "  ✓ Navigation structure: 8 screens", delay: 300 },
    { text: "  ✓ API integration layer: generated", delay: 300 },
    { text: "  ✓ Push notification config: Firebase + APNs", delay: 300 },
    { text: "  ✓ Deep linking: configured (12 routes)", delay: 300 },
    { text: "$ netclicks mobile build --ios", delay: 200 },
    { text: "  Building for iOS... Archive succeeded (2.4 min)", delay: 400 },
    { text: "  App Store Connect: validated", delay: 300 },
    { text: "", delay: 200 },
    { text: "  Ready for TestFlight · Est. App Store review: 24-48h", delay: 300 },
  ],
  "svc-api": [
    { text: "$ netclicks api init --name=catalog-service", delay: 200 },
    { text: "  Scaffolding API with OpenAPI 3.1...", delay: 300 },
    { text: "  ✓ RESTful endpoints: 24 generated", delay: 300 },
    { text: "  ✓ GraphQL schema: 12 types, 8 resolvers", delay: 300 },
    { text: "  ✓ Authentication: JWT + API keys", delay: 300 },
    { text: "  ✓ Rate limiting: 1,000 req/min per key", delay: 300 },
    { text: "  ✓ Validation: Zod schemas for all endpoints", delay: 300 },
    { text: "$ netclicks api deploy --stage=staging", delay: 200 },
    { text: "  Deploying to staging environment...", delay: 400 },
    { text: "  ✓ API docs published: api-staging.netclicks.app/docs", delay: 300 },
    { text: "  ✓ Integration tests: 142/142 passing", delay: 300 },
  ],
}

export default function ServicePage({ service }) {
  const [terminalLines, setTerminalLines] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState("form")
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const terminalRef = useRef(null)

  const c = service.color
  const g = service.gradient
  const Icon = iconMap[service.iconName] || Sparkles
  const script = terminalScripts[service.slug] || []

  const runTerminal = async () => {
    if (isRunning) return
    setIsRunning(true)
    setHasRun(true)
    setTerminalLines([])
    for (let i = 0; i < script.length; i++) {
      await new Promise(r => setTimeout(r, script[i].delay))
      setTerminalLines(prev => [...prev, script[i].text])
    }
    setIsRunning(false)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setBookingStep("done")
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-800 text-sm font-medium hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Portfolio
        </Link>
      </div>

      <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b" style={{ background: `linear-gradient(180deg, ${c}15 0%, transparent 60%)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: `${c}10` }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-6" style={{ backgroundColor: `${c}15`, color: c, borderColor: `${c}30` }}>
                  <Sparkles className="w-3 h-3" /> Service
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  {service.title.split(" ").map((word, i) => (
                    i === 0 ? (
                      <span key={i}>
                        {word}
                        <br />
                      </span>
                    ) : (
                      <span key={i} className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c}, ${c}99)` }}>
                          {word}
                        </span>
                    )
                  ))}
                </h1>
                <p className="text-lg text-zinc-400 mb-8 max-w-md">
                  {service.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setBookingOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: c }}>
                    Book a Discovery Call <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollTo("demo")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    See Live Demo <Play className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-2xl" style={{ boxShadow: `0 25px 50px -12px ${c}20` }}>
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-zinc-500">netclicks.app/{service.slug}</span>
                </div>
                <div className="p-4 md:p-6 space-y-4">
                  <div className="flex items-center gap-3" style={{ color: c }}>
                    <Icon className="w-8 h-8" />
                    <span className="text-lg font-semibold">{service.title}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.description.slice(0, 180)}...
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                        <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: c }} />
                        <span>{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {service.stats.map((s, i) => (
            <CountUp key={s.label} value={s.value} label={s.label} color={c} />
          ))}
        </div>
      </section>

      <section id="features" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4" style={{ backgroundColor: `${c}15`, color: c, borderColor: `${c}30` }}>Features</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What you get</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Everything included with our {service.title.toLowerCase()} service.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {service.features.map((f, i) => {
              const FeatIcon = Icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 24 }}
                  className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300"
                  style={{ borderColor: `${c}20`, hover: { borderColor: `${c}40` } }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${c}40`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `${c}20`}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-300" style={{ backgroundColor: `${c}20`, color: c }}>
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="py-20 md:py-28 px-4" style={{ backgroundColor: `${c}05` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4" style={{ backgroundColor: `${c}15`, color: c, borderColor: `${c}30` }}>Interactive Demo</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">See it in action</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Launch the simulator to see how we set up and deploy {service.title.toLowerCase()} solutions.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${c}30`, backgroundColor: `${c}05` }}>
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${c}20` }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-zinc-500 font-mono">terminal — {service.slug}</span>
                </div>
                <button
                  onClick={runTerminal}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all text-white"
                  style={{ backgroundColor: isRunning ? "#27272a" : c }}
                >
                  {isRunning ? "Running..." : hasRun ? "▶ Run Again" : "▶ Run Demo"}
                </button>
              </div>
              <div ref={terminalRef} className="p-4 md:p-6 font-mono text-xs leading-relaxed min-h-[260px] max-h-[400px] overflow-y-auto bg-zinc-950">
                {terminalLines.length === 0 && !isRunning && !hasRun && (
                  <div className="text-zinc-600 italic">Click "Run Demo" to simulate a {service.title.toLowerCase()} deployment...</div>
                )}
                {terminalLines.map((line, i) => (
                  <div key={i} className={`${line.startsWith("✓") || line.startsWith("  ✓") ? "text-green-400" : line.startsWith("$") ? "text-zinc-400" : line.startsWith("×") ? "text-red-400" : line.startsWith("  ") ? "text-zinc-300" : "text-purple-300"}`}>
                    {line}
                  </div>
                ))}
                {isRunning && <span className="inline-block w-2 h-4 ml-1 animate-pulse" style={{ backgroundColor: c }} />}
                {hasRun && !isRunning && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-xl border" style={{ backgroundColor: `${c}10`, borderColor: `${c}30` }}>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: c }}>
                      <Check className="w-4 h-4" /> Simulated deployment complete
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4" style={{ backgroundColor: `${c}15`, color: c, borderColor: `${c}30` }}>Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by industry leaders</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Hear from our clients about their experience working with us.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {service.testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50"
                style={{ borderColor: `${c}20` }}
              >
                <Quote className="w-5 h-5 mb-3" style={{ color: `${c}50` }} />
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: `${c}05` }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to transform your{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c}, ${c}99)` }}>
                {service.title.toLowerCase()}
              </span>
              ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Let's talk about your project. No commitments, just a conversation about what's possible.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: c }}
              >
                Book a Discovery Call <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("features")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-zinc-700 text-sm font-semibold hover:bg-zinc-800 transition-colors"
              >
                Explore Features <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>
              {service.title[0]}
            </div>
            <span className="font-semibold">{service.title}</span>
          </div>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto">
            Demo service for {service.title} &mdash; part of a portfolio showcase.
          </p>
          <p className="text-xs text-zinc-600 mt-4">2026 NetClicks Portfolio. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { if (bookingStep !== "form") { setBookingOpen(false); setBookingStep("form") } }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
            >
              {bookingStep === "done" ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${c}20` }}>
                    <Check className="w-6 h-6" style={{ color: c }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Thanks, {formData.name.split(" ")[0]}!</h3>
                  <p className="text-sm text-zinc-400 mb-4">We'll reach out within 24 hours to schedule your discovery call.</p>
                  <button
                    onClick={() => { setBookingOpen(false); setBookingStep("form"); setFormData({ name: "", email: "", company: "", message: "" }) }}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white"
                    style={{ backgroundColor: c }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Book a Discovery Call</h3>
                    <button
                      onClick={() => { setBookingOpen(false); setFormData({ name: "", email: "", company: "", message: "" }) }}
                      className="p-1 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500 mb-6">Interested in <span className="font-semibold text-zinc-300">{service.title}</span>? Fill out the form and we'll get back to you.</p>
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none transition-colors"
                        style={{ focusBorderColor: c }}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                        placeholder="Company name (optional)"
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell us about your project..."
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: c }}
                    >
                      Send Request
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
