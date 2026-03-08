import contactsData from "./official_contacts.json";

// ============================================================
// TYPE DEFINITIONS — This is the schema for each MP record.
// When importing new data, ensure your JSON matches this shape.
// ============================================================

export interface OfficialContact {
  id: string;
  name: string;
  title_role: string;
  constituency: string;
  district: string;
  region: string;
  political_party: string;
  email: string;
  phone: string;
  profile_image_url: string;
}

export interface ContactsMeta {
  version: string;
  last_updated: string;
  source: string;
  total_records: number;
}

// ============================================================
// DATA LOADER — Reads from the JSON file.
// To update: simply replace official_contacts.json contents.
// ============================================================

export const meta: ContactsMeta = contactsData._meta as unknown as ContactsMeta;
export const allOfficials: OfficialContact[] = contactsData.officials;

// ============================================================
// DERIVED LOOKUP MAPS — Auto-built from whatever data is loaded.
// These power the cascading filter dropdowns.
// ============================================================

/** All unique regions, sorted alphabetically */
export const allRegions: string[] = [
  ...new Set(allOfficials.map((o) => o.region)),
].sort();

/** Map of region → districts within that region */
export const districtsByRegion: Record<string, string[]> = {};
allOfficials.forEach((o) => {
  if (!districtsByRegion[o.region]) districtsByRegion[o.region] = [];
  if (!districtsByRegion[o.region].includes(o.district)) {
    districtsByRegion[o.region].push(o.district);
  }
});
Object.values(districtsByRegion).forEach((arr) => arr.sort());

/** Map of district → constituencies within that district */
export const constituenciesByDistrict: Record<string, string[]> = {};
allOfficials.forEach((o) => {
  if (!constituenciesByDistrict[o.district]) constituenciesByDistrict[o.district] = [];
  if (!constituenciesByDistrict[o.district].includes(o.constituency)) {
    constituenciesByDistrict[o.district].push(o.constituency);
  }
});
Object.values(constituenciesByDistrict).forEach((arr) => arr.sort());

/** All unique title roles */
export const allRoles: string[] = [
  ...new Set(allOfficials.map((o) => o.title_role)),
].sort();

/** All unique parties */
export const allParties: string[] = [
  ...new Set(allOfficials.map((o) => o.political_party)),
].sort();
