import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const researchFieldsEn = [
  "International Trade",
  "Trade Policy",
  "Foreign Direct Investment",
  "New Economic Geography",
  "Environmental Economics",
  "Regional Science",
  "Telework & Digitalization",
];

const researchFieldsJa = [
  "国際貿易",
  "通商政策",
  "海外直接投資",
  "新経済地理学",
  "環境経済学",
  "地域科学",
  "テレワーク・デジタル化",
  "経済史",
  "自然災害と経済",
];

const researchTopicsEn = [
  "International trade, FDI and geography",
  "Firm heterogeneity, international trade and new economic geography",
  "Public policy and trade (regional policy, subsidy, corporate tax)",
  "Natural disasters and firm behaviours",
  "Telework, Digitalization (AI and Robot) and Globalization",
];

const researchTopicsJa = [
  "国際貿易、海外直接投資と地理",
  "企業の異質性、国際貿易と新経済地理学",
  "公共政策と貿易（地域政策、補助金、法人税）",
  "日本の企業レベルデータを用いた貿易・FDI・企業立地分析",
  "自然災害と企業行動",
  "テレワーク、デジタル化（AI・ロボット）とグローバル化",
  "日本の経済史と地域経済（1910年代〜1930年代）",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ResearchSection = () => {
  const { lang, t } = useLanguage();
  const fields = lang === "en" ? researchFieldsEn : researchFieldsJa;
  const topics = lang === "en" ? researchTopicsEn : researchTopicsJa;

  return (
    <section id="research" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10"
        >
          {t("Research", "研究")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              {t("Fields", "研究分野")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {fields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1.5 rounded text-sm font-body bg-secondary text-secondary-foreground border border-border"
                >
                  {field}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              {t("Current Topics", "研究テーマ")}
            </h3>
            <ul className="space-y-2">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2 text-muted-foreground font-body text-sm leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
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
