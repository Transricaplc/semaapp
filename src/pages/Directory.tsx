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
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-badge font-heading uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Parliament Directory
          </div>
          <h1 className="text-h1 md:text-h1-lg font-heading text-white mb-2">The Yellow Book</h1>
          <p className="text-body font-body text-yb-charcoal-muted mb-8 max-w-xl mx-auto">Find and contact your Members of Parliament. Filter by region, district, or constituency.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input placeholder="Search by name or constituency..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-12 min-h-[52px] bg-yb-charcoal-mid text-white border-primary rounded-xl text-body font-body placeholder:text-yb-charcoal-muted" />
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-6">
        {/* Horizontal filter pills */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2 min-h-[40px] font-body">
            <Filter className="w-4 h-4" /> Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive font-body"><X className="w-3.5 h-3.5" /> Clear</Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-meta font-body text-muted-foreground">{filtered.length} of {allOfficials.length} officials</span>
            <Button variant="ghost" size="sm" onClick={() => setShowAdmin(!showAdmin)} className="gap-1.5 text-meta font-body"><Info className="w-3.5 h-3.5" /> Admin</Button>
          </div>
        </div>

        {showAdmin && (
          <div className="yb-card p-5 mb-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-h3 text-foreground mb-1">Data Sync Status</h3>
                <p className="text-meta font-body text-muted-foreground">Manage the official contacts database</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10">
                <RefreshCw className="w-4 h-4 text-accent" />
                <span className="text-meta font-body font-medium text-accent">Synced</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Version", value: meta.version },
                { label: "Last Updated", value: meta.last_updated },
                { label: "Total Records", value: String(allOfficials.length) },
                { label: "Source", value: meta.source },
              ].map((item) => (
                <div key={item.label} className="bg-secondary rounded-lg p-3">
                  <div className="text-meta font-body text-muted-foreground">{item.label}</div>
                  <div className="font-body font-semibold text-foreground text-meta">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showFilters && (
          <div className="yb-card p-4 md:p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Region", value: selectedRegion, onChange: handleRegionChange, options: allRegions, placeholder: "All Regions" },
                { label: "District", value: selectedDistrict, onChange: handleDistrictChange, options: availableDistricts, placeholder: selectedRegion ? "All Districts" : "Select region first", disabled: !selectedRegion },
                { label: "Constituency", value: selectedConstituency, onChange: setSelectedConstituency, options: availableConstituencies, placeholder: selectedDistrict ? "All Constituencies" : "Select district first", disabled: !selectedDistrict },
                { label: "Party", value: selectedParty, onChange: setSelectedParty, options: allParties, placeholder: "All Parties" },
                { label: "Role", value: selectedRole, onChange: setSelectedRole, options: allRoles, placeholder: "All Roles" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-meta font-body font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
                  <select value={f.value} onChange={(e) => f.onChange(e.target.value)} disabled={(f as any).disabled}
                    className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-3 text-body font-body disabled:opacity-50 min-h-[48px]">
                    <option value="">{f.placeholder}</option>
                    {f.options.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary opacity-60" />
            </div>
            <p className="font-heading text-h3 text-foreground">No officials found in this area yet</p>
            <p className="text-meta font-body mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          Object.entries(groupedByRegion).sort(([a], [b]) => a.localeCompare(b)).map(([region, items]) => (
            <div key={region} className="mb-8">
              <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                <MapPin className="w-4 h-4" />
                <h2 className="text-h3 font-heading">{region}</h2>
                <span className="text-meta font-body text-yb-charcoal-muted ml-1">({items.length} {items.length === 1 ? "official" : "officials"})</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="yb-card p-4 md:p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-yb-charcoal-mid flex items-center justify-center shrink-0">
          {official.profile_image_url ? (
            <img src={official.profile_image_url} alt={official.name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <span className="text-xl font-heading font-bold text-primary">{official.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-h3 text-foreground truncate">{official.name}</h3>
          <p className="text-meta font-body text-muted-foreground truncate">{official.title_role} — {official.constituency}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1 text-meta font-body text-muted-foreground">
              <MapPin className="w-3 h-3" />{official.district} · {official.region}
            </span>
            <span className={`text-badge badge-role px-2 py-0.5 rounded-md ${partyColor(official.political_party)}`}>{official.political_party}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <a href={`tel:${official.phone}`} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-meta font-body font-semibold hover:bg-yb-yellow-deep transition-colors flex-1 justify-center min-h-[44px]">
          <Phone className="w-4 h-4" /> Call
        </a>
        <a href={`mailto:${official.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-meta font-body font-medium hover:bg-secondary transition-colors flex-1 justify-center min-h-[44px]">
          <Mail className="w-4 h-4" /> Email
        </a>
      </div>
    </div>
  );
}