import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { loadNavigation } from "@/lib/contentLoader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = loadNavigation();

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-14">
        <Link to="/" className="font-display font-bold text-lg text-foreground">
          {t("T. Okubo", "大久保 敏弘")}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.children.length > 0 ? (
              <DropdownMenu key={item.labelEn}>
                <DropdownMenuTrigger className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5 rounded-sm outline-none data-[state=open]:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                  {lang === "en" ? item.labelEn : item.labelJa}
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.to} asChild>
                      <Link to={child.to} className="cursor-pointer">
                        {lang === "en" ? child.labelEn : child.labelJa}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {lang === "en" ? item.labelEn : item.labelJa}
              </Link>
            )
          )}
          <button
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2.5 py-1"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "日本語" : "English"}
          </button>
        </div>

        {/* Mobile toggle */}
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
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background"
        >
          {navItems.map((item) =>
            item.children.length > 0 ? (
              <div key={item.labelEn} className="border-b border-border">
                <div className="px-6 py-2 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">
                  {lang === "en" ? item.labelEn : item.labelJa}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-2.5 pl-8 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {lang === "en" ? child.labelEn : child.labelJa}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-b border-border"
              >
                {lang === "en" ? item.labelEn : item.labelJa}
              </Link>
            )
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
