import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2, MapPin, WifiOff, Users } from "lucide-react";
import {
  locationsApi,
  type District,
  type Region,
  type Ward,
} from "@/lib/locationsApi";
import { useLocationStore } from "@/store/locationStore";
import LocationBreadcrumb from "@/components/LocationBreadcrumb";
import { useOfficialsByLocation } from "@/hooks/useOfficialsByLocation";

type View = "regions" | "districts" | "wards" | "officials";

export default function Orodha() {
  const store = useLocationStore();
  const [view, setView] = useState<View>("regions");
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resync view if user uses breadcrumb to jump back
  useEffect(() => {
    if (!store.selectedRegion) setView("regions");
    else if (!store.selectedDistrict) setView("districts");
    else if (!store.selectedWard) setView("wards");
    else setView("officials");
  }, [store.selectedRegion, store.selectedDistrict, store.selectedWard]);

  const byName = <T extends { name: string }>(a: T, b: T) =>
    a.name.localeCompare(b.name, "sw", { sensitivity: "base", numeric: true });

  const goRegion = async (r: Region) => {
    store.setSelectedRegion(r);
    setLoading(true);
    setError(null);
    try {
      const res = await locationsApi.getRegionDistricts(r.regionCode);
      setDistricts([...res.data].sort(byName));
      setView("districts");
    } catch (e) {
      setError(e instanceof Error ? e.message : "API error");
    } finally {
      setLoading(false);
    }
  };

  const goDistrict = async (d: District) => {
    store.setSelectedDistrict(d);
    setLoading(true);
    setError(null);
    try {
      const res = await locationsApi.getDistrictWards(d.districtCode);
      setWards([...res.data].sort(byName));
      setView("wards");
    } catch (e) {
      setError(e instanceof Error ? e.message : "API error");
    } finally {
      setLoading(false);
    }
  };

  const goWard = (w: Ward) => {
    store.setSelectedWard(w);
    setView("officials");
  };

  // Regions sorted alphabetically (Swahili locale, case-insensitive).
  const sortedRegions = useMemo(
    () => [...store.allRegions].sort(byName),
    [store.allRegions],
  );

  return (
    <div className="font-body animate-fade-in pb-24">
      {/* Header */}
      <header
        className="px-4 pt-4 pb-3 bg-primary"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}
      >
        <h1 className="font-display text-[26px] leading-tight text-primary-foreground">
          Orodha ya Maeneo
        </h1>
        <p className="text-[12px] text-primary-foreground/70 mt-1">
          Tanzania · Mikoa 26 · Wilaya 158 · Kata 3,945
        </p>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-3 bg-card border-b border-border">
        <LocationBreadcrumb />
      </div>

      {!store.apiAvailable && (
        <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 text-[12px] text-destructive">
          <WifiOff className="w-3.5 h-3.5" />
          Huduma ya maeneo haipo · Unaona data iliyohifadhiwa
        </div>
      )}

      {error && (
        <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-[12px] text-destructive">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Body */}
      {!loading && view === "regions" && (
        <RegionGrid regions={store.allRegions} onSelect={goRegion} />
      )}

      {!loading && view === "districts" && (
        <RowList
          items={districts.map((d) => ({ key: d.districtCode, label: d.name, code: d.districtCode, onClick: () => goDistrict(d) }))}
          emptyLabel="Hakuna wilaya zilizopatikana"
        />
      )}

      {!loading && view === "wards" && (
        <RowList
          items={wards.map((w) => ({ key: w.wardCode, label: w.name, code: w.wardCode, onClick: () => goWard(w) }))}
          emptyLabel="Hakuna kata zilizopatikana"
        />
      )}

      {!loading && view === "officials" && <OfficialsForWard />}
    </div>
  );
}

function RegionGrid({ regions, onSelect }: { regions: Region[]; onSelect: (r: Region) => void }) {
  if (regions.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-[13px] text-muted-foreground">
        Mikoa inapakia…
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      {regions.map((r) => (
        <button
          key={r.regionCode}
          onClick={() => onSelect(r)}
          className="text-left bg-card border border-border border-l-4 border-l-primary rounded-xl p-4 min-h-[88px] flex flex-col justify-between active:opacity-65 transition-opacity"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-display text-[15px] text-foreground leading-tight">{r.name}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          </div>
          <code className="font-mono text-[10px] text-muted-foreground self-start px-1.5 py-0.5 rounded bg-secondary">
            {r.regionCode}
          </code>
        </button>
      ))}
    </div>
  );
}

interface Row { key: string; label: string; code?: string; onClick: () => void }

function RowList({ items, emptyLabel }: { items: Row[]; emptyLabel: string }) {
  if (items.length === 0) {
    return <div className="px-4 py-8 text-center text-[13px] text-muted-foreground">{emptyLabel}</div>;
  }
  return (
    <div className="px-4 py-3 space-y-2">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={it.onClick}
          className="w-full bg-card border border-border border-l-4 border-l-primary rounded-xl px-4 py-3 min-h-[52px] flex items-center gap-3 active:bg-secondary/40 transition-colors text-left"
        >
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="flex-1 font-body text-[14px] text-foreground truncate">{it.label}</span>
          {it.code && (
            <code className="font-mono text-[11px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary">
              {it.code}
            </code>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

function OfficialsForWard() {
  const { data, isLoading, error } = useOfficialsByLocation();
  const ward = useLocationStore((s) => s.selectedWard);
  const officials = useMemo(() => data ?? [], [data]);

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">
            Kata
          </p>
          <p className="font-display text-[18px] text-foreground leading-tight">
            {ward?.name}
          </p>
        </div>
        {ward?.wardCode && (
          <code className="font-mono text-[12px] font-semibold text-foreground px-2 py-1 rounded bg-secondary border border-primary/40">
            {ward.wardCode}
          </code>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <p className="text-[12px] text-destructive">
          Imeshindikana kupakia maofisa.
        </p>
      )}

      {!isLoading && !error && officials.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-[13px] text-foreground font-medium">
            Hakuna maofisa walioandikishwa
          </p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Kata {ward?.name} bado haina taarifa kwenye Sema.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {officials.map((o: any) => (
          <Link
            key={o.id}
            to={`/kiongozi/${o.id}`}
            className="block bg-card border border-border border-l-4 border-l-primary rounded-xl px-4 py-3 active:bg-secondary/40 transition-colors"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-display text-[15px] text-foreground leading-tight truncate">
                  {o.full_name}
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
                  {o.role_title}
                  {o.department ? ` · ${o.department}` : ""}
                </p>
                {o.phone && (
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">{o.phone}</p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
