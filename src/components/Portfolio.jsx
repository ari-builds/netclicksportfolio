import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Luxe Boutique",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "A premium shopping experience with custom animations"
  },
  {
    title: "CloudBase",
    category: "SaaS Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Analytics dashboard with real-time data visualization"
  },
  {
    title: "GreenLeaf",
    category: "Brand & Web",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    description: "Sustainable brand identity and marketing site"
  },
  {
    title: "FitTrack",
    category: "Mobile Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Progressive web app for fitness tracking"
  },
  {
    title: "ArtSpace",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    description: "Interactive gallery for a contemporary artist"
  },
  {
    title: "Foodie",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Online ordering and reservation platform"
  }
];

export function Portfolio() {
  return (
    <section id="work" className="w-full py-20 lg:py-40 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Recent projects we're proud of
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold mt-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
