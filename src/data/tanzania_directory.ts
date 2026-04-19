import { mpData, getMPsByRegion, getMPsByDistrict, type MPEntry } from "./mps_data";

/**
 * Tanzania Administrative Divisions + Officials Directory
 * All 31 regions with their districts, plus mapped officials
 */

// ============================================================
// ADMINISTRATIVE DIVISIONS — All 31 Regions & Districts
// ============================================================

export interface TzRegion {
  name: string;
  capital: string;
  districts: string[];
}

export const tanzaniaRegions: TzRegion[] = [
  { name: "Arusha", capital: "Arusha", districts: ["Arusha City", "Arusha DC", "Karatu", "Longido", "Meru", "Monduli", "Ngorongoro"] },
  { name: "Dar es Salaam", capital: "Dar es Salaam", districts: ["Ilala", "Kigamboni", "Kinondoni", "Temeke", "Ubungo"] },
  { name: "Dodoma", capital: "Dodoma", districts: ["Bahi", "Chamwino", "Chemba", "Dodoma City", "Kondoa", "Kongwa", "Mpwapwa"] },
  { name: "Geita", capital: "Geita", districts: ["Bukombe", "Chato", "Geita DC", "Geita TC", "Mbogwe", "Nyang'hwale"] },
  { name: "Iringa", capital: "Iringa", districts: ["Iringa DC", "Iringa MC", "Kilolo", "Mafinga TC", "Mufindi"] },
  { name: "Kagera", capital: "Bukoba", districts: ["Biharamulo", "Bukoba DC", "Bukoba MC", "Karagwe", "Kyerwa", "Missenyi", "Muleba", "Ngara"] },
  { name: "Katavi", capital: "Mpanda", districts: ["Mlele", "Mpanda DC", "Mpanda TC", "Nsimbo"] },
  { name: "Kigoma", capital: "Kigoma", districts: ["Buhigwe", "Kakonko", "Kasulu DC", "Kasulu TC", "Kibondo", "Kigoma DC", "Kigoma-Ujiji MC", "Uvinza"] },
  { name: "Kilimanjaro", capital: "Moshi", districts: ["Hai", "Moshi DC", "Moshi MC", "Mwanga", "Rombo", "Same", "Siha"] },
  { name: "Lindi", capital: "Lindi", districts: ["Kilwa", "Lindi DC", "Lindi MC", "Liwale", "Nachingwea", "Ruangwa"] },
  { name: "Manyara", capital: "Babati", districts: ["Babati DC", "Babati TC", "Hanang", "Kiteto", "Mbulu DC", "Mbulu TC", "Simanjiro"] },
  { name: "Mara", capital: "Musoma", districts: ["Bunda DC", "Bunda TC", "Butiama", "Musoma DC", "Musoma MC", "Rorya", "Serengeti", "Tarime DC", "Tarime TC"] },
  { name: "Mbeya", capital: "Mbeya", districts: ["Busokelo", "Chunya", "Mbarali", "Mbeya City", "Mbeya DC", "Rungwe"] },
  { name: "Morogoro", capital: "Morogoro", districts: ["Gairo", "Ifakara TC", "Kilombero", "Kilosa", "Malinyi", "Mlimba", "Morogoro DC", "Morogoro MC", "Mvomero", "Ulanga"] },
  { name: "Mtwara", capital: "Mtwara", districts: ["Masasi DC", "Masasi TC", "Mtwara DC", "Mtwara MC", "Nanyumbu", "Newala DC", "Newala TC", "Tandahimba"] },
  { name: "Mwanza", capital: "Mwanza", districts: ["Ilemela", "Kwimba", "Magu", "Misungwi", "Nyamagana", "Sengerema", "Ukerewe"] },
  { name: "Njombe", capital: "Njombe", districts: ["Ludewa", "Makambako TC", "Makete", "Njombe DC", "Njombe TC", "Wanging'ombe"] },
  { name: "Kaskazini Pemba", capital: "Wete", districts: ["Micheweni", "Wete"] },
  { name: "Kusini Pemba", capital: "Chake Chake", districts: ["Chake Chake", "Mkoani"] },
  { name: "Pwani", capital: "Kibaha", districts: ["Bagamoyo", "Chalinze", "Kibaha DC", "Kibaha TC", "Kisarawe", "Mafia", "Mkuranga", "Rufiji"] },
  { name: "Rukwa", capital: "Sumbawanga", districts: ["Kalambo", "Nkasi", "Sumbawanga DC", "Sumbawanga MC"] },
  { name: "Ruvuma", capital: "Songea", districts: ["Mbinga DC", "Mbinga TC", "Namtumbo", "Nyasa", "Songea DC", "Songea MC", "Tunduru"] },
  { name: "Shinyanga", capital: "Shinyanga", districts: ["Kahama DC", "Kahama TC", "Kishapu", "Msalala", "Shinyanga DC", "Shinyanga MC", "Ushetu"] },
  { name: "Simiyu", capital: "Bariadi", districts: ["Bariadi DC", "Bariadi TC", "Busega", "Itilima", "Maswa", "Meatu"] },
  { name: "Singida", capital: "Singida", districts: ["Ikungi", "Iramba", "Manyoni", "Mkalama", "Singida DC", "Singida MC"] },
  { name: "Songwe", capital: "Vwawa", districts: ["Ileje", "Mbozi", "Momba", "Songwe DC", "Tunduma TC"] },
  { name: "Tabora", capital: "Tabora", districts: ["Igunga", "Kaliua", "Nzega DC", "Nzega TC", "Sikonge", "Tabora MC", "Urambo", "Uyui"] },
  { name: "Tanga", capital: "Tanga", districts: ["Handeni DC", "Handeni TC", "Kilindi", "Korogwe DC", "Korogwe TC", "Lushoto", "Mkinga", "Muheza", "Pangani", "Tanga City"] },
  { name: "Kaskazini Unguja", capital: "Mkokotoni", districts: ["Kaskazini A", "Kaskazini B"] },
  { name: "Kusini Unguja", capital: "Makunduchi", districts: ["Kati", "Kusini"] },
  { name: "Mjini Magharibi", capital: "Zanzibar City", districts: ["Magharibi A", "Magharibi B", "Mjini"] },
];

/** Flat list of all region names */
export const allRegionNames = tanzaniaRegions.map((r) => r.name).sort();

/** Map region → districts */
export const districtsByRegion: Record<string, string[]> = {};
tanzaniaRegions.forEach((r) => {
  districtsByRegion[r.name] = [...r.districts].sort();
});

// ============================================================
// OFFICIAL TYPES & ROLES
// ============================================================

export type OfficialRole =
  | "RC"             // Regional Commissioner
  | "RAS"            // Regional Administrative Secretary
  | "DC"             // District Commissioner
  | "DED"            // District Executive Director
  | "MP"             // Member of Parliament
  | "RPC"            // Regional Police Commander
  | "OCD"            // Officer Commanding District
  | "Judge"          // Judge/Magistrate
  | "Minister"       // Cabinet Minister
  | "DeputyMinister" // Deputy Minister
  | "PS"             // Permanent Secretary
  | "President"      // President/VP/PM
  | "Speaker"        // Speaker of Parliament
  | "IGP"            // Inspector General of Police
  | "CJ"             // Chief Justice
  | "PCCB"           // Anti-Graft / TAKUKURU
  | "Emergency";     // Emergency Services

export const roleLabels: Record<OfficialRole, string> = {
  RC: "Mkuu wa Mkoa",
  RAS: "Katibu Tawala Mkoa",
  DC: "Mkuu wa Wilaya",
  DED: "Mkurugenzi wa Halmashauri",
  MP: "Mbunge",
  RPC: "Kamanda wa Polisi Mkoa",
  OCD: "Kamanda wa Polisi Wilaya",
  Judge: "Jaji/Hakimu",
  Minister: "Waziri",
  DeputyMinister: "Naibu Waziri",
  PS: "Katibu Mkuu (PS)",
  President: "Rais/Makamu/Waziri Mkuu",
  Speaker: "Spika",
  IGP: "Inspekta Jenerali wa Polisi",
  CJ: "Jaji Mkuu",
  PCCB: "TAKUKURU / Rushwa",
  Emergency: "Huduma za Dharura",
};

export const roleBadgeColors: Record<OfficialRole, string> = {
  RC: "bg-primary/10 text-primary border-primary/20",
  RAS: "bg-primary/10 text-primary border-primary/20",
  DC: "bg-accent/10 text-accent border-accent/20",
  DED: "bg-accent/10 text-accent border-accent/20",
  MP: "bg-gold/15 text-foreground border-gold/30",
  RPC: "bg-destructive/10 text-destructive border-destructive/20",
  OCD: "bg-destructive/10 text-destructive border-destructive/20",
  Judge: "bg-destructive/10 text-destructive border-destructive/20",
  Minister: "bg-primary/15 text-primary border-primary/25",
  DeputyMinister: "bg-primary/10 text-primary border-primary/15",
  PS: "bg-secondary text-foreground border-border",
  President: "bg-primary/15 text-primary border-primary/25",
  Speaker: "bg-gold/15 text-foreground border-gold/30",
  IGP: "bg-destructive/10 text-destructive border-destructive/20",
  CJ: "bg-destructive/10 text-destructive border-destructive/20",
  PCCB: "bg-gold/15 text-foreground border-gold/30",
  Emergency: "bg-destructive/15 text-destructive border-destructive/25",
};

export interface Official {
  id: string;
  name: string;
  role: OfficialRole;
  roleTitle: string;
  region: string;
  district: string;
  constituency: string;
  party: string;
  phone: string;
  email: string;
  office: string;
  photoUrl: string;
  verified: boolean;
  source: string;
  lastVerified: string;
}

// ============================================================
// EMERGENCY & ANTI-GRAFT CONTACTS (National)
// ============================================================

export interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  altPhone: string;
  email: string;
  category: "police" | "fire" | "medical" | "antigraft" | "gender" | "child" | "traffic";
}

export const emergencyContacts: EmergencyContact[] = [
  { id: "em-police", name: "Polisi — Police Emergency", description: "Nambari ya dharura ya polisi Tanzania nzima", phone: "112", altPhone: "999", email: "", category: "police" },
  { id: "em-fire", name: "Zimamoto — Fire & Rescue", description: "Huduma ya Zimamoto na Uokoaji", phone: "114", altPhone: "+255-22-211-7152", email: "", category: "fire" },
  { id: "em-ambulance", name: "Ambulansi — Ambulance", description: "Huduma ya Ambulansi na Dharura za Afya", phone: "115", altPhone: "114", email: "", category: "medical" },
  { id: "em-pccb", name: "TAKUKURU / PCCB — Anti-Corruption", description: "Ripoti rushwa na matumizi mabaya ya madaraka", phone: "113", altPhone: "+255-22-215-0043", email: "dg@pccb.go.tz", category: "antigraft" },
  { id: "em-gender", name: "Dawati la Jinsia — Gender Desk", description: "Ripoti ukatili wa kijinsia na vurugu majumbani", phone: "116", altPhone: "", email: "", category: "gender" },
  { id: "em-child", name: "Mtoto — Child Helpline", description: "Laini ya watoto — Ripoti unyanyasaji wa watoto", phone: "116", altPhone: "", email: "", category: "child" },
  { id: "em-traffic", name: "Usalama Barabarani — Traffic Police", description: "Ripoti ajali na ukiukaji wa sheria za barabara", phone: "112", altPhone: "", email: "", category: "traffic" },
  { id: "em-pccb-ia", name: "Internal Affairs — Maadili ya Polisi", description: "Ripoti tabia mbaya ya askari polisi", phone: "+255-22-211-7152", altPhone: "", email: "complaints@polisi.go.tz", category: "police" },
];

// ============================================================
// POLICE REGIONS — Tanzania has 35 Police Regions
// (Note: Police regions differ from administrative regions.
//  DSM has 5 police districts but is 1 admin region, etc.)
// ============================================================

interface PoliceRegionDef {
  policeRegion: string;       // Police region name
  adminRegion: string;        // Mapped admin region
  rpcId: string;
  rpcName: string;
  phone: string;
  email: string;
  districts: { name: string; ocdId: string }[];
}

const policeRegions: PoliceRegionDef[] = [
  // ── Dar es Salaam (5 police districts) ──
  { policeRegion: "Kinondoni", adminRegion: "Dar es Salaam", rpcId: "rpc-kinondoni", rpcName: "RPC Kinondoni", phone: "112", email: "rpc.kinondoni@polisi.go.tz", districts: [{ name: "Kinondoni", ocdId: "ocd-kinondoni" }, { name: "Ubungo", ocdId: "ocd-ubungo" }] },
  { policeRegion: "Ilala", adminRegion: "Dar es Salaam", rpcId: "rpc-ilala", rpcName: "RPC Ilala", phone: "112", email: "rpc.ilala@polisi.go.tz", districts: [{ name: "Ilala", ocdId: "ocd-ilala" }] },
  { policeRegion: "Temeke", adminRegion: "Dar es Salaam", rpcId: "rpc-temeke", rpcName: "RPC Temeke", phone: "112", email: "rpc.temeke@polisi.go.tz", districts: [{ name: "Temeke", ocdId: "ocd-temeke" }, { name: "Kigamboni", ocdId: "ocd-kigamboni" }] },
  // ── Other Mainland Regions ──
  { policeRegion: "Arusha", adminRegion: "Arusha", rpcId: "rpc-arusha", rpcName: "RPC Arusha", phone: "112", email: "rpc.arusha@polisi.go.tz", districts: [{ name: "Arusha City", ocdId: "ocd-arusha-city" }, { name: "Arusha DC", ocdId: "ocd-arusha-dc" }, { name: "Karatu", ocdId: "ocd-karatu" }, { name: "Longido", ocdId: "ocd-longido" }, { name: "Meru", ocdId: "ocd-meru" }, { name: "Monduli", ocdId: "ocd-monduli" }, { name: "Ngorongoro", ocdId: "ocd-ngorongoro" }] },
  { policeRegion: "Dodoma", adminRegion: "Dodoma", rpcId: "rpc-dodoma", rpcName: "RPC Dodoma", phone: "112", email: "rpc.dodoma@polisi.go.tz", districts: [{ name: "Dodoma City", ocdId: "ocd-dodoma-city" }, { name: "Bahi", ocdId: "ocd-bahi" }, { name: "Chamwino", ocdId: "ocd-chamwino" }, { name: "Chemba", ocdId: "ocd-chemba" }, { name: "Kondoa", ocdId: "ocd-kondoa" }, { name: "Kongwa", ocdId: "ocd-kongwa" }, { name: "Mpwapwa", ocdId: "ocd-mpwapwa" }] },
  { policeRegion: "Geita", adminRegion: "Geita", rpcId: "rpc-geita", rpcName: "RPC Geita", phone: "112", email: "rpc.geita@polisi.go.tz", districts: [{ name: "Geita DC", ocdId: "ocd-geita-dc" }, { name: "Geita TC", ocdId: "ocd-geita-tc" }, { name: "Bukombe", ocdId: "ocd-bukombe" }, { name: "Chato", ocdId: "ocd-chato" }, { name: "Mbogwe", ocdId: "ocd-mbogwe" }, { name: "Nyang'hwale", ocdId: "ocd-nyanghwale" }] },
  { policeRegion: "Iringa", adminRegion: "Iringa", rpcId: "rpc-iringa", rpcName: "RPC Iringa", phone: "112", email: "rpc.iringa@polisi.go.tz", districts: [{ name: "Iringa MC", ocdId: "ocd-iringa-mc" }, { name: "Iringa DC", ocdId: "ocd-iringa-dc" }, { name: "Kilolo", ocdId: "ocd-kilolo" }, { name: "Mafinga TC", ocdId: "ocd-mafinga" }, { name: "Mufindi", ocdId: "ocd-mufindi" }] },
  { policeRegion: "Kagera", adminRegion: "Kagera", rpcId: "rpc-kagera", rpcName: "RPC Kagera", phone: "112", email: "rpc.kagera@polisi.go.tz", districts: [{ name: "Bukoba MC", ocdId: "ocd-bukoba-mc" }, { name: "Bukoba DC", ocdId: "ocd-bukoba-dc" }, { name: "Biharamulo", ocdId: "ocd-biharamulo" }, { name: "Karagwe", ocdId: "ocd-karagwe" }, { name: "Kyerwa", ocdId: "ocd-kyerwa" }, { name: "Missenyi", ocdId: "ocd-missenyi" }, { name: "Muleba", ocdId: "ocd-muleba" }, { name: "Ngara", ocdId: "ocd-ngara" }] },
  { policeRegion: "Katavi", adminRegion: "Katavi", rpcId: "rpc-katavi", rpcName: "RPC Katavi", phone: "112", email: "rpc.katavi@polisi.go.tz", districts: [{ name: "Mpanda TC", ocdId: "ocd-mpanda-tc" }, { name: "Mpanda DC", ocdId: "ocd-mpanda-dc" }, { name: "Mlele", ocdId: "ocd-mlele" }, { name: "Nsimbo", ocdId: "ocd-nsimbo" }] },
  { policeRegion: "Kigoma", adminRegion: "Kigoma", rpcId: "rpc-kigoma", rpcName: "RPC Kigoma", phone: "112", email: "rpc.kigoma@polisi.go.tz", districts: [{ name: "Kigoma-Ujiji MC", ocdId: "ocd-kigoma-mc" }, { name: "Kigoma DC", ocdId: "ocd-kigoma-dc" }, { name: "Kasulu DC", ocdId: "ocd-kasulu-dc" }, { name: "Kasulu TC", ocdId: "ocd-kasulu-tc" }, { name: "Kibondo", ocdId: "ocd-kibondo" }, { name: "Buhigwe", ocdId: "ocd-buhigwe" }, { name: "Kakonko", ocdId: "ocd-kakonko" }, { name: "Uvinza", ocdId: "ocd-uvinza" }] },
  { policeRegion: "Kilimanjaro", adminRegion: "Kilimanjaro", rpcId: "rpc-kilimanjaro", rpcName: "RPC Kilimanjaro", phone: "112", email: "rpc.kilimanjaro@polisi.go.tz", districts: [{ name: "Moshi MC", ocdId: "ocd-moshi-mc" }, { name: "Moshi DC", ocdId: "ocd-moshi-dc" }, { name: "Hai", ocdId: "ocd-hai" }, { name: "Mwanga", ocdId: "ocd-mwanga" }, { name: "Rombo", ocdId: "ocd-rombo" }, { name: "Same", ocdId: "ocd-same" }, { name: "Siha", ocdId: "ocd-siha" }] },
  { policeRegion: "Lindi", adminRegion: "Lindi", rpcId: "rpc-lindi", rpcName: "RPC Lindi", phone: "112", email: "rpc.lindi@polisi.go.tz", districts: [{ name: "Lindi MC", ocdId: "ocd-lindi-mc" }, { name: "Lindi DC", ocdId: "ocd-lindi-dc" }, { name: "Kilwa", ocdId: "ocd-kilwa" }, { name: "Liwale", ocdId: "ocd-liwale" }, { name: "Nachingwea", ocdId: "ocd-nachingwea" }, { name: "Ruangwa", ocdId: "ocd-ruangwa" }] },
  { policeRegion: "Manyara", adminRegion: "Manyara", rpcId: "rpc-manyara", rpcName: "RPC Manyara", phone: "112", email: "rpc.manyara@polisi.go.tz", districts: [{ name: "Babati TC", ocdId: "ocd-babati-tc" }, { name: "Babati DC", ocdId: "ocd-babati-dc" }, { name: "Hanang", ocdId: "ocd-hanang" }, { name: "Kiteto", ocdId: "ocd-kiteto" }, { name: "Mbulu DC", ocdId: "ocd-mbulu-dc" }, { name: "Mbulu TC", ocdId: "ocd-mbulu-tc" }, { name: "Simanjiro", ocdId: "ocd-simanjiro" }] },
  { policeRegion: "Mara", adminRegion: "Mara", rpcId: "rpc-mara", rpcName: "RPC Mara", phone: "112", email: "rpc.mara@polisi.go.tz", districts: [{ name: "Musoma MC", ocdId: "ocd-musoma-mc" }, { name: "Musoma DC", ocdId: "ocd-musoma-dc" }, { name: "Bunda DC", ocdId: "ocd-bunda-dc" }, { name: "Bunda TC", ocdId: "ocd-bunda-tc" }, { name: "Butiama", ocdId: "ocd-butiama" }, { name: "Rorya", ocdId: "ocd-rorya" }, { name: "Serengeti", ocdId: "ocd-serengeti" }, { name: "Tarime DC", ocdId: "ocd-tarime-dc" }, { name: "Tarime TC", ocdId: "ocd-tarime-tc" }] },
  { policeRegion: "Mbeya", adminRegion: "Mbeya", rpcId: "rpc-mbeya", rpcName: "RPC Mbeya", phone: "112", email: "rpc.mbeya@polisi.go.tz", districts: [{ name: "Mbeya City", ocdId: "ocd-mbeya-city" }, { name: "Mbeya DC", ocdId: "ocd-mbeya-dc" }, { name: "Busokelo", ocdId: "ocd-busokelo" }, { name: "Chunya", ocdId: "ocd-chunya" }, { name: "Mbarali", ocdId: "ocd-mbarali" }, { name: "Rungwe", ocdId: "ocd-rungwe" }] },
  { policeRegion: "Morogoro", adminRegion: "Morogoro", rpcId: "rpc-morogoro", rpcName: "RPC Morogoro", phone: "112", email: "rpc.morogoro@polisi.go.tz", districts: [{ name: "Morogoro MC", ocdId: "ocd-morogoro-mc" }, { name: "Morogoro DC", ocdId: "ocd-morogoro-dc" }, { name: "Kilombero", ocdId: "ocd-kilombero" }, { name: "Kilosa", ocdId: "ocd-kilosa" }, { name: "Mvomero", ocdId: "ocd-mvomero" }, { name: "Ulanga", ocdId: "ocd-ulanga" }, { name: "Gairo", ocdId: "ocd-gairo" }, { name: "Malinyi", ocdId: "ocd-malinyi" }, { name: "Ifakara TC", ocdId: "ocd-ifakara" }] },
  { policeRegion: "Mtwara", adminRegion: "Mtwara", rpcId: "rpc-mtwara", rpcName: "RPC Mtwara", phone: "112", email: "rpc.mtwara@polisi.go.tz", districts: [{ name: "Mtwara MC", ocdId: "ocd-mtwara-mc" }, { name: "Mtwara DC", ocdId: "ocd-mtwara-dc" }, { name: "Masasi DC", ocdId: "ocd-masasi-dc" }, { name: "Masasi TC", ocdId: "ocd-masasi-tc" }, { name: "Nanyumbu", ocdId: "ocd-nanyumbu" }, { name: "Newala DC", ocdId: "ocd-newala-dc" }, { name: "Newala TC", ocdId: "ocd-newala-tc" }, { name: "Tandahimba", ocdId: "ocd-tandahimba" }] },
  { policeRegion: "Mwanza", adminRegion: "Mwanza", rpcId: "rpc-mwanza", rpcName: "RPC Mwanza", phone: "112", email: "rpc.mwanza@polisi.go.tz", districts: [{ name: "Nyamagana", ocdId: "ocd-nyamagana" }, { name: "Ilemela", ocdId: "ocd-ilemela" }, { name: "Kwimba", ocdId: "ocd-kwimba" }, { name: "Magu", ocdId: "ocd-magu" }, { name: "Misungwi", ocdId: "ocd-misungwi" }, { name: "Sengerema", ocdId: "ocd-sengerema" }, { name: "Ukerewe", ocdId: "ocd-ukerewe" }] },
  { policeRegion: "Njombe", adminRegion: "Njombe", rpcId: "rpc-njombe", rpcName: "RPC Njombe", phone: "112", email: "rpc.njombe@polisi.go.tz", districts: [{ name: "Njombe TC", ocdId: "ocd-njombe-tc" }, { name: "Njombe DC", ocdId: "ocd-njombe-dc" }, { name: "Ludewa", ocdId: "ocd-ludewa" }, { name: "Makambako TC", ocdId: "ocd-makambako" }, { name: "Makete", ocdId: "ocd-makete" }, { name: "Wanging'ombe", ocdId: "ocd-wangingombe" }] },
  { policeRegion: "Pwani", adminRegion: "Pwani", rpcId: "rpc-pwani", rpcName: "RPC Pwani", phone: "112", email: "rpc.pwani@polisi.go.tz", districts: [{ name: "Kibaha TC", ocdId: "ocd-kibaha-tc" }, { name: "Kibaha DC", ocdId: "ocd-kibaha-dc" }, { name: "Bagamoyo", ocdId: "ocd-bagamoyo" }, { name: "Chalinze", ocdId: "ocd-chalinze" }, { name: "Kisarawe", ocdId: "ocd-kisarawe" }, { name: "Mafia", ocdId: "ocd-mafia" }, { name: "Mkuranga", ocdId: "ocd-mkuranga" }, { name: "Rufiji", ocdId: "ocd-rufiji" }] },
  { policeRegion: "Rukwa", adminRegion: "Rukwa", rpcId: "rpc-rukwa", rpcName: "RPC Rukwa", phone: "112", email: "rpc.rukwa@polisi.go.tz", districts: [{ name: "Sumbawanga MC", ocdId: "ocd-sumbawanga-mc" }, { name: "Sumbawanga DC", ocdId: "ocd-sumbawanga-dc" }, { name: "Kalambo", ocdId: "ocd-kalambo" }, { name: "Nkasi", ocdId: "ocd-nkasi" }] },
  { policeRegion: "Ruvuma", adminRegion: "Ruvuma", rpcId: "rpc-ruvuma", rpcName: "RPC Ruvuma", phone: "112", email: "rpc.ruvuma@polisi.go.tz", districts: [{ name: "Songea MC", ocdId: "ocd-songea-mc" }, { name: "Songea DC", ocdId: "ocd-songea-dc" }, { name: "Mbinga DC", ocdId: "ocd-mbinga-dc" }, { name: "Mbinga TC", ocdId: "ocd-mbinga-tc" }, { name: "Namtumbo", ocdId: "ocd-namtumbo" }, { name: "Nyasa", ocdId: "ocd-nyasa" }, { name: "Tunduru", ocdId: "ocd-tunduru" }] },
  { policeRegion: "Shinyanga", adminRegion: "Shinyanga", rpcId: "rpc-shinyanga", rpcName: "RPC Shinyanga", phone: "112", email: "rpc.shinyanga@polisi.go.tz", districts: [{ name: "Shinyanga MC", ocdId: "ocd-shinyanga-mc" }, { name: "Shinyanga DC", ocdId: "ocd-shinyanga-dc" }, { name: "Kahama DC", ocdId: "ocd-kahama-dc" }, { name: "Kahama TC", ocdId: "ocd-kahama-tc" }, { name: "Kishapu", ocdId: "ocd-kishapu" }, { name: "Msalala", ocdId: "ocd-msalala" }, { name: "Ushetu", ocdId: "ocd-ushetu" }] },
  { policeRegion: "Simiyu", adminRegion: "Simiyu", rpcId: "rpc-simiyu", rpcName: "RPC Simiyu", phone: "112", email: "rpc.simiyu@polisi.go.tz", districts: [{ name: "Bariadi DC", ocdId: "ocd-bariadi-dc" }, { name: "Bariadi TC", ocdId: "ocd-bariadi-tc" }, { name: "Busega", ocdId: "ocd-busega" }, { name: "Itilima", ocdId: "ocd-itilima" }, { name: "Maswa", ocdId: "ocd-maswa" }, { name: "Meatu", ocdId: "ocd-meatu" }] },
  { policeRegion: "Singida", adminRegion: "Singida", rpcId: "rpc-singida", rpcName: "RPC Singida", phone: "112", email: "rpc.singida@polisi.go.tz", districts: [{ name: "Singida MC", ocdId: "ocd-singida-mc" }, { name: "Singida DC", ocdId: "ocd-singida-dc" }, { name: "Ikungi", ocdId: "ocd-ikungi" }, { name: "Iramba", ocdId: "ocd-iramba" }, { name: "Manyoni", ocdId: "ocd-manyoni" }, { name: "Mkalama", ocdId: "ocd-mkalama" }] },
  { policeRegion: "Songwe", adminRegion: "Songwe", rpcId: "rpc-songwe", rpcName: "RPC Songwe", phone: "112", email: "rpc.songwe@polisi.go.tz", districts: [{ name: "Songwe DC", ocdId: "ocd-songwe-dc" }, { name: "Tunduma TC", ocdId: "ocd-tunduma" }, { name: "Ileje", ocdId: "ocd-ileje" }, { name: "Mbozi", ocdId: "ocd-mbozi" }, { name: "Momba", ocdId: "ocd-momba" }] },
  { policeRegion: "Tabora", adminRegion: "Tabora", rpcId: "rpc-tabora", rpcName: "RPC Tabora", phone: "112", email: "rpc.tabora@polisi.go.tz", districts: [{ name: "Tabora MC", ocdId: "ocd-tabora-mc" }, { name: "Igunga", ocdId: "ocd-igunga" }, { name: "Kaliua", ocdId: "ocd-kaliua" }, { name: "Nzega DC", ocdId: "ocd-nzega-dc" }, { name: "Nzega TC", ocdId: "ocd-nzega-tc" }, { name: "Sikonge", ocdId: "ocd-sikonge" }, { name: "Urambo", ocdId: "ocd-urambo" }, { name: "Uyui", ocdId: "ocd-uyui" }] },
  { policeRegion: "Tanga", adminRegion: "Tanga", rpcId: "rpc-tanga", rpcName: "RPC Tanga", phone: "112", email: "rpc.tanga@polisi.go.tz", districts: [{ name: "Tanga City", ocdId: "ocd-tanga-city" }, { name: "Handeni DC", ocdId: "ocd-handeni-dc" }, { name: "Handeni TC", ocdId: "ocd-handeni-tc" }, { name: "Kilindi", ocdId: "ocd-kilindi" }, { name: "Korogwe DC", ocdId: "ocd-korogwe-dc" }, { name: "Korogwe TC", ocdId: "ocd-korogwe-tc" }, { name: "Lushoto", ocdId: "ocd-lushoto" }, { name: "Mkinga", ocdId: "ocd-mkinga" }, { name: "Muheza", ocdId: "ocd-muheza" }, { name: "Pangani", ocdId: "ocd-pangani" }] },
  // ── Zanzibar Police Regions ──
  { policeRegion: "Zanzibar Mjini", adminRegion: "Mjini Magharibi", rpcId: "rpc-znz-mjini", rpcName: "RPC Zanzibar Mjini", phone: "112", email: "rpc.zanzibar@polisi.go.tz", districts: [{ name: "Mjini", ocdId: "ocd-mjini" }, { name: "Magharibi A", ocdId: "ocd-magharibi-a" }, { name: "Magharibi B", ocdId: "ocd-magharibi-b" }] },
  { policeRegion: "Zanzibar Kaskazini", adminRegion: "Kaskazini Unguja", rpcId: "rpc-znz-kaskazini", rpcName: "RPC Zanzibar Kaskazini", phone: "112", email: "rpc.znzkaskazini@polisi.go.tz", districts: [{ name: "Kaskazini A", ocdId: "ocd-kaskazini-a" }, { name: "Kaskazini B", ocdId: "ocd-kaskazini-b" }] },
  { policeRegion: "Zanzibar Kusini", adminRegion: "Kusini Unguja", rpcId: "rpc-znz-kusini", rpcName: "RPC Zanzibar Kusini", phone: "112", email: "rpc.znzkusini@polisi.go.tz", districts: [{ name: "Kati", ocdId: "ocd-kati" }, { name: "Kusini", ocdId: "ocd-kusini" }] },
  { policeRegion: "Pemba Kaskazini", adminRegion: "Kaskazini Pemba", rpcId: "rpc-pemba-kaskazini", rpcName: "RPC Pemba Kaskazini", phone: "112", email: "rpc.pembakaskazini@polisi.go.tz", districts: [{ name: "Micheweni", ocdId: "ocd-micheweni" }, { name: "Wete", ocdId: "ocd-wete" }] },
  { policeRegion: "Pemba Kusini", adminRegion: "Kusini Pemba", rpcId: "rpc-pemba-kusini", rpcName: "RPC Pemba Kusini", phone: "112", email: "rpc.pembakusini@polisi.go.tz", districts: [{ name: "Chake Chake", ocdId: "ocd-chake-chake" }, { name: "Mkoani", ocdId: "ocd-mkoani" }] },
];

// ============================================================
// GENERATE OFFICIALS FROM POLICE REGION DATA
// ============================================================

function generatePoliceOfficials(): Official[] {
  const result: Official[] = [];
  const v = "2026-03-08";

  policeRegions.forEach((pr) => {
    // RPC
    result.push({
      id: pr.rpcId,
      name: pr.rpcName,
      role: "RPC",
      roleTitle: `Kamanda wa Polisi Mkoa — ${pr.policeRegion}`,
      region: pr.adminRegion,
      district: "",
      constituency: "",
      party: "",
      phone: pr.phone,
      email: pr.email,
      office: `Makao Makuu ya Polisi, ${pr.policeRegion}`,
      photoUrl: "",
      verified: false,
      source: "polisi.go.tz",
      lastVerified: v,
    });

    // OCDs for each district
    pr.districts.forEach((d) => {
      result.push({
        id: d.ocdId,
        name: `OCD ${d.name}`,
        role: "OCD",
        roleTitle: `Kamanda wa Polisi Wilaya — ${d.name}`,
        region: pr.adminRegion,
        district: d.name,
        constituency: "",
        party: "",
        phone: "112",
        email: `ocd.${d.name.toLowerCase().replace(/[^a-z]/g, "")}@polisi.go.tz`,
        office: `Polisi Wilaya, ${d.name}`,
        photoUrl: "",
        verified: false,
        source: "polisi.go.tz",
        lastVerified: v,
      });
    });
  });

  // PCCB Regional offices
  tanzaniaRegions.forEach((r) => {
    if (r.name.startsWith("Unguja") || r.name.startsWith("Pemba")) return; // ZNZ has ZAECA
    result.push({
      id: `pccb-${r.name.toLowerCase().replace(/\s/g, "-")}`,
      name: `TAKUKURU ${r.name}`,
      role: "PCCB",
      roleTitle: `Ofisi ya TAKUKURU — ${r.name}`,
      region: r.name,
      district: "",
      constituency: "",
      party: "",
      phone: "113",
      email: `pccb.${r.name.toLowerCase().replace(/\s/g, "")}@pccb.go.tz`,
      office: `Ofisi ya TAKUKURU, ${r.capital}`,
      photoUrl: "",
      verified: false,
      source: "pccb.go.tz",
      lastVerified: "2026-03-08",
    });
  });

  return result;
}

const generatedPoliceOfficials = generatePoliceOfficials();

// ============================================================
// OFFICIALS DATABASE — Core hand-curated entries
// ============================================================

const coreOfficials: Official[] = [
  // ── NATIONAL LEADERSHIP (Post-Nov 2025 / Jan 2026 Reshuffle) ──
  { id: "nat-001", name: "Mhe. Dkt. Samia Suluhu Hassan", role: "President", roleTitle: "Rais wa Jamhuri ya Muungano wa Tanzania", region: "", district: "", constituency: "", party: "CCM", phone: "+255-22-211-6898", email: "info@ikulu.go.tz", office: "Ikulu, Dar es Salaam", photoUrl: "", verified: true, source: "ikulu.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-002", name: "Mhe. Emmanuel Nchimbi", role: "President", roleTitle: "Makamu wa Rais", region: "", district: "", constituency: "", party: "CCM", phone: "+255-22-211-3856", email: "info@vpo.go.tz", office: "Ofisi ya Makamu wa Rais, Dar es Salaam", photoUrl: "", verified: true, source: "vpo.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-003", name: "Mhe. Dkt. Mwigulu Nchemba", role: "President", roleTitle: "Waziri Mkuu", region: "", district: "", constituency: "", party: "CCM", phone: "+255-26-232-2443", email: "info@pmo.go.tz", office: "Ofisi ya Waziri Mkuu, Dodoma", photoUrl: "", verified: true, source: "pmo.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-004", name: "Mhe. Dkt. Tulia Ackson", role: "Speaker", roleTitle: "Spika wa Bunge", region: "", district: "", constituency: "", party: "CCM", phone: "+255-26-232-2761", email: "speaker@bunge.go.tz", office: "Bunge la Tanzania, Dodoma", photoUrl: "", verified: true, source: "bunge.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-005", name: "Mhe. Prof. Ibrahim Hamisi Juma", role: "CJ", roleTitle: "Jaji Mkuu wa Tanzania", region: "", district: "", constituency: "", party: "", phone: "+255-22-211-6065", email: "info@judiciary.go.tz", office: "Mahakama Kuu, Dar es Salaam", photoUrl: "", verified: true, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-006", name: "IGP Mhe. Camillus Wambura", role: "IGP", roleTitle: "Inspekta Jenerali wa Polisi", region: "", district: "", constituency: "", party: "", phone: "+255-22-211-7152", email: "igp@polisi.go.tz", office: "Makao Makuu ya Polisi, Dar es Salaam", photoUrl: "", verified: true, source: "polisi.go.tz", lastVerified: "2026-03-08" },

  // ── CABINET — MINISTERS (March 2026 Baraza la Mawaziri) ──
  // Finance
  { id: "min-finance", name: "Mhe. Khamis Mussa Omar", role: "Minister", roleTitle: "Waziri wa Fedha", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "ps@mof.go.tz", office: "Wizara ya Fedha, Dodoma", photoUrl: "", verified: true, source: "mof.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-finance-1", name: "Mhe. Loren Deogratius Luswetula", role: "DeputyMinister", roleTitle: "Naibu Waziri wa Fedha", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "ps@mof.go.tz", office: "Wizara ya Fedha, Dodoma", photoUrl: "", verified: true, source: "mof.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-finance-2", name: "Mhe. Mshamo Munde", role: "DeputyMinister", roleTitle: "Naibu Waziri wa Fedha", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "ps@mof.go.tz", office: "Wizara ya Fedha, Dodoma", photoUrl: "", verified: true, source: "mof.go.tz", lastVerified: "2026-03-08" },
   // Home Affairs
  { id: "min-home", name: "Mhe. George Boniface Simbachawene", role: "Minister", roleTitle: "Waziri wa Mambo ya Ndani", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "ps@moha.go.tz", office: "Wizara ya Mambo ya Ndani, Dodoma", photoUrl: "", verified: true, source: "moha.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-home", name: "Mhe. Denis Londo", role: "DeputyMinister", roleTitle: "Naibu Waziri wa Mambo ya Ndani", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "ps@moha.go.tz", office: "Wizara ya Mambo ya Ndani, Dodoma", photoUrl: "", verified: true, source: "moha.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-home", name: "PS — Wizara ya Mambo ya Ndani", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Mambo ya Ndani", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@moha.go.tz", office: "Wizara ya Mambo ya Ndani, Dodoma", photoUrl: "", verified: false, source: "moha.go.tz", lastVerified: "2026-03-08" },
  // Foreign Affairs
  { id: "min-foreign", name: "Mhe. Mahmoud Thabit Kombo", role: "Minister", roleTitle: "Waziri wa Mambo ya Nje", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@foreign.go.tz", office: "Wizara ya Mambo ya Nje, Dodoma", photoUrl: "", verified: true, source: "foreign.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-foreign", name: "PS — Wizara ya Mambo ya Nje", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Mambo ya Nje", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@foreign.go.tz", office: "Wizara ya Mambo ya Nje, Dodoma", photoUrl: "", verified: false, source: "foreign.go.tz", lastVerified: "2026-03-08" },
  // Health
  { id: "min-health", name: "Mhe. Mohamed Mchengerwa", role: "Minister", roleTitle: "Waziri wa Afya", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@moh.go.tz", office: "Wizara ya Afya, Dodoma", photoUrl: "", verified: true, source: "moh.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-health", name: "PS — Wizara ya Afya", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Afya", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@moh.go.tz", office: "Wizara ya Afya, Dodoma", photoUrl: "", verified: false, source: "moh.go.tz", lastVerified: "2026-03-08" },
  // Education
  { id: "min-edu", name: "Mhe. Prof. Adolf Mkenda", role: "Minister", roleTitle: "Waziri wa Elimu, Sayansi na Teknolojia", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@moest.go.tz", office: "Wizara ya Elimu, Dodoma", photoUrl: "", verified: true, source: "moest.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-edu", name: "PS — Wizara ya Elimu", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Elimu", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@moest.go.tz", office: "Wizara ya Elimu, Dodoma", photoUrl: "", verified: false, source: "moest.go.tz", lastVerified: "2026-03-08" },
  // Information, Culture, Arts & Sports
  { id: "min-info", name: "Mhe. Paul Makonda", role: "Minister", roleTitle: "Waziri wa Habari, Utamaduni, Sanaa na Michezo", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@habari.go.tz", office: "Wizara ya Habari, Dodoma", photoUrl: "", verified: true, source: "habari.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-info", name: "PS — Wizara ya Habari", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Habari", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@habari.go.tz", office: "Wizara ya Habari, Dodoma", photoUrl: "", verified: false, source: "habari.go.tz", lastVerified: "2026-03-08" },
  // TAMISEMI (Local Government)
  { id: "min-tamisemi", name: "Mhe. Angellah Kairuki", role: "Minister", roleTitle: "Waziri wa TAMISEMI", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@tamisemi.go.tz", office: "TAMISEMI, Dodoma", photoUrl: "", verified: true, source: "tamisemi.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-tamisemi", name: "PS — TAMISEMI", role: "PS", roleTitle: "Katibu Mkuu — TAMISEMI", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@tamisemi.go.tz", office: "TAMISEMI, Dodoma", photoUrl: "", verified: false, source: "tamisemi.go.tz", lastVerified: "2026-03-08" },
  // Energy
  { id: "min-energy", name: "Mhe. Deogratius Ndejembi", role: "Minister", roleTitle: "Waziri wa Nishati", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@nishati.go.tz", office: "Wizara ya Nishati, Dodoma", photoUrl: "", verified: true, source: "nishati.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-energy", name: "PS — Wizara ya Nishati", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Nishati", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@nishati.go.tz", office: "Wizara ya Nishati, Dodoma", photoUrl: "", verified: false, source: "nishati.go.tz", lastVerified: "2026-03-08" },
  // Agriculture
  { id: "min-agri", name: "Mhe. Daniel Chongolo", role: "Minister", roleTitle: "Waziri wa Kilimo", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@kilimo.go.tz", office: "Wizara ya Kilimo, Dodoma", photoUrl: "", verified: true, source: "kilimo.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-agri", name: "PS — Wizara ya Kilimo", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Kilimo", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@kilimo.go.tz", office: "Wizara ya Kilimo, Dodoma", photoUrl: "", verified: false, source: "kilimo.go.tz", lastVerified: "2026-03-08" },
  // Works & Transport
  { id: "min-works", name: "Mhe. Prof. Makame Mbarawa", role: "Minister", roleTitle: "Waziri wa Ujenzi na Uchukuzi", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@uchukuzi.go.tz", office: "Wizara ya Ujenzi na Uchukuzi, Dodoma", photoUrl: "", verified: true, source: "uchukuzi.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-works", name: "PS — Wizara ya Ujenzi na Uchukuzi", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Ujenzi na Uchukuzi", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@uchukuzi.go.tz", office: "Wizara ya Ujenzi na Uchukuzi, Dodoma", photoUrl: "", verified: false, source: "uchukuzi.go.tz", lastVerified: "2026-03-08" },
  // Natural Resources & Tourism
  { id: "min-tourism", name: "Mhe. Dkt. Pindi Chana", role: "Minister", roleTitle: "Waziri wa Maliasili na Utalii", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mnrt.go.tz", office: "Wizara ya Maliasili na Utalii, Dodoma", photoUrl: "", verified: true, source: "mnrt.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-tourism", name: "PS — Wizara ya Maliasili na Utalii", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Maliasili na Utalii", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@mnrt.go.tz", office: "Wizara ya Maliasili na Utalii, Dodoma", photoUrl: "", verified: false, source: "mnrt.go.tz", lastVerified: "2026-03-08" },
  // Water
  { id: "min-water", name: "Mhe. Jumaa Aweso", role: "Minister", roleTitle: "Waziri wa Maji", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@maji.go.tz", office: "Wizara ya Maji, Dodoma", photoUrl: "", verified: true, source: "maji.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-water", name: "PS — Wizara ya Maji", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Maji", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@maji.go.tz", office: "Wizara ya Maji, Dodoma", photoUrl: "", verified: false, source: "maji.go.tz", lastVerified: "2026-03-08" },
  // Lands, Housing & Human Settlements
  { id: "min-lands", name: "Mhe. William Lukuvi", role: "Minister", roleTitle: "Waziri wa Ardhi, Nyumba na Maendeleo ya Makazi", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@ardhi.go.tz", office: "Wizara ya Ardhi, Dodoma", photoUrl: "", verified: true, source: "ardhi.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-lands", name: "PS — Wizara ya Ardhi", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Ardhi", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@ardhi.go.tz", office: "Wizara ya Ardhi, Dodoma", photoUrl: "", verified: false, source: "ardhi.go.tz", lastVerified: "2026-03-08" },
  // Defence & National Service
  { id: "min-defence", name: "Mhe. Rhimo Simeon Nyansaho", role: "Minister", roleTitle: "Waziri wa Ulinzi na Jeshi la Kujenga Taifa", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@modans.go.tz", office: "Wizara ya Ulinzi, Dodoma", photoUrl: "", verified: true, source: "modans.go.tz", lastVerified: "2026-03-08" },
  // Constitution & Legal Affairs
  { id: "min-legal", name: "Mhe. Juma Zuberi Omera", role: "Minister", roleTitle: "Waziri wa Katiba na Sheria", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@sheria.go.tz", office: "Wizara ya Katiba na Sheria, Dodoma", photoUrl: "", verified: true, source: "sheria.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-legal", name: "Mhe. Zainab Athumani Katimba", role: "DeputyMinister", roleTitle: "Naibu Waziri wa Katiba na Sheria", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@sheria.go.tz", office: "Wizara ya Katiba na Sheria, Dodoma", photoUrl: "", verified: true, source: "sheria.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-legal", name: "PS — Wizara ya Katiba na Sheria", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Katiba na Sheria", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@sheria.go.tz", office: "Wizara ya Katiba na Sheria, Dodoma", photoUrl: "", verified: false, source: "sheria.go.tz", lastVerified: "2026-03-08" },
  // Industry & Trade
  { id: "min-trade", name: "Mhe. Ashatu Kijaji", role: "Minister", roleTitle: "Waziri wa Viwanda na Biashara", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mit.go.tz", office: "Wizara ya Viwanda na Biashara, Dodoma", photoUrl: "", verified: true, source: "mit.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-trade", name: "PS — Wizara ya Viwanda na Biashara", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Viwanda na Biashara", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@mit.go.tz", office: "Wizara ya Viwanda na Biashara, Dodoma", photoUrl: "", verified: false, source: "mit.go.tz", lastVerified: "2026-03-08" },
  // Minerals
  { id: "min-minerals", name: "Mhe. Anthony Peter Mavunde", role: "Minister", roleTitle: "Waziri wa Madini", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@madini.go.tz", office: "Wizara ya Madini, Dodoma", photoUrl: "", verified: true, source: "madini.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-minerals", name: "PS — Wizara ya Madini", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Madini", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@madini.go.tz", office: "Wizara ya Madini, Dodoma", photoUrl: "", verified: false, source: "madini.go.tz", lastVerified: "2026-03-08" },
  // Livestock & Fisheries
  { id: "min-livestock", name: "Mhe. Abdallah Ulega", role: "Minister", roleTitle: "Waziri wa Mifugo na Uvuvi", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mifugouvuvi.go.tz", office: "Wizara ya Mifugo na Uvuvi, Dodoma", photoUrl: "", verified: true, source: "mifugouvuvi.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-livestock", name: "PS — Wizara ya Mifugo na Uvuvi", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Mifugo na Uvuvi", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@mifugouvuvi.go.tz", office: "Wizara ya Mifugo na Uvuvi, Dodoma", photoUrl: "", verified: false, source: "mifugouvuvi.go.tz", lastVerified: "2026-03-08" },
  // Community Development, Gender, Women & Special Groups
  { id: "min-gender", name: "Mhe. Dkt. Dorothy Gwajima", role: "Minister", roleTitle: "Waziri wa Maendeleo ya Jamii, Jinsia, Wanawake na Makundi Maalum", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@maendeleo.go.tz", office: "Wizara ya Maendeleo ya Jamii, Dodoma", photoUrl: "", verified: true, source: "maendeleo.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-gender", name: "PS — Wizara ya Maendeleo ya Jamii", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Maendeleo ya Jamii", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@maendeleo.go.tz", office: "Wizara ya Maendeleo ya Jamii, Dodoma", photoUrl: "", verified: false, source: "maendeleo.go.tz", lastVerified: "2026-03-08" },
  // Labour & Employment
  { id: "min-labour", name: "Mhe. Dkt. Gwang'ombe", role: "Minister", roleTitle: "Waziri wa Kazi na Ajira", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@kazi.go.tz", office: "Wizara ya Kazi na Ajira, Dodoma", photoUrl: "", verified: true, source: "kazi.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-labour", name: "PS — Wizara ya Kazi na Ajira", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Kazi na Ajira", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@kazi.go.tz", office: "Wizara ya Kazi na Ajira, Dodoma", photoUrl: "", verified: false, source: "kazi.go.tz", lastVerified: "2026-03-08" },
  // ICT & Communication
  { id: "min-ict", name: "Mhe. Nape Nnauye", role: "Minister", roleTitle: "Waziri wa Mawasiliano na Teknolojia ya Habari", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mawasiliano.go.tz", office: "Wizara ya Mawasiliano na TEHAMA, Dodoma", photoUrl: "", verified: true, source: "mawasiliano.go.tz", lastVerified: "2026-03-08" },
  { id: "ps-ict", name: "PS — Wizara ya Mawasiliano", role: "PS", roleTitle: "Katibu Mkuu — Wizara ya Mawasiliano na TEHAMA", region: "", district: "", constituency: "", party: "", phone: "", email: "ps@mawasiliano.go.tz", office: "Wizara ya Mawasiliano na TEHAMA, Dodoma", photoUrl: "", verified: false, source: "mawasiliano.go.tz", lastVerified: "2026-03-08" },
  // Public Service Management & Good Governance (Ofisi ya Rais)
  { id: "min-pubservice", name: "Mhe. Ridhiwani Jakaya Kikwete", role: "Minister", roleTitle: "Waziri — Ofisi ya Rais (Utawala wa Umma na Utawala Bora)", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@utumishi.go.tz", office: "Ofisi ya Rais, Utawala wa Umma, Dodoma", photoUrl: "", verified: true, source: "utumishi.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-pubservice", name: "Mhe. Regina Ndege Qwaray", role: "DeputyMinister", roleTitle: "Naibu Waziri — Ofisi ya Rais (Utawala wa Umma)", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@utumishi.go.tz", office: "Ofisi ya Rais, Utawala wa Umma, Dodoma", photoUrl: "", verified: true, source: "utumishi.go.tz", lastVerified: "2026-03-08" },
  // Planning & Investment (Ofisi ya Rais)
  { id: "min-planning", name: "Mhe. Prof. Kitila Alexander Mikumbo", role: "Minister", roleTitle: "Waziri — Ofisi ya Rais (Mipango na Uwekezaji)", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mipango.go.tz", office: "Ofisi ya Rais, Mipango, Dodoma", photoUrl: "", verified: true, source: "mipango.go.tz", lastVerified: "2026-03-08" },
  { id: "dmin-planning", name: "Mhe. Pius Stephen Chaya", role: "DeputyMinister", roleTitle: "Naibu Waziri — Ofisi ya Rais (Mipango)", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@mipango.go.tz", office: "Ofisi ya Rais, Mipango, Dodoma", photoUrl: "", verified: true, source: "mipango.go.tz", lastVerified: "2026-03-08" },
  // Youth Development
  { id: "min-youth", name: "Mhe. Joel Arthur Nanauka", role: "Minister", roleTitle: "Waziri wa Maendeleo ya Vijana", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@vijana.go.tz", office: "Wizara ya Maendeleo ya Vijana, Dodoma", photoUrl: "", verified: true, source: "vijana.go.tz", lastVerified: "2026-03-08" },
  // ── REGIONAL COMMISSIONERS — All 31 Regions ──
  { id: "rc-dsm", name: "Mhe. Albert John Chalamila", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "+255-22-220-3158", email: "rc.dsm@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Dar es Salaam", photoUrl: "", verified: true, source: "dsm.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-dodoma", name: "Mhe. Rosemary S. Senyamule", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Dodoma", district: "", constituency: "", party: "", phone: "+255-26-232-4343", email: "rc.dodoma@tamisemi.go.tz", office: "Jengo la Mkapa, Dodoma", photoUrl: "", verified: true, source: "dodoma.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-arusha", name: "Mhe. Amos Gabriel Makalla", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Arusha", district: "", constituency: "", party: "", phone: "", email: "rc.arusha@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Arusha", photoUrl: "", verified: true, source: "arusha.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-mwanza", name: "Mhe. Said Mohamed Mtanda", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Mwanza", district: "", constituency: "", party: "", phone: "", email: "rc.mwanza@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mwanza", photoUrl: "", verified: true, source: "mwanza.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-tanga", name: "Dkt. Batilda Burian", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Tanga", district: "", constituency: "", party: "", phone: "027-264-2421", email: "rc.tanga@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Tanga", photoUrl: "", verified: true, source: "tanga.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-kilimanjaro", name: "Mhe. Nurdin Hassan Babu", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Kilimanjaro", district: "", constituency: "", party: "", phone: "", email: "rc.kilimanjaro@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Moshi", photoUrl: "", verified: true, source: "kilimanjaro.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-mbeya", name: "Mhe. Beno Moris Malisa", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Mbeya", district: "", constituency: "", party: "", phone: "", email: "rc.mbeya@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mbeya", photoUrl: "", verified: true, source: "mbeya.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-morogoro", name: "Mhe. Adam Kighoma Malima", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Morogoro", district: "", constituency: "", party: "", phone: "", email: "rc.morogoro@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Morogoro", photoUrl: "", verified: true, source: "morogoro.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-kagera", name: "Mhe. Col. Yahya Ramadhani Kido", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Kagera", district: "", constituency: "", party: "", phone: "", email: "rc.kagera@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Bukoba", photoUrl: "", verified: true, source: "kagera.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-pwani", name: "Mhe. Abubakar Mussa Kunenge", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Pwani", district: "", constituency: "", party: "", phone: "", email: "rc.pwani@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Kibaha", photoUrl: "", verified: true, source: "pwani.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-iringa", name: "Mhe. Kheri Denice James", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Iringa", district: "", constituency: "", party: "", phone: "", email: "rc.iringa@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Iringa", photoUrl: "", verified: true, source: "iringa.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-mtwara", name: "Kanali Donald Msengi", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Mtwara", district: "", constituency: "", party: "", phone: "", email: "rc.mtwara@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mtwara", photoUrl: "", verified: true, source: "mtwara.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-manyara", name: "Mhe. Queen Cuthbert Sendiga", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Manyara", district: "", constituency: "", party: "", phone: "", email: "rc.manyara@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Babati", photoUrl: "", verified: true, source: "manyara.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-rukwa", name: "Mhe. Charles Makongoro Nyerere", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Rukwa", district: "", constituency: "", party: "", phone: "", email: "rc.rukwa@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Sumbawanga", photoUrl: "", verified: true, source: "rukwa.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-lindi", name: "Mhe. Abdulrahman Khamis Mteza", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Lindi", district: "", constituency: "", party: "", phone: "", email: "rc.lindi@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Lindi", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "rc-singida", name: "Mhe. Dkt. Binilith Satano Mahenge", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Singida", district: "", constituency: "", party: "", phone: "", email: "rc.singida@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Singida", photoUrl: "", verified: true, source: "singida.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-tabora", name: "Mhe. Dkt. Rashid Aboud Chuachua", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Tabora", district: "", constituency: "", party: "", phone: "", email: "rc.tabora@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Tabora", photoUrl: "", verified: true, source: "tabora.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-kigoma", name: "Mhe. Thobia Kijaro", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Kigoma", district: "", constituency: "", party: "", phone: "", email: "rc.kigoma@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Kigoma", photoUrl: "", verified: true, source: "kigoma.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-shinyanga", name: "Mhe. Zainab Telack", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Shinyanga", district: "", constituency: "", party: "", phone: "", email: "rc.shinyanga@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Shinyanga", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "rc-geita", name: "Mhe. Robert Sobukwa Gabriel", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Geita", district: "", constituency: "", party: "", phone: "", email: "rc.geita@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Geita", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "rc-simiyu", name: "Mhe. Dkt. Angelina Mabula", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Simiyu", district: "", constituency: "", party: "", phone: "", email: "rc.simiyu@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Bariadi", photoUrl: "", verified: true, source: "simiyu.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-njombe", name: "Mhe. Renatus Mdudula", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Njombe", district: "", constituency: "", party: "", phone: "", email: "rc.njombe@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Njombe", photoUrl: "", verified: true, source: "njombe.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-katavi", name: "Mhe. Dkt. Mary Nagu Mwanjelwa", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Katavi", district: "", constituency: "", party: "", phone: "", email: "rc.katavi@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mpanda", photoUrl: "", verified: true, source: "katavi.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-ruvuma", name: "Mhe. Dkt. Pindi Chana", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Ruvuma", district: "", constituency: "", party: "", phone: "", email: "rc.ruvuma@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Songea", photoUrl: "", verified: true, source: "ruvuma.go.tz", lastVerified: "2026-03-08" },
  { id: "rc-songwe", name: "Mhe. Dkt. Margreth Ikongwe Sitta", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Songwe", district: "", constituency: "", party: "", phone: "", email: "rc.songwe@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Vwawa", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "rc-mara", name: "Mhe. Kanali Idd Hussein Kimanta", role: "RC", roleTitle: "Mkuu wa Mkoa", region: "Mara", district: "", constituency: "", party: "", phone: "", email: "rc.mara@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Musoma", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },

  // ── RAS ──
  { id: "ras-dsm", name: "Bw. Abdul Rajab Mhinte", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "+255-22-220-3156", email: "ras@dsm.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Dar es Salaam", photoUrl: "", verified: true, source: "dsm.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-arusha", name: "Ndg. Missaile Albano Musa", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Arusha", district: "", constituency: "", party: "", phone: "", email: "ras.arusha@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Arusha", photoUrl: "", verified: true, source: "arusha.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-mwanza", name: "Bw. Balandya Mayuganya Elikana", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Mwanza", district: "", constituency: "", party: "", phone: "", email: "ras.mwanza@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mwanza", photoUrl: "", verified: true, source: "mwanza.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-kilimanjaro", name: "Bw. Kiseo Yusuf Nzowa", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Kilimanjaro", district: "", constituency: "", party: "", phone: "", email: "ras.kilimanjaro@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Moshi", photoUrl: "", verified: true, source: "kilimanjaro.go.tz", lastVerified: "2026-03-08" },

  // ── DSM DISTRICT COMMISSIONERS ──
  { id: "dc-ilala", name: "Mhe. Sophia Mjema", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Ilala", constituency: "", party: "", phone: "", email: "dc.ilala@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Ilala", photoUrl: "", verified: true, source: "ilalamc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-kinondoni", name: "Mhe. Albert Chalamila Jr.", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Kinondoni", constituency: "", party: "", phone: "", email: "dc.kinondoni@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kinondoni", photoUrl: "", verified: false, source: "kinondonmc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-temeke", name: "Mhe. Jokate Mwegelo", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Temeke", constituency: "", party: "", phone: "", email: "dc.temeke@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Temeke", photoUrl: "", verified: true, source: "temekemc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-ubungo", name: "Mhe. Anne Kilango Malecela", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Ubungo", constituency: "", party: "", phone: "", email: "dc.ubungo@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Ubungo", photoUrl: "", verified: false, source: "ubungomc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-kigamboni", name: "Mhe. John Osmund Nchimbi", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Kigamboni", constituency: "", party: "", phone: "", email: "dc.kigamboni@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kigamboni", photoUrl: "", verified: false, source: "kigambonimc.go.tz", lastVerified: "2026-03-08" },

  // ── DODOMA DCs ──
  { id: "dc-dodoma-city", name: "DC Dodoma City", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dodoma", district: "Dodoma City", constituency: "", party: "", phone: "", email: "dc.dodomacc@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Dodoma", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "dc-kondoa", name: "DC Kondoa", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dodoma", district: "Kondoa", constituency: "", party: "", phone: "", email: "dc.kondoa@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kondoa", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },

  // ── JUDGES ──
  { id: "judge-dsm", name: "Jaji Mkazi wa Mahakama Kuu DSM", role: "Judge", roleTitle: "Jaji Mkazi - Mahakama Kuu", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "+255-22-211-2758", email: "hc.dsm@judiciary.go.tz", office: "Mahakama Kuu, Dar es Salaam", photoUrl: "", verified: true, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
  { id: "judge-dodoma", name: "Jaji Mkazi wa Mahakama Kuu Dodoma", role: "Judge", roleTitle: "Jaji Mkazi - Mahakama Kuu", region: "Dodoma", district: "", constituency: "", party: "", phone: "", email: "hc.dodoma@judiciary.go.tz", office: "Mahakama Kuu, Dodoma", photoUrl: "", verified: false, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
];

// ── GENERATE MP OFFICIALS FROM mps_data ──
function generateMPOfficials(): Official[] {
  return mpData.map((mp, i) => ({
    id: `mp-${mp.constituency.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name: mp.name,
    role: "MP" as OfficialRole,
    roleTitle: `Mbunge — ${mp.constituency}`,
    region: mp.region,
    district: mp.district,
    constituency: mp.constituency,
    party: mp.party,
    phone: "",
    email: `${mp.name.split(" ").pop()?.toLowerCase() || "mp"}@bunge.go.tz`,
    office: `Bunge la Tanzania, Dodoma / Jimbo la ${mp.constituency}`,
    photoUrl: "",
    verified: false,
    source: "bunge.go.tz / Wikipedia",
    lastVerified: "2026-03-08",
  }));
}

const generatedMPOfficials = generateMPOfficials();

// ── MERGE: core + generated police + MPs (no duplicates by ID) ──
const idSet = new Set(coreOfficials.map((o) => o.id));
export const officials: Official[] = [
  ...coreOfficials,
  ...generatedPoliceOfficials.filter((o) => !idSet.has(o.id)),
  ...generatedMPOfficials.filter((o) => {
    if (idSet.has(o.id)) return false;
    idSet.add(o.id);
    return true;
  }),
];

// ============================================================
// SEARCH & LOOKUP FUNCTIONS
// ============================================================

/** Full-text search across all fields */
export function searchOfficials(query: string): Official[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return officials.filter(
    (o) =>
      o.name.toLowerCase().includes(q) ||
      o.roleTitle.toLowerCase().includes(q) ||
      o.region.toLowerCase().includes(q) ||
      o.district.toLowerCase().includes(q) ||
      o.constituency.toLowerCase().includes(q) ||
      o.office.toLowerCase().includes(q) ||
      o.party.toLowerCase().includes(q) ||
      roleLabels[o.role].toLowerCase().includes(q)
  );
}

/** Get officials for a specific region */
export function getOfficialsByRegion(region: string): Official[] {
  return officials.filter((o) => o.region === region);
}

/** Get officials for a specific district */
export function getOfficialsByDistrict(region: string, district: string): Official[] {
  return officials.filter((o) => o.region === region && (o.district === district || o.district === ""));
}

/** Get "Your Officials" — the key leaders for a region+district combo */
export function getYourOfficials(region: string, district?: string): Official[] {
  const result: Official[] = [];

  // RC for the region
  const rc = officials.find((o) => o.region === region && o.role === "RC");
  if (rc) result.push(rc);

  // DC for the district
  if (district) {
    const dc = officials.find((o) => o.region === region && o.district === district && o.role === "DC");
    if (dc) result.push(dc);
  }

  // MP(s) for the district
  if (district) {
    const mps = officials.filter((o) => o.region === region && o.district === district && o.role === "MP");
    mps.forEach((mp) => result.push(mp));
  } else {
    // Show first 3 MPs for the region if no district selected
    const regionMps = officials.filter((o) => o.region === region && o.role === "MP").slice(0, 3);
    regionMps.forEach((mp) => result.push(mp));
  }

  // RPC for the region
  const rpc = officials.find((o) => o.region === region && o.role === "RPC");
  if (rpc) result.push(rpc);

  // OCD for the district
  if (district) {
    const ocd = officials.find((o) => o.region === region && o.district === district && o.role === "OCD");
    if (ocd) result.push(ocd);
  }

  // Judge for the region
  const judge = officials.find((o) => o.region === region && o.role === "Judge");
  if (judge) result.push(judge);

  // PCCB for the region
  const pccb = officials.find((o) => o.region === region && o.role === "PCCB");
  if (pccb) result.push(pccb);

  // RAS
  const ras = officials.find((o) => o.region === region && o.role === "RAS");
  if (ras) result.push(ras);

  // Relevant minister
  const minister = officials.find((o) => o.role === "Minister" && o.roleTitle.includes("TAMISEMI"));
  if (minister) result.push(minister);

  return result;
}

/** Re-export MP utilities */
export { getMPsByRegion, getMPsByDistrict, mpData, type MPEntry } from "./mps_data";

/** Get all national-level officials */
export function getNationalOfficials(): Official[] {
  return officials.filter((o) => !o.region);
}

/** Get police officials for a region */
export function getPoliceByRegion(region: string): Official[] {
  return officials.filter((o) => o.region === region && (o.role === "RPC" || o.role === "OCD"));
}

/** Count totals for stats */
export const directoryStats = {
  totalOfficials: officials.length,
  totalRegions: allRegionNames.length,
  totalPoliceRegions: policeRegions.length,
  totalRPCs: officials.filter((o) => o.role === "RPC").length,
  totalOCDs: officials.filter((o) => o.role === "OCD").length,
};
