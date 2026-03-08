import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BookOpen,
  TrendingUp,
  Users,
  ArrowRight,
  Droplets,
  ShieldAlert,
  Landmark,
  HeartPulse,
  Eye,
  Heart,
  Flame,
  Award,
  Megaphone,
  Share2,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trendingConcerns, categoryLabels, type ReportCategory } from "@/data/reports";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import EmergencyBanner from "@/components/EmergencyContacts";
import { directoryStats } from "@/data/tanzania_directory";
import { facilityStats } from "@/data/health_facilities";
import { fireStats } from "@/data/fire_stations";
import { agencyStats } from "@/data/agencies";
import KilimanjaroHero from "@/components/KilimanjaroHero";

const categoryIcons: Record<ReportCategory, React.ReactNode> = {
  service_delivery: <Droplets className="w-4 h-4" />,
  crime: <ShieldAlert className="w-4 h-4" />,
  graft: <Landmark className="w-4 h-4" />,
};

const successStories = [
  { title: "Maji safi yamerudi Dodoma CBD", impact: "Watu 12,000+", emoji: "💧" },
  { title: "Barabara ya Mbagala imeanza kujengwa", impact: "Wakazi 50,000+", emoji: "🛣️" },
  { title: "Dawa zimefika Mwananyamala Hospital", impact: "Wagonjwa 3,000+", emoji: "🏥" },
];

export default function Index() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28 relative overflow-hidden min-h-[480px] flex items-center">
        <KilimanjaroHero />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sema-yellow/20 text-sema-yellow px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-sema-yellow/20">
            <Eye className="w-4 h-4" />
            Uwazi na Uwajibikaji — Transparency & Accountability
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-5 leading-tight drop-shadow-lg">
            Sauti Yako{" "}
            <span className="text-sema-yellow drop-shadow-[0_0_20px_rgba(255,204,0,0.4)]">
              Inasikika
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto drop-shadow">
            Your voice matters. Report issues, find your leaders, and hold public servants accountable — all in one place.
          </p>

          {/* Global Search */}
          <GlobalSearch />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-sema-red hover:bg-sema-red-light text-primary-foreground font-semibold text-base px-8 h-13 shadow-lg border-0 animate-warm-pulse"
            >
              <Link to="/report">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Ripoti Tatizo — Report an Issue
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 font-semibold text-base px-8 h-13 backdrop-blur-sm"
            >
              <Link to="/saka-viongozi">
                <BookOpen className="w-5 h-5 mr-2" />
                Saraka ya Viongozi — Full Directory
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kitenge divider */}
      <div className="kitenge-bottom h-0" />

      {/* Constituency Finder */}
      <section className="py-8 bg-background">
        <div className="container max-w-3xl">
          <EmergencyBanner />
          <ConstituencyFinder />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border kitenge-top">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: String(directoryStats.totalOfficials), label: "Viongozi", sub: "Officials Listed", icon: Users, color: "text-sema-red" },
              { value: String(facilityStats.total), label: "Hospitali", sub: "Health Facilities", icon: Heart, color: "text-sema-green" },
              { value: String(agencyStats.totalAgencies), label: "Taasisi", sub: "Govt Agencies", icon: Landmark, color: "text-sema-brown" },
              { value: String(fireStats.totalStations), label: "Zimamoto", sub: "Fire Stations", icon: Flame, color: "text-sema-sunrise" },
            ].map((stat) => (
              <div key={stat.sub} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mt-0.5">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="py-8 bg-background">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/ramani" className="glass-card rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-sema-green/10 flex items-center justify-center">
                <Map className="w-5 h-5 text-sema-green" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Ramani</p>
                <p className="text-[10px] text-muted-foreground">Tazama ripoti kwenye ramani</p>
              </div>
            </Link>
            <Link to="/sauti" className="glass-card rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-sema-red/10 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-sema-red" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Sauti Zetu</p>
                <p className="text-[10px] text-muted-foreground">Maombi & petitions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Concerns */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sema-red flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Sauti Zote — Latest</h2>
              <p className="text-sm text-muted-foreground">Trending Concerns from Citizens</p>
            </div>
          </div>
          <div className="space-y-3">
            {trendingConcerns.map((concern, i) => (
              <div
                key={concern.id}
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow hover:border-sema-red/20"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-sema-red/10 text-sema-red flex items-center justify-center shrink-0">
                  {categoryIcons[concern.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{concern.text}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{categoryLabels[concern.category]}</span>
                    <span>·</span>
                    <span>{concern.region}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="text-lg font-heading font-bold text-sema-red">{concern.count}</div>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`📢 ${concern.text} — ${concern.count} ripoti\n\n#Sema #SautiyaMwananchi`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                    className="text-[10px] text-sema-green flex items-center gap-0.5 hover:underline"
                  >
                    <Share2 className="w-3 h-3" /> Shiriki
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="gap-2 border-sema-red/30 text-sema-red hover:bg-sema-red/5">
              <Link to="/report">
                Ripoti Sasa <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 bg-card kitenge-top">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sema-green/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-sema-green" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Sauti Iliyosikika</h2>
              <p className="text-sm text-muted-foreground">Voices That Were Heard — Success Stories</p>
            </div>
          </div>
          <div className="grid gap-3">
            {successStories.map((story, i) => (
              <div key={i} className="flex items-center gap-3 glass-card rounded-xl p-4 hover:shadow-md transition-shadow">
                <span className="text-2xl">{story.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{story.title}</p>
                  <p className="text-[10px] text-muted-foreground">{story.impact} wamenufaika</p>
                </div>
                <Badge className="bg-sema-green/10 text-sema-green border-sema-green/20 text-[10px]">✅ Imeshughulikiwa</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
