import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Loader2, MapPin, User, X } from "lucide-react";
import { useUnifiedSearch } from "@/hooks/useUnifiedSearch";
import { useLocationStore } from "@/store/locationStore";
import type { SearchResult } from "@/lib/locationsApi";
import { resolveAndSelectLocation } from "@/lib/resolveLocation";

const TYPE_LABEL: Record<SearchResult["type"], { sw: string; color: string }> = {
  region:   { sw: "Mkoa",  color: "bg-primary/15 text-foreground" },
  district: { sw: "Wilaya", color: "bg-gov-blue/15 text-foreground" },
  ward:     { sw: "Kata",   color: "bg-verified-green/15 text-foreground" },
  place:    { sw: "Mtaa",   color: "bg-secondary text-foreground" },
};

export default function Tafuta() {
  const [q, setQ] = useState("");
  const { officialResults, locationResults, loading } = useUnifiedSearch(q);
  const [resolving, setResolving] = useState<string | null>(null);
  const navigate = useNavigate();
  // Subscribe so the component re-renders if the store updates mid-resolve.
  useLocationStore((s) => s.selectedRegion);

  const handleLocationSelect = async (r: SearchResult) => {
    const key = `${r.type}-${r.id}`;
    setResolving(key);
    try {
      await resolveAndSelectLocation(r);
      navigate("/orodha");
    } finally {
      setResolving(null);
    }
  };

  return (
    <div className="font-body animate-fade-in pb-24">
      <header
        className="px-4 pt-4 pb-4 bg-primary"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}
      >
        <h1 className="font-display text-[26px] leading-tight text-primary-foreground">
          Tafuta
        </h1>
        <p className="text-[12px] text-primary-foreground/70 mt-1">
          Viongozi, mikoa, wilaya, kata, mitaa
        </p>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tafuta jina, mkoa, kata, kode…"
            className="w-full pl-10 pr-10 py-3 min-h-[48px] rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search Sema"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-secondary text-muted-foreground"
              aria-label="Futa utafutaji"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Empty state */}
      {q.trim().length < 2 && (
        <div className="px-4 py-8 text-center">
          <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-[14px] text-foreground font-medium">Anza kuandika</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Andika herufi 2 au zaidi kuanza utafutaji
          </p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && q.trim().length >= 2 &&
        officialResults.length === 0 && locationResults.length === 0 && (
          <div className="px-4 py-8 text-center text-[13px] text-muted-foreground">
            Hakuna matokeo kwa “{q}”
          </div>
      )}

      {officialResults.length > 0 && (
        <section className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-2">
            Maofisa · {officialResults.length}
          </p>
          <div className="space-y-2">
            {officialResults.map((o: any) => (
              <Link
                key={o.id}
                to={`/kiongozi/${o.id}`}
                className="flex items-center gap-3 bg-card border border-border border-l-4 border-l-primary rounded-xl px-4 py-3 active:bg-secondary/40 transition-colors"
              >
                <User className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[14px] text-foreground truncate leading-tight">
                    {o.full_name}
                  </p>
                  <p className="text-[12px] text-muted-foreground truncate">
                    {o.role_title}
                  </p>
                </div>
                {o.ward_code && (
                  <code className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary">
                    {o.ward_code}
                  </code>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {locationResults.length > 0 && (
        <section className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-2">
            Maeneo · {locationResults.length}
          </p>
          <div className="space-y-2">
            {locationResults.map((r) => {
              const meta = TYPE_LABEL[r.type];
              return (
                <button
                  key={`${r.type}-${r.id}`}
                  onClick={() => handleLocationSelect(r)}
                  className="w-full flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 active:bg-secondary/40 transition-colors text-left"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-body uppercase tracking-widest px-1.5 py-0.5 rounded ${meta.color}`}
                      >
                        {meta.sw}
                      </span>
                      <span className="font-display text-[14px] text-foreground truncate">
                        {r.name}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">
                      {r.breadcrumb}
                    </p>
                  </div>
                  {r.code && (
                    <code className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary">
                      {r.code}
                    </code>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
