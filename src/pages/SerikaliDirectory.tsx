import { useState, useMemo } from "react";
import {
  Search, MapPin, Landmark, Building2, Scale, Banknote, BookOpen,
  GraduationCap, Heart, X, BadgeCheck, Phone, Users, ArrowUpDown, ChevronDown,
} from "lucide-react";
import SortSheet from "@/components/SortSheet";
import {
  useSortFilter, applySort, groupBySort, sortLabel, type SortKey,
} from "@/hooks/useSortFilter";
import {
  officials, roleTypeLabels,
  directoryStats, allRegionNames,
  type Official, type RoleType, type VerifiedStatus,
} from "@/data/unified_officials";
import { agencies, searchAgencies } from "@/data/agencies";
import { bankingCEOs, searchBanking, searchBotBanks, bureauxDeChange, searchBureaux } from "@/data/banking";
import { hospitals, searchHospitals, hospitalTypeLabels, type HospitalType } from "@/data/hospitali";
import { courts, searchCourts, courtLevelLabels } from "@/data/mahakama";
import { eduInstitutions, searchEdu, elimuTypeLabels } from "@/data/elimu";
import { politicalParties, searchParties } from "@/data/vyama";
import OfficialCard from "@/components/OfficialCard";
import { PanelGroup } from "@/components/Panel";
import LocalGovPanel from "@/components/LocalGovPanel";

// ── Adapter: synthesize a minimal Official from any directory entry ──
function makeOfficial(input: {
  id: string;
  full_name: string;
  role_type: RoleType;
  role_title: string;
  ministry?: string;
  region?: string;
  district?: string;
  ward?: string;
  party?: string;
  verified?: boolean;
  phone?: string;
  email?: string;
  address?: string;
}): Official {
  const contacts: Official["contacts"] = [];
  if (input.phone) contacts.push({ type: "phone", value: input.phone, verified: !!input.verified });
  if (input.email) contacts.push({ type: "email", value: input.email, verified: !!input.verified });
  if (input.address) contacts.push({ type: "office_address", value: input.address, verified: !!input.verified });
  return {
    id: input.id,
    full_name: input.full_name,
    profile_photo_url: "",
    role_type: input.role_type,
    role_title: input.role_title,
    verified_status: (input.verified ? "VERIFIED" : "UNVERIFIED") as VerifiedStatus,
    verified_source: "",
    last_verified_date: "",
    party: input.party ?? "",
    location: {
      region: input.region ?? "",
      district: input.district ?? "",
      division: "",
      ward: input.ward ?? "",
      village_mtaa: "",
      constituency: "",
    },
    institution: {
      ministry: input.ministry ?? "",
      court_name: "",
      police_station: "",
      office_address: input.address ?? "",
    },
    contacts,
  };
}

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
  { value: "vyama", label: "Vyama", icon: Landmark },
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

  // ── Sort/Filter state ──
  const { sortBy, setSortBy } = useSortFilter("name-asc");
  const [sortOpen, setSortOpen] = useState(false);
  const activeFilterCount =
    (sortBy !== "name-asc" ? 1 : 0) + (selectedRegion ? 1 : 0);

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
  const filteredBotBanks = useMemo(() => searchBotBanks(search), [search]);
  const filteredBureaux = useMemo(() => searchBureaux(search), [search]);
  const filteredHospitals = useMemo(() => search ? searchHospitals(search) : hospitals, [search]);
  const filteredCourts = useMemo(() => search ? searchCourts(search) : courts, [search]);
  const filteredEdu = useMemo(() => search ? searchEdu(search) : eduInstitutions, [search]);
  const filteredParties = useMemo(() => searchParties(search), [search]);

  return (
    <div className="font-ui animate-fade-in">
      {/* ── Sticky Header — gazette ── */}
      <header
        className="sticky top-0 z-30 bg-surface border-b border-gazette-border"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-3">
          <h1 className="font-serif-display text-[24px] text-ink">Saka Viongozi</h1>
          <span className="bg-secondary text-primary rounded-full px-2.5 py-1 text-[11px] font-medium">
            Viongozi {officials.length}
          </span>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              placeholder="Tafuta jina, wizara, au mkoa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 h-11 bg-cream border border-gazette-border rounded-xl text-[14px] focus:border-primary focus:outline-none placeholder:text-text-secondary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary active:opacity-65"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {/* Sort + active-filter bar */}
        <div className="px-4 pb-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="inline-flex items-center gap-1.5 bg-surface border border-gazette-border rounded-full px-3 py-1.5 text-[12px] font-medium text-ink active:opacity-65 transition-opacity"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-text-secondary" />
            <span className="truncate max-w-[140px]">{sortLabel(sortBy)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>
          {activeFilterCount > 0 && (
            <span className="bg-accent text-ink rounded-full px-3 py-1 text-[11px] font-semibold">
              Filters Hai · {activeFilterCount}
            </span>
          )}
        </div>
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 px-4 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] border min-h-[36px] transition-colors ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "bg-surface text-ink border-gazette-border"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Sort sheet (global to page) */}
      <SortSheet
        open={sortOpen}
        value={sortBy}
        onClose={() => setSortOpen(false)}
        onApply={(k) => { setSortBy(k); setSortOpen(false); }}
      />

      <div className="px-4 py-4">

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

            <SortedOfficialList officials={regionalCommissioners} sortBy={sortBy} />

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
                  <SortedOfficialList
                    officials={items.map((h) => makeOfficial({
                      id: h.id,
                      full_name: h.director.name,
                      role_type: "PERMANENT_SECRETARY",
                      role_title: `${h.director.position} — ${h.name}`,
                      ministry: h.name,
                      region: h.location,
                      verified: h.verified,
                      phone: h.emergencyLine,
                    }))}
                    sortBy={sortBy}
                  />

                </div>
              );
            })}
          </div>
        )}

        {/* ═══ WAKALA ═══ */}
        {activeTab === "wakala" && (
          <div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredAgencies.length} wakala</p>
            <SortedOfficialList
              officials={filteredAgencies.map((a) => makeOfficial({
                id: a.id,
                full_name: a.head,
                role_type: "PERMANENT_SECRETARY",
                role_title: `${a.headTitle} — ${a.acronym}`,
                ministry: a.agency,
              }))}
              sortBy={sortBy}
            />
          </div>
        )}

        {/* ═══ BENKI ═══ */}
        {activeTab === "benki" && (
          <div>
            <div className="flex items-start gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl mb-4">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-foreground">Taasisi za Fedha Tanzania</p>
                <p className="text-[12px] text-muted-foreground">
                  Chanzo: Benki Kuu ya Tanzania (BOT).{" "}
                  <a href="https://www.bot.go.tz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">bot.go.tz →</a>
                </p>
              </div>
            </div>

            {/* Section 1: CEOs */}
            {filteredBanking.length > 0 && (
              <div className="mb-8">
                <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                  <Banknote className="w-4 h-4" />
                  <h2 className="text-[16px] font-bold">Viongozi wa Benki Kuu (CEOs)</h2>
                  <span className="text-[13px] text-yb-charcoal-muted ml-1">({filteredBanking.length})</span>
                </div>
                <PanelGroup>
                  {filteredBanking.map((b) => (
                    <OfficialCard
                      key={b.id}
                      official={makeOfficial({
                        id: b.id,
                        full_name: b.name,
                        role_type: "PERMANENT_SECRETARY",
                        role_title: `${b.position} — ${b.organization}`,
                        ministry: b.organization,
                      })}
                    />
                  ))}
                </PanelGroup>
              </div>
            )}

            {/* Section 2: Other BOT-registered commercial banks */}
            {filteredBotBanks.length > 0 && (
              <div className="mb-8">
                <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                  <Banknote className="w-4 h-4" />
                  <h2 className="text-[16px] font-bold">Benki Nyingine za Biashara</h2>
                  <span className="text-[13px] text-yb-charcoal-muted ml-1">({filteredBotBanks.length})</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBotBanks.map((b) => (
                    <div key={b.id} className="yb-card p-4 flex flex-col gap-2">
                      <div>
                        <h3 className="text-[14px] font-bold text-foreground leading-tight">{b.organization}</h3>
                        <p className="text-[12px] text-muted-foreground mt-0.5">Mawasiliano: {b.name}</p>
                      </div>
                      <div className="text-[12px] text-muted-foreground border-t border-border pt-2 space-y-1">
                        {b.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 shrink-0" /> {b.phone}</p>}
                        {b.email && <p className="truncate"><a href={`mailto:${b.email}`} className="text-primary hover:underline">{b.email}</a></p>}
                        {b.address && <p className="text-[11px] text-muted-foreground/80 leading-snug">{b.address}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Bureaux de Change */}
            {filteredBureaux.length > 0 && (
              <div className="mb-8">
                <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                  <Banknote className="w-4 h-4" />
                  <h2 className="text-[16px] font-bold">Bureau de Change (Forex)</h2>
                  <span className="text-[13px] text-yb-charcoal-muted ml-1">({filteredBureaux.length})</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBureaux.map((b) => (
                    <div key={b.id} className="yb-card p-3 flex flex-col gap-1">
                      <h3 className="text-[13px] font-bold text-foreground leading-tight">{b.name}</h3>
                      <p className="text-[12px] text-primary font-medium flex items-center gap-1"><MapPin className="w-3 h-3" /> {b.region}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug">{b.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredBanking.length === 0 && filteredBotBanks.length === 0 && filteredBureaux.length === 0 && <EmptyState />}
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
                  <PanelGroup>
                    {items.map((c) => (
                      <OfficialCard
                        key={c.id}
                        official={makeOfficial({
                          id: c.id,
                          full_name: c.head.name,
                          role_type: "JUDGE",
                          role_title: `${c.head.position} — ${c.name}`,
                          ministry: c.name,
                          region: c.location,
                          verified: c.verified,
                        })}
                      />
                    ))}
                  </PanelGroup>
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
                  <PanelGroup>
                    {items.map((o) => (
                      <OfficialCard key={o.id} official={o} />
                    ))}
                  </PanelGroup>
                </div>
              ))
            )}
          </>
        )}

        {/* ═══ ELIMU ═══ */}
        {activeTab === "elimu" && (
          <div>
            <div className="flex items-start gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl mb-4">
              <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-foreground">Vyuo Vikuu na Taasisi za Elimu</p>
                <p className="text-[12px] text-muted-foreground">
                  Chanzo: Tume ya Vyuo Vikuu Tanzania (TCU) — kufikia 26 Machi, 2026.{" "}
                  <a href="https://www.tcu.go.tz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tcu.go.tz →</a>
                  {" · "}
                  <a href="https://www.necta.go.tz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mashule ya Sekondari (NECTA) →</a>
                </p>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredEdu.length} taasisi za elimu</p>
            {(["Chuo Kikuu cha Umma", "Chuo Kikuu Binafsi", "Chuo Kishiriki cha Umma", "Chuo Kishiriki Binafsi", "Taasisi ya Serikali"] as const).map((type) => {
              const items = filteredEdu.filter((e) => e.type === type);
              if (items.length === 0) return null;
              return (
                <div key={type} className="mb-8">
                  <div className="bg-yb-charcoal text-primary px-4 py-3 rounded-lg mb-3 flex items-center gap-2 yb-divider">
                    <GraduationCap className="w-4 h-4" />
                    <h2 className="text-[16px] font-bold">{elimuTypeLabels[type]}</h2>
                    <span className="text-[13px] text-yb-charcoal-muted ml-1">({items.length})</span>
                  </div>
                  <PanelGroup>
                    {items.map((e) => (
                      <OfficialCard
                        key={e.id}
                        official={makeOfficial({
                          id: e.id,
                          full_name: e.acronym || e.name,
                          role_type: "PERMANENT_SECRETARY",
                          role_title: e.acronym ? e.name : (e.mandate || e.status || ""),
                          ministry: e.affiliation ? `Affiliated: ${e.affiliation}` : (e.status || e.name),
                          region: e.location,
                          verified: e.head?.verified,
                        })}
                      />
                    ))}
                  </PanelGroup>
                </div>
              );
            })}
            {filteredEdu.length === 0 && <EmptyState />}
          </div>
        )}

        {/* ═══ VYAMA (Political Parties) ═══ */}
        {activeTab === "vyama" && (
          <div>
            <div className="flex items-start gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl mb-4">
              <Landmark className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-foreground">Vyama vya Siasa Vilivyosajiliwa</p>
                <p className="text-[12px] text-muted-foreground">
                  Chanzo: Ofisi ya Msajili wa Vyama vya Siasa (ORPP) — kufikia 17 Machi, 2025.{" "}
                  <a href="https://www.orpp.go.tz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">orpp.go.tz →</a>
                </p>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground mb-4">{filteredParties.length} vyama vilivyosajiliwa kabisa</p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredParties.map((p) => (
                <div key={p.registrationNo} className="yb-card p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold text-foreground leading-tight">{p.acronym}</h3>
                      <p className="text-[12px] text-muted-foreground leading-snug mt-0.5">{p.name}</p>
                    </div>
                    <span className="badge-constituency shrink-0">№ {p.registrationNo}</span>
                  </div>
                  <div className="text-[12px] text-muted-foreground border-t border-border pt-2 mt-1 space-y-1">
                    <p><span className="font-semibold text-foreground">Mwenyekiti:</span> {p.chairperson}</p>
                    <p><span className="font-semibold text-foreground">Katibu Mkuu:</span> {p.secretaryGeneral}</p>
                    <p className="flex items-center gap-1.5 pt-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                      Imesajiliwa: {p.registeredOn}
                    </p>
                    <p className="text-[11px] text-muted-foreground/80 pt-1 leading-snug">{p.hqAddress}</p>
                    {(p.phone || p.email || p.website) && (
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 pt-1 text-[11px]">
                        {p.phone && <span className="text-muted-foreground">📞 {p.phone}</span>}
                        {p.email && <a href={`mailto:${p.email}`} className="text-primary hover:underline truncate max-w-full">{p.email}</a>}
                        {p.website && <a href={`https://${p.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{p.website} →</a>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {filteredParties.length === 0 && <EmptyState />}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[13px] text-muted-foreground border-t border-border pt-6">
          <p>Saraka: {directoryStats.totalOfficials} viongozi · {agencies.length} wakala · {hospitals.length} hospitali · {courts.length} mahakama · {politicalParties.length} vyama · Ilisasishwa: Mar 2026</p>
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
