/**
 * Tanzania Fire and Rescue Force (FRF) Directory
 * Ministry of Home Affairs — Jeshi la Zimamoto na Uokoaji
 * Organized by Region → District stations
 */

export interface FireStation {
  id: string;
  name: string;
  region: string;
  district: string;
  hotline: string;       // National 114
  directLine: string;    // Station-specific number
  rfoName: string;       // Regional Fire Officer (placeholder or known)
  email: string;
}

export interface FireRegion {
  region: string;
  rfoTitle: string;
  stations: FireStation[];
}

const fireRegions: FireRegion[] = [
  {
    region: "Dar es Salaam", rfoTitle: "Regional Fire Officer — Dar es Salaam",
    stations: [
      { id: "fire-dsm-central", name: "Dar es Salaam Central Fire Station (HQ)", region: "Dar es Salaam", district: "Ilala", hotline: "114", directLine: "+255-22-211-7152", rfoName: "RFO Dar es Salaam", email: "dsm@zimamoto.go.tz" },
      { id: "fire-dsm-kinondoni", name: "Kinondoni Fire Station", region: "Dar es Salaam", district: "Kinondoni", hotline: "114", directLine: "", rfoName: "", email: "kinondoni@zimamoto.go.tz" },
      { id: "fire-dsm-temeke", name: "Temeke Fire Station", region: "Dar es Salaam", district: "Temeke", hotline: "114", directLine: "", rfoName: "", email: "temeke@zimamoto.go.tz" },
      { id: "fire-dsm-ubungo", name: "Ubungo Fire Station", region: "Dar es Salaam", district: "Ubungo", hotline: "114", directLine: "", rfoName: "", email: "ubungo@zimamoto.go.tz" },
      { id: "fire-dsm-kigamboni", name: "Kigamboni Fire Station", region: "Dar es Salaam", district: "Kigamboni", hotline: "114", directLine: "", rfoName: "", email: "kigamboni@zimamoto.go.tz" },
    ],
  },
  {
    region: "Dodoma", rfoTitle: "Regional Fire Officer — Dodoma",
    stations: [
      { id: "fire-dodoma-central", name: "Dodoma Central Fire Station", region: "Dodoma", district: "Dodoma City", hotline: "114", directLine: "+255-26-232-1114", rfoName: "RFO Dodoma", email: "dodoma@zimamoto.go.tz" },
      { id: "fire-dodoma-kondoa", name: "Kondoa Fire Station", region: "Dodoma", district: "Kondoa", hotline: "114", directLine: "", rfoName: "", email: "kondoa@zimamoto.go.tz" },
    ],
  },
  {
    region: "Arusha", rfoTitle: "Regional Fire Officer — Arusha",
    stations: [
      { id: "fire-arusha-central", name: "Arusha Central Fire Station", region: "Arusha", district: "Arusha City", hotline: "114", directLine: "+255-27-250-3114", rfoName: "RFO Arusha", email: "arusha@zimamoto.go.tz" },
    ],
  },
  {
    region: "Mwanza", rfoTitle: "Regional Fire Officer — Mwanza",
    stations: [
      { id: "fire-mwanza-central", name: "Mwanza Central Fire Station", region: "Mwanza", district: "Nyamagana", hotline: "114", directLine: "+255-28-250-0114", rfoName: "RFO Mwanza", email: "mwanza@zimamoto.go.tz" },
      { id: "fire-mwanza-ilemela", name: "Ilemela Fire Station", region: "Mwanza", district: "Ilemela", hotline: "114", directLine: "", rfoName: "", email: "ilemela@zimamoto.go.tz" },
    ],
  },
  {
    region: "Tanga", rfoTitle: "Regional Fire Officer — Tanga",
    stations: [
      { id: "fire-tanga-central", name: "Tanga Central Fire Station", region: "Tanga", district: "Tanga City", hotline: "114", directLine: "+255-27-264-4114", rfoName: "RFO Tanga", email: "tanga@zimamoto.go.tz" },
    ],
  },
  {
    region: "Kilimanjaro", rfoTitle: "Regional Fire Officer — Kilimanjaro",
    stations: [
      { id: "fire-moshi", name: "Moshi Fire Station", region: "Kilimanjaro", district: "Moshi MC", hotline: "114", directLine: "+255-27-275-1114", rfoName: "RFO Kilimanjaro", email: "moshi@zimamoto.go.tz" },
    ],
  },
  {
    region: "Mbeya", rfoTitle: "Regional Fire Officer — Mbeya",
    stations: [
      { id: "fire-mbeya-central", name: "Mbeya Central Fire Station", region: "Mbeya", district: "Mbeya City", hotline: "114", directLine: "+255-25-250-2114", rfoName: "RFO Mbeya", email: "mbeya@zimamoto.go.tz" },
    ],
  },
  {
    region: "Morogoro", rfoTitle: "Regional Fire Officer — Morogoro",
    stations: [
      { id: "fire-morogoro-central", name: "Morogoro Central Fire Station", region: "Morogoro", district: "Morogoro MC", hotline: "114", directLine: "+255-23-261-4114", rfoName: "RFO Morogoro", email: "morogoro@zimamoto.go.tz" },
    ],
  },
  {
    region: "Iringa", rfoTitle: "Regional Fire Officer — Iringa",
    stations: [
      { id: "fire-iringa-central", name: "Iringa Central Fire Station", region: "Iringa", district: "Iringa MC", hotline: "114", directLine: "", rfoName: "RFO Iringa", email: "iringa@zimamoto.go.tz" },
    ],
  },
  {
    region: "Mtwara", rfoTitle: "Regional Fire Officer — Mtwara",
    stations: [
      { id: "fire-mtwara-central", name: "Mtwara Central Fire Station", region: "Mtwara", district: "Mtwara MC", hotline: "114", directLine: "", rfoName: "RFO Mtwara", email: "mtwara@zimamoto.go.tz" },
    ],
  },
  {
    region: "Lindi", rfoTitle: "Regional Fire Officer — Lindi",
    stations: [
      { id: "fire-lindi-central", name: "Lindi Fire Station", region: "Lindi", district: "Lindi MC", hotline: "114", directLine: "", rfoName: "RFO Lindi", email: "lindi@zimamoto.go.tz" },
    ],
  },
  {
    region: "Kagera", rfoTitle: "Regional Fire Officer — Kagera",
    stations: [
      { id: "fire-bukoba", name: "Bukoba Fire Station", region: "Kagera", district: "Bukoba MC", hotline: "114", directLine: "", rfoName: "RFO Kagera", email: "bukoba@zimamoto.go.tz" },
    ],
  },
  {
    region: "Kigoma", rfoTitle: "Regional Fire Officer — Kigoma",
    stations: [
      { id: "fire-kigoma-central", name: "Kigoma Fire Station", region: "Kigoma", district: "Kigoma-Ujiji MC", hotline: "114", directLine: "", rfoName: "RFO Kigoma", email: "kigoma@zimamoto.go.tz" },
    ],
  },
  {
    region: "Tabora", rfoTitle: "Regional Fire Officer — Tabora",
    stations: [
      { id: "fire-tabora-central", name: "Tabora Fire Station", region: "Tabora", district: "Tabora MC", hotline: "114", directLine: "", rfoName: "RFO Tabora", email: "tabora@zimamoto.go.tz" },
    ],
  },
  {
    region: "Singida", rfoTitle: "Regional Fire Officer — Singida",
    stations: [
      { id: "fire-singida-central", name: "Singida Fire Station", region: "Singida", district: "Singida MC", hotline: "114", directLine: "", rfoName: "RFO Singida", email: "singida@zimamoto.go.tz" },
    ],
  },
  {
    region: "Shinyanga", rfoTitle: "Regional Fire Officer — Shinyanga",
    stations: [
      { id: "fire-shinyanga-central", name: "Shinyanga Fire Station", region: "Shinyanga", district: "Shinyanga MC", hotline: "114", directLine: "", rfoName: "RFO Shinyanga", email: "shinyanga@zimamoto.go.tz" },
    ],
  },
  {
    region: "Manyara", rfoTitle: "Regional Fire Officer — Manyara",
    stations: [
      { id: "fire-babati", name: "Babati Fire Station", region: "Manyara", district: "Babati TC", hotline: "114", directLine: "", rfoName: "RFO Manyara", email: "babati@zimamoto.go.tz" },
    ],
  },
  {
    region: "Mara", rfoTitle: "Regional Fire Officer — Mara",
    stations: [
      { id: "fire-musoma", name: "Musoma Fire Station", region: "Mara", district: "Musoma MC", hotline: "114", directLine: "", rfoName: "RFO Mara", email: "musoma@zimamoto.go.tz" },
    ],
  },
  {
    region: "Njombe", rfoTitle: "Regional Fire Officer — Njombe",
    stations: [
      { id: "fire-njombe-central", name: "Njombe Fire Station", region: "Njombe", district: "Njombe TC", hotline: "114", directLine: "", rfoName: "RFO Njombe", email: "njombe@zimamoto.go.tz" },
    ],
  },
  {
    region: "Rukwa", rfoTitle: "Regional Fire Officer — Rukwa",
    stations: [
      { id: "fire-sumbawanga", name: "Sumbawanga Fire Station", region: "Rukwa", district: "Sumbawanga MC", hotline: "114", directLine: "", rfoName: "RFO Rukwa", email: "sumbawanga@zimamoto.go.tz" },
    ],
  },
  {
    region: "Katavi", rfoTitle: "Regional Fire Officer — Katavi",
    stations: [
      { id: "fire-mpanda", name: "Mpanda Fire Station", region: "Katavi", district: "Mpanda TC", hotline: "114", directLine: "", rfoName: "RFO Katavi", email: "mpanda@zimamoto.go.tz" },
    ],
  },
  {
    region: "Ruvuma", rfoTitle: "Regional Fire Officer — Ruvuma",
    stations: [
      { id: "fire-songea", name: "Songea Fire Station", region: "Ruvuma", district: "Songea MC", hotline: "114", directLine: "", rfoName: "RFO Ruvuma", email: "songea@zimamoto.go.tz" },
    ],
  },
  {
    region: "Geita", rfoTitle: "Regional Fire Officer — Geita",
    stations: [
      { id: "fire-geita-central", name: "Geita Fire Station", region: "Geita", district: "Geita TC", hotline: "114", directLine: "", rfoName: "RFO Geita", email: "geita@zimamoto.go.tz" },
    ],
  },
  {
    region: "Simiyu", rfoTitle: "Regional Fire Officer — Simiyu",
    stations: [
      { id: "fire-bariadi", name: "Bariadi Fire Station", region: "Simiyu", district: "Bariadi TC", hotline: "114", directLine: "", rfoName: "RFO Simiyu", email: "bariadi@zimamoto.go.tz" },
    ],
  },
  {
    region: "Songwe", rfoTitle: "Regional Fire Officer — Songwe",
    stations: [
      { id: "fire-vwawa", name: "Vwawa Fire Station", region: "Songwe", district: "Songwe DC", hotline: "114", directLine: "", rfoName: "RFO Songwe", email: "vwawa@zimamoto.go.tz" },
    ],
  },
  {
    region: "Pwani", rfoTitle: "Regional Fire Officer — Pwani",
    stations: [
      { id: "fire-kibaha", name: "Kibaha Fire Station", region: "Pwani", district: "Kibaha TC", hotline: "114", directLine: "", rfoName: "RFO Pwani", email: "kibaha@zimamoto.go.tz" },
    ],
  },
  // Zanzibar
  {
    region: "Unguja Mjini Magharibi", rfoTitle: "Regional Fire Officer — Zanzibar",
    stations: [
      { id: "fire-znz-central", name: "Zanzibar Central Fire Station", region: "Unguja Mjini Magharibi", district: "Mjini", hotline: "114", directLine: "+255-24-223-1114", rfoName: "RFO Zanzibar", email: "zanzibar@zimamoto.go.tz" },
    ],
  },
];

// ════════════════════════════════════════════
// FLATTENED LIST & HELPERS
// ════════════════════════════════════════════

/** All fire stations as a flat list */
export const allFireStations: FireStation[] = fireRegions.flatMap((r) => r.stations);

/** Get fire stations by region */
export function getFireStationsByRegion(region: string): FireStation[] {
  return allFireStations.filter((s) => s.region === region);
}

/** Get fire stations by district */
export function getFireStationsByDistrict(region: string, district: string): FireStation[] {
  return allFireStations.filter((s) => s.region === region && s.district === district);
}

/** Search fire stations */
export function searchFireStations(query: string): FireStation[] {
  const q = query.toLowerCase();
  return allFireStations.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q) ||
      s.district.toLowerCase().includes(q)
  );
}

/** Get the regional fire HQ for a region */
export function getRegionalFireHQ(region: string): FireRegion | undefined {
  return fireRegions.find((r) => r.region === region);
}

export { fireRegions };

export const fireStats = {
  totalStations: allFireStations.length,
  totalRegions: fireRegions.length,
};
