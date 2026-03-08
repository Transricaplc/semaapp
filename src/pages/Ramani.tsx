import { useState } from "react";
import { MapPin, Filter, Layers, AlertTriangle, Droplets, Landmark, Leaf, Sprout, PawPrint, GraduationCap, HeartPulse, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Ramani() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [view, setView] = useState<"map" | "chart">("map");

  const categories = [
    { id: "all", label: "All", icon: Layers, color: "hsl(var(--primary))" },
    { id: "barabara", label: "Roads", icon: AlertTriangle, color: "#FF9F0A" },
    { id: "maji", label: "Water", icon: Droplets, color: "#0A84FF" },
    { id: "afya", label: "Health", icon: HeartPulse, color: "#FF3B30" },
    { id: "elimu", label: "Education", icon: GraduationCap, color: "#34C759" },
    { id: "mazingira", label: "Environment", icon: Leaf, color: "#30D158" },
    { id: "rushwa", label: "Corruption", icon: Landmark, color: "#AF52DE" },
    { id: "kilimo", label: "Agriculture", icon: Sprout, color: "#FFD60A" },
    { id: "wanyamapori", label: "Wildlife", icon: PawPrint, color: "#AC8E68" },
  ];

  const mockPins = [
    { id: 1, lat: -6.8, lng: 39.28, title: "Damaged road in Temeke", category: "barabara", reports: 12, region: "Dar es Salaam" },
    { id: 2, lat: -6.77, lng: 39.25, title: "No water for 5 days", category: "maji", reports: 8, region: "Dar es Salaam" },
    { id: 3, lat: -6.82, lng: 39.29, title: "Hospital has no medicine", category: "afya", reports: 23, region: "Dar es Salaam" },
    { id: 4, lat: -6.17, lng: 35.75, title: "Corruption at Dodoma land office", category: "rushwa", reports: 15, region: "Dodoma" },
    { id: 5, lat: -6.79, lng: 39.22, title: "School has no desks", category: "elimu", reports: 6, region: "Dar es Salaam" },
    { id: 6, lat: -2.52, lng: 32.9, title: "Fishing rights dispute", category: "mazingira", reports: 9, region: "Mwanza" },
    { id: 7, lat: -8.9, lng: 33.46, title: "Farm subsidy delays", category: "kilimo", reports: 18, region: "Mbeya" },
    { id: 8, lat: -3.37, lng: 36.68, title: "Poaching near Ngorongoro", category: "wanyamapori", reports: 11, region: "Arusha" },
  ];

  const filtered = activeFilter === "all" ? mockPins : mockPins.filter(p => p.category === activeFilter);

  // Chart data: reports by category
  const chartData = categories
    .filter(c => c.id !== "all")
    .map(cat => ({
      name: cat.label,
      reports: mockPins.filter(p => p.category === cat.id).reduce((sum, p) => sum + p.reports, 0),
      color: cat.color,
    }))
    .filter(d => d.reports > 0)
    .sort((a, b) => b.reports - a.reports);

  const getCategoryColor = (catId: string) => categories.find(c => c.id === catId)?.color || "hsl(var(--primary))";
  const getCategoryIcon = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : MapPin;
  };

  // Pin positions spread across a "map" more naturally
  const pinPositions = [
    { left: "62%", top: "35%" },
    { left: "55%", top: "28%" },
    { left: "68%", top: "42%" },
    { left: "38%", top: "22%" },
    { left: "50%", top: "38%" },
    { left: "28%", top: "18%" },
    { left: "20%", top: "58%" },
    { left: "45%", top: "12%" },
  ];

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <section className="bg-yb-charcoal py-4 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-h2 font-heading text-primary">Issues Map</h1>
            <p className="text-meta font-body text-muted-foreground">Citizen reports across Tanzania</p>
          </div>
          <div className="flex gap-1 bg-yb-mid-charcoal rounded-lg p-1">
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-meta font-body font-medium transition-all ${
                view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> Map
            </button>
            <button
              onClick={() => setView("chart")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-meta font-body font-medium transition-all ${
                view === "chart" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Stats
            </button>
          </div>
        </div>
      </section>

      {/* Filter pills */}
      <div className="bg-card border-b border-border px-4 py-2">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-meta font-body font-medium whitespace-nowrap transition-all min-h-[40px] ${
                activeFilter === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}>
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 relative overflow-hidden">
        {view === "map" ? (
          /* ─── MAP VIEW ─── */
          <div className="absolute inset-0 bg-[#1a2332]">
            {/* Stylized map background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              {/* Tanzania outline simplified */}
              <path d="M350,80 L420,60 L480,90 L520,80 L560,100 L580,150 L600,200 L590,260 L610,300 L600,350 L580,400 L540,420 L500,450 L460,470 L420,480 L380,460 L340,430 L310,400 L290,350 L280,300 L290,250 L310,200 L320,150 L330,110 Z"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Lake Victoria */}
              <ellipse cx="300" cy="150" rx="50" ry="35" fill="hsl(var(--primary))" opacity="0.08" />
              {/* Grid lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.3" />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="600" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.3" />
              ))}
            </svg>

            {/* Region labels */}
            <div className="absolute text-[10px] font-mono text-primary/30 tracking-wider" style={{ left: "55%", top: "30%" }}>DAR ES SALAAM</div>
            <div className="absolute text-[10px] font-mono text-primary/30 tracking-wider" style={{ left: "35%", top: "18%" }}>DODOMA</div>
            <div className="absolute text-[10px] font-mono text-primary/30 tracking-wider" style={{ left: "22%", top: "12%" }}>MWANZA</div>
            <div className="absolute text-[10px] font-mono text-primary/30 tracking-wider" style={{ left: "15%", top: "55%" }}>MBEYA</div>
            <div className="absolute text-[10px] font-mono text-primary/30 tracking-wider" style={{ left: "42%", top: "8%" }}>ARUSHA</div>

            {/* Map pins */}
            {filtered.map((pin, i) => {
              const pos = pinPositions[pin.id - 1] || { left: `${20 + i * 10}%`, top: `${20 + i * 8}%` };
              const Icon = getCategoryIcon(pin.category);
              const isSelected = selectedPin === pin.id;
              return (
                <div key={pin.id} className="absolute animate-fade-in transition-all duration-300" style={pos}>
                  <button
                    onClick={() => setSelectedPin(isSelected ? null : pin.id)}
                    className="relative group"
                  >
                    {/* Pulse ring */}
                    <div className="absolute -inset-2 rounded-full animate-ping opacity-20" style={{ backgroundColor: getCategoryColor(pin.category) }} />
                    {/* Pin */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform ${isSelected ? "scale-125" : "group-hover:scale-110"}`}
                      style={{ backgroundColor: getCategoryColor(pin.category) }}
                    >
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    {/* Report count */}
                    <span className="absolute -top-1.5 -right-1.5 bg-card text-foreground text-[10px] font-heading font-bold w-5 h-5 rounded-full flex items-center justify-center shadow border border-border">
                      {pin.reports}
                    </span>
                  </button>

                  {/* Tooltip */}
                  {isSelected && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 animate-fade-in">
                      <div className="bg-card border-l-4 border-border rounded-lg shadow-xl p-3 w-56" style={{ borderLeftColor: getCategoryColor(pin.category) }}>
                        <div className="flex items-start gap-2">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getCategoryColor(pin.category) + "20" }}>
                            <Icon className="w-3.5 h-3.5" style={{ color: getCategoryColor(pin.category) }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading text-h3 text-foreground leading-tight">{pin.title}</p>
                            <p className="text-meta font-body text-muted-foreground mt-1">{pin.region} · {pin.reports} reports</p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-border flex gap-2">
                          <Button size="sm" className="flex-1 bg-primary text-primary-foreground text-[11px] h-8 font-body">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="text-[11px] h-8 font-body border-border">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom summary card */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading text-h3 text-foreground">{filtered.length} active reports</p>
                    <p className="text-meta font-body text-muted-foreground">Tap a pin to see details</p>
                  </div>
                  <Button size="sm" onClick={() => setView("chart")} className="bg-primary text-primary-foreground text-meta font-body font-semibold hover:bg-yb-yellow-deep min-h-[40px]">
                    <BarChart3 className="w-3.5 h-3.5 mr-1" /> Stats
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ─── CHART VIEW ─── */
          <div className="absolute inset-0 bg-background overflow-y-auto p-4">
            <div className="max-w-[1200px] mx-auto space-y-6">
              {/* Summary cards row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-primary">
                  <p className="text-meta font-body text-muted-foreground">Total Reports</p>
                  <p className="text-h1 font-heading text-foreground mt-1">{mockPins.reduce((s, p) => s + p.reports, 0)}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
                  <p className="text-meta font-body text-muted-foreground">Critical</p>
                  <p className="text-h1 font-heading text-destructive mt-1">
                    {mockPins.filter(p => p.reports >= 15).length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-[#0A84FF]">
                  <p className="text-meta font-body text-muted-foreground">Regions</p>
                  <p className="text-h1 font-heading text-foreground mt-1">
                    {new Set(mockPins.map(p => p.region)).size}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-[#34C759]">
                  <p className="text-meta font-body text-muted-foreground">Categories</p>
                  <p className="text-h1 font-heading text-foreground mt-1">
                    {new Set(mockPins.map(p => p.category)).size}
                  </p>
                </div>
              </div>

              {/* Bar chart */}
              <div className="bg-card border border-border rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h2 className="text-h3 font-heading text-foreground">Reports by Category</h2>
                </div>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16, top: 8, bottom: 8 }}>
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#6E6E73", fontSize: 12, fontFamily: "DM Sans" }} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={90} tick={{ fill: "#1C1C1E", fontSize: 13, fontFamily: "DM Sans", fontWeight: 500 }} />
                      <Tooltip
                        cursor={{ fill: "hsl(var(--primary) / 0.08)" }}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontFamily: "DM Sans",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.12)"
                        }}
                      />
                      <Bar dataKey="reports" radius={[0, 6, 6, 0]} barSize={28}>
                        {chartData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Issues list */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-yb-charcoal">
                  <h2 className="text-h3 font-heading text-primary">All Reports</h2>
                </div>
                <div className="divide-y divide-border">
                  {filtered.map((pin) => {
                    const Icon = getCategoryIcon(pin.category);
                    return (
                      <div key={pin.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getCategoryColor(pin.category) + "18" }}>
                          <Icon className="w-4 h-4" style={{ color: getCategoryColor(pin.category) }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading text-body text-foreground truncate">{pin.title}</p>
                          <p className="text-meta font-body text-muted-foreground">{pin.region}</p>
                        </div>
                        <Badge className="text-badge font-heading bg-secondary text-foreground">{pin.reports}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
