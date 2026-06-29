import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import lawyerConfig from "../biz/biz-lawyer/config"
import autoRepairConfig from "../biz/biz-autorepair/config"
import contractorConfig from "../biz/biz-contractor/config"
import realtorConfig from "../biz/biz-realtor/config"
import barberConfig from "../biz/biz-barber/config"
import salonConfig from "../biz/biz-salon/config"
import bakeryConfig from "../biz/biz-bakery/config"
import landscaperConfig from "../biz/biz-landscaper/config"

const proServices = [lawyerConfig, autoRepairConfig, contractorConfig, realtorConfig]
const lifestyle = [barberConfig, salonConfig, bakeryConfig, landscaperConfig]

export default function SmallBizSection() {
  const ref = useRef(null)

  const categories = [
    { label: "Professional Services", key: "pro" },
    { label: "Lifestyle & Hospitality", key: "lifestyle" },
  ]

  return (
    <section ref={ref} className="py-24 px-4 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">For Local Businesses</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 mt-2">Small Business Websites</h2>
          <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto">Premium landing pages built for local service businesses — each with full interactivity and modern design.</p>
        </motion.div>

        {categories.map((cat) => {
          const items = cat.key === "pro" ? proServices : lifestyle
          return (
            <div key={cat.key} className="mb-16 last:mb-0">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: cat.key === "pro" ? "#1e40af" : "#b91c1c" }}>
                  {cat.key === "pro" ? <Briefcase className="w-2.5 h-2.5 text-white" /> : <Sparkles className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">{cat.label}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((biz, i) => (
                  <motion.div key={biz.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <Link to={`/demo/${biz.slug}`}
                      className="group block rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all duration-300">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img src={biz.hero} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: biz.colors.primary }}>
                            {biz.name[0]}
                          </div>
                          <h3 className="font-semibold text-sm text-stone-900">{biz.name}</h3>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{biz.tagline}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium" style={{ color: biz.colors.primary }}>
                          View Demo <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <p className="text-[10px] text-stone-400">Each demo includes hero, services, gallery, testimonials, contact — fully interactive.</p>
        </motion.div>
      </div>
    </section>
  )
}
