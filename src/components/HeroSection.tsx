import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-2xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-foreground/60 font-body text-sm tracking-widest uppercase mb-4"
          >
            Keio University · Faculty of Economics
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-2"
          >
            Toshihiro Okubo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl md:text-3xl font-display font-medium text-primary-foreground/70 mb-2"
          >
            大久保 敏弘
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-display italic text-primary-foreground/60 mb-8"
          >
            Professor of Economics
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 text-sm text-primary-foreground/70"
          >
            <a href="mailto:okubo@econ.keio.ac.jp" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> okubo@econ.keio.ac.jp
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Mita, Minato-ku, Tokyo
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +81-3-5418-6589
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
