import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { researchAgendaSections } from "@/data/researchAgenda";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ResearchAgendaContent = () => {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6 max-w-3xl">
        <Link
          to="/#research"
          className="text-sm text-accent hover:underline mb-6 inline-block"
        >
          {t("← Research", "← 研究")}
        </Link>
        <motion.h1
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3"
        >
          {t("Research Agenda", "研究アジェンダ")}
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body text-sm mb-12"
        >
          {t(
            "An overview of the intellectual motivations, theoretical foundations, empirical methods, and policy relevance of my research program.",
            "研究プログラムの知的動機、理論的基盤、実証手法、政策的関連性の概要。"
          )}
        </motion.p>

        <div className="space-y-12">
          {researchAgendaSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h2 className="text-lg font-display font-bold text-foreground mb-3 border-l-2 border-accent pl-4">
                {lang === "en" ? section.titleEn : section.titleJa}
              </h2>
              <p className="text-sm font-body text-muted-foreground leading-relaxed pl-4">
                {lang === "en" ? section.bodyEn : section.bodyJa}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

const ResearchAgendaPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <ResearchAgendaContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default ResearchAgendaPage;
