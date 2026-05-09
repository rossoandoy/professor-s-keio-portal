import { motion } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { loadNews } from "@/lib/contentLoader";

const getAllNews = loadNews;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const NewsContent = () => {
  const { lang, t } = useLanguage();
  const news = getAllNews();

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6 max-w-3xl">
        <motion.h1
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3"
        >
          {t("News", "お知らせ")}
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body text-sm mb-10"
        >
          {t("Latest updates and announcements.", "最新の更新情報・お知らせ。")}
        </motion.p>

        {news.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm">
            {t("No news yet.", "お知らせはまだありません。")}
          </p>
        ) : (
          <div className="space-y-6">
            {news.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors"
              >
                <time dateTime={item.date} className="text-xs font-body font-semibold text-accent">
                  {new Date(item.date + "T00:00:00").toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <h2 className="text-sm font-display font-semibold text-foreground mt-0.5">
                  {lang === "en" ? item.titleEn : item.titleJa}
                </h2>
                <p className="text-xs font-body text-muted-foreground mt-1 leading-relaxed">
                  {lang === "en" ? item.bodyEn : item.bodyJa}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-body rounded bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

const NewsPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <NewsContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default NewsPage;
