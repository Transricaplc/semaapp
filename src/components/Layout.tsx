import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Building, AlertTriangle, Info, Search } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const mobileNav = [
    { path: "/", label: "Home", icon: Home },
    { path: "/saka-viongozi", label: "Directory", icon: BookOpen },
    { path: "/directory", label: "Agencies", icon: Building },
    { path: "/report", label: "Issues", icon: AlertTriangle, center: true },
    { path: "/mimi", label: "About", icon: Info },
  ];

  const desktopNav = [
    { path: "/", label: "Home" },
    { path: "/saka-viongozi", label: "Directory" },
    { path: "/directory", label: "Yellow Book" },
    { path: "/ramani", label: "Map" },
    { path: "/sauti", label: "Petitions" },
    { path: "/report", label: "Report" },
    { path: "/tracker", label: "Tracker" },
    { path: "/mimi", label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-[80px] md:pb-0">
      {/* ── Desktop / Tablet Top Nav ── */}
      <header className="hidden md:block bg-yb-charcoal-dark sticky top-0 z-50 shadow-md">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-heading font-extrabold text-primary-foreground">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-heading font-extrabold text-white leading-tight tracking-tight">SEMA</span>
              <span className="text-[9px] text-primary font-heading font-bold uppercase tracking-wider leading-none">
                Citizen Yellow Book
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {desktopNav.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-body text-sm font-medium transition-all ${
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

          <Link to="/saka-viongozi" className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* ── Mobile Sticky Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-yb-charcoal-dark shadow-md">
        <div className="flex items-center justify-between px-4 h-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-heading font-extrabold text-primary-foreground">S</span>
            </div>
            <span className="font-heading font-extrabold text-white text-sm tracking-tight">SEMA</span>
          </Link>
          <Link to="/saka-viongozi" className="p-2 rounded-lg text-white/60 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ── Desktop Footer ── */}
      <footer className="hidden md:block bg-yb-charcoal-dark py-6">
        <div className="container text-center text-white/40 text-meta">
          <p className="font-heading font-bold text-primary mb-1">SEMA</p>
          <p className="font-body">Tanzania's Citizen Yellow Book — Every public servant. Every agency. Verified.</p>
        </div>
      </footer>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-yb-charcoal-dark shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-end justify-around px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]" style={{ height: "64px" }}>
          {mobileNav.map((item) => {
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
                  <span className={`text-nav font-body mt-1 ${active ? "text-primary" : "text-yb-charcoal-muted"}`}>{item.label}</span>
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
                <span className={`text-nav font-body mt-0.5 ${active ? "text-primary" : "text-yb-charcoal-muted"}`}>{item.label}</span>
                {active && <div className="w-4 h-0.5 bg-primary rounded-full mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Floating Emergency Button ── */}
      <a
        href="tel:112"
        className="md:hidden fixed bottom-[80px] right-4 z-50 w-12 h-12 rounded-full bg-destructive flex items-center justify-center shadow-lg animate-pulse-gentle"
        aria-label="Emergency call"
      >
        <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
      </a>
    </div>
  );
}