import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-foreground/50 font-body text-xs tracking-widest uppercase mb-3"
          >
            {t("Keio University · Faculty of Economics", "慶應義塾大学 経済学部")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary-foreground leading-tight mb-1"
          >
            {lang === "en" ? "Toshihiro Okubo" : "大久保 敏弘"}
          </motion.h1>

          {lang === "en" && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg font-body text-primary-foreground/50 mb-1"
            >
              大久保 敏弘
            </motion.p>
          )}

          {lang === "ja" && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg font-body text-primary-foreground/50 mb-1"
            >
              Toshihiro Okubo
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-body text-primary-foreground/60 mb-4"
          >
            {t("Professor of Economics", "経済学部 教授")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm font-body text-primary-foreground/70 leading-relaxed mb-6 max-w-2xl"
          >
            {t(
              "My research bridges spatial economics and globalization, examining how firms, trade, and geography interact under shocks — natural disasters, pandemics, and digitalization.",
              "空間経済学とグローバル化の接点で、企業・貿易・地理が自然災害・パンデミック・デジタル化といったショック下でどう相互作用するかを研究しています。"
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 text-sm text-primary-foreground/60"
          >
            <a href="mailto:okubo@econ.keio.ac.jp" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> okubo@econ.keio.ac.jp
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {t("Mita, Minato-ku, Tokyo", "東京都港区三田")}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
