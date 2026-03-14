import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { topics, topicIdToSlug } from "@/data/publicationsByTopic";

const SitemapContent = () => {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {t("Site map", "サイトマップ")}
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-8">
          {t("Overview of all pages and sections.", "全ページ・セクションの一覧です。")}
        </p>

        <nav aria-label={t("Site map", "サイトマップ")} className="space-y-6">
          <div>
            <h2 className="text-sm font-body font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Home
            </h2>
            <ul className="space-y-1.5 font-body text-sm">
              <li>
                <Link to="/" className="text-accent hover:underline">
                  {t("Home", "ホーム")}
                </Link>
              </li>
              <li>
                <Link to="/#research" className="text-accent hover:underline">
                  {t("Research", "研究")}
                </Link>
              </li>
              <li>
                <Link to="/#publications" className="text-accent hover:underline">
                  {t("Selected Publications", "主要業績")}
                </Link>
              </li>
              <li>
                <Link to="/#career" className="text-accent hover:underline">
                  {t("Career", "経歴")}
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-accent hover:underline">
                  {t("Contact", "連絡先")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-body font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {t("Publications", "業績")}
            </h2>
            <ul className="space-y-1.5 font-body text-sm">
              <li>
                <Link to="/#publications" className="text-accent hover:underline">
                  {t("Selected", "代表作")}
                </Link>
              </li>
              <li>
                <Link to="/by-topic" className="text-accent hover:underline">
                  {t("By topic", "トピック別")}
                </Link>
              </li>
              <li className="text-muted-foreground">
                {t("Publication detail", "論文詳細")} (/publications/:slug)
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-body font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {t("Research themes", "研究テーマ別")}
            </h2>
            <ul className="space-y-1.5 font-body text-sm">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    to={`/research/${topicIdToSlug[topic.id]}`}
                    className="text-accent hover:underline"
                  >
                    {lang === "ja" ? topic.nameJa : topic.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-body font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {t("Contact", "連絡先")}
            </h2>
            <ul className="space-y-1.5 font-body text-sm">
              <li>
                <Link to="/#contact" className="text-accent hover:underline">
                  {t("Contact", "連絡先")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </main>
  );
};

const SitemapPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <SitemapContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default SitemapPage;
