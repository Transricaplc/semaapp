import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, User, MapPin, ChevronRight, BadgeCheck, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  searchOfficials,
  roleLabels,
  roleBadgeColors,
  type Official,
} from "@/data/tanzania_directory";

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

  const showResults = focused && query.length >= 2;

  // Close on outside click
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
          placeholder="Saka kiongozi kwa jina, wadhifa, mkoa, au wizara..."
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

      {/* Results dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {results.length > 0 ? (
            <>
              <div className="p-3 border-b border-border/50">
                <p className="text-xs text-muted-foreground">
                  Matokeo {results.length} yamepatikana
                </p>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((official) => (
                  <SearchResultItem key={official.id} official={official} onSelect={() => { setFocused(false); setQuery(""); }} />
                ))}
              </div>
              <div className="p-3 border-t border-border/50 text-center">
                <button
                  onClick={() => { navigate("/saka-viongozi"); setFocused(false); }}
                  className="text-sm text-accent hover:underline flex items-center gap-1 mx-auto"
                >
                  Tazama saraka kamili <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <User className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-foreground">Hakuna matokeo</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Kiongozi "{query}" hajapatikana kwenye mfumo
              </p>
              <Link
                to="/report"
                onClick={() => setFocused(false)}
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Pendekeza kiongozi aongezwe
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
      {/* Avatar */}
      <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center shrink-0">
        {official.photoUrl ? (
          <img src={official.photoUrl} alt={official.name} className="w-full h-full rounded-lg object-cover" />
        ) : (
          <User className="w-5 h-5 text-primary-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-sm text-foreground truncate">{official.name}</span>
          {official.verified && <BadgeCheck className="w-3.5 h-3.5 text-accent shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground truncate">{official.roleTitle}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role]}`}>
          {roleLabels[official.role]}
        </span>
        {official.region && (
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <MapPin className="w-2.5 h-2.5" />
            {official.region}
          </span>
        )}
      </div>
    </button>
  );
}
