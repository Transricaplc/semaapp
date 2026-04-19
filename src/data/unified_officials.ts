/**
 * UNIFIED OFFICIAL DATA ONTOLOGY — Sema App
 * Single source of truth for all officials in the directory.
 * 
 * Every official must:
 * 1. Belong to exactly one role_type
 * 2. Have at least one region assigned (or empty string for national-level)
 * 3. Store contacts as a structured array
 */

import { mpData } from "./mps_data";

// ============================================================
// ENUMS & TYPES
// ============================================================

export type RoleType =
  // ── NATIONAL (Taifa) ──
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "PRIME_MINISTER"
  | "SPEAKER"
  | "MP"                       // Constituency-level elected
  | "MINISTER"
  | "DEPUTY_MINISTER"
  | "PERMANENT_SECRETARY"
  | "JUDGE"
  // ── REGIONAL (Mkoa) ──
  | "REGIONAL_COMMISSIONER"    // RC — political appointee, security mandate
  | "REGIONAL_ADMIN_SECRETARY" // RAS — administrative, TAMISEMI chain
  | "REGIONAL_POLICE_COMMANDER"
  // ── DISTRICT / MUNICIPALITY / CITY (Wilaya / Manispaa / Jiji) ──
  | "DISTRICT_COMMISSIONER"    // DC — political appointee
  | "DISTRICT_EXECUTIVE_DIRECTOR" // DED — technical head of council
  | "MUNICIPAL_MAYOR"          // Mayor/Chairman of municipality or city
  | "DISTRICT_POLICE_COMMANDER"
  // ── DIVISION (Tarafa) ──
  | "DIVISION_OFFICER"         // DO — rarely contacted but officially exists
  // ── WARD (Kata) ── most locally relevant
  | "WARD_EXECUTIVE_OFFICER"   // WEO — appointed civil servant
  | "WARD_COUNCILLOR"          // Elected representative
  // ── VILLAGE / MTAA (Kijiji / Mtaa) ──
  | "VILLAGE_EXECUTIVE_OFFICER" // VEO — appointed
  | "VILLAGE_CHAIRMAN"         // Mwenyekiti — elected
  // ── CROSS-CUTTING ──
  | "ANTI_CORRUPTION"          // PCCB
  | "EMERGENCY"
  | "POLICE"                   // Generic police role (legacy)
  | "MUNICIPAL_DIRECTOR"       // Legacy — kept for backward compat
  | "COMMISSIONER";            // Keep for backward compat during migration — deprecate later

export type VerifiedStatus = "VERIFIED" | "PENDING" | "UNVERIFIED" | "OUTDATED";

export interface OfficialContact {
  type: "phone" | "email" | "office_address" | "twitter" | "facebook";
  value: string;
  verified: boolean;
}

export interface OfficialLocation {
  // Administrative chain (TAMISEMI)
  region: string;           // Mkoa (e.g. "Dar es Salaam")
  district: string;         // Wilaya/Manispaa (e.g. "Ilala")
  division: string;         // Tarafa (e.g. "Ilala Urban") — often empty
  ward: string;             // Kata (e.g. "Kariakoo") — most locally specific
  village_mtaa: string;     // Kijiji/Mtaa — most granular, often empty
  // Electoral chain (Bunge/Baraza)
  constituency: string;     // Electoral constituency for MP mapping (e.g. "Ukonga")
}

export interface OfficialInstitution {
  ministry: string;
  court_name: string;
  police_station: string;
  office_address: string;
}

export interface Official {
  id: string;
  full_name: string;
  profile_photo_url: string;
  role_type: RoleType;
  role_title: string;
  verified_status: VerifiedStatus;
  verified_source: string;
  last_verified_date: string;
  party: string;
  location: OfficialLocation;
  institution: OfficialInstitution;
  contacts: OfficialContact[];
}

// ============================================================
// ROLE DISPLAY LABELS
// ============================================================

export const roleTypeLabels: Record<RoleType, string> = {
  PRESIDENT: "Head of State",
  VICE_PRESIDENT: "Makamu wa Rais",
  PRIME_MINISTER: "Waziri Mkuu",
  MP: "Member of Parliament",
  MINISTER: "Minister",
  DEPUTY_MINISTER: "Deputy Minister",
  PERMANENT_SECRETARY: "Permanent Secretary",
  JUDGE: "Judge / Magistrate",
  POLICE: "Police Commander",
  COMMISSIONER: "Commissioner",
  MUNICIPAL_DIRECTOR: "Municipal Director",
  SPEAKER: "Speaker of Parliament",
  ANTI_CORRUPTION: "Anti-Corruption (PCCB)",
  EMERGENCY: "Emergency Services",
  REGIONAL_COMMISSIONER: "Mkuu wa Mkoa (RC)",
  REGIONAL_ADMIN_SECRETARY: "Katibu Tawala wa Mkoa (RAS)",
  REGIONAL_POLICE_COMMANDER: "Kamanda wa Polisi — Mkoa",
  DISTRICT_COMMISSIONER: "Mkuu wa Wilaya (DC)",
  DISTRICT_EXECUTIVE_DIRECTOR: "Mkurugenzi wa Halmashauri (DED)",
  MUNICIPAL_MAYOR: "Meya / Mwenyekiti wa Manispaa",
  DISTRICT_POLICE_COMMANDER: "Kamanda wa Polisi — Wilaya",
  DIVISION_OFFICER: "Afisa Tarafa (DO)",
  WARD_EXECUTIVE_OFFICER: "Mtendaji wa Kata (WEO)",
  WARD_COUNCILLOR: "Diwani wa Kata",
  VILLAGE_EXECUTIVE_OFFICER: "Mtendaji wa Kijiji (VEO)",
  VILLAGE_CHAIRMAN: "Mwenyekiti wa Kijiji/Mtaa",
};

export const roleBadgeColors: Record<RoleType, string> = {
  PRESIDENT: "bg-primary/15 text-foreground border-primary/30",
  VICE_PRESIDENT: "bg-primary/15 text-foreground border-primary/30",
  PRIME_MINISTER: "bg-primary/15 text-foreground border-primary/30",
  MP: "bg-primary text-primary-foreground border-primary",
  MINISTER: "bg-yb-charcoal text-primary border-yb-charcoal",
  DEPUTY_MINISTER: "bg-yb-charcoal-mid text-white border-yb-charcoal-mid",
  PERMANENT_SECRETARY: "bg-secondary text-foreground border-border",
  JUDGE: "bg-yb-charcoal-mid text-white border-yb-charcoal-mid",
  POLICE: "bg-yb-charcoal-dark text-primary border-yb-charcoal-dark",
  COMMISSIONER: "bg-yb-yellow-deep text-primary-foreground border-yb-yellow-deep",
  MUNICIPAL_DIRECTOR: "bg-yb-charcoal-soft text-white border-yb-charcoal-soft",
  SPEAKER: "bg-primary/15 text-foreground border-primary/30",
  ANTI_CORRUPTION: "bg-primary/15 text-foreground border-primary/30",
  EMERGENCY: "bg-destructive/15 text-destructive border-destructive/25",
  REGIONAL_COMMISSIONER: "bg-yb-yellow-deep text-primary-foreground border-yb-yellow-deep",
  REGIONAL_ADMIN_SECRETARY: "bg-secondary text-foreground border-border",
  REGIONAL_POLICE_COMMANDER: "bg-yb-charcoal-dark text-primary border-yb-charcoal-dark",
  DISTRICT_COMMISSIONER: "bg-yb-yellow-deep text-primary-foreground border-yb-yellow-deep",
  DISTRICT_EXECUTIVE_DIRECTOR: "bg-secondary text-foreground border-border",
  MUNICIPAL_MAYOR: "bg-primary/15 text-foreground border-primary/30",
  DISTRICT_POLICE_COMMANDER: "bg-yb-charcoal-dark text-primary border-yb-charcoal-dark",
  DIVISION_OFFICER: "bg-secondary text-foreground border-border",
  WARD_EXECUTIVE_OFFICER: "bg-secondary text-foreground border-border",
  WARD_COUNCILLOR: "bg-primary/15 text-foreground border-primary/30",
  VILLAGE_EXECUTIVE_OFFICER: "bg-secondary text-foreground border-border",
  VILLAGE_CHAIRMAN: "bg-primary/15 text-foreground border-primary/30",
};

// ============================================================
// HELPER: Create an Official record
// ============================================================

function mkOfficial(
  id: string,
  full_name: string,
  role_type: RoleType,
  role_title: string,
  opts: {
    region?: string;
    district?: string;
    division?: string;
    constituency?: string;
    ward?: string;
    village_mtaa?: string;
    ministry?: string;
    court_name?: string;
    police_station?: string;
    office_address?: string;
    party?: string;
    phone?: string;
    email?: string;
    verified?: boolean;
    source?: string;
    date?: string;
    photo?: string;
  } = {}
): Official {
  const contacts: OfficialContact[] = [];
  if (opts.phone) contacts.push({ type: "phone", value: opts.phone, verified: opts.verified ?? false });
  if (opts.email) contacts.push({ type: "email", value: opts.email, verified: opts.verified ?? false });
  if (opts.office_address) contacts.push({ type: "office_address", value: opts.office_address, verified: opts.verified ?? false });

  return {
    id,
    full_name,
    profile_photo_url: opts.photo || "",
    role_type,
    role_title,
    verified_status: opts.verified ? "VERIFIED" : "UNVERIFIED",
    verified_source: opts.source || "",
    last_verified_date: opts.date || "2026-03-08",
    party: opts.party || "",
    location: {
      region: opts.region || "",
      district: opts.district || "",
      division: opts.division || "",
      ward: opts.ward || "",
      village_mtaa: opts.village_mtaa || "",
      constituency: opts.constituency || "",
    },
    institution: {
      ministry: opts.ministry || "",
      court_name: opts.court_name || "",
      police_station: opts.police_station || "",
      office_address: opts.office_address || "",
    },
    contacts,
  };
}

// ============================================================
// CORE OFFICIALS — National Leadership & Cabinet
// ============================================================

const coreOfficials: Official[] = [
  // ── TOP LEADERSHIP ──
  mkOfficial("nat-001", "H.E. Dr. Samia Suluhu Hassan", "PRESIDENT", "President of the United Republic of Tanzania", { party: "CCM", phone: "+255-22-211-6898", email: "info@ikulu.go.tz", office_address: "State House (Ikulu), Dar es Salaam", verified: true, source: "ikulu.go.tz" }),
  mkOfficial("nat-002", "H.E. Emmanuel Nchimbi", "PRESIDENT", "Vice President", { party: "CCM", phone: "+255-22-211-3856", email: "info@vpo.go.tz", office_address: "Office of the Vice President, Dar es Salaam", verified: true, source: "vpo.go.tz" }),
  mkOfficial("nat-003", "H.E. Dr. Mwigulu Nchemba", "PRESIDENT", "Prime Minister", { party: "CCM", phone: "+255-26-232-2443", email: "info@pmo.go.tz", office_address: "Prime Minister's Office, Dodoma", verified: true, source: "pmo.go.tz" }),
  mkOfficial("nat-004", "H.E. Dr. Tulia Ackson", "SPEAKER", "Speaker of the National Assembly", { party: "CCM", phone: "+255-26-232-2761", email: "speaker@bunge.go.tz", office_address: "National Assembly, Dodoma", verified: true, source: "bunge.go.tz" }),
  mkOfficial("nat-005", "Prof. Ibrahim Hamisi Juma", "JUDGE", "Chief Justice of Tanzania", { phone: "+255-22-211-6065", email: "info@judiciary.go.tz", office_address: "High Court, Dar es Salaam", verified: true, source: "judiciary.go.tz", court_name: "Court of Appeal / High Court" }),
  mkOfficial("nat-006", "IGP Camillus Wambura", "POLICE", "Inspector General of Police", { phone: "+255-22-211-7152", email: "igp@polisi.go.tz", office_address: "Police Headquarters, Dar es Salaam", verified: true, source: "polisi.go.tz", police_station: "National Police HQ" }),

  // ── CABINET MINISTERS (Nov 2025 / Jan 2026 Reshuffle) ──
  mkOfficial("min-finance", "Khamis Mussa Omar", "MINISTER", "Minister of Finance", { party: "CCM", email: "ps@mof.go.tz", ministry: "Ministry of Finance", office_address: "Ministry of Finance, Dodoma", verified: true, source: "mof.go.tz" }),
  mkOfficial("dmin-finance-1", "Loren Deogratius Luswetula", "DEPUTY_MINISTER", "Deputy Minister of Finance", { party: "CCM", email: "ps@mof.go.tz", ministry: "Ministry of Finance", office_address: "Ministry of Finance, Dodoma", verified: true, source: "mof.go.tz" }),
  mkOfficial("dmin-finance-2", "Mshamo Munde", "DEPUTY_MINISTER", "Deputy Minister of Finance", { party: "CCM", email: "ps@mof.go.tz", ministry: "Ministry of Finance", office_address: "Ministry of Finance, Dodoma", verified: true, source: "mof.go.tz" }),

  mkOfficial("min-home", "George Boniface Simbachawene", "MINISTER", "Minister of Home Affairs", { party: "CCM", email: "ps@moha.go.tz", ministry: "Ministry of Home Affairs", office_address: "Ministry of Home Affairs, Dodoma", verified: true, source: "moha.go.tz" }),
  mkOfficial("dmin-home", "Denis Londo", "DEPUTY_MINISTER", "Deputy Minister of Home Affairs", { party: "CCM", email: "ps@moha.go.tz", ministry: "Ministry of Home Affairs", office_address: "Ministry of Home Affairs, Dodoma", verified: true, source: "moha.go.tz" }),
  mkOfficial("ps-home", "PS — Ministry of Home Affairs", "PERMANENT_SECRETARY", "Permanent Secretary — Home Affairs", { email: "ps@moha.go.tz", ministry: "Ministry of Home Affairs", office_address: "Ministry of Home Affairs, Dodoma", source: "moha.go.tz" }),

  mkOfficial("min-foreign", "Mahmoud Thabit Kombo", "MINISTER", "Minister of Foreign Affairs & East African Cooperation", { party: "CCM", email: "info@foreign.go.tz", ministry: "Ministry of Foreign Affairs", office_address: "Ministry of Foreign Affairs, Dodoma", verified: true, source: "foreign.go.tz" }),
  mkOfficial("ps-foreign", "PS — Ministry of Foreign Affairs", "PERMANENT_SECRETARY", "Permanent Secretary — Foreign Affairs", { email: "ps@foreign.go.tz", ministry: "Ministry of Foreign Affairs", office_address: "Ministry of Foreign Affairs, Dodoma", source: "foreign.go.tz" }),

  mkOfficial("min-health", "Mohamed Mchengerwa", "MINISTER", "Minister of Health", { party: "CCM", email: "info@moh.go.tz", ministry: "Ministry of Health", office_address: "Ministry of Health, Dodoma", verified: true, source: "moh.go.tz" }),
  mkOfficial("ps-health", "PS — Ministry of Health", "PERMANENT_SECRETARY", "Permanent Secretary — Health", { email: "ps@moh.go.tz", ministry: "Ministry of Health", office_address: "Ministry of Health, Dodoma", source: "moh.go.tz" }),

  mkOfficial("min-edu", "Prof. Adolf Mkenda", "MINISTER", "Minister of Education, Science & Technology", { party: "CCM", email: "info@moest.go.tz", ministry: "Ministry of Education", office_address: "Ministry of Education, Dodoma", verified: true, source: "moest.go.tz" }),
  mkOfficial("ps-edu", "PS — Ministry of Education", "PERMANENT_SECRETARY", "Permanent Secretary — Education", { email: "ps@moest.go.tz", ministry: "Ministry of Education", office_address: "Ministry of Education, Dodoma", source: "moest.go.tz" }),

  mkOfficial("min-info", "Paul Makonda", "MINISTER", "Minister of Information, Culture, Arts & Sports", { party: "CCM", email: "info@habari.go.tz", ministry: "Ministry of Information & Culture", office_address: "Ministry of Information, Dodoma", verified: true, source: "habari.go.tz" }),

  mkOfficial("min-tamisemi", "Angellah Kairuki", "MINISTER", "Minister of State — TAMISEMI (Local Government)", { party: "CCM", email: "info@tamisemi.go.tz", ministry: "TAMISEMI", office_address: "TAMISEMI, Dodoma", verified: true, source: "tamisemi.go.tz" }),
  mkOfficial("ps-tamisemi", "PS — TAMISEMI", "PERMANENT_SECRETARY", "Permanent Secretary — TAMISEMI", { email: "ps@tamisemi.go.tz", ministry: "TAMISEMI", office_address: "TAMISEMI, Dodoma", source: "tamisemi.go.tz" }),

  mkOfficial("min-energy", "Deogratius Ndejembi", "MINISTER", "Minister of Energy", { party: "CCM", email: "info@nishati.go.tz", ministry: "Ministry of Energy", office_address: "Ministry of Energy, Dodoma", verified: true, source: "nishati.go.tz" }),

  mkOfficial("min-agri", "Daniel Chongolo", "MINISTER", "Minister of Agriculture", { party: "CCM", email: "info@kilimo.go.tz", ministry: "Ministry of Agriculture", office_address: "Ministry of Agriculture, Dodoma", verified: true, source: "kilimo.go.tz" }),

  mkOfficial("min-works", "Prof. Makame Mbarawa", "MINISTER", "Minister of Works & Transport", { party: "CCM", email: "info@uchukuzi.go.tz", ministry: "Ministry of Works & Transport", office_address: "Ministry of Works & Transport, Dodoma", verified: true, source: "uchukuzi.go.tz" }),

  mkOfficial("min-tourism", "Dr. Pindi Chana", "MINISTER", "Minister of Natural Resources & Tourism", { party: "CCM", email: "info@mnrt.go.tz", ministry: "Ministry of Natural Resources & Tourism", office_address: "Ministry of Natural Resources, Dodoma", verified: true, source: "mnrt.go.tz" }),

  mkOfficial("min-water", "Jumaa Aweso", "MINISTER", "Minister of Water", { party: "CCM", email: "info@maji.go.tz", ministry: "Ministry of Water", office_address: "Ministry of Water, Dodoma", verified: true, source: "maji.go.tz" }),

  mkOfficial("min-lands", "William Lukuvi", "MINISTER", "Minister of Lands, Housing & Human Settlements", { party: "CCM", email: "info@ardhi.go.tz", ministry: "Ministry of Lands", office_address: "Ministry of Lands, Dodoma", verified: true, source: "ardhi.go.tz" }),

  mkOfficial("min-defence", "Rhimo Simeon Nyansaho", "MINISTER", "Minister of Defence & National Service", { party: "CCM", email: "info@modans.go.tz", ministry: "Ministry of Defence", office_address: "Ministry of Defence, Dodoma", verified: true, source: "modans.go.tz" }),

  mkOfficial("min-legal", "Juma Zuberi Omera", "MINISTER", "Minister of Constitutional & Legal Affairs", { party: "CCM", email: "info@sheria.go.tz", ministry: "Ministry of Constitutional & Legal Affairs", office_address: "Ministry of Legal Affairs, Dodoma", verified: true, source: "sheria.go.tz" }),
  mkOfficial("dmin-legal", "Zainab Athumani Katimba", "DEPUTY_MINISTER", "Deputy Minister — Constitutional & Legal Affairs", { party: "CCM", email: "info@sheria.go.tz", ministry: "Ministry of Constitutional & Legal Affairs", office_address: "Ministry of Legal Affairs, Dodoma", verified: true, source: "sheria.go.tz" }),

  mkOfficial("min-trade", "Ashatu Kijaji", "MINISTER", "Minister of Industry & Trade", { party: "CCM", email: "info@mit.go.tz", ministry: "Ministry of Industry & Trade", office_address: "Ministry of Industry & Trade, Dodoma", verified: true, source: "mit.go.tz" }),

  mkOfficial("min-minerals", "Anthony Peter Mavunde", "MINISTER", "Minister of Minerals", { party: "CCM", email: "info@madini.go.tz", ministry: "Ministry of Minerals", office_address: "Ministry of Minerals, Dodoma", verified: true, source: "madini.go.tz" }),

  mkOfficial("min-livestock", "Abdallah Ulega", "MINISTER", "Minister of Livestock & Fisheries", { party: "CCM", email: "info@mifugouvuvi.go.tz", ministry: "Ministry of Livestock & Fisheries", office_address: "Ministry of Livestock, Dodoma", verified: true, source: "mifugouvuvi.go.tz" }),

  mkOfficial("min-gender", "Dr. Dorothy Gwajima", "MINISTER", "Minister of Community Development, Gender & Special Groups", { party: "CCM", email: "info@maendeleo.go.tz", ministry: "Ministry of Community Development", office_address: "Ministry of Community Development, Dodoma", verified: true, source: "maendeleo.go.tz" }),

  mkOfficial("min-labour", "Dr. Gwang'ombe", "MINISTER", "Minister of Labour & Employment", { party: "CCM", email: "info@kazi.go.tz", ministry: "Ministry of Labour & Employment", office_address: "Ministry of Labour, Dodoma", verified: true, source: "kazi.go.tz" }),

  mkOfficial("min-ict", "Nape Nnauye", "MINISTER", "Minister of Information & Communication Technology", { party: "CCM", email: "info@mawasiliano.go.tz", ministry: "Ministry of ICT", office_address: "Ministry of ICT, Dodoma", verified: true, source: "mawasiliano.go.tz" }),

  mkOfficial("min-pubservice", "Ridhiwani Jakaya Kikwete", "MINISTER", "Minister — President's Office (Public Service & Good Governance)", { party: "CCM", email: "info@utumishi.go.tz", ministry: "President's Office (Public Service)", office_address: "President's Office, Dodoma", verified: true, source: "utumishi.go.tz" }),
  mkOfficial("dmin-pubservice", "Regina Ndege Qwaray", "DEPUTY_MINISTER", "Deputy Minister — Public Service & Good Governance", { party: "CCM", email: "info@utumishi.go.tz", ministry: "President's Office (Public Service)", office_address: "President's Office, Dodoma", verified: true, source: "utumishi.go.tz" }),

  mkOfficial("min-planning", "Prof. Kitila Alexander Mikumbo", "MINISTER", "Minister — President's Office (Planning & Investment)", { party: "CCM", email: "info@mipango.go.tz", ministry: "President's Office (Planning & Investment)", office_address: "President's Office, Dodoma", verified: true, source: "mipango.go.tz" }),
  mkOfficial("dmin-planning", "Pius Stephen Chaya", "DEPUTY_MINISTER", "Deputy Minister — Planning & Investment", { party: "CCM", email: "info@mipango.go.tz", ministry: "President's Office (Planning & Investment)", office_address: "President's Office, Dodoma", verified: true, source: "mipango.go.tz" }),

  mkOfficial("min-youth", "Joel Arthur Nanauka", "MINISTER", "Minister of Youth Development", { party: "CCM", email: "info@vijana.go.tz", ministry: "Ministry of Youth Development", office_address: "Ministry of Youth, Dodoma", verified: true, source: "vijana.go.tz" }),

  // ── REGIONAL COMMISSIONERS (All 31 Regions) ──
  mkOfficial("rc-dsm", "Albert John Chalamila", "REGIONAL_COMMISSIONER", "Regional Commissioner — Dar es Salaam", { region: "Dar es Salaam", phone: "+255-22-220-3158", email: "rc.dsm@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Dar es Salaam", verified: true, source: "dsm.go.tz" }),
  mkOfficial("rc-dodoma", "Rosemary S. Senyamule", "REGIONAL_COMMISSIONER", "Regional Commissioner — Dodoma", { region: "Dodoma", phone: "+255-26-232-4343", email: "rc.dodoma@tamisemi.go.tz", office_address: "Mkapa Building, Dodoma", verified: true, source: "dodoma.go.tz" }),
  mkOfficial("rc-arusha", "Amos Gabriel Makalla", "REGIONAL_COMMISSIONER", "Regional Commissioner — Arusha", { region: "Arusha", email: "rc.arusha@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Arusha", verified: true, source: "arusha.go.tz" }),
  mkOfficial("rc-mwanza", "Said Mohamed Mtanda", "REGIONAL_COMMISSIONER", "Regional Commissioner — Mwanza", { region: "Mwanza", email: "rc.mwanza@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Mwanza", verified: true, source: "mwanza.go.tz" }),
  mkOfficial("rc-tanga", "Dr. Batilda Burian", "REGIONAL_COMMISSIONER", "Regional Commissioner — Tanga", { region: "Tanga", phone: "027-264-2421", email: "rc.tanga@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Tanga", verified: true, source: "tanga.go.tz" }),
  mkOfficial("rc-kilimanjaro", "Nurdin Hassan Babu", "REGIONAL_COMMISSIONER", "Regional Commissioner — Kilimanjaro", { region: "Kilimanjaro", email: "rc.kilimanjaro@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Moshi", verified: true, source: "kilimanjaro.go.tz" }),
  mkOfficial("rc-mbeya", "Beno Moris Malisa", "REGIONAL_COMMISSIONER", "Regional Commissioner — Mbeya", { region: "Mbeya", email: "rc.mbeya@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Mbeya", verified: true, source: "mbeya.go.tz" }),
  mkOfficial("rc-morogoro", "Adam Kighoma Malima", "REGIONAL_COMMISSIONER", "Regional Commissioner — Morogoro", { region: "Morogoro", email: "rc.morogoro@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Morogoro", verified: true, source: "morogoro.go.tz" }),
  mkOfficial("rc-kagera", "Col. Yahya Ramadhani Kido", "REGIONAL_COMMISSIONER", "Regional Commissioner — Kagera", { region: "Kagera", email: "rc.kagera@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Bukoba", verified: true, source: "kagera.go.tz" }),
  mkOfficial("rc-pwani", "Abubakar Mussa Kunenge", "REGIONAL_COMMISSIONER", "Regional Commissioner — Pwani", { region: "Pwani", email: "rc.pwani@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Kibaha", verified: true, source: "pwani.go.tz" }),
  mkOfficial("rc-iringa", "Kheri Denice James", "REGIONAL_COMMISSIONER", "Regional Commissioner — Iringa", { region: "Iringa", email: "rc.iringa@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Iringa", verified: true, source: "iringa.go.tz" }),
  mkOfficial("rc-mtwara", "Col. Donald Msengi", "REGIONAL_COMMISSIONER", "Regional Commissioner — Mtwara", { region: "Mtwara", email: "rc.mtwara@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Mtwara", verified: true, source: "mtwara.go.tz" }),
  mkOfficial("rc-manyara", "Queen Cuthbert Sendiga", "REGIONAL_COMMISSIONER", "Regional Commissioner — Manyara", { region: "Manyara", email: "rc.manyara@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Babati", verified: true, source: "manyara.go.tz" }),
  mkOfficial("rc-rukwa", "Charles Makongoro Nyerere", "REGIONAL_COMMISSIONER", "Regional Commissioner — Rukwa", { region: "Rukwa", email: "rc.rukwa@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Sumbawanga", verified: true, source: "rukwa.go.tz" }),
  mkOfficial("rc-lindi", "Abdulrahman Khamis Mteza", "REGIONAL_COMMISSIONER", "Regional Commissioner — Lindi", { region: "Lindi", email: "rc.lindi@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Lindi", source: "TAMISEMI" }),
  mkOfficial("rc-singida", "Dr. Binilith Satano Mahenge", "REGIONAL_COMMISSIONER", "Regional Commissioner — Singida", { region: "Singida", email: "rc.singida@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Singida", verified: true, source: "singida.go.tz" }),
  mkOfficial("rc-tabora", "Dr. Rashid Aboud Chuachua", "REGIONAL_COMMISSIONER", "Regional Commissioner — Tabora", { region: "Tabora", email: "rc.tabora@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Tabora", verified: true, source: "tabora.go.tz" }),
  mkOfficial("rc-kigoma", "Thobia Kijaro", "REGIONAL_COMMISSIONER", "Regional Commissioner — Kigoma", { region: "Kigoma", email: "rc.kigoma@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Kigoma", verified: true, source: "kigoma.go.tz" }),
  mkOfficial("rc-shinyanga", "Zainab Telack", "REGIONAL_COMMISSIONER", "Regional Commissioner — Shinyanga", { region: "Shinyanga", email: "rc.shinyanga@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Shinyanga", source: "TAMISEMI" }),
  mkOfficial("rc-geita", "Robert Sobukwa Gabriel", "REGIONAL_COMMISSIONER", "Regional Commissioner — Geita", { region: "Geita", email: "rc.geita@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Geita", source: "TAMISEMI" }),
  mkOfficial("rc-simiyu", "Dr. Angelina Mabula", "REGIONAL_COMMISSIONER", "Regional Commissioner — Simiyu", { region: "Simiyu", email: "rc.simiyu@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Bariadi", verified: true, source: "simiyu.go.tz" }),
  mkOfficial("rc-njombe", "Renatus Mdudula", "REGIONAL_COMMISSIONER", "Regional Commissioner — Njombe", { region: "Njombe", email: "rc.njombe@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Njombe", verified: true, source: "njombe.go.tz" }),
  mkOfficial("rc-katavi", "Dr. Mary Nagu Mwanjelwa", "REGIONAL_COMMISSIONER", "Regional Commissioner — Katavi", { region: "Katavi", email: "rc.katavi@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Mpanda", verified: true, source: "katavi.go.tz" }),
  mkOfficial("rc-ruvuma", "Dr. Pindi Chana", "REGIONAL_COMMISSIONER", "Regional Commissioner — Ruvuma", { region: "Ruvuma", email: "rc.ruvuma@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Songea", verified: true, source: "ruvuma.go.tz" }),
  mkOfficial("rc-songwe", "Dr. Margreth Ikongwe Sitta", "REGIONAL_COMMISSIONER", "Regional Commissioner — Songwe", { region: "Songwe", email: "rc.songwe@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Vwawa", source: "TAMISEMI" }),
  mkOfficial("rc-mara", "Col. Idd Hussein Kimanta", "REGIONAL_COMMISSIONER", "Regional Commissioner — Mara", { region: "Mara", email: "rc.mara@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Musoma", source: "TAMISEMI" }),

  // ── DSM DISTRICT COMMISSIONERS ──
  mkOfficial("dc-ilala", "Sophia Mjema", "DISTRICT_COMMISSIONER", "District Commissioner — Ilala", { region: "Dar es Salaam", district: "Ilala", email: "dc.ilala@tamisemi.go.tz", office_address: "District Commissioner's Office, Ilala", verified: true, source: "ilalamc.go.tz" }),
  mkOfficial("dc-kinondoni", "Albert Chalamila Jr.", "DISTRICT_COMMISSIONER", "District Commissioner — Kinondoni", { region: "Dar es Salaam", district: "Kinondoni", email: "dc.kinondoni@tamisemi.go.tz", office_address: "District Commissioner's Office, Kinondoni", source: "kinondonmc.go.tz" }),
  mkOfficial("dc-temeke", "Jokate Mwegelo", "DISTRICT_COMMISSIONER", "District Commissioner — Temeke", { region: "Dar es Salaam", district: "Temeke", email: "dc.temeke@tamisemi.go.tz", office_address: "District Commissioner's Office, Temeke", verified: true, source: "temekemc.go.tz" }),
  mkOfficial("dc-ubungo", "Anne Kilango Malecela", "DISTRICT_COMMISSIONER", "District Commissioner — Ubungo", { region: "Dar es Salaam", district: "Ubungo", email: "dc.ubungo@tamisemi.go.tz", office_address: "District Commissioner's Office, Ubungo", source: "ubungomc.go.tz" }),
  mkOfficial("dc-kigamboni", "John Osmund Nchimbi", "DISTRICT_COMMISSIONER", "District Commissioner — Kigamboni", { region: "Dar es Salaam", district: "Kigamboni", email: "dc.kigamboni@tamisemi.go.tz", office_address: "District Commissioner's Office, Kigamboni", source: "kigambonimc.go.tz" }),

  // ── RAS ──
  mkOfficial("ras-dsm", "Abdul Rajab Mhinte", "REGIONAL_ADMIN_SECRETARY", "Regional Administrative Secretary — Dar es Salaam", { region: "Dar es Salaam", phone: "+255-22-220-3156", email: "ras@dsm.go.tz", office_address: "Regional Commissioner's Office, Dar es Salaam", verified: true, source: "dsm.go.tz" }),
  mkOfficial("ras-arusha", "Missaile Albano Musa", "REGIONAL_ADMIN_SECRETARY", "Regional Administrative Secretary — Arusha", { region: "Arusha", email: "ras.arusha@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Arusha", verified: true, source: "arusha.go.tz" }),
  mkOfficial("ras-mwanza", "Balandya Mayuganya Elikana", "REGIONAL_ADMIN_SECRETARY", "Regional Administrative Secretary — Mwanza", { region: "Mwanza", email: "ras.mwanza@tamisemi.go.tz", office_address: "Regional Commissioner's Office, Mwanza", verified: true, source: "mwanza.go.tz" }),

  // ── JUDGES ──
  mkOfficial("judge-dsm", "Resident Judge — Dar es Salaam", "JUDGE", "Resident Judge — High Court", { region: "Dar es Salaam", phone: "+255-22-211-2758", email: "hc.dsm@judiciary.go.tz", office_address: "High Court, Dar es Salaam", court_name: "High Court, Dar es Salaam", verified: true, source: "judiciary.go.tz" }),
  mkOfficial("judge-dodoma", "Resident Judge — Dodoma", "JUDGE", "Resident Judge — High Court", { region: "Dodoma", email: "hc.dodoma@judiciary.go.tz", office_address: "High Court, Dodoma", court_name: "High Court, Dodoma", source: "judiciary.go.tz" }),
];

// ============================================================
// GENERATE POLICE OFFICIALS
// ============================================================

import { tanzaniaRegions } from "./tanzania_directory";

function generatePoliceOfficials(): Official[] {
  const result: Official[] = [];
  // Generate PCCB regional offices
  tanzaniaRegions.forEach((r) => {
    if (r.name.startsWith("Unguja") || r.name.startsWith("Pemba")) return;
    result.push(mkOfficial(
      `pccb-${r.name.toLowerCase().replace(/\s/g, "-")}`,
      `PCCB Office — ${r.name}`,
      "ANTI_CORRUPTION",
      `Anti-Corruption Bureau — ${r.name}`,
      { region: r.name, phone: "113", email: `pccb.${r.name.toLowerCase().replace(/\s/g, "")}@pccb.go.tz`, office_address: `PCCB Office, ${r.capital}`, source: "pccb.go.tz" }
    ));
  });
  return result;
}

// ============================================================
// GENERATE MP OFFICIALS FROM mps_data
// ============================================================

function generateMPOfficials(): Official[] {
  return mpData.map((mp) =>
    mkOfficial(
      `mp-${mp.constituency.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      mp.name,
      "MP",
      `MP for ${mp.constituency}`,
      {
        region: mp.region,
        district: mp.district,
        constituency: mp.constituency,
        party: mp.party,
        email: `${mp.name.split(" ").pop()?.toLowerCase() || "mp"}@bunge.go.tz`,
        office_address: `National Assembly, Dodoma / ${mp.constituency} Constituency`,
        source: "bunge.go.tz / Wikipedia",
      }
    )
  );
}

// ============================================================
// MERGE ALL — Single unified array (dedup by ID)
// ============================================================

const allGenerated = [...generatePoliceOfficials(), ...generateMPOfficials()];
const idSet = new Set(coreOfficials.map((o) => o.id));

export const officials: Official[] = [
  ...coreOfficials,
  ...allGenerated.filter((o) => {
    if (idSet.has(o.id)) return false;
    idSet.add(o.id);
    return true;
  }),
];

// ============================================================
// SEARCH & LOOKUP FUNCTIONS
// ============================================================

/** Full-text search across all relevant fields */
export function searchOfficials(query: string): Official[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return officials.filter((o) =>
    o.full_name.toLowerCase().includes(q) ||
    o.role_title.toLowerCase().includes(q) ||
    o.location.region.toLowerCase().includes(q) ||
    o.location.district.toLowerCase().includes(q) ||
    o.location.constituency.toLowerCase().includes(q) ||
    o.institution.ministry.toLowerCase().includes(q) ||
    o.institution.office_address.toLowerCase().includes(q) ||
    o.party.toLowerCase().includes(q) ||
    roleTypeLabels[o.role_type].toLowerCase().includes(q)
  );
}

/** Get officials by region */
export function getOfficialsByRegion(region: string): Official[] {
  return officials.filter((o) => o.location.region === region);
}

/** Get officials by role_type */
export function getOfficialsByRole(role: RoleType): Official[] {
  return officials.filter((o) => o.role_type === role);
}

/** Get "Your Officials" for a region+district+ward */
export function getYourOfficials(region: string, district?: string, ward?: string): Official[] {
  const result: Official[] = [];

  // RC
  const rc = officials.find((o) => o.location.region === region && o.role_type === "REGIONAL_COMMISSIONER");
  if (rc) result.push(rc);

  // RAS
  const ras = officials.find((o) => o.location.region === region && o.role_type === "REGIONAL_ADMIN_SECRETARY");
  if (ras) result.push(ras);

  // DC
  if (district) {
    const dc = officials.find((o) => o.location.region === region && o.location.district === district && o.role_type === "DISTRICT_COMMISSIONER");
    if (dc) result.push(dc);
  }

  // WEO + Ward Councillor
  if (ward) {
    const weo = officials.find((o) => o.location.ward === ward && o.role_type === "WARD_EXECUTIVE_OFFICER");
    if (weo) result.push(weo);
    const councillor = officials.find((o) => o.location.ward === ward && o.role_type === "WARD_COUNCILLOR");
    if (councillor) result.push(councillor);
  }

  // MPs
  if (district) {
    const mps = officials.filter((o) => o.location.region === region && o.location.district === district && o.role_type === "MP");
    result.push(...mps);
  } else {
    const mps = officials.filter((o) => o.location.region === region && o.role_type === "MP").slice(0, 3);
    result.push(...mps);
  }

  // Police
  const rpc = officials.find((o) => o.location.region === region && o.role_type === "POLICE");
  if (rpc) result.push(rpc);

  // PCCB
  const pccb = officials.find((o) => o.location.region === region && o.role_type === "ANTI_CORRUPTION");
  if (pccb) result.push(pccb);

  // Judge
  const judge = officials.find((o) => o.location.region === region && o.role_type === "JUDGE");
  if (judge) result.push(judge);

  // TAMISEMI Minister
  const tamisemi = officials.find((o) => o.role_type === "MINISTER" && o.institution.ministry === "TAMISEMI");
  if (tamisemi) result.push(tamisemi);

  return result;
}

/** Get national-level officials */
export function getNationalOfficials(): Official[] {
  return officials.filter((o) => !o.location.region);
}

/** Get first contact of a type */
export function getContact(official: Official, type: OfficialContact["type"]): string {
  return official.contacts.find((c) => c.type === type)?.value || "";
}

/** Stats */
export const directoryStats = {
  totalOfficials: officials.length,
  totalRegions: 31,
  totalMPs: officials.filter((o) => o.role_type === "MP").length,
  totalMinisters: officials.filter((o) => o.role_type === "MINISTER").length,
};

// Re-export admin regions from tanzania_directory
export { tanzaniaRegions, allRegionNames, districtsByRegion } from "./tanzania_directory";
