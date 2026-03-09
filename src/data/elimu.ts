/**
 * Tanzania Education Institutions — Elimu
 */

export type ElimuType = "Chuo Kikuu cha Umma" | "Taasisi ya Serikali" | "Chuo cha Ufundi";

export interface EduInstitution {
  id: string;
  name: string;
  type: ElimuType;
  head?: { name: string; position: string; verified: boolean };
  location: string;
  mandate?: string;
}

export const elimuTypeLabels: Record<ElimuType, string> = {
  "Chuo Kikuu cha Umma": "Public University",
  "Taasisi ya Serikali": "Government Institution",
  "Chuo cha Ufundi": "Technical College",
};

export const eduInstitutions: EduInstitution[] = [
  { id: "edu-udsm", name: "Chuo Kikuu cha Dar es Salaam (UDSM)", type: "Chuo Kikuu cha Umma", head: { name: "Prof. Lugano Wilson", position: "Vice Chancellor", verified: true }, location: "Dar es Salaam" },
  { id: "edu-sua", name: "Sokoine University of Agriculture (SUA)", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Morogoro" },
  { id: "edu-udom", name: "University of Dodoma (UDOM)", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Dodoma" },
  { id: "edu-aru", name: "Ardhi University", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Dar es Salaam" },
  { id: "edu-muhas", name: "Muhimbili University of Health (MUHAS)", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Dar es Salaam" },
  { id: "edu-out", name: "Open University of Tanzania (OUT)", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Dar es Salaam" },
  { id: "edu-mzumbe", name: "Mzumbe University", type: "Chuo Kikuu cha Umma", head: { name: "VC wa Sasa (2026)", position: "Vice Chancellor", verified: false }, location: "Morogoro" },
  { id: "edu-necta", name: "NECTA — Baraza la Mitihani la Taifa", type: "Taasisi ya Serikali", mandate: "Mitihani ya Taifa", location: "Dar es Salaam" },
  { id: "edu-tcu", name: "TCU — Tume ya Vyuo Vikuu", type: "Taasisi ya Serikali", mandate: "Usimamizi wa Vyuo Vikuu", location: "Dar es Salaam" },
  { id: "edu-heslb", name: "HESLB — Bodi ya Mikopo ya Elimu ya Juu", type: "Taasisi ya Serikali", mandate: "Mikopo ya wanafunzi wa elimu ya juu", location: "Dar es Salaam" },
  { id: "edu-nacte", name: "NACTE — Baraza la Taifa la Elimu ya Ufundi", type: "Taasisi ya Serikali", mandate: "Usimamizi wa vyuo vya ufundi", location: "Dar es Salaam" },
  { id: "edu-veta", name: "VETA — Mamlaka ya Elimu na Mafunzo ya Ufundi Stadi", type: "Taasisi ya Serikali", mandate: "Mafunzo ya ufundi stadi", location: "Dar es Salaam" },
];

export function searchEdu(query: string): EduInstitution[] {
  const q = query.toLowerCase();
  return eduInstitutions.filter((e) =>
    e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || (e.mandate && e.mandate.toLowerCase().includes(q))
  );
}
