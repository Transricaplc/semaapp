import { Link, useLocation } from "react-router-dom";
import { Home, AlertTriangle, Map, Megaphone, User, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t, toggleLang, lang } = useLanguage();

  const navItems = [
    { path: "/", label: t("nav.home"), icon: Home },
    { path: "/ramani", label: t("nav.map"), icon: Map },
    { path: "/report", label: t("nav.report"), icon: AlertTriangle, center: true },
    { path: "/sauti", label: t("nav.petitions"), icon: Megaphone },
    { path: "/mimi", label: t("nav.profile"), icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      {/* Desktop Top Bar */}
      <header className="hidden md:block bg-sema-earth sticky top-0 z-50 shadow-md">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sema-red flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-heading font-bold text-primary-foreground leading-tight">Sema</span>
              <span className="text-[9px] text-primary-foreground/50 leading-none">
                {lang === "sw" ? "Sauti ya Mwananchi" : "The Citizen's Voice"}
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {[
              { path: "/", label: t("nav.home") },
              { path: "/saka-viongozi", label: t("nav.directory") },
              { path: "/ramani", label: t("nav.map") },
              { path: "/sauti", label: t("nav.petitions") },
              { path: "/report", label: t("nav.report") },
              { path: "/directory", label: t("nav.yellowBook") },
              { path: "/tracker", label: t("nav.tracker") },
              { path: "/mimi", label: t("nav.profile") },
            ].map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-sema-red/20 text-sema-yellow"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {t("lang.toggle")}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer - desktop only */}
      <footer className="hidden md:block bg-sema-earth py-6 kitenge-top">
        <div className="container text-center text-primary-foreground/50 text-sm">
          <p className="font-heading font-semibold text-primary-foreground/70 mb-1">{t("footer.brand")}</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="kitenge-top" />
        <div className="flex items-end justify-around px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const isCenter = item.center;

            if (isCenter) {
              return (
                <Link key={item.path} to={item.path} className="flex flex-col items-center -mt-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    active ? "bg-sema-red warm-glow scale-110" : "bg-sema-red hover:scale-105 warm-glow-sm"
                  }`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 ${active ? "text-sema-red" : "text-muted-foreground"}`}>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center py-1.5 min-w-[56px] transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active ? "bg-sema-red/10 text-sema-red scale-110" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} />
                </div>
                <span className={`text-[10px] font-semibold mt-0.5 ${active ? "text-sema-red" : "text-muted-foreground"}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
