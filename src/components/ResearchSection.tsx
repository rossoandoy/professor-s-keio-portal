import { motion } from "framer-motion";

const researchFields = [
  "International Trade",
  "Trade Policy",
  "Foreign Direct Investment",
  "New Economic Geography",
  "Environmental Economics",
  "Regional Science",
  "Telework & Digitalization",
];

const researchTopics = [
  "International trade, FDI and geography",
  "Firm heterogeneity, international trade and new economic geography",
  "Public policy and trade (regional policy, subsidy, corporate tax)",
  "Trade, FDI and firm location using Japanese firm-level analysis",
  "Natural disasters and firm behaviours",
  "Telework, Digitalization (AI and Robot) and Globalization",
  "Economic History and Regional Economies in Japan (1910s–1930s)",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12"
        >
          Research
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-lg font-body font-semibold text-foreground mb-4 tracking-wide uppercase text-sm">
              Fields
            </h3>
            <div className="flex flex-wrap gap-2">
              {researchFields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1.5 rounded-full text-sm font-body bg-secondary text-secondary-foreground border border-border"
                >
                  {field}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-lg font-body font-semibold text-foreground mb-4 tracking-wide uppercase text-sm">
              Topics
            </h3>
            <ul className="space-y-2">
              {researchTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2 text-muted-foreground font-body text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
