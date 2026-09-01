import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { serviceCategories } from "../svc/ServiceConfig"
import { Magnetic } from "./motion/Magnetic"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onHome = location.pathname === "/"
  const isServicePage = ["lead-gen-outreach", "ads-content", "websites-apps", "ai-automation"].includes(
    location.pathname.replace("/", ""),
  )

  const goToAnchor = (id) => {
    setMenuOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/", { state: { scrollTo: id } })
    }
  }

  const goToHome = () => {
    if (onHome) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/")
    }
  }

  const navAnchor = [
    { label: "Results", id: "impact" },
    { label: "Founder", id: "founder" },
    { label: "Partners", id: "partners" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-background/70 backdrop-blur-xl border-b border-border" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        <button onClick={goToHome} className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-foreground">
            NET<span className="bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">CLICKS</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-2">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                servicesOpen || isServicePage ? "text-foreground bg-foreground/5" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-full mt-3 w-[20rem] rounded-2xl border border-border bg-card p-2 shadow-xl shadow-black/20"
                >
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/${cat.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-foreground/5"
                    >
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.label[0]}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-foreground">{cat.label}</span>
                        <span className="line-clamp-1 block text-xs text-muted-foreground">{cat.how}</span>
                      </span>
                      <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navAnchor.map((l) => (
            <button
              key={l.id}
              onClick={() => goToAnchor(l.id)}
              className="group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l.label}</span>
              <span className="absolute inset-0 flex items-center justify-center px-4 py-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0 pointer-events-none">
                {l.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic>
            <button
              onClick={() => goToAnchor("cta")}
              className="hidden lg:inline-flex px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-[#00F2FF] to-[#8B5CF6] text-white hover:scale-105"
            >
              Book a Discovery Call
            </button>
          </Magnetic>
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 rounded-full border border-border text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] lg:hidden"
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-0 h-full w-[20rem] max-w-[85vw] border-l border-border bg-card p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    NET<span className="bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">CLICKS</span>
                  </span>
                  <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full border border-border" aria-label="Close menu">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Services</div>
                <div className="mb-6 flex flex-col gap-1">
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-foreground/5"
                    >
                      <span className="h-8 w-8 rounded-lg text-sm font-bold text-white flex items-center justify-center" style={{ backgroundColor: cat.color }}>
                        {cat.label[0]}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">More</div>
                <div className="flex flex-col gap-1">
                  {[...navAnchor, { label: "Book a Call", id: "cta" }].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => goToAnchor(l.id)}
                      className="rounded-xl p-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
