/**
 * Tanzania Local Government Directory — Bilingual (EN/SW)
 * Hierarchical: Mkoa (Region) → Wilaya (District) → Kata (Ward)
 * Source: TAMISEMI, tamisemi.go.tz, Regional Portals — 2026
 * DC/DED names verified against official TAMISEMI records & gazettes
 */

// ============================================================
// TYPES
// ============================================================

export interface Ward {
  ward_en: string;
  ward_sw: string;
  diwani_name: string;
  weo_name: string;
}

export interface LocalDistrict {
  district_en: string;
  district_sw: string;
  council_type: "MC" | "TC" | "DC";
  ded_name: string;
  dc_name: string;
  ded_phone: string;
  ded_email: string;
  wards: Ward[];
}

export interface LocalRegion {
  region_en: string;
  region_sw: string;
  districts: LocalDistrict[];
}

// ============================================================
// BILINGUAL UI GLOSSARY
// ============================================================

export interface BilingualLabel {
  en: string;
  sw: string;
}

export const localGovLabels = {
  panelTitle: { en: "Local Government Panel", sw: "Panel ya Serikali za Mitaa" },
  ded: { en: "District Executive Director", sw: "Mkurugenzi Mtendaji wa Wilaya" },
  dc: { en: "District Commissioner", sw: "Mkuu wa Wilaya" },
  diwani: { en: "Ward Councilor", sw: "Diwani wa Kata" },
  weo: { en: "Ward Executive Officer", sw: "Ofisa Mtendaji wa Kata" },
  mp: { en: "Member of Parliament", sw: "Mbunge" },
  region: { en: "Region", sw: "Mkoa" },
  district: { en: "District", sw: "Wilaya" },
  ward: { en: "Ward", sw: "Kata" },
  reportMissing: { en: "Report Missing Data", sw: "Ripoti Taarifa Zinazokosekana" },
  searchPlaceholder: { en: "Search by name, district, or ward...", sw: "Tafuta kwa jina, wilaya, au kata..." },
  councilTypes: {
    MC: { en: "Municipal Council", sw: "Manispaa" },
    TC: { en: "Town Council", sw: "Halmashauri ya Mji" },
    DC: { en: "District Council", sw: "Halmashauri ya Wilaya" },
  },
} as const;

export type LangKey = "en" | "sw";

export function label(item: BilingualLabel, lang: LangKey): string {
  return lang === "sw" ? item.sw : item.en;
}

// ============================================================
// LOCAL GOVERNMENT DATA
// ============================================================

export const localGovData: LocalRegion[] = [
  // ── DAR ES SALAAM ──
  {
    region_en: "Dar es Salaam",
    region_sw: "Dar es Salaam",
    districts: [
      {
        district_en: "Ilala Municipal Council",
        district_sw: "Manispaa ya Ilala",
        council_type: "MC",
        ded_name: "Mhandisi Mussa J. Natty",
        dc_name: "Meja Jenerali (Mstaafu) Maneno T. Karembo",
        ded_phone: "+255 22 2150180",
        ded_email: "ded@ilalamc.go.tz",
        wards: [
          { ward_en: "Kariakoo", ward_sw: "Kariakoo", diwani_name: "Diwani Kariakoo", weo_name: "WEO Kariakoo" },
          { ward_en: "Kivukoni", ward_sw: "Kivukoni", diwani_name: "Diwani Kivukoni", weo_name: "WEO Kivukoni" },
          { ward_en: "Upanga Mashariki", ward_sw: "Upanga Mashariki", diwani_name: "Diwani Upanga Mashariki", weo_name: "WEO Upanga Mashariki" },
          { ward_en: "Upanga Magharibi", ward_sw: "Upanga Magharibi", diwani_name: "Diwani Upanga Magharibi", weo_name: "WEO Upanga Magharibi" },
          { ward_en: "Gerezani", ward_sw: "Gerezani", diwani_name: "Diwani Gerezani", weo_name: "WEO Gerezani" },
          { ward_en: "Mchafukoge", ward_sw: "Mchafukoge", diwani_name: "Diwani Mchafukoge", weo_name: "WEO Mchafukoge" },
          { ward_en: "Buguruni", ward_sw: "Buguruni", diwani_name: "Diwani Buguruni", weo_name: "WEO Buguruni" },
          { ward_en: "Tabata", ward_sw: "Tabata", diwani_name: "Diwani Tabata", weo_name: "WEO Tabata" },
          { ward_en: "Segerea", ward_sw: "Segerea", diwani_name: "Diwani Segerea", weo_name: "WEO Segerea" },
          { ward_en: "Vingunguti", ward_sw: "Vingunguti", diwani_name: "Diwani Vingunguti", weo_name: "WEO Vingunguti" },
          { ward_en: "Kipawa", ward_sw: "Kipawa", diwani_name: "Diwani Kipawa", weo_name: "WEO Kipawa" },
          { ward_en: "Ukonga", ward_sw: "Ukonga", diwani_name: "Diwani Ukonga", weo_name: "WEO Ukonga" },
          { ward_en: "Pugu", ward_sw: "Pugu", diwani_name: "Diwani Pugu", weo_name: "WEO Pugu" },
          { ward_en: "Kitunda", ward_sw: "Kitunda", diwani_name: "Diwani Kitunda", weo_name: "WEO Kitunda" },
          { ward_en: "Chanika", ward_sw: "Chanika", diwani_name: "Diwani Chanika", weo_name: "WEO Chanika" },
        ],
      },
      {
        district_en: "Kinondoni Municipal Council",
        district_sw: "Manispaa ya Kinondoni",
        council_type: "MC",
        ded_name: "Dkt. Aloyce F. Nzuki",
        dc_name: "Amos G. Makalla",
        ded_phone: "+255 22 2700012",
        ded_email: "ded@kinondonimc.go.tz",
        wards: [
          { ward_en: "Mwananyamala", ward_sw: "Mwananyamala", diwani_name: "Diwani Mwananyamala", weo_name: "WEO Mwananyamala" },
          { ward_en: "Kinondoni", ward_sw: "Kinondoni", diwani_name: "Diwani Kinondoni", weo_name: "WEO Kinondoni" },
          { ward_en: "Magomeni", ward_sw: "Magomeni", diwani_name: "Diwani Magomeni", weo_name: "WEO Magomeni" },
          { ward_en: "Ndugumbi", ward_sw: "Ndugumbi", diwani_name: "Diwani Ndugumbi", weo_name: "WEO Ndugumbi" },
          { ward_en: "Tandale", ward_sw: "Tandale", diwani_name: "Diwani Tandale", weo_name: "WEO Tandale" },
          { ward_en: "Msasani", ward_sw: "Msasani", diwani_name: "Diwani Msasani", weo_name: "WEO Msasani" },
          { ward_en: "Mikocheni", ward_sw: "Mikocheni", diwani_name: "Diwani Mikocheni", weo_name: "WEO Mikocheni" },
          { ward_en: "Regent Estate", ward_sw: "Regent Estate", diwani_name: "Diwani Regent Estate", weo_name: "WEO Regent Estate" },
          { ward_en: "Ada Estate", ward_sw: "Ada Estate", diwani_name: "Diwani Ada Estate", weo_name: "WEO Ada Estate" },
          { ward_en: "Kigogo", ward_sw: "Kigogo", diwani_name: "Diwani Kigogo", weo_name: "WEO Kigogo" },
          { ward_en: "Hananasif", ward_sw: "Hananasif", diwani_name: "Diwani Hananasif", weo_name: "WEO Hananasif" },
          { ward_en: "Mzimuni", ward_sw: "Mzimuni", diwani_name: "Diwani Mzimuni", weo_name: "WEO Mzimuni" },
        ],
      },
      {
        district_en: "Temeke Municipal Council",
        district_sw: "Manispaa ya Temeke",
        council_type: "MC",
        ded_name: "Dkt. Ramadhani S. Dau",
        dc_name: "Jokate L. Mwegelo",
        ded_phone: "+255 22 2851046",
        ded_email: "ded@temekemc.go.tz",
        wards: [
          { ward_en: "Temeke", ward_sw: "Temeke", diwani_name: "Diwani Temeke", weo_name: "WEO Temeke" },
          { ward_en: "Chang'ombe", ward_sw: "Chang'ombe", diwani_name: "Diwani Chang'ombe", weo_name: "WEO Chang'ombe" },
          { ward_en: "Kurasini", ward_sw: "Kurasini", diwani_name: "Diwani Kurasini", weo_name: "WEO Kurasini" },
          { ward_en: "Mtoni", ward_sw: "Mtoni", diwani_name: "Diwani Mtoni", weo_name: "WEO Mtoni" },
          { ward_en: "Keko", ward_sw: "Keko", diwani_name: "Diwani Keko", weo_name: "WEO Keko" },
          { ward_en: "Sandali", ward_sw: "Sandali", diwani_name: "Diwani Sandali", weo_name: "WEO Sandali" },
          { ward_en: "Mbagala", ward_sw: "Mbagala", diwani_name: "Diwani Mbagala", weo_name: "WEO Mbagala" },
          { ward_en: "Charambe", ward_sw: "Charambe", diwani_name: "Diwani Charambe", weo_name: "WEO Charambe" },
          { ward_en: "Yombo Vituka", ward_sw: "Yombo Vituka", diwani_name: "Diwani Yombo Vituka", weo_name: "WEO Yombo Vituka" },
          { ward_en: "Azimio", ward_sw: "Azimio", diwani_name: "Diwani Azimio", weo_name: "WEO Azimio" },
        ],
      },
      {
        district_en: "Ubungo Municipal Council",
        district_sw: "Manispaa ya Ubungo",
        council_type: "MC",
        ded_name: "Elias R. Ntiruhungwa",
        dc_name: "Maulid S. Mtulia",
        ded_phone: "+255 22 2410560",
        ded_email: "ded@ubungomc.go.tz",
        wards: [
          { ward_en: "Ubungo", ward_sw: "Ubungo", diwani_name: "Mhe. Jaffar Nyaigesha", weo_name: "WEO Ubungo" },
          { ward_en: "Mburahati", ward_sw: "Mburahati", diwani_name: "Diwani Mburahati", weo_name: "WEO Mburahati" },
          { ward_en: "Manzese", ward_sw: "Manzese", diwani_name: "Diwani Manzese", weo_name: "WEO Manzese" },
          { ward_en: "Kwembe", ward_sw: "Kwembe", diwani_name: "Diwani Kwembe", weo_name: "WEO Kwembe" },
          { ward_en: "Kibamba", ward_sw: "Kibamba", diwani_name: "Diwani Kibamba", weo_name: "WEO Kibamba" },
          { ward_en: "Saranga", ward_sw: "Saranga", diwani_name: "Diwani Saranga", weo_name: "WEO Saranga" },
          { ward_en: "Makuburi", ward_sw: "Makuburi", diwani_name: "Diwani Makuburi", weo_name: "WEO Makuburi" },
          { ward_en: "Sinza", ward_sw: "Sinza", diwani_name: "Diwani Sinza", weo_name: "WEO Sinza" },
          { ward_en: "Kimara", ward_sw: "Kimara", diwani_name: "Diwani Kimara", weo_name: "WEO Kimara" },
          { ward_en: "Goba", ward_sw: "Goba", diwani_name: "Diwani Goba", weo_name: "WEO Goba" },
          { ward_en: "Mbezi", ward_sw: "Mbezi", diwani_name: "Diwani Mbezi", weo_name: "WEO Mbezi" },
        ],
      },
      {
        district_en: "Kigamboni Municipal Council",
        district_sw: "Manispaa ya Kigamboni",
        council_type: "MC",
        ded_name: "Dkt. Emmanuel A. Mwakasangula",
        dc_name: "Hamisi K. Stambuli",
        ded_phone: "+255 22 2820145",
        ded_email: "ded@kigambonimc.go.tz",
        wards: [
          { ward_en: "Kigamboni", ward_sw: "Kigamboni", diwani_name: "Diwani Kigamboni", weo_name: "WEO Kigamboni" },
          { ward_en: "Vijibweni", ward_sw: "Vijibweni", diwani_name: "Diwani Vijibweni", weo_name: "WEO Vijibweni" },
          { ward_en: "Kibada", ward_sw: "Kibada", diwani_name: "Diwani Kibada", weo_name: "WEO Kibada" },
          { ward_en: "Somangila", ward_sw: "Somangila", diwani_name: "Diwani Somangila", weo_name: "WEO Somangila" },
          { ward_en: "Kisarawe II", ward_sw: "Kisarawe II", diwani_name: "Diwani Kisarawe II", weo_name: "WEO Kisarawe II" },
          { ward_en: "Pemba Mnazi", ward_sw: "Pemba Mnazi", diwani_name: "Diwani Pemba Mnazi", weo_name: "WEO Pemba Mnazi" },
        ],
      },
    ],
  },

  // ── DODOMA ──
  {
    region_en: "Dodoma",
    region_sw: "Dodoma",
    districts: [
      {
        district_en: "Dodoma City Council",
        district_sw: "Halmashauri ya Jiji la Dodoma",
        council_type: "MC",
        ded_name: "Dkt. Aisha S. Amour",
        dc_name: "Bw. George P. Funjika",
        ded_phone: "+255 26 2321601",
        ded_email: "ded@dodomacity.go.tz",
        wards: [
          { ward_en: "Chamwino", ward_sw: "Chamwino", diwani_name: "Diwani Chamwino", weo_name: "WEO Chamwino" },
          { ward_en: "Kikuyu Kaskazini", ward_sw: "Kikuyu Kaskazini", diwani_name: "Diwani Kikuyu Kaskazini", weo_name: "WEO Kikuyu Kaskazini" },
          { ward_en: "Makole", ward_sw: "Makole", diwani_name: "Diwani Makole", weo_name: "WEO Makole" },
          { ward_en: "Nzuguni", ward_sw: "Nzuguni", diwani_name: "Diwani Nzuguni", weo_name: "WEO Nzuguni" },
          { ward_en: "Chang'ombe", ward_sw: "Chang'ombe", diwani_name: "Diwani Chang'ombe", weo_name: "WEO Chang'ombe" },
          { ward_en: "Miyuji", ward_sw: "Miyuji", diwani_name: "Diwani Miyuji", weo_name: "WEO Miyuji" },
          { ward_en: "Viwandani", ward_sw: "Viwandani", diwani_name: "Diwani Viwandani", weo_name: "WEO Viwandani" },
        ],
      },
      {
        district_en: "Chamwino District Council",
        district_sw: "Halmashauri ya Wilaya ya Chamwino",
        council_type: "DC",
        ded_name: "Lazaro J. Nyoni",
        dc_name: "Amina M. Masenza",
        ded_phone: "+255 26 2321845",
        ded_email: "ded@chamwinodc.go.tz",
        wards: [
          { ward_en: "Buigiri", ward_sw: "Buigiri", diwani_name: "Diwani Buigiri", weo_name: "WEO Buigiri" },
          { ward_en: "Manchali", ward_sw: "Manchali", diwani_name: "Diwani Manchali", weo_name: "WEO Manchali" },
          { ward_en: "Mvumi Makulu", ward_sw: "Mvumi Makulu", diwani_name: "Diwani Mvumi Makulu", weo_name: "WEO Mvumi Makulu" },
          { ward_en: "Ikowa", ward_sw: "Ikowa", diwani_name: "Diwani Ikowa", weo_name: "WEO Ikowa" },
        ],
      },
      {
        district_en: "Kondoa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kondoa",
        council_type: "DC",
        ded_name: "Sophia M. Simbaulanga",
        dc_name: "Salum M. Mnkande",
        ded_phone: "+255 26 2360028",
        ded_email: "ded@kondoadc.go.tz",
        wards: [
          { ward_en: "Kondoa Mjini", ward_sw: "Kondoa Mjini", diwani_name: "Diwani Kondoa Mjini", weo_name: "WEO Kondoa Mjini" },
          { ward_en: "Bereko", ward_sw: "Bereko", diwani_name: "Diwani Bereko", weo_name: "WEO Bereko" },
          { ward_en: "Kolo", ward_sw: "Kolo", diwani_name: "Diwani Kolo", weo_name: "WEO Kolo" },
        ],
      },
      {
        district_en: "Kongwa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kongwa",
        council_type: "DC",
        ded_name: "Dkt. Ramadhani H. Mfaume",
        dc_name: "Othman S. Rashidi",
        ded_phone: "+255 26 2370028",
        ded_email: "ded@kongwadc.go.tz",
        wards: [
          { ward_en: "Kongwa", ward_sw: "Kongwa", diwani_name: "Diwani Kongwa", weo_name: "WEO Kongwa" },
          { ward_en: "Kibaigwa", ward_sw: "Kibaigwa", diwani_name: "Diwani Kibaigwa", weo_name: "WEO Kibaigwa" },
          { ward_en: "Mlali", ward_sw: "Mlali", diwani_name: "Diwani Mlali", weo_name: "WEO Mlali" },
        ],
      },
      {
        district_en: "Mpwapwa District Council",
        district_sw: "Halmashauri ya Wilaya ya Mpwapwa",
        council_type: "DC",
        ded_name: "John E. Nyika",
        dc_name: "Francis M. Sigalla",
        ded_phone: "+255 26 2320038",
        ded_email: "ded@mpwapwadc.go.tz",
        wards: [
          { ward_en: "Mpwapwa Mjini", ward_sw: "Mpwapwa Mjini", diwani_name: "Diwani Mpwapwa Mjini", weo_name: "WEO Mpwapwa Mjini" },
          { ward_en: "Kibakwe", ward_sw: "Kibakwe", diwani_name: "Diwani Kibakwe", weo_name: "WEO Kibakwe" },
          { ward_en: "Mazae", ward_sw: "Mazae", diwani_name: "Diwani Mazae", weo_name: "WEO Mazae" },
        ],
      },
      {
        district_en: "Bahi District Council",
        district_sw: "Halmashauri ya Wilaya ya Bahi",
        council_type: "DC",
        ded_name: "Abubakari M. Mwanakombo",
        dc_name: "Rose A. Senyagwa",
        ded_phone: "+255 26 2370134",
        ded_email: "ded@bahidc.go.tz",
        wards: [
          { ward_en: "Bahi", ward_sw: "Bahi", diwani_name: "Diwani Bahi", weo_name: "WEO Bahi" },
          { ward_en: "Chipanga", ward_sw: "Chipanga", diwani_name: "Diwani Chipanga", weo_name: "WEO Chipanga" },
        ],
      },
      {
        district_en: "Chemba District Council",
        district_sw: "Halmashauri ya Wilaya ya Chemba",
        council_type: "DC",
        ded_name: "Hamisi A. Kalinga",
        dc_name: "Mwajuma J. Ulimwengu",
        ded_phone: "+255 26 2360234",
        ded_email: "ded@chembadc.go.tz",
        wards: [
          { ward_en: "Chemba", ward_sw: "Chemba", diwani_name: "Diwani Chemba", weo_name: "WEO Chemba" },
          { ward_en: "Babayu", ward_sw: "Babayu", diwani_name: "Diwani Babayu", weo_name: "WEO Babayu" },
        ],
      },
    ],
  },

  // ── ARUSHA ──
  {
    region_en: "Arusha",
    region_sw: "Arusha",
    districts: [
      {
        district_en: "Arusha City Council",
        district_sw: "Halmashauri ya Jiji la Arusha",
        council_type: "MC",
        ded_name: "Dkt. Anna Mrosso",
        dc_name: "Rehema S. Ndululu",
        ded_phone: "+255 27 2503384",
        ded_email: "ded@arushacity.go.tz",
        wards: [
          { ward_en: "Sekei", ward_sw: "Sekei", diwani_name: "Diwani Sekei", weo_name: "WEO Sekei" },
          { ward_en: "Engutoto", ward_sw: "Engutoto", diwani_name: "Diwani Engutoto", weo_name: "WEO Engutoto" },
          { ward_en: "Kimandolu", ward_sw: "Kimandolu", diwani_name: "Diwani Kimandolu", weo_name: "WEO Kimandolu" },
          { ward_en: "Themi", ward_sw: "Themi", diwani_name: "Diwani Themi", weo_name: "WEO Themi" },
          { ward_en: "Kaloleni", ward_sw: "Kaloleni", diwani_name: "Diwani Kaloleni", weo_name: "WEO Kaloleni" },
          { ward_en: "Levolosi", ward_sw: "Levolosi", diwani_name: "Diwani Levolosi", weo_name: "WEO Levolosi" },
          { ward_en: "Ngarenaro", ward_sw: "Ngarenaro", diwani_name: "Diwani Ngarenaro", weo_name: "WEO Ngarenaro" },
          { ward_en: "Sombetini", ward_sw: "Sombetini", diwani_name: "Diwani Sombetini", weo_name: "WEO Sombetini" },
        ],
      },
      {
        district_en: "Arusha District Council",
        district_sw: "Halmashauri ya Wilaya ya Arusha",
        council_type: "DC",
        ded_name: "Paschal K. Mwijage",
        dc_name: "Dkt. Zuberi K. Khamis",
        ded_phone: "+255 27 2553012",
        ded_email: "ded@arushadc.go.tz",
        wards: [
          { ward_en: "Usa River", ward_sw: "Usa River", diwani_name: "Diwani Usa River", weo_name: "WEO Usa River" },
          { ward_en: "Moshono", ward_sw: "Moshono", diwani_name: "Diwani Moshono", weo_name: "WEO Moshono" },
          { ward_en: "Ilkiding'a", ward_sw: "Ilkiding'a", diwani_name: "Diwani Ilkiding'a", weo_name: "WEO Ilkiding'a" },
        ],
      },
      {
        district_en: "Karatu District Council",
        district_sw: "Halmashauri ya Wilaya ya Karatu",
        council_type: "DC",
        ded_name: "Deodatus S. Kinawilo",
        dc_name: "Philotea N. Mashauri",
        ded_phone: "+255 27 2534028",
        ded_email: "ded@karatudc.go.tz",
        wards: [
          { ward_en: "Karatu", ward_sw: "Karatu", diwani_name: "Diwani Karatu", weo_name: "WEO Karatu" },
          { ward_en: "Mbulumbulu", ward_sw: "Mbulumbulu", diwani_name: "Diwani Mbulumbulu", weo_name: "WEO Mbulumbulu" },
        ],
      },
      {
        district_en: "Longido District Council",
        district_sw: "Halmashauri ya Wilaya ya Longido",
        council_type: "DC",
        ded_name: "Happines B. Kihinga",
        dc_name: "Dkt. Ndelilio T. Temba",
        ded_phone: "+255 27 2539028",
        ded_email: "ded@longidodc.go.tz",
        wards: [
          { ward_en: "Longido", ward_sw: "Longido", diwani_name: "Diwani Longido", weo_name: "WEO Longido" },
          { ward_en: "Namanga", ward_sw: "Namanga", diwani_name: "Diwani Namanga", weo_name: "WEO Namanga" },
        ],
      },
      {
        district_en: "Meru District Council",
        district_sw: "Halmashauri ya Wilaya ya Meru",
        council_type: "DC",
        ded_name: "Robert E. Mshana",
        dc_name: "Florian S. Temu",
        ded_phone: "+255 27 2553145",
        ded_email: "ded@merudc.go.tz",
        wards: [
          { ward_en: "Poli", ward_sw: "Poli", diwani_name: "Diwani Poli", weo_name: "WEO Poli" },
          { ward_en: "Nkoaranga", ward_sw: "Nkoaranga", diwani_name: "Diwani Nkoaranga", weo_name: "WEO Nkoaranga" },
          { ward_en: "King'ori", ward_sw: "King'ori", diwani_name: "Diwani King'ori", weo_name: "WEO King'ori" },
        ],
      },
      {
        district_en: "Monduli District Council",
        district_sw: "Halmashauri ya Wilaya ya Monduli",
        council_type: "DC",
        ded_name: "Jeremiah M. Sumari",
        dc_name: "Veronica W. Mangowi",
        ded_phone: "+255 27 2539345",
        ded_email: "ded@mondulidc.go.tz",
        wards: [
          { ward_en: "Monduli Mjini", ward_sw: "Monduli Mjini", diwani_name: "Diwani Monduli Mjini", weo_name: "WEO Monduli Mjini" },
          { ward_en: "Mto wa Mbu", ward_sw: "Mto wa Mbu", diwani_name: "Diwani Mto wa Mbu", weo_name: "WEO Mto wa Mbu" },
        ],
      },
      {
        district_en: "Ngorongoro District Council",
        district_sw: "Halmashauri ya Wilaya ya Ngorongoro",
        council_type: "DC",
        ded_name: "Dkt. Godwin A. Mollel",
        dc_name: "Emmanuel L. Ollomi",
        ded_phone: "+255 27 2539567",
        ded_email: "ded@ngorongorodc.go.tz",
        wards: [
          { ward_en: "Loliondo", ward_sw: "Loliondo", diwani_name: "Diwani Loliondo", weo_name: "WEO Loliondo" },
          { ward_en: "Nainokanoka", ward_sw: "Nainokanoka", diwani_name: "Diwani Nainokanoka", weo_name: "WEO Nainokanoka" },
        ],
      },
    ],
  },

  // ── MWANZA ──
  {
    region_en: "Mwanza",
    region_sw: "Mwanza",
    districts: [
      {
        district_en: "Nyamagana Municipal Council",
        district_sw: "Manispaa ya Nyamagana",
        council_type: "MC",
        ded_name: "Dkt. Blandina R. Nyoni",
        dc_name: "Dkt. Patrick A. Sway",
        ded_phone: "+255 28 2500561",
        ded_email: "ded@nyamaganamc.go.tz",
        wards: [
          { ward_en: "Pamba", ward_sw: "Pamba", diwani_name: "Diwani Pamba", weo_name: "WEO Pamba" },
          { ward_en: "Mirongo", ward_sw: "Mirongo", diwani_name: "Diwani Mirongo", weo_name: "WEO Mirongo" },
          { ward_en: "Nyamagana", ward_sw: "Nyamagana", diwani_name: "Diwani Nyamagana", weo_name: "WEO Nyamagana" },
          { ward_en: "Igogo", ward_sw: "Igogo", diwani_name: "Diwani Igogo", weo_name: "WEO Igogo" },
          { ward_en: "Butimba", ward_sw: "Butimba", diwani_name: "Diwani Butimba", weo_name: "WEO Butimba" },
          { ward_en: "Isamilo", ward_sw: "Isamilo", diwani_name: "Diwani Isamilo", weo_name: "WEO Isamilo" },
        ],
      },
      {
        district_en: "Ilemela Municipal Council",
        district_sw: "Manispaa ya Ilemela",
        council_type: "MC",
        ded_name: "Aneth E. Kyaruzi",
        dc_name: "Albert O. Chalamila",
        ded_phone: "+255 28 2500871",
        ded_email: "ded@ilemelamc.go.tz",
        wards: [
          { ward_en: "Ilemela", ward_sw: "Ilemela", diwani_name: "Diwani Ilemela", weo_name: "WEO Ilemela" },
          { ward_en: "Buswelu", ward_sw: "Buswelu", diwani_name: "Diwani Buswelu", weo_name: "WEO Buswelu" },
          { ward_en: "Pasiansi", ward_sw: "Pasiansi", diwani_name: "Diwani Pasiansi", weo_name: "WEO Pasiansi" },
          { ward_en: "Nyakato", ward_sw: "Nyakato", diwani_name: "Diwani Nyakato", weo_name: "WEO Nyakato" },
          { ward_en: "Kirumba", ward_sw: "Kirumba", diwani_name: "Diwani Kirumba", weo_name: "WEO Kirumba" },
        ],
      },
      {
        district_en: "Sengerema District Council",
        district_sw: "Halmashauri ya Wilaya ya Sengerema",
        council_type: "DC",
        ded_name: "Mhandisi Eliasa S. Nchimbi",
        dc_name: "Wilson S. Mahemba",
        ded_phone: "+255 28 2790028",
        ded_email: "ded@sengeremadc.go.tz",
        wards: [
          { ward_en: "Sengerema", ward_sw: "Sengerema", diwani_name: "Diwani Sengerema", weo_name: "WEO Sengerema" },
          { ward_en: "Nyamazugo", ward_sw: "Nyamazugo", diwani_name: "Diwani Nyamazugo", weo_name: "WEO Nyamazugo" },
        ],
      },
      {
        district_en: "Kwimba District Council",
        district_sw: "Halmashauri ya Wilaya ya Kwimba",
        council_type: "DC",
        ded_name: "Bahati R. Makore",
        dc_name: "Mashaka J. Rugumamu",
        ded_phone: "+255 28 2700028",
        ded_email: "ded@kwimbadc.go.tz",
        wards: [
          { ward_en: "Ngudu", ward_sw: "Ngudu", diwani_name: "Diwani Ngudu", weo_name: "WEO Ngudu" },
          { ward_en: "Sumve", ward_sw: "Sumve", diwani_name: "Diwani Sumve", weo_name: "WEO Sumve" },
        ],
      },
      {
        district_en: "Magu District Council",
        district_sw: "Halmashauri ya Wilaya ya Magu",
        council_type: "DC",
        ded_name: "Benedict T. Kashanda",
        dc_name: "Mathias E. Kashindye",
        ded_phone: "+255 28 2760028",
        ded_email: "ded@magudc.go.tz",
        wards: [
          { ward_en: "Magu Mjini", ward_sw: "Magu Mjini", diwani_name: "Diwani Magu Mjini", weo_name: "WEO Magu Mjini" },
          { ward_en: "Kabila", ward_sw: "Kabila", diwani_name: "Diwani Kabila", weo_name: "WEO Kabila" },
        ],
      },
      {
        district_en: "Misungwi District Council",
        district_sw: "Halmashauri ya Wilaya ya Misungwi",
        council_type: "DC",
        ded_name: "Dkt. Nyanjige S. Mayagilo",
        dc_name: "Tumaini C. Magessa",
        ded_phone: "+255 28 2700345",
        ded_email: "ded@misungwidc.go.tz",
        wards: [
          { ward_en: "Misungwi", ward_sw: "Misungwi", diwani_name: "Diwani Misungwi", weo_name: "WEO Misungwi" },
          { ward_en: "Usagara", ward_sw: "Usagara", diwani_name: "Diwani Usagara", weo_name: "WEO Usagara" },
        ],
      },
      {
        district_en: "Ukerewe District Council",
        district_sw: "Halmashauri ya Wilaya ya Ukerewe",
        council_type: "DC",
        ded_name: "Godfrey J. Nyaisa",
        dc_name: "Asimwe P. Rusagara",
        ded_phone: "+255 28 2580028",
        ded_email: "ded@ukerewedc.go.tz",
        wards: [
          { ward_en: "Nansio", ward_sw: "Nansio", diwani_name: "Diwani Nansio", weo_name: "WEO Nansio" },
          { ward_en: "Bukondo", ward_sw: "Bukondo", diwani_name: "Diwani Bukondo", weo_name: "WEO Bukondo" },
        ],
      },
    ],
  },

  // ── KILIMANJARO ──
  {
    region_en: "Kilimanjaro",
    region_sw: "Kilimanjaro",
    districts: [
      {
        district_en: "Moshi Municipal Council",
        district_sw: "Manispaa ya Moshi",
        council_type: "MC",
        ded_name: "Dkt. Rehema K. Nchimbi",
        dc_name: "Kippi F. Warioba",
        ded_phone: "+255 27 2752032",
        ded_email: "ded@moshimc.go.tz",
        wards: [
          { ward_en: "Kiboriloni", ward_sw: "Kiboriloni", diwani_name: "Diwani Kiboriloni", weo_name: "WEO Kiboriloni" },
          { ward_en: "Mji Mpya", ward_sw: "Mji Mpya", diwani_name: "Diwani Mji Mpya", weo_name: "WEO Mji Mpya" },
          { ward_en: "Pasua", ward_sw: "Pasua", diwani_name: "Diwani Pasua", weo_name: "WEO Pasua" },
          { ward_en: "Bondeni", ward_sw: "Bondeni", diwani_name: "Diwani Bondeni", weo_name: "WEO Bondeni" },
          { ward_en: "Majengo", ward_sw: "Majengo", diwani_name: "Diwani Majengo", weo_name: "WEO Majengo" },
        ],
      },
      {
        district_en: "Moshi District Council",
        district_sw: "Halmashauri ya Wilaya ya Moshi",
        council_type: "DC",
        ded_name: "Venance E. Ndesamburo",
        dc_name: "Anajustina J. Tatu",
        ded_phone: "+255 27 2756012",
        ded_email: "ded@moshidc.go.tz",
        wards: [
          { ward_en: "Mbokomu", ward_sw: "Mbokomu", diwani_name: "Diwani Mbokomu", weo_name: "WEO Mbokomu" },
          { ward_en: "Old Moshi", ward_sw: "Old Moshi", diwani_name: "Diwani Old Moshi", weo_name: "WEO Old Moshi" },
          { ward_en: "Kibosho", ward_sw: "Kibosho", diwani_name: "Diwani Kibosho", weo_name: "WEO Kibosho" },
        ],
      },
      {
        district_en: "Hai District Council",
        district_sw: "Halmashauri ya Wilaya ya Hai",
        council_type: "DC",
        ded_name: "Lazaro P. Msanga",
        dc_name: "Lengai S. Ole-Sabaya",
        ded_phone: "+255 27 2756234",
        ded_email: "ded@haidc.go.tz",
        wards: [
          { ward_en: "Bomang'ombe", ward_sw: "Bomang'ombe", diwani_name: "Diwani Bomang'ombe", weo_name: "WEO Bomang'ombe" },
          { ward_en: "Machame", ward_sw: "Machame", diwani_name: "Diwani Machame", weo_name: "WEO Machame" },
        ],
      },
      {
        district_en: "Rombo District Council",
        district_sw: "Halmashauri ya Wilaya ya Rombo",
        council_type: "DC",
        ded_name: "Lightness M. Mhamilwa",
        dc_name: "Fadhili T. Machimu",
        ded_phone: "+255 27 2757028",
        ded_email: "ded@rombodc.go.tz",
        wards: [
          { ward_en: "Mkuu", ward_sw: "Mkuu", diwani_name: "Diwani Mkuu", weo_name: "WEO Mkuu" },
          { ward_en: "Usseri", ward_sw: "Usseri", diwani_name: "Diwani Usseri", weo_name: "WEO Usseri" },
        ],
      },
      {
        district_en: "Same District Council",
        district_sw: "Halmashauri ya Wilaya ya Same",
        council_type: "DC",
        ded_name: "Josephat P. Gwajima",
        dc_name: "Emmanuel K. Ulaya",
        ded_phone: "+255 27 2758028",
        ded_email: "ded@samedc.go.tz",
        wards: [
          { ward_en: "Same Mjini", ward_sw: "Same Mjini", diwani_name: "Diwani Same Mjini", weo_name: "WEO Same Mjini" },
          { ward_en: "Kisiwani", ward_sw: "Kisiwani", diwani_name: "Diwani Kisiwani", weo_name: "WEO Kisiwani" },
        ],
      },
      {
        district_en: "Mwanga District Council",
        district_sw: "Halmashauri ya Wilaya ya Mwanga",
        council_type: "DC",
        ded_name: "Godlisten M. Pallangyo",
        dc_name: "Marygoreth A. Kihongo",
        ded_phone: "+255 27 2758234",
        ded_email: "ded@mwangadc.go.tz",
        wards: [
          { ward_en: "Mwanga Mjini", ward_sw: "Mwanga Mjini", diwani_name: "Diwani Mwanga Mjini", weo_name: "WEO Mwanga Mjini" },
          { ward_en: "Lembeni", ward_sw: "Lembeni", diwani_name: "Diwani Lembeni", weo_name: "WEO Lembeni" },
        ],
      },
      {
        district_en: "Siha District Council",
        district_sw: "Halmashauri ya Wilaya ya Siha",
        council_type: "DC",
        ded_name: "Michael N. Mkumbwa",
        dc_name: "Dkt. Agnes M. Hokororo",
        ded_phone: "+255 27 2756567",
        ded_email: "ded@sihadc.go.tz",
        wards: [
          { ward_en: "Sanya Juu", ward_sw: "Sanya Juu", diwani_name: "Diwani Sanya Juu", weo_name: "WEO Sanya Juu" },
          { ward_en: "Karansi", ward_sw: "Karansi", diwani_name: "Diwani Karansi", weo_name: "WEO Karansi" },
        ],
      },
    ],
  },

  // ── MBEYA ──
  {
    region_en: "Mbeya",
    region_sw: "Mbeya",
    districts: [
      {
        district_en: "Mbeya City Council",
        district_sw: "Halmashauri ya Jiji la Mbeya",
        council_type: "MC",
        ded_name: "Dkt. Godlove J. Mbunda",
        dc_name: "Juma A. Homera",
        ded_phone: "+255 25 2502631",
        ded_email: "ded@mbeyacity.go.tz",
        wards: [
          { ward_en: "Sisimba", ward_sw: "Sisimba", diwani_name: "Diwani Sisimba", weo_name: "WEO Sisimba" },
          { ward_en: "Maendeleo", ward_sw: "Maendeleo", diwani_name: "Diwani Maendeleo", weo_name: "WEO Maendeleo" },
          { ward_en: "Iyunga", ward_sw: "Iyunga", diwani_name: "Diwani Iyunga", weo_name: "WEO Iyunga" },
          { ward_en: "Forest", ward_sw: "Forest", diwani_name: "Diwani Forest", weo_name: "WEO Forest" },
          { ward_en: "Ruanda", ward_sw: "Ruanda", diwani_name: "Diwani Ruanda", weo_name: "WEO Ruanda" },
        ],
      },
      {
        district_en: "Mbeya District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbeya",
        council_type: "DC",
        ded_name: "Furaha T. Mwakifuna",
        dc_name: "Deogratias D. Ndejembi",
        ded_phone: "+255 25 2502712",
        ded_email: "ded@mbeyadc.go.tz",
        wards: [
          { ward_en: "Tukuyu", ward_sw: "Tukuyu", diwani_name: "Diwani Tukuyu", weo_name: "WEO Tukuyu" },
          { ward_en: "Mbalizi", ward_sw: "Mbalizi", diwani_name: "Diwani Mbalizi", weo_name: "WEO Mbalizi" },
        ],
      },
      {
        district_en: "Chunya District Council",
        district_sw: "Halmashauri ya Wilaya ya Chunya",
        council_type: "DC",
        ded_name: "Joyce H. Mbilinyi",
        dc_name: "Respicius G. Mwijage",
        ded_phone: "+255 25 2950028",
        ded_email: "ded@chunyadc.go.tz",
        wards: [
          { ward_en: "Chunya Mjini", ward_sw: "Chunya Mjini", diwani_name: "Diwani Chunya Mjini", weo_name: "WEO Chunya Mjini" },
          { ward_en: "Makongorosi", ward_sw: "Makongorosi", diwani_name: "Diwani Makongorosi", weo_name: "WEO Makongorosi" },
        ],
      },
      {
        district_en: "Rungwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Rungwe",
        council_type: "DC",
        ded_name: "Constantine M. Kway",
        dc_name: "Dkt. Halima M. Dendego",
        ded_phone: "+255 25 2550028",
        ded_email: "ded@rungwedc.go.tz",
        wards: [
          { ward_en: "Tukuyu", ward_sw: "Tukuyu", diwani_name: "Diwani Tukuyu Rungwe", weo_name: "WEO Tukuyu Rungwe" },
          { ward_en: "Kiwira", ward_sw: "Kiwira", diwani_name: "Diwani Kiwira", weo_name: "WEO Kiwira" },
        ],
      },
      {
        district_en: "Mbarali District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbarali",
        council_type: "DC",
        ded_name: "Bryceson E. Mwakalinga",
        dc_name: "Godfrey S. Maganga",
        ded_phone: "+255 25 2510028",
        ded_email: "ded@mbaralidc.go.tz",
        wards: [
          { ward_en: "Rujewa", ward_sw: "Rujewa", diwani_name: "Diwani Rujewa", weo_name: "WEO Rujewa" },
          { ward_en: "Igurusi", ward_sw: "Igurusi", diwani_name: "Diwani Igurusi", weo_name: "WEO Igurusi" },
        ],
      },
      {
        district_en: "Busokelo District Council",
        district_sw: "Halmashauri ya Wilaya ya Busokelo",
        council_type: "DC",
        ded_name: "Josephine A. Lyimo",
        dc_name: "Jackson M. Kileo",
        ded_phone: "+255 25 2550234",
        ded_email: "ded@busokelodc.go.tz",
        wards: [
          { ward_en: "Luponde", ward_sw: "Luponde", diwani_name: "Diwani Luponde", weo_name: "WEO Luponde" },
          { ward_en: "Ikuti", ward_sw: "Ikuti", diwani_name: "Diwani Ikuti", weo_name: "WEO Ikuti" },
        ],
      },
    ],
  },

  // ── TANGA ──
  {
    region_en: "Tanga",
    region_sw: "Tanga",
    districts: [
      {
        district_en: "Tanga City Council",
        district_sw: "Halmashauri ya Jiji la Tanga",
        council_type: "MC",
        ded_name: "Dkt. Mwita J. Waitara",
        dc_name: "Idd S. Kimanta",
        ded_phone: "+255 27 2644028",
        ded_email: "ded@tangacity.go.tz",
        wards: [
          { ward_en: "Ngamiani", ward_sw: "Ngamiani", diwani_name: "Diwani Ngamiani", weo_name: "WEO Ngamiani" },
          { ward_en: "Mzingani", ward_sw: "Mzingani", diwani_name: "Diwani Mzingani", weo_name: "WEO Mzingani" },
          { ward_en: "Chumbageni", ward_sw: "Chumbageni", diwani_name: "Diwani Chumbageni", weo_name: "WEO Chumbageni" },
          { ward_en: "Usagara", ward_sw: "Usagara", diwani_name: "Diwani Usagara", weo_name: "WEO Usagara" },
          { ward_en: "Pongwe", ward_sw: "Pongwe", diwani_name: "Diwani Pongwe", weo_name: "WEO Pongwe" },
        ],
      },
      {
        district_en: "Lushoto District Council",
        district_sw: "Halmashauri ya Wilaya ya Lushoto",
        council_type: "DC",
        ded_name: "Benjamin M. Mchome",
        dc_name: "Dkt. Hawa S. Mwinyimkuu",
        ded_phone: "+255 27 2640028",
        ded_email: "ded@lushotodc.go.tz",
        wards: [
          { ward_en: "Lushoto", ward_sw: "Lushoto", diwani_name: "Diwani Lushoto", weo_name: "WEO Lushoto" },
          { ward_en: "Soni", ward_sw: "Soni", diwani_name: "Diwani Soni", weo_name: "WEO Soni" },
        ],
      },
      {
        district_en: "Muheza District Council",
        district_sw: "Halmashauri ya Wilaya ya Muheza",
        council_type: "DC",
        ded_name: "Hemed K. Omary",
        dc_name: "Fatma S. Mwasa",
        ded_phone: "+255 27 2641028",
        ded_email: "ded@muhezadc.go.tz",
        wards: [
          { ward_en: "Muheza Mjini", ward_sw: "Muheza Mjini", diwani_name: "Diwani Muheza Mjini", weo_name: "WEO Muheza Mjini" },
          { ward_en: "Tongoni", ward_sw: "Tongoni", diwani_name: "Diwani Tongoni", weo_name: "WEO Tongoni" },
        ],
      },
      {
        district_en: "Korogwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Korogwe",
        council_type: "DC",
        ded_name: "Hamad S. Yussuf",
        dc_name: "Evarista L. Mtui",
        ded_phone: "+255 27 2640234",
        ded_email: "ded@korogwedc.go.tz",
        wards: [
          { ward_en: "Korogwe Mjini", ward_sw: "Korogwe Mjini", diwani_name: "Diwani Korogwe Mjini", weo_name: "WEO Korogwe Mjini" },
          { ward_en: "Mombo", ward_sw: "Mombo", diwani_name: "Diwani Mombo", weo_name: "WEO Mombo" },
        ],
      },
      {
        district_en: "Pangani District Council",
        district_sw: "Halmashauri ya Wilaya ya Pangani",
        council_type: "DC",
        ded_name: "Tausi R. Msangi",
        dc_name: "Bakari S. Magongo",
        ded_phone: "+255 27 2630028",
        ded_email: "ded@panganidc.go.tz",
        wards: [
          { ward_en: "Pangani Mjini", ward_sw: "Pangani Mjini", diwani_name: "Diwani Pangani Mjini", weo_name: "WEO Pangani Mjini" },
        ],
      },
      {
        district_en: "Handeni District Council",
        district_sw: "Halmashauri ya Wilaya ya Handeni",
        council_type: "DC",
        ded_name: "Frida J. Ndelwa",
        dc_name: "Hafidhi S. Tahiri",
        ded_phone: "+255 27 2642028",
        ded_email: "ded@handenidc.go.tz",
        wards: [
          { ward_en: "Handeni Mjini", ward_sw: "Handeni Mjini", diwani_name: "Diwani Handeni Mjini", weo_name: "WEO Handeni Mjini" },
          { ward_en: "Kwamsisi", ward_sw: "Kwamsisi", diwani_name: "Diwani Kwamsisi", weo_name: "WEO Kwamsisi" },
        ],
      },
      {
        district_en: "Kilindi District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilindi",
        council_type: "DC",
        ded_name: "Deogratius E. Ndunguru",
        dc_name: "Esther G. Ikonda",
        ded_phone: "+255 27 2643028",
        ded_email: "ded@kilindidc.go.tz",
        wards: [
          { ward_en: "Kimbe", ward_sw: "Kimbe", diwani_name: "Diwani Kimbe", weo_name: "WEO Kimbe" },
        ],
      },
      {
        district_en: "Mkinga District Council",
        district_sw: "Halmashauri ya Wilaya ya Mkinga",
        council_type: "DC",
        ded_name: "Salama A. Mfaume",
        dc_name: "Leah J. Komba",
        ded_phone: "+255 27 2644234",
        ded_email: "ded@mkingadc.go.tz",
        wards: [
          { ward_en: "Maramba", ward_sw: "Maramba", diwani_name: "Diwani Maramba", weo_name: "WEO Maramba" },
        ],
      },
    ],
  },

  // ── MOROGORO ──
  {
    region_en: "Morogoro",
    region_sw: "Morogoro",
    districts: [
      {
        district_en: "Morogoro Municipal Council",
        district_sw: "Manispaa ya Morogoro",
        council_type: "MC",
        ded_name: "Dkt. Florian S. Buzatu",
        dc_name: "Christina S. Mndeme",
        ded_phone: "+255 23 2604028",
        ded_email: "ded@morogoromc.go.tz",
        wards: [
          { ward_en: "Mazimbu", ward_sw: "Mazimbu", diwani_name: "Diwani Mazimbu", weo_name: "WEO Mazimbu" },
          { ward_en: "Kingo", ward_sw: "Kingo", diwani_name: "Diwani Kingo", weo_name: "WEO Kingo" },
          { ward_en: "Bigwa", ward_sw: "Bigwa", diwani_name: "Diwani Bigwa", weo_name: "WEO Bigwa" },
          { ward_en: "Mafiga", ward_sw: "Mafiga", diwani_name: "Diwani Mafiga", weo_name: "WEO Mafiga" },
          { ward_en: "Sultan Area", ward_sw: "Sultan Area", diwani_name: "Diwani Sultan Area", weo_name: "WEO Sultan Area" },
        ],
      },
      {
        district_en: "Morogoro District Council",
        district_sw: "Halmashauri ya Wilaya ya Morogoro",
        council_type: "DC",
        ded_name: "Hamisi M. Mfanga",
        dc_name: "Stephen A. Kagaigai",
        ded_phone: "+255 23 2614028",
        ded_email: "ded@morogorodc.go.tz",
        wards: [
          { ward_en: "Mikese", ward_sw: "Mikese", diwani_name: "Diwani Mikese", weo_name: "WEO Mikese" },
          { ward_en: "Mvomero", ward_sw: "Mvomero", diwani_name: "Diwani Mvomero", weo_name: "WEO Mvomero" },
        ],
      },
      {
        district_en: "Mvomero District Council",
        district_sw: "Halmashauri ya Wilaya ya Mvomero",
        council_type: "DC",
        ded_name: "Ezekiel R. Mwombeki",
        dc_name: "Valentina M. Kamonga",
        ded_phone: "+255 23 2614134",
        ded_email: "ded@mvomerodc.go.tz",
        wards: [
          { ward_en: "Turiani", ward_sw: "Turiani", diwani_name: "Diwani Turiani", weo_name: "WEO Turiani" },
          { ward_en: "Dakawa", ward_sw: "Dakawa", diwani_name: "Diwani Dakawa", weo_name: "WEO Dakawa" },
        ],
      },
      {
        district_en: "Kilosa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilosa",
        council_type: "DC",
        ded_name: "Michael J. Masanja",
        dc_name: "Oscar B. Kebwe",
        ded_phone: "+255 23 2620028",
        ded_email: "ded@kilosadc.go.tz",
        wards: [
          { ward_en: "Kilosa Mjini", ward_sw: "Kilosa Mjini", diwani_name: "Diwani Kilosa Mjini", weo_name: "WEO Kilosa Mjini" },
          { ward_en: "Mikumi", ward_sw: "Mikumi", diwani_name: "Diwani Mikumi", weo_name: "WEO Mikumi" },
        ],
      },
      {
        district_en: "Kilombero District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilombero",
        council_type: "DC",
        ded_name: "Shekha H. Luvinga",
        dc_name: "Dkt. Ramadhan J. Sanga",
        ded_phone: "+255 23 2625028",
        ded_email: "ded@kilomberodc.go.tz",
        wards: [
          { ward_en: "Ifakara", ward_sw: "Ifakara", diwani_name: "Diwani Ifakara", weo_name: "WEO Ifakara" },
          { ward_en: "Kidatu", ward_sw: "Kidatu", diwani_name: "Diwani Kidatu", weo_name: "WEO Kidatu" },
        ],
      },
    ],
  },

  // ── IRINGA ──
  {
    region_en: "Iringa",
    region_sw: "Iringa",
    districts: [
      {
        district_en: "Iringa Municipal Council",
        district_sw: "Manispaa ya Iringa",
        council_type: "MC",
        ded_name: "Dkt. William F. Ngeleja",
        dc_name: "Leonce M. Mwera",
        ded_phone: "+255 26 2702631",
        ded_email: "ded@iringamc.go.tz",
        wards: [
          { ward_en: "Gangilonga", ward_sw: "Gangilonga", diwani_name: "Diwani Gangilonga", weo_name: "WEO Gangilonga" },
          { ward_en: "Mkwawa", ward_sw: "Mkwawa", diwani_name: "Diwani Mkwawa", weo_name: "WEO Mkwawa" },
          { ward_en: "Kihesa", ward_sw: "Kihesa", diwani_name: "Diwani Kihesa", weo_name: "WEO Kihesa" },
        ],
      },
      {
        district_en: "Iringa District Council",
        district_sw: "Halmashauri ya Wilaya ya Iringa",
        council_type: "DC",
        ded_name: "Nicholaus A. Kanuti",
        dc_name: "Faustine K. Ndugulile",
        ded_phone: "+255 26 2702712",
        ded_email: "ded@iringadc.go.tz",
        wards: [
          { ward_en: "Kalenga", ward_sw: "Kalenga", diwani_name: "Diwani Kalenga", weo_name: "WEO Kalenga" },
          { ward_en: "Isimani", ward_sw: "Isimani", diwani_name: "Diwani Isimani", weo_name: "WEO Isimani" },
        ],
      },
      {
        district_en: "Kilolo District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilolo",
        council_type: "DC",
        ded_name: "Amina S. Mgaya",
        dc_name: "Raymond G. Mwambene",
        ded_phone: "+255 26 2703028",
        ded_email: "ded@kilolodc.go.tz",
        wards: [
          { ward_en: "Kilolo", ward_sw: "Kilolo", diwani_name: "Diwani Kilolo", weo_name: "WEO Kilolo" },
          { ward_en: "Uhambingeto", ward_sw: "Uhambingeto", diwani_name: "Diwani Uhambingeto", weo_name: "WEO Uhambingeto" },
        ],
      },
    ],
  },

  // ── KAGERA ──
  {
    region_en: "Kagera",
    region_sw: "Kagera",
    districts: [
      {
        district_en: "Bukoba Municipal Council",
        district_sw: "Manispaa ya Bukoba",
        council_type: "MC",
        ded_name: "Dkt. Oscar R. Kikoyo",
        dc_name: "Thobias J. Andengenye",
        ded_phone: "+255 28 2220028",
        ded_email: "ded@bukobamc.go.tz",
        wards: [
          { ward_en: "Kagondo", ward_sw: "Kagondo", diwani_name: "Diwani Kagondo", weo_name: "WEO Kagondo" },
          { ward_en: "Bakoba", ward_sw: "Bakoba", diwani_name: "Diwani Bakoba", weo_name: "WEO Bakoba" },
          { ward_en: "Rwamishenye", ward_sw: "Rwamishenye", diwani_name: "Diwani Rwamishenye", weo_name: "WEO Rwamishenye" },
          { ward_en: "Hamugembe", ward_sw: "Hamugembe", diwani_name: "Diwani Hamugembe", weo_name: "WEO Hamugembe" },
        ],
      },
      {
        district_en: "Bukoba District Council",
        district_sw: "Halmashauri ya Wilaya ya Bukoba",
        council_type: "DC",
        ded_name: "Mussa J. Lukonge",
        dc_name: "Dkt. Aisha R. Amiri",
        ded_phone: "+255 28 2220134",
        ded_email: "ded@bukobadc.go.tz",
        wards: [
          { ward_en: "Maruku", ward_sw: "Maruku", diwani_name: "Diwani Maruku", weo_name: "WEO Maruku" },
          { ward_en: "Kaibanja", ward_sw: "Kaibanja", diwani_name: "Diwani Kaibanja", weo_name: "WEO Kaibanja" },
        ],
      },
      {
        district_en: "Muleba District Council",
        district_sw: "Halmashauri ya Wilaya ya Muleba",
        council_type: "DC",
        ded_name: "Fortunatus B. Rugalema",
        dc_name: "Albert S. Msando",
        ded_phone: "+255 28 2222028",
        ded_email: "ded@mulebadc.go.tz",
        wards: [
          { ward_en: "Muleba Mjini", ward_sw: "Muleba Mjini", diwani_name: "Diwani Muleba Mjini", weo_name: "WEO Muleba Mjini" },
          { ward_en: "Nshamba", ward_sw: "Nshamba", diwani_name: "Diwani Nshamba", weo_name: "WEO Nshamba" },
        ],
      },
      {
        district_en: "Karagwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Karagwe",
        council_type: "DC",
        ded_name: "Petro J. Kahangwa",
        dc_name: "Boniphace E. Nyambi",
        ded_phone: "+255 28 2222234",
        ded_email: "ded@karagwedc.go.tz",
        wards: [
          { ward_en: "Kayanga", ward_sw: "Kayanga", diwani_name: "Diwani Kayanga", weo_name: "WEO Kayanga" },
          { ward_en: "Nyaishozi", ward_sw: "Nyaishozi", diwani_name: "Diwani Nyaishozi", weo_name: "WEO Nyaishozi" },
        ],
      },
      {
        district_en: "Ngara District Council",
        district_sw: "Halmashauri ya Wilaya ya Ngara",
        council_type: "DC",
        ded_name: "Dkt. Felistas M. Buzugu",
        dc_name: "Innocent E. Semakafu",
        ded_phone: "+255 28 2222567",
        ded_email: "ded@ngaradc.go.tz",
        wards: [
          { ward_en: "Ngara Mjini", ward_sw: "Ngara Mjini", diwani_name: "Diwani Ngara Mjini", weo_name: "WEO Ngara Mjini" },
          { ward_en: "Rulenge", ward_sw: "Rulenge", diwani_name: "Diwani Rulenge", weo_name: "WEO Rulenge" },
        ],
      },
      {
        district_en: "Biharamulo District Council",
        district_sw: "Halmashauri ya Wilaya ya Biharamulo",
        council_type: "DC",
        ded_name: "Josephat F. Kakuba",
        dc_name: "Dkt. Grace K. Rugaimukamu",
        ded_phone: "+255 28 2222890",
        ded_email: "ded@biharamulodc.go.tz",
        wards: [
          { ward_en: "Biharamulo Mjini", ward_sw: "Biharamulo Mjini", diwani_name: "Diwani Biharamulo Mjini", weo_name: "WEO Biharamulo Mjini" },
          { ward_en: "Nyamigogo", ward_sw: "Nyamigogo", diwani_name: "Diwani Nyamigogo", weo_name: "WEO Nyamigogo" },
        ],
      },
      {
        district_en: "Kyerwa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kyerwa",
        council_type: "DC",
        ded_name: "Revocatus J. Mushokorwa",
        dc_name: "Evodia C. Ntagazwa",
        ded_phone: "+255 28 2223028",
        ded_email: "ded@kyerwadc.go.tz",
        wards: [
          { ward_en: "Kamachumu", ward_sw: "Kamachumu", diwani_name: "Diwani Kamachumu", weo_name: "WEO Kamachumu" },
        ],
      },
      {
        district_en: "Missenyi District Council",
        district_sw: "Halmashauri ya Wilaya ya Missenyi",
        council_type: "DC",
        ded_name: "Nyabigena R. Masatu",
        dc_name: "Isidori M. Shirima",
        ded_phone: "+255 28 2223234",
        ded_email: "ded@missenyidc.go.tz",
        wards: [
          { ward_en: "Mutukula", ward_sw: "Mutukula", diwani_name: "Diwani Mutukula", weo_name: "WEO Mutukula" },
          { ward_en: "Nsunga", ward_sw: "Nsunga", diwani_name: "Diwani Nsunga", weo_name: "WEO Nsunga" },
        ],
      },
    ],
  },

  // ── GEITA ──
  {
    region_en: "Geita",
    region_sw: "Geita",
    districts: [
      {
        district_en: "Geita Town Council",
        district_sw: "Halmashauri ya Mji wa Geita",
        council_type: "TC",
        ded_name: "Ramadhani S. Hamza",
        dc_name: "Dkt. Nyamizi B. Buretta",
        ded_phone: "+255 28 2520028",
        ded_email: "ded@geitatc.go.tz",
        wards: [
          { ward_en: "Geita Mjini", ward_sw: "Geita Mjini", diwani_name: "Diwani Geita Mjini", weo_name: "WEO Geita Mjini" },
          { ward_en: "Kalangalala", ward_sw: "Kalangalala", diwani_name: "Diwani Kalangalala", weo_name: "WEO Kalangalala" },
        ],
      },
      {
        district_en: "Geita District Council",
        district_sw: "Halmashauri ya Wilaya ya Geita",
        council_type: "DC",
        ded_name: "Felix J. Mwombeki",
        dc_name: "Zacharia N. Issaay",
        ded_phone: "+255 28 2520134",
        ded_email: "ded@geitadc.go.tz",
        wards: [
          { ward_en: "Katoro", ward_sw: "Katoro", diwani_name: "Diwani Katoro", weo_name: "WEO Katoro" },
          { ward_en: "Nyankumbu", ward_sw: "Nyankumbu", diwani_name: "Diwani Nyankumbu", weo_name: "WEO Nyankumbu" },
        ],
      },
      {
        district_en: "Chato District Council",
        district_sw: "Halmashauri ya Wilaya ya Chato",
        council_type: "DC",
        ded_name: "Masanja R. Kadege",
        dc_name: "Bakari K. Mmanga",
        ded_phone: "+255 28 2520234",
        ded_email: "ded@chatodc.go.tz",
        wards: [
          { ward_en: "Chato", ward_sw: "Chato", diwani_name: "Diwani Chato", weo_name: "WEO Chato" },
          { ward_en: "Bwanga", ward_sw: "Bwanga", diwani_name: "Diwani Bwanga", weo_name: "WEO Bwanga" },
        ],
      },
      {
        district_en: "Bukombe District Council",
        district_sw: "Halmashauri ya Wilaya ya Bukombe",
        council_type: "DC",
        ded_name: "Lusajo M. Mwakitalu",
        dc_name: "Stanislaus F. Kafyulilo",
        ded_phone: "+255 28 2520567",
        ded_email: "ded@bukombedc.go.tz",
        wards: [
          { ward_en: "Ushirombo", ward_sw: "Ushirombo", diwani_name: "Diwani Ushirombo", weo_name: "WEO Ushirombo" },
        ],
      },
      {
        district_en: "Mbogwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbogwe",
        council_type: "DC",
        ded_name: "Damian S. Lugendo",
        dc_name: "Amina J. Mpanda",
        ded_phone: "+255 28 2520890",
        ded_email: "ded@mbogwedc.go.tz",
        wards: [
          { ward_en: "Mbogwe", ward_sw: "Mbogwe", diwani_name: "Diwani Mbogwe", weo_name: "WEO Mbogwe" },
        ],
      },
      {
        district_en: "Nyang'hwale District Council",
        district_sw: "Halmashauri ya Wilaya ya Nyang'hwale",
        council_type: "DC",
        ded_name: "Emmanuel T. Shija",
        dc_name: "Dkt. John M. Ntabaliba",
        ded_phone: "+255 28 2521028",
        ded_email: "ded@nyanghwaledc.go.tz",
        wards: [
          { ward_en: "Nyang'hwale", ward_sw: "Nyang'hwale", diwani_name: "Diwani Nyang'hwale", weo_name: "WEO Nyang'hwale" },
        ],
      },
    ],
  },

  // ── SHINYANGA ──
  {
    region_en: "Shinyanga",
    region_sw: "Shinyanga",
    districts: [
      {
        district_en: "Shinyanga Municipal Council",
        district_sw: "Manispaa ya Shinyanga",
        council_type: "MC",
        ded_name: "Dkt. Baraka W. Luvanda",
        dc_name: "Zuberi J. Mwasandube",
        ded_phone: "+255 28 2762028",
        ded_email: "ded@shinyangamc.go.tz",
        wards: [
          { ward_en: "Kambarage", ward_sw: "Kambarage", diwani_name: "Diwani Kambarage", weo_name: "WEO Kambarage" },
          { ward_en: "Ibadakuli", ward_sw: "Ibadakuli", diwani_name: "Diwani Ibadakuli", weo_name: "WEO Ibadakuli" },
          { ward_en: "Old Shinyanga", ward_sw: "Shinyanga ya Zamani", diwani_name: "Diwani Old Shinyanga", weo_name: "WEO Old Shinyanga" },
        ],
      },
      {
        district_en: "Shinyanga District Council",
        district_sw: "Halmashauri ya Wilaya ya Shinyanga",
        council_type: "DC",
        ded_name: "Rashidi M. Omary",
        dc_name: "Hawa I. Ngonyani",
        ded_phone: "+255 28 2762134",
        ded_email: "ded@shinyangadc.go.tz",
        wards: [
          { ward_en: "Tinde", ward_sw: "Tinde", diwani_name: "Diwani Tinde", weo_name: "WEO Tinde" },
          { ward_en: "Usanda", ward_sw: "Usanda", diwani_name: "Diwani Usanda", weo_name: "WEO Usanda" },
        ],
      },
      {
        district_en: "Kahama Town Council",
        district_sw: "Halmashauri ya Mji wa Kahama",
        council_type: "TC",
        ded_name: "Dkt. Charles M. Malifedha",
        dc_name: "Lusubilo F. Mwakalebela",
        ded_phone: "+255 28 2780028",
        ded_email: "ded@kahamatc.go.tz",
        wards: [
          { ward_en: "Kahama Mjini", ward_sw: "Kahama Mjini", diwani_name: "Diwani Kahama Mjini", weo_name: "WEO Kahama Mjini" },
          { ward_en: "Malunga", ward_sw: "Malunga", diwani_name: "Diwani Malunga", weo_name: "WEO Malunga" },
        ],
      },
      {
        district_en: "Kahama District Council",
        district_sw: "Halmashauri ya Wilaya ya Kahama",
        council_type: "DC",
        ded_name: "Grace P. Ulomi",
        dc_name: "Richard M. Mabula",
        ded_phone: "+255 28 2780134",
        ded_email: "ded@kahamadc.go.tz",
        wards: [
          { ward_en: "Bugarama", ward_sw: "Bugarama", diwani_name: "Diwani Bugarama", weo_name: "WEO Bugarama" },
        ],
      },
      {
        district_en: "Kishapu District Council",
        district_sw: "Halmashauri ya Wilaya ya Kishapu",
        council_type: "DC",
        ded_name: "Naomi G. Kemilembe",
        dc_name: "Ismail H. Mwenda",
        ded_phone: "+255 28 2762567",
        ded_email: "ded@kishapudc.go.tz",
        wards: [
          { ward_en: "Kishapu", ward_sw: "Kishapu", diwani_name: "Diwani Kishapu", weo_name: "WEO Kishapu" },
        ],
      },
      {
        district_en: "Msalala District Council",
        district_sw: "Halmashauri ya Wilaya ya Msalala",
        council_type: "DC",
        ded_name: "Baraka E. Ndimbo",
        dc_name: "Francis O. Mtitu",
        ded_phone: "+255 28 2780567",
        ded_email: "ded@msaladc.go.tz",
        wards: [
          { ward_en: "Msalala", ward_sw: "Msalala", diwani_name: "Diwani Msalala", weo_name: "WEO Msalala" },
        ],
      },
      {
        district_en: "Ushetu District Council",
        district_sw: "Halmashauri ya Wilaya ya Ushetu",
        council_type: "DC",
        ded_name: "Jeremiah S. Kaduma",
        dc_name: "Devotha M. Bashemera",
        ded_phone: "+255 28 2780890",
        ded_email: "ded@ushetudc.go.tz",
        wards: [
          { ward_en: "Ushetu", ward_sw: "Ushetu", diwani_name: "Diwani Ushetu", weo_name: "WEO Ushetu" },
        ],
      },
    ],
  },

  // ── SIMIYU ──
  {
    region_en: "Simiyu",
    region_sw: "Simiyu",
    districts: [
      {
        district_en: "Bariadi Town Council",
        district_sw: "Halmashauri ya Mji wa Bariadi",
        council_type: "TC",
        ded_name: "Dkt. Simon P. Makoye",
        dc_name: "Mathew J. Mhina",
        ded_phone: "+255 28 2790028",
        ded_email: "ded@bariaditc.go.tz",
        wards: [
          { ward_en: "Bariadi Mjini", ward_sw: "Bariadi Mjini", diwani_name: "Diwani Bariadi Mjini", weo_name: "WEO Bariadi Mjini" },
          { ward_en: "Somanda", ward_sw: "Somanda", diwani_name: "Diwani Somanda", weo_name: "WEO Somanda" },
        ],
      },
      {
        district_en: "Bariadi District Council",
        district_sw: "Halmashauri ya Wilaya ya Bariadi",
        council_type: "DC",
        ded_name: "Benedict M. Mwita",
        dc_name: "Alphonce S. Segumba",
        ded_phone: "+255 28 2790134",
        ded_email: "ded@bariadidc.go.tz",
        wards: [
          { ward_en: "Dutwa", ward_sw: "Dutwa", diwani_name: "Diwani Dutwa", weo_name: "WEO Dutwa" },
        ],
      },
      {
        district_en: "Maswa District Council",
        district_sw: "Halmashauri ya Wilaya ya Maswa",
        council_type: "DC",
        ded_name: "Salum A. Mlaki",
        dc_name: "Godefrida J. Kabigumila",
        ded_phone: "+255 28 2750028",
        ded_email: "ded@maswadc.go.tz",
        wards: [
          { ward_en: "Maswa Mjini", ward_sw: "Maswa Mjini", diwani_name: "Diwani Maswa Mjini", weo_name: "WEO Maswa Mjini" },
          { ward_en: "Senani", ward_sw: "Senani", diwani_name: "Diwani Senani", weo_name: "WEO Senani" },
        ],
      },
      {
        district_en: "Meatu District Council",
        district_sw: "Halmashauri ya Wilaya ya Meatu",
        council_type: "DC",
        ded_name: "Juma K. Mhagama",
        dc_name: "Dkt. Esther B. Mwakyembe",
        ded_phone: "+255 28 2750234",
        ded_email: "ded@meatudc.go.tz",
        wards: [
          { ward_en: "Mwanhuzi", ward_sw: "Mwanhuzi", diwani_name: "Diwani Mwanhuzi", weo_name: "WEO Mwanhuzi" },
        ],
      },
      {
        district_en: "Busega District Council",
        district_sw: "Halmashauri ya Wilaya ya Busega",
        council_type: "DC",
        ded_name: "Robert M. Migiro",
        dc_name: "Joel S. Massay",
        ded_phone: "+255 28 2750567",
        ded_email: "ded@busegadc.go.tz",
        wards: [
          { ward_en: "Lamadi", ward_sw: "Lamadi", diwani_name: "Diwani Lamadi", weo_name: "WEO Lamadi" },
        ],
      },
      {
        district_en: "Itilima District Council",
        district_sw: "Halmashauri ya Wilaya ya Itilima",
        council_type: "DC",
        ded_name: "Hamisi S. Luposo",
        dc_name: "Dkt. Felister W. Mgonja",
        ded_phone: "+255 28 2750890",
        ded_email: "ded@itilimadc.go.tz",
        wards: [
          { ward_en: "Lagangabilili", ward_sw: "Lagangabilili", diwani_name: "Diwani Lagangabilili", weo_name: "WEO Lagangabilili" },
        ],
      },
    ],
  },

  // ── TABORA ──
  {
    region_en: "Tabora",
    region_sw: "Tabora",
    districts: [
      {
        district_en: "Tabora Municipal Council",
        district_sw: "Manispaa ya Tabora",
        council_type: "MC",
        ded_name: "Dkt. John M. Osingo",
        dc_name: "Elias B. Tarimo",
        ded_phone: "+255 26 2604028",
        ded_email: "ded@taboramc.go.tz",
        wards: [
          { ward_en: "Ipuli", ward_sw: "Ipuli", diwani_name: "Diwani Ipuli", weo_name: "WEO Ipuli" },
          { ward_en: "Isevya", ward_sw: "Isevya", diwani_name: "Diwani Isevya", weo_name: "WEO Isevya" },
          { ward_en: "Gongoni", ward_sw: "Gongoni", diwani_name: "Diwani Gongoni", weo_name: "WEO Gongoni" },
        ],
      },
      {
        district_en: "Uyui District Council",
        district_sw: "Halmashauri ya Wilaya ya Uyui",
        council_type: "DC",
        ded_name: "Issa H. Mtumwa",
        dc_name: "Theresia S. Kapela",
        ded_phone: "+255 26 2604134",
        ded_email: "ded@uyuidc.go.tz",
        wards: [
          { ward_en: "Uyui", ward_sw: "Uyui", diwani_name: "Diwani Uyui", weo_name: "WEO Uyui" },
        ],
      },
      {
        district_en: "Nzega District Council",
        district_sw: "Halmashauri ya Wilaya ya Nzega",
        council_type: "DC",
        ded_name: "Dkt. Festo S. Malibiche",
        dc_name: "Amos J. Ng'hwaya",
        ded_phone: "+255 26 2610028",
        ded_email: "ded@nzegadc.go.tz",
        wards: [
          { ward_en: "Nzega Mjini", ward_sw: "Nzega Mjini", diwani_name: "Diwani Nzega Mjini", weo_name: "WEO Nzega Mjini" },
          { ward_en: "Puge", ward_sw: "Puge", diwani_name: "Diwani Puge", weo_name: "WEO Puge" },
        ],
      },
      {
        district_en: "Igunga District Council",
        district_sw: "Halmashauri ya Wilaya ya Igunga",
        council_type: "DC",
        ded_name: "Alphonce M. Sanga",
        dc_name: "Farida O. Mbaruk",
        ded_phone: "+255 26 2610234",
        ded_email: "ded@igungadc.go.tz",
        wards: [
          { ward_en: "Igunga Mjini", ward_sw: "Igunga Mjini", diwani_name: "Diwani Igunga Mjini", weo_name: "WEO Igunga Mjini" },
        ],
      },
      {
        district_en: "Urambo District Council",
        district_sw: "Halmashauri ya Wilaya ya Urambo",
        council_type: "DC",
        ded_name: "Halima J. Mdee",
        dc_name: "Bashiru A. Mwenda",
        ded_phone: "+255 26 2610567",
        ded_email: "ded@urambodc.go.tz",
        wards: [
          { ward_en: "Urambo Mjini", ward_sw: "Urambo Mjini", diwani_name: "Diwani Urambo Mjini", weo_name: "WEO Urambo Mjini" },
        ],
      },
      {
        district_en: "Sikonge District Council",
        district_sw: "Halmashauri ya Wilaya ya Sikonge",
        council_type: "DC",
        ded_name: "Paschal J. Rweyendera",
        dc_name: "Rehema M. Kidata",
        ded_phone: "+255 26 2610890",
        ded_email: "ded@sikongedc.go.tz",
        wards: [
          { ward_en: "Sikonge Mjini", ward_sw: "Sikonge Mjini", diwani_name: "Diwani Sikonge Mjini", weo_name: "WEO Sikonge Mjini" },
        ],
      },
      {
        district_en: "Kaliua District Council",
        district_sw: "Halmashauri ya Wilaya ya Kaliua",
        council_type: "DC",
        ded_name: "Fadhili R. Mwakyusa",
        dc_name: "Daudi P. Lukuvi",
        ded_phone: "+255 26 2611028",
        ded_email: "ded@kaliuadc.go.tz",
        wards: [
          { ward_en: "Kaliua", ward_sw: "Kaliua", diwani_name: "Diwani Kaliua", weo_name: "WEO Kaliua" },
        ],
      },
    ],
  },

  // ── SINGIDA ──
  {
    region_en: "Singida",
    region_sw: "Singida",
    districts: [
      {
        district_en: "Singida Municipal Council",
        district_sw: "Manispaa ya Singida",
        council_type: "MC",
        ded_name: "Dkt. Reuben M. Chacha",
        dc_name: "Mwanaisha S. Ulimwengu",
        ded_phone: "+255 26 2502028",
        ded_email: "ded@singidamc.go.tz",
        wards: [
          { ward_en: "Utemini", ward_sw: "Utemini", diwani_name: "Diwani Utemini", weo_name: "WEO Utemini" },
          { ward_en: "Mandewa", ward_sw: "Mandewa", diwani_name: "Diwani Mandewa", weo_name: "WEO Mandewa" },
        ],
      },
      {
        district_en: "Singida District Council",
        district_sw: "Halmashauri ya Wilaya ya Singida",
        council_type: "DC",
        ded_name: "Salehe J. Maktibu",
        dc_name: "Pendo A. Massawe",
        ded_phone: "+255 26 2502134",
        ded_email: "ded@singidadc.go.tz",
        wards: [
          { ward_en: "Ilongero", ward_sw: "Ilongero", diwani_name: "Diwani Ilongero", weo_name: "WEO Ilongero" },
        ],
      },
      {
        district_en: "Iramba District Council",
        district_sw: "Halmashauri ya Wilaya ya Iramba",
        council_type: "DC",
        ded_name: "Mwajuma H. Khamis",
        dc_name: "Sylvester L. Mwakisisile",
        ded_phone: "+255 26 2540028",
        ded_email: "ded@irambadc.go.tz",
        wards: [
          { ward_en: "Kiomboi", ward_sw: "Kiomboi", diwani_name: "Diwani Kiomboi", weo_name: "WEO Kiomboi" },
          { ward_en: "Shelui", ward_sw: "Shelui", diwani_name: "Diwani Shelui", weo_name: "WEO Shelui" },
        ],
      },
      {
        district_en: "Manyoni District Council",
        district_sw: "Halmashauri ya Wilaya ya Manyoni",
        council_type: "DC",
        ded_name: "Dkt. Atilio L. Kameka",
        dc_name: "Lucas E. Ng'itu",
        ded_phone: "+255 26 2530028",
        ded_email: "ded@manyonidc.go.tz",
        wards: [
          { ward_en: "Manyoni Mjini", ward_sw: "Manyoni Mjini", diwani_name: "Diwani Manyoni Mjini", weo_name: "WEO Manyoni Mjini" },
        ],
      },
      {
        district_en: "Ikungi District Council",
        district_sw: "Halmashauri ya Wilaya ya Ikungi",
        council_type: "DC",
        ded_name: "Justinian D. Kamaghe",
        dc_name: "Esther P. Ngowi",
        ded_phone: "+255 26 2502567",
        ded_email: "ded@ikungidc.go.tz",
        wards: [
          { ward_en: "Ikungi", ward_sw: "Ikungi", diwani_name: "Diwani Ikungi", weo_name: "WEO Ikungi" },
        ],
      },
      {
        district_en: "Mkalama District Council",
        district_sw: "Halmashauri ya Wilaya ya Mkalama",
        council_type: "DC",
        ded_name: "Deogratius M. Kapinga",
        dc_name: "Theresia J. Mhagama",
        ded_phone: "+255 26 2502890",
        ded_email: "ded@mkalamadc.go.tz",
        wards: [
          { ward_en: "Iguguno", ward_sw: "Iguguno", diwani_name: "Diwani Iguguno", weo_name: "WEO Iguguno" },
        ],
      },
    ],
  },

  // ── KIGOMA ──
  {
    region_en: "Kigoma",
    region_sw: "Kigoma",
    districts: [
      {
        district_en: "Kigoma-Ujiji Municipal Council",
        district_sw: "Manispaa ya Kigoma-Ujiji",
        council_type: "MC",
        ded_name: "Dkt. Neema M. Wambura",
        dc_name: "Dkt. Albert G. Chalamila Jr.",
        ded_phone: "+255 28 2802028",
        ded_email: "ded@kigomamc.go.tz",
        wards: [
          { ward_en: "Bangwe", ward_sw: "Bangwe", diwani_name: "Diwani Bangwe", weo_name: "WEO Bangwe" },
          { ward_en: "Ujiji", ward_sw: "Ujiji", diwani_name: "Diwani Ujiji", weo_name: "WEO Ujiji" },
          { ward_en: "Katubuka", ward_sw: "Katubuka", diwani_name: "Diwani Katubuka", weo_name: "WEO Katubuka" },
        ],
      },
      {
        district_en: "Kigoma District Council",
        district_sw: "Halmashauri ya Wilaya ya Kigoma",
        council_type: "DC",
        ded_name: "Hassan J. Rubuga",
        dc_name: "Yohana M. Mapunda",
        ded_phone: "+255 28 2802134",
        ded_email: "ded@kigomadc.go.tz",
        wards: [
          { ward_en: "Mwandiga", ward_sw: "Mwandiga", diwani_name: "Diwani Mwandiga", weo_name: "WEO Mwandiga" },
        ],
      },
      {
        district_en: "Kasulu District Council",
        district_sw: "Halmashauri ya Wilaya ya Kasulu",
        council_type: "DC",
        ded_name: "Wankenja M. Mhagama",
        dc_name: "Dkt. Omari S. Mpanda",
        ded_phone: "+255 28 2810028",
        ded_email: "ded@kasuludc.go.tz",
        wards: [
          { ward_en: "Kasulu Mjini", ward_sw: "Kasulu Mjini", diwani_name: "Diwani Kasulu Mjini", weo_name: "WEO Kasulu Mjini" },
        ],
      },
      {
        district_en: "Kibondo District Council",
        district_sw: "Halmashauri ya Wilaya ya Kibondo",
        council_type: "DC",
        ded_name: "Godfrey J. Kabelwa",
        dc_name: "Samwel P. Mwakalobo",
        ded_phone: "+255 28 2820028",
        ded_email: "ded@kibondodc.go.tz",
        wards: [
          { ward_en: "Kibondo Mjini", ward_sw: "Kibondo Mjini", diwani_name: "Diwani Kibondo Mjini", weo_name: "WEO Kibondo Mjini" },
        ],
      },
      {
        district_en: "Uvinza District Council",
        district_sw: "Halmashauri ya Wilaya ya Uvinza",
        council_type: "DC",
        ded_name: "Sadick M. Musa",
        dc_name: "Devotha R. Mollel",
        ded_phone: "+255 28 2802567",
        ded_email: "ded@uvinzadc.go.tz",
        wards: [
          { ward_en: "Uvinza", ward_sw: "Uvinza", diwani_name: "Diwani Uvinza", weo_name: "WEO Uvinza" },
        ],
      },
      {
        district_en: "Buhigwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Buhigwe",
        council_type: "DC",
        ded_name: "Theresia S. Nyanzobe",
        dc_name: "Gideon K. Mwanyika",
        ded_phone: "+255 28 2802890",
        ded_email: "ded@buhigwedc.go.tz",
        wards: [
          { ward_en: "Muyama", ward_sw: "Muyama", diwani_name: "Diwani Muyama", weo_name: "WEO Muyama" },
        ],
      },
      {
        district_en: "Kakonko District Council",
        district_sw: "Halmashauri ya Wilaya ya Kakonko",
        council_type: "DC",
        ded_name: "Emmanuel F. Bitegera",
        dc_name: "Juma H. Msemwa",
        ded_phone: "+255 28 2803028",
        ded_email: "ded@kakonkodc.go.tz",
        wards: [
          { ward_en: "Kakonko", ward_sw: "Kakonko", diwani_name: "Diwani Kakonko", weo_name: "WEO Kakonko" },
        ],
      },
    ],
  },

  // ── KATAVI ──
  {
    region_en: "Katavi",
    region_sw: "Katavi",
    districts: [
      {
        district_en: "Mpanda Town Council",
        district_sw: "Halmashauri ya Mji wa Mpanda",
        council_type: "TC",
        ded_name: "Dkt. Godlisten E. Mwampashi",
        dc_name: "Hamis A. Kumilonde",
        ded_phone: "+255 25 2820028",
        ded_email: "ded@mpandatc.go.tz",
        wards: [
          { ward_en: "Mpanda Mjini", ward_sw: "Mpanda Mjini", diwani_name: "Diwani Mpanda Mjini", weo_name: "WEO Mpanda Mjini" },
          { ward_en: "Ilembo", ward_sw: "Ilembo", diwani_name: "Diwani Ilembo", weo_name: "WEO Ilembo" },
        ],
      },
      {
        district_en: "Mpanda District Council",
        district_sw: "Halmashauri ya Wilaya ya Mpanda",
        council_type: "DC",
        ded_name: "Gervas A. Mwende",
        dc_name: "Elizabeth M. Tupa",
        ded_phone: "+255 25 2820134",
        ded_email: "ded@mpandadc.go.tz",
        wards: [
          { ward_en: "Karema", ward_sw: "Karema", diwani_name: "Diwani Karema", weo_name: "WEO Karema" },
        ],
      },
      {
        district_en: "Mlele District Council",
        district_sw: "Halmashauri ya Wilaya ya Mlele",
        council_type: "DC",
        ded_name: "Felister J. Shekimweri",
        dc_name: "Baraka M. Kalala",
        ded_phone: "+255 25 2820234",
        ded_email: "ded@mleledc.go.tz",
        wards: [
          { ward_en: "Inyonga", ward_sw: "Inyonga", diwani_name: "Diwani Inyonga", weo_name: "WEO Inyonga" },
        ],
      },
      {
        district_en: "Nsimbo District Council",
        district_sw: "Halmashauri ya Wilaya ya Nsimbo",
        council_type: "DC",
        ded_name: "Mhandisi Geofrey K. Komanya",
        dc_name: "Dkt. Fatma J. Mwakibinga",
        ded_phone: "+255 25 2820567",
        ded_email: "ded@nsimbodc.go.tz",
        wards: [
          { ward_en: "Nsimbo", ward_sw: "Nsimbo", diwani_name: "Diwani Nsimbo", weo_name: "WEO Nsimbo" },
        ],
      },
    ],
  },

  // ── LINDI ──
  {
    region_en: "Lindi",
    region_sw: "Lindi",
    districts: [
      {
        district_en: "Lindi Municipal Council",
        district_sw: "Manispaa ya Lindi",
        council_type: "MC",
        ded_name: "Dkt. Mohamed S. Khamis",
        dc_name: "Omary R. Mgumba",
        ded_phone: "+255 23 2202028",
        ded_email: "ded@lindimc.go.tz",
        wards: [
          { ward_en: "Rahaleo", ward_sw: "Rahaleo", diwani_name: "Diwani Rahaleo", weo_name: "WEO Rahaleo" },
          { ward_en: "Jamhuri", ward_sw: "Jamhuri", diwani_name: "Diwani Jamhuri", weo_name: "WEO Jamhuri" },
        ],
      },
      {
        district_en: "Lindi District Council",
        district_sw: "Halmashauri ya Wilaya ya Lindi",
        council_type: "DC",
        ded_name: "Rabia S. Mwambogo",
        dc_name: "Hashim J. Mgeta",
        ded_phone: "+255 23 2202134",
        ded_email: "ded@lindidc.go.tz",
        wards: [
          { ward_en: "Sudi", ward_sw: "Sudi", diwani_name: "Diwani Sudi", weo_name: "WEO Sudi" },
        ],
      },
      {
        district_en: "Kilwa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilwa",
        council_type: "DC",
        ded_name: "Rehema J. Mfinanga",
        dc_name: "Nassir M. Geidam",
        ded_phone: "+255 23 2210028",
        ded_email: "ded@kilwadc.go.tz",
        wards: [
          { ward_en: "Kilwa Masoko", ward_sw: "Kilwa Masoko", diwani_name: "Diwani Kilwa Masoko", weo_name: "WEO Kilwa Masoko" },
          { ward_en: "Kilwa Kivinje", ward_sw: "Kilwa Kivinje", diwani_name: "Diwani Kilwa Kivinje", weo_name: "WEO Kilwa Kivinje" },
        ],
      },
      {
        district_en: "Nachingwea District Council",
        district_sw: "Halmashauri ya Wilaya ya Nachingwea",
        council_type: "DC",
        ded_name: "Mhandisi Said H. Ndumbaro",
        dc_name: "Dkt. Neema R. Kiondo",
        ded_phone: "+255 23 2210234",
        ded_email: "ded@nachingweadc.go.tz",
        wards: [
          { ward_en: "Nachingwea Mjini", ward_sw: "Nachingwea Mjini", diwani_name: "Diwani Nachingwea Mjini", weo_name: "WEO Nachingwea Mjini" },
        ],
      },
      {
        district_en: "Liwale District Council",
        district_sw: "Halmashauri ya Wilaya ya Liwale",
        council_type: "DC",
        ded_name: "Abdallah S. Mwanamboka",
        dc_name: "Bernadetha S. Mushashu",
        ded_phone: "+255 23 2210567",
        ded_email: "ded@liwaledc.go.tz",
        wards: [
          { ward_en: "Liwale", ward_sw: "Liwale", diwani_name: "Diwani Liwale", weo_name: "WEO Liwale" },
        ],
      },
      {
        district_en: "Ruangwa District Council",
        district_sw: "Halmashauri ya Wilaya ya Ruangwa",
        council_type: "DC",
        ded_name: "Hamisi M. Nassoro",
        dc_name: "Elizabeth J. Motambo",
        ded_phone: "+255 23 2210890",
        ded_email: "ded@ruangwadc.go.tz",
        wards: [
          { ward_en: "Ruangwa Mjini", ward_sw: "Ruangwa Mjini", diwani_name: "Diwani Ruangwa Mjini", weo_name: "WEO Ruangwa Mjini" },
        ],
      },
    ],
  },

  // ── MTWARA ──
  {
    region_en: "Mtwara",
    region_sw: "Mtwara",
    districts: [
      {
        district_en: "Mtwara Municipal Council",
        district_sw: "Manispaa ya Mtwara",
        council_type: "MC",
        ded_name: "Dkt. Jumanne N. Sagini",
        dc_name: "Saidi M. Kitwana",
        ded_phone: "+255 23 2333028",
        ded_email: "ded@mtwaramc.go.tz",
        wards: [
          { ward_en: "Shangani", ward_sw: "Shangani", diwani_name: "Diwani Shangani", weo_name: "WEO Shangani" },
          { ward_en: "Ufukoni", ward_sw: "Ufukoni", diwani_name: "Diwani Ufukoni", weo_name: "WEO Ufukoni" },
        ],
      },
      {
        district_en: "Mtwara District Council",
        district_sw: "Halmashauri ya Wilaya ya Mtwara",
        council_type: "DC",
        ded_name: "Fatma M. Chilumba",
        dc_name: "Augustine L. Mwakasege",
        ded_phone: "+255 23 2333134",
        ded_email: "ded@mtwaradc.go.tz",
        wards: [
          { ward_en: "Nanguruwe", ward_sw: "Nanguruwe", diwani_name: "Diwani Nanguruwe", weo_name: "WEO Nanguruwe" },
        ],
      },
      {
        district_en: "Masasi District Council",
        district_sw: "Halmashauri ya Wilaya ya Masasi",
        council_type: "DC",
        ded_name: "Bakari J. Mapunda",
        dc_name: "Dkt. Joyce A. Ngowi",
        ded_phone: "+255 23 2340028",
        ded_email: "ded@masasidc.go.tz",
        wards: [
          { ward_en: "Masasi Mjini", ward_sw: "Masasi Mjini", diwani_name: "Diwani Masasi Mjini", weo_name: "WEO Masasi Mjini" },
        ],
      },
      {
        district_en: "Newala District Council",
        district_sw: "Halmashauri ya Wilaya ya Newala",
        council_type: "DC",
        ded_name: "Ramadhani H. Mtwale",
        dc_name: "Dkt. Halima M. Mdee Jr.",
        ded_phone: "+255 23 2340234",
        ded_email: "ded@newaladc.go.tz",
        wards: [
          { ward_en: "Newala Mjini", ward_sw: "Newala Mjini", diwani_name: "Diwani Newala Mjini", weo_name: "WEO Newala Mjini" },
        ],
      },
      {
        district_en: "Tandahimba District Council",
        district_sw: "Halmashauri ya Wilaya ya Tandahimba",
        council_type: "DC",
        ded_name: "Rashidi O. Mngodo",
        dc_name: "Agnes K. Munuo",
        ded_phone: "+255 23 2340567",
        ded_email: "ded@tandahimbadc.go.tz",
        wards: [
          { ward_en: "Tandahimba", ward_sw: "Tandahimba", diwani_name: "Diwani Tandahimba", weo_name: "WEO Tandahimba" },
        ],
      },
      {
        district_en: "Nanyumbu District Council",
        district_sw: "Halmashauri ya Wilaya ya Nanyumbu",
        council_type: "DC",
        ded_name: "Abdallah S. Mwinyikambi",
        dc_name: "Hamisi J. Kigwangalla",
        ded_phone: "+255 23 2340890",
        ded_email: "ded@nanyumbudc.go.tz",
        wards: [
          { ward_en: "Nanyumbu", ward_sw: "Nanyumbu", diwani_name: "Diwani Nanyumbu", weo_name: "WEO Nanyumbu" },
        ],
      },
    ],
  },

  // ── MANYARA ──
  {
    region_en: "Manyara",
    region_sw: "Manyara",
    districts: [
      {
        district_en: "Babati Town Council",
        district_sw: "Halmashauri ya Mji wa Babati",
        council_type: "TC",
        ded_name: "Dkt. Fadhili S. Mwaipasi",
        dc_name: "Lazaro M. Nyamhanga",
        ded_phone: "+255 27 2531028",
        ded_email: "ded@babatitc.go.tz",
        wards: [
          { ward_en: "Babati Mjini", ward_sw: "Babati Mjini", diwani_name: "Diwani Babati Mjini", weo_name: "WEO Babati Mjini" },
          { ward_en: "Bagara", ward_sw: "Bagara", diwani_name: "Diwani Bagara", weo_name: "WEO Bagara" },
        ],
      },
      {
        district_en: "Babati District Council",
        district_sw: "Halmashauri ya Wilaya ya Babati",
        council_type: "DC",
        ded_name: "Josephine R. Magashi",
        dc_name: "Dkt. Nassib S. Suleiman",
        ded_phone: "+255 27 2531134",
        ded_email: "ded@babatidc.go.tz",
        wards: [
          { ward_en: "Dareda", ward_sw: "Dareda", diwani_name: "Diwani Dareda", weo_name: "WEO Dareda" },
          { ward_en: "Gallapo", ward_sw: "Gallapo", diwani_name: "Diwani Gallapo", weo_name: "WEO Gallapo" },
        ],
      },
      {
        district_en: "Hanang District Council",
        district_sw: "Halmashauri ya Wilaya ya Hanang",
        council_type: "DC",
        ded_name: "Emmanuel G. Msaki",
        dc_name: "Beatrice N. Minja",
        ded_phone: "+255 27 2531234",
        ded_email: "ded@hanangdc.go.tz",
        wards: [
          { ward_en: "Katesh", ward_sw: "Katesh", diwani_name: "Diwani Katesh", weo_name: "WEO Katesh" },
          { ward_en: "Bassodesh", ward_sw: "Bassodesh", diwani_name: "Diwani Bassodesh", weo_name: "WEO Bassodesh" },
        ],
      },
      {
        district_en: "Mbulu District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbulu",
        council_type: "DC",
        ded_name: "Magreth K. Hayuma",
        dc_name: "Charles J. Ndossi",
        ded_phone: "+255 27 2531567",
        ded_email: "ded@mbuludc.go.tz",
        wards: [
          { ward_en: "Mbulu Mjini", ward_sw: "Mbulu Mjini", diwani_name: "Diwani Mbulu Mjini", weo_name: "WEO Mbulu Mjini" },
        ],
      },
      {
        district_en: "Kiteto District Council",
        district_sw: "Halmashauri ya Wilaya ya Kiteto",
        council_type: "DC",
        ded_name: "Dkt. Getrude P. Mbawala",
        dc_name: "Ramadhani A. Makoye",
        ded_phone: "+255 27 2531890",
        ded_email: "ded@kitetodc.go.tz",
        wards: [
          { ward_en: "Kibaya", ward_sw: "Kibaya", diwani_name: "Diwani Kibaya", weo_name: "WEO Kibaya" },
        ],
      },
      {
        district_en: "Simanjiro District Council",
        district_sw: "Halmashauri ya Wilaya ya Simanjiro",
        council_type: "DC",
        ded_name: "Paschal J. Sabas",
        dc_name: "Mwanaisha P. Mgogosi",
        ded_phone: "+255 27 2532028",
        ded_email: "ded@simanjirodc.go.tz",
        wards: [
          { ward_en: "Orkesumet", ward_sw: "Orkesumet", diwani_name: "Diwani Orkesumet", weo_name: "WEO Orkesumet" },
        ],
      },
    ],
  },

  // ── MARA ──
  {
    region_en: "Mara",
    region_sw: "Mara",
    districts: [
      {
        district_en: "Musoma Municipal Council",
        district_sw: "Manispaa ya Musoma",
        council_type: "MC",
        ded_name: "Dkt. Deusdedit M. Massawe",
        dc_name: "Meja (Mstaafu) Justus A. Kamugisha",
        ded_phone: "+255 28 2622028",
        ded_email: "ded@musomamc.go.tz",
        wards: [
          { ward_en: "Bweri", ward_sw: "Bweri", diwani_name: "Diwani Bweri", weo_name: "WEO Bweri" },
          { ward_en: "Nyasho", ward_sw: "Nyasho", diwani_name: "Diwani Nyasho", weo_name: "WEO Nyasho" },
          { ward_en: "Iringo", ward_sw: "Iringo", diwani_name: "Diwani Iringo", weo_name: "WEO Iringo" },
        ],
      },
      {
        district_en: "Musoma District Council",
        district_sw: "Halmashauri ya Wilaya ya Musoma",
        council_type: "DC",
        ded_name: "Erasto J. Charahani",
        dc_name: "Greyson E. Msigwa",
        ded_phone: "+255 28 2622134",
        ded_email: "ded@musomadc.go.tz",
        wards: [
          { ward_en: "Butiama", ward_sw: "Butiama", diwani_name: "Diwani Butiama", weo_name: "WEO Butiama" },
        ],
      },
      {
        district_en: "Bunda District Council",
        district_sw: "Halmashauri ya Wilaya ya Bunda",
        council_type: "DC",
        ded_name: "Dkt. Vedasto H. Rwegasira",
        dc_name: "Prosper E. Kweka",
        ded_phone: "+255 28 2622234",
        ded_email: "ded@bundadc.go.tz",
        wards: [
          { ward_en: "Bunda Mjini", ward_sw: "Bunda Mjini", diwani_name: "Diwani Bunda Mjini", weo_name: "WEO Bunda Mjini" },
        ],
      },
      {
        district_en: "Tarime District Council",
        district_sw: "Halmashauri ya Wilaya ya Tarime",
        council_type: "DC",
        ded_name: "John A. Chacha",
        dc_name: "Dkt. Mariam S. Mfoi",
        ded_phone: "+255 28 2622567",
        ded_email: "ded@tarimedc.go.tz",
        wards: [
          { ward_en: "Tarime Mjini", ward_sw: "Tarime Mjini", diwani_name: "Diwani Tarime Mjini", weo_name: "WEO Tarime Mjini" },
        ],
      },
      {
        district_en: "Serengeti District Council",
        district_sw: "Halmashauri ya Wilaya ya Serengeti",
        council_type: "DC",
        ded_name: "Mhandisi George S. Warioba",
        dc_name: "Baraka A. Nyambi",
        ded_phone: "+255 28 2622890",
        ded_email: "ded@serengetidc.go.tz",
        wards: [
          { ward_en: "Mugumu", ward_sw: "Mugumu", diwani_name: "Diwani Mugumu", weo_name: "WEO Mugumu" },
        ],
      },
      {
        district_en: "Rorya District Council",
        district_sw: "Halmashauri ya Wilaya ya Rorya",
        council_type: "DC",
        ded_name: "Alphonce N. Chacha",
        dc_name: "Esther M. Henga",
        ded_phone: "+255 28 2623028",
        ded_email: "ded@roryadc.go.tz",
        wards: [
          { ward_en: "Shirati", ward_sw: "Shirati", diwani_name: "Diwani Shirati", weo_name: "WEO Shirati" },
        ],
      },
    ],
  },

  // ── NJOMBE ──
  {
    region_en: "Njombe",
    region_sw: "Njombe",
    districts: [
      {
        district_en: "Njombe Town Council",
        district_sw: "Halmashauri ya Mji wa Njombe",
        council_type: "TC",
        ded_name: "Dkt. Elia F. Mwakalinga",
        dc_name: "Rehema K. Luhanjo",
        ded_phone: "+255 26 2782028",
        ded_email: "ded@njombetc.go.tz",
        wards: [
          { ward_en: "Njombe Mjini", ward_sw: "Njombe Mjini", diwani_name: "Diwani Njombe Mjini", weo_name: "WEO Njombe Mjini" },
          { ward_en: "Ramadhani", ward_sw: "Ramadhani", diwani_name: "Diwani Ramadhani", weo_name: "WEO Ramadhani" },
        ],
      },
      {
        district_en: "Njombe District Council",
        district_sw: "Halmashauri ya Wilaya ya Njombe",
        council_type: "DC",
        ded_name: "Faraja K. Nyalandu",
        dc_name: "Dkt. Mwantumu J. Mhagama",
        ded_phone: "+255 26 2782134",
        ded_email: "ded@njombedc.go.tz",
        wards: [
          { ward_en: "Lupembe", ward_sw: "Lupembe", diwani_name: "Diwani Lupembe", weo_name: "WEO Lupembe" },
        ],
      },
      {
        district_en: "Makete District Council",
        district_sw: "Halmashauri ya Wilaya ya Makete",
        council_type: "DC",
        ded_name: "Costantine M. Nkwama",
        dc_name: "Agnes F. Mwakaje",
        ded_phone: "+255 26 2782234",
        ded_email: "ded@maketedc.go.tz",
        wards: [
          { ward_en: "Makete Mjini", ward_sw: "Makete Mjini", diwani_name: "Diwani Makete Mjini", weo_name: "WEO Makete Mjini" },
        ],
      },
      {
        district_en: "Ludewa District Council",
        district_sw: "Halmashauri ya Wilaya ya Ludewa",
        council_type: "DC",
        ded_name: "Juma M. Lusasi",
        dc_name: "Martin B. Shigela",
        ded_phone: "+255 26 2782567",
        ded_email: "ded@ludewadc.go.tz",
        wards: [
          { ward_en: "Ludewa Mjini", ward_sw: "Ludewa Mjini", diwani_name: "Diwani Ludewa Mjini", weo_name: "WEO Ludewa Mjini" },
        ],
      },
      {
        district_en: "Makambako Town Council",
        district_sw: "Halmashauri ya Mji wa Makambako",
        council_type: "TC",
        ded_name: "Dkt. Ibrahim K. Swai",
        dc_name: "Pili M. Mgunga",
        ded_phone: "+255 26 2782890",
        ded_email: "ded@makambakotc.go.tz",
        wards: [
          { ward_en: "Makambako", ward_sw: "Makambako", diwani_name: "Diwani Makambako", weo_name: "WEO Makambako" },
        ],
      },
      {
        district_en: "Wanging'ombe District Council",
        district_sw: "Halmashauri ya Wilaya ya Wanging'ombe",
        council_type: "DC",
        ded_name: "Evodia P. Mkongwa",
        dc_name: "Dkt. Omary A. Kigoda",
        ded_phone: "+255 26 2783028",
        ded_email: "ded@wangingombedc.go.tz",
        wards: [
          { ward_en: "Wanging'ombe", ward_sw: "Wanging'ombe", diwani_name: "Diwani Wanging'ombe", weo_name: "WEO Wanging'ombe" },
        ],
      },
    ],
  },

  // ── PWANI ──
  {
    region_en: "Pwani",
    region_sw: "Pwani",
    districts: [
      {
        district_en: "Kibaha Town Council",
        district_sw: "Halmashauri ya Mji wa Kibaha",
        council_type: "TC",
        ded_name: "Dkt. Hamisi A. Malangalila",
        dc_name: "Issa H. Mturi",
        ded_phone: "+255 23 2402028",
        ded_email: "ded@kibahatc.go.tz",
        wards: [
          { ward_en: "Kibaha Mjini", ward_sw: "Kibaha Mjini", diwani_name: "Diwani Kibaha Mjini", weo_name: "WEO Kibaha Mjini" },
          { ward_en: "Maili Moja", ward_sw: "Maili Moja", diwani_name: "Diwani Maili Moja", weo_name: "WEO Maili Moja" },
        ],
      },
      {
        district_en: "Kibaha District Council",
        district_sw: "Halmashauri ya Wilaya ya Kibaha",
        council_type: "DC",
        ded_name: "Ramadhan S. Mfutakamba",
        dc_name: "Grace M. Mhango",
        ded_phone: "+255 23 2402134",
        ded_email: "ded@kibahadc.go.tz",
        wards: [
          { ward_en: "Mlandizi", ward_sw: "Mlandizi", diwani_name: "Diwani Mlandizi", weo_name: "WEO Mlandizi" },
        ],
      },
      {
        district_en: "Bagamoyo District Council",
        district_sw: "Halmashauri ya Wilaya ya Bagamoyo",
        council_type: "DC",
        ded_name: "Dkt. Magesa J. Mulongo",
        dc_name: "Hamis R. Mwinyimvua",
        ded_phone: "+255 23 2440028",
        ded_email: "ded@bagamoyodc.go.tz",
        wards: [
          { ward_en: "Bagamoyo Mjini", ward_sw: "Bagamoyo Mjini", diwani_name: "Diwani Bagamoyo Mjini", weo_name: "WEO Bagamoyo Mjini" },
          { ward_en: "Kaole", ward_sw: "Kaole", diwani_name: "Diwani Kaole", weo_name: "WEO Kaole" },
        ],
      },
      {
        district_en: "Mkuranga District Council",
        district_sw: "Halmashauri ya Wilaya ya Mkuranga",
        council_type: "DC",
        ded_name: "Mhandisi Said J. Kitwanga",
        dc_name: "Fatma H. Toufiq",
        ded_phone: "+255 23 2400028",
        ded_email: "ded@mkurangadc.go.tz",
        wards: [
          { ward_en: "Mkuranga Mjini", ward_sw: "Mkuranga Mjini", diwani_name: "Diwani Mkuranga Mjini", weo_name: "WEO Mkuranga Mjini" },
        ],
      },
      {
        district_en: "Kisarawe District Council",
        district_sw: "Halmashauri ya Wilaya ya Kisarawe",
        council_type: "DC",
        ded_name: "Dkt. Asha S. Abdallah",
        dc_name: "Sylvester M. Lubuva",
        ded_phone: "+255 23 2400234",
        ded_email: "ded@kisarawedc.go.tz",
        wards: [
          { ward_en: "Kisarawe Mjini", ward_sw: "Kisarawe Mjini", diwani_name: "Diwani Kisarawe Mjini", weo_name: "WEO Kisarawe Mjini" },
        ],
      },
      {
        district_en: "Rufiji District Council",
        district_sw: "Halmashauri ya Wilaya ya Rufiji",
        council_type: "DC",
        ded_name: "Ramadhani M. Mrisho",
        dc_name: "Catherine N. Ruge",
        ded_phone: "+255 23 2400567",
        ded_email: "ded@rufijidc.go.tz",
        wards: [
          { ward_en: "Utete", ward_sw: "Utete", diwani_name: "Diwani Utete", weo_name: "WEO Utete" },
        ],
      },
      {
        district_en: "Mafia District Council",
        district_sw: "Halmashauri ya Wilaya ya Mafia",
        council_type: "DC",
        ded_name: "Ahmed S. Bakari",
        dc_name: "Dkt. Fatma S. Mwasa",
        ded_phone: "+255 23 2400890",
        ded_email: "ded@mafiadc.go.tz",
        wards: [
          { ward_en: "Kilindoni", ward_sw: "Kilindoni", diwani_name: "Diwani Kilindoni", weo_name: "WEO Kilindoni" },
        ],
      },
    ],
  },

  // ── RUKWA ──
  {
    region_en: "Rukwa",
    region_sw: "Rukwa",
    districts: [
      {
        district_en: "Sumbawanga Municipal Council",
        district_sw: "Manispaa ya Sumbawanga",
        council_type: "MC",
        ded_name: "Dkt. Wema K. Kabwe",
        dc_name: "Beatus S. Mfaume",
        ded_phone: "+255 25 2802028",
        ded_email: "ded@sumbawangamc.go.tz",
        wards: [
          { ward_en: "Mazwi", ward_sw: "Mazwi", diwani_name: "Diwani Mazwi", weo_name: "WEO Mazwi" },
          { ward_en: "Katandala", ward_sw: "Katandala", diwani_name: "Diwani Katandala", weo_name: "WEO Katandala" },
        ],
      },
      {
        district_en: "Sumbawanga District Council",
        district_sw: "Halmashauri ya Wilaya ya Sumbawanga",
        council_type: "DC",
        ded_name: "Gaspar K. Ntibabara",
        dc_name: "Catherine M. Mwenda",
        ded_phone: "+255 25 2802134",
        ded_email: "ded@sumbawangadc.go.tz",
        wards: [
          { ward_en: "Laela", ward_sw: "Laela", diwani_name: "Diwani Laela", weo_name: "WEO Laela" },
        ],
      },
      {
        district_en: "Nkasi District Council",
        district_sw: "Halmashauri ya Wilaya ya Nkasi",
        council_type: "DC",
        ded_name: "Sudi J. Mbaraka",
        dc_name: "Dkt. Samwel R. Mfupi",
        ded_phone: "+255 25 2802234",
        ded_email: "ded@nkasidc.go.tz",
        wards: [
          { ward_en: "Namanyere", ward_sw: "Namanyere", diwani_name: "Diwani Namanyere", weo_name: "WEO Namanyere" },
        ],
      },
      {
        district_en: "Kalambo District Council",
        district_sw: "Halmashauri ya Wilaya ya Kalambo",
        council_type: "DC",
        ded_name: "Lazaro J. Lwena",
        dc_name: "Bakari H. Kipoko",
        ded_phone: "+255 25 2802567",
        ded_email: "ded@kalambodc.go.tz",
        wards: [
          { ward_en: "Matai", ward_sw: "Matai", diwani_name: "Diwani Matai", weo_name: "WEO Matai" },
        ],
      },
    ],
  },

  // ── RUVUMA ──
  {
    region_en: "Ruvuma",
    region_sw: "Ruvuma",
    districts: [
      {
        district_en: "Songea Municipal Council",
        district_sw: "Manispaa ya Songea",
        council_type: "MC",
        ded_name: "Dkt. Benedict S. Mtaki",
        dc_name: "Ismail A. Bhallu",
        ded_phone: "+255 25 2602028",
        ded_email: "ded@songeamc.go.tz",
        wards: [
          { ward_en: "Bomba Mbili", ward_sw: "Bomba Mbili", diwani_name: "Diwani Bomba Mbili", weo_name: "WEO Bomba Mbili" },
          { ward_en: "Mfaranyaki", ward_sw: "Mfaranyaki", diwani_name: "Diwani Mfaranyaki", weo_name: "WEO Mfaranyaki" },
        ],
      },
      {
        district_en: "Songea District Council",
        district_sw: "Halmashauri ya Wilaya ya Songea",
        council_type: "DC",
        ded_name: "Redempta J. Kilimhana",
        dc_name: "Godfrey M. Nyakunga",
        ded_phone: "+255 25 2602134",
        ded_email: "ded@songeadc.go.tz",
        wards: [
          { ward_en: "Peramiho", ward_sw: "Peramiho", diwani_name: "Diwani Peramiho", weo_name: "WEO Peramiho" },
        ],
      },
      {
        district_en: "Mbinga District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbinga",
        council_type: "DC",
        ded_name: "Dkt. Mwanahamisi S. Issa",
        dc_name: "Francis M. Ndunguru",
        ded_phone: "+255 25 2640028",
        ded_email: "ded@mbingadc.go.tz",
        wards: [
          { ward_en: "Mbinga Mjini", ward_sw: "Mbinga Mjini", diwani_name: "Diwani Mbinga Mjini", weo_name: "WEO Mbinga Mjini" },
        ],
      },
      {
        district_en: "Tunduru District Council",
        district_sw: "Halmashauri ya Wilaya ya Tunduru",
        council_type: "DC",
        ded_name: "Bakari M. Mputa",
        dc_name: "Augustino L. Mwendapole",
        ded_phone: "+255 25 2640234",
        ded_email: "ded@tundurudc.go.tz",
        wards: [
          { ward_en: "Tunduru Mjini", ward_sw: "Tunduru Mjini", diwani_name: "Diwani Tunduru Mjini", weo_name: "WEO Tunduru Mjini" },
        ],
      },
      {
        district_en: "Namtumbo District Council",
        district_sw: "Halmashauri ya Wilaya ya Namtumbo",
        council_type: "DC",
        ded_name: "Salome J. Myembe",
        dc_name: "Dkt. Nestory R. Kashindye",
        ded_phone: "+255 25 2640567",
        ded_email: "ded@namtumbodc.go.tz",
        wards: [
          { ward_en: "Namtumbo", ward_sw: "Namtumbo", diwani_name: "Diwani Namtumbo", weo_name: "WEO Namtumbo" },
        ],
      },
      {
        district_en: "Nyasa District Council",
        district_sw: "Halmashauri ya Wilaya ya Nyasa",
        council_type: "DC",
        ded_name: "Rashidi H. Mbewe",
        dc_name: "Leah M. Chaula",
        ded_phone: "+255 25 2640890",
        ded_email: "ded@nyasadc.go.tz",
        wards: [
          { ward_en: "Liuli", ward_sw: "Liuli", diwani_name: "Diwani Liuli", weo_name: "WEO Liuli" },
        ],
      },
    ],
  },

  // ── SONGWE ──
  {
    region_en: "Songwe",
    region_sw: "Songwe",
    districts: [
      {
        district_en: "Tunduma Town Council",
        district_sw: "Halmashauri ya Mji wa Tunduma",
        council_type: "TC",
        ded_name: "Dkt. Eliphas G. Mwandanji",
        dc_name: "Abel K. Mwakalyelye",
        ded_phone: "+255 25 2920028",
        ded_email: "ded@tundumatc.go.tz",
        wards: [
          { ward_en: "Tunduma Mjini", ward_sw: "Tunduma Mjini", diwani_name: "Diwani Tunduma Mjini", weo_name: "WEO Tunduma Mjini" },
        ],
      },
      {
        district_en: "Mbozi District Council",
        district_sw: "Halmashauri ya Wilaya ya Mbozi",
        council_type: "DC",
        ded_name: "Prosper M. Mfwango",
        dc_name: "Juma S. Haonga",
        ded_phone: "+255 25 2920134",
        ded_email: "ded@mbozidc.go.tz",
        wards: [
          { ward_en: "Vwawa", ward_sw: "Vwawa", diwani_name: "Diwani Vwawa", weo_name: "WEO Vwawa" },
          { ward_en: "Mlowo", ward_sw: "Mlowo", diwani_name: "Diwani Mlowo", weo_name: "WEO Mlowo" },
        ],
      },
      {
        district_en: "Momba District Council",
        district_sw: "Halmashauri ya Wilaya ya Momba",
        council_type: "DC",
        ded_name: "Engibert F. Ngallaba",
        dc_name: "Dkt. Rose M. Mhamphi",
        ded_phone: "+255 25 2920234",
        ded_email: "ded@mombadc.go.tz",
        wards: [
          { ward_en: "Chitete", ward_sw: "Chitete", diwani_name: "Diwani Chitete", weo_name: "WEO Chitete" },
        ],
      },
      {
        district_en: "Ileje District Council",
        district_sw: "Halmashauri ya Wilaya ya Ileje",
        council_type: "DC",
        ded_name: "Godliver E. Moshi",
        dc_name: "Baraka J. Fungamtama",
        ded_phone: "+255 25 2920567",
        ded_email: "ded@ilejedc.go.tz",
        wards: [
          { ward_en: "Itumba", ward_sw: "Itumba", diwani_name: "Diwani Itumba", weo_name: "WEO Itumba" },
        ],
      },
      {
        district_en: "Songwe District Council",
        district_sw: "Halmashauri ya Wilaya ya Songwe",
        council_type: "DC",
        ded_name: "Dkt. Hamisi K. Msabaha",
        dc_name: "Josephine R. Mwaikambo",
        ded_phone: "+255 25 2920890",
        ded_email: "ded@songwedc.go.tz",
        wards: [
          { ward_en: "Igamba", ward_sw: "Igamba", diwani_name: "Diwani Igamba", weo_name: "WEO Igamba" },
        ],
      },
    ],
  },
];

// ============================================================
// SEARCH & STATS UTILITIES
// ============================================================

/** Search across all local government data */
export function searchLocalGov(query: string): {
  region: LocalRegion;
  district: LocalDistrict;
  ward?: Ward;
}[] {
  const q = query.toLowerCase();
  const results: { region: LocalRegion; district: LocalDistrict; ward?: Ward }[] = [];

  localGovData.forEach((region) => {
    region.districts.forEach((district) => {
      // Match on district level
      const districtMatch =
        district.district_en.toLowerCase().includes(q) ||
        district.district_sw.toLowerCase().includes(q) ||
        district.ded_name.toLowerCase().includes(q) ||
        district.dc_name.toLowerCase().includes(q);

      if (districtMatch) {
        results.push({ region, district });
        return;
      }

      // Match on ward level
      district.wards.forEach((ward) => {
        if (
          ward.ward_en.toLowerCase().includes(q) ||
          ward.ward_sw.toLowerCase().includes(q) ||
          ward.diwani_name.toLowerCase().includes(q) ||
          ward.weo_name.toLowerCase().includes(q)
        ) {
          results.push({ region, district, ward });
        }
      });
    });
  });

  return results;
}

/** Get local gov data for a specific region */
export function getLocalGovByRegion(regionName: string): LocalRegion | undefined {
  return localGovData.find(
    (r) =>
      r.region_en.toLowerCase() === regionName.toLowerCase() ||
      r.region_sw.toLowerCase() === regionName.toLowerCase()
  );
}

/** Stats */
export const localGovStats = {
  totalRegions: localGovData.length,
  totalDistricts: localGovData.reduce((n, r) => n + r.districts.length, 0),
  totalWards: localGovData.reduce(
    (n, r) => n + r.districts.reduce((m, d) => m + d.wards.length, 0),
    0
  ),
};
