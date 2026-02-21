import { motion } from "framer-motion";

const selectedPublications = [
  {
    authors: "Okazaki, T., Okubo, T. and Strobl, E.",
    year: 2025,
    title: "Large Fires and the Rise of Fire Insurance in Early Twentieth Century Japan",
    journal: "Journal of Economic History",
    detail: "85(3), 701–729",
  },
  {
    authors: "Okazaki, T, Okubo, T and Strobl, E.",
    year: 2024,
    title: "The Bright and Dark Sides of a Central Bank's Financial Support to Local Banks after a Natural Disaster",
    journal: "Journal of Money, Credit, and Banking",
    detail: "56(6), 1439–1477",
  },
  {
    authors: "Forslid, R and Okubo, T",
    year: 2023,
    title: "Trade, Location, and Multi-product Firms",
    journal: "Regional Science and Urban Economics",
    detail: "100, 103891",
  },
  {
    authors: "Hoffmann, M and T. Okubo",
    year: 2022,
    title: "By a Silken Thread: Regional Banking Integration and Credit Reallocation during Japan's Lost Decade",
    journal: "Journal of International Economics",
    detail: "137, 103579",
  },
  {
    authors: "Okubo, T, T. Okazaki and E. Tomiura",
    year: 2022,
    title: "Industrial Cluster Policy and Transaction Networks: Evidence from Firm-level Data in Japan",
    journal: "Canadian Journal of Economics",
    detail: "55(4), 1990–2035",
  },
  {
    authors: "Okazaki, T. Okubo, T and Strobl, E",
    year: 2019,
    title: "Creative Destruction of Industries: Yokohama City in the Great Kanto Earthquake, 1923",
    journal: "Journal of Economic History",
    detail: "79(1), 1–31 (Lead article)",
  },
  {
    authors: "Forslid, R., Okubo, T., and Ulltveit-Moe K-H",
    year: 2018,
    title: "Why Are Firms That Export Cleaner? International Trade, Abatement and Environmental Emissions",
    journal: "Journal of Environmental Economics and Management",
    detail: "91, 166–183",
  },
  {
    authors: "Kato, H and Okubo, T",
    year: 2018,
    title: "Market Size in Globalization",
    journal: "Journal of International Economics",
    detail: "111, 34–60",
  },
  {
    authors: "Okubo, T. Picard, P.M and Thisse, J-F",
    year: 2010,
    title: "The Spatial Selection of Heterogeneous Firms",
    journal: "Journal of International Economics",
    detail: "82(2), 230–237",
  },
  {
    authors: "Baldwin, R.E., and Okubo, T.",
    year: 2006,
    title: "Heterogeneous Firms, Agglomeration and Economic Geography: Spatial Selection and Sorting",
    journal: "Journal of Economic Geography",
    detail: "6, 323–346",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
        >
          Selected Publications
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body mb-12"
        >
          70+ papers published in peer-reviewed international journals
        </motion.p>

        <div className="space-y-6">
          {selectedPublications.map((pub, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group border-l-2 border-border hover:border-accent pl-5 py-3 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xs font-body font-semibold text-accent shrink-0">
                  {pub.year}
                </span>
                <h3 className="text-base font-display font-semibold text-foreground leading-snug">
                  {pub.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                {pub.authors}
              </p>
              <p className="text-sm font-body">
                <span className="italic text-foreground/80">{pub.journal}</span>
                <span className="text-muted-foreground">, {pub.detail}</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
