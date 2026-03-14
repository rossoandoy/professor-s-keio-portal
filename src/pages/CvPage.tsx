import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getAllPublications,
  topics,
  type PublicationByTopic,
  type TopicId,
} from "@/data/publicationsByTopic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function doiLink(doi: string): string {
  if (!doi) return "";
  if (doi.startsWith("http")) return doi;
  return `https://doi.org/${doi.replace(/^https:\/\/doi\.org\/?/i, "")}`;
}

const CvContent = () => {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [journalFilter, setJournalFilter] = useState<string>("all");

  const allPubs = useMemo(() => getAllPublications(), []);
  const years = useMemo(() => {
    const set = new Set(allPubs.map((p) => p.year));
    return [...set].sort((a, b) => b - a);
  }, [allPubs]);
  const journals = useMemo(() => {
    const set = new Set(allPubs.map((p) => p.journal).filter(Boolean));
    return [...set].sort();
  }, [allPubs]);

  const filtered = useMemo(() => {
    let list = allPubs;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          (p.journal && p.journal.toLowerCase().includes(q))
      );
    }
    if (yearFilter !== "all") {
      const y = parseInt(yearFilter, 10);
      list = list.filter((p) => p.year === y);
    }
    if (topicFilter !== "all") {
      list = list.filter((p) => p.topicIds.includes(topicFilter as TopicId));
    }
    if (journalFilter !== "all") {
      list = list.filter((p) => p.journal === journalFilter);
    }
    return [...list].sort((a, b) => b.year - a.year);
  }, [allPubs, searchQuery, yearFilter, topicFilter, journalFilter]);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {t("CV", "CV")}
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-8">
          {t("Curriculum vitae and searchable publication list.", "履歴書と検索可能な論文一覧です。")}
        </p>

        <div className="mb-10">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent hover:underline font-body text-sm"
          >
            {t("Download CV (PDF)", "CV をダウンロード (PDF)")}
          </a>
        </div>

        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          {t("Publications", "論文一覧")}
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
          <Input
            placeholder={t("Search by title, authors, journal...", "タイトル・著者・誌名で検索...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs font-body text-sm"
          />
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[180px] font-body text-sm">
              <SelectValue placeholder={t("Year", "年度")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-body">{t("All years", "全年度")}</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)} className="font-body">
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-[220px] font-body text-sm">
              <SelectValue placeholder={t("Topic", "トピック")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-body">{t("All topics", "全トピック")}</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id} className="font-body">
                  {lang === "ja" ? topic.nameJa : topic.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={journalFilter} onValueChange={setJournalFilter}>
            <SelectTrigger className="w-[240px] font-body text-sm">
              <SelectValue placeholder={t("Journal", "ジャーナル")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-body">{t("All journals", "全ジャーナル")}</SelectItem>
              {journals.slice(0, 80).map((j) => (
                <SelectItem key={j} value={j} className="font-body text-xs">
                  {j.length > 50 ? j.slice(0, 47) + "…" : j}
                </SelectItem>
              ))}
              {journals.length > 80 && (
                <SelectItem value="all" className="font-body text-muted-foreground">
                  + {journals.length - 80} more
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground font-body mb-4">
          {filtered.length} {t("publications", "件")}
        </p>

        <div className="space-y-3">
          {filtered.map((pub) => (
            <article
              key={pub.slug ?? `${pub.year}-${pub.title.slice(0, 30)}`}
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
              {(pub.doi || pub.scholar_url || pub.pdf_url || pub.preprint_url) && (
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
                  {pub.pdf_url && (
                    <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      PDF
                    </a>
                  )}
                  {pub.preprint_url && (
                    <a href={pub.preprint_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Preprint
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

const CvPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <CvContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default CvPage;
