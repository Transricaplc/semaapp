import { useState, useMemo } from "react";
import {
  Search,
  User,
  MapPin,
  Landmark,
  Building2,
  Scale,
  Shield,
  ChevronDown,
  X,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  viongoziWote,
  mikoa,
  wilayaByMkoa,
  ngaziZote,
  ngaziLabels,
  serikaliMeta,
  type Kiongozi,
  type Mhimili,
  type Ngazi,
} from "@/data/serikali";
import KiongoziCard from "@/components/KiongoziCard";
import ConstituencyFinder from "@/components/ConstituencyFinder";

// ============================================================
// TAB CONFIG
// ============================================================

const tabs: { value: Mhimili; label: string; icon: React.ElementType }[] = [
  { value: "Executive", label: "Serikali Kuu", icon: Building2 },
  { value: "Legislature", label: "Bunge", icon: Landmark },
  { value: "LocalGov", label: "Serikali za Mitaa", icon: MapPin },
  { value: "Judiciary", label: "Mahakama & Usalama", icon: Scale },
];

// Data completeness audit
const dataAudit: Record<Mhimili, { total: number; gaps: string[] }> = {
  Executive: {
    total: viongoziWote.filter((k) => k.mhimili === "Executive").length,
    gaps: [],
  },
  Legislature: {
    total: viongoziWote.filter((k) => k.mhimili === "Legislature").length,
    gaps: ["Wenyeviti wa Kamati"],
  },
  LocalGov: {
    total: viongoziWote.filter((k) => k.mhimili === "LocalGov").length,
    gaps: ["Wakurugenzi wa Halmashauri (DEDs)", "Madiwani wa Kata"],
  },
  Judiciary: {
    total: viongoziWote.filter((k) => k.mhimili === "Judiciary").length,
    gaps: [],
  },
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function SerikaliDirectory() {
  const [activeTab, setActiveTab] = useState<Mhimili>("Executive");
  const [search, setSearch] = useState("");
  const [selectedMkoa, setSelectedMkoa] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedNgazi, setSelectedNgazi] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const availableWilaya = selectedMkoa ? wilayaByMkoa[selectedMkoa] || [] : [];

  const handleMkoaChange = (val: string) => {
    setSelectedMkoa(val);
    setSelectedWilaya("");
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedMkoa("");
    setSelectedWilaya("");
    setSelectedNgazi("");
  };

  const hasActiveFilters = search || selectedMkoa || selectedWilaya || selectedNgazi;

  const filtered = useMemo(() => {
    return viongoziWote.filter((k) => {
      const matchTab = k.mhimili === activeTab;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        k.jina.toLowerCase().includes(q) ||
        k.wadhifa.toLowerCase().includes(q) ||
        k.ofisi.toLowerCase().includes(q) ||
        k.mkoa.toLowerCase().includes(q);
      const matchMkoa = !selectedMkoa || k.mkoa === selectedMkoa;
      const matchWilaya = !selectedWilaya || k.wilaya === selectedWilaya;
      const matchNgazi = !selectedNgazi || k.ngazi === selectedNgazi;
      return matchTab && matchSearch && matchMkoa && matchWilaya && matchNgazi;
    });
  }, [activeTab, search, selectedMkoa, selectedWilaya, selectedNgazi]);

  const grouped = useMemo(() => {
    const groups: Record<string, Kiongozi[]> = {};
    filtered.forEach((k) => {
      const key = k.ngazi;
      if (!groups[key]) groups[key] = [];
      groups[key].push(k);
    });
    return groups;
  }, [filtered]);

  const ngaziOrder: Ngazi[] = ["Kitaifa", "Mkoa", "Wilaya", "Jimbo/Kata"];
  const currentAudit = dataAudit[activeTab];

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="gradient-navy py-10 md:py-14">
        <div className="container max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            Jamhuri ya Muungano wa Tanzania
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
            Saraka ya Viongozi wa Taifa
          </h1>
          <p className="text-primary-foreground/60 mb-8 max-w-xl mx-auto">
            Saka na wasiliana na viongozi wako — Tafuta kwa jina, mkoa, au wadhifa
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Saka kwa jina, wadhifa, au eneo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-card text-foreground border-border rounded-xl text-base"
            />
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-6">
        {/* Constituency Finder */}
        <ConstituencyFinder />

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Mhimili)}
          className="mb-6"
        >
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto gap-1 bg-secondary p-1 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 py-2.5 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Data completeness notice */}
        {currentAudit.gaps.length > 0 && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gold/10 border border-gold/20 mb-4 text-sm">
            <AlertTriangle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-foreground">
                Taarifa {currentAudit.total} zimepatikana.
              </span>{" "}
              <span className="text-muted-foreground">
                Bado tunaongeza: {currentAudit.gaps.join(", ")}.
              </span>
            </div>
          </div>
        )}

        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Chuja Viongozi
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive">
              <X className="w-3.5 h-3.5" /> Ondoa Chuja
            </Button>
          )}

          <span className="ml-auto text-sm text-muted-foreground">
            Viongozi {filtered.length} kati ya {viongoziWote.filter((k) => k.mhimili === activeTab).length}
          </span>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="glass-card rounded-xl p-4 md:p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chagua Mkoa</label>
                <select
                  value={selectedMkoa}
                  onChange={(e) => handleMkoaChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
                >
                  <option value="">Mikoa Yote</option>
                  {mikoa.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chagua Wilaya</label>
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  disabled={!selectedMkoa || availableWilaya.length === 0}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50"
                >
                  <option value="">{selectedMkoa ? "Wilaya Zote" : "Chagua mkoa kwanza"}</option>
                  {availableWilaya.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chagua Ngazi</label>
                <select
                  value={selectedNgazi}
                  onChange={(e) => setSelectedNgazi(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
                >
                  <option value="">Ngazi Zote</option>
                  {ngaziZote.map((n) => (
                    <option key={n} value={n}>{ngaziLabels[n]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Hakuna matokeo</p>
            <p className="text-sm mt-1">Jaribu kubadilisha utafutaji au chuja</p>
          </div>
        ) : (
          ngaziOrder
            .filter((n) => grouped[n])
            .map((ngazi) => (
              <div key={ngazi} className="mb-8">
                <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold" />
                  {ngaziLabels[ngazi]}
                  <span className="text-sm font-body font-normal text-muted-foreground">
                    ({grouped[ngazi].length})
                  </span>
                </h2>
                <div className="grid gap-3">
                  {grouped[ngazi].map((kiongozi) => (
                    <KiongoziCard key={kiongozi.id} kiongozi={kiongozi} />
                  ))}
                </div>
              </div>
            ))
        )}

        {/* Data source footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-border pt-6">
          <p>
            Taarifa: v{serikaliMeta.version} · Imesasishwa: {serikaliMeta.last_updated} · Chanzo: {serikaliMeta.source}
          </p>
        </div>
      </div>
    </div>
  );
}
