import serikaliData from "./serikali_data.json";
import { mpData } from "./mps_data";
import { mpContactLookup, normalizeConstituency } from "./mp_contacts";

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

// Convert MP data to Kiongozi format for the Bunge tab; enrich with PDF phone/SLP
const mpViongozi: Kiongozi[] = mpData.map((mp) => {
  const contact = mpContactLookup[normalizeConstituency(mp.constituency)];
  return {
    id: `mp-${mp.constituency.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    jina: contact?.name ? `Mhe. ${contact.name}` : mp.name,
    wadhifa: `Mbunge — ${mp.constituency}`,
    mhimili: "Legislature" as Mhimili,
    ngazi: "Jimbo/Kata" as Ngazi,
    mkoa: mp.region,
    wilaya: mp.district,
    jimbo: mp.constituency,
    chama: contact?.party || mp.party,
    simu: contact?.phone || "",
    barua_pepe: `${(contact?.name || mp.name).split(" ").pop()?.toLowerCase().replace(/[^a-z]/g,'') || "mp"}@bunge.go.tz`,
    ofisi: contact?.slp ? `S.L.P. ${contact.slp}` : `Bunge la Tanzania / Jimbo la ${mp.constituency}`,
    picha_url: "",
    chanzo: "Bunge la Tanzania — Kitabu cha Wabunge, Aprili 2026",
    tarehe_uhakiki: "2026-04-01",
  };
});

// Merge static JSON data with generated MP data (dedup by ID)
const jsonViongozi = serikaliData.viongozi as unknown as Kiongozi[];
const existingIds = new Set(jsonViongozi.map((k) => k.id));
export const viongoziWote: Kiongozi[] = [
  ...jsonViongozi,
  ...mpViongozi.filter((mp) => !existingIds.has(mp.id)),
];

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
