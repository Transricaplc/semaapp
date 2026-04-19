/**
 * Tanzania Education Institutions — Elimu
 * Source: TCU (Tanzania Commission for Universities) — March 2026
 * https://www.tcu.go.tz
 */

export type ElimuType =
  | "Chuo Kikuu cha Umma"
  | "Chuo Kikuu Binafsi"
  | "Chuo Kishiriki cha Umma"
  | "Chuo Kishiriki Binafsi"
  | "Taasisi ya Serikali"
  | "Chuo cha Ufundi";

export interface EduInstitution {
  id: string;
  name: string;
  acronym?: string;
  type: ElimuType;
  head?: { name: string; position: string; verified: boolean };
  location: string;
  status?: string;
  affiliation?: string;
  mandate?: string;
}

export const elimuTypeLabels: Record<ElimuType, string> = {
  "Chuo Kikuu cha Umma": "Public University",
  "Chuo Kikuu Binafsi": "Private University",
  "Chuo Kishiriki cha Umma": "Public University College",
  "Chuo Kishiriki Binafsi": "Private University College",
  "Taasisi ya Serikali": "Government Institution",
  "Chuo cha Ufundi": "Technical College",
};

// ── PUBLIC UNIVERSITIES (TCU March 2026) ──
const publicUniversities: EduInstitution[] = [
  { id: "edu-udsm", name: "University of Dar es Salaam", acronym: "UDSM", type: "Chuo Kikuu cha Umma", head: { name: "Prof. Lugano Wilson", position: "Vice Chancellor", verified: true }, location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-sua", name: "Sokoine University of Agriculture", acronym: "SUA", type: "Chuo Kikuu cha Umma", location: "Morogoro", status: "Accredited and Chartered" },
  { id: "edu-out", name: "Open University of Tanzania", acronym: "OUT", type: "Chuo Kikuu cha Umma", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-suza", name: "State University of Zanzibar", acronym: "SUZA", type: "Chuo Kikuu cha Umma", location: "Zanzibar", status: "Accredited" },
  { id: "edu-mzumbe", name: "Mzumbe University", acronym: "MU", type: "Chuo Kikuu cha Umma", location: "Morogoro", status: "Accredited and Chartered" },
  { id: "edu-nmaist", name: "Nelson Mandela African Institution of Science and Technology", acronym: "NM-AIST", type: "Chuo Kikuu cha Umma", location: "Arusha", status: "Accredited and Chartered" },
  { id: "edu-muhas", name: "Muhimbili University of Health and Allied Sciences", acronym: "MUHAS", type: "Chuo Kikuu cha Umma", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-aru", name: "Ardhi University", acronym: "ARU", type: "Chuo Kikuu cha Umma", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-udom", name: "University of Dodoma", acronym: "UDOM", type: "Chuo Kikuu cha Umma", location: "Dodoma", status: "Accredited and Chartered" },
  { id: "edu-must", name: "Mbeya University of Science and Technology", acronym: "MUST", type: "Chuo Kikuu cha Umma", location: "Mbeya", status: "Accredited and Chartered" },
  { id: "edu-mocu", name: "Moshi Cooperative University", acronym: "MoCU", type: "Chuo Kikuu cha Umma", location: "Moshi", status: "Accredited and Chartered" },
  { id: "edu-mnuat", name: "Mwalimu Nyerere University of Agriculture and Technology", acronym: "MNUAT", type: "Chuo Kikuu cha Umma", location: "Musoma", status: "Accredited" },
];

// ── PRIVATE UNIVERSITIES (TCU March 2026) ──
const privateUniversities: EduInstitution[] = [
  { id: "edu-ku", name: "Kairuki University (formerly HKMU)", acronym: "KU", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-sumait", name: "Abdulrahman Al-Sumait University", acronym: "SUMAIT", type: "Chuo Kikuu Binafsi", location: "Zanzibar", status: "Accredited" },
  { id: "edu-saut", name: "St. Augustine University of Tanzania", acronym: "SAUT", type: "Chuo Kikuu Binafsi", location: "Mwanza", status: "Accredited and Chartered" },
  { id: "edu-zu", name: "Zanzibar University", acronym: "ZU", type: "Chuo Kikuu Binafsi", location: "Zanzibar", status: "Accredited and Chartered" },
  { id: "edu-tuma", name: "Tumaini University Makumira", acronym: "TUMA", type: "Chuo Kikuu Binafsi", location: "Arusha", status: "Accredited and Chartered" },
  { id: "edu-aku", name: "Aga Khan University", acronym: "AKU", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-cuhas", name: "Catholic University of Health and Allied Sciences", acronym: "CUHAS", type: "Chuo Kikuu Binafsi", location: "Mwanza", status: "Accredited" },
  { id: "edu-uoa", name: "University of Arusha", acronym: "UoA", type: "Chuo Kikuu Binafsi", location: "Arusha", status: "Accredited and Chartered" },
  { id: "edu-sjuit", name: "St. Joseph University in Tanzania", acronym: "SJUIT", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-teku", name: "Teofilo Kisanji University", acronym: "TEKU", type: "Chuo Kikuu Binafsi", location: "Mbeya", status: "Accredited and Chartered" },
  { id: "edu-mwecau", name: "Mwenge Catholic University", acronym: "MWECAU", type: "Chuo Kikuu Binafsi", location: "Moshi", status: "Accredited" },
  { id: "edu-mum", name: "Muslim University of Morogoro", acronym: "MUM", type: "Chuo Kikuu Binafsi", location: "Morogoro", status: "Accredited and Chartered" },
  { id: "edu-uoi", name: "University of Iringa", acronym: "UoI", type: "Chuo Kikuu Binafsi", location: "Iringa", status: "Accredited" },
  { id: "edu-sjut", name: "St. John's University of Tanzania", acronym: "SJUT", type: "Chuo Kikuu Binafsi", location: "Dodoma", status: "Accredited and Chartered" },
  { id: "edu-kiut", name: "Kampala International University in Tanzania", acronym: "KIUT", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-uaut", name: "United African University of Tanzania", acronym: "UAUT", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-rucu", name: "Ruaha Catholic University", acronym: "RUCU", type: "Chuo Kikuu Binafsi", location: "Iringa", status: "Accredited" },
  { id: "edu-mzu", name: "Mwanza University", acronym: "MzU", type: "Chuo Kikuu Binafsi", location: "Mwanza", status: "Provisional Licence" },
  { id: "edu-cuom", name: "Catholic University of Mbeya (formerly CUCoM)", acronym: "CUoM", type: "Chuo Kikuu Binafsi", location: "Mbeya", status: "Accredited" },
  { id: "edu-dartu", name: "Dar es Salaam Tumaini University (formerly TUDARCo)", acronym: "DarTU", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-ru", name: "Rabininsia University", acronym: "RU", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Provisional Licence" },
  { id: "edu-umst", name: "University of Medical Sciences and Technology", acronym: "UMST", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Provisional Licence" },
  { id: "edu-huea", name: "Hikmah University of East Africa", acronym: "HUEA", type: "Chuo Kikuu Binafsi", location: "Dar es Salaam", status: "Provisional Licence" },
  { id: "edu-kcmc", name: "KCMC University", acronym: "KCMC", type: "Chuo Kikuu Binafsi", location: "Moshi", status: "Accredited" },
];

// ── PUBLIC UNIVERSITY COLLEGES ──
const publicColleges: EduInstitution[] = [
  { id: "edu-duce", name: "Dar es Salaam University College of Education", acronym: "DUCE", type: "Chuo Kishiriki cha Umma", affiliation: "UDSM", location: "Dar es Salaam", status: "Accredited and Chartered" },
  { id: "edu-muce", name: "Mkwawa University College of Education", acronym: "MUCE", type: "Chuo Kishiriki cha Umma", affiliation: "UDSM", location: "Iringa", status: "Accredited and Chartered" },
  { id: "edu-mu-dsm", name: "Mzumbe University – Dar es Salaam Campus College", type: "Chuo Kishiriki cha Umma", affiliation: "MU", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-mu-mby", name: "Mzumbe University – Mbeya Campus College", type: "Chuo Kishiriki cha Umma", affiliation: "MU", location: "Mbeya", status: "Accredited" },
  { id: "edu-mchas", name: "Mbeya College of Health and Allied Sciences", acronym: "MCHAS", type: "Chuo Kishiriki cha Umma", affiliation: "UDSM", location: "Mbeya", status: "Accredited" },
  { id: "edu-must-rc", name: "MUST – Rukwa Campus College", type: "Chuo Kishiriki cha Umma", affiliation: "MUST", location: "Rukwa", status: "Accredited" },
  { id: "edu-sua-mpc", name: "SUA – Mizengo Pinda Campus College", type: "Chuo Kishiriki cha Umma", affiliation: "SUA", location: "Katavi", status: "Accredited" },
  { id: "edu-must-mccte", name: "MUST – Mtwara Campus College of Technical Education", type: "Chuo Kishiriki cha Umma", affiliation: "MUST", location: "Mtwara", status: "Accredited" },
];

// ── PRIVATE UNIVERSITY COLLEGES ──
const privateColleges: EduInstitution[] = [
  { id: "edu-smmuco", name: "Stefano Moshi Memorial University College", acronym: "SMMUCo", type: "Chuo Kishiriki Binafsi", affiliation: "TUMA", location: "Moshi", status: "Full Registration and Chartered" },
  { id: "edu-amucta", name: "Archbishop Mihayo University College of Tabora", acronym: "AMUCTA", type: "Chuo Kishiriki Binafsi", affiliation: "SAUT", location: "Tabora", status: "Accredited" },
  { id: "edu-juco", name: "Jordan University College", acronym: "JUCo", type: "Chuo Kishiriki Binafsi", affiliation: "SAUT", location: "Morogoro", status: "Accredited" },
  { id: "edu-sfuchas", name: "St. Francis University College of Health and Allied Sciences", acronym: "SFUCHAS", type: "Chuo Kishiriki Binafsi", affiliation: "SAUT", location: "Morogoro", status: "Accredited" },
  { id: "edu-stemmuco", name: "Stella Maris Mtwara University College", acronym: "STeMMUCo", type: "Chuo Kishiriki Binafsi", affiliation: "SAUT", location: "Mtwara", status: "Accredited" },
  { id: "edu-maruco", name: "Marian University College", acronym: "MARUCo", type: "Chuo Kishiriki Binafsi", affiliation: "SAUT", location: "Bagamoyo", status: "Accredited" },
  { id: "edu-sjchas", name: "St. Joseph University College of Health and Allied Sciences", acronym: "SJCHAS", type: "Chuo Kishiriki Binafsi", affiliation: "SJUIT", location: "Dar es Salaam", status: "Accredited" },
  { id: "edu-mwecau-hcc", name: "Mwenge Catholic University, Hedaru Campus College", acronym: "MWECAU-HCC", type: "Chuo Kishiriki Binafsi", affiliation: "MWECAU", location: "Same, Kilimanjaro", status: "Accredited" },
];

// ── GOVERNMENT INSTITUTIONS ──
const governmentInstitutions: EduInstitution[] = [
  { id: "edu-necta", name: "NECTA — Baraza la Mitihani la Taifa", type: "Taasisi ya Serikali", mandate: "Mitihani ya Taifa", location: "Dar es Salaam" },
  { id: "edu-tcu", name: "TCU — Tume ya Vyuo Vikuu", type: "Taasisi ya Serikali", mandate: "Usimamizi wa Vyuo Vikuu", location: "Dodoma" },
  { id: "edu-heslb", name: "HESLB — Bodi ya Mikopo ya Elimu ya Juu", type: "Taasisi ya Serikali", mandate: "Mikopo ya wanafunzi wa elimu ya juu", location: "Dar es Salaam" },
  { id: "edu-nacte", name: "NACTE — Baraza la Taifa la Elimu ya Ufundi", type: "Taasisi ya Serikali", mandate: "Usimamizi wa vyuo vya ufundi", location: "Dar es Salaam" },
  { id: "edu-veta", name: "VETA — Mamlaka ya Elimu na Mafunzo ya Ufundi Stadi", type: "Taasisi ya Serikali", mandate: "Mafunzo ya ufundi stadi", location: "Dar es Salaam" },
];

export const eduInstitutions: EduInstitution[] = [
  ...publicUniversities,
  ...privateUniversities,
  ...publicColleges,
  ...privateColleges,
  ...governmentInstitutions,
];

export function searchEdu(query: string): EduInstitution[] {
  const q = query.toLowerCase().trim();
  if (!q) return eduInstitutions;
  return eduInstitutions.filter((e) =>
    e.name.toLowerCase().includes(q) ||
    e.location.toLowerCase().includes(q) ||
    (e.acronym && e.acronym.toLowerCase().includes(q)) ||
    (e.mandate && e.mandate.toLowerCase().includes(q)) ||
    (e.affiliation && e.affiliation.toLowerCase().includes(q))
  );
}
