/**
 * Tanzania Local Government Directory — Bilingual (EN/SW)
 * Hierarchical: Mkoa (Region) → Wilaya (District) → Kata (Ward)
 * Source: TAMISEMI, tamisemi.go.tz, Regional Portals — 2026
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
        ded_name: "DED Ilala",
        dc_name: "DC Ilala",
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
        ded_name: "DED Kinondoni",
        dc_name: "DC Kinondoni",
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
        ded_name: "DED Temeke",
        dc_name: "DC Temeke",
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
        dc_name: "DC Ubungo",
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
        ded_name: "DED Kigamboni",
        dc_name: "DC Kigamboni",
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
        ded_name: "DED Dodoma City",
        dc_name: "DC Dodoma City",
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
        ded_name: "DED Chamwino",
        dc_name: "DC Chamwino",
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
        ded_name: "DED Kondoa",
        dc_name: "DC Kondoa",
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
        ded_name: "DED Kongwa",
        dc_name: "DC Kongwa",
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
        ded_name: "DED Mpwapwa",
        dc_name: "DC Mpwapwa",
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
        ded_name: "DED Bahi",
        dc_name: "DC Bahi",
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
        ded_name: "DED Chemba",
        dc_name: "DC Chemba",
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
        ded_name: "DED Arusha City",
        dc_name: "DC Arusha City",
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
        ded_name: "DED Arusha DC",
        dc_name: "DC Arusha DC",
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
        ded_name: "DED Karatu",
        dc_name: "DC Karatu",
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
        ded_name: "DED Longido",
        dc_name: "DC Longido",
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
        ded_name: "DED Meru",
        dc_name: "DC Meru",
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
        ded_name: "DED Monduli",
        dc_name: "DC Monduli",
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
        ded_name: "DED Ngorongoro",
        dc_name: "DC Ngorongoro",
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
        ded_name: "DED Nyamagana",
        dc_name: "DC Nyamagana",
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
        ded_name: "DED Ilemela",
        dc_name: "DC Ilemela",
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
        ded_name: "DED Sengerema",
        dc_name: "DC Sengerema",
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
        ded_name: "DED Kwimba",
        dc_name: "DC Kwimba",
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
        ded_name: "DED Magu",
        dc_name: "DC Magu",
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
        ded_name: "DED Misungwi",
        dc_name: "DC Misungwi",
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
        ded_name: "DED Ukerewe",
        dc_name: "DC Ukerewe",
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
        ded_name: "DED Moshi MC",
        dc_name: "DC Moshi MC",
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
        ded_name: "DED Moshi DC",
        dc_name: "DC Moshi DC",
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
        ded_name: "DED Hai",
        dc_name: "DC Hai",
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
        ded_name: "DED Rombo",
        dc_name: "DC Rombo",
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
        ded_name: "DED Same",
        dc_name: "DC Same",
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
        ded_name: "DED Mwanga",
        dc_name: "DC Mwanga",
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
        ded_name: "DED Siha",
        dc_name: "DC Siha",
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
        ded_name: "DED Mbeya City",
        dc_name: "DC Mbeya City",
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
        ded_name: "DED Mbeya DC",
        dc_name: "DC Mbeya DC",
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
        ded_name: "DED Chunya",
        dc_name: "DC Chunya",
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
        ded_name: "DED Rungwe",
        dc_name: "DC Rungwe",
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
        ded_name: "DED Mbarali",
        dc_name: "DC Mbarali",
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
        ded_name: "DED Busokelo",
        dc_name: "DC Busokelo",
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
        ded_name: "DED Tanga City",
        dc_name: "DC Tanga City",
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
        ded_name: "DED Lushoto",
        dc_name: "DC Lushoto",
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
        ded_name: "DED Muheza",
        dc_name: "DC Muheza",
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
        ded_name: "DED Korogwe DC",
        dc_name: "DC Korogwe DC",
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
        ded_name: "DED Pangani",
        dc_name: "DC Pangani",
        ded_phone: "+255 27 2630028",
        ded_email: "ded@panganidc.go.tz",
        wards: [
          { ward_en: "Pangani Mjini", ward_sw: "Pangani Mjini", diwani_name: "Diwani Pangani Mjini", weo_name: "WEO Pangani Mjini" },
          { ward_en: "Bweni", ward_sw: "Bweni", diwani_name: "Diwani Bweni", weo_name: "WEO Bweni" },
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
        ded_name: "DED Morogoro MC",
        dc_name: "DC Morogoro MC",
        ded_phone: "+255 23 2613041",
        ded_email: "ded@morogoromc.go.tz",
        wards: [
          { ward_en: "Kingo", ward_sw: "Kingo", diwani_name: "Diwani Kingo", weo_name: "WEO Kingo" },
          { ward_en: "Mji Mkuu", ward_sw: "Mji Mkuu", diwani_name: "Diwani Mji Mkuu", weo_name: "WEO Mji Mkuu" },
          { ward_en: "Sabasaba", ward_sw: "Sabasaba", diwani_name: "Diwani Sabasaba", weo_name: "WEO Sabasaba" },
          { ward_en: "Mazimbu", ward_sw: "Mazimbu", diwani_name: "Diwani Mazimbu", weo_name: "WEO Mazimbu" },
        ],
      },
      {
        district_en: "Kilosa District Council",
        district_sw: "Halmashauri ya Wilaya ya Kilosa",
        council_type: "DC",
        ded_name: "DED Kilosa",
        dc_name: "DC Kilosa",
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
        ded_name: "DED Kilombero",
        dc_name: "DC Kilombero",
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
        ded_name: "DED Iringa MC",
        dc_name: "DC Iringa MC",
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
        ded_name: "DED Iringa DC",
        dc_name: "DC Iringa DC",
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
        ded_name: "DED Kilolo",
        dc_name: "DC Kilolo",
        ded_phone: "+255 26 2703028",
        ded_email: "ded@kilolodc.go.tz",
        wards: [
          { ward_en: "Kilolo", ward_sw: "Kilolo", diwani_name: "Diwani Kilolo", weo_name: "WEO Kilolo" },
          { ward_en: "Uhambingeto", ward_sw: "Uhambingeto", diwani_name: "Diwani Uhambingeto", weo_name: "WEO Uhambingeto" },
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
