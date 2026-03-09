/**
 * Tanzania Judiciary Directory — Mahakama
 */

export type CourtLevel = "Mahakama ya Juu" | "Mahakama Kuu" | "Mahakama ya Hakimu Mkazi" | "Mahakama ya Wilaya";

export interface Court {
  id: string;
  name: string;
  level: CourtLevel;
  head: { name: string; position: string };
  location: string;
  verified: boolean;
}

export const courtLevelLabels: Record<CourtLevel, string> = {
  "Mahakama ya Juu": "Court of Appeal",
  "Mahakama Kuu": "High Court",
  "Mahakama ya Hakimu Mkazi": "Resident Magistrate Court",
  "Mahakama ya Wilaya": "District Court",
};

export const courts: Court[] = [
  { id: "ct-appeal", name: "Court of Appeal of Tanzania", level: "Mahakama ya Juu", head: { name: "Chief Justice wa Sasa (2026)", position: "Chief Justice" }, location: "Dar es Salaam", verified: true },
  { id: "ct-hc-dsm", name: "High Court of Tanzania — Main Registry", level: "Mahakama Kuu", head: { name: "Principal Judge wa Sasa (2026)", position: "Principal Judge" }, location: "Dar es Salaam", verified: true },
  { id: "ct-hc-dodoma", name: "High Court — Dodoma Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Dodoma", verified: false },
  { id: "ct-hc-arusha", name: "High Court — Arusha Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Arusha", verified: false },
  { id: "ct-hc-mwanza", name: "High Court — Mwanza Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Mwanza", verified: false },
  { id: "ct-hc-mbeya", name: "High Court — Mbeya Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Mbeya", verified: false },
  { id: "ct-hc-tanga", name: "High Court — Tanga Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Tanga", verified: false },
  { id: "ct-hc-tabora", name: "High Court — Tabora Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Tabora", verified: false },
  { id: "ct-hc-bukoba", name: "High Court — Bukoba Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Bukoba", verified: false },
  { id: "ct-hc-kigoma", name: "High Court — Kigoma Registry", level: "Mahakama Kuu", head: { name: "Judge In Charge (2026)", position: "Judge In Charge" }, location: "Kigoma", verified: false },
  { id: "ct-rm-dsm", name: "Resident Magistrate Court — Dar es Salaam", level: "Mahakama ya Hakimu Mkazi", head: { name: "Hakimu Mkazi Mkuu (2026)", position: "Chief Resident Magistrate" }, location: "Dar es Salaam", verified: false },
  { id: "ct-rm-kisutu", name: "Kisutu Resident Magistrate Court", level: "Mahakama ya Hakimu Mkazi", head: { name: "Hakimu Mkazi (2026)", position: "Resident Magistrate" }, location: "Dar es Salaam", verified: false },
];

export function searchCourts(query: string): Court[] {
  const q = query.toLowerCase();
  return courts.filter((c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.level.toLowerCase().includes(q));
}
