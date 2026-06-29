import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    title: "Luxe Boutique",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    color: "#6366f1",
    href: "/demo/luxe-boutique"
  },
  {
    title: "CloudBase",
    category: "SaaS Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    color: "#ec4899",
    href: "/demo/cloudbase"
  },
  {
    title: "GreenLeaf",
    category: "Brand & Web",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    color: "#10b981",
    href: "/demo/greenleaf"
  },
  {
    title: "ArtSpace",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    color: "#f59e0b",
    href: "/demo/artspace"
  },
  {
    title: "FitTrack",
    category: "Mobile Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    color: "#3b82f6",
    href: "/demo/fittrack"
  },
  {
    title: "MediLink",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    color: "#e11d48",
    href: "/demo/medilink"
  }
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border bg-card cursor-pointer transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link to={project.href} className="block">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white" style={{ transform: "translateZ(30px)" }}>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{ backgroundColor: project.color }}
            >
              {project.category}
            </span>
            <h3 className="text-xl font-bold">{project.title}</h3>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export function Portfolio3D() {
  const [projIdx, setProjIdx] = useState(0);
  const projTexts = ["Projects", "Work", "Showcase"];

  useEffect(() => {
    const t = setInterval(() => setProjIdx((p) => (p + 1) % projTexts.length), 3000);
    return () => clearInterval(t);
  }, []);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={sectionRef} id="work" className="w-full py-20 lg:py-40 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"
        style={{ scale: bgScale, opacity: bgOpacity }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Work</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Featured{" "}
            <span className="text-primary relative inline-block align-baseline">
              <span className="invisible whitespace-nowrap">{projTexts.reduce((a, b) => a.length > b.length ? a : b)}</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={projIdx}
                  className="absolute left-0 top-0 whitespace-nowrap"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  {projTexts[projIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Each project is crafted with attention to every detail
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
