import { useState, useMemo } from "react";
import {
  Search, User, MapPin, Landmark, Building2, Scale, Shield,
  ChevronDown, X, Filter, Banknote, Building, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  officials, searchOfficials, roleTypeLabels, roleBadgeColors,
  directoryStats, allRegionNames, districtsByRegion,
  type Official, type RoleType,
} from "@/data/unified_officials";
import { agencies, searchAgencies, sectorLabels, sectorColors, type Agency } from "@/data/agencies";
import { bankingCEOs, searchBanking, type BankingCEO } from "@/data/banking";
import SecureActionCard from "@/components/SecureActionCard";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import LocalGovPanel from "@/components/LocalGovPanel";

type DirectoryTab = "serikali" | "wakala" | "benki";

const tabs: { value: DirectoryTab; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { value: "serikali", label: "Government Officials", shortLabel: "Officials", icon: Landmark },
  { value: "wakala", label: "Government Agencies", shortLabel: "Agencies", icon: Building },
  { value: "benki", label: "Banking Institutions", shortLabel: "Banking", icon: Banknote },
];

type SerikaliSubTab = "executive" | "parliament" | "localGov" | "judiciary";
const serikaliSubTabs: { value: SerikaliSubTab; label: string; roleTypes: RoleType[] }[] = [
  { value: "executive", label: "Executive", roleTypes: ["PRESIDENT", "MINISTER", "DEPUTY_MINISTER", "PERMANENT_SECRETARY", "COMMISSIONER"] },
  { value: "parliament", label: "Parliament", roleTypes: ["MP", "SPEAKER"] },
  { value: "localGov", label: "Local Govt", roleTypes: ["MUNICIPAL_DIRECTOR"] },
  { value: "judiciary", label: "Judiciary & Security", roleTypes: ["JUDGE", "POLICE", "ANTI_CORRUPTION"] },
];

export default function SerikaliDirectory() {
  const [activeTab, setActiveTab] = useState<DirectoryTab>("serikali");
  const [serikaliSub, setSerikaliSub] = useState<SerikaliSubTab>("executive");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => { setSearch(""); setSelectedRegion(""); };
  const hasFilters = !!search || !!selectedRegion;

  const currentSubTab = serikaliSubTabs.find((t) => t.value === serikaliSub)!;
  const filteredOfficials = useMemo(() => {
    return officials.filter((o) => {
      if (!currentSubTab.roleTypes.includes(o.role_type)) return false;
      const q = search.toLowerCase();
      if (q && !(
        o.full_name.toLowerCase().includes(q) ||
        o.role_title.toLowerCase().includes(q) ||
        o.institution.ministry.toLowerCase().includes(q) ||
        o.location.region.toLowerCase().includes(q)
      )) return false;
      if (selectedRegion && o.location.region !== selectedRegion) return false;
      return true;
    });
  }, [serikaliSub, search, selectedRegion, currentSubTab.roleTypes]);

  const groupedOfficials = useMemo(() => {
    const groups: Record<string, Official[]> = {};
    filteredOfficials.forEach((o) => {
      const key = roleTypeLabels[o.role_type];
      if (!groups[key]) groups[key] = [];
      groups[key].push(o);
    });
    return groups;
  }, [filteredOfficials]);

  const filteredAgencies = useMemo(() => {
    if (!search) return agencies;
    return searchAgencies(search);
  }, [search]);

  const filteredBanking = useMemo(() => {
    if (!search) return bankingCEOs;
    return searchBanking(search);
  }, [search]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-yb-charcoal py-10 md:py-14">
        <div className="container max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Citizen Yellow Book
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            National Directory
          </h1>
          <p className="text-yb-charcoal-muted mb-8 max-w-xl mx-auto">
            Find the right person or institution — no queues, no middlemen
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              placeholder="Type a name, agency, ministry, or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 h-12 bg-yb-charcoal-mid text-white border border-primary rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-yb-charcoal-muted"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-yb-charcoal-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-6">
        <ConstituencyFinder />

        {/* Main tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DirectoryTab)} className="mb-6">
          <TabsList className="w-full grid grid-cols-3 h-auto gap-1 bg-secondary p-1 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 py-2.5 text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* SERIKALI */}
        {activeTab === "serikali" && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {serikaliSubTabs.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSerikaliSub(sub.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                    serikaliSub === sub.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <Filter className="w-3.5 h-3.5" />
                Region
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive text-xs">
                  <X className="w-3 h-3" /> Clear
                </Button>
              )}
              <span className="ml-auto text-xs text-muted-foreground">{filteredOfficials.length} officials</span>
            </div>

            {showFilters && (
              <div className="yb-card p-4 mb-4 animate-fade-in">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
                >
                  <option value="">All Regions</option>
                  {allRegionNames.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            )}

            {serikaliSub === "localGov" ? (
              <LocalGovPanel />
            ) : filteredOfficials.length === 0 ? (
              <EmptyState />
            ) : (
              Object.entries(groupedOfficials).map(([label, items]) => (
                <div key={label} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-2.5 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <Landmark className="w-4 h-4" />
                    <h2 className="text-base font-heading font-bold">{label}</h2>
                    <span className="text-sm font-normal text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <div className="grid gap-3">
                    {items.map((o) => (
                      <SecureActionCard
                        key={o.id}
                        name={o.full_name}
                        position={o.role_title}
                        organization={o.institution.ministry || o.institution.office_address || "Government of Tanzania"}
                        area={o.location.region || undefined}
                        verified={o.verified_status === "VERIFIED"}
                        photoUrl={o.profile_photo_url || undefined}
                        badgeColor={roleBadgeColors[o.role_type]}
                        badgeLabel={roleTypeLabels[o.role_type]}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* WAKALA */}
        {activeTab === "wakala" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground">{filteredAgencies.length} agencies</p>
            </div>
            {filteredAgencies.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-3">
                {filteredAgencies.map((a) => (
                  <SecureActionCard
                    key={a.id}
                    name={a.head}
                    position={a.headTitle}
                    organization={`${a.acronym} — ${a.agency}`}
                    badgeColor={sectorColors[a.sector]}
                    badgeLabel={a.sector}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* BENKI */}
        {activeTab === "benki" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground">{filteredBanking.length} banking leaders</p>
            </div>
            {filteredBanking.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-3">
                {filteredBanking.map((b) => (
                  <SecureActionCard
                    key={b.id}
                    name={b.name}
                    position={b.position}
                    organization={b.organization}
                    badgeColor="bg-primary/15 text-foreground border-primary/30"
                    badgeLabel="Banking"
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-border pt-6">
          <p>
            Directory: {directoryStats.totalOfficials} officials · {agencies.length} agencies · {bankingCEOs.length} banks · Last verified: 2026-03-08
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-primary opacity-60" />
      </div>
      <p className="font-medium text-foreground">No officials found in this area yet</p>
      <p className="text-sm mt-1">Help us grow — suggest an official</p>
      <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-yb-yellow-deep">
        <a href="/report">Suggest an Official</a>
      </Button>
    </div>
  );
}
