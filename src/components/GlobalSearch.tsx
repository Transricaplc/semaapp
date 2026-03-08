import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Search, X, User, MapPin, ChevronRight, BadgeCheck, ExternalLink,
  Heart, Flame, Building, Send, Tag, MessageSquare, Shield, Users,
  Landmark, Globe, AlertTriangle, Droplets, BookOpen,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  searchOfficials,
  roleTypeLabels,
  roleBadgeColors,
  type Official,
  type RoleType,
} from "@/data/unified_officials";
import { searchFacilities, facilityLevelLabels } from "@/data/health_facilities";
import { searchFireStations } from "@/data/fire_stations";
import { searchAgencies } from "@/data/agencies";
import { trendingConcerns, categoryLabels } from "@/data/reports";

// ── Filter mode definitions ──
type SearchMode = "leader" | "area" | "issue" | "report" | "contacts";

interface FilterChip {
  mode: SearchMode;
  label: string;
  icon: React.ReactNode;
}

const filterChips: FilterChip[] = [
  { mode: "leader", label: "Leader", icon: <User className="w-3.5 h-3.5" /> },
  { mode: "area", label: "Area", icon: <MapPin className="w-3.5 h-3.5" /> },
  { mode: "issue", label: "Issue", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  { mode: "report", label: "Report / Petition", icon: <Send className="w-3.5 h-3.5" /> },
  { mode: "contacts", label: "My Messages", icon: <MessageSquare className="w-3.5 h-3.5" /> },
];

// ── Category quick-search chips ──
interface CategoryChip {
  label: string;
  query: string;
  icon: React.ReactNode;
}

const categoryChips: CategoryChip[] = [
  { label: "Minister", query: "Minister", icon: <Landmark className="w-3 h-3" /> },
  { label: "MP", query: "Member of Parliament", icon: <Users className="w-3 h-3" /> },
  { label: "Commissioner", query: "Commissioner", icon: <Shield className="w-3 h-3" /> },
  { label: "Water", query: "water maji", icon: <Droplets className="w-3 h-3" /> },
  { label: "Health", query: "health hospital", icon: <Heart className="w-3 h-3" /> },
  { label: "Education", query: "education school", icon: <BookOpen className="w-3 h-3" /> },
];

// ── Role type to Swahili alias for fuzzy matching ──
const roleAliases: Record<string, RoleType[]> = {
  waziri: ["MINISTER", "DEPUTY_MINISTER"],
  mbunge: ["MP"],
  diwani: ["MUNICIPAL_DIRECTOR"],
  mkuu: ["PRESIDENT", "COMMISSIONER"],
  polisi: ["POLICE"],
  hakimu: ["JUDGE"],
};

function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  if (t.includes(q)) return true;
  // Simple fuzzy: check if all chars in query appear in order
  let ti = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti);
    if (found === -1) return false;
    ti = found + 1;
  }
  return true;
}

function searchWithAliases(query: string): Official[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // Check if query matches a Swahili alias → filter by role
  for (const [alias, roles] of Object.entries(roleAliases)) {
    if (q.includes(alias)) {
      const remaining = q.replace(alias, "").trim();
      const byRole = searchOfficials(remaining || " ").filter((o) => roles.includes(o.role_type));
      if (byRole.length > 0) return byRole;
      // Fall back to all of that role
      return roles.flatMap((r: RoleType) => getOfficialsByRole(r));
    }
  }

  return searchOfficials(query);
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState<SearchMode>("leader");
  const [focused, setFocused] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ── Unified search results ──
  const officialResults = useMemo(() => {
    if (query.length < 2) return [];
    if (activeMode === "issue") {
      // Search by ministry/topic keywords
      return searchOfficials(query).slice(0, 10);
    }
    if (activeMode === "area") {
      // Bias towards region/district matches
      return searchOfficials(query)
        .sort((a, b) => {
          const aMatch = a.location.region.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
          const bMatch = b.location.region.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
          return aMatch - bMatch;
        })
        .slice(0, 10);
    }
    return searchWithAliases(query).slice(0, 10);
  }, [query, activeMode]);

  const facilityResults = useMemo(() => {
    if (query.length < 2 || activeMode === "contacts" || activeMode === "report") return [];
    return searchFacilities(query).slice(0, 3);
  }, [query, activeMode]);

  const fireResults = useMemo(() => {
    if (query.length < 2 || activeMode === "contacts" || activeMode === "report") return [];
    return searchFireStations(query).slice(0, 3);
  }, [query, activeMode]);

  const agencyResults = useMemo(() => {
    if (query.length < 2 || activeMode === "contacts" || activeMode === "report") return [];
    return searchAgencies(query).slice(0, 3);
  }, [query, activeMode]);

  const issueResults = useMemo(() => {
    if (query.length < 2 || activeMode !== "issue") return [];
    const q = query.toLowerCase();
    return trendingConcerns.filter(
      (c) => c.text.toLowerCase().includes(q) || categoryLabels[c.category].toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    );
  }, [query, activeMode]);

  const totalResults = officialResults.length + facilityResults.length + fireResults.length + agencyResults.length + issueResults.length;
  const showResults = focused && query.length >= 2;
  const showIdleState = focused && query.length < 2 && !selectedOfficial;

  // ── Click outside ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
        setSelectedOfficial(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCategoryClick = useCallback((chipQuery: string) => {
    setQuery(chipQuery);
    setActiveMode("leader");
    inputRef.current?.focus();
  }, []);

  const handleSelectOfficial = useCallback((official: Official) => {
    setSelectedOfficial(official);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedOfficial(null);
  }, []);

  // ── Selected official detail panel ──
  if (selectedOfficial) {
    return (
      <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
        <OfficialActionPanel official={selectedOfficial} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a leader's name, ward, district, or issue... (e.g. Minister of Finance, water Dodoma)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="w-full pl-12 pr-10 h-14 bg-card text-foreground border border-border rounded-2xl text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground/60"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {filterChips.map((chip) => (
          <button
            key={chip.mode}
            onClick={() => { setActiveMode(chip.mode); inputRef.current?.focus(); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              activeMode === chip.mode
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>

      {/* Idle state: show category quick-chips */}
      {showIdleState && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick search by category</p>
            <div className="flex flex-wrap gap-2">
              {categoryChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleCategoryClick(chip.query)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-secondary text-foreground border border-border hover:border-primary/30 hover:bg-secondary/80 transition-all"
                >
                  {chip.icon}
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-border/50">
            <button
              onClick={() => { navigate("/saka-viongozi"); setFocused(false); }}
              className="text-xs text-accent hover:underline flex items-center gap-1 mx-auto"
            >
              Browse full directory <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Search results */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {totalResults > 0 ? (
            <>
              <div className="px-4 py-2.5 border-b border-border/50 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {totalResults} result{totalResults !== 1 ? "s" : ""} found
                </p>
                <span className="text-[10px] text-muted-foreground/60">
                  {filterChips.find((c) => c.mode === activeMode)?.label} mode
                </span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {/* Officials */}
                {officialResults.map((official) => (
                  <SearchResultCard
                    key={official.id}
                    official={official}
                    onSelect={() => handleSelectOfficial(official)}
                  />
                ))}

                {/* Issues */}
                {issueResults.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{issue.text}</p>
                      <p className="text-xs text-muted-foreground truncate">{categoryLabels[issue.category]} · {issue.region}</p>
                    </div>
                    <span className="text-sm font-bold text-destructive">{issue.count}</span>
                  </div>
                ))}

                {/* Facilities */}
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
                      </div>
                    ))}
                  </>
                )}

                {/* Fire stations */}
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
                      </div>
                    ))}
                  </>
                )}

                {/* Agencies */}
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

// ── Result card (no raw contacts shown) ──
function SearchResultCard({ official, onSelect }: { official: Official; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left group"
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
      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground transition-colors shrink-0" />
    </button>
  );
}

// ── Action panel (shown on selection — secure actions only, no raw contact data) ──
function OfficialActionPanel({ official, onBack }: { official: Official; onBack: () => void }) {
  const hasVerifiedContact = official.contacts.some((c) => c.verified);
  const isWardLevel = official.role_type === "MUNICIPAL_DIRECTOR" || official.location.ward;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="gradient-navy p-5 text-center relative">
        <button
          onClick={onBack}
          className="absolute left-4 top-4 text-primary-foreground/60 hover:text-primary-foreground text-xs flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="w-16 h-16 rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
          {official.profile_photo_url ? (
            <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <User className="w-8 h-8 text-primary-foreground" />
          )}
        </div>
        <h3 className="font-heading font-bold text-primary-foreground text-lg">{official.full_name}</h3>
        <p className="text-primary-foreground/70 text-sm mt-0.5">{official.role_title}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role_type]}`}>
            {roleTypeLabels[official.role_type]}
          </span>
          {official.verified_status === "VERIFIED" && (
            <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-accent/20 text-accent-foreground border border-accent/30 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-3 border-b border-border/50">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {official.location.region && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{official.location.region}{official.location.district ? ` · ${official.location.district}` : ""}</span>
          )}
          {official.institution.ministry && (
            <span className="flex items-center gap-1"><Building className="w-3 h-3" />{official.institution.ministry}</span>
          )}
          {official.party && (
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{official.party}</span>
          )}
        </div>
      </div>

      {/* Secure action buttons */}
      <div className="p-4 space-y-2">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Actions</p>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-colors text-left">
          <Send className="w-5 h-5" />
          <div>
            <p className="font-medium text-sm">Send a Direct Message</p>
            <p className="text-[10px] text-primary/70">Private and secure — only they will see it</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 text-accent hover:bg-accent/15 transition-colors text-left">
          <Tag className="w-5 h-5" />
          <div>
            <p className="font-medium text-sm">Tag in Public Report</p>
            <p className="text-[10px] text-accent/70">Attach this official to your report or petition</p>
          </div>
        </button>

        {hasVerifiedContact && (
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-left">
            <MessageSquare className="w-5 h-5" />
            <div>
              <p className="font-medium text-sm">Request Contact Info</p>
              <p className="text-[10px] text-muted-foreground">Verified contact will be shared securely</p>
            </div>
          </button>
        )}

        {isWardLevel && !hasVerifiedContact && (
          <div className="px-4 py-3 rounded-xl bg-secondary/50 border border-border text-left">
            <p className="text-xs text-muted-foreground">
              Ward-level contact not yet verified.{" "}
              <Link to="/report" className="text-accent hover:underline">Help us verify →</Link>
            </p>
          </div>
        )}
      </div>

      {/* Source */}
      {official.verified_source && (
        <div className="px-5 py-2 border-t border-border/50 text-[10px] text-muted-foreground/60 text-center">
          Source: {official.verified_source} · Last verified: {official.last_verified_date}
        </div>
      )}
    </div>
  );
}
