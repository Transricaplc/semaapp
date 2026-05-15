// ── SEMA Location Intelligence ──
// Resolve map_category and map coordinates for any official.
// Spec §3 + §7.

export type MapCategory =
  | "national_ministry"
  | "parliament"
  | "president_office"
  | "regional_commissioner"
  | "regional_secretariat"
  | "district_commissioner"
  | "district_council"
  | "ward_executive"
  | "village_executive"
  | "hospital_national"
  | "hospital_regional"
  | "hospital_district"
  | "health_centre"
  | "police_regional"
  | "police_district"
  | "court_high"
  | "court_district"
  | "school_secondary"
  | "school_primary"
  | "immigration"
  | "revenue_authority"
  | "water_authority"
  | "electricity_tanesco"
  | "ngo_civic";

export interface MapCategoryMeta {
  labelEn: string;
  labelSw: string;
  color: string; // hex
  icon: string; // emoji
  tier: "National" | "Region" | "District" | "Ward" | "Place" | "Any";
}

export const MAP_CATEGORY_META: Record<MapCategory, MapCategoryMeta> = {
  national_ministry:     { labelEn: "Ministry / National Office", labelSw: "Wizara",            color: "#007AFF", icon: "🏛️", tier: "National" },
  parliament:            { labelEn: "Parliament",                 labelSw: "Bunge",             color: "#5856D6", icon: "🏛️", tier: "National" },
  president_office:      { labelEn: "President's Office",         labelSw: "Ikulu",             color: "#FF9500", icon: "⭐",  tier: "National" },
  regional_commissioner: { labelEn: "Regional Commissioner",      labelSw: "Mkuu wa Mkoa",      color: "#34C759", icon: "🏢", tier: "Region" },
  regional_secretariat:  { labelEn: "Regional Secretariat",       labelSw: "Sekretarieti ya Mkoa", color: "#30D158", icon: "🏢", tier: "Region" },
  district_commissioner: { labelEn: "District Commissioner",      labelSw: "Mkuu wa Wilaya",    color: "#00C7BE", icon: "🏗️", tier: "District" },
  district_council:      { labelEn: "District Council",           labelSw: "Halmashauri",       color: "#5AC8FA", icon: "🏗️", tier: "District" },
  ward_executive:        { labelEn: "Ward Executive Officer",     labelSw: "Mtendaji wa Kata",  color: "#F5C500", icon: "🏘️", tier: "Ward" },
  village_executive:     { labelEn: "Village/Mtaa Executive",     labelSw: "Mtendaji wa Kijiji",color: "#FFD60A", icon: "🏘️", tier: "Place" },
  hospital_national:     { labelEn: "National Hospital",          labelSw: "Hospitali ya Taifa",color: "#FF2D55", icon: "🏥", tier: "National" },
  hospital_regional:     { labelEn: "Regional Hospital",          labelSw: "Hospitali ya Mkoa", color: "#FF6B81", icon: "🏥", tier: "Region" },
  hospital_district:     { labelEn: "District Hospital",          labelSw: "Hospitali ya Wilaya", color: "#FF9EB5", icon: "🏥", tier: "District" },
  health_centre:         { labelEn: "Health Centre",              labelSw: "Zahanati",          color: "#FFB3C1", icon: "💊", tier: "Ward" },
  police_regional:       { labelEn: "Regional Police",            labelSw: "Polisi ya Mkoa",    color: "#1C1C1E", icon: "👮", tier: "Region" },
  police_district:       { labelEn: "Police Station",             labelSw: "Kituo cha Polisi",  color: "#3A3A3C", icon: "👮", tier: "District" },
  court_high:            { labelEn: "High Court",                 labelSw: "Mahakama Kuu",      color: "#AF52DE", icon: "⚖️", tier: "Region" },
  court_district:        { labelEn: "District Court",             labelSw: "Mahakama ya Wilaya",color: "#BF5AF2", icon: "⚖️", tier: "District" },
  school_secondary:      { labelEn: "Secondary School",           labelSw: "Shule ya Sekondari",color: "#FF9500", icon: "🎓", tier: "Ward" },
  school_primary:        { labelEn: "Primary School",             labelSw: "Shule ya Msingi",   color: "#FFCC00", icon: "📚", tier: "Ward" },
  immigration:           { labelEn: "Immigration Office",         labelSw: "Uhamiaji",          color: "#636366", icon: "🛂", tier: "District" },
  revenue_authority:     { labelEn: "Tax / TRA",                  labelSw: "Mamlaka ya Mapato", color: "#48484A", icon: "💰", tier: "Region" },
  water_authority:       { labelEn: "Water Authority",            labelSw: "Mamlaka ya Maji",   color: "#32ADE6", icon: "💧", tier: "Region" },
  electricity_tanesco:   { labelEn: "TANESCO",                    labelSw: "TANESCO",           color: "#FF9500", icon: "⚡", tier: "Region" },
  ngo_civic:             { labelEn: "NGO / Civil Society",        labelSw: "Asasi za Kiraia",   color: "#E5D4FF", icon: "🤝", tier: "Any" },
};

export const ALL_MAP_CATEGORIES = Object.keys(MAP_CATEGORY_META) as MapCategory[];

export interface OfficialLike {
  role_title?: string | null;
  role_title_sw?: string | null;
  mkoa_id?: number | null;
  wilaya_id?: number | null;
  kata_id?: number | null;
  lat?: number | null;
  lng?: number | null;
  map_category?: string | null;
}

/** Resolve a map_category from role + administrative tier. Spec §7. */
export function resolveMapCategory(o: OfficialLike): MapCategory {
  if (o.map_category && o.map_category in MAP_CATEGORY_META) {
    return o.map_category as MapCategory;
  }
  const role = `${o.role_title ?? ""} ${o.role_title_sw ?? ""}`.toLowerCase();

  if (/(hospital|hospitali|muhimbili|kcmc|bugando)/.test(role)) {
    if (!o.wilaya_id && !o.mkoa_id) return "hospital_national";
    if (!o.wilaya_id) return "hospital_regional";
    return "hospital_district";
  }
  if (/(zahanati|health centre|dispensary)/.test(role)) return "health_centre";
  if (/(mahakama|court)/.test(role)) {
    return o.wilaya_id ? "court_district" : "court_high";
  }
  if (/(police|polisi)/.test(role)) {
    return o.wilaya_id ? "police_district" : "police_regional";
  }
  if (/(shule.*sekondari|secondary)/.test(role)) return "school_secondary";
  if (/(shule.*msingi|primary)/.test(role)) return "school_primary";
  if (/(uhamiaji|immigration)/.test(role)) return "immigration";
  if (/(tra|mapato|revenue)/.test(role)) return "revenue_authority";
  if (/(maji|water)/.test(role)) return "water_authority";
  if (/(tanesco|electricity|umeme)/.test(role)) return "electricity_tanesco";
  if (/(bunge|parliament|mbunge|speaker|spika)/.test(role)) return "parliament";
  if (/(ikulu|state house|rais)/.test(role)) return "president_office";
  if (/(wizara|ministry|waziri|minister)/.test(role)) return "national_ministry";
  if (/(mtendaji.*kijiji|village executive)/.test(role)) return "village_executive";
  if (/(mtendaji.*kata|ward executive)/.test(role)) return "ward_executive";
  if (/(halmashauri|district council)/.test(role)) return "district_council";

  // Tier-based fallback
  if (!o.mkoa_id) return "national_ministry";
  if (!o.wilaya_id) return "regional_commissioner";
  if (!o.kata_id) return "district_commissioner";
  return "ward_executive";
}

export interface LocationDb {
  mikoa: { id: number; lat: number | null; lng: number | null }[];
  wilaya: { id: number; lat: number | null; lng: number | null }[];
  kata: { id: number; lat: number | null; lng: number | null }[];
}

/** Resolve display coordinates with fallback up the administrative tree. */
export function getMapCoordinates(o: OfficialLike, db: LocationDb): [number, number] | null {
  if (o.lat != null && o.lng != null) return [Number(o.lat), Number(o.lng)];
  if (o.kata_id) {
    const k = db.kata.find((x) => x.id === o.kata_id);
    if (k?.lat != null && k?.lng != null) return [Number(k.lat), Number(k.lng)];
  }
  if (o.wilaya_id) {
    const w = db.wilaya.find((x) => x.id === o.wilaya_id);
    if (w?.lat != null && w?.lng != null) return [Number(w.lat), Number(w.lng)];
  }
  if (o.mkoa_id) {
    const m = db.mikoa.find((x) => x.id === o.mkoa_id);
    if (m?.lat != null && m?.lng != null) return [Number(m.lat), Number(m.lng)];
  }
  return null;
}

/** Tanzania 26-region centroids (spec §7). */
export const TANZANIA_REGION_CENTROIDS: { name: string; lat: number; lng: number }[] = [
  { name: "Arusha",        lat: -3.3869, lng: 36.6830 },
  { name: "Dar-es-Salaam", lat: -6.7924, lng: 39.2083 },
  { name: "Dodoma",        lat: -6.1731, lng: 35.7395 },
  { name: "Geita",         lat: -2.8711, lng: 32.2345 },
  { name: "Iringa",        lat: -7.7701, lng: 35.6901 },
  { name: "Kagera",        lat: -1.8580, lng: 31.5000 },
  { name: "Katavi",        lat: -6.3650, lng: 31.1369 },
  { name: "Kigoma",        lat: -4.8770, lng: 29.6267 },
  { name: "Kilimanjaro",   lat: -3.5500, lng: 37.3333 },
  { name: "Lindi",         lat: -9.9972, lng: 39.7173 },
  { name: "Manyara",       lat: -4.3160, lng: 36.2500 },
  { name: "Mara",          lat: -1.7577, lng: 34.0075 },
  { name: "Mbeya",         lat: -8.9000, lng: 33.4600 },
  { name: "Morogoro",      lat: -6.8219, lng: 37.6603 },
  { name: "Mtwara",        lat: -10.2667, lng: 40.1833 },
  { name: "Mwanza",        lat: -2.5167, lng: 32.9000 },
  { name: "Njombe",        lat: -9.3333, lng: 34.7667 },
  { name: "Pwani",         lat: -7.0000, lng: 38.5000 },
  { name: "Rukwa",         lat: -7.9333, lng: 31.4500 },
  { name: "Ruvuma",        lat: -10.6833, lng: 36.0000 },
  { name: "Shinyanga",     lat: -3.6631, lng: 33.4231 },
  { name: "Simiyu",        lat: -3.0000, lng: 34.0000 },
  { name: "Singida",       lat: -4.8177, lng: 34.7427 },
  { name: "Songwe",        lat: -8.9638, lng: 32.6890 },
  { name: "Tabora",        lat: -5.0167, lng: 32.8000 },
  { name: "Tanga",         lat: -5.0667, lng: 38.3833 },
];

export const TANZANIA_CENTROID: [number, number] = [-6.369, 34.889];
