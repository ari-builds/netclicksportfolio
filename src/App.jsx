import { useEffect, lazy, Suspense } from "react"
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Hero } from "@/components/Hero"
import CategoryOverview from "@/components/CategoryOverview"
import CategoryPage from "@/components/CategoryPage"
import WebsitesAppsPage from "@/components/WebsitesAppsPage"
import HowItWorks from "@/components/HowItWorks"
import ClientWork from "@/components/ClientWork"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { WhyUs, FounderNote, CTA, FAQ, EmailCapture } from "@/components/NetClicksSections"
import { OpeningVideo } from "@/components/OpeningVideo"
import { ScrollProgress } from "@/components/motion/ScrollProgress"
import { Marquee } from "@/components/motion/Marquee"
import { FilmGrain } from "@/components/motion/FilmGrain"
import { CursorFollower } from "@/components/motion/CursorFollower"
import { ScrollVelocity } from "@/components/motion/ScrollVelocity"
import { SystemStatus } from "@/components/motion/SystemStatus"
import { PointerComet } from "@/components/motion/PointerComet"
import SystemFlywheel from "@/components/SystemFlywheel"
import PartnershipLockIn from "@/components/PartnershipLockIn"
import { serviceCategories } from "@/svc/ServiceConfig"

const AmbientParticles = lazy(() => import("@/components/AmbientParticles").then((m) => ({ default: m.AmbientParticles })))

function ScrollOnNavigate() {
  const location = useLocation()
  const state = location.state
  useEffect(() => {
    if (state?.scrollTo) {
      const t = setTimeout(() => {
        document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: "smooth" })
      }, 60)
      return () => clearTimeout(t)
    }
  }, [state])
  return null
}

function RedirectHandler() {
  const navigate = useNavigate()
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect")
    if (redirect) {
      sessionStorage.removeItem("redirect")
      const currentPath = window.location.pathname.replace(/\/$/, "")
      const path = currentPath && redirect.startsWith(currentPath) ? redirect.slice(currentPath.length) : redirect
      navigate(path, { replace: true })
    }
  }, [navigate])
  return null
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <OpeningVideo />
      <main>
        <div className="relative" id="hero">
          <Suspense fallback={null}>
            <AmbientParticles />
          </Suspense>
          <Hero />
        </div>
        <ClientWork />
        <SystemStatus />
        <CategoryOverview />
        <Marquee items={serviceCategories.map((c) => c.label)} />
        <SystemFlywheel />
        <HowItWorks />
        <WhyUs />
        <FounderNote />
        <PartnershipLockIn />
        <FAQ />
        <EmailCapture />
        <ScrollVelocity />
        <CTA />
      </main>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <ScrollProgress />
      <RedirectHandler />
      <ScrollOnNavigate />
      <FilmGrain />
      <CursorFollower />
      <PointerComet />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lead-gen-outreach" element={<CategoryPage categorySlug="lead-gen-outreach" />} />
        <Route path="/ads-content" element={<CategoryPage categorySlug="ads-content" />} />
        <Route path="/websites-apps" element={<WebsitesAppsPage />} />
        <Route path="/ai-automation" element={<CategoryPage categorySlug="ai-automation" />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
