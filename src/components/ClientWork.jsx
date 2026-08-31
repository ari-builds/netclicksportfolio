import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { realWork } from "../svc/RealWork"
import { LivePreview } from "./LivePreview"
import { SectionTitle } from "./motion/SectionTitle"
import { Reveal } from "./motion/Reveal"
import { CameraPass } from "./motion/CameraPass"

export default function ClientWork() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionTitle
            label="Client work"
            title="Sites built for real businesses"
            sub="Live previews of websites we've shipped. No mockups — this is what's actually running."
          />
          <Reveal>
            <Link
              to="/websites-apps"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              See all client work <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {realWork.slice(0, 4).map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.06}>
              <CameraPass>
                <LivePreview
                  url={work.url}
                  name={work.name}
                  badgeColor={work.color}
                  category={work.category}
                  height={i % 2 === 0 ? 520 : 448}
                />
              </CameraPass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
