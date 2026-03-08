import { Link, useLocation } from "react-router-dom";
import { Home, Search, AlertTriangle, BookOpen, BarChart3, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/saka-viongozi", label: "Directory", icon: Search },
    { path: "/report", label: "Report", icon: AlertTriangle, center: true },
    { path: "/directory", label: "Yellow Book", icon: BookOpen },
    { path: "/mimi", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      {/* Desktop Top Nav — Dark charcoal bar */}
      <header className="hidden md:block bg-yb-charcoal-dark sticky top-0 z-50 shadow-md">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-heading font-bold text-white leading-tight">SEMA</span>
              <span className="text-[9px] text-primary font-semibold uppercase tracking-wider leading-none">
                Citizen Yellow Book
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {[
              { path: "/", label: "Home" },
              { path: "/saka-viongozi", label: "Directory" },
              { path: "/directory", label: "Yellow Book" },
              { path: "/ramani", label: "Map" },
              { path: "/sauti", label: "Petitions" },
              { path: "/report", label: "Report" },
              { path: "/tracker", label: "Tracker" },
              { path: "/mimi", label: "Profile" },
            ].map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "text-primary border-t-2 border-primary"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer — desktop only */}
      <footer className="hidden md:block bg-yb-charcoal-dark py-6">
        <div className="container text-center text-white/40 text-sm">
          <p className="font-heading font-bold text-primary mb-1">SEMA</p>
          <p>Tanzania's Citizen Yellow Book — Every public servant. Every agency. Verified.</p>
        </div>
      </footer>

      {/* Bottom Navigation — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-yb-charcoal-dark border-t-0 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-end justify-around px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const isCenter = item.center;

            if (isCenter) {
              return (
                <Link key={item.path} to={item.path} className="flex flex-col items-center -mt-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    active ? "bg-primary warm-glow scale-110" : "bg-primary hover:scale-105 warm-glow-sm"
                  }`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 ${active ? "text-primary" : "text-yb-charcoal-muted"}`}>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center py-1.5 min-w-[56px] transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active ? "text-primary" : "text-yb-charcoal-muted hover:text-white"
                }`}>
                  <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} />
                </div>
                <span className={`text-[10px] font-semibold mt-0.5 ${active ? "text-primary" : "text-yb-charcoal-muted"}`}>{item.label}</span>
                {active && <div className="w-4 h-0.5 bg-primary rounded-full mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
