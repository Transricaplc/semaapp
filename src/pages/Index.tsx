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
      {/* ── HERO ── */}
      <section className="bg-yb-charcoal-dark px-4 pt-6 pb-5">
        <div className="flex gap-0 w-16 h-[3px] mb-4 rounded-full overflow-hidden">
          <div className="flex-1 bg-[hsl(var(--tz-green))]" />
          <div className="flex-1 bg-[hsl(var(--tz-yellow))]" />
          <div className="flex-1 bg-[hsl(var(--tz-black))]" />
        </div>

        <p className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          SEMA · SAUTI YA MWANANCHI
        </p>

        <h1 className="font-display text-[32px] leading-[1.05] font-extrabold text-white mb-3 tracking-tight">
          Fikia Kiongozi <br />
          <span className="text-primary">Wako Leo.</span>
        </h1>

        <p className="font-body text-[14px] text-yb-charcoal-muted mb-5 leading-[1.7] max-w-[480px]">
          Saraka ya watumishi wa umma Tanzania — bila foleni, bila kizuizi.
        </p>

        <GlobalSearch />

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mt-4 -mx-4 px-4">
          {quickCategories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/10 border border-white/10 text-white/85 font-heading text-[12px] font-bold whitespace-nowrap active:opacity-65 transition-opacity"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── TAKWIMU ── */}
      <section className="px-4 py-3 bg-background">
        <PanelLabel>TAKWIMU</PanelLabel>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.l} className="stat-panel">
              <p className="font-display text-[28px] font-extrabold text-foreground leading-none">
                {s.n}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIONGOZI WAKO ── */}
      <section className="px-4 py-3 bg-background">
        <PanelLabel>VIONGOZI WAKO</PanelLabel>
        <ConstituencyFinder />
      </section>

      {savedRegion && yourOfficials.length > 0 && (
        <section className="px-4 py-3 bg-yb-yellow-soft border-y border-border">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                ENEO LAKO
              </p>
              <p className="font-heading text-[16px] font-extrabold text-foreground truncate">
                {savedRegion}{savedDistrict ? ` · ${savedDistrict}` : ""}
              </p>
            </div>
            <button
              onClick={clearLocation}
              className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground active:opacity-65"
            >
              <X className="w-3 h-3" /> Badilisha
            </button>
          </div>
          <PanelGroup>
            {yourOfficials.slice(0, 5).map((o) => (
              <OfficialCard key={`saved-${o.id}`} official={o} />
            ))}
          </PanelGroup>
        </section>
      )}

      {/* ── DHARURA ── */}
      <section className="px-4 py-3 bg-background">
        <PanelLabel>DHARURA</PanelLabel>
        <EmergencyBanner />
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="px-4 py-3 bg-background grid grid-cols-2 gap-2">
        <Link to="/ramani" className="panel-row-button">
          <div className="panel-left" style={{ background: "hsl(var(--accent))", color: "white" }}>
            <Map className="w-4 h-4" />
          </div>
          <div className="panel-right">
            <p className="font-heading text-[14px] font-bold text-foreground leading-tight">Ramani</p>
            <p className="font-body text-[11px] text-muted-foreground">Ripoti karibu nawe</p>
          </div>
        </Link>
        <Link to="/sauti" className="panel-row-button">
          <div className="panel-left">
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="panel-right">
            <p className="font-heading text-[14px] font-bold text-foreground leading-tight">Maombi</p>
            <p className="font-body text-[11px] text-muted-foreground">Tia saini au anzisha</p>
          </div>
        </Link>
      </section>

      {/* ── MADA ZINAZOCHOMEKA ── */}
      <section className="px-4 py-3 bg-background">
        <div className="flex items-center justify-between mb-2">
          <PanelLabel>MADA ZINAZOCHOMEKA</PanelLabel>
          <Link to="/report" className="font-heading text-[12px] font-bold text-primary active:opacity-65 inline-flex items-center gap-0.5">
            Ripoti <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <PanelGroup>
          {trendingConcerns.slice(0, 4).map((c) => (
            <Panel
              key={c.id}
              left={categoryIcons[c.category]}
              title={c.text}
              subtitle={`${categoryLabels[c.category]} · ${c.region}`}
              badge={String(c.count)}
            >
              <p className="font-body text-[13px] text-muted-foreground leading-[1.7] mb-3 -ml-[60px]">
                {c.count} watu wameripoti suala hili katika {c.region}.
              </p>
              <div className="flex gap-2 -ml-[60px]">
                <Link
                  to="/report"
                  className="flex-1 inline-flex items-center justify-center h-10 rounded-xl bg-primary text-primary-foreground font-heading text-[13px] font-bold active:opacity-65 transition-opacity"
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
            </Panel>
          ))}
        </PanelGroup>
      </section>
    </div>
  );
}
