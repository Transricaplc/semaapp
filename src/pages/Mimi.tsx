import { useState } from "react";
import { User, FileText, TrendingUp, Award, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockReports, statusLabels, categoryLabels, type ReportStatus } from "@/data/reports";

const impactStats = [
  { label: "My Reports", value: "5", icon: FileText, color: "bg-sema-red/10 text-sema-red" },
  { label: "Resolved", value: "2", icon: Award, color: "bg-sema-green/10 text-sema-green" },
  { label: "Petitions Signed", value: "12", icon: Star, color: "bg-sema-yellow/10 text-sema-yellow-warm" },
  { label: "People Impacted", value: "340", icon: TrendingUp, color: "bg-sema-sunrise/10 text-sema-sunrise" },
];

const statusColors: Record<ReportStatus, string> = {
  sent: "bg-warning/15 text-warning",
  received: "bg-primary/10 text-primary",
  investigating: "bg-gold/15 text-foreground",
  resolved: "bg-accent/15 text-accent",
};

const successStories = [
  {
    title: "Clean water restored in Dodoma CBD",
    desc: "After 47 citizen reports, DUWASA fixed the main pipe. Water now flows for 3 days.",
    date: "March 2026",
    impact: "12,000+ residents",
  },
  {
    title: "Mbagala road construction has begun",
    desc: "Corruption reports triggered an investigation. A new contractor has been appointed.",
    date: "February 2026",
    impact: "50,000+ residents",
  },
];

export default function Mimi() {
  const [loggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="animate-fade-in">
        <section className="gradient-hero py-16">
          <div className="container max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
              Welcome to Sema
            </h1>
            <p className="text-primary-foreground/60 text-sm mb-8">
              Log in with your phone number to view your reports and impact
            </p>

            {/* Phone login */}
            <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-left">
              <label className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                Phone Number
              </label>
              <div className="flex gap-2 mb-4">
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-3 flex items-center text-primary-foreground font-medium text-sm">
                  +255
                </div>
                <input
                  type="tel"
                  placeholder="7XX XXX XXX"
                  className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 text-base"
                />
              </div>
              <Button className="w-full bg-sema-yellow text-sema-earth font-bold h-12 text-base hover:bg-sema-yellow/90 animate-warm-pulse">
                Send OTP Code
              </Button>
              <p className="text-[10px] text-primary-foreground/40 text-center mt-3">
                We'll send you a verification SMS
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 justify-center">
              <div className="h-px flex-1 bg-primary-foreground/10" />
              <span className="text-xs text-primary-foreground/40">or</span>
              <div className="h-px flex-1 bg-primary-foreground/10" />
            </div>

            <Button variant="outline" className="mt-4 w-full border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 gap-2">
              <EyeOff className="w-4 h-4" />
              Continue Anonymously
            </Button>
          </div>
        </section>

        {/* Success stories (visible to all) */}
        <section className="py-10 bg-background">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sema-green/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-sema-green" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground">Voices That Were Heard</h2>
                <p className="text-xs text-muted-foreground">Success stories from citizen reports</p>
              </div>
            </div>
            <div className="space-y-3">
              {successStories.map((story, i) => (
                <div key={i} className="glass-card rounded-xl p-4 kitenge-border border">
                  <h3 className="font-semibold text-foreground text-sm">{story.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{story.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px]">
                    <Badge variant="outline" className="text-[10px] text-sema-green border-sema-green/30">
                      ✅ Resolved
                    </Badge>
                    <span className="text-muted-foreground">{story.date}</span>
                    <span className="text-sema-yellow-warm font-bold">{story.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="gradient-hero py-10">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-primary-foreground">Citizen</h1>
              <p className="text-sm text-primary-foreground/60">+255 7XX XXX XXX</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-6">
        {/* Impact stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {impactStats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My reports */}
        <h2 className="text-lg font-heading font-bold text-foreground mb-4">My Reports</h2>
        <div className="space-y-3">
          {mockReports.slice(0, 3).map((report) => (
            <div key={report.id} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{report.title}</p>
                <p className="text-xs text-muted-foreground">{categoryLabels[report.category]} · {report.location}</p>
              </div>
              <Badge className={`${statusColors[report.status]} text-[10px] whitespace-nowrap`}>
                {statusLabels[report.status]}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
