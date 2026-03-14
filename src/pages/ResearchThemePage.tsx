import { Link, useParams } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTopicBySlug, getPublicationsForTopic } from "@/data/publicationsByTopic";

function doiLink(doi: string): string {
  if (!doi) return "";
  if (doi.startsWith("http")) return doi;
  return `https://doi.org/${doi.replace(/^https:\/\/doi\.org\/?/i, "")}`;
}

const ResearchThemeContent = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const { lang, t } = useLanguage();
  const topic = topicSlug ? getTopicBySlug(topicSlug) : undefined;

  if (!topic) {
    return (
      <main className="min-h-screen bg-background">
        <section className="py-16 container mx-auto px-6">
          <p className="text-muted-foreground">{t("Theme not found.", "テーマが見つかりません。")}</p>
          <Link to="/" className="text-accent hover:underline mt-4 inline-block">
            {t("Back to home", "ホームへ")}
          </Link>
        </section>
      </main>
    );
  }

  const publications = getPublicationsForTopic(topic.id);
  const name = lang === "ja" ? topic.nameJa : topic.nameEn;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6">
        <Link to="/#research" className="text-sm text-accent hover:underline mb-6 inline-block">
          ← {t("Research", "研究")}
        </Link>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">{name}</h1>
        <p className="text-muted-foreground font-body text-sm mb-8">
          {t("Selected publications in this research theme.", "この研究テーマに含まれる論文一覧です。")}
        </p>

        <div className="mb-8">
          <Link to="/by-topic" className="text-accent hover:underline font-body text-sm">
            {t("View all by topic →", "トピック別一覧を見る →")}
          </Link>
        </div>

        <div className="space-y-4">
          {publications.map((pub) => (
            <article
              key={pub.slug ?? `${pub.year}-${pub.title.slice(0, 30)}`}
              className="border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors"
            >
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-xs font-body font-semibold text-accent shrink-0">{pub.year}</span>
                {pub.slug ? (
                  <h2 className="text-sm font-display font-semibold text-foreground leading-snug">
                    <Link to={`/publications/${pub.slug}`} className="text-foreground hover:text-accent hover:underline">
                      {pub.title}
                    </Link>
                  </h2>
                ) : (
                  <h2 className="text-sm font-display font-semibold text-foreground leading-snug">{pub.title}</h2>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-body">{pub.authors}</p>
              <p className="text-xs font-body">
                <span className="italic text-foreground/70">{pub.journal}</span>
                {pub.detail && <span className="text-muted-foreground">, {pub.detail}</span>}
              </p>
              {(pub.doi || pub.scholar_url) && (
                <p className="text-xs font-body mt-1 flex flex-wrap gap-3">
                  {pub.doi && (
                    <a href={doiLink(pub.doi)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      DOI
                    </a>
                  )}
                  {pub.scholar_url && (
                    <a href={pub.scholar_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Google Scholar
                    </a>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

const ResearchThemePage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <ResearchThemeContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default ResearchThemePage;
