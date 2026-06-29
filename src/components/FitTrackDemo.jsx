import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Menu, Activity, Heart, Zap, BarChart3, Users, Target, Clock, Flame, Footprints, Dumbbell, Apple, TrendingUp, ChevronRight, Sparkles, Link2, MessageCircle, Leaf, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { SplineScene } from "./SplineScene"
import { Spotlight } from "./Spotlight"

const stats = [
  { label: "Active Users", value: "12K+", icon: Users },
  { label: "Workouts Logged", value: "1.2M", icon: Activity },
  { label: "Calories Burned", value: "48M", icon: Flame },
  { label: "Avg. Session", value: "42min", icon: Clock }
]

export default function FitTrackDemo() {
  const [mobileNav, setMobileNav] = useState(false)
  const [selectedTab, setSelectedTab] = useState("Overview")
  const [toast, setToast] = useState(null)
  const [signInModal, setSignInModal] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const dashboardRef = useRef(null)
  const featuresRef = useRef(null)
  const progressRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-stone-800">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium tracking-tight">FitTrack</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => dashboardRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-blue-600 transition-colors tracking-tight">Dashboard</button>
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-blue-600 transition-colors tracking-tight">Workouts</button>
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-blue-600 transition-colors tracking-tight">Nutrition</button>
            <button onClick={() => progressRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-blue-600 transition-colors tracking-tight">Progress</button>
            <button onClick={() => setSignInModal(true)} className="px-4 py-1.5 rounded-full bg-blue-500/90 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/10">
              Start Free
            </button>
          </div>
          <button className="md:hidden p-1.5" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6" onClick={() => setMobileNav(false)}>
            <button className="absolute top-4 right-4 p-1.5" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Dashboard", "Workouts", "Nutrition", "Progress", "Start Free"].map(item => (
              <button key={item} onClick={() => { setMobileNav(false); if (item === "Dashboard") dashboardRef.current?.scrollIntoView({ behavior: "smooth" }); else if (item === "Workouts" || item === "Nutrition") featuresRef.current?.scrollIntoView({ behavior: "smooth" }); else if (item === "Progress") progressRef.current?.scrollIntoView({ behavior: "smooth" }); else if (item === "Start Free") setSignInModal(true) }}
                className="text-xl font-medium text-stone-500 hover:text-blue-600 transition-colors">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-[#f8f7f4] to-[#f8f7f4]" />
        <Spotlight />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500 blur-[140px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-500/20 mb-4 tracking-wide">
                <Sparkles className="w-3 h-3" /> AI-Powered Fitness
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-4 tracking-tight text-stone-900">
                Your body.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Your data. Your journey.</span>
              </h1>
              <p className="text-base text-stone-500 mb-8 max-w-md leading-relaxed">
                Track workouts, monitor nutrition, and hit your goals with AI-powered insights that adapt to you.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setSignInModal(true)} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/10">
                  Start Free Trial <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setToast("Demo — watch video not available")} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-stone-200/80 text-sm font-medium text-stone-500 hover:bg-stone-100 transition-colors">
                  Watch Demo <Activity className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-stone-200/80 bg-white shadow-sm">
              <SplineScene scene="https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode" className="w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS DASHBOARD */}
      <section ref={dashboardRef} className="py-12 px-4 border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="text-center p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                <s.icon className="w-5 h-5 text-blue-500/60 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">{s.value}</div>
                <div className="text-xs text-stone-500 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Everything you need to stay fit</h2>
            <p className="text-sm text-stone-500 max-w-md mx-auto">Track, analyze, and improve with tools designed for real results.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: Dumbbell, title: "Workout Logger", desc: "Log sets, reps, and weights. AI suggests next exercises based on your progress." },
              { icon: Apple, title: "Meal Tracker", desc: "Snap a photo — AI identifies macros. Track calories without the tedious input." },
              { icon: TrendingUp, title: "Progress Graphs", desc: "Beautiful charts that show your strength, cardio, and body comp trends over time." }
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedFeature(f)}
                className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm hover:border-blue-500/20 transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <f.icon className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <h3 className="font-medium text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD TABS */}
      <section ref={progressRef} className="py-12 px-4 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 mb-8">
            {["Overview", "Weekly", "Monthly", "Goals"].map(tab => (
              <button key={tab} onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedTab === tab ? "bg-blue-100 text-blue-700 border border-blue-500/20" : "text-stone-500 border border-transparent hover:text-stone-700"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedTab === "Overview" && (
              <>
                <motion.div key="ov-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Weekly Activity</h3>
                    <span className="text-[10px] text-stone-500">+23% vs last week</span>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div initial={{ height: 0 }} animate={{ height: `${30 + Math.random() * 60}%` }}
                          transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                          className="w-full rounded-md bg-gradient-to-t from-blue-500/30 to-blue-400/10"
                        />
                        <span className="text-[10px] text-stone-500">{day}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div key="ov-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Recent Workouts</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Upper Body", time: "Today 7AM", cal: "342", icon: Dumbbell },
                      { name: "HIIT Cardio", time: "Yesterday 6AM", cal: "489", icon: Zap },
                      { name: "Leg Day", time: "Mon 7AM", cal: "512", icon: Flame }
                    ].map((w) => (
                      <button key={w.name} onClick={() => setToast(`Demo — "${w.name}" details not available`)}
                        className="w-full flex items-center justify-between text-left hover:bg-stone-50 rounded-lg px-1 -mx-1 py-1 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                            <w.icon className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs font-medium">{w.name}</div>
                            <div className="text-[10px] text-stone-500">{w.time}</div>
                          </div>
                        </div>
                        <span className="text-xs text-stone-500">{w.cal} cal</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
            {selectedTab === "Weekly" && (
              <>
                <motion.div key="wk-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">This Week's Summary</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Total Workouts", value: "5 sessions", icon: Dumbbell },
                      { label: "Total Duration", value: "4h 32min", icon: Clock },
                      { label: "Calories", value: "2,184 kcal", icon: Flame },
                    ].map(s => (
                      <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-stone-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <s.icon className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-xs text-stone-500">{s.label}</span>
                        </div>
                        <span className="text-xs font-medium text-stone-700">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div key="wk-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Day Breakdown</h3>
                  <div className="space-y-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                      <div key={d} className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-500 w-7">{d}</span>
                        <div className="flex-1 h-5 rounded bg-stone-100 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(i + 1) * 18}%` }}
                            className="h-full rounded bg-gradient-to-r from-blue-400 to-blue-500" />
                        </div>
                        <span className="text-[10px] text-stone-500 w-6 text-right">{i + 1}x</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
            {selectedTab === "Monthly" && (
              <>
                <motion.div key="mo-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Monthly Progress</h3>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-blue-600">22</div>
                    <div className="text-xs text-stone-500 mt-1">workouts this month</div>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    {[
                      { label: "vs Last Month", value: "+18%" },
                      { label: "Streak", value: "6 days" },
                      { label: "Avg. Duration", value: "47 min" },
                    ].map(s => (
                      <div key={s.label} className="flex items-center justify-between text-xs">
                        <span className="text-stone-500">{s.label}</span>
                        <span className="font-medium text-stone-700">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div key="mo-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Activity Heatmap</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const intensity = Math.random()
                      return (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }}
                          className={`aspect-square rounded ${intensity > 0.6 ? "bg-blue-500" : intensity > 0.3 ? "bg-blue-300" : intensity > 0.1 ? "bg-blue-100" : "bg-stone-100"}`}
                          title={`Day ${i + 1}`}
                        />
                      )
                    })}
                  </div>
                  <p className="text-[10px] text-stone-400 mt-2 text-center">Last 28 days</p>
                </motion.div>
              </>
            )}
            {selectedTab === "Goals" && (
              <>
                <motion.div key="go-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Current Goals</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Weekly Workouts", current: "5 / 5", pct: 100 },
                      { label: "Daily Steps", current: "8,432 / 10K", pct: 84 },
                      { label: "Calorie Target", current: "1,890 / 2,200", pct: 86 },
                      { label: "Sleep Hours", current: "6.5 / 8", pct: 81 },
                    ].map(g => (
                      <div key={g.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-stone-500">{g.label}</span>
                          <span className="font-medium text-stone-700">{g.current}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${g.pct}%` }}
                            className="h-full rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div key="go-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <h3 className="text-sm font-medium mb-3">AI Recommendations</h3>
                  <div className="space-y-2">
                    {[
                      "Increase water intake on workout days",
                      "Try swapping one cardio session for HIIT",
                      "Add 10 min of stretching post-workout",
                    ].map((r, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 text-xs text-stone-600">
                        <Sparkles className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 px-4 bg-gradient-to-b from-blue-500/[0.04] to-transparent">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Ready to transform?</h2>
            <p className="text-sm text-stone-500 mb-6 max-w-sm mx-auto">Join 12,000+ users tracking their fitness journey. Start free, cancel anytime.</p>
            <button onClick={() => setSignInModal(true)} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/10">
              Start Free Trial <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/5"><Activity className="w-3.5 h-3.5 text-white" /></div>
                <span className="font-medium text-sm tracking-tight">FitTrack</span>
              </div>
              <p className="text-xs text-stone-500">Your fitness, your data, your journey.</p>
            </div>
            {[
              { title: "Features", links: ["Workouts", "Nutrition", "Progress", "AI Coach"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Connect", links: ["Instagram", "Twitter", "YouTube", "Discord"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-stone-500 mb-3 tracking-wider uppercase">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.links.map(link => (
                    <li key={link}><button onClick={() => setToast(`Demo — "${link}" link not available`)} className="text-xs text-stone-500 hover:text-blue-600 transition-colors">{link}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-200">
            <p className="text-[10px] text-stone-400">2026 FitTrack. Demo.</p>
            <div className="flex items-center gap-2">
              {[
                { icon: Leaf, label: "Leaf" },
                { icon: Link2, label: "Link" },
                { icon: MessageCircle, label: "Chat" }
              ].map(s => (
                <button key={s.label} onClick={() => setToast("Demo — social link not available")}
                  className="p-1.5 rounded-md text-stone-500 hover:text-blue-600 hover:bg-stone-100 transition-all">
                  <s.icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* SIGN IN MODAL */}
      <AnimatePresence>
        {signInModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSignInModal(false)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-stone-900">Start your journey</h3>
                <button onClick={() => setSignInModal(false)} className="p-1 text-stone-500 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <input type="email" placeholder="Email" className="w-full h-10 px-3 rounded-lg border border-stone-200/80 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-500/30 transition-colors" />
                <input type="password" placeholder="Password" className="w-full h-10 px-3 rounded-lg border border-stone-200/80 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-500/30 transition-colors" />
                <button onClick={() => { setSignInModal(false); setToast("Demo — account created!") }} className="w-full h-10 rounded-lg bg-blue-500 text-sm font-medium text-white hover:bg-blue-400 transition-colors">Get Started Free</button>
              </div>
              <p className="text-xs text-stone-500 text-center mt-4">Free trial — no payment required</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEATURE DETAIL MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <selectedFeature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <button onClick={() => setSelectedFeature(null)} className="p-1 text-stone-500 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{selectedFeature.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">{selectedFeature.desc}</p>
              <p className="text-xs text-stone-500">Powered by AI — adapts to your fitness level and goals. Detailed analytics and personalized recommendations included.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200/80 bg-white/95 backdrop-blur-md shadow-xl"
          >
            <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs text-stone-700">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}