import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, User, MapPin, ChevronRight, BadgeCheck, ExternalLink, Heart, Flame, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  searchOfficials,
  roleTypeLabels,
  roleBadgeColors,
  getContact,
  type Official,
} from "@/data/unified_officials";
import { searchFacilities, facilityLevelLabels, type HealthFacility } from "@/data/health_facilities";
import { searchFireStations, type FireStation } from "@/data/fire_stations";
import { searchAgencies, type Agency } from "@/data/agencies";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    return searchOfficials(query).slice(0, 8);
  }, [query]);

  const facilityResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchFacilities(query).slice(0, 3);
  }, [query]);

  const fireResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchFireStations(query).slice(0, 3);
  }, [query]);

  const agencyResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchAgencies(query).slice(0, 3);
  }, [query]);

  const hasAnyResults = results.length > 0 || facilityResults.length > 0 || fireResults.length > 0 || agencyResults.length > 0;
  const showResults = focused && query.length >= 2;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search officials by name, role, region, or ministry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="pl-12 pr-10 h-14 bg-card text-foreground border-border rounded-2xl text-base shadow-lg"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {hasAnyResults ? (
            <>
              <div className="p-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground">
                  {results.length + facilityResults.length + fireResults.length + agencyResults.length} results found
                </p>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((official) => (
                  <SearchResultItem key={official.id} official={official} onSelect={() => { setFocused(false); setQuery(""); }} />
                ))}

                {facilityResults.length > 0 && (
                  <>
                    <div className="px-4 py-1.5 bg-accent/5 text-[10px] font-medium text-accent flex items-center gap-1">
                      <Heart className="w-3 h-3" /> Hospitals
                    </div>
                    {facilityResults.map((f) => (
                      <div key={f.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Heart className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{f.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{facilityLevelLabels[f.level]} · {f.region}</p>
                        </div>
                        {f.phone && (
                          <a href={`tel:${f.phone}`} className="text-xs font-bold text-accent shrink-0">{f.phone}</a>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {fireResults.length > 0 && (
                  <>
                    <div className="px-4 py-1.5 bg-destructive/5 text-[10px] font-medium text-destructive flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Fire Stations
                    </div>
                    {fireResults.map((s) => (
                      <div key={s.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                          <Flame className="w-5 h-5 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{s.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{s.region} · {s.district}</p>
                        </div>
                        <a href={`tel:${s.hotline}`} className="text-xs font-bold text-destructive shrink-0">{s.hotline}</a>
                      </div>
                    ))}
                  </>
                )}

                {agencyResults.length > 0 && (
                  <>
                    <div className="px-4 py-1.5 bg-primary/5 text-[10px] font-medium text-primary flex items-center gap-1">
                      <Building className="w-3 h-3" /> Government Agencies
                    </div>
                    {agencyResults.map((a) => (
                      <div key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{a.acronym} — {a.agency}</p>
                          <p className="text-xs text-muted-foreground truncate">{a.head} · {a.headTitle}</p>
                        </div>
                        {a.contacts.phone && (
                          <a href={`tel:${a.contacts.phone}`} className="text-xs font-bold text-primary shrink-0">{a.contacts.phone}</a>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="p-3 border-t border-border/50 text-center">
                <button
                  onClick={() => { navigate("/saka-viongozi"); setFocused(false); }}
                  className="text-sm text-accent hover:underline flex items-center gap-1 mx-auto"
                >
                  View full directory <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <User className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                "{query}" was not found in the system
              </p>
              <Link
                to="/report"
                onClick={() => setFocused(false)}
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Suggest this official be added
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchResultItem({ official, onSelect }: { official: Official; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center shrink-0">
        {official.profile_photo_url ? (
          <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full rounded-lg object-cover" />
        ) : (
          <User className="w-5 h-5 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-sm text-foreground truncate">{official.full_name}</span>
          {official.verified_status === "VERIFIED" && <BadgeCheck className="w-3.5 h-3.5 text-accent shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground truncate">{official.role_title}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role_type]}`}>
          {roleTypeLabels[official.role_type]}
        </span>
        {official.location.region && (
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <MapPin className="w-2.5 h-2.5" />
            {official.location.region}
          </span>
        )}
      </div>
    </button>
  );
}
