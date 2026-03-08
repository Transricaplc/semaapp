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
  officials,
  searchOfficials,
  roleTypeLabels,
  roleBadgeColors,
  directoryStats,
  allRegionNames,
  districtsByRegion,
  getContact,
  type Official,
  type RoleType,
} from "@/data/unified_officials";
import OfficialCard from "@/components/OfficialCard";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import LocalGovPanel from "@/components/LocalGovPanel";

// ============================================================
// TAB CONFIG — maps to sets of role_types
// ============================================================

type DirectoryTab = "executive" | "parliament" | "localGov" | "judiciary";

const tabs: { value: DirectoryTab; label: string; icon: React.ElementType; roleTypes: RoleType[] }[] = [
  { value: "executive", label: "Executive", icon: Building2, roleTypes: ["PRESIDENT", "MINISTER", "DEPUTY_MINISTER", "PERMANENT_SECRETARY", "COMMISSIONER"] },
  { value: "parliament", label: "Parliament", icon: Landmark, roleTypes: ["MP", "SPEAKER"] },
  { value: "localGov", label: "Local Government", icon: MapPin, roleTypes: ["MUNICIPAL_DIRECTOR"] },
  { value: "judiciary", label: "Judiciary & Security", icon: Scale, roleTypes: ["JUDGE", "POLICE", "ANTI_CORRUPTION"] },
];

export default function SerikaliDirectory() {
  const [activeTab, setActiveTab] = useState<DirectoryTab>("executive");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const currentTab = tabs.find(t => t.value === activeTab)!;
  const availableDistricts = selectedRegion ? districtsByRegion[selectedRegion] || [] : [];

  const handleRegionChange = (val: string) => {
    setSelectedRegion(val);
    setSelectedDistrict("");
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedRegion("");
    setSelectedDistrict("");
  };

  const hasActiveFilters = search || selectedRegion || selectedDistrict;

  const filtered = useMemo(() => {
    return officials.filter((o) => {
      const matchTab = currentTab.roleTypes.includes(o.role_type);
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        o.full_name.toLowerCase().includes(q) ||
        o.role_title.toLowerCase().includes(q) ||
        o.institution.ministry.toLowerCase().includes(q) ||
        o.institution.office_address.toLowerCase().includes(q) ||
        o.location.region.toLowerCase().includes(q);
      const matchRegion = !selectedRegion || o.location.region === selectedRegion;
      const matchDistrict = !selectedDistrict || o.location.district === selectedDistrict;
      return matchTab && matchSearch && matchRegion && matchDistrict;
    });
  }, [activeTab, search, selectedRegion, selectedDistrict, currentTab.roleTypes]);

  // Group by role_type for display
  const grouped = useMemo(() => {
    const groups: Record<string, Official[]> = {};
    filtered.forEach((o) => {
      const key = roleTypeLabels[o.role_type];
      if (!groups[key]) groups[key] = [];
      groups[key].push(o);
    });
    return groups;
  }, [filtered]);

  const totalForTab = officials.filter(o => currentTab.roleTypes.includes(o.role_type)).length;

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="gradient-navy py-10 md:py-14">
        <div className="container max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            United Republic of Tanzania
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
            National Directory
          </h1>
          <p className="text-primary-foreground/60 mb-8 max-w-xl mx-auto">
            Search and connect with your leaders — by name, region, or role
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, ministry, or region..."
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
          onValueChange={(v) => setActiveTab(v as DirectoryTab)}
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

        {/* Filters toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive">
              <X className="w-3.5 h-3.5" /> Clear Filters
            </Button>
          )}

          <span className="ml-auto text-sm text-muted-foreground">
            {filtered.length} of {totalForTab} officials
          </span>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="glass-card rounded-xl p-4 md:p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
                >
                  <option value="">All Regions</option>
                  {allRegionNames.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedRegion || availableDistricts.length === 0}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50"
                >
                  <option value="">{selectedRegion ? "All Districts" : "Select region first"}</option>
                  {availableDistricts.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results — LocalGov gets special panel */}
        {activeTab === "localGov" ? (
          <LocalGovPanel />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No results found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          Object.entries(grouped).map(([groupLabel, items]) => (
            <div key={groupLabel} className="mb-8">
              <h2 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-gold" />
                {groupLabel}
                <span className="text-sm font-body font-normal text-muted-foreground">
                  ({items.length})
                </span>
              </h2>
              <div className="grid gap-3">
                {items.map((official) => (
                  <OfficialCard key={official.id} official={official} />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Data source footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-border pt-6">
          <p>
            Directory: {directoryStats.totalOfficials} officials · {directoryStats.totalMPs} MPs · {directoryStats.totalMinisters} Ministers · Last verified: 2026-03-08
          </p>
        </div>
      </div>
    </div>
  );
}
