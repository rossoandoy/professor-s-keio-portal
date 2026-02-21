import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12"
        >
          Contact
        </motion.h2>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl space-y-4"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-body text-foreground">Faculty of Economics, Keio University</p>
              <p className="text-sm text-muted-foreground font-body">2-15-45 Mita, Minato-ku, Tokyo 108-8345, Japan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <a href="mailto:okubo@econ.keio.ac.jp" className="font-body text-foreground hover:text-accent transition-colors">
              okubo@econ.keio.ac.jp
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-accent shrink-0" />
            <span className="font-body text-foreground">+81-3-5418-6589</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <ExternalLink className="w-5 h-5 text-accent shrink-0" />
            <div className="flex gap-4">
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Google Scholar
              </a>
              <a
                href="https://www.scopus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
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
