import { useState, useMemo } from "react";
import {
  Search, Filter, Phone, Mail, ChevronDown, User, MapPin, Landmark, RefreshCw, Info, X, BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  allOfficials, allRegions, districtsByRegion, constituenciesByDistrict,
  allParties, allRoles, meta, type OfficialContact,
} from "@/data/contacts";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const availableDistricts = selectedRegion ? districtsByRegion[selectedRegion] || [] : [];
  const availableConstituencies = selectedDistrict ? constituenciesByDistrict[selectedDistrict] || [] : [];

  const handleRegionChange = (val: string) => { setSelectedRegion(val); setSelectedDistrict(""); setSelectedConstituency(""); };
  const handleDistrictChange = (val: string) => { setSelectedDistrict(val); setSelectedConstituency(""); };
  const clearFilters = () => { setSelectedRegion(""); setSelectedDistrict(""); setSelectedConstituency(""); setSelectedParty(""); setSelectedRole(""); setSearch(""); };
  const hasActiveFilters = selectedRegion || selectedDistrict || selectedConstituency || selectedParty || selectedRole || search;

  const filtered = useMemo(() => {
    return allOfficials.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch = !q || o.name.toLowerCase().includes(q) || o.constituency.toLowerCase().includes(q) || o.district.toLowerCase().includes(q);
      const matchRegion = !selectedRegion || o.region === selectedRegion;
      const matchDistrict = !selectedDistrict || o.district === selectedDistrict;
      const matchConstituency = !selectedConstituency || o.constituency === selectedConstituency;
      const matchParty = !selectedParty || o.political_party === selectedParty;
      const matchRole = !selectedRole || o.title_role === selectedRole;
      return matchSearch && matchRegion && matchDistrict && matchConstituency && matchParty && matchRole;
    });
  }, [search, selectedRegion, selectedDistrict, selectedConstituency, selectedParty, selectedRole]);

  const groupedByRegion = useMemo(() => {
    const groups: Record<string, OfficialContact[]> = {};
    filtered.forEach((o) => { if (!groups[o.region]) groups[o.region] = []; groups[o.region].push(o); });
    return groups;
  }, [filtered]);

  const partyColor = (party: string) => {
    switch (party) {
      case "CCM": return "bg-primary/15 text-foreground border border-primary/25";
      case "CHADEMA": return "bg-yb-charcoal-mid text-white border border-yb-charcoal-soft";
      case "ACT-Wazalendo": return "bg-warning/15 text-warning border border-warning/25";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-yb-charcoal py-10 md:py-14">
        <div className="container max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Parliament Directory
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">The Yellow Book</h1>
          <p className="text-yb-charcoal-muted mb-8 max-w-xl mx-auto">Find and contact your Members of Parliament. Filter by region, district, or constituency.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input placeholder="Search by name or constituency..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-yb-charcoal-mid text-white border-primary rounded-xl text-base placeholder:text-yb-charcoal-muted" />
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="w-4 h-4" /> Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive"><X className="w-3.5 h-3.5" /> Clear</Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{filtered.length} of {allOfficials.length} officials</span>
            <Button variant="ghost" size="sm" onClick={() => setShowAdmin(!showAdmin)} className="gap-1.5 text-xs"><Info className="w-3.5 h-3.5" /> Admin</Button>
          </div>
        </div>

        {showAdmin && (
          <div className="yb-card p-5 mb-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Data Sync Status</h3>
                <p className="text-sm text-muted-foreground">Manage the official contacts database</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10">
                <RefreshCw className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Synced</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
              {[
                { label: "Version", value: meta.version },
                { label: "Last Updated", value: meta.last_updated },
                { label: "Total Records", value: String(allOfficials.length) },
                { label: "Source", value: meta.source },
              ].map((item) => (
                <div key={item.label} className="bg-secondary rounded-lg p-3">
                  <div className="text-muted-foreground text-xs">{item.label}</div>
                  <div className="font-semibold text-foreground text-xs">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showFilters && (
          <div className="yb-card p-4 md:p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Region</label>
                <select value={selectedRegion} onChange={(e) => handleRegionChange(e.target.value)} className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm">
                  <option value="">All Regions</option>
                  {allRegions.map((r) => (<option key={r} value={r}>{r}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">District</label>
                <select value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)} disabled={!selectedRegion} className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50">
                  <option value="">{selectedRegion ? "All Districts" : "Select region first"}</option>
                  {availableDistricts.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Constituency</label>
                <select value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)} disabled={!selectedDistrict} className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50">
                  <option value="">{selectedDistrict ? "All Constituencies" : "Select district first"}</option>
                  {availableConstituencies.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Party</label>
                <select value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)} className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm">
                  <option value="">All Parties</option>
                  {allParties.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm">
                  <option value="">All Roles</option>
                  {allRoles.map((r) => (<option key={r} value={r}>{r}</option>))}
                </select>
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary opacity-60" />
            </div>
            <p className="font-medium text-foreground">No officials found in this area yet</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          Object.entries(groupedByRegion).sort(([a], [b]) => a.localeCompare(b)).map(([region, items]) => (
            <div key={region} className="mb-8">
              <div className="bg-yb-charcoal text-primary px-4 py-2.5 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                <MapPin className="w-4 h-4" />
                <h2 className="text-base font-heading font-bold">{region}</h2>
                <span className="text-sm font-normal text-yb-charcoal-muted ml-1">({items.length} {items.length === 1 ? "official" : "officials"})</span>
              </div>
              <div className="grid gap-3">
                {items.map((official) => (
                  <DirectoryOfficialCard key={official.id} official={official} partyColor={partyColor} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DirectoryOfficialCard({ official, partyColor }: { official: OfficialContact; partyColor: (party: string) => string }) {
  return (
    <div className="yb-card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-yb-charcoal-mid flex items-center justify-center shrink-0">
        {official.profile_image_url ? (
          <img src={official.profile_image_url} alt={official.name} className="w-full h-full rounded-xl object-cover" />
        ) : (
          <span className="text-xl font-bold text-primary">{official.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">{official.name}</h3>
        <p className="text-sm text-muted-foreground">{official.title_role} — {official.constituency}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />{official.district}, {official.region}
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${partyColor(official.political_party)}`}>{official.political_party}</span>
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 shrink-0">
        <a href={`tel:${official.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-yb-yellow-deep transition-colors">
          <Phone className="w-4 h-4" /><span className="hidden sm:inline">Call</span>
        </a>
        <a href={`mailto:${official.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
          <Mail className="w-4 h-4" /><span className="hidden sm:inline">Email</span>
        </a>
      </div>
    </div>
  );
}
