import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Sparkles, Cpu } from "lucide-react"
import { Link } from "react-router-dom"
import lawyerConfig from "../biz/biz-lawyer/config"
import autoRepairConfig from "../biz/biz-autorepair/config"
import contractorConfig from "../biz/biz-contractor/config"
import realtorConfig from "../biz/biz-realtor/config"
import barberConfig from "../biz/biz-barber/config"
import salonConfig from "../biz/biz-salon/config"
import bakeryConfig from "../biz/biz-bakery/config"
import landscaperConfig from "../biz/biz-landscaper/config"
import { services } from "../svc/ServiceConfig"

const proServices = [lawyerConfig, autoRepairConfig, contractorConfig, realtorConfig]
const lifestyle = [barberConfig, salonConfig, bakeryConfig, landscaperConfig]

const iconMap = {
  palette: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  code: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  shoppingCart: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  search: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  monitor: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  zap: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  target: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  send: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  bot: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  share2: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>,
  phone: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  gitBranch: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  fileText: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  barChart3: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  wrench: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-7.5 7.5a2.25 2.25 0 01-3.18-3.18l7.5-7.5m3.18 3.18l7.5-7.5a2.25 2.25 0 00-3.18-3.18l-7.5 7.5" /></svg>,
  smartphone: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
  plug: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>,
}

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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 mb-6 mt-16">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7c3aed" }}>
              <Cpu className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">Services</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((svc, i) => {
              const iconSvg = iconMap[svc.iconName]
              return (
                <motion.div key={svc.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <Link to={`/demo/${svc.slug}`}
                    className="group block rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all duration-300">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded flex items-center justify-center text-white" style={{ backgroundColor: svc.color }}>
                          {iconSvg}
                        </div>
                        <h3 className="font-semibold text-sm text-stone-900">{svc.title}</h3>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{svc.tagline}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium" style={{ color: svc.color }}>
                        View Demo <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <p className="text-[10px] text-stone-400">Each demo includes hero, services, gallery, testimonials, contact — fully interactive.</p>
        </motion.div>
      </div>
    </section>
  )
}
