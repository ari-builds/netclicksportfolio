import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

const links = [
  { href: "#work", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const contactItems = [
  { icon: Mail, text: "hello@agency.com" },
  { icon: Phone, text: "(555) 123-4567" },
  { icon: MapPin, text: "San Francisco, CA" },
];

export function Footer() {
  return (
    <footer id="contact" className="w-full border-t">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-4">Agency</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We design and build modern web experiences that help businesses grow.
            </p>
          </motion.div>
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Web Design", "Development", "E-Commerce", "SEO"].map((s) => (
                <li key={s} className="hover:text-foreground transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="relative inline-block hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full">{l.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {contactItems.map((c, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <c.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span className="group-hover:text-foreground transition-colors">{c.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          &copy; {new Date().getFullYear()} Agency. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
