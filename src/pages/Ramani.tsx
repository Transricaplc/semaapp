import { useState } from "react";
import { MapPin, Filter, Layers, AlertTriangle, Droplets, ShieldAlert, Landmark, Leaf, Sprout, PawPrint, GraduationCap, HeartPulse, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", label: "Zote", icon: Layers },
  { id: "barabara", label: "Barabara", icon: AlertTriangle },
  { id: "maji", label: "Maji", icon: Droplets },
  { id: "afya", label: "Afya", icon: HeartPulse },
  { id: "elimu", label: "Elimu", icon: GraduationCap },
  { id: "mazingira", label: "Mazingira", icon: Leaf },
  { id: "rushwa", label: "Rushwa", icon: Landmark },
  { id: "kilimo", label: "Kilimo", icon: Sprout },
  { id: "wanyamapori", label: "Wanyamapori", icon: PawPrint },
];

const mockPins = [
  { id: 1, lat: -6.8, lng: 39.28, title: "Barabara imeharibika Temeke", category: "barabara", reports: 12 },
  { id: 2, lat: -6.77, lng: 39.25, title: "Maji hayatoki siku 5", category: "maji", reports: 8 },
  { id: 3, lat: -6.82, lng: 39.29, title: "Hospitali haina dawa", category: "afya", reports: 23 },
  { id: 4, lat: -6.17, lng: 35.75, title: "Rushwa ofisi ya ardhi Dodoma", category: "rushwa", reports: 15 },
  { id: 5, lat: -6.79, lng: 39.22, title: "Shule haina madawati", category: "elimu", reports: 6 },
];

export default function Ramani() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = activeFilter === "all" ? mockPins : mockPins.filter(p => p.category === activeFilter);

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <section className="gradient-hero py-6">
        <div className="container text-center">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-primary-foreground">
            🗺️ Ramani ya Masuala
          </h1>
          <p className="text-primary-foreground/60 text-sm">Tazama ripoti zote kwenye ramani — View all reports on map</p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-card border-b border-border px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === cat.id
                  ? "bg-sema-red text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="flex-1 relative bg-sema-cream">
        {/* Simulated map background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        {/* Map pins */}
        {filtered.map((pin, i) => (
          <div
            key={pin.id}
            className="absolute animate-fade-in"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${15 + (i * 12)}%`,
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-sema-red flex items-center justify-center shadow-lg warm-glow-sm animate-pulse-gentle">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <Badge className="absolute -top-2 -right-2 bg-sema-yellow text-sema-earth text-[10px] px-1.5 min-w-[20px] justify-center">
                {pin.reports}
              </Badge>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card border border-border rounded-lg shadow-lg p-3 whitespace-nowrap text-xs">
                  <p className="font-semibold text-foreground">{pin.title}</p>
                  <p className="text-muted-foreground mt-0.5">{pin.reports} ripoti</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* OSM attribution placeholder */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sema-green/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sema-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Ripoti {filtered.length} kwenye ramani</p>
                <p className="text-xs text-muted-foreground">OpenStreetMap · Bonyeza pin kuona maelezo</p>
              </div>
              <Button size="sm" className="bg-sema-red text-primary-foreground text-xs">
                <Filter className="w-3 h-3 mr-1" /> Chuja
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
