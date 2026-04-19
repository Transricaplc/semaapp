import { useState, useMemo } from "react";
import {
  Search, MapPin, Landmark, Building2, Scale, Shield, Banknote, BookOpen,
  GraduationCap, Heart, X, ChevronDown, ChevronRight, BadgeCheck,
  Send, Tag, Share2, Phone, Users, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  officials, searchOfficials, roleTypeLabels, roleBadgeColors,
  directoryStats, allRegionNames, districtsByRegion,
  type Official, type RoleType,
} from "@/data/unified_officials";
import { agencies, searchAgencies, sectorColors, type Agency, type AgencySector } from "@/data/agencies";
import { bankingCEOs, searchBanking, type BankingCEO } from "@/data/banking";
import { hospitals, searchHospitals, hospitalTypeLabels, type Hospital, type HospitalType } from "@/data/hospitali";
import { courts, searchCourts, courtLevelLabels, type Court } from "@/data/mahakama";
import { eduInstitutions, searchEdu, elimuTypeLabels, type EduInstitution } from "@/data/elimu";
import { politicalParties, searchParties } from "@/data/vyama";
import SecureActionCard from "@/components/SecureActionCard";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import LocalGovPanel from "@/components/LocalGovPanel";

type DirectoryTab = "mikoa" | "wilaya" | "hospitali" | "wakala" | "benki" | "mahakama" | "bunge" | "elimu" | "vyama";

const ZANZIBAR_REGIONS = ["Mjini Magharibi", "Kaskazini Unguja", "Kusini Unguja", "Kaskazini Pemba", "Kusini Pemba"];

const tabs: { value: DirectoryTab; label: string; icon: React.ElementType }[] = [
  { value: "mikoa", label: "Mikoa", icon: MapPin },
  { value: "wilaya", label: "Wilaya", icon: Building2 },
  { value: "hospitali", label: "Hospitali", icon: Heart },
  { value: "wakala", label: "Wakala", icon: Landmark },
  { value: "benki", label: "Benki", icon: Banknote },
  { value: "mahakama", label: "Mahakama", icon: Scale },
  { value: "bunge", label: "Bunge", icon: Users },
  { value: "elimu", label: "Elimu", icon: GraduationCap },
];

type BungeSubTab = "wabunge" | "mawaziri" | "spika" | "executive";
const bungeSubTabs: { value: BungeSubTab; label: string; roleTypes: RoleType[] }[] = [
  { value: "executive", label: "Utendaji", roleTypes: ["PRESIDENT", "PERMANENT_SECRETARY", "COMMISSIONER"] },
  { value: "mawaziri", label: "Mawaziri", roleTypes: ["MINISTER", "DEPUTY_MINISTER"] },
  { value: "wabunge", label: "Wabunge", roleTypes: ["MP"] },
  { value: "spika", label: "Uongozi & Mahakama", roleTypes: ["SPEAKER", "JUDGE", "POLICE", "ANTI_CORRUPTION"] },
];

export default function SerikaliDirectory() {
  const [activeTab, setActiveTab] = useState<DirectoryTab>("mikoa");
  const [bungeSubTab, setBungeSubTab] = useState<BungeSubTab>("executive");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const clearFilters = () => { setSearch(""); setSelectedRegion(""); };
  const hasFilters = !!search || !!selectedRegion;

  // ── Bunge officials ──
  const currentBungeSub = bungeSubTabs.find((t) => t.value === bungeSubTab)!;
  const filteredOfficials = useMemo(() => {
    return officials.filter((o) => {
      if (!currentBungeSub.roleTypes.includes(o.role_type)) return false;
      const q = search.toLowerCase();
      if (q && !(o.full_name.toLowerCase().includes(q) || o.role_title.toLowerCase().includes(q) || o.institution.ministry.toLowerCase().includes(q) || o.location.region.toLowerCase().includes(q))) return false;
      if (selectedRegion && o.location.region !== selectedRegion) return false;
      return true;
    });
  }, [bungeSubTab, search, selectedRegion, currentBungeSub.roleTypes]);

  const groupedOfficials = useMemo(() => {
    const groups: Record<string, Official[]> = {};
    filteredOfficials.forEach((o) => { const key = roleTypeLabels[o.role_type]; if (!groups[key]) groups[key] = []; groups[key].push(o); });
    return groups;
  }, [filteredOfficials]);

  // ── Mikoa (Regional Commissioners) ──
  const regionalCommissioners = useMemo(() => {
    let rcs = officials.filter((o) => (o.role_type === "COMMISSIONER" && o.role_title.includes("Regional")) || o.role_type === "REGIONAL_COMMISSIONER");
    if (search) { const q = search.toLowerCase(); rcs = rcs.filter((o) => o.full_name.toLowerCase().includes(q) || o.location.region.toLowerCase().includes(q)); }
    if (selectedRegion) rcs = rcs.filter((o) => o.location.region === selectedRegion);
    return rcs.sort((a, b) => a.location.region.localeCompare(b.location.region));
  }, [search, selectedRegion]);

  const isZanzibarSelected = ZANZIBAR_REGIONS.includes(selectedRegion);

  // ── Agencies, Banking, Hospitals, Courts, Edu ──
  const filteredAgencies = useMemo(() => search ? searchAgencies(search) : agencies, [search]);
  const filteredBanking = useMemo(() => search ? searchBanking(search) : bankingCEOs, [search]);
  const filteredHospitals = useMemo(() => search ? searchHospitals(search) : hospitals, [search]);
  const filteredCourts = useMemo(() => search ? searchCourts(search) : courts, [search]);
  const filteredEdu = useMemo(() => search ? searchEdu(search) : eduInstitutions, [search]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-yb-charcoal py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Saraka ya Taifa
          </div>
          <h1 className="text-[26px] md:text-[32px] font-bold text-white mb-2">Saraka — Kitabu cha Njano</h1>
          <p className="text-[15px] text-yb-charcoal-muted mb-8 max-w-xl mx-auto">
            Tafuta mtu au taasisi sahihi — bila foleni, bila dalali
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              placeholder="Andika jina, taasisi, wizara, au mkoa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 h-[52px] bg-yb-charcoal-mid text-white border border-primary rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-yb-charcoal-muted"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-yb-charcoal-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* ── 8-Tab Navigation ── */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold whitespace-nowrap border transition-all min-h-[44px] ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══ MIKOA ═══ */}
        {activeTab === "mikoa" && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-lg border border-border bg-card text-foreground px-3 py-2 text-[13px] min-h-[40px]"
              >
                <option value="">— All Regions —</option>
                <optgroup label="MAINLAND TANZANIA">
                  {allRegionNames.filter((m) => !ZANZIBAR_REGIONS.includes(m)).map((m) => <option key={m} value={m}>{m}</option>)}
                </optgroup>
                <optgroup label="ZANZIBAR">
                  {allRegionNames.filter((m) => ZANZIBAR_REGIONS.includes(m)).map((m) => <option key={m} value={m}>{m}</option>)}
                </optgroup>
              </select>
              <p className="text-[13px] text-muted-foreground">{regionalCommissioners.length} Wakuu wa Mikoa</p>
            </div>

            {isZanzibarSelected && (
              <>
                <div className="flex gap-0 w-20 h-1 mx-auto mb-4 rounded-full overflow-hidden">
                  <div className="flex-1 bg-[#1EB2E0]" />
                  <div className="flex-1 bg-[#1C1C1E]" />
                  <div className="flex-1 bg-[#006B3F]" />
                </div>
                <div className="flex items-start gap-3 px-4 py-3 bg-[#1EB2E0]/10 border border-[#1EB2E0]/20 rounded-xl mb-4">
                  <span className="text-2xl shrink-0">🏝️</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground">Zanzibar Revolutionary Government</p>
                    <p className="text-[12px] text-muted-foreground">
                      Zanzibar operates under a semi-autonomous government (Serikali ya Mapinduzi Zanzibar). For Union matters, Union officials also apply.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[12px] font-medium">
                      <a href="https://hor.go.tz" target="_blank" rel="noopener noreferrer" className="text-[#1EB2E0] hover:underline">House of Representatives →</a>
                      <a href="https://zanzibarstate.go.tz" target="_blank" rel="noopener noreferrer" className="text-[#1EB2E0] hover:underline">State House Zanzibar →</a>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {regionalCommissioners.map((rc) => (
                <SecureActionCard
                  key={rc.id}
                  name={rc.full_name}
                  position={rc.role_title}
                  organization={`Mkoa wa ${rc.location.region}`}
                  area={rc.location.region}
                  verified={rc.verified_status === "VERIFIED"}
                  badgeColor={roleBadgeColors[rc.role_type]}
                  badgeLabel="RC"
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ WILAYA ═══ */}
        {activeTab === "wilaya" && <LocalGovPanel />}

        {/* ═══ HOSPITALI ═══ */}
        {activeTab === "hospitali" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredHospitals.length} hospitali</p>
            {(["Hospitali ya Taifa", "Rufaa ya Kanda", "Rufaa ya Mkoa"] as HospitalType[]).map((type) => {
              const items = filteredHospitals.filter((h) => h.type === type);
              if (items.length === 0) return null;
              return (
                <div key={type} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <Heart className="w-4 h-4" />
                    <h2 className="text-[16px] font-bold">{type}</h2>
                    <span className="text-[13px] text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((h) => (
                      <SecureActionCard
                        key={h.id}
                        name={h.director.name}
                        position={h.director.position}
                        organization={h.name}
                        area={h.location}
                        verified={h.verified}
                        badgeColor="bg-accent/10 text-accent border-accent/20"
                        badgeLabel={hospitalTypeLabels[h.type]}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ WAKALA ═══ */}
        {activeTab === "wakala" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredAgencies.length} wakala</p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
          </div>
        )}

        {/* ═══ BENKI ═══ */}
        {activeTab === "benki" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredBanking.length} viongozi wa benki</p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredBanking.map((b) => (
                <SecureActionCard
                  key={b.id}
                  name={b.name}
                  position={b.position}
                  organization={b.organization}
                  badgeColor="bg-primary/15 text-foreground border-primary/30"
                  badgeLabel="Benki"
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ MAHAKAMA ═══ */}
        {activeTab === "mahakama" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredCourts.length} mahakama</p>
            {(["Mahakama ya Juu", "Mahakama Kuu", "Mahakama ya Hakimu Mkazi"] as const).map((level) => {
              const items = filteredCourts.filter((c) => c.level === level);
              if (items.length === 0) return null;
              return (
                <div key={level} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <Scale className="w-4 h-4" />
                    <h2 className="text-[16px] font-bold">{level}</h2>
                    <span className="text-[13px] text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <SecureActionCard
                        key={c.id}
                        name={c.head.name}
                        position={c.head.position}
                        organization={c.name}
                        area={c.location}
                        verified={c.verified}
                        badgeColor="bg-yb-charcoal-mid text-white border-yb-charcoal-mid"
                        badgeLabel={courtLevelLabels[c.level]}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ BUNGE ═══ */}
        {activeTab === "bunge" && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {bungeSubTabs.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setBungeSubTab(sub.value)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all min-h-[40px] ${
                    bungeSubTab === sub.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-muted-foreground">{filteredOfficials.length} viongozi</span>
            </div>

            {filteredOfficials.length === 0 ? (
              <EmptyState />
            ) : (
              Object.entries(groupedOfficials).map(([label, items]) => (
                <div key={label} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <Landmark className="w-4 h-4" />
                    <h2 className="text-[16px] font-bold">{label}</h2>
                    <span className="text-[13px] text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((o) => (
                      <SecureActionCard
                        key={o.id}
                        name={o.full_name}
                        position={o.role_title}
                        organization={o.institution.ministry || "Government of Tanzania"}
                        area={o.location.region || undefined}
                        verified={o.verified_status === "VERIFIED"}
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

        {/* ═══ ELIMU ═══ */}
        {activeTab === "elimu" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredEdu.length} taasisi za elimu</p>
            {(["Chuo Kikuu cha Umma", "Taasisi ya Serikali"] as const).map((type) => {
              const items = filteredEdu.filter((e) => e.type === type);
              if (items.length === 0) return null;
              return (
                <div key={type} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <GraduationCap className="w-4 h-4" />
                    <h2 className="text-[16px] font-bold">{elimuTypeLabels[type]}</h2>
                    <span className="text-[13px] text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((e) => (
                      <SecureActionCard
                        key={e.id}
                        name={e.head?.name || e.name}
                        position={e.head?.position || e.mandate || ""}
                        organization={e.name}
                        area={e.location}
                        verified={e.head?.verified}
                        badgeColor="bg-primary/15 text-foreground border-primary/30"
                        badgeLabel={elimuTypeLabels[e.type]}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[13px] text-muted-foreground border-t border-border pt-6">
          <p>Saraka: {directoryStats.totalOfficials} viongozi · {agencies.length} wakala · {hospitals.length} hospitali · {courts.length} mahakama · Ilisasishwa: Mar 2026</p>
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
      <p className="text-[16px] font-bold text-foreground">Hakuna viongozi waliopatikana</p>
      <p className="text-[13px] mt-1">Jaribu kubadilisha utafutaji wako</p>
    </div>
  );
}
