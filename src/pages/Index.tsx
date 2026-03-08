import { Link } from "react-router-dom";
import {
  AlertTriangle, BookOpen, TrendingUp, Users, ArrowRight, Droplets, ShieldAlert, Landmark,
  Heart, Flame, Award, Megaphone, Share2, Map, Search, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trendingConcerns, categoryLabels, type ReportCategory } from "@/data/reports";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import EmergencyBanner from "@/components/EmergencyContacts";
import { directoryStats } from "@/data/unified_officials";
import { facilityStats } from "@/data/health_facilities";
import { fireStats } from "@/data/fire_stations";
import { agencyStats } from "@/data/agencies";
import KilimanjaroHero from "@/components/KilimanjaroHero";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<ReportCategory, React.ReactNode> = {
  service_delivery: <Droplets className="w-4 h-4" />,
  crime: <ShieldAlert className="w-4 h-4" />,
  graft: <Landmark className="w-4 h-4" />,
};

const quickFilters = ["MPs", "Ministers", "Judges", "Police", "Commissioners", "Agencies"];

export default function Index() {
  const { t, lang } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* ── HERO ── */}
      <section className="bg-yb-charcoal py-16 md:py-24 relative overflow-hidden min-h-[420px] flex items-center">
        <KilimanjaroHero />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-badge uppercase tracking-wider mb-6 backdrop-blur-sm border border-primary/20 font-heading">
            <BookOpen className="w-3.5 h-3.5" />
            Citizen Yellow Book
          </div>

          <h1 className="text-display md:text-display-lg font-heading text-white mb-5">
            Every Government Contact.{" "}
            <br className="hidden md:block" />
            <span className="text-primary">One Place. Verified.</span>
          </h1>
          <p className="text-body md:text-body-lg text-yb-charcoal-muted mb-10 max-w-xl mx-auto font-body">
            Tanzania's official citizen directory — find any public servant, agency, or government office instantly.
          </p>

          <GlobalSearch />

          {/* Quick pill filters */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {quickFilters.map((filter) => (
              <Link
                key={filter}
                to="/saka-viongozi"
                className="px-3 py-1.5 rounded-full text-badge font-heading uppercase tracking-wider border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {filter}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-yb-yellow-deep text-primary-foreground font-body font-semibold text-body px-8 h-[52px] shadow-lg border-0 rounded-xl">
              <Link to="/saka-viongozi">
                <Search className="w-5 h-5 mr-2" />
                Search Directory
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary bg-transparent hover:bg-primary/10 font-body font-semibold text-body px-8 h-[52px] rounded-xl">
              <Link to="/report">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report an Issue
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-meta text-yb-charcoal-muted font-body">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              {directoryStats.totalOfficials}+ officials listed
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              31 regions covered
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              Verified from public sources
            </span>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY + FINDER ── */}
      <section className="py-8 bg-background">
        <div className="container max-w-3xl">
          <EmergencyBanner />
          <ConstituencyFinder />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-yb-yellow-soft border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: String(directoryStats.totalOfficials), label: "Officials", sub: "Listed in directory", icon: Users, color: "text-primary" },
              { value: String(facilityStats.total), label: "Hospitals", sub: "Health facilities", icon: Heart, color: "text-accent" },
              { value: String(agencyStats.totalAgencies), label: "Agencies", sub: "Government agencies", icon: Landmark, color: "text-foreground" },
              { value: String(fireStats.totalStations), label: "Fire Stations", sub: "Fire & rescue", icon: Flame, color: "text-destructive" },
            ].map((stat) => (
              <div key={stat.sub} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-h2 md:text-h2-lg font-heading text-foreground">{stat.value}</div>
                <div className="text-body font-body font-medium text-foreground mt-0.5">{stat.label}</div>
                <div className="text-meta font-body text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="py-8 bg-background">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/ramani" className="yb-card p-4 flex items-center gap-3 min-h-[64px]">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Map className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-heading text-h3 text-foreground">Issues Map</p>
                <p className="text-meta font-body text-muted-foreground">See reports near you</p>
              </div>
            </Link>
            <Link to="/sauti" className="yb-card p-4 flex items-center gap-3 min-h-[64px]">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-h3 text-foreground">Petitions</p>
                <p className="text-meta font-body text-muted-foreground">Sign or start petitions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-h2 font-heading text-foreground">{t("trending.title")}</h2>
              <p className="text-meta font-body text-muted-foreground">{t("trending.subtitle")}</p>
            </div>
          </div>
          <div className="space-y-3">
            {trendingConcerns.map((concern, i) => (
              <div key={concern.id} className="yb-card p-4 flex items-center gap-4" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {categoryIcons[concern.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-body font-medium text-foreground truncate">{concern.text}</p>
                  <div className="flex items-center gap-3 mt-1 text-meta font-body text-muted-foreground">
                    <span>{categoryLabels[concern.category]}</span>
                    <span>·</span>
                    <span>{concern.region}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="text-h2 font-heading text-primary">{concern.count}</div>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`📢 ${concern.text} — ${concern.count} reports\n\n#Sema #CitizenYellowBook`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                    className="text-meta text-accent flex items-center gap-0.5 hover:underline font-body"
                  >
                    <Share2 className="w-3 h-3" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/5 font-body font-semibold">
              <Link to="/report">Report Now <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="py-12 bg-yb-yellow-soft border-t border-border">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-h2 font-heading text-foreground">{t("success.title")}</h2>
              <p className="text-meta font-body text-muted-foreground">{t("success.subtitle")}</p>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              { title: "Clean water restored in Dodoma CBD", impact: "12,000+", emoji: "💧" },
              { title: "Mbagala road construction has begun", impact: "50,000+", emoji: "🛣️" },
              { title: "Medicine supplies reached Mwananyamala Hospital", impact: "3,000+", emoji: "🏥" },
            ].map((story, i) => (
              <div key={i} className="flex items-center gap-3 yb-card p-4 min-h-[56px]">
                <span className="text-2xl">{story.emoji}</span>
                <div className="flex-1">
                  <p className="font-heading text-h3 text-foreground">{story.title}</p>
                  <p className="text-meta font-body text-muted-foreground">{story.impact} citizens benefited</p>
                </div>
                <Badge className="bg-accent/10 text-accent border-accent/20 text-badge badge-role">Resolved</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}