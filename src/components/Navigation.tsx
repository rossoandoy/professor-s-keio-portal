import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const mainNavItems = [
    { label: t("Research", "研究"), to: "/#research" },
    { label: t("Career", "経歴"), to: "/#career" },
    { label: t("Contact", "連絡先"), to: "/#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-14">
        <Link to="/" className="font-display font-bold text-lg text-foreground">
          {t("T. Okubo", "大久保 敏弘")}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/#research"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("Research", "研究")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5 outline-none data-[state=open]:text-foreground">
              {t("Publications", "業績")}
              <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="/#publications" className="cursor-pointer">
                  {t("Selected", "代表作")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/by-topic" className="cursor-pointer">
                  {t("By topic", "トピック別")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {mainNavItems.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2.5 py-1"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "日本語" : "English"}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="text-xs font-body text-muted-foreground border border-border rounded px-2 py-1"
          >
            {lang === "en" ? "JP" : "EN"}
          </button>
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border">
            <div className="px-6 py-2 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">
              {t("Publications", "業績")}
            </div>
            <Link
              to="/#publications"
              onClick={() => setOpen(false)}
              className="block px-6 py-2.5 pl-8 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("Selected", "代表作")}
            </Link>
            <Link
              to="/by-topic"
              onClick={() => setOpen(false)}
              className="block px-6 py-2.5 pl-8 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t("By topic", "トピック別")}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
