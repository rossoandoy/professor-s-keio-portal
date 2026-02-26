import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-6 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs font-body opacity-50">
          © {new Date().getFullYear()} Toshihiro Okubo · {t("Keio University, Faculty of Economics", "慶應義塾大学 経済学部")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
