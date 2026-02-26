import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const careerEn = [
  { position: "Professor", period: "2015 – Present", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2011 – 2015", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2008 – 2011", institution: "RIEB, Kobe University" },
  { position: "Research Associate", period: "2006 – 2008", institution: "IPEG, University of Manchester" },
];

const careerJa = [
  { position: "教授", period: "2015年 – 現在", institution: "慶應義塾大学 経済学部" },
  { position: "准教授", period: "2011 – 2015年", institution: "慶應義塾大学 経済学部" },
  { position: "准教授", period: "2008 – 2011年", institution: "神戸大学 経済経営研究所" },
  { position: "研究員", period: "2006 – 2008年", institution: "マンチェスター大学 IPEG" },
  { position: "博士研究員", period: "2005 – 2006年", institution: "ジュネーヴ高等国際問題研究所" },
];

const educationJa = [
  { degree: "博士（国際関係学・経済学）", year: "2005年", institution: "ジュネーヴ高等国際問題研究所・ジュネーヴ大学", note: "指導教員: Richard E. Baldwin 教授" },
  { degree: "修士（経済学）", year: "2003年", institution: "ミシガン大学" },
  { degree: "修士（経済学）", year: "2000年", institution: "一橋大学" },
  { degree: "学士（経済学）", year: "1999年", institution: "一橋大学" },
];

const editorialService = [
  { role: "Associate Editor", journal: "Journal of Regional Science", period: "2010 – Present" },
  { role: "Editorial Board", journal: "Review of Urban and Regional Development Studies", period: "2017 – 2019" },
];

const visitingPositions = [
  "Stockholm University (2023)",
  "University of Zurich (2023, 2014, 2010–)",
  "University of Birmingham (2022)",
  "Kyoto University (2019–2020)",
  "University of Tokyo / CREPE (2020–)",
  "Oxford University (2010)",
  "CORE, UCLouvain (2011, 2009)",
];

const governmentCommittees = [
  { role: "委員", org: "内閣府 経済社会総合研究所", detail: "テレワークに関する研究会" },
  { role: "委員", org: "総務省", detail: "テレワーク推進に関する検討会" },
  { role: "委員", org: "経済産業省", detail: "通商白書執筆協力" },
];

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
