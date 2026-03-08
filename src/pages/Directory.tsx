import { useState, useMemo } from "react";
import { Search, Filter, Phone, Mail, ChevronDown, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { officials, regions, departments, levelLabels, type OfficialLevel, type Department } from "@/data/officials";

const levels: OfficialLevel[] = ["national", "regional", "district", "local"];

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedDept, setSelectedDept] = useState<Department | "All">("All");
  const [selectedLevel, setSelectedLevel] = useState<OfficialLevel | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return officials.filter((o) => {
      const matchSearch = search === "" || 
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.role.toLowerCase().includes(search.toLowerCase());
      const matchRegion = selectedRegion === "All Regions" || o.region === selectedRegion;
      const matchDept = selectedDept === "All" || o.department === selectedDept;
      const matchLevel = selectedLevel === "all" || o.level === selectedLevel;
      return matchSearch && matchRegion && matchDept && matchLevel;
    });
  }, [search, selectedRegion, selectedDept, selectedLevel]);

  const groupedByLevel = useMemo(() => {
    const groups: Record<string, typeof officials> = {};
    levels.forEach((l) => {
      const items = filtered.filter((o) => o.level === l);
      if (items.length > 0) groups[l] = items;
    });
    return groups;
  }, [filtered]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-navy py-12">
        <div className="container max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
            Kitabu cha Njano — The Yellow Book
          </h1>
          <p className="text-primary-foreground/60 mb-8">
            Find and contact your public servants across all levels of government
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tafuta kiongozi... Search by name or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-card text-foreground border-border rounded-xl text-base"
            />
          </div>
        </div>
      </section>

      <div className="container max-w-4xl py-8">
        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 gap-2"
        >
          <Filter className="w-4 h-4" />
          Chuja — Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </Button>

        {/* Filters */}
        {showFilters && (
          <div className="glass-card rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ngazi — Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as OfficialLevel | "all")}
                className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2 text-sm"
              >
                <option value="all">All Levels</option>
                {levels.map((l) => (
                  <option key={l} value={l}>{levelLabels[l]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mkoa — Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2 text-sm"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Idara — Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value as Department | "All")}
                className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2 text-sm"
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results */}
        {Object.keys(groupedByLevel).length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Hakuna matokeo — No results found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          Object.entries(groupedByLevel).map(([level, items]) => (
            <div key={level} className="mb-8">
              <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {levelLabels[level as OfficialLevel]}
                <span className="text-sm font-body font-normal text-muted-foreground">
                  ({items.length})
                </span>
              </h2>
              <div className="grid gap-3">
                {items.map((official) => (
                  <div
                    key={official.id}
                    className="glass-card rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{official.name}</h3>
                      <p className="text-sm text-muted-foreground">{official.role}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {official.region}
                        </span>
                        <span className="bg-secondary px-2 py-0.5 rounded-md">{official.department}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <a
                        href={`tel:${official.phone}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-green text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="hidden sm:inline">Piga Simu</span>
                      </a>
                      <a
                        href={`mailto:${official.email}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="hidden sm:inline">Barua Pepe</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
