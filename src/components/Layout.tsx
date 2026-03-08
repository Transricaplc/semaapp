import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, AlertTriangle, ClipboardList, Menu, X, Shield, Landmark } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Nyumbani", sublabel: "Home", icon: Home },
  { path: "/saka-viongozi", label: "Saka Viongozi", sublabel: "Search Leaders", icon: Landmark },
  { path: "/directory", label: "Kitabu cha Njano", sublabel: "Yellow Book", icon: BookOpen },
  { path: "/report", label: "Toa Taarifa", sublabel: "Report", icon: AlertTriangle },
  { path: "/tracker", label: "Fuatilia", sublabel: "Track", icon: ClipboardList },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="gradient-navy sticky top-0 z-50 shadow-lg">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg gradient-green flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-primary-foreground leading-tight">Sema</span>
              <span className="text-[10px] text-primary-foreground/60 leading-none">Speak Up · Sema Mapema</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-accent/20 text-accent"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-primary-foreground/10 pb-3 px-4 animate-fade-in">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-accent/20 text-accent" : "text-primary-foreground/70"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div>{item.label}</div>
                    <div className="text-xs opacity-60">{item.sublabel}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="gradient-navy py-8">
        <div className="container text-center text-primary-foreground/50 text-sm">
          <p className="font-heading font-semibold text-primary-foreground/70 mb-1">
            Sema — Sauti ya Mwananchi
          </p>
          <p>The Voice of the Citizen · Empowering Transparency in Tanzania</p>
        </div>
      </footer>
    </div>
  );
}
