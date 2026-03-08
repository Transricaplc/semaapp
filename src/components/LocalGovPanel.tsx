import { useState, useMemo } from "react";
import {
  MapPin,
  ChevronDown,
  ChevronRight,
  User,
  Phone,
  Search,
  AlertCircle,
  Building2,
  Users,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  localGovData,
  localGovStats,
  type LocalRegion,
  type LocalDistrict,
  type Ward,
} from "@/data/local_gov";

export default function LocalGovPanel() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filtered = useMemo(() => {
    let data = localGovData;
    if (selectedRegion) {
      data = data.filter((r) => r.region_en === selectedRegion);
    }
    if (search.length >= 2) {
      const q = search.toLowerCase();
      data = data
        .map((region) => {
          const matchedDistricts = region.districts
            .map((district) => {
              const districtMatch =
                district.district_en.toLowerCase().includes(q) ||
                district.ded_name.toLowerCase().includes(q) ||
                district.dc_name.toLowerCase().includes(q);
              const matchedWards = district.wards.filter(
                (w) =>
                  w.ward_en.toLowerCase().includes(q) ||
                  w.diwani_name.toLowerCase().includes(q) ||
                  w.weo_name.toLowerCase().includes(q)
              );
              if (districtMatch) return district;
              if (matchedWards.length > 0) return { ...district, wards: matchedWards };
              return null;
            })
            .filter(Boolean) as LocalDistrict[];
          if (matchedDistricts.length > 0) return { ...region, districts: matchedDistricts };
          return null;
        })
        .filter(Boolean) as LocalRegion[];
    }
    return data;
  }, [search, selectedRegion]);

  const totalDistricts = filtered.reduce((n, r) => n + r.districts.length, 0);
  const totalWards = filtered.reduce((n, r) => n + r.districts.reduce((m, d) => m + d.wards.length, 0), 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <h2 className="font-heading font-bold text-foreground">Local Government Panel</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, district, or ward..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-card border-border rounded-lg text-sm"
          />
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
        >
          <option value="">All Regions ({localGovData.length})</option>
          {localGovData.map((r) => (
            <option key={r.region_en} value={r.region_en}>{r.region_en}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" /> Regions: {filtered.length}</span>
        <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-primary" /> Districts: {totalDistricts}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3 text-gold" /> Wards: {totalWards}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <User className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="font-medium">No results found</p>
          <p className="text-sm mt-1">Try changing your search or region filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((region) => (
            <RegionAccordion key={region.region_en} region={region} />
          ))}
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/20 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Many Councillor and WEO names are still being added to the system.</p>
          <p className="text-xs text-muted-foreground mt-0.5">Help fellow citizens — report missing data.</p>
        </div>
        <Button asChild size="sm" className="gap-1.5 gradient-green text-accent-foreground shrink-0">
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
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 bg-card hover:bg-secondary/50 transition-colors text-left">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-foreground text-sm">{region.region_en}</h3>
          <p className="text-[11px] text-muted-foreground">
            {region.districts.length} councils · {region.districts.reduce((n, d) => n + d.wards.length, 0)} wards
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border bg-secondary/20 animate-fade-in">
          {region.districts.map((district) => (
            <DistrictBlock key={district.district_en} district={district} />
          ))}
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
          <Building2 className="w-4 h-4 text-primary shrink-0" />
          <h4 className="font-semibold text-foreground text-sm">{district.district_en}</h4>
          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-primary/10 text-primary border border-primary/20">
            {councilTypes[district.council_type] || district.council_type}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <User className="w-3.5 h-3.5 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground">District Executive Director</p>
              <p className="text-xs font-semibold text-foreground truncate">{district.ded_name}</p>
            </div>
            {district.ded_phone && (
              <a href={`tel:${district.ded_phone}`} className="ml-auto shrink-0 p-1.5 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                <Phone className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <User className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground">District Commissioner</p>
              <p className="text-xs font-semibold text-foreground truncate">{district.dc_name}</p>
            </div>
          </div>
        </div>
        {district.wards.length > 0 && (
          <button onClick={() => setWardsOpen(!wardsOpen)} className="flex items-center gap-1.5 mt-2.5 ml-6 text-xs font-medium text-accent hover:underline">
            {wardsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {district.wards.length} Wards
          </button>
        )}
        {wardsOpen && (
          <div className="mt-2 ml-6 space-y-1.5 animate-fade-in">
            {district.wards.map((ward) => (
              <WardRow key={ward.ward_en} ward={ward} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WardRow({ ward }: { ward: Ward }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-3 py-2 rounded-lg bg-card/60 border border-border/50 text-xs">
      <div className="flex items-center gap-1.5 font-medium text-foreground min-w-[120px]">
        <MapPin className="w-3 h-3 text-gold" />
        {ward.ward_en}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
        <span><span className="text-[10px] font-medium text-foreground/60">Councillor:</span> {ward.diwani_name}</span>
        <span><span className="text-[10px] font-medium text-foreground/60">WEO:</span> {ward.weo_name}</span>
      </div>
    </div>
  );
}
