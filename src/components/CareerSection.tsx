import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  careerEn,
  careerJa,
  educationJa,
  editorialService,
  governmentCommittees,
  visitingPositions,
} from "@/data/cvContent";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CareerSection = () => {
  const { lang, t } = useLanguage();
  const career = lang === "en" ? careerEn : careerJa;

  return (
    <section id="career" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10"
        >
          {t("Career", "経歴")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Positions */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-5">
              {t("Academic Positions", "職歴")}
            </h3>
            <div className="space-y-4">
              {career.map((item, i) => (
                <div key={i} className="relative pl-4 border-l border-border">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent -translate-x-[4px]" />
                  <p className="font-body font-semibold text-sm text-foreground">{item.position}</p>
                  <p className="text-xs text-muted-foreground font-body">{item.institution}</p>
                  <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education (JA only) or Editorial (EN) */}
          {lang === "ja" ? (
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                学歴
              </h3>
              <div className="space-y-4">
                {educationJa.map((item, i) => (
                  <div key={i} className="relative pl-4 border-l border-border">
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary -translate-x-[4px]" />
                    <p className="font-body font-semibold text-sm text-foreground">{item.degree}</p>
                    <p className="text-xs text-muted-foreground font-body">{item.institution}</p>
                    {item.note && <p className="text-xs text-muted-foreground/70 font-body italic">{item.note}</p>}
                    <p className="text-xs text-accent font-body font-medium">{item.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                Editorial Service
              </h3>
              <div className="space-y-3">
                {editorialService.map((item, i) => (
                  <div key={i} className="bg-card rounded p-3 border border-border">
                    <p className="font-body font-semibold text-sm text-foreground">{item.role}</p>
                    <p className="text-xs italic text-muted-foreground font-body">{item.journal}</p>
                    <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4 mt-8">
                Selected Visiting Positions
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {visitingPositions.map((pos) => (
                  <span key={pos} className="px-2.5 py-1 text-xs font-body rounded bg-secondary text-secondary-foreground border border-border">
                    {pos}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* JA-only extras */}
        {lang === "ja" && (
          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                学会・編集活動
              </h3>
              <div className="space-y-3">
                {editorialService.map((item, i) => (
                  <div key={i} className="bg-card rounded p-3 border border-border">
                    <p className="font-body font-semibold text-sm text-foreground">{item.role}</p>
                    <p className="text-xs italic text-muted-foreground font-body">{item.journal}</p>
                    <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.4 }}>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                政府委員・外部活動
              </h3>
              <div className="space-y-3">
                {governmentCommittees.map((item, i) => (
                  <div key={i} className="bg-card rounded p-3 border border-border">
                    <p className="font-body font-semibold text-sm text-foreground">{item.role} — {item.org}</p>
                    <p className="text-xs text-muted-foreground font-body">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerSection;
