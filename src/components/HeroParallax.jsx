import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const products = [
  { title: "Luxe Boutique", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { title: "CloudBase", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { title: "GreenLeaf", thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop" },
  { title: "ArtSpace", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
  { title: "FitTrack", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { title: "NeonStack", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { title: "Bloom Beauty", thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop" },
  { title: "CodeForge", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
  { title: "Pulse Health", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { title: "Vertex Labs", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { title: "Stellar", thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop" },
  { title: "Apex Studio", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
];

export function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.3], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.3], [-700, 500]), springConfig);

  const [recentIdx, setRecentIdx] = useState(0);
  const recentTexts = ["Projects", "Portfolio", "Showcase"];

  useEffect(() => {
    const t = setInterval(() => setRecentIdx((p) => (p + 1) % recentTexts.length), 3000);
    return () => clearInterval(t);
  }, []);

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const thirdRow = products.slice(8, 12);

  return (
    <div ref={ref} className="h-[200vh] py-20 overflow-hidden relative [perspective:1000px] [transform-style:preserve-3d]">
      <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-4 w-full left-0 top-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold"
        >
          Recent{" "}
          <span className="text-primary relative inline-block align-baseline">
            <span className="invisible whitespace-nowrap">{recentTexts.reduce((a, b) => a.length > b.length ? a : b)}</span>
            <AnimatePresence initial={false}>
              <motion.span
                key={recentIdx}
                className="absolute left-0 top-0 whitespace-nowrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                {recentTexts[recentIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-base md:text-xl mt-8 text-muted-foreground"
        >
          A showcase of our latest work across e-commerce, SaaS, and brand identity.
        </motion.p>
      </div>
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProductCard({ product, translate }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-80 w-[25rem] relative flex-shrink-0 rounded-2xl overflow-hidden"
    >
      <img
        src={product.thumbnail}
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={product.title}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/60 pointer-events-none transition-opacity" />
      <h3 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xl font-bold transition-opacity">
        {product.title}
      </h3>
    </motion.div>
  );
}
