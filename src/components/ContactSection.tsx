import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10"
        >
          {t("Contact", "連絡先")}
        </motion.h2>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl space-y-3"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-body text-sm text-foreground">
                {t("Faculty of Economics, Keio University", "慶應義塾大学 経済学部")}
              </p>
              <p className="text-xs text-muted-foreground font-body">
                {t("2-15-45 Mita, Minato-ku, Tokyo 108-8345, Japan", "〒108-8345 東京都港区三田2-15-45")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-accent shrink-0" />
            <a href="mailto:okubo@econ.keio.ac.jp" className="font-body text-sm text-foreground hover:text-accent transition-colors">
              okubo@econ.keio.ac.jp
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <span className="font-body text-sm text-foreground">+81-3-5418-6589</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <ExternalLink className="w-4 h-4 text-accent shrink-0" />
            <div className="flex gap-4">
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                Google Scholar
              </a>
              <a href="https://www.scopus.com" target="_blank" rel="noopener noreferrer" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                Scopus
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
