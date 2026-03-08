/**
 * Tanzania Regulatory Bodies & Infrastructure Agencies
 * Organized by sector with key personnel, contacts, and zonal offices
 */

// ============================================================
// TYPES
// ============================================================

export type AgencySector =
  | "Infrastructure"
  | "Regulatory"
  | "Revenue"
  | "Tourism"
  | "Trade";

export interface AgencyPersonnel {
  role: string;
  name: string;
}

export interface AgencyContacts {
  email: string;
  phone: string;
  hotline: string;
  address: string;
}

export interface ZonalOffice {
  zone: string;
  regions: string[];
  manager: string;
  phone: string;
  email: string;
}

export interface Agency {
  id: string;
  agency: string;
  acronym: string;
  sector: AgencySector;
  head: string;
  headTitle: string;
  contacts: AgencyContacts;
  key_personnel: AgencyPersonnel[];
  zonal_offices: ZonalOffice[];
}

// ============================================================
// SECTOR LABELS (Swahili)
// ============================================================

export const sectorLabels: Record<AgencySector, string> = {
  Infrastructure: "Miundombinu",
  Regulatory: "Udhibiti & Usalama",
  Revenue: "Mapato & Fedha",
  Tourism: "Utalii & Hifadhi",
  Trade: "Biashara & Viwango",
};

export const sectorColors: Record<AgencySector, string> = {
  Infrastructure: "bg-primary/10 text-primary border-primary/20",
  Regulatory: "bg-destructive/10 text-destructive border-destructive/20",
  Revenue: "bg-gold/15 text-foreground border-gold/30",
  Tourism: "bg-accent/10 text-accent border-accent/20",
  Trade: "bg-secondary text-foreground border-border",
};

// ============================================================
// AGENCIES DATA
// ============================================================

export const agencies: Agency[] = [
  // ── INFRASTRUCTURE ──
  {
    id: "ag-tpa",
    agency: "Tanzania Ports Authority",
    acronym: "TPA",
    sector: "Infrastructure",
    head: "Mr. Plasduce Mbossa",
    headTitle: "Director General",
    contacts: {
      email: "dg@ports.go.tz",
      phone: "+255 22 2110401",
      hotline: "",
      address: "Sokoine Drive, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Director General", name: "Dr. Baraka Mdima" },
      { role: "Dar es Salaam Port Director", name: "Mr. Abed Gallus Abed" },
      { role: "Director of Finance", name: "TPA DFA" },
      { role: "Director of Operations", name: "TPA DOO" },
    ],
    zonal_offices: [
      { zone: "Dar es Salaam Port", regions: ["Dar es Salaam"], manager: "Mr. Abed Gallus Abed", phone: "+255 22 2110401", email: "dsmport@ports.go.tz" },
      { zone: "Tanga Port", regions: ["Tanga"], manager: "Tanga Port Manager", phone: "+255 27 2644073", email: "tangaport@ports.go.tz" },
      { zone: "Mtwara Port", regions: ["Mtwara", "Lindi"], manager: "Mtwara Port Manager", phone: "+255 23 2333240", email: "mtwaraport@ports.go.tz" },
      { zone: "Lake Zone (Mwanza)", regions: ["Mwanza", "Kagera", "Geita", "Simiyu", "Shinyanga"], manager: "Lake Zone Port Manager", phone: "+255 28 2500585", email: "mwanzaport@ports.go.tz" },
      { zone: "Kigoma Port", regions: ["Kigoma"], manager: "Kigoma Port Manager", phone: "+255 28 2802517", email: "kigomaport@ports.go.tz" },
    ],
  },
  {
    id: "ag-taa",
    agency: "Tanzania Airports Authority",
    acronym: "TAA",
    sector: "Infrastructure",
    head: "Director General",
    headTitle: "Director General",
    contacts: {
      email: "info@taa.go.tz",
      phone: "+255 22 2844372",
      hotline: "",
      address: "JNIA Terminal III, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Director General", name: "TAA DDG" },
      { role: "Director of Airport Services", name: "TAA DAS" },
      { role: "Director of Finance", name: "TAA DFA" },
    ],
    zonal_offices: [
      { zone: "JNIA — Dar es Salaam", regions: ["Dar es Salaam", "Pwani"], manager: "JNIA Airport Manager", phone: "+255 22 2844372", email: "jnia@taa.go.tz" },
      { zone: "KIA — Kilimanjaro", regions: ["Kilimanjaro", "Arusha", "Manyara"], manager: "KIA Airport Manager", phone: "+255 27 2554252", email: "kia@taa.go.tz" },
      { zone: "AMA — Arusha", regions: ["Arusha"], manager: "Arusha Airport Manager", phone: "+255 27 2503201", email: "ama@taa.go.tz" },
      { zone: "MWZ — Mwanza", regions: ["Mwanza", "Geita", "Simiyu", "Kagera", "Shinyanga"], manager: "Mwanza Airport Manager", phone: "+255 28 2550844", email: "mwz@taa.go.tz" },
      { zone: "DOD — Dodoma", regions: ["Dodoma", "Singida"], manager: "Dodoma Airport Manager", phone: "+255 26 2321611", email: "dod@taa.go.tz" },
      { zone: "ZNZ — Zanzibar", regions: ["Unguja Mjini Magharibi", "Unguja Kaskazini", "Unguja Kusini"], manager: "Zanzibar Airport Manager", phone: "+255 24 2233466", email: "znz@taa.go.tz" },
    ],
  },
  {
    id: "ag-atcl",
    agency: "Air Tanzania Company Limited",
    acronym: "ATCL",
    sector: "Infrastructure",
    head: "Eng. Ladislaus Matindi",
    headTitle: "Managing Director",
    contacts: {
      email: "info@airtanzania.co.tz",
      phone: "+255 22 2117500",
      hotline: "+255 685 540 543",
      address: "ATC House, Ohio Street, Dar es Salaam",
    },
    key_personnel: [
      { role: "Director of Operations", name: "ATCL DOO" },
      { role: "Director of Finance", name: "ATCL CFO" },
      { role: "Director of Commercial", name: "ATCL DCO" },
    ],
    zonal_offices: [],
  },

  // ── REGULATORY / SAFETY ──
  {
    id: "ag-tbs",
    agency: "Tanzania Bureau of Standards",
    acronym: "TBS",
    sector: "Trade",
    head: "Dr. Ashura A. Katunzi",
    headTitle: "Director General",
    contacts: {
      email: "info@tbs.go.tz",
      phone: "+255 22 2450206",
      hotline: "+255 22 2450949",
      address: "Morogoro Road / Sam Nujoma Road, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Director General", name: "TBS DDG" },
      { role: "Director of Standards Development", name: "TBS DSD" },
      { role: "Director of Quality Assurance", name: "TBS DQA" },
      { role: "Director of Legal Services", name: "TBS DLS" },
    ],
    zonal_offices: [
      { zone: "Lake Zone", regions: ["Mwanza", "Kagera", "Geita", "Simiyu", "Shinyanga", "Mara"], manager: "Lake Zone Manager", phone: "+255 28 2500671", email: "lakezone@tbs.go.tz" },
      { zone: "Northern Zone", regions: ["Arusha", "Kilimanjaro", "Manyara", "Tanga"], manager: "Northern Zone Manager", phone: "+255 27 2548232", email: "northzone@tbs.go.tz" },
      { zone: "Southern Highlands Zone", regions: ["Mbeya", "Iringa", "Njombe", "Songwe", "Rukwa", "Katavi"], manager: "Southern Highlands Zone Manager", phone: "+255 25 2502571", email: "shzone@tbs.go.tz" },
      { zone: "Central Zone", regions: ["Dodoma", "Singida", "Tabora"], manager: "Central Zone Manager", phone: "+255 26 2321545", email: "centralzone@tbs.go.tz" },
      { zone: "Eastern Zone", regions: ["Dar es Salaam", "Pwani", "Morogoro"], manager: "Eastern Zone Manager", phone: "+255 22 2450206", email: "eastzone@tbs.go.tz" },
      { zone: "Southern Zone", regions: ["Mtwara", "Lindi", "Ruvuma"], manager: "Southern Zone Manager", phone: "+255 23 2333671", email: "southzone@tbs.go.tz" },
    ],
  },
  {
    id: "ag-tmda",
    agency: "Tanzania Medicines and Medical Devices Authority",
    acronym: "TMDA",
    sector: "Regulatory",
    head: "Mr. Adam Mitangu Fimbo",
    headTitle: "Director General",
    contacts: {
      email: "info@tmda.go.tz",
      phone: "+255 22 2450512",
      hotline: "+255 22 2452108",
      address: "EPI Mabibo, Off Mandela Road, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Director General", name: "TMDA DDG" },
      { role: "Director of Medicine Evaluation", name: "TMDA DME" },
      { role: "Director of Medical Devices & Diagnostics", name: "TMDA DMDD" },
      { role: "Director of Inspectorate & Enforcement", name: "TMDA DIE" },
    ],
    zonal_offices: [
      { zone: "Lake Zone", regions: ["Mwanza", "Kagera", "Geita", "Shinyanga", "Simiyu", "Mara"], manager: "TMDA Lake Zone Manager", phone: "+255 28 2503012", email: "lakezone@tmda.go.tz" },
      { zone: "Northern Zone", regions: ["Arusha", "Kilimanjaro", "Manyara", "Tanga"], manager: "TMDA Northern Zone Manager", phone: "+255 27 2544315", email: "northzone@tmda.go.tz" },
      { zone: "Southern Highlands Zone", regions: ["Mbeya", "Iringa", "Njombe", "Songwe", "Rukwa"], manager: "TMDA SH Zone Manager", phone: "+255 25 2504121", email: "shzone@tmda.go.tz" },
      { zone: "Central Zone", regions: ["Dodoma", "Singida", "Tabora"], manager: "TMDA Central Zone Manager", phone: "+255 26 2323019", email: "centralzone@tmda.go.tz" },
      { zone: "Southern Zone", regions: ["Mtwara", "Lindi", "Ruvuma"], manager: "TMDA Southern Zone Manager", phone: "+255 23 2334215", email: "southzone@tmda.go.tz" },
    ],
  },
  {
    id: "ag-gcla",
    agency: "Government Chief Chemist Laboratory Authority",
    acronym: "GCLA",
    sector: "Regulatory",
    head: "Chief Government Chemist",
    headTitle: "Chief Government Chemist",
    contacts: {
      email: "gcla@gcla.go.tz",
      phone: "+255 22 2152198",
      hotline: "",
      address: "Shabaan Robert Street, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Chief Government Chemist", name: "GCLA DCGC" },
      { role: "Director of Forensic Science", name: "GCLA DFS" },
      { role: "Director of Environmental & Chemical Lab", name: "GCLA DECL" },
    ],
    zonal_offices: [
      { zone: "Lake Zone Lab", regions: ["Mwanza", "Kagera", "Geita", "Shinyanga", "Simiyu", "Mara"], manager: "GCLA Lake Zone Director", phone: "+255 28 2501345", email: "lakezone@gcla.go.tz" },
      { zone: "Northern Zone Lab", regions: ["Arusha", "Kilimanjaro", "Manyara", "Tanga"], manager: "GCLA Northern Zone Director", phone: "+255 27 2508734", email: "northzone@gcla.go.tz" },
    ],
  },

  // ── REVENUE & FINANCE ──
  {
    id: "ag-tra",
    agency: "Tanzania Revenue Authority",
    acronym: "TRA",
    sector: "Revenue",
    head: "Yusuph Juma Mwenda",
    headTitle: "Commissioner General",
    contacts: {
      email: "cg@tra.go.tz",
      phone: "+255 22 2119451",
      hotline: "0800 750 075",
      address: "Mahakama Street, Dar es Salaam",
    },
    key_personnel: [
      { role: "Commissioner for Customs & Excise", name: "CCE — TRA" },
      { role: "Commissioner for Domestic Revenue", name: "CDR — TRA" },
      { role: "Commissioner for Tax Investigation", name: "CTI — TRA" },
      { role: "Director of Legal Services", name: "TRA DLS" },
      { role: "Director of Finance", name: "TRA DFA" },
    ],
    zonal_offices: [
      { zone: "Eastern Zone (DSM)", regions: ["Dar es Salaam", "Pwani", "Morogoro"], manager: "Regional Tax Manager — Eastern", phone: "+255 22 2119451", email: "eastern@tra.go.tz" },
      { zone: "Lake Zone (Mwanza)", regions: ["Mwanza", "Kagera", "Geita", "Simiyu", "Shinyanga", "Mara"], manager: "Regional Tax Manager — Lake Zone", phone: "+255 28 2500831", email: "lakezone@tra.go.tz" },
      { zone: "Northern Zone (Arusha)", regions: ["Arusha", "Kilimanjaro", "Manyara", "Tanga"], manager: "Regional Tax Manager — Northern", phone: "+255 27 2509291", email: "northzone@tra.go.tz" },
      { zone: "Southern Highlands (Mbeya)", regions: ["Mbeya", "Iringa", "Njombe", "Songwe", "Rukwa", "Katavi"], manager: "Regional Tax Manager — Southern Highlands", phone: "+255 25 2502301", email: "shzone@tra.go.tz" },
      { zone: "Central Zone (Dodoma)", regions: ["Dodoma", "Singida", "Tabora"], manager: "Regional Tax Manager — Central", phone: "+255 26 2322018", email: "centralzone@tra.go.tz" },
      { zone: "Southern Zone (Mtwara)", regions: ["Mtwara", "Lindi", "Ruvuma"], manager: "Regional Tax Manager — Southern", phone: "+255 23 2334088", email: "southzone@tra.go.tz" },
      { zone: "Western Zone (Kigoma)", regions: ["Kigoma", "Katavi"], manager: "Regional Tax Manager — Western", phone: "+255 28 2802590", email: "westzone@tra.go.tz" },
    ],
  },

  // ── TOURISM & CONSERVATION ──
  {
    id: "ag-tanapa",
    agency: "Tanzania National Parks Authority",
    acronym: "TANAPA",
    sector: "Tourism",
    head: "Dr. Allan Kijazi",
    headTitle: "Director General",
    contacts: {
      email: "info@tanzaniaparks.go.tz",
      phone: "+255 27 2503471",
      hotline: "",
      address: "Dodoma Road, Arusha",
    },
    key_personnel: [
      { role: "Deputy Director General", name: "TANAPA DDG" },
      { role: "Director of Tourism", name: "TANAPA DT" },
      { role: "Director of Resource Management", name: "TANAPA DRM" },
      { role: "Chief Park Warden — Serengeti", name: "TANAPA CPW Serengeti" },
    ],
    zonal_offices: [
      { zone: "Northern Circuit (Arusha)", regions: ["Arusha", "Kilimanjaro", "Manyara"], manager: "Zonal Manager — Northern", phone: "+255 27 2503471", email: "northern@tanzaniaparks.go.tz" },
      { zone: "Southern Circuit", regions: ["Iringa", "Njombe", "Mbeya"], manager: "Zonal Manager — Southern", phone: "+255 26 2702485", email: "southern@tanzaniaparks.go.tz" },
      { zone: "Western Circuit", regions: ["Kigoma", "Katavi", "Tabora"], manager: "Zonal Manager — Western", phone: "+255 28 2802700", email: "western@tanzaniaparks.go.tz" },
    ],
  },
  {
    id: "ag-ttb",
    agency: "Tanzania Tourist Board",
    acronym: "TTB",
    sector: "Tourism",
    head: "Managing Director",
    headTitle: "Managing Director",
    contacts: {
      email: "info@tanzaniatourism.go.tz",
      phone: "+255 27 2503842",
      hotline: "",
      address: "Boma Road, Arusha",
    },
    key_personnel: [
      { role: "Director of Marketing", name: "TTB DM" },
      { role: "Director of Product Development", name: "TTB DPD" },
    ],
    zonal_offices: [],
  },
  {
    id: "ag-tfs",
    agency: "Tanzania Forest Services Agency",
    acronym: "TFS",
    sector: "Tourism",
    head: "The Conservation Commissioner",
    headTitle: "Conservation Commissioner",
    contacts: {
      email: "tfs@tfs.go.tz",
      phone: "+255 22 2111064",
      hotline: "",
      address: "Mpingo House, Nyerere Road, Dar es Salaam",
    },
    key_personnel: [
      { role: "Deputy Conservation Commissioner", name: "TFS DCC" },
      { role: "Director of Forest Resources Management", name: "TFS DFRM" },
    ],
    zonal_offices: [],
  },
];

// ============================================================
// SEARCH & FILTER UTILITIES
// ============================================================

/** Search across all agencies and their personnel */
export function searchAgencies(query: string): Agency[] {
  const q = query.toLowerCase();
  return agencies.filter(
    (a) =>
      a.agency.toLowerCase().includes(q) ||
      a.acronym.toLowerCase().includes(q) ||
      a.head.toLowerCase().includes(q) ||
      a.sector.toLowerCase().includes(q) ||
      a.contacts.address.toLowerCase().includes(q) ||
      a.key_personnel.some((p) => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q))
  );
}

/** Get agencies by sector */
export function getAgenciesBySector(sector: AgencySector): Agency[] {
  return agencies.filter((a) => a.sector === sector);
}

/** Get zonal offices that cover a specific region */
export function getAgenciesForRegion(region: string): { agency: Agency; office: ZonalOffice }[] {
  const results: { agency: Agency; office: ZonalOffice }[] = [];
  agencies.forEach((a) => {
    a.zonal_offices.forEach((z) => {
      if (z.regions.some((r) => r.toLowerCase() === region.toLowerCase())) {
        results.push({ agency: a, office: z });
      }
    });
  });
  return results;
}

/** All unique sectors */
export const allSectors: AgencySector[] = [...new Set(agencies.map((a) => a.sector))];

/** Stats */
export const agencyStats = {
  totalAgencies: agencies.length,
  totalPersonnel: agencies.reduce((n, a) => n + 1 + a.key_personnel.length, 0),
  totalZonalOffices: agencies.reduce((n, a) => n + a.zonal_offices.length, 0),
  sectors: allSectors.length,
};
