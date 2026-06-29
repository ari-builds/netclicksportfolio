import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, X, Menu, Search, Heart, ShoppingBag, Image, Award, Link2, MessageCircle, Sparkles, Eye, ChevronRight, Quote, User, Palette, Camera, MoveRight, Star, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { ArcGalleryHero } from "./ArcGalleryHero"

const g = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop`

const galleryImages = [
  { src: g("1579783902614-a3fb3927b6a5"), title: "Ethereal Dreams", artist: "Elena Voss", category: "Digital Art" },
  { src: g("1549490349-8643362247b5"), title: "Urban Reflections", artist: "Marcus Chen", category: "Photography" },
  { src: g("1452860606245-08befc0ff44b"), title: "Digital Bloom", artist: "Aria Patel", category: "Digital Art" },
  { src: g("1513364776144-60967b0f800f"), title: "Concrete Jungle", artist: "Jordan Lee", category: "Photography" },
  { src: g("1605721911519-3dfeb3be25e7"), title: "Neon Nights", artist: "Sam Rivera", category: "Digital Art" },
  { src: g("1561214115-f2f134cc4912"), title: "Organic Forms", artist: "Taylor Kim", category: "Sculpture" },
  { src: g("1460661419201-fd4cecdf8a8b"), title: "Abstract Vision", artist: "Nina Petrova", category: "Painting" },
  { src: g("1515405295579-ba7b45403062"), title: "Golden Hour", artist: "Liam O'Brien", category: "Painting" },
  { src: g("1580136579312-94651dfd596d"), title: "Industrial Grit", artist: "Marcus Chen", category: "Photography" },
  { src: g("1554188248-986adbb73be4"), title: "Chrome Realm", artist: "Aria Patel", category: "Digital Art" },
  { src: g("1507842217343-583bb7270b66"), title: "Bronze Age", artist: "Taylor Kim", category: "Sculpture" },
  { src: g("1500462918059-b1a0cb512f1d"), title: "Quiet Morning", artist: "Elena Voss", category: "Painting" },
  { src: g("1578301978693-85fa9c0320b9"), title: "Midnight Serenade", artist: "Sam Rivera", category: "Painting" },
  { src: g("1506905925346-21bda4d32df4"), title: "Celestial", artist: "Nina Petrova", category: "Digital Art" },
  { src: g("1604079628040-94301bb21b91"), title: "Prism Gate", artist: "Jordan Lee", category: "Photography" },
]

const categories = ["All", "Digital Art", "Photography", "Sculpture", "Painting"]

const artists = [
  { name: "Elena Voss", specialty: "Digital & Mixed Media", avatar: "EV", color: "#f59e0b", works: 47 },
  { name: "Marcus Chen", specialty: "Photography", avatar: "MC", color: "#d97706", works: 38 },
  { name: "Aria Patel", specialty: "Digital Art & Illustration", avatar: "AP", color: "#b45309", works: 52 },
  { name: "Taylor Kim", specialty: "Sculpture & Installations", avatar: "TK", color: "#fbbf24", works: 29 },
]

const collections = [
  { name: "Abstract Realms", desc: "Where imagination meets the unconscious", count: 24 },
  { name: "Urban Perspectives", desc: "City life through the lens of masters", count: 18 },
  { name: "Digital Awakening", desc: "Pushing boundaries of new media art", count: 31 },
]

function Counter({ end, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(el)
        const duration = 2000
        const steps = 60
        const increment = end / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])
  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}+</span>
}

function FadeIn({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ArtSpaceDemo() {
  const [mobileNav, setMobileNav] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [wishlist, setWishlist] = useState(new Set())
  const [signInModal, setSignInModal] = useState(false)
  const [toast, setToast] = useState(null)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const galleryRef = useRef(null)
  const artistsRef = useRef(null)
  const collectionsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const filtered = activeFilter === "All" ? galleryImages : galleryImages.filter(i => i.category === activeFilter)

  function openLightbox(img, i) {
    setLightbox(img)
    setLightboxIndex(i)
  }

  function nextLightbox() {
    const items = activeFilter === "All" ? galleryImages : filtered
    const next = (lightboxIndex + 1) % items.length
    setLightbox(items[next])
    setLightboxIndex(next)
  }

  function prevLightbox() {
    const items = activeFilter === "All" ? galleryImages : filtered
    const prev = (lightboxIndex - 1 + items.length) % items.length
    setLightbox(items[prev])
    setLightboxIndex(prev)
  }

  function collectionImages(col) {
    const i = collections.indexOf(col)
    return galleryImages.slice(i * 6, i * 6 + 6)
  }

  function toggleWishlist(title) {
    setWishlist(prev => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 relative">

      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Image className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium tracking-tight">ArtSpace</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-amber-600 transition-colors tracking-tight">Gallery</button>
            <button onClick={() => artistsRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-amber-600 transition-colors tracking-tight">Artists</button>
            <button onClick={() => collectionsRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-stone-500 hover:text-amber-600 transition-colors tracking-tight">Collections</button>
            <button onClick={() => setSignInModal(true)} className="px-4 py-1.5 rounded-full bg-amber-500/90 text-white text-sm font-medium hover:bg-amber-500 transition-colors shadow-lg shadow-amber-500/10">
              Sign In
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="md:hidden p-1.5" onClick={() => setMobileNav(true)}><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6" onClick={() => setMobileNav(false)}>
            <button className="absolute top-4 right-4 p-1.5" onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            {["Gallery", "Artists", "Collections", "Sign In"].map((item, i) => (
              <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setMobileNav(false)
                  if (item === "Gallery") galleryRef.current?.scrollIntoView({ behavior: "smooth" })
                  else if (item === "Artists") artistsRef.current?.scrollIntoView({ behavior: "smooth" })
                  else if (item === "Collections") collectionsRef.current?.scrollIntoView({ behavior: "smooth" })
                  else if (item === "Sign In") setSignInModal(true)
                }}
                className="text-xl font-medium text-stone-500 hover:text-amber-600 transition-colors"
              >{item}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ArcGalleryHero
        images={[
          g("1579783902614-a3fb3927b6a5").replace("600&h=600", "400&h=400"),
          g("1549490349-8643362247b5").replace("600&h=600", "400&h=400"),
          g("1452860606245-08befc0ff44b").replace("600&h=600", "400&h=400"),
          g("1513364776144-60967b0f800f").replace("600&h=600", "400&h=400"),
          g("1605721911519-3dfeb3be25e7").replace("600&h=600", "400&h=400"),
          g("1561214115-f2f134cc4912").replace("600&h=600", "400&h=400"),
          g("1460661419201-fd4cecdf8a8b").replace("600&h=600", "400&h=400"),
          g("1515405295579-ba7b45403062").replace("600&h=600", "400&h=400"),
          g("1580136579312-94651dfd596d").replace("600&h=600", "400&h=400"),
          g("1554188248-986adbb73be4").replace("600&h=600", "400&h=400"),
        ]}
        onGetStarted={() => artistsRef.current?.scrollIntoView({ behavior: "smooth" })}
        onExploreGallery={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* STATS */}
      <section className="relative z-10 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { end: 12400, label: "Artists" },
            { end: 53000, label: "Artworks" },
            { end: 8800, label: "Collections" },
            { end: 192, label: "Countries" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} y={20}>
              <div className="text-2xl md:text-3xl font-bold text-amber-600"><Counter end={s.end} label={s.label} /></div>
              <div className="text-xs text-stone-500 mt-1 tracking-wide uppercase">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section ref={galleryRef} className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs text-amber-500/70 tracking-[0.15em] uppercase font-medium">Browse</span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1">Featured Works</h2>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeFilter === cat ? "bg-amber-100 text-amber-700 border border-amber-500/20" : "text-stone-500 border border-transparent hover:text-stone-700"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.button
                  key={img.title}
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => openLightbox(img, galleryImages.indexOf(img))}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm"
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={e => { e.stopPropagation(); toggleWishlist(img.title) }}
                      className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all">
                      <Heart className={`w-3.5 h-3.5 ${wishlist.has(img.title) ? "text-amber-400 fill-amber-400" : "text-white"}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 transition-all duration-400 opacity-0 group-hover:opacity-100">
                    <div className="text-sm font-medium">{img.title}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{img.artist} · {img.category}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-stone-500 py-16">No works found in this category.</p>
          )}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section ref={collectionsRef} className="relative z-10 py-16 px-4 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs text-amber-500/70 tracking-[0.15em] uppercase font-medium">Curated</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1">Featured Collections</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {collections.map((col, i) => (
              <FadeIn key={col.name} delay={i * 0.1} y={30}>
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedCollection(col)}
                  className="group relative p-7 rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:border-amber-500/20 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <Palette className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1.5">{col.name}</h3>
                  <p className="text-sm text-stone-500 mb-4 leading-relaxed">{col.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">{col.count} works</span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <MoveRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISTS */}
      <section ref={artistsRef} className="relative z-10 py-16 px-4 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs text-amber-500/70 tracking-[0.15em] uppercase font-medium">Meet the</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1">Featured Artists</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {artists.map((artist, i) => (
              <FadeIn key={artist.name} delay={i * 0.08} y={20}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group p-6 rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:border-amber-500/15 transition-all text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold"
                    style={{ background: `${artist.color}22`, color: artist.color }}
                  >
                    {artist.avatar}
                  </div>
                  <h3 className="text-sm font-semibold">{artist.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5 mb-3">{artist.specialty}</p>
                  <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400">
                    <span>{artist.works} works</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="flex items-center gap-0.5 text-amber-600"><Star className="w-2.5 h-2.5 fill-amber-600" /> 4.9</span>
                  </div>
                  <button onClick={() => setSelectedArtist(artist)} className="mt-4 w-full h-8 rounded-lg border border-stone-200/80 text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
                    View Profile
                  </button>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-16 px-4 border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs text-amber-500/70 tracking-[0.15em] uppercase font-medium">From Our</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-1">Community</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: "ArtSpace transformed how I present my portfolio. The curation tools are incredible and I've connected with collectors worldwide.", name: "Sofia Martínez", role: "Digital Artist" },
              { quote: "I found my first collector within a week. The platform makes selling art feel natural and the community is incredibly supportive.", name: "David Okonkwo", role: "Photographer" },
              { quote: "The most beautiful gallery platform I've used. It's where my art finally feels at home.", name: "Yuki Tanaka", role: "Painter" },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1} y={20}>
                <div className="p-6 rounded-xl border border-stone-200/80 bg-white shadow-sm">
                  <Quote className="w-5 h-5 text-amber-500/20 mb-3" />
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-medium">{t.name}</div>
                      <div className="text-[10px] text-stone-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4 border-t border-stone-200">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn y={20}>
            <div className="p-10 rounded-2xl border border-stone-200/80 bg-white shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-[100px]" />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 relative z-10">Ready to showcase your work?</h2>
              <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6 relative z-10">Join thousands of artists already sharing their creativity on ArtSpace.</p>
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                <button onClick={() => artistsRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-500 text-sm font-medium hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5 relative" />
                </button>
                <button onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-stone-200/80 text-sm font-medium text-stone-500 hover:bg-stone-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-white"
            onClick={() => setLightbox(null)}
          >
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-4xl w-full flex flex-col md:flex-row gap-6" onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 p-1.5 text-zinc-400 hover:text-white transition-colors z-10"><X className="w-5 h-5" /></button>
              <div className="relative flex-1">
                <img src={lightbox.src} alt={lightbox.title} className="w-full rounded-xl" />
                <button onClick={prevLightbox} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                <button onClick={nextLightbox} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
              <div className="md:w-64 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{lightbox.title}</h3>
                  <p className="text-sm text-zinc-400">{lightbox.artist}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300/80">{lightbox.category}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">A stunning piece that showcases the artist's unique vision and technical mastery.</p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                  <button onClick={() => toggleWishlist(lightbox.title)}
                    className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-white/[0.06] text-xs text-zinc-400 hover:text-amber-300 hover:border-amber-500/20 transition-all">
                    <Heart className={`w-3.5 h-3.5 ${wishlist.has(lightbox.title) ? "text-amber-400 fill-amber-400" : ""}`} /> Save
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-white/[0.06] text-xs text-zinc-400 hover:text-amber-300 hover:border-amber-500/20 transition-all">
                    <ShoppingBag className="w-3.5 h-3.5" /> Buy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/5"><Image className="w-3.5 h-3.5 text-white" /></div>
                <span className="font-medium text-sm tracking-tight">ArtSpace</span>
              </div>
              <p className="text-xs text-stone-500">Where creativity finds its home.</p>
            </div>
            {[
              { title: "Platform", links: ["Gallery", "Artists", "Collections", "Pricing"] },
              { title: "Support", links: ["Help Center", "Terms", "Privacy", "Guidelines"] },
              { title: "Connect", links: ["Instagram", "Twitter", "Discord", "Email"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-stone-500 mb-3 tracking-wider uppercase">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.links.map(link => (
                    <li key={link}><button onClick={() => setToast(`Demo — "${link}" link not available`)} className="text-xs text-stone-500 hover:text-amber-600 transition-colors">{link}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-200">
            <p className="text-[10px] text-stone-400">2026 ArtSpace. Demo.</p>
            <div className="flex items-center gap-2">
              {[Link2, MessageCircle].map((Icon, i) => (
                <motion.button key={i} whileHover={{ y: -2, scale: 1.1 }}
                  onClick={() => setToast("Demo — social link not available")}
                  className="p-1.5 rounded-md text-stone-500 hover:text-amber-600 hover:bg-stone-100 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* SIGN IN MODAL */}
      <AnimatePresence>
        {signInModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSignInModal(false)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-stone-900">Welcome back</h3>
                <button onClick={() => setSignInModal(false)} className="p-1 text-stone-500 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <input type="email" placeholder="Email" className="w-full h-10 px-3 rounded-lg border border-stone-200/80 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500/30 transition-colors" />
                <input type="password" placeholder="Password" className="w-full h-10 px-3 rounded-lg border border-stone-200/80 bg-stone-50 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500/30 transition-colors" />
                <button onClick={() => { setSignInModal(false); setToast("Demo — sign in successful") }} className="w-full h-10 rounded-lg bg-amber-500 text-sm font-medium text-white hover:bg-amber-400 transition-colors">Sign In</button>
              </div>
              <p className="text-xs text-stone-500 text-center mt-4">Demo — no account needed</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ARTIST PROFILE MODAL */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: `${selectedArtist.color}22`, color: selectedArtist.color }}>
                    {selectedArtist.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">{selectedArtist.name}</h3>
                    <p className="text-xs text-stone-500">{selectedArtist.specialty}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedArtist(null)} className="p-1 text-stone-500 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">{selectedArtist.name} is a renowned {selectedArtist.specialty.toLowerCase()} artist with {selectedArtist.works} works featured on ArtSpace. Their practice explores the boundaries between traditional techniques and contemporary expression.</p>
              <div className="grid grid-cols-2 gap-2">
                {galleryImages.filter(i => i.artist === selectedArtist.name).map(img => (
                  <div key={img.title} className="aspect-square rounded-lg overflow-hidden border border-stone-200">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COLLECTION MODAL */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCollection(null)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{selectedCollection.name}</h3>
                  <p className="text-sm text-stone-500 mt-1">{selectedCollection.desc}</p>
                </div>
                <button onClick={() => setSelectedCollection(null)} className="p-1 text-stone-500 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
                <Palette className="w-3.5 h-3.5" />
                <span>{selectedCollection.count} works</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {collectionImages(selectedCollection).map(img => (
                  <div key={img.title} className="aspect-square rounded-lg overflow-hidden border border-stone-200">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
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
            <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-stone-700">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
