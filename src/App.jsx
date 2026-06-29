import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Portfolio3D } from "@/components/Portfolio3D"
import SmallBizSection from "@/components/SmallBizSection"
import { HeroParallax } from "@/components/HeroParallax"
import { ScrollShowcase } from "@/components/ScrollShowcase"
import { ContainerScrollAnimation } from "@/components/ContainerScrollAnimation"
import { Testimonials } from "@/components/Testimonials"
import { Footer } from "@/components/Footer"
import { DemoPage } from "@/components/DemoPage"

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

function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold">Agency</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Services />
        <SmallBizSection />
        <Portfolio3D />
        <HeroParallax />
        <ScrollShowcase />
        <ContainerScrollAnimation />
        <Testimonials />
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
