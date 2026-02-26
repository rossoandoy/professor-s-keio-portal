import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const selectedPublications = [
  { authors: "Okazaki, T., Okubo, T. and Strobl, E.", year: 2025, title: "Large Fires and the Rise of Fire Insurance in Early Twentieth Century Japan", journal: "Journal of Economic History", detail: "85(3), 701–729" },
  { authors: "Okazaki, T, Okubo, T and Strobl, E.", year: 2024, title: "The Bright and Dark Sides of a Central Bank's Financial Support to Local Banks after a Natural Disaster", journal: "Journal of Money, Credit, and Banking", detail: "56(6), 1439–1477" },
  { authors: "Forslid, R and Okubo, T", year: 2023, title: "Trade, Location, and Multi-product Firms", journal: "Regional Science and Urban Economics", detail: "100, 103891" },
  { authors: "Hoffmann, M and T. Okubo", year: 2022, title: "By a Silken Thread: Regional Banking Integration and Credit Reallocation during Japan's Lost Decade", journal: "Journal of International Economics", detail: "137, 103579" },
  { authors: "Okubo, T, T. Okazaki and E. Tomiura", year: 2022, title: "Industrial Cluster Policy and Transaction Networks: Evidence from Firm-level Data in Japan", journal: "Canadian Journal of Economics", detail: "55(4), 1990–2035" },
  { authors: "Okazaki, T. Okubo, T and Strobl, E", year: 2019, title: "Creative Destruction of Industries: Yokohama City in the Great Kanto Earthquake, 1923", journal: "Journal of Economic History", detail: "79(1), 1–31 (Lead article)" },
  { authors: "Forslid, R., Okubo, T., and Ulltveit-Moe K-H", year: 2018, title: "Why Are Firms That Export Cleaner? International Trade, Abatement and Environmental Emissions", journal: "Journal of Environmental Economics and Management", detail: "91, 166–183" },
  { authors: "Kato, H and Okubo, T", year: 2018, title: "Market Size in Globalization", journal: "Journal of International Economics", detail: "111, 34–60" },
  { authors: "Okubo, T. Picard, P.M and Thisse, J-F", year: 2010, title: "The Spatial Selection of Heterogeneous Firms", journal: "Journal of International Economics", detail: "82(2), 230–237" },
  { authors: "Baldwin, R.E., and Okubo, T.", year: 2006, title: "Heterogeneous Firms, Agglomeration and Economic Geography: Spatial Selection and Sorting", journal: "Journal of Economic Geography", detail: "6, 323–346" },
];

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
          className="text-muted-foreground font-body text-sm mb-10"
        >
          {t("70+ papers published in peer-reviewed international journals", "査読付き国際学術誌に70本以上の論文を発表")}
        </motion.p>

        <div className="space-y-4">
          {selectedPublications.map((pub, i) => (
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
              <p className="text-xs font-body">
                <span className="italic text-foreground/70">{pub.journal}</span>
                {pub.detail && <span className="text-muted-foreground">, {pub.detail}</span>}
              </p>
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
