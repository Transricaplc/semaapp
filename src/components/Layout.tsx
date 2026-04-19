import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, AlertTriangle, Map, User, Search, Phone, Megaphone } from "lucide-react";
import { useState } from "react";
import EmergencyDrawer from "@/components/EmergencyDrawer";
import AppBackground from "@/components/AppBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const mobileNav = [
    { path: "/", label: "Nyumbani", icon: Home },
    { path: "/saka-viongozi", label: "Saraka", icon: BookOpen },
    { path: "/report", label: "Ripoti", icon: AlertTriangle, center: true },
    { path: "/sauti", label: "Maombi", icon: Megaphone },
    { path: "/mimi", label: "Mimi", icon: User },
  ];

  const desktopNav = [
    { path: "/", label: "Nyumbani" },
    { path: "/saka-viongozi", label: "Saraka" },
    { path: "/report", label: "Ripoti" },
    { path: "/ramani", label: "Ramani" },
    { path: "/sauti", label: "Maombi" },
    { path: "/tracker", label: "Fuatilia" },
    { path: "/mimi", label: "Mimi" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background pb-[80px] md:pb-0">
      <AppBackground />
      {/* ── Desktop / Tablet Top Nav ── */}
      <header className="hidden md:block sticky top-0 z-50 border-b border-border/40 bg-yb-charcoal-dark/95 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-extrabold text-primary-foreground">S</span>
            </div>
            <div className="flex flex-col">
              <span style={{ fontFamily: "'Sora', sans-serif" }} className="text-base font-extrabold text-white leading-tight tracking-tight">SEMA</span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-wider leading-none">
                Sauti ya Mwananchi
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

          <div className="flex items-center gap-2">
            <Link to="/saka-viongozi" className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile Sticky Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-yb-charcoal-dark/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-extrabold text-primary-foreground">S</span>
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight">SEMA</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link to="/saka-viongozi" className="p-2 rounded-lg text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ── Desktop Footer ── */}
      <footer className="hidden md:block bg-yb-charcoal-dark py-6">
        {/* Tanzanian accent strip */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[hsl(var(--tz-green))]" />
          <div className="flex-1 bg-[hsl(var(--tz-yellow))]" />
          <div className="flex-1 bg-[hsl(var(--tz-black))]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 text-center mt-4 text-muted-foreground text-[13px]">
          <p className="font-bold text-primary mb-1">SEMA — Sauti ya Mwananchi</p>
          <p>Tanzania's Citizen Yellow Book — Every public servant. Every agency. Verified.</p>
        </div>
      </footer>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-yb-charcoal-dark shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {/* Tanzanian accent strip */}
        <div className="h-0.5 flex">
          <div className="flex-1 bg-[hsl(var(--tz-green))]" />
          <div className="flex-1 bg-[hsl(var(--tz-yellow))]" />
          <div className="flex-1 bg-[hsl(var(--tz-black))]" />
        </div>
        <div className="flex items-end justify-around px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]" style={{ height: "64px" }}>
          {mobileNav.map((item) => {
            const active = location.pathname === item.path;
            const isCenter = item.center;

            if (isCenter) {
              return (
                <Link key={item.path} to={item.path} className="flex flex-col items-center -mt-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    active
                      ? "bg-primary warm-glow scale-110 ring-4 ring-primary/20"
                      : "bg-primary hover:scale-105 warm-glow-sm"
                  }`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className={`text-[10px] mt-1 tracking-tight ${active ? "text-primary font-bold" : "font-medium text-yb-charcoal-muted"}`}>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center py-1.5 min-w-[56px] transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-yb-charcoal-muted hover:text-white hover:bg-white/5"
                }`}>
                  <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} />
                </div>
                <span className={`text-[10px] mt-0.5 tracking-tight ${active ? "text-primary font-bold" : "font-medium text-yb-charcoal-muted"}`}>{item.label}</span>
                {active && <div className="w-4 h-0.5 bg-primary rounded-full mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Floating Emergency Button ── */}
      <button
        onClick={() => setEmergencyOpen(true)}
        className="md:hidden fixed bottom-[80px] right-4 z-50 w-12 h-12 rounded-full bg-destructive flex items-center justify-center shadow-lg animate-pulse-gentle"
        aria-label="Dharura"
      >
        <Phone className="w-5 h-5 text-destructive-foreground" />
      </button>

      {/* Emergency Drawer */}
      <EmergencyDrawer open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
}
