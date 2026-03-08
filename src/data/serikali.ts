import serikaliData from "./serikali_data.json";

// ============================================================
// TYPE DEFINITIONS — Schema for the National Directory
// ============================================================

export type Mhimili = "Executive" | "Legislature" | "LocalGov" | "Judiciary";
export type Ngazi = "Kitaifa" | "Mkoa" | "Wilaya" | "Jimbo/Kata";

export interface Kiongozi {
  id: string;
  jina: string;
  wadhifa: string;
  mhimili: Mhimili;
  ngazi: Ngazi;
  mkoa: string;
  wilaya: string;
  jimbo: string;
  chama: string;
  simu: string;
  barua_pepe: string;
  ofisi: string;
  picha_url: string;
  chanzo: string;
  tarehe_uhakiki: string;
}

export interface SerikaliMeta {
  version: string;
  last_updated: string;
  source: string;
  total_records: number;
}

// ============================================================
// DATA LOADER
// ============================================================

export const serikaliMeta: SerikaliMeta = serikaliData._meta as unknown as SerikaliMeta;
export const viongoziWote: Kiongozi[] = serikaliData.viongozi as unknown as Kiongozi[];

// ============================================================
// DERIVED LOOKUPS
// ============================================================

/** Filter by mhimili (branch of government) */
export const getByMhimili = (mhimili: Mhimili): Kiongozi[] =>
  viongoziWote.filter((k) => k.mhimili === mhimili);

/** All unique regions from this dataset */
export const mikoa: string[] = [
  ...new Set(viongoziWote.map((k) => k.mkoa).filter(Boolean)),
].sort();

/** All unique districts from this dataset */
export const wilayaByMkoa: Record<string, string[]> = {};
viongoziWote.forEach((k) => {
  if (k.mkoa && k.wilaya) {
    if (!wilayaByMkoa[k.mkoa]) wilayaByMkoa[k.mkoa] = [];
    if (!wilayaByMkoa[k.mkoa].includes(k.wilaya)) {
      wilayaByMkoa[k.mkoa].push(k.wilaya);
    }
  }
});
Object.values(wilayaByMkoa).forEach((arr) => arr.sort());

/** All unique ngazi levels */
export const ngaziZote: Ngazi[] = [
  ...new Set(viongoziWote.map((k) => k.ngazi)),
].sort() as Ngazi[];

/** Mhimili labels in Swahili */
export const mhimiliLabels: Record<Mhimili, string> = {
  Executive: "Serikali Kuu",
  Legislature: "Bunge",
  LocalGov: "Serikali za Mitaa",
  Judiciary: "Idara ya Mahakama & Usalama",
};

/** Ngazi labels in Swahili */
export const ngaziLabels: Record<Ngazi, string> = {
  Kitaifa: "Kitaifa (National)",
  Mkoa: "Mkoa (Regional)",
  Wilaya: "Wilaya (District)",
  "Jimbo/Kata": "Jimbo/Kata (Constituency/Ward)",
};
