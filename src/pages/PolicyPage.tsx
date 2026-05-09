import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { loadPolicyRoles, loadCareer, type PolicyRole } from "@/lib/contentLoader";

const policyRoles = loadPolicyRoles();
const { editorialService } = loadCareer();

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const categories = ["Government", "Research Institute", "Academic"] as const;
const categoryLabels: Record<string, { en: string; ja: string }> = {
  Government: { en: "Government Advisory", ja: "政府委員" },
  "Research Institute": { en: "Research Institutes", ja: "研究機関" },
  Academic: { en: "Academic Service", ja: "学術活動" },
};

const PolicyContent = () => {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6 max-w-3xl">
        <Link
          to="/#career"
          className="text-sm text-accent hover:underline mb-6 inline-block"
        >
          {t("← Career", "← 経歴")}
        </Link>
        <motion.h1
          {...fadeInUp}
          className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3"
        >
          {t("Policy & Advisory Roles", "政策・外部活動")}
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-muted-foreground font-body text-sm mb-12"
        >
          {t(
            "Government committees, research institute affiliations, and academic editorial service.",
            "政府委員会、研究機関での活動、学術誌の編集活動。"
          )}
        </motion.p>

        <div className="space-y-12">
          {categories.map((cat) => {
            const roles = policyRoles.filter((r) => r.category === cat);
            if (roles.length === 0) return null;
            const label = categoryLabels[cat];
            return (
              <motion.div key={cat} {...fadeInUp}>
                <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  {lang === "en" ? label.en : label.ja}
                </h2>
                <div className="space-y-3">
                  {roles.map((role, i) => (
                    <RoleCard key={i} role={role} lang={lang} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          <motion.div {...fadeInUp}>
            <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              {t("Editorial Service", "学会・編集活動")}
            </h2>
            <div className="space-y-3">
              {editorialService.map((item, i) => (
                <div key={i} className="bg-card rounded p-4 border border-border">
                  <p className="font-body font-semibold text-sm text-foreground">{item.role}</p>
                  <p className="text-xs italic text-muted-foreground font-body">{item.journal}</p>
                  <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const RoleCard = ({ role, lang }: { role: PolicyRole; lang: string }) => (
  <div className="bg-card rounded p-4 border border-border">
    <p className="font-body font-semibold text-sm text-foreground">
      {lang === "en" ? role.orgEn : role.orgJa}
    </p>
    <p className="text-xs text-foreground/80 font-body">
      {lang === "en" ? role.roleEn : role.roleJa}
    </p>
    <p className="text-xs text-muted-foreground font-body mt-0.5">
      {lang === "en" ? role.detailEn : role.detailJa}
    </p>
  </div>
);

const PolicyPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <PolicyContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default PolicyPage;
