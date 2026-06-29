import { useState, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingBag, Heart, Search, User, Menu, X, Check, ExternalLink, Trash2, Plus, Minus, Cloud, Activity, Zap, Shield, Terminal, BarChart3, Users, Play, ChevronRight, GitBranch, MessageCircle } from "lucide-react"
import GreenLeafDemo from "./GreenLeafDemo"
import ArtSpaceDemo from "./ArtSpaceDemo"
import FitTrackDemo from "./FitTrackDemo"
import MediLinkDemo from "./MediLinkDemo"
import BizLawyerPage from "../biz/biz-lawyer/page"
import BizAutoRepairPage from "../biz/biz-autorepair/page"
import BizContractorPage from "../biz/biz-contractor/page"
import BizRealtorPage from "../biz/biz-realtor/page"
import BizBarberPage from "../biz/biz-barber/page"
import BizSalonPage from "../biz/biz-salon/page"
import BizBakeryPage from "../biz/biz-bakery/page"
import BizLandscaperPage from "../biz/biz-landscaper/page"

const products = [
  { name: "Merino Wool Coat", price: "$890", img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=500&fit=crop", desc: "Luxurious Italian merino wool, tailored in Florence.", category: "clothing" },
  { name: "Silk Evening Gown", price: "$1,290", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop", desc: "Hand-finished silk charmeuse with crystal accents.", category: "clothing" },
  { name: "Italian Leather Bag", price: "$1,450", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop", desc: "Full-grain Tuscan leather, artisan stitched.", category: "accessories" },
  { name: "Cashmere Turtleneck", price: "$680", img: "https://images.unsplash.com/photo-1623183949963-0557c9532763?w=400&h=500&fit=crop", desc: "Ultra-fine Mongolian cashmere, 12-gauge knit.", category: "clothing" },
  { name: "Tailored Wool Trousers", price: "$520", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop", desc: "English worsted wool, half-canvassed construction.", category: "clothing" },
  { name: "Crystal Drop Earrings", price: "$380", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop", desc: "Swiss-cut crystals set in 18k gold vermeil.", category: "accessories" },
]

const newArrivals = [
  { name: "Alpaca Blend Overcoat", price: "$1,120", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop", desc: "Baby alpaca blend with silk lining, crafted in Como." },
  { name: "Limited Edition Scarf", price: "$420", img: "https://images.unsplash.com/photo-1475833066581-442bab044578?w=400&h=500&fit=crop", desc: "Hand-rolled cashmere-silk scarf, exclusively dyed." },
  { name: "Sapphire Cufflinks", price: "$680", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop", desc: "Certified Ceylon sapphires set in platinum." },
]

const accessories = [
  { name: "Italian Leather Bag", price: "$1,450", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop", desc: "Full-grain Tuscan leather, artisan stitched." },
  { name: "Crystal Drop Earrings", price: "$380", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop", desc: "Swiss-cut crystals set in 18k gold vermeil." },
  { name: "Leather Belt", price: "$290", img: "https://images.unsplash.com/photo-1752386234024-7d283e4a1830?w=400&h=500&fit=crop", desc: "Italian calfskin with brushed brass buckle." },
  { name: "Sunrise Aviators", price: "$540", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop", desc: "Gold-plated frames with Zeiss gradient lenses." },
]

const articlesData = [
  {
    id: 1, title: "The Art of Italian Craftsmanship",
    img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=500&fit=crop",
    excerpt: "Inside the Florence atelier where master artisans spend weeks perfecting a single garment.",
    author: "Sofia Bianchi", date: "May 12, 2026", readTime: "6 min read",
    content: [
      "Nestled along the Arno River, the Bianchi family atelier has been producing some of the world's finest garments since 1932. Here, fourth-generation master tailor Matteo Bianchi oversees a team of fourteen artisans who together spend an average of forty hours on each bespoke piece.",
      "\"It is not about speed,\" he says, running his hands over a length of Super 150s wool. \"It is about respect for the material and the person who will wear it. Every stitch tells a story, and every seam must honor the fabric.\"",
      "The atelier sources directly from the Biella mills, whose wool has clothed royalty for centuries. Each bolt is inspected by hand before a single cut is made. The precision paper patterns — some dating back to the 1950s — are stored in oak cabinets that line the workshop walls.",
      "This dedication is what separates a garment from a piece of clothing. As Matteo's daughter Chiara, who now manages the bespoke division, explains: \"When a client receives their jacket, they are not just buying wool and lining. They are buying three generations of expertise, forty hours of labor, and a fit that exists nowhere else in the world.\""
    ]
  },
  {
    id: 2, title: "Sustainable Luxury: Our Promise",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop",
    excerpt: "How we are redefining luxury through ethical sourcing, zero-waste production, and timeless design.",
    author: "James Cartwright", date: "April 28, 2026", readTime: "5 min read",
    content: [
      "Luxury and sustainability have long been viewed as opposing forces. But a new generation of consumers is demanding both — and we believe they should not have to choose. Our 2026 sustainability report marks a significant milestone: one hundred percent of our raw materials are now sourced from certified ethical suppliers.",
      "The transformation was not easy. It meant rebuilding relationships with mills in Italy, Scotland, and Japan, investing in traceability technology, and sometimes paying a premium for materials that met our standards. The result is a supply chain we are proud to stand behind.",
      "\"True luxury is not disposable,\" says head of sustainability Amara Osei. \"It is built to last, designed to transcend seasons, and made in a way that honors both the craftspeople and the planet. We want our pieces to be inherited, not discarded.\"",
      "Our zero-waste initiative has reduced fabric waste by sixty-eight percent since 2022. Offcuts are transformed into limited-edition accessories, and any remaining material is recycled into new yarn through our partnership with a mill in Prato. We invite our clients to bring any Luxe Boutique piece back for complimentary restoration — because sustainability also means caring for what you already own."
    ]
  },
  {
    id: 3, title: "Behind the Seams: Atelier Visit",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=500&fit=crop",
    excerpt: "An exclusive look inside the creative process — from initial sketch to final fitting.",
    author: "Elena Moretti", date: "April 10, 2026", readTime: "7 min read",
    content: [
      "The morning light filters through the tall windows of the atelier on Via de' Tornabuoni, casting long shadows across cutting tables covered in bolts of cloth. This is where the season's collection takes its first breath — not in a computer rendering, but in charcoal sketches pinned to cork boards and toiles draped on mannequins.",
      "Creative director Marco Valli begins each season with a single question: \"What do we want women and men to feel when they wear this?\" For Spring Summer 2026, the answer was a quiet confidence — clothes that do not shout but are unmistakably present. The result is a collection defined by impeccable tailoring, unexpected texture combinations, and a color palette drawn from the Tuscan landscape at dawn.",
      "The process from sketch to sample involves at least five fittings. A toile is created first — a muslin version that allows the team to adjust the silhouette without wasting precious fabric. Once the fit is perfected, the final garment is cut from the chosen material by hand. \"Machine cutting is efficient,\" Marco admits, \"but it lacks the intuition of a human hand that can feel the fabric's give and adjust in real time.\"",
      "Each sample is photographed, discussed, and often sent back for refinement. Of the eighty original sketches for this season, only thirty-two made it to production. As Marco says: \"Editing is the most important part of design. It is not about what you add — it is about what you have the courage to leave out.\""
    ]
  }
]

function LuxeBoutique() {
  const [quickView, setQuickView] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)
  const [bagMessage, setBagMessage] = useState("")
  const [mobileNav, setMobileNav] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [article, setArticle] = useState(null)
  const [shopAllOpen, setShopAllOpen] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState([])
  const [checkoutStep, setCheckoutStep] = useState(null)
  const [authModal, setAuthModal] = useState(null)
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [authSuccess, setAuthSuccess] = useState(false)

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleWishlist = (name) => {
    setWishlist(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const handleAddToBag = () => {
    if (!selectedSize) { setBagMessage("Please select a size"); setTimeout(() => setBagMessage(""), 2000); return }
    const key = `${quickView.name}-${selectedSize}`
    setCart(prev => {
      const existing = prev.find(item => item.key === key)
      if (existing) return prev.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      return [...prev, { name: quickView.name, size: selectedSize, price: quickView.price, img: quickView.img, key, quantity: 1 }]
    })
    setBagMessage(`Added "${quickView.name}" (${selectedSize}) to bag`)
    setTimeout(() => { setBagMessage(""); setQuickView(null); setSelectedSize(null) }, 1500)
  }

  const removeFromCart = (key) => setCart(prev => prev.filter(item => item.key !== key))
  const updateQuantity = (key, delta) => setCart(prev => prev.map(item => item.key === key ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  const cartTotal = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[$,]/g, "")) * item.quantity, 0)

  const handleCheckout = () => {
    setCheckoutStep("review")
    setShowCart(false)
  }

  const closeQuickView = () => {
    setQuickView(null); setSelectedSize(null); setBagMessage("")
  }

  const handleAuth = (e) => {
    e.preventDefault()
    if (authEmail && authPassword && authPassword.length >= 6) {
      setAuthSuccess(true)
      setTimeout(() => { setAuthSuccess(false); setAuthModal(null); setAuthEmail(""); setAuthPassword("") }, 3000)
    }
  }

  const allProducts = [...products, ...newArrivals]

  const wishlistItems = allProducts.filter(p => wishlist.includes(p.name))

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur border text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="text-xl font-semibold tracking-wide">LUXE BOUTIQUE</button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <button onClick={() => scrollTo("new-arrivals")} className="hover:text-zinc-900">New Arrivals</button>
            <button onClick={() => scrollTo("featured")} className="hover:text-zinc-900">Clothing</button>
            <button onClick={() => scrollTo("accessories")} className="hover:text-zinc-900">Accessories</button>
            <button onClick={() => scrollTo("journal")} className="hover:text-zinc-900">Collections</button>
          </nav>
          <div className="flex items-center gap-2">
            <div className={`flex items-center transition-all duration-300 ${searchOpen ? "w-48" : "w-0"} overflow-hidden`}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") setSearchOpen(false) }}
                className="w-full px-3 py-1.5 text-sm border rounded-full focus:outline-none focus:border-zinc-900"
              />
            </div>
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-zinc-100 rounded-full">
              <Search className="w-5 h-5 text-zinc-600" />
            </button>
            <button onClick={() => setShowCart(!showCart)} className="p-2 hover:bg-zinc-100 rounded-full relative">
              <ShoppingBag className={`w-5 h-5 ${cart.length > 0 ? "text-zinc-900" : "text-zinc-600"}`} />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
            <button onClick={() => setShowWishlist(!showWishlist)} className="p-2 hover:bg-zinc-100 rounded-full relative">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "text-red-500" : "text-zinc-600"}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </button>
            <div className="relative">
              <button onClick={() => setShowAccount(!showAccount)} className="p-2 hover:bg-zinc-100 rounded-full">
                <User className="w-5 h-5 text-zinc-600" />
              </button>
              {showAccount && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowAccount(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-2xl shadow-lg p-2 text-sm z-50">
                    <button onClick={() => { setShowAccount(false); setAuthModal("signin") }} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-zinc-50 font-medium">Sign In</button>
                    <button onClick={() => { setShowAccount(false); setAuthModal("create") }} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-zinc-50 font-medium">Create Account</button>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setMobileNav(!mobileNav)} className="p-2 hover:bg-zinc-100 rounded-full md:hidden">
              <Menu className="w-5 h-5 text-zinc-600" />
            </button>
          </div>
        </div>
      </header>

      {mobileNav && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-30 bg-white md:hidden pt-20 px-6">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <button onClick={() => { scrollTo("new-arrivals"); setMobileNav(false) }} className="py-3 border-b text-left">New Arrivals</button>
            <button onClick={() => { scrollTo("featured"); setMobileNav(false) }} className="py-3 border-b text-left">Clothing</button>
            <button onClick={() => { scrollTo("accessories"); setMobileNav(false) }} className="py-3 border-b text-left">Accessories</button>
            <button onClick={() => { scrollTo("journal"); setMobileNav(false) }} className="py-3 border-b text-left">Collections</button>
          </nav>
        </motion.div>
      )}

      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=1000&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-white/70 text-sm tracking-[0.2em] uppercase mb-6">Spring Summer 2026</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">Timeless<br />Elegance</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-md mb-10">Discover our curated collection of luxury essentials, crafted by master artisans from around the world.</motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => scrollTo("new-arrivals")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 font-semibold rounded-full hover:bg-zinc-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" /> Explore New Arrivals
          </motion.button>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section id="new-arrivals" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Just Landed</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">New Arrivals</h2>
            </div>
            <button onClick={() => setShopAllOpen(true)} className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900">View All →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newArrivals.map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setQuickView(p)}
                className="group text-left"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-4 relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-900 text-white text-[11px] font-semibold rounded-full">NEW</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.name) }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(p.name) ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                  </button>
                </div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-zinc-500 text-sm mt-1">{p.price}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured / Clothing ── */}
      <section id="featured" className="py-24 px-6 bg-zinc-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Curated Selection</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">Clothing</h2>
            </div>
            <button onClick={() => setShopAllOpen(true)} className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900">View All →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.filter(p => p.category === "clothing").map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setQuickView(p)}
                className="group text-left"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-4 relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.name) }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(p.name) ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                  </button>
                </div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-zinc-500 text-sm mt-1">{p.price}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accessories ── */}
      <section id="accessories" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Finishing Touches</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">Accessories</h2>
            </div>
            <button onClick={() => setShopAllOpen(true)} className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900">View All →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {accessories.map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setQuickView(p)}
                className="group text-left"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-4 relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.name) }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(p.name) ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                  </button>
                </div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-zinc-500 text-sm mt-1">{p.price}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop All (View All) ── */}
      <AnimatePresence>
        {shopAllOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b z-10">
              <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Shop All</h2>
                <button onClick={() => setShopAllOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.map((p, i) => (
                  <motion.button
                    key={p.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setQuickView(p); setShopAllOpen(false) }}
                    className="group text-left"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-3 relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {newArrivals.includes(p) && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-900 text-white text-[11px] font-semibold rounded-full">NEW</span>
                      )}
                    </div>
                    <h3 className="font-medium text-sm">{p.name}</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">{p.price}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Quick View ── */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={closeQuickView}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <div className="md:w-1/2 aspect-square">
                <img src={quickView.img} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <button onClick={closeQuickView} className="float-right p-1 hover:bg-zinc-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-2xl font-semibold mt-6">{quickView.name}</h3>
                  <p className="text-3xl font-bold mt-2">{quickView.price}</p>
                  <p className="text-zinc-500 mt-4 text-sm leading-relaxed">{quickView.desc}</p>
                  <div className="flex gap-1 mt-6">
                    {["XS", "S", "M", "L", "XL"].map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 text-sm border rounded-full transition-colors ${selectedSize === s ? "bg-zinc-900 text-white border-zinc-900" : "hover:bg-zinc-900 hover:text-white"}`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <button onClick={handleAddToBag} className="w-full mt-8 px-6 py-3 bg-zinc-900 text-white font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                  {bagMessage && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center text-sm mt-2 ${bagMessage.includes("Added") ? "text-emerald-600" : "text-amber-600"}`}>
                      {bagMessage}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Wishlist Panel ── */}
      <AnimatePresence>
        {showWishlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <div className="fixed inset-0 bg-black/30" onClick={() => setShowWishlist(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur border-b z-10 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Wishlist ({wishlist.length})</h2>
                <button onClick={() => setShowWishlist(false)} className="p-1.5 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                    <p className="text-zinc-400 font-medium">Your wishlist is empty</p>
                    <p className="text-zinc-300 text-sm mt-1">Save your favorite pieces here.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {wishlistItems.map(item => (
                      <div key={item.name} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-zinc-50 transition-colors">
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-zinc-500 text-sm mt-0.5">{item.price}</p>
                          <button
                            onClick={() => toggleWishlist(item.name)}
                            className="text-xs text-zinc-400 hover:text-red-500 mt-1.5 flex items-center gap-1"
                          >
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                        <button
                          onClick={() => { setQuickView(allProducts.find(p => p.name === item.name)); setShowWishlist(false) }}
                          className="px-4 py-2 bg-zinc-900 text-white text-xs font-medium rounded-full hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        >
                          Quick View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cart Panel ── */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <div className="fixed inset-0 bg-black/30" onClick={() => setShowCart(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur border-b z-10 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Shopping Bag ({cart.length})</h2>
                <button onClick={() => setShowCart(false)} className="p-1.5 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                    <p className="text-zinc-400 font-medium">Your bag is empty</p>
                    <p className="text-zinc-300 text-sm mt-1">Add pieces you love.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cart.map(item => (
                      <div key={item.key} className="flex gap-4 p-3 rounded-2xl hover:bg-zinc-50 transition-colors">
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-zinc-400 text-xs mt-0.5">Size {item.size}</p>
                          <p className="text-sm font-semibold mt-1">{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.key, -1)} className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.key, 1)} className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.key)} className="p-1 self-start hover:bg-zinc-100 rounded-full">
                          <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t px-6 py-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-semibold">${cartTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4">Shipping & taxes calculated at checkout</p>
                  <button onClick={handleCheckout} className="w-full py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors text-sm">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Checkout Modal ── */}
      <AnimatePresence>
        {checkoutStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => { if (checkoutStep === "done") setCheckoutStep(null) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl"
            >
              {checkoutStep === "review" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <button onClick={() => setCheckoutStep(null)} className="p-1 hover:bg-zinc-100 rounded-full">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 mb-6 max-h-48 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.key} className="flex justify-between text-sm">
                        <span className="text-zinc-600 truncate mr-4">{item.name} <span className="text-zinc-400">(x{item.quantity}, {item.size})</span></span>
                        <span className="font-medium">${(parseInt(item.price.replace(/[$,]/g, "")) * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span className="font-medium">${cartTotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">Shipping</span><span className="font-medium">Free</span></div>
                    <div className="flex justify-between border-t pt-2 text-base"><span className="font-semibold">Total</span><span className="font-bold">${cartTotal.toLocaleString()}</span></div>
                  </div>
                  <button onClick={() => setCheckoutStep("done")} className="w-full mt-6 py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors text-sm">
                    Place Order
                  </button>
                </>
              )}
              {checkoutStep === "done" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Order Placed!</h3>
                  <p className="text-zinc-500 text-sm mb-2">Thank you for your purchase.</p>
                  <p className="text-zinc-400 text-xs">A confirmation will be sent to your email.</p>
                  <button onClick={() => { setCheckoutStep(null); setCart([]); setShowCart(false) }} className="mt-6 px-8 py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors text-sm">
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Auth Modal ── */}
      <AnimatePresence>
        {authModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => { if (!authSuccess) { setAuthModal(null); setAuthEmail(""); setAuthPassword("") } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              {authSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {authModal === "signin" ? "Welcome back!" : "Account created!"}
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    {authModal === "signin" ? "Signed in successfully." : "Your account is ready."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">{authModal === "signin" ? "Sign In" : "Create Account"}</h3>
                    <button onClick={() => { setAuthModal(null); setAuthEmail(""); setAuthPassword("") }} className="p-1 hover:bg-zinc-100 rounded-full">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1.5 block">Password</label>
                      <input
                        type="password"
                        value={authPassword}
                        onChange={e => setAuthPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                        minLength={6}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors text-sm mt-2">
                      {authModal === "signin" ? "Sign In" : "Create Account"}
                    </button>
                    <p className="text-center text-xs text-zinc-400 mt-2">
                      {authModal === "signin" ? (
                        <>No account? <button type="button" onClick={() => setAuthModal("create")} className="text-zinc-900 underline font-medium">Create one</button></>
                      ) : (
                        <>Already registered? <button type="button" onClick={() => setAuthModal("signin")} className="text-zinc-900 underline font-medium">Sign in</button></>
                      )}
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Journal ── */}
      <section id="journal" className="py-24 px-6 bg-zinc-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.2em] text-zinc-400 uppercase">The Journal</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Stories From the Atelier</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {articlesData.map((a, i) => (
              <motion.button
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setArticle(a)}
                className="group text-left"
              >
                <div className="aspect-[3/2] overflow-hidden rounded-2xl mb-4 bg-zinc-200">
                  <img src={a.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-indigo-500 transition-colors">{a.title}</h3>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed line-clamp-2">{a.excerpt}</p>
                <p className="text-zinc-400 text-xs mt-2 flex items-center gap-1">{a.date} · {a.readTime} <span className="inline-block ml-1 text-indigo-500 font-medium">Read more →</span></p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article Modal ── */}
      <AnimatePresence>
        {article && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b z-10">
              <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide">LUXE BOUTIQUE · Journal</span>
                <button onClick={() => setArticle(null)} className="p-2 hover:bg-zinc-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <article className="max-w-4xl mx-auto px-6 py-12">
              <div className="aspect-[2/1] overflow-hidden rounded-3xl mb-10 bg-zinc-100">
                <img src={article.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 text-sm text-zinc-400 mb-6">
                  <span className="font-medium text-zinc-700">{article.author}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">{article.title}</h1>
                {article.content.map((paragraph, i) => {
                  const isQuote = paragraph.startsWith("\"") && paragraph.length > 100
                  if (isQuote && i > 0) {
                    return (
                      <blockquote key={i} className="border-l-4 border-zinc-900 pl-6 my-8 text-xl italic text-zinc-600 leading-relaxed">
                        {paragraph}
                      </blockquote>
                    )
                  }
                  return (
                    <p key={i} className="text-base leading-[1.8] text-zinc-600 mb-6">{paragraph}</p>
                  )
                })}
                <div className="flex gap-2 mt-12 pt-8 border-t">
                  {["Craftsmanship", "Sustainability", "Behind the Scenes"].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
            <div className="border-t py-8 px-6">
              <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-zinc-400">
                <button onClick={() => setArticle(null)} className="font-medium text-zinc-700 hover:text-zinc-900">← Back to Journal</button>
                <span className="text-xs">Share this story</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Newsletter ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Stay Inspired</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Join the Inner Circle</h2>
          <p className="text-zinc-500 mb-8">Be the first to know about new collections, exclusive previews, and atelier stories.</p>
          {subscribed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
              <Check className="w-5 h-5" /> You're subscribed. Welcome to the circle.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                required
              />
              <button type="submit" className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors text-sm whitespace-nowrap">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <span className="font-semibold text-zinc-600">LUXE BOUTIQUE</span>
          <p>Demo storefront &mdash; part of a portfolio showcase</p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 flex items-center gap-1">Instagram <ExternalLink className="w-3 h-3" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 flex items-center gap-1">Twitter <ExternalLink className="w-3 h-3" /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 flex items-center gap-1">Pinterest <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CloudBaseDemo() {
  const [deploying, setDeploying] = useState(false)
  const [deployDone, setDeployDone] = useState(false)
  const [terminalLines, setTerminalLines] = useState([])
  const [yearly, setYearly] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [formEmail, setFormEmail] = useState("")
  const [formPass, setFormPass] = useState("")
  const [signedUp, setSignedUp] = useState(false)

  const plans = [
    { name: "Starter", price: 29, desc: "For small projects and prototypes", features: ["5 projects", "10GB storage", "100K requests/mo", "Community support", "Basic monitoring"], popular: false },
    { name: "Pro", price: 99, desc: "For growing teams and businesses", features: ["50 projects", "100GB storage", "1M requests/mo", "Priority support", "Advanced monitoring", "Team workspaces", "Custom domains"], popular: true },
    { name: "Enterprise", price: 299, desc: "For large-scale deployments", features: ["Unlimited projects", "1TB storage", "Unlimited requests", "24/7 support", "SLA guarantee", "Custom integrations", "Dedicated infra"], popular: false }
  ]

  const deployLines = [
    "> cloudbase deploy --branch main",
    "+ Authenticated as developer",
    "+ Analyzing project structure...",
    "+ Installing dependencies (12 packages)",
    "+ Building application...",
    "+ Running tests (42 passed, 0 failed)",
    "+ Optimizing assets (2.4MB > 640KB)",
    "+ Provisioning containers (4 instances)",
    "+ Configuring CDN edge nodes (12 regions)",
    "+ Setting up SSL certificate",
    "+ Routing DNS > cloudbase.app",
    "",
    "Deployment complete! (23.4s)",
    "  URL: https://project.cloudbase.app",
    "  Status: Healthy (100% uptime)"
  ]

  const runDeploy = async () => {
    setDeploying(true)
    setDeployDone(false)
    setTerminalLines([])
    for (let i = 0; i < deployLines.length; i++) {
      await new Promise(r => setTimeout(r, 300))
      setTerminalLines(prev => [...prev, deployLines[i]])
    }
    setDeploying(false)
    setDeployDone(true)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Back to Portfolio */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-800 text-sm font-medium hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Portfolio
        </Link>
      </div>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-6">
                  Now in Public Beta
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  Deploy faster.<br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Scale infinitely.</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-8 max-w-md">
                  Cloud infrastructure that grows with you. One-click deploys, real-time monitoring, and auto-scaling — all from a single dashboard.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSignupOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity">
                    Start Deploying Free <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollTo("deploy-demo")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    See Live Demo
                  </button>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-2xl shadow-purple-500/5">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-zinc-500">dashboard.cloudbase.app</span>
                </div>
                <div className="p-4 md:p-6 space-y-3 text-xs font-mono">
                  <div className="flex items-center gap-3 text-green-400"><Check className="w-3.5 h-3.5" /><span>Deploy: main → production (23.4s)</span></div>
                  <div className="flex items-center gap-3 text-zinc-400"><Activity className="w-3.5 h-3.5" /><span>CPU: 12.4% ● MEM: 384MB / 1GB ● REQ: 1.2K/min</span></div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden"><div className="w-3/4 h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" /></div>
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {["USA", "EU", "Asia", "AU"].map(r => (
                      <div key={r} className="p-2 rounded-lg bg-zinc-800/50 text-center"><div className="text-zinc-300 font-semibold">{r}</div><div className="text-zinc-500 text-[10px]">12ms</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Developers", value: "12K+" },
            { label: "Deployments Daily", value: "50K+" },
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Countries Served", value: "120+" }
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to ship</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">From deploy to monitor, CloudBase gives your team the tools to build and scale with confidence.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Cloud, title: "One-Click Deploy", desc: "Push your code and we handle the rest. Auto-provisioning, load balancing, and SSL included." },
              { icon: BarChart3, title: "Real-Time Metrics", desc: "Monitor CPU, memory, requests, and errors with live dashboards. Set alerts and get notified." },
              { icon: Users, title: "Team Workspaces", desc: "Invite your team, set permissions, and collaborate on projects in real time." },
              { icon: Zap, title: "Auto Scaling", desc: "Scale from zero to thousands of requests automatically. No config needed." },
              { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant, encrypted at rest and in transit, with role-based access control." },
              { icon: Terminal, title: "CLI & API", desc: "Full-featured CLI and REST API for seamless integration into your workflow." }
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group p-6 rounded-2xl border border-zinc-800 hover:border-purple-500/50 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 flex items-center justify-center mb-4 group-hover:scale-125 group-hover:from-purple-500/60 group-hover:to-pink-500/60 transition-all duration-300">
                  <f.icon className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="font-semibold mb-2 text-white">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEPLOY DEMO */}
      <section id="deploy-demo" className="py-20 md:py-28 px-4 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">Live Demo</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">See it in action</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Click deploy to watch our platform provision, build, and ship your application in seconds.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-zinc-500 font-mono">terminal</span>
                </div>
                <button onClick={runDeploy} disabled={deploying} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${deploying ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"}`}>
                  {deploying ? "Deploying..." : deployDone ? "Deploy Again" : "▶ Deploy"}
                </button>
              </div>
              <div className="p-4 md:p-6 font-mono text-xs leading-relaxed min-h-[260px] bg-zinc-950">
                {terminalLines.length === 0 && !deploying && !deployDone && (
                  <div className="text-zinc-600 italic">Click "Deploy" to simulate a production deployment...</div>
                )}
                {terminalLines.map((line, i) => (
                  <div key={i} className={`${line.startsWith("+") ? "text-green-400" : line.startsWith(">") ? "text-zinc-400" : line.includes("Deployment complete") ? "text-purple-300" : "text-zinc-300"}`}>
                    {line}
                  </div>
                ))}
                {deploying && <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse ml-1" />}
                {deployDone && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-400 font-semibold text-xs"><Check className="w-4 h-4" /> Deployment active at <span className="underline cursor-pointer text-purple-300">https://project.cloudbase.app</span></div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400 mb-6">Start free. Upgrade when you scale.</p>
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-zinc-900 border border-zinc-800">
              <button onClick={() => setYearly(false)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}>Monthly</button>
              <button onClick={() => setYearly(true)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${yearly ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}>Yearly <span className="text-[10px] text-green-400 ml-0.5">-20%</span></button>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative p-6 rounded-2xl border ${plan.popular ? "border-purple-500 bg-purple-500/5 ring-1 ring-purple-500" : "border-zinc-800 bg-zinc-900/50"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-semibold whitespace-nowrap">Most Popular</div>}
                <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">${yearly ? Math.round(plan.price * 0.8 * 12) : plan.price}</span>
                  <span className="text-zinc-500 text-sm ml-1">/{yearly ? "yr" : "mo"}</span>
                  {yearly && <div className="text-xs text-green-400 mt-0.5">${plan.price}/mo billed annually</div>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <button onClick={() => setSignupOpen(true)} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.popular ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" : "border border-zinc-700 hover:bg-zinc-800"}`}>Get Started</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 px-4 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by developers</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Join thousands of teams who ship faster with CloudBase.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Sarah Chen", role: "CTO, Flowly", text: "CloudBase cut our deployment time from hours to seconds. The auto-scaling alone saved us thousands in infrastructure costs." },
              { name: "Marcus Rivera", role: "Founder, DevStudio", text: "We migrated our entire stack in a weekend. The CLI and API are best-in-class. Highly recommended." },
              { name: "Priya Patel", role: "Lead Engineer, Stackly", text: "The monitoring and alerting are exceptional. We caught a production issue before any users even noticed." }
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to ship faster?</h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Join 12,000+ developers. Deploy your first project in under a minute — no credit card required.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setSignupOpen(true)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity">
                Start Free Trial <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo("deploy-demo")} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-zinc-700 text-sm font-semibold hover:bg-zinc-800 transition-colors">
                Watch Demo <Play className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">C</div>
                <span className="font-semibold">CloudBase</span>
              </div>
              <p className="text-sm text-zinc-500">Cloud infrastructure for modern teams.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Documentation"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}><button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-sm text-zinc-600">2026 CloudBase. Demo project.</p>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"><GitBranch className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"><MessageCircle className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </footer>

      {/* SIGNUP MODAL */}
      <AnimatePresence>
        {signupOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSignupOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              {signedUp ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6 text-green-400" /></div>
                  <h3 className="text-lg font-semibold mb-2">Account created!</h3>
                  <p className="text-sm text-zinc-400 mb-4">Welcome to CloudBase. Check your email for verification.</p>
                  <button onClick={() => setSignupOpen(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors">Close</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Create your account</h3>
                    <button onClick={() => setSignupOpen(false)} className="p-1 rounded-lg hover:bg-zinc-800 transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Email</label>
                      <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="you@company.com" className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Password</label>
                      <input type="password" value={formPass} onChange={e => setFormPass(e.target.value)} placeholder="minimum 8 characters" className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                  </div>
                  <button onClick={() => setSignedUp(true)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity mb-3">Create Account</button>
                  <p className="text-xs text-zinc-600 text-center">No credit card required. Free tier includes 5 projects.</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DemoPage() {
  const { slug } = useParams()

  if (slug === "luxe-boutique") return <LuxeBoutique />
  if (slug === "cloudbase") return <CloudBaseDemo />
  if (slug === "greenleaf") return <GreenLeafDemo />
  if (slug === "artspace") return <ArtSpaceDemo />
  if (slug === "fittrack") return <FitTrackDemo />
  if (slug === "medilink") return <MediLinkDemo />

  if (slug === "biz-lawyer") return <BizLawyerPage />
  if (slug === "biz-autorepair") return <BizAutoRepairPage />
  if (slug === "biz-contractor") return <BizContractorPage />
  if (slug === "biz-realtor") return <BizRealtorPage />
  if (slug === "biz-barber") return <BizBarberPage />
  if (slug === "biz-salon") return <BizSalonPage />
  if (slug === "biz-bakery") return <BizBakeryPage />
  if (slug === "biz-landscaper") return <BizLandscaperPage />

  const demos = [
    {
      slug: "cloudbase",
      title: "CloudBase",
      category: "SaaS Platform",
      color: "#ec4899",
      tagline: "Deploy faster. Scale infinitely.",
      about: "A developer platform that simplifies cloud infrastructure with one-click deploys, real-time monitoring, and team collaboration.",
      features: ["One-Click Deploy", "Real-Time Metrics", "Team Workspaces", "Auto Scaling"]
    }
  ]

  const demo = demos.find(d => d.slug === slug)

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to portfolio</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border text-sm font-medium hover:bg-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
      <div className="h-1 w-full" style={{ backgroundColor: demo.color }} />
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: demo.color }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)` }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur mb-6">{demo.category}</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{demo.title}</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">{demo.tagline}</p>
          <a href={`https://${demo.slug}.example.com`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ color: demo.color }}>Visit Live Site <ExternalLink className="w-4 h-4" /></a>
        </div>
      </div>
      <div className="h-1 w-full" style={{ backgroundColor: demo.color }} />
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About This Project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{demo.about}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {demo.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: demo.color }} />
                <span className="font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-1 w-full" style={{ backgroundColor: demo.color }} />
      <footer className="py-8 text-center text-sm text-muted-foreground">
        Demo project for {demo.title} &mdash; part of a portfolio showcase
      </footer>
    </div>
  )
}
