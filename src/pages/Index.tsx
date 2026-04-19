import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AlertTriangle, BookOpen, TrendingUp, Users, ArrowRight, Droplets,
  Heart, Flame, Award, Megaphone, Share2, Map, Search, CheckCircle2,
  Building2, Scale, Shield, GraduationCap, MapPin, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trendingConcerns, categoryLabels, type ReportCategory } from "@/data/reports";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import EmergencyBanner from "@/components/EmergencyContacts";
import { directoryStats, getYourOfficials } from "@/data/unified_officials";
import OfficialCard from "@/components/OfficialCard";
import { hospitals } from "@/data/hospitali";
import { agencies } from "@/data/agencies";
import KilimanjaroHero from "@/components/KilimanjaroHero";

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

  return (
    <div className="animate-fade-in">
      {/* ── HERO ── */}
      <section className="bg-yb-charcoal py-16 md:py-24 relative overflow-hidden min-h-[420px] flex items-center">
        <KilimanjaroHero />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 text-center max-w-3xl">
          {/* Tanzanian accent strip */}
          <div className="flex gap-0 w-20 h-1 mx-auto mb-6 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#E30613]" />
            <div className="flex-1 bg-[#FFCC00]" />
            <div className="flex-1 bg-[#006600]" />
          </div>

          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.15em] mb-4">SAUTI YA MWANANCHI</p>

          <h1 className="text-[32px] md:text-[48px] font-extrabold text-white mb-5 leading-[1.1]">
            Fikia Kiongozi Wako{" "}
            <br className="hidden md:block" />
            <span className="text-primary">Moja kwa Moja</span>
          </h1>
          <p className="text-[15px] md:text-[16px] text-yb-charcoal-muted mb-10 max-w-xl mx-auto">
            Saraka ya kweli ya watumishi wa umma Tanzania — bila foleni, bila kizuizi.
          </p>

          <GlobalSearch />

          {/* Quick category cards */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-8 max-w-2xl mx-auto">
            {quickCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border border-primary/20 bg-yb-charcoal-mid/50 hover:bg-primary/10 hover:border-primary/40 transition-all text-center min-h-[64px]"
              >
                <span className="text-xl">{cat.label.split(" ")[0]}</span>
                <span className="text-[11px] font-medium text-white/80">{cat.label.split(" ").slice(1).join(" ")}</span>
              </Link>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[13px] text-yb-charcoal-muted">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              Viongozi {directoryStats.totalOfficials}+
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              Mikoa 31
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              Imethibitishwa
            </span>
          </div>
        </div>
      </section>

      {/* ── LOCATION FINDER ── */}
      <section className="py-8 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <ConstituencyFinder />
        </div>
      </section>

      {/* ── PERSONALISED: VIONGOZI WAKO ── */}
      {savedRegion && yourOfficials.length > 0 && (
        <section className="py-6 bg-yb-yellow-soft border-y border-border">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[20px] font-bold text-foreground truncate">
                    Viongozi Wako — {savedRegion}{savedDistrict ? ` · ${savedDistrict}` : ""}
                  </h2>
                  <p className="text-[13px] text-muted-foreground">{yourOfficials.length} viongozi wa eneo lako</p>
                </div>
              </div>
              <button
                onClick={clearLocation}
                className="inline-flex items-center gap-1 text-[13px] text-muted-foreground hover:text-primary underline-offset-2 hover:underline shrink-0"
              >
                <X className="w-3 h-3" /> Badilisha eneo
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 snap-x">
              {yourOfficials.map((o) => (
                <div key={`saved-${o.id}`} className="min-w-[300px] max-w-[300px] snap-start">
                  <OfficialCard official={o} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EMERGENCY ── */}
      <section className="bg-background px-4">
        <div className="max-w-3xl mx-auto">
          <EmergencyBanner />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-yb-yellow-soft border-y border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: String(directoryStats.totalOfficials), label: "Viongozi", sub: "Walioorodheshwa", icon: Users, color: "text-primary" },
              { value: String(hospitals.length), label: "Hospitali", sub: "Vituo vya afya", icon: Heart, color: "text-accent" },
              { value: String(agencies.length), label: "Wakala", sub: "Taasisi za serikali", icon: Building2, color: "text-foreground" },
              { value: "31", label: "Mikoa", sub: "Imefunikwa", icon: MapPin, color: "text-primary" },
            ].map((stat) => (
              <div key={stat.sub} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-[20px] md:text-[24px] font-bold text-foreground">{stat.value}</div>
                <div className="text-[15px] font-medium text-foreground mt-0.5">{stat.label}</div>
                <div className="text-[13px] text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="py-8 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/ramani" className="yb-card p-4 flex items-center gap-3 min-h-[64px]">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Map className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-foreground">Ramani</p>
                <p className="text-[13px] text-muted-foreground">Tazama ripoti karibu nawe</p>
              </div>
            </Link>
            <Link to="/sauti" className="yb-card p-4 flex items-center gap-3 min-h-[64px]">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-foreground">Maombi</p>
                <p className="text-[13px] text-muted-foreground">Tia saini au anzisha</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Ripoti za Hivi Karibuni</h2>
              <p className="text-[13px] text-muted-foreground">Matatizo yanayozungumzwa na wananchi</p>
            </div>
          </div>
          <div className="space-y-3">
            {trendingConcerns.map((concern, i) => (
              <div key={concern.id} className="yb-card p-4 flex items-center gap-4" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {categoryIcons[concern.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-foreground truncate">{concern.text}</p>
                  <div className="flex items-center gap-3 mt-1 text-[13px] text-muted-foreground">
                    <span>{categoryLabels[concern.category]}</span>
                    <span>·</span>
                    <span>{concern.region}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="text-[20px] font-bold text-primary">{concern.count}</div>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`📢 ${concern.text} — ${concern.count} reports\n\n#Sema`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                    className="text-[13px] text-accent flex items-center gap-0.5 hover:underline"
                  >
                    <Share2 className="w-3 h-3" /> Shiriki
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold">
              <Link to="/report">Ripoti Sasa <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="py-12 bg-yb-yellow-soft border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Sauti Zilizosikika</h2>
              <p className="text-[13px] text-muted-foreground">Hadithi za mafanikio kutoka kwa ripoti za wananchi</p>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              { title: "Maji safi yamerejeshwa Dodoma CBD", impact: "12,000+", emoji: "💧" },
              { title: "Barabara ya Mbagala imeanza kujengwa", impact: "50,000+", emoji: "🛣️" },
              { title: "Dawa zimefikishwa Mwananyamala", impact: "3,000+", emoji: "🏥" },
            ].map((story, i) => (
              <div key={i} className="flex items-center gap-3 yb-card p-4 min-h-[56px]">
                <span className="text-2xl">{story.emoji}</span>
                <div className="flex-1">
                  <p className="text-[16px] font-bold text-foreground">{story.title}</p>
                  <p className="text-[13px] text-muted-foreground">{story.impact} wamenufaika</p>
                </div>
                <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] font-bold uppercase">Imetatuliwa</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
