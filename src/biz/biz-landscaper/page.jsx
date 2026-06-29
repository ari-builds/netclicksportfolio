import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Menu, Phone, Mail, MapPin, CheckCircle, Quote, Sparkles, Star, Clock, Scissors, Coffee, Heart, Leaf, Sun, ChevronRight, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import config from "./config"

const iconMap = {
  "Classic Haircut": Scissors, "Hot Towel Shave": Scissors, "Beard Grooming": Scissors, "Hair & Beard Combo": Scissors,
  "Signature Cut": Scissors, "Color & Highlights": Sparkles, "Bridal Styling": Heart, "Keratin Treatment": Sparkles,
  "Artisan Breads": Coffee, "Custom Cakes": Heart, "Pastries & Croissants": Coffee, "Catering": Star,
  "Garden Design": Leaf, "Lawn Care": Sun, "Hardscaping": Leaf, "Tree & Shrub": Leaf,
}

export default function BizLandscaperPage() {
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const servicesRef = useRef(null)
  const galleryRef = useRef(null)
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
            <button onClick={() => setToast("Demo — booking not available")} className="px-4 py-1.5 rounded-full text-white text-sm font-medium transition-colors shadow-lg" style={{ backgroundColor: c.primary }}>Book Now</button>
          </div>
          <button className="md:hidden p-1.5" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6" onClick={() => setMobileNav(false)}>
            <button className="absolute top-4 right-4 p-1.5" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Services", "Contact", "Book Now"].map(item => (
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
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.primary}dd 0%, ${c.primary}66 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-4 tracking-tight text-white">
              {config.name}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">{config.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: c.accent }}>
                Our Services <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/30 text-sm font-medium text-white hover:bg-white/10 transition-all">
                Visit Us
              </button>
              {config.liveUrl && (
                <a href={config.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all bg-white/20 backdrop-blur hover:bg-white/30 border border-white/40">
                  Live Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={galleryRef} className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>Gallery</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Our Work</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {config.gallery.map((img, i) => (
              <motion.button key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                onClick={() => setToast("Demo — image viewer not available")}
                className="aspect-square rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all group">
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Services & Pricing</h2>
          </motion.div>
          <div className="space-y-2">
            {config.services.map((s, i) => {
              const Icon = iconMap[s.title] || Star
              return (
                <motion.button key={s.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedService(s)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.primary}12` }}>
                      <Icon className="w-4 h-4" style={{ color: c.primary }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{s.title}</div>
                      <div className="text-xs text-stone-500">{s.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: c.primary }}>{s.price}</span>
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-6">Our Story</h2>
            <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">{config.about}</p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
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
      <section ref={contactRef} className="py-20 px-4 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.primary }}>Visit Us</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Get in Touch</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: c.primary }} />
                <div>
                  <div className="font-medium">Visit us</div>
                  <div className="text-stone-500">123 Main Street, Anytown, USA</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Phone className="w-5 h-5 shrink-0" style={{ color: c.primary }} />
                <div>
                  <div className="font-medium">Call us</div>
                  <div className="text-stone-500">(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Clock className="w-5 h-5 shrink-0" style={{ color: c.primary }} />
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-stone-500">Mon–Sat 9AM–7PM · Sun 10AM–4PM</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-6 rounded-xl border border-stone-200 bg-white shadow-sm text-center">
              <p className="text-sm text-stone-500 mb-4">Ready to book or have questions?</p>
              <button onClick={() => setToast("Demo — booking not available")} className="w-full h-11 rounded-lg text-sm font-medium text-white transition-colors shadow-lg" style={{ backgroundColor: c.primary }}>
                Book Now
              </button>
              <p className="text-[10px] text-stone-400 mt-3">Or call (555) 123-4567</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-stone-200">
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

      {/* SERVICE DETAIL MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.primary}12` }}>
                  <Sparkles className="w-5 h-5" style={{ color: c.primary }} />
                </div>
                <button onClick={() => setSelectedService(null)} className="p-1 text-stone-500 hover:text-stone-900"><X className="w-4 h-4" /></button>
              </div>
              <h3 className="font-semibold text-stone-900 mb-1">{selectedService.title}</h3>
              <p className="text-sm text-stone-500 mb-3">{selectedService.desc}</p>
              <div className="text-lg font-bold" style={{ color: c.primary }}>{selectedService.price}</div>
              <button onClick={() => { setSelectedService(null); setToast("Demo — booking not available") }}
                className="w-full h-10 rounded-lg text-sm font-medium text-white mt-4 transition-colors" style={{ backgroundColor: c.primary }}>
                Book This Service
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
