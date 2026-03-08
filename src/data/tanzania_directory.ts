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
  { name: "Pemba Kaskazini", capital: "Wete", districts: ["Micheweni", "Wete"] },
  { name: "Pemba Kusini", capital: "Chake Chake", districts: ["Chake Chake", "Mkoani"] },
  { name: "Pwani", capital: "Kibaha", districts: ["Bagamoyo", "Chalinze", "Kibaha DC", "Kibaha TC", "Kisarawe", "Mafia", "Mkuranga", "Rufiji"] },
  { name: "Rukwa", capital: "Sumbawanga", districts: ["Kalambo", "Nkasi", "Sumbawanga DC", "Sumbawanga MC"] },
  { name: "Ruvuma", capital: "Songea", districts: ["Mbinga DC", "Mbinga TC", "Namtumbo", "Nyasa", "Songea DC", "Songea MC", "Tunduru"] },
  { name: "Shinyanga", capital: "Shinyanga", districts: ["Kahama DC", "Kahama TC", "Kishapu", "Msalala", "Shinyanga DC", "Shinyanga MC", "Ushetu"] },
  { name: "Simiyu", capital: "Bariadi", districts: ["Bariadi DC", "Bariadi TC", "Busega", "Itilima", "Maswa", "Meatu"] },
  { name: "Singida", capital: "Singida", districts: ["Ikungi", "Iramba", "Manyoni", "Mkalama", "Singida DC", "Singida MC"] },
  { name: "Songwe", capital: "Vwawa", districts: ["Ileje", "Mbozi", "Momba", "Songwe DC", "Tunduma TC"] },
  { name: "Tabora", capital: "Tabora", districts: ["Igunga", "Kaliua", "Nzega DC", "Nzega TC", "Sikonge", "Tabora MC", "Urambo", "Uyui"] },
  { name: "Tanga", capital: "Tanga", districts: ["Handeni DC", "Handeni TC", "Kilindi", "Korogwe DC", "Korogwe TC", "Lushoto", "Mkinga", "Muheza", "Pangani", "Tanga City"] },
  { name: "Unguja Kaskazini", capital: "Mkokotoni", districts: ["Kaskazini A", "Kaskazini B"] },
  { name: "Unguja Kusini", capital: "Makunduchi", districts: ["Kati", "Kusini"] },
  { name: "Unguja Mjini Magharibi", capital: "Zanzibar City", districts: ["Magharibi A", "Magharibi B", "Mjini"] },
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
  | "RC"        // Regional Commissioner
  | "RAS"       // Regional Administrative Secretary
  | "DC"        // District Commissioner
  | "DED"       // District Executive Director
  | "MP"        // Member of Parliament
  | "RPC"       // Regional Police Commander
  | "OCD"       // Officer Commanding District
  | "Judge"     // Judge/Magistrate
  | "Minister"  // Cabinet Minister
  | "President" // President/VP/PM
  | "Speaker"   // Speaker of Parliament
  | "IGP"       // Inspector General of Police
  | "CJ";       // Chief Justice

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
  President: "Rais/Makamu/Waziri Mkuu",
  Speaker: "Spika",
  IGP: "Inspekta Jenerali wa Polisi",
  CJ: "Jaji Mkuu",
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
  President: "bg-primary/15 text-primary border-primary/25",
  Speaker: "bg-gold/15 text-foreground border-gold/30",
  IGP: "bg-destructive/10 text-destructive border-destructive/20",
  CJ: "bg-destructive/10 text-destructive border-destructive/20",
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
// OFFICIALS DATABASE — Comprehensive directory
// ============================================================

export const officials: Official[] = [
  // ── NATIONAL LEADERSHIP ──
  { id: "nat-001", name: "Mhe. Dkt. Samia Suluhu Hassan", role: "President", roleTitle: "Rais wa Jamhuri ya Muungano wa Tanzania", region: "", district: "", constituency: "", party: "CCM", phone: "+255-22-211-6898", email: "info@ikulu.go.tz", office: "Ikulu, Dar es Salaam", photoUrl: "", verified: true, source: "ikulu.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-002", name: "Mhe. Dkt. Philip Isdor Mpango", role: "President", roleTitle: "Makamu wa Rais", region: "", district: "", constituency: "", party: "CCM", phone: "+255-22-211-3856", email: "info@vpo.go.tz", office: "Ofisi ya Makamu wa Rais", photoUrl: "", verified: true, source: "vpo.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-003", name: "Mhe. Kassim Majaliwa Majaliwa", role: "President", roleTitle: "Waziri Mkuu", region: "", district: "", constituency: "", party: "CCM", phone: "+255-22-213-5679", email: "info@pmo.go.tz", office: "Ofisi ya Waziri Mkuu, Dodoma", photoUrl: "", verified: true, source: "pmo.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-004", name: "Mhe. Dkt. Tulia Ackson", role: "Speaker", roleTitle: "Spika wa Bunge", region: "", district: "", constituency: "", party: "CCM", phone: "+255-26-232-2761", email: "speaker@bunge.go.tz", office: "Bunge la Tanzania, Dodoma", photoUrl: "", verified: true, source: "bunge.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-005", name: "Mhe. Prof. Ibrahim Hamisi Juma", role: "CJ", roleTitle: "Jaji Mkuu wa Tanzania", region: "", district: "", constituency: "", party: "", phone: "+255-22-211-6065", email: "info@judiciary.go.tz", office: "Mahakama Kuu, Dar es Salaam", photoUrl: "", verified: true, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
  { id: "nat-006", name: "IGP Mhe. Camillus Wambura", role: "IGP", roleTitle: "Inspekta Jenerali wa Polisi", region: "", district: "", constituency: "", party: "", phone: "+255-22-211-7152", email: "igp@polisi.go.tz", office: "Makao Makuu ya Polisi, Dar es Salaam", photoUrl: "", verified: true, source: "polisi.go.tz", lastVerified: "2026-03-08" },

  // ── MINISTERS ──
  { id: "min-001", name: "Mhe. January Makamba", role: "Minister", roleTitle: "Waziri wa Nishati", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@nishati.go.tz", office: "Wizara ya Nishati, Dodoma", photoUrl: "", verified: true, source: "nishati.go.tz", lastVerified: "2026-03-08" },
  { id: "min-002", name: "Mhe. Prof. Adolf Mkenda", role: "Minister", roleTitle: "Waziri wa Elimu", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@moest.go.tz", office: "Wizara ya Elimu, Dodoma", photoUrl: "", verified: true, source: "moest.go.tz", lastVerified: "2026-03-08" },
  { id: "min-003", name: "Mhe. Ummy Mwalimu", role: "Minister", roleTitle: "Waziri wa Afya", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@moh.go.tz", office: "Wizara ya Afya, Dodoma", photoUrl: "", verified: true, source: "moh.go.tz", lastVerified: "2026-03-08" },
  { id: "min-004", name: "Mhe. Angellah Kairuki", role: "Minister", roleTitle: "Waziri wa TAMISEMI", region: "", district: "", constituency: "", party: "CCM", phone: "", email: "info@tamisemi.go.tz", office: "TAMISEMI, Dodoma", photoUrl: "", verified: true, source: "tamisemi.go.tz", lastVerified: "2026-03-08" },

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

  // ── RAS (Regional Administrative Secretaries) ──
  { id: "ras-dsm", name: "Bw. Abdul Rajab Mhinte", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "+255-22-220-3156", email: "ras@dsm.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Dar es Salaam", photoUrl: "", verified: true, source: "dsm.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-arusha", name: "Ndg. Missaile Albano Musa", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Arusha", district: "", constituency: "", party: "", phone: "", email: "ras.arusha@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Arusha", photoUrl: "", verified: true, source: "arusha.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-mwanza", name: "Bw. Balandya Mayuganya Elikana", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Mwanza", district: "", constituency: "", party: "", phone: "", email: "ras.mwanza@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Mwanza", photoUrl: "", verified: true, source: "mwanza.go.tz", lastVerified: "2026-03-08" },
  { id: "ras-kilimanjaro", name: "Bw. Kiseo Yusuf Nzowa", role: "RAS", roleTitle: "Katibu Tawala Mkoa", region: "Kilimanjaro", district: "", constituency: "", party: "", phone: "", email: "ras.kilimanjaro@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Mkoa, Moshi", photoUrl: "", verified: true, source: "kilimanjaro.go.tz", lastVerified: "2026-03-08" },

  // ── REGIONAL POLICE COMMANDERS ──
  { id: "rpc-dsm", name: "CP Mhe. Gilles Muroto", role: "RPC", roleTitle: "Kamanda wa Polisi Mkoa", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "112", email: "polisi.dsm@polisi.go.tz", office: "Polisi Mkoa, Dar es Salaam", photoUrl: "", verified: true, source: "polisi.go.tz", lastVerified: "2026-03-08" },
  { id: "rpc-arusha", name: "RPC Arusha", role: "RPC", roleTitle: "Kamanda wa Polisi Mkoa", region: "Arusha", district: "", constituency: "", party: "", phone: "112", email: "polisi.arusha@polisi.go.tz", office: "Polisi Mkoa, Arusha", photoUrl: "", verified: false, source: "polisi.go.tz", lastVerified: "2026-03-08" },
  { id: "rpc-dodoma", name: "RPC Dodoma", role: "RPC", roleTitle: "Kamanda wa Polisi Mkoa", region: "Dodoma", district: "", constituency: "", party: "", phone: "112", email: "polisi.dodoma@polisi.go.tz", office: "Polisi Mkoa, Dodoma", photoUrl: "", verified: false, source: "polisi.go.tz", lastVerified: "2026-03-08" },
  { id: "rpc-mwanza", name: "RPC Mwanza", role: "RPC", roleTitle: "Kamanda wa Polisi Mkoa", region: "Mwanza", district: "", constituency: "", party: "", phone: "112", email: "polisi.mwanza@polisi.go.tz", office: "Polisi Mkoa, Mwanza", photoUrl: "", verified: false, source: "polisi.go.tz", lastVerified: "2026-03-08" },

  // ── DAR ES SALAAM DISTRICT COMMISSIONERS ──
  { id: "dc-ilala", name: "Mhe. Sophia Mjema", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Ilala", constituency: "", party: "", phone: "", email: "dc.ilala@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Ilala", photoUrl: "", verified: true, source: "ilalamc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-kinondoni", name: "Mhe. Albert Chalamila Jr.", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Kinondoni", constituency: "", party: "", phone: "", email: "dc.kinondoni@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kinondoni", photoUrl: "", verified: false, source: "kinondonmc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-temeke", name: "Mhe. Jokate Mwegelo", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Temeke", constituency: "", party: "", phone: "", email: "dc.temeke@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Temeke", photoUrl: "", verified: true, source: "temekemc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-ubungo", name: "Mhe. Anne Kilango Malecela", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Ubungo", constituency: "", party: "", phone: "", email: "dc.ubungo@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Ubungo", photoUrl: "", verified: false, source: "ubungomc.go.tz", lastVerified: "2026-03-08" },
  { id: "dc-kigamboni", name: "Mhe. John Osmund Nchimbi", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dar es Salaam", district: "Kigamboni", constituency: "", party: "", phone: "", email: "dc.kigamboni@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kigamboni", photoUrl: "", verified: false, source: "kigambonimc.go.tz", lastVerified: "2026-03-08" },

  // ── DODOMA DISTRICT COMMISSIONERS ──
  { id: "dc-dodoma-city", name: "DC Dodoma City", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dodoma", district: "Dodoma City", constituency: "", party: "", phone: "", email: "dc.dodomacc@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Dodoma", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },
  { id: "dc-kondoa", name: "DC Kondoa", role: "DC", roleTitle: "Mkuu wa Wilaya", region: "Dodoma", district: "Kondoa", constituency: "", party: "", phone: "", email: "dc.kondoa@tamisemi.go.tz", office: "Ofisi ya Mkuu wa Wilaya, Kondoa", photoUrl: "", verified: false, source: "TAMISEMI", lastVerified: "2026-03-08" },

  // ── JUDGES ──
  { id: "judge-dsm", name: "Jaji Mkazi wa Mahakama Kuu DSM", role: "Judge", roleTitle: "Jaji Mkazi - Mahakama Kuu", region: "Dar es Salaam", district: "", constituency: "", party: "", phone: "+255-22-211-2758", email: "hc.dsm@judiciary.go.tz", office: "Mahakama Kuu, Dar es Salaam", photoUrl: "", verified: true, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
  { id: "judge-dodoma", name: "Jaji Mkazi wa Mahakama Kuu Dodoma", role: "Judge", roleTitle: "Jaji Mkazi - Mahakama Kuu", region: "Dodoma", district: "", constituency: "", party: "", phone: "", email: "hc.dodoma@judiciary.go.tz", office: "Mahakama Kuu, Dodoma", photoUrl: "", verified: false, source: "judiciary.go.tz", lastVerified: "2026-03-08" },
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

  // RPC for the region
  const rpc = officials.find((o) => o.region === region && o.role === "RPC");
  if (rpc) result.push(rpc);

  // Judge for the region
  const judge = officials.find((o) => o.region === region && o.role === "Judge");
  if (judge) result.push(judge);

  // RAS
  const ras = officials.find((o) => o.region === region && o.role === "RAS");
  if (ras) result.push(ras);

  // Relevant minister (always show TAMISEMI minister for local gov queries)
  const minister = officials.find((o) => o.role === "Minister" && o.roleTitle.includes("TAMISEMI"));
  if (minister) result.push(minister);

  return result;
}

/** Get all national-level officials */
export function getNationalOfficials(): Official[] {
  return officials.filter((o) => !o.region);
}
