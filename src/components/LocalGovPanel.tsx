import { useState, useMemo } from "react";
import {
  MapPin, ChevronDown, ChevronRight, User, Phone, Search, AlertCircle, Building2, Users, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { localGovData, localGovStats, type LocalRegion, type LocalDistrict, type Ward } from "@/data/local_gov";

export default function LocalGovPanel() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filtered = useMemo(() => {
    let data = localGovData;
    if (selectedRegion) data = data.filter((r) => r.region_en === selectedRegion);
    if (search.length >= 2) {
      const q = search.toLowerCase();
      data = data.map((region) => {
        const matchedDistricts = region.districts.map((district) => {
          const districtMatch = district.district_en.toLowerCase().includes(q) || district.ded_name.toLowerCase().includes(q) || district.dc_name.toLowerCase().includes(q);
          const matchedWards = district.wards.filter((w) => w.ward_en.toLowerCase().includes(q) || w.diwani_name.toLowerCase().includes(q) || w.weo_name.toLowerCase().includes(q));
          if (districtMatch) return district;
          if (matchedWards.length > 0) return { ...district, wards: matchedWards };
          return null;
        }).filter(Boolean) as LocalDistrict[];
        if (matchedDistricts.length > 0) return { ...region, districts: matchedDistricts };
        return null;
      }).filter(Boolean) as LocalRegion[];
    }
    return data;
  }, [search, selectedRegion]);

  const totalDistricts = filtered.reduce((n, r) => n + r.districts.length, 0);
  const totalWards = filtered.reduce((n, r) => n + r.districts.reduce((m, d) => m + d.wards.length, 0), 0);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <h2 className="font-heading text-h2 text-foreground">Local Government Panel</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, district, or ward..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 min-h-[48px] bg-card border-border rounded-lg text-body font-body" />
        </div>
        <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-3 text-body font-body min-h-[48px]">
          <option value="">All Regions ({localGovData.length})</option>
          {localGovData.map((r) => <option key={r.region_en} value={r.region_en}>{r.region_en}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-5 text-meta font-body text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> Regions: {filtered.length}</span>
        <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-foreground" /> Districts: {totalDistricts}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3 text-primary" /> Wards: {totalWards}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <User className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="font-heading text-h3 text-foreground">No results found</p>
          <p className="text-meta font-body mt-1">Try changing your search or region filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((region) => <RegionAccordion key={region.region_en} region={region} />)}
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-body font-medium text-body text-foreground">Many Councillor and WEO names are still being added to the system.</p>
          <p className="text-meta font-body text-muted-foreground mt-0.5">Help fellow citizens — report missing data.</p>
        </div>
        <Button asChild size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold shrink-0 min-h-[40px]">
          <Link to="/report"><ExternalLink className="w-3.5 h-3.5" /> Report Missing Data</Link>
        </Button>
      </div>
    </div>
  );
}

function RegionAccordion({ region }: { region: LocalRegion }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-4 bg-yb-charcoal text-left hover:bg-yb-charcoal-mid transition-colors min-h-[56px]">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-h3 text-primary">{region.region_en}</h3>
          <p className="text-meta font-body text-yb-charcoal-muted">
            {region.districts.length} councils · {region.districts.reduce((n, d) => n + d.wards.length, 0)} wards
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border bg-secondary/20 animate-fade-in">
          {region.districts.map((district) => <DistrictBlock key={district.district_en} district={district} />)}
        </div>
      )}
    </div>
  );
}

function DistrictBlock({ district }: { district: LocalDistrict }) {
  const [wardsOpen, setWardsOpen] = useState(false);
  const councilTypes: Record<string, string> = { MC: "Municipal Council", TC: "Town Council", DC: "District Council" };

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-foreground shrink-0" />
          <h4 className="font-heading text-h3 text-foreground">{district.district_en}</h4>
          <span className="text-badge badge-role px-2 py-0.5 rounded-md bg-primary/10 text-foreground border border-primary/20">
            {councilTypes[district.council_type] || district.council_type}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6">
          <div className="flex items-center gap-2 px-3 py-3 rounded-lg bg-card border border-border min-h-[48px]">
            <User className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-meta font-body font-medium text-muted-foreground">District Executive Director</p>
              <p className="font-body font-semibold text-meta text-foreground truncate">{district.ded_name}</p>
            </div>
            {district.ded_phone && (
              <a href={`tel:${district.ded_phone}`} className="ml-auto shrink-0 p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                <Phone className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-3 rounded-lg bg-card border border-border min-h-[48px]">
            <User className="w-3.5 h-3.5 text-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-meta font-body font-medium text-muted-foreground">District Commissioner</p>
              <p className="font-body font-semibold text-meta text-foreground truncate">{district.dc_name}</p>
            </div>
          </div>
        </div>
        {district.wards.length > 0 && (
          <button onClick={() => setWardsOpen(!wardsOpen)} className="flex items-center gap-1.5 mt-2.5 ml-6 text-meta font-body font-medium text-primary hover:underline min-h-[32px]">
            {wardsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {district.wards.length} Wards
          </button>
        )}
        {wardsOpen && (
          <div className="mt-2 ml-6 space-y-1.5 animate-fade-in">
            {district.wards.map((ward) => <WardRow key={ward.ward_en} ward={ward} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function WardRow({ ward }: { ward: Ward }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-3 py-2.5 rounded-lg bg-card/60 border border-border/50 min-h-[44px]">
      <div className="flex items-center gap-1.5 font-body font-medium text-meta text-foreground min-w-[120px]">
        <MapPin className="w-3 h-3 text-primary" />
        {ward.ward_en}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-meta font-body text-muted-foreground">
        <span><span className="font-medium text-foreground/60">Councillor:</span> {ward.diwani_name}</span>
        <span><span className="font-medium text-foreground/60">WEO:</span> {ward.weo_name}</span>
      </div>
    </div>
  );
}