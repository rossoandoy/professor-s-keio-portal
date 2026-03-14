import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSelectedPublications } from "@/data/publicationsByTopic";
import { scholarSearchUrl } from "@/utils/scholar";

const jaPublications = [
  { authors: "大久保敏弘", year: 2024, title: "テレワークの経済学", journal: "日本経済新聞出版", detail: "" },
  { authors: "大久保敏弘", year: 2022, title: "日本のテレワーク調査からの知見", journal: "NIRA総合研究開発機構", detail: "ワーキングペーパー" },
];

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

const PublicationsSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="publications" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3"
        >
          {t("Selected Publications", "主要業績")}
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body text-sm mb-3"
        >
          {t("70+ papers published in peer-reviewed international journals", "査読付き国際学術誌に70本以上の論文を発表")}
        </motion.p>
        <motion.p
          {...fadeInUp}
          className="text-foreground font-body text-sm mb-4"
        >
          {t("View by topic or search all publications.", "トピック別に見る、または全論文を検索できます。")}
        </motion.p>
        <motion.div
          {...fadeInUp}
          className="flex flex-wrap gap-3 mb-10"
        >
          <Link
            to="/by-topic"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-body font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity border border-accent"
          >
            {t("By topic", "トピック別で見る")}
          </Link>
          <Link
            to="/cv"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-body font-medium bg-secondary text-secondary-foreground border border-border hover:border-accent hover:text-accent transition-colors"
          >
            {t("Search all (CV)", "全論文を検索")}
          </Link>
        </motion.div>

        <div className="space-y-4">
          {getSelectedPublications().map((pub, i) => (
            <motion.article
              key={pub.slug ?? i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors"
            >
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
              {(pub.doi || pub.scholar_url || pub.pdf_url || pub.preprint_url || pub.title) && (
                <p className="text-xs font-body mt-1 flex flex-wrap gap-3">
                  {pub.doi && (
                    <a
                      href={doiLink(pub.doi)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                      aria-label="DOI"
                    >
                      DOI
                    </a>
                  )}
                  <a
                    href={pub.scholar_url || scholarSearchUrl(pub.title, pub.authors)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                    aria-label="Google Scholar"
                  >
                    Google Scholar
                  </a>
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
            </motion.article>
          ))}
        </div>

        {lang === "ja" && (
          <div className="mt-12">
            <motion.h3
              {...fadeInUp}
              className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-6"
            >
              日本語著作・メディア
            </motion.h3>
            <div className="space-y-4">
              {jaPublications.map((pub, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors"
                >
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xs font-body font-semibold text-accent shrink-0">{pub.year}</span>
                    <h3 className="text-sm font-display font-semibold text-foreground leading-snug">{pub.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">{pub.authors}</p>
                  <p className="text-xs font-body italic text-foreground/70">{pub.journal}</p>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
