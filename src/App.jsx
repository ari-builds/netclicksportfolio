import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Portfolio3D } from "@/components/Portfolio3D"
import SmallBizSection from "@/components/SmallBizSection"
import { HeroParallax } from "@/components/HeroParallax"
import { ScrollShowcase } from "@/components/ScrollShowcase"
import { ContainerScrollAnimation } from "@/components/ContainerScrollAnimation"
import { Footer } from "@/components/Footer"
import { DemoPage } from "@/components/DemoPage"
import { FounderNote, CTA } from "@/components/NetClicksSections"
import { LaunchDemo } from "@/components/LaunchDemo"

function RedirectHandler() {
  const navigate = useNavigate()
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect")
    if (redirect) {
      sessionStorage.removeItem("redirect")
      const path = redirect.replace("/netclicksportfolio", "")
      navigate(path, { replace: true })
    }
  }, [navigate])
  return null
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-background/70 backdrop-blur-xl border-b border-border" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            NET<span className="bg-gradient-to-r from-[#00F2FF] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">CLICKS</span>
          </span>
          <span className="hidden md:inline text-xs text-muted-foreground border-l border-border pl-3 uppercase tracking-wider">
            Turning clicks into customers
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Work", id: "work" },
            { label: "Services", id: "services" },
            { label: "Process", id: "process" },
            { label: "Founder", id: "founder" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => scrollTo("cta")}
          className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-[#00F2FF] to-[#8B5CF6] text-white hover:scale-105"
        >
          Book a Discovery Call
        </button>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LaunchDemo />
        <Services />
        <SmallBizSection />
        <Portfolio3D />
        <HeroParallax />
        <ScrollShowcase />
        <ContainerScrollAnimation />
        <FounderNote />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/netclicksportfolio">
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/:slug" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
