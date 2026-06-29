import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Menu, Phone, Mail, MapPin, CheckCircle, Star, Quote, ChevronRight, Sparkles, Shield, Award, Users, Briefcase, Scale, Wrench, HardHat, Home, Building, Droplets, Car } from "lucide-react"
import { Link } from "react-router-dom"

const iconMap = {
  "Estate Planning": Scale, "Business Law": Briefcase, "Family Law": Users, "Civil Litigation": Shield,
  "Engine Diagnostics": Car, "Brake & Suspension": Wrench, "Oil & Fluid Services": Droplets, "Tire & Alignment": Car,
  "Home Renovation": Home, "New Construction": Building, "Commercial Builds": Building, "Roofing & Siding": HardHat,
  "Home Buying": Home, "Selling Your Home": Building, "Property Management": Users, "Market Analysis": Briefcase,
}

export default function BizProServices({ config }) {
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState(null)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const servicesRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const c = config.colors

  return (
    <div className="min-h-screen bg-white text-stone-800">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: c.primary }}>
              <span className="text-white text-[10px] font-bold">{config.name[0]}</span>
            </div>
            <span className="font-medium tracking-tight text-sm">{config.name}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Services</button>
            <button onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Contact</button>
            <button onClick={() => setToast("Demo — booking not available")} className="px-4 py-1.5 rounded-full text-white text-sm font-medium transition-colors shadow-lg" style={{ backgroundColor: c.primary }}>Book a Consultation</button>
          </div>
          <button className="md:hidden p-1.5" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6" onClick={() => setMobileNav(false)}>
            <button className="absolute top-4 right-4 p-1.5" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Services", "Contact", "Book a Consultation"].map(item => (
              <button key={item} onClick={() => { setMobileNav(false); if (item === "Services") servicesRef.current?.scrollIntoView({ behavior: "smooth" }); else if (item === "Contact") contactRef.current?.scrollIntoView({ behavior: "smooth" }); else setToast("Demo — booking not available") }}
                className="text-xl font-medium text-stone-500 hover:text-stone-900 transition-colors">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={config.hero} alt={config.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.primary}dd 0%, ${c.primary}88 50%, ${c.primary}44 100%)` }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 border" style={{ backgroundColor: `${c.accent}22`, color: c.accent, borderColor: `${c.accent}44` }}>
              <Sparkles className="w-3 h-3" /> {config.group === "pro" ? "Professional Services" : "Trusted Since"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-4 tracking-tight text-white">
              {config.name}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">{config.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: c.accent }}>
                Our Services <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/30 text-sm font-medium text-white hover:bg-white/10 transition-all">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Our Services</h2>
            <p className="text-stone-500 text-sm mt-3 max-w-lg mx-auto">Comprehensive solutions tailored to your needs, delivered with expertise and care.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.services.map((s, i) => {
              const Icon = iconMap[s.title] || Briefcase
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: `${c.primary}15` }}>
                    <Icon className="w-5 h-5" style={{ color: c.primary }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-4" style={{ backgroundColor: `${c.primary}08` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="text-center p-5">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: c.primary }}>{s.value}</div>
                <div className="text-xs text-stone-500 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-6">Our Story</h2>
            <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">{config.about}</p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">What Our Clients Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {config.testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-6 rounded-xl border border-stone-200 bg-white">
                <Quote className="w-5 h-5 mb-3" style={{ color: `${c.primary}40` }} />
                <p className="text-sm text-stone-600 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c.primary }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{t.name}</div>
                    <div className="text-[10px] text-stone-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={contactRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>Contact</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Get in Touch</h2>
            <p className="text-stone-500 text-sm mt-3 max-w-md mx-auto">Ready to get started? Reach out and we'll get back to you within 24 hours.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Phone className="w-4 h-4" style={{ color: c.primary }} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Mail className="w-4 h-4" style={{ color: c.primary }} />
                <span>hello@{config.name.toLowerCase().replace(/\s+/g, "")}.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <MapPin className="w-4 h-4" style={{ color: c.primary }} />
                <span>123 Main Street, Suite 100, Anytown, USA</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
              <input placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                className="w-full h-11 px-4 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-2 transition-colors" style={{ focusBorderColor: c.primary }} />
              <input type="email" placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                className="w-full h-11 px-4 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-2 transition-colors" />
              <textarea placeholder="How can we help?" value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} rows={3}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-2 transition-colors resize-none" />
              <button onClick={() => { setContactForm({ name: "", email: "", message: "" }); setToast("Demo — message sent!") }}
                className="w-full h-11 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: c.primary }}>Send Message</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-stone-200" style={{ backgroundColor: `${c.primary}06` }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: c.primary }}>
              <span className="text-white text-[10px] font-bold">{config.name[0]}</span>
            </div>
            <span className="font-medium text-sm">{config.name}</span>
          </div>
          <p className="text-xs text-stone-500">{config.tagline}</p>
          <p className="text-[10px] text-stone-400 mt-4">2026 {config.name}. Demo.</p>
        </div>
      </footer>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 bg-white/95 backdrop-blur-md shadow-xl">
            <CheckCircle className="w-3.5 h-3.5" style={{ color: c.primary }} />
            <span className="text-xs text-stone-700">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
