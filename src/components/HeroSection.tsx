import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { loadHero } from "@/lib/contentLoader";

const hero = loadHero();

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
            {t(hero.affiliationEn, hero.affiliationJa)}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary-foreground leading-tight mb-1"
          >
            {lang === "en" ? hero.nameEn : hero.nameJa}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg font-body text-primary-foreground/50 mb-1"
          >
            {lang === "en" ? hero.nameJa : hero.nameEn}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-body text-primary-foreground/60 mb-4"
          >
            {t(hero.titleEn, hero.titleJa)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm font-body text-primary-foreground/70 leading-relaxed mb-6 max-w-2xl"
          >
            {t(hero.statementEn, hero.statementJa)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 text-sm text-primary-foreground/60"
          >
            <a href={`mailto:${hero.email}`} className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> {hero.email}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {t(hero.locationEn, hero.locationJa)}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
