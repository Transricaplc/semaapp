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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trendingConcerns, categoryLabels, type ReportCategory } from "@/data/reports";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import EmergencyBanner from "@/components/EmergencyContacts";
import { directoryStats } from "@/data/tanzania_directory";
import { facilityStats } from "@/data/health_facilities";
import { fireStats } from "@/data/fire_stations";
import { agencyStats } from "@/data/agencies";

const categoryIcons: Record<ReportCategory, React.ReactNode> = {
  service_delivery: <Droplets className="w-4 h-4" />,
  crime: <ShieldAlert className="w-4 h-4" />,
  graft: <Landmark className="w-4 h-4" />,
};

export default function Index() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Uwazi na Uwajibikaji — Transparency & Accountability
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-5 leading-tight">
            Sauti Yako <span className="text-accent">Inasikika</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Your voice matters. Report issues, find your leaders, and hold public servants accountable — all in one place.
          </p>

          {/* Global Search */}
          <GlobalSearch />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="gradient-green text-accent-foreground font-semibold text-base px-8 h-13 shadow-lg hover:opacity-90 transition-opacity border-0">
              <Link to="/report">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Ripoti Tatizo — Report an Issue
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 font-semibold text-base px-8 h-13">
              <Link to="/saka-viongozi">
                <BookOpen className="w-5 h-5 mr-2" />
                Saraka ya Viongozi — Full Directory
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Constituency Finder */}
      <section className="py-8 bg-background">
        <div className="container max-w-3xl">
          <EmergencyBanner />
          <ConstituencyFinder />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: String(directoryStats.totalOfficials), label: "Viongozi", sub: "Officials Listed", icon: Users },
              { value: String(facilityStats.total), label: "Hospitali", sub: "Health Facilities", icon: Heart },
              { value: String(agencyStats.totalAgencies), label: "Taasisi", sub: "Govt Agencies", icon: Landmark },
              { value: String(fireStats.totalStations), label: "Zimamoto", sub: "Fire Stations", icon: Flame },
            ].map((stat) => (
              <div key={stat.sub} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-3">
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

      {/* Trending Concerns */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Masuala Yanayoongoza</h2>
              <p className="text-sm text-muted-foreground">Trending Concerns from Citizens</p>
            </div>
          </div>
          <div className="space-y-3">
            {trendingConcerns.map((concern, i) => (
              <div
                key={concern.id}
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
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
                <div className="text-right shrink-0">
                  <div className="text-lg font-heading font-bold text-accent">{concern.count}</div>
                  <div className="text-[10px] text-muted-foreground">reports</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/report">
                Report an Issue <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
