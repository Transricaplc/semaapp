import { Link, useLocation } from "react-router-dom";
import { Home, Search, Map, Mic, User, Phone } from "lucide-react";
import { useState } from "react";
import EmergencyDrawer from "@/components/EmergencyDrawer";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_TABS = [
  { path: "/", label: "Nyumbani", icon: Home },
  { path: "/saka-viongozi", label: "Saka", icon: Search },
  { path: "/ramani", label: "Ramani", icon: Map },
  { path: "/sauti", label: "Sauti", icon: Mic },
  { path: "/mimi", label: "Mimi", icon: User },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <main>{children}</main>

        {/* ── Pill Bottom Nav — visible on every viewport, lives inside the 430px column ── */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] bg-surface border-t border-gazette-border"
          style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-stretch justify-around h-16 px-2">
            {NAV_TABS.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] relative group"
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      active ? "stroke-primary" : "stroke-[hsl(220,9%,60%)] group-hover:stroke-foreground"
                    }`}
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                  <span
                    className={`text-[10px] font-ui leading-none ${
                      active ? "text-primary font-medium" : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute -bottom-px h-[2px] w-6 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ── Floating Emergency Button — mobile only ── */}
        {isMobile && (
          <button
            onClick={() => setEmergencyOpen(true)}
            className="fixed bottom-[88px] right-4 z-40 w-12 h-12 rounded-full bg-destructive flex items-center justify-center shadow-[0_4px_16px_rgba(190,2,2,0.35)]"
            aria-label="Dharura"
          >
            <Phone className="w-5 h-5 text-destructive-foreground" />
          </button>
        )}

        <EmergencyDrawer open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
      </div>
    </div>
  );
}
