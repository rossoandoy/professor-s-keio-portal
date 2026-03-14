import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  topics,
  getPublicationsForTopic,
  type TopicId,
  type PublicationByTopic,
} from "@/data/publicationsByTopic";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function doiLink(doi: string): string {
  if (!doi) return "";
  if (doi.startsWith("http")) return doi;
  return `https://doi.org/${doi.replace(/^https:\/\/doi\.org\/?/i, "")}`;
}

const PublicationItem = ({ pub }: { pub: PublicationByTopic }) => (
  <article className="border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors">
    <div className="flex items-baseline gap-2 mb-0.5">
      <span className="text-xs font-body font-semibold text-accent shrink-0">{pub.year}</span>
      {pub.slug ? (
        <h3 className="text-sm font-display font-semibold text-foreground leading-snug">
          <Link to={`/publications/${pub.slug}`} className="text-foreground hover:text-accent hover:underline">
            {pub.title}
          </Link>
        </h3>
      ) : (
        <h3 className="text-sm font-display font-semibold text-foreground leading-snug">{pub.title}</h3>
      )}
    </div>
    <p className="text-xs text-muted-foreground font-body">{pub.authors}</p>
    <p className="text-xs font-body">
      <span className="italic text-foreground/70">{pub.journal}</span>
      {pub.detail && <span className="text-muted-foreground">, {pub.detail}</span>}
    </p>
    {(pub.doi || pub.scholar_url || pub.pdf_url || pub.preprint_url) && (
      <p className="text-xs font-body mt-1 flex flex-wrap gap-3">
        {pub.doi && (
          <a href={doiLink(pub.doi)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" aria-label="DOI">
            DOI
          </a>
        )}
        {pub.scholar_url && (
          <a href={pub.scholar_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" aria-label="Google Scholar">
            Google Scholar
          </a>
        )}
        {pub.pdf_url && (
          <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" aria-label="PDF">
            PDF
          </a>
        )}
        {pub.preprint_url && (
          <a href={pub.preprint_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" aria-label="Preprint">
            Preprint
          </a>
        )}
      </p>
    )}
  </article>
);

const ByTopicContent = () => {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6">
        <motion.h1
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2"
        >
          {t("Publication by topic", "トピック別業績一覧")}
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body text-sm mb-12"
        >
          {t(
            "Papers in refereed academic journals. Papers spanning multiple topics are listed under each relevant topic.",
            "査読付き学術誌論文。複数トピックにまたがる論文は該当する各トピックに掲載しています。"
          )}
        </motion.p>

        <div className="space-y-14">
          {topics.map((topic, topicIndex) => {
            const publications = getPublicationsForTopic(topic.id as TopicId);
            if (publications.length === 0) return null;

            const name = lang === "en" ? topic.nameEn : topic.nameJa;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: topicIndex * 0.05 }}
                className="space-y-6"
              >
                <h2
                  id={`topic-${topic.id}`}
                  className="text-xl font-display font-bold text-foreground border-b border-border pb-2"
                >
                  {name}
                </h2>

                {/* Group by subtopic if present */}
                {publications.some((p) => p.subtopic) ? (
                  (() => {
                    const bySub: Record<string, PublicationByTopic[]> = {};
                    publications.forEach((p) => {
                      const key = p.subtopic || "";
                      if (!bySub[key]) bySub[key] = [];
                      bySub[key].push(p);
                    });
                    const keys = Object.keys(bySub).filter(Boolean).sort();
                    const noSub = bySub[""] || [];
                    return (
                      <div className="space-y-8">
                        {keys.map((subLabel) => (
                          <div key={subLabel}>
                            <h3 className="text-sm font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                              {subLabel}
                            </h3>
                            <div className="space-y-4">
                              {(bySub[subLabel] || []).map((pub, i) => (
                                <PublicationItem key={`${pub.year}-${pub.title.slice(0, 20)}-${i}`} pub={pub} />
                              ))}
                            </div>
                          </div>
                        ))}
                        {noSub.length > 0 && (
                          <div className="space-y-4">
                            {noSub.map((pub, i) => (
                              <PublicationItem key={`${pub.year}-${pub.title.slice(0, 20)}-${i}`} pub={pub} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="space-y-4">
                    {publications.map((pub, i) => (
                      <PublicationItem key={`${pub.year}-${pub.title.slice(0, 20)}-${i}`} pub={pub} />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

const ByTopicPage = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <ByTopicContent />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default ByTopicPage;
