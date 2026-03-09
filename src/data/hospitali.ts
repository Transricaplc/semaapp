/**
 * Tanzania Healthcare Directory — Hospitali
 * Grouped by type: Hospitali za Taifa | Rufaa za Kanda | Rufaa za Mkoa | Wilaya
 */

export type HospitalType = "Hospitali ya Taifa" | "Rufaa ya Kanda" | "Rufaa ya Mkoa" | "Wilaya";

export interface Hospital {
  id: string;
  name: string;
  type: HospitalType;
  location: string;
  director: { name: string; position: string };
  emergencyLine?: string;
  verified: boolean;
}

export const hospitalTypeLabels: Record<HospitalType, string> = {
  "Hospitali ya Taifa": "National Hospital",
  "Rufaa ya Kanda": "Zonal Referral",
  "Rufaa ya Mkoa": "Regional Referral",
  "Wilaya": "District Hospital",
};

export const hospitals: Hospital[] = [
  // ── NATIONAL ──
  { id: "h-mnh", name: "Muhimbili National Hospital (MNH)", type: "Hospitali ya Taifa", location: "Dar es Salaam", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, emergencyLine: "022-215-1367", verified: true },
  { id: "h-mnh2", name: "Muhimbili Mloganzila (Phase II)", type: "Hospitali ya Taifa", location: "Dar es Salaam", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-orci", name: "Ocean Road Cancer Institute (ORCI)", type: "Hospitali ya Taifa", location: "Dar es Salaam", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-jkci", name: "Jakaya Kikwete Cardiac Institute (JKCI)", type: "Hospitali ya Taifa", location: "Dar es Salaam", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-moi", name: "MOI — Muhimbili Orthopaedic Institute", type: "Hospitali ya Taifa", location: "Dar es Salaam", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-mkapa", name: "Benjamin Mkapa Hospital", type: "Hospitali ya Taifa", location: "Dodoma", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },

  // ── ZONAL REFERRAL ──
  { id: "h-kcmc", name: "Kilimanjaro Christian Medical Centre (KCMC)", type: "Rufaa ya Kanda", location: "Moshi, Kilimanjaro", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-bugando", name: "Bugando Medical Centre", type: "Rufaa ya Kanda", location: "Mwanza", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-mbeya-z", name: "Mbeya Zonal Referral Hospital", type: "Rufaa ya Kanda", location: "Mbeya", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },
  { id: "h-mnazi", name: "Mnazi Mmoja Hospital", type: "Rufaa ya Kanda", location: "Zanzibar", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Executive Director" }, verified: true },

  // ── REGIONAL REFERRAL (all 31) ──
  { id: "h-amana", name: "Amana Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Dar es Salaam — Ilala", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: true },
  { id: "h-temeke", name: "Temeke Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Dar es Salaam — Temeke", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: true },
  { id: "h-mwananyamala", name: "Mwananyamala Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Dar es Salaam — Kinondoni", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: true },
  { id: "h-dodoma-rr", name: "Dodoma Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Dodoma", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-mtmeru", name: "Mount Meru Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Arusha", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-mawenzi", name: "Mawenzi Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Kilimanjaro — Moshi", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-bombo", name: "Bombo Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Tanga", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-sekou", name: "Sekou Toure Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Mwanza", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-bukoba", name: "Bukoba Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Kagera — Bukoba", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-morogoro-rr", name: "Morogoro Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Morogoro", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-iringa-rr", name: "Iringa Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Iringa", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-mbeya-rr", name: "Mbeya Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Mbeya", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-songea-rr", name: "Ruvuma Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Ruvuma — Songea", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-mtwara-rr", name: "Ligula Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Mtwara", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-lindi-rr", name: "Sokoine Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Lindi", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-tabora-rr", name: "Kitete Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Tabora", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-singida-rr", name: "Singida Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Singida", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-shinyanga-rr", name: "Shinyanga Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Shinyanga", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-maweni-rr", name: "Maweni Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Kigoma", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-tumbi-rr", name: "Tumbi Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Pwani — Kibaha", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-geita-rr", name: "Geita Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Geita", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-njombe-rr", name: "Kibena Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Njombe", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-katavi-rr", name: "Mpanda Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Katavi — Mpanda", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-rukwa-rr", name: "Sumbawanga Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Rukwa — Sumbawanga", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-simiyu-rr", name: "Simiyu Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Simiyu — Bariadi", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-songwe-rr", name: "Songwe Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Songwe — Vwawa", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-manyara-rr", name: "Babati Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Manyara — Babati", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
  { id: "h-mara-rr", name: "Musoma Regional Referral Hospital", type: "Rufaa ya Mkoa", location: "Mara — Musoma", director: { name: "Mkurugenzi wa Sasa (2026)", position: "Medical Officer In-Charge" }, verified: false },
];

export function searchHospitals(query: string): Hospital[] {
  const q = query.toLowerCase();
  return hospitals.filter(
    (h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.type.toLowerCase().includes(q)
  );
}

export function getHospitalsByType(type: HospitalType): Hospital[] {
  return hospitals.filter((h) => h.type === type);
}
