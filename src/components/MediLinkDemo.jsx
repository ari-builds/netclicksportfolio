import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Heart, ArrowRight, Menu, X, Search, Star, Users, Clock, Video, Calendar, Pill, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Spotlight } from "./Spotlight"

const doctors = [
  { name: "Dr. Sarah Chen", specialty: "Cardiology", rating: 4.9, patients: "2,400+", avatar: "SC", nextAvail: "Today 2PM", color: "#e11d48" },
  { name: "Dr. Marcus Johnson", specialty: "Dermatology", rating: 4.8, patients: "1,800+", avatar: "MJ", nextAvail: "Tomorrow 10AM", color: "#f43f5e" },
  { name: "Dr. Aisha Patel", specialty: "Pediatrics", rating: 4.9, patients: "3,100+", avatar: "AP", nextAvail: "Tomorrow 3PM", color: "#be123c" },
  { name: "Dr. James Wilson", specialty: "Neurology", rating: 4.7, patients: "1,200+", avatar: "JW", nextAvail: "Wed 9AM", color: "#fb7185" },
  { name: "Dr. Emily Rivera", specialty: "Orthopedics", rating: 4.8, patients: "1,900+", avatar: "ER", nextAvail: "Wed 2PM", color: "#e11d48" },
  { name: "Dr. David Kim", specialty: "General Practice", rating: 4.9, patients: "3,800+", avatar: "DK", nextAvail: "Today 4PM", color: "#f43f5e" }
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const modalConfig = {
  appointments: { Icon: Calendar, title: "Your Appointments", desc: "No upcoming appointments scheduled." },
  records: { Icon: Pill, title: "Medical Records", desc: "No records on file yet. Book an appointment to get started." },
  prescriptions: { Icon: Pill, title: "Prescriptions", desc: "No active prescriptions. Your doctor will prescribe medication during your visit." },
  signin: { Icon: Heart, title: "Welcome back", desc: "Sign in to manage your appointments and records." }
}

export default function MediLinkDemo() {
  const [mobileNav, setMobileNav] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const doctorSectionRef = useRef(null)
  const featuresRef = useRef(null)

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  function openBooking(doc) {
    setSelectedDoctor(doc)
    setSelectedTime("")
    setReason("")
    setConfirmed(false)
  }

  function confirmBooking() {
    setConfirmed(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1c1c1c]">

      <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-rose-500 to-red-500 origin-left" style={{ scaleX }} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/10">
              <Heart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium tracking-tight text-[#1c1c1c]">MediLink</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => doctorSectionRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-[#6b6b6b] hover:text-rose-500 transition-colors tracking-tight">Find Doctors</button>
            {["Appointments", "Records", "Prescriptions"].map(item => (
              <button key={item} onClick={() => setActiveModal(item.toLowerCase())} className="text-sm text-[#6b6b6b] hover:text-rose-500 transition-colors tracking-tight">{item}</button>
            ))}
            <button onClick={() => setActiveModal("signin")} className="px-4 py-1.5 rounded-full bg-rose-500/90 text-white text-sm font-medium hover:bg-rose-500 transition-colors shadow-lg shadow-rose-500/10">
              Sign In
            </button>
          </div>
          <button className="md:hidden p-1.5 text-[#6b6b6b]" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
            onClick={() => setMobileNav(false)}
          >
            <button className="absolute top-4 right-4 p-1.5 text-[#6b6b6b]" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Find Doctors", "Appointments", "Records", "Prescriptions", "Sign In"].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => {
                  setMobileNav(false)
                  if (item === "Find Doctors") doctorSectionRef.current?.scrollIntoView({ behavior: "smooth" })
                  else if (item === "Sign In") setActiveModal("signin")
                  else setActiveModal(item.toLowerCase())
                }}
                className="text-xl font-medium text-[#6b6b6b] hover:text-rose-500 transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100 via-[#f8f7f4] to-[#f8f7f4]" />
        <Spotlight />
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/[0.08] text-rose-600 border border-rose-500/10 mb-4 tracking-wide">
                <Heart className="w-3 h-3" /> Telehealth Platform
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-4 tracking-tight text-[#1c1c1c]">
                Healthcare<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-400">from anywhere</span>
              </h1>
              <p className="text-base text-[#6b6b6b] mb-8 max-w-md leading-relaxed">
                Book appointments, consult top doctors via video, and manage prescriptions — all from your phone or computer.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => doctorSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/10"
                >
                  Find a Doctor <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-black/[0.08] text-sm font-medium text-[#6b6b6b] hover:bg-black/[0.03] transition-colors"
                >
                  See How It Works
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[400px] md:h-[500px] rounded-xl border border-black/[0.06] bg-white flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.03] to-transparent" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <motion.div
                className="relative w-40 h-40"
                style={{ perspective: "800px" }}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[28%] rounded-[14px] bg-gradient-to-br from-rose-400 to-red-500 shadow-[0_0_40px_rgba(225,29,72,0.25),0_0_80px_rgba(225,29,72,0.1)]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[28%] h-full rounded-[14px] bg-gradient-to-br from-rose-400 to-red-500 shadow-[0_0_40px_rgba(225,29,72,0.25),0_0_80px_rgba(225,29,72,0.1)]" />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full border border-rose-500/15"
                  animate={{ rotateZ: [0, 360], scale: [1, 1.15, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(-20px)" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-rose-400/15"
                  animate={{ rotateZ: [360, 0], scale: [1.15, 1, 1.15] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
                />
              </motion.div>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-rose-400/40"
                  animate={{
                    x: [0, (Math.random() - 0.5) * 120],
                    y: [0, (Math.random() - 0.5) * 120],
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    top: `${30 + Math.random() * 40}%`,
                    left: `${30 + Math.random() * 40}%`
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={doctorSectionRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 text-[#1c1c1c]">Find the right doctor</h2>
            <p className="text-sm text-[#6b6b6b] max-w-md mx-auto">Search by name or specialty to find your ideal provider.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative max-w-md mx-auto mb-10"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] pointer-events-none" />
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search doctors or specialties..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1c1c1c] placeholder-[#9a9a9a] outline-none focus:border-rose-500/40 focus:shadow-sm transition-all"
            />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group relative p-5 rounded-xl border border-black/[0.06] bg-white hover:shadow-sm hover:border-rose-500/20 transition-all cursor-pointer"
                onClick={() => openBooking(doc)}
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: `${doc.color}18`, color: doc.color }}
                  >
                    {doc.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#1c1c1c]">{doc.name}</h3>
                    <p className="text-xs text-[#6b6b6b]">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-auto shrink-0">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-medium text-[#1c1c1c]">{doc.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#6b6b6b] mb-3">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{doc.patients} patients</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.nextAvail}</span>
                </div>
                <button className="w-full h-8 rounded-lg bg-rose-500/90 hover:bg-rose-500 text-white text-xs font-semibold transition-colors">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-[#9a9a9a] py-8">No doctors match your search.</p>
          )}
        </div>
      </section>

      <section ref={featuresRef} className="relative z-10 py-20 px-4 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 text-[#1c1c1c]">Why MediLink?</h2>
            <p className="text-sm text-[#6b6b6b] max-w-md mx-auto">Built for modern healthcare — fast, private, and accessible.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Video, title: "Video Consult", desc: "Face-to-face with top specialists — from home, work, or on the go.", color: "#e11d48" },
              { icon: Calendar, title: "Instant Booking", desc: "See real-time availability and book your appointment in seconds.", color: "#f43f5e" },
              { icon: Pill, title: "Smart Prescriptions", desc: "Digital prescriptions sent directly to your pharmacy — no paper hassle.", color: "#be123c" }
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="p-6 rounded-xl border border-black/[0.06] bg-white hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${f.color}12` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-[#1c1c1c]">{f.title}</h3>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4 border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 rounded-2xl border border-black/[0.06] bg-white shadow-sm">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 text-[#1c1c1c]">Start your visit today</h2>
            <p className="text-sm text-[#6b6b6b] max-w-sm mx-auto mb-6">Millions of patients trust MediLink for fast, quality care.</p>
            <button
              onClick={() => doctorSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/10"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDoctor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-black/[0.06] bg-white p-6 shadow-xl"
            >
              {!confirmed ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: `${selectedDoctor.color}18`, color: selectedDoctor.color }}>
                        {selectedDoctor.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1c1c1c]">{selectedDoctor.name}</h3>
                        <p className="text-xs text-[#6b6b6b]">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedDoctor(null)} className="p-1 text-[#9a9a9a] hover:text-[#1c1c1c]"><X className="w-4 h-4" /></button>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#6b6b6b] mb-2.5 tracking-wider uppercase">Select a time</p>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map(t => (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedTime === t
                              ? "bg-rose-500/10 border-rose-500/40 text-rose-600"
                              : "bg-white border-black/[0.08] text-[#6b6b6b] hover:border-black/[0.15]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-[#6b6b6b] mb-2 tracking-wider uppercase">Reason for visit</p>
                    <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                      placeholder="Briefly describe your symptoms or reason..."
                      className="w-full rounded-xl bg-white border border-black/[0.08] text-sm text-[#1c1c1c] placeholder-[#9a9a9a] p-3 outline-none focus:border-rose-500/40 resize-none"
                    />
                  </div>

                  <button onClick={confirmBooking} disabled={!selectedTime}
                    className="w-full h-10 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-semibold transition-all"
                  >
                    Confirm Booking
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-rose-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-[#1c1c1c]">Appointment Confirmed</h3>
                  <p className="text-xs text-[#6b6b6b] mb-4">
                    {selectedDoctor.name} — {selectedTime}
                  </p>
                  <button onClick={() => setSelectedDoctor(null)}
                    className="px-5 py-2 rounded-full bg-black/[0.06] text-xs font-medium text-[#6b6b6b] hover:bg-black/[0.1] transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white p-6 shadow-xl"
            >
              {(() => {
                const cfg = modalConfig[activeModal]
                if (!cfg) return null
                const Icon = cfg.Icon
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-rose-500" />
                        </div>
                        <h3 className="text-sm font-semibold text-[#1c1c1c]">{cfg.title}</h3>
                      </div>
                      <button onClick={() => setActiveModal(null)} className="p-1 text-[#9a9a9a] hover:text-[#1c1c1c]"><X className="w-4 h-4" /></button>
                    </div>
                    {activeModal === "signin" ? (
                      <div className="space-y-3">
                        <input type="email" placeholder="Email" className="w-full h-10 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1c1c1c] placeholder-[#9a9a9a] px-3 outline-none focus:border-rose-500/40" />
                        <input type="password" placeholder="Password" className="w-full h-10 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1c1c1c] placeholder-[#9a9a9a] px-3 outline-none focus:border-rose-500/40" />
                        <button onClick={() => setActiveModal(null)} className="w-full h-10 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-white text-sm font-semibold transition-all">Sign In</button>
                        <p className="text-[11px] text-[#9a9a9a] text-center">Demo — no account needed</p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#6b6b6b] leading-relaxed">{cfg.desc}</p>
                    )}
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-black/[0.06] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/5"><Heart className="w-3.5 h-3.5 text-white" /></div>
                <span className="font-medium text-sm tracking-tight text-[#1c1c1c]">MediLink</span>
              </div>
              <p className="text-xs text-[#6b6b6b]">Connecting patients with care.</p>
            </div>
            {[
              { title: "Patients", links: ["Find Doctors", "Book Appointment", "Telehealth", "Pricing"] },
              { title: "For Doctors", links: ["Join as Provider", "Resources", "Support", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-[#6b6b6b] mb-3 tracking-wider uppercase">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.links.map(link => (
                    <li key={link}><button className="text-xs text-[#6b6b6b] hover:text-rose-500 transition-colors">{link}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-black/[0.06]">
            <p className="text-[10px] text-[#9a9a9a]">2026 MediLink. Demo.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
