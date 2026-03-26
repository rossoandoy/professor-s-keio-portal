import { useState } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  topics,
  getPublicationsForTopic,
  publicationCategories,
  getCategory,
  type TopicId,
  type PublicationByTopic,
  type PublicationCategory,
} from "@/data/publicationsByTopic";
import { scholarSearchUrl } from "@/utils/scholar";
import { boldOkubo } from "@/utils/formatAuthors";

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
      <span className="text-xs font-body font-semibold text-accent shrink-0 flex items-center gap-1">
        {pub.year}
        {pub.top_journal && <><Star aria-hidden="true" className="w-3 h-3 fill-accent text-accent" /><span className="sr-only">Top journal</span></>}
      </span>
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
    <p className="text-xs text-muted-foreground font-body">{boldOkubo(pub.authors)}</p>
    <p className="text-xs font-body">
      <span className="italic text-foreground/70">{pub.journal}</span>
      {pub.detail && <span className="text-muted-foreground">, {pub.detail}</span>}
    </p>
    {pub.contribution_summary && (
      <p className="text-xs font-body text-muted-foreground/80 mt-0.5 italic">
        {pub.contribution_summary}
      </p>
    )}
    {(pub.doi || pub.scholar_url || pub.pdf_url || pub.preprint_url || pub.title) && (
      <p className="text-xs font-body mt-1 flex flex-wrap gap-3">
        {pub.doi && (
          <a href={doiLink(pub.doi)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" aria-label="DOI">
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
  </article>
);

const categoryLabels: Record<PublicationCategory, { en: string; ja: string }> = {
  Refereed: { en: "Journal Articles", ja: "査読付き論文" },
  Books: { en: "Books & Chapters", ja: "著書・分担執筆" },
  Policy: { en: "Policy Papers", ja: "政策論文" },
  Japanese: { en: "Japanese Publications", ja: "日本語業績" },
};

const ByTopicContent = () => {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PublicationCategory | "all">("all");

  const q = searchQuery.trim().toLowerCase();
  const topicMatches = (topic: (typeof topics)[0]) =>
    (lang === "en" ? topic.nameEn : topic.nameJa).toLowerCase().includes(q);
  const catMatches = (p: PublicationByTopic) =>
    categoryFilter === "all" || getCategory(p) === categoryFilter;
  const pubMatches = (p: PublicationByTopic) =>
    catMatches(p) &&
    [p.title, p.authors, p.journal, p.contribution_summary ?? ""].join(" ").toLowerCase().includes(q);

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
          className="text-muted-foreground font-body text-sm mb-6"
        >
          {t(
            "Publications organized by research topic. Use the category filter to narrow by type. Papers spanning multiple topics are listed under each.",
            "研究トピック別の業績一覧。カテゴリフィルタで種別を絞り込めます。複数トピックにまたがる論文は各トピックに掲載。"
          )}
        </motion.p>

        <motion.div {...fadeInUp} className="mb-6">
          <label htmlFor="by-topic-search" className="sr-only">
            {t("Search by topic, title, author, or journal", "トピック・タイトル・著者・誌名で検索")}
          </label>
          <input
            id="by-topic-search"
            type="search"
            placeholder={t("Search by topic, title, author, journal...", "トピック・タイトル・著者・誌名で検索...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </motion.div>

        <motion.div {...fadeInUp} className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter("all")}
            aria-pressed={categoryFilter === "all"}
            className={`px-3 py-1.5 rounded text-xs font-body border transition-colors ${
              categoryFilter === "all"
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-secondary text-secondary-foreground border-border hover:border-accent"
            }`}
          >
            {t("All", "すべて")}
          </button>
          {publicationCategories.map((cat) => {
            const label = categoryLabels[cat];
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                aria-pressed={categoryFilter === cat}
                className={`px-3 py-1.5 rounded text-xs font-body border transition-colors ${
                  categoryFilter === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-secondary text-secondary-foreground border-border hover:border-accent"
                }`}
              >
                {lang === "en" ? label.en : label.ja}
              </button>
            );
          })}
        </motion.div>

        <motion.nav
          {...fadeInUp}
          aria-label={t("Topic list", "トピック一覧")}
          className="mb-12 scroll-mt-24"
        >
          <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            {t("Topics", "トピック")}
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-4">
            {t("Jump to a topic below.", "下のトピックをクリックして該当セクションへ移動。")}
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {topics
              .filter((topic) => {
                const pubs = getPublicationsForTopic(topic.id as TopicId).filter(catMatches);
                if (pubs.length === 0) return false;
                if (!q) return true;
                return topicMatches(topic) || pubs.some(pubMatches);
              })
              .map((topic) => {
                const name = lang === "en" ? topic.nameEn : topic.nameJa;
                return (
                  <a
                    key={topic.id}
                    href={`#topic-${topic.id}`}
                    className="px-4 py-3 rounded-lg text-sm font-body font-medium bg-card text-foreground border-2 border-border hover:border-accent hover:text-accent shadow-sm transition-colors"
                  >
                    {name}
                  </a>
                );
              })}
          </div>
        </motion.nav>

        <div className="space-y-14">
          {topics.map((topic, topicIndex) => {
            const allPubs = getPublicationsForTopic(topic.id as TopicId);
            const filteredPubs = allPubs.filter(catMatches);
            const publications =
              !q ? filteredPubs : topicMatches(topic) ? filteredPubs : filteredPubs.filter(pubMatches);
            const topicVisible =
              filteredPubs.length > 0 && (!q || topicMatches(topic) || filteredPubs.some(pubMatches));
            if (!topicVisible) return null;

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
                  className="text-xl font-display font-bold text-foreground border-b border-border pb-2 scroll-mt-24"
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
