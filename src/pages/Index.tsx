import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  TrendingUp, Users, Droplets, Heart, Building2, Map, Megaphone,
  MapPin, X, Shield, ArrowRight, Share2,
} from "lucide-react";
import { trendingConcerns, categoryLabels, type ReportCategory } from "@/data/reports";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import EmergencyBanner from "@/components/EmergencyContacts";
import { directoryStats, getYourOfficials } from "@/data/unified_officials";
import OfficialCard from "@/components/OfficialCard";
import Row from "@/components/Row";
import { hospitals } from "@/data/hospitali";
import { agencies } from "@/data/agencies";

const categoryIcons: Record<ReportCategory, React.ReactNode> = {
  service_delivery: <Droplets className="w-4 h-4" />,
  crime: <Shield className="w-4 h-4" />,
  graft: <Building2 className="w-4 h-4" />,
};

const quickCategories = [
  { label: "🏛️ Wabunge", to: "/saka-viongozi" },
  { label: "⚖️ Mahakama", to: "/saka-viongozi" },
  { label: "👮 Polisi", to: "/saka-viongozi" },
  { label: "🏢 Mawaziri", to: "/saka-viongozi" },
  { label: "🗺️ Mikoa", to: "/saka-viongozi" },
  { label: "🏥 Hospitali", to: "/saka-viongozi" },
];

export default function Index() {
  const [savedRegion, setSavedRegion] = useState("");
  const [savedDistrict, setSavedDistrict] = useState("");

  useEffect(() => {
    const read = () => {
      setSavedRegion(localStorage.getItem("sema_selected_region") || "");
      setSavedDistrict(localStorage.getItem("sema_selected_district") || "");
    };
    read();
    window.addEventListener("sema_location_changed", read);
    return () => window.removeEventListener("sema_location_changed", read);
  }, []);

  const yourOfficials = savedRegion ? getYourOfficials(savedRegion, savedDistrict || undefined) : [];

  const clearLocation = () => {
    localStorage.removeItem("sema_selected_region");
    localStorage.removeItem("sema_selected_district");
    setSavedRegion(""); setSavedDistrict("");
  };

  const stats = [
    { n: `${directoryStats.totalOfficials}+`, l: "Viongozi", icon: Users },
    { n: "31", l: "Mikoa", icon: MapPin },
    { n: String(hospitals.length), l: "Hospitali", icon: Heart },
    { n: String(agencies.length), l: "Wakala", icon: Building2 },
  ];

  return (
    <div className="animate-fade-in mx-auto w-full max-w-[640px]">
      {/* ── HERO — dark, compact, left-aligned ── */}
      <section className="bg-yb-charcoal-dark px-4 pt-6 pb-5 relative">
        {/* Tanzania stripe */}
        <div className="flex gap-0 w-16 h-[3px] mb-4 rounded-full overflow-hidden">
          <div className="flex-1 bg-[hsl(var(--tz-green))]" />
          <div className="flex-1 bg-[hsl(var(--tz-yellow))]" />
          <div className="flex-1 bg-[hsl(var(--tz-black))]" />
        </div>

        <p
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
        >
          SEMA · SAUTI YA MWANANCHI
        </p>

        <h1 className="text-[28px] leading-[1.1] font-extrabold text-white mb-2 tracking-tight">
          Fikia Kiongozi <br />
          <span className="text-primary">Wako Leo.</span>
        </h1>

        <p className="text-[14px] text-yb-charcoal-muted mb-4 leading-relaxed">
          Saraka ya watumishi wa umma Tanzania.
        </p>

        {/* Search */}
        <GlobalSearch />

        {/* Category pills — left scroll */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mt-3 -mx-4 px-4">
          {quickCategories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/8 border border-white/10 text-white/85 text-[12px] font-bold whitespace-nowrap active:opacity-65 transition-opacity"
            >
              <span>{cat.label.split(" ")[0]}</span>
              <span>{cat.label.split(" ").slice(1).join(" ")}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS — 2-col grid, left-aligned numbers ── */}
      <section className="px-4 py-4 grid grid-cols-2 gap-2 bg-background">
        {stats.map((s) => (
          <div
            key={s.l}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border min-h-[64px]"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[18px] font-extrabold text-foreground leading-none"
              >
                {s.n}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground mt-1 uppercase tracking-wide">
                {s.l}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── LOCATION FINDER ── */}
      <section className="px-4 py-4 bg-background">
        <p
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2"
        >
          VIONGOZI WAKO
        </p>
        <ConstituencyFinder />
      </section>

      {/* ── PERSONALISED ── */}
      {savedRegion && yourOfficials.length > 0 && (
        <section className="px-4 py-4 bg-yb-yellow-soft border-y border-border">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                ENEO LAKO
              </p>
              <p className="text-[16px] font-extrabold text-foreground truncate">
                {savedRegion}{savedDistrict ? ` · ${savedDistrict}` : ""}
              </p>
            </div>
            <button
              onClick={clearLocation}
              className="inline-flex items-center gap-1 text-[12px] text-muted-foreground active:opacity-65"
            >
              <X className="w-3 h-3" /> Badilisha
            </button>
          </div>
          <div className="-mx-4 border-t border-border bg-card divide-y divide-border/60">
            {yourOfficials.slice(0, 5).map((o) => (
              <OfficialCard key={`saved-${o.id}`} official={o} />
            ))}
          </div>
        </section>
      )}

      {/* ── EMERGENCY ── */}
      <section className="px-4 py-4 bg-background">
        <EmergencyBanner />
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="px-4 py-2 bg-background grid grid-cols-2 gap-2">
        <Link
          to="/ramani"
          className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border min-h-[56px] active:opacity-65 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/12 flex items-center justify-center">
            <Map className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-foreground leading-tight">Ramani</p>
            <p className="text-[11px] text-muted-foreground">Ripoti karibu nawe</p>
          </div>
        </Link>
        <Link
          to="/sauti"
          className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border min-h-[56px] active:opacity-65 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/12 flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-foreground leading-tight">Maombi</p>
            <p className="text-[11px] text-muted-foreground">Tia saini au anzisha</p>
          </div>
        </Link>
      </section>

      {/* ── TRENDING — expandable rows ── */}
      <section className="px-4 py-4 bg-background">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
            >
              MADA ZINAZOCHOMEKA
            </p>
            <p className="text-[16px] font-extrabold text-foreground leading-tight">Trending</p>
          </div>
          <Link to="/report" className="text-[12px] font-bold text-primary active:opacity-65 inline-flex items-center gap-0.5">
            Ripoti <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="-mx-4 border-y border-border bg-card divide-y divide-border/60">
          {trendingConcerns.slice(0, 4).map((c) => (
            <Row
              key={c.id}
              leading={categoryIcons[c.category]}
              title={c.text}
              subtitle={`${categoryLabels[c.category]} · ${c.region}`}
              badge={String(c.count)}
            >
              <div className="space-y-3 pt-2">
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {c.count} watu wameripoti suala hili katika {c.region}.
                </p>
                <div className="flex gap-2">
                  <Link
                    to="/report"
                    className="flex-1 inline-flex items-center justify-center h-10 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity"
                  >
                    Ripoti pia
                  </Link>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`📢 ${c.text} — ${c.count} ripoti\n\n#Sema`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                    className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center active:opacity-65 transition-opacity"
                    aria-label="Shiriki"
                  >
                    <Share2 className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>
            </Row>
          ))}
        </div>
      </section>
    </div>
  );
}
