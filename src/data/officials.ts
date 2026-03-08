export type OfficialLevel = "national" | "regional" | "district" | "local";
export type Department = "Executive" | "Policing" | "Health" | "Education" | "Infrastructure" | "Agriculture" | "Finance" | "Judiciary";

export interface Official {
  id: string;
  name: string;
  role: string;
  level: OfficialLevel;
  region: string;
  department: Department;
  phone: string;
  email: string;
  imageUrl?: string;
}

export const officials: Official[] = [
  // National
  { id: "n1", name: "Hon. Samia Suluhu Hassan", role: "Rais wa Jamhuri (President)", level: "national", region: "Dodoma", department: "Executive", phone: "+255-22-211-6898", email: "info@ikulu.go.tz" },
  { id: "n2", name: "Hon. Kassim Majaliwa", role: "Waziri Mkuu (Prime Minister)", level: "national", region: "Dodoma", department: "Executive", phone: "+255-22-213-5061", email: "pm@pmo.go.tz" },
  { id: "n3", name: "Hon. January Makamba", role: "Minister of Energy", level: "national", region: "Dodoma", department: "Infrastructure", phone: "+255-22-211-7624", email: "info@nishati.go.tz" },
  { id: "n4", name: "Hon. Ummy Mwalimu", role: "Minister of Health", level: "national", region: "Dodoma", department: "Health", phone: "+255-22-212-0261", email: "ps@afya.go.tz" },
  { id: "n5", name: "Hon. Adolf Mkenda", role: "Minister of Education", level: "national", region: "Dodoma", department: "Education", phone: "+255-22-212-1481", email: "ps@moe.go.tz" },
  { id: "n6", name: "Hon. Doto Biteko", role: "Minister of Minerals", level: "national", region: "Dodoma", department: "Finance", phone: "+255-22-212-5038", email: "info@madini.go.tz" },

  // Regional Commissioners
  { id: "r1", name: "Albert Chalamila", role: "Regional Commissioner (RC)", level: "regional", region: "Dar es Salaam", department: "Executive", phone: "+255-22-211-5414", email: "rc@dsm.go.tz" },
  { id: "r2", name: "Juma Homera", role: "Regional Commissioner (RC)", level: "regional", region: "Dodoma", department: "Executive", phone: "+255-26-232-1571", email: "rc@dodoma.go.tz" },
  { id: "r3", name: "Anna Naburi", role: "Regional Commissioner (RC)", level: "regional", region: "Arusha", department: "Executive", phone: "+255-27-250-3431", email: "rc@arusha.go.tz" },
  { id: "r4", name: "Marco Muha", role: "Regional Commissioner (RC)", level: "regional", region: "Mwanza", department: "Executive", phone: "+255-28-250-0312", email: "rc@mwanza.go.tz" },
  { id: "r5", name: "Idd Kimanta", role: "Regional Commissioner (RC)", level: "regional", region: "Kilimanjaro", department: "Executive", phone: "+255-27-275-4079", email: "rc@kilimanjaro.go.tz" },

  // District Commissioners
  { id: "d1", name: "Ramadhani Sanga", role: "District Commissioner (DC)", level: "district", region: "Dar es Salaam", department: "Executive", phone: "+255-22-286-0512", email: "dc.ilala@dsm.go.tz" },
  { id: "d2", name: "Farida Mbaruku", role: "District Commissioner (DC)", level: "district", region: "Dar es Salaam", department: "Executive", phone: "+255-22-270-0123", email: "dc.kinondoni@dsm.go.tz" },
  { id: "d3", name: "Grace Mgonja", role: "District Commissioner (DC)", level: "district", region: "Arusha", department: "Executive", phone: "+255-27-250-8821", email: "dc.arusha@arusha.go.tz" },
  { id: "d4", name: "Joseph Mhagama", role: "District Commissioner (DC)", level: "district", region: "Mwanza", department: "Executive", phone: "+255-28-250-0444", email: "dc.nyamagana@mwanza.go.tz" },

  // Local - Members of Parliament / Ward Councillors
  { id: "l1", name: "Hon. Abdallah Bulembo", role: "Member of Parliament (Kigamboni)", level: "local", region: "Dar es Salaam", department: "Executive", phone: "+255-22-211-3284", email: "mp.kigamboni@bunge.go.tz" },
  { id: "l2", name: "Hon. Halima Mdee", role: "Member of Parliament (Kawe)", level: "local", region: "Dar es Salaam", department: "Executive", phone: "+255-22-211-3285", email: "mp.kawe@bunge.go.tz" },
  { id: "l3", name: "Hon. Salome Makamba", role: "Member of Parliament (Bumbuli)", level: "local", region: "Kilimanjaro", department: "Executive", phone: "+255-22-211-3290", email: "mp.bumbuli@bunge.go.tz" },
  { id: "l4", name: "Mary Kimaro", role: "Ward Councillor (Msasani)", level: "local", region: "Dar es Salaam", department: "Executive", phone: "+255-754-000-123", email: "councillor.msasani@dsm.go.tz" },
  { id: "l5", name: "John Nyerere", role: "Ward Councillor (Mikocheni)", level: "local", region: "Dar es Salaam", department: "Executive", phone: "+255-754-000-124", email: "councillor.mikocheni@dsm.go.tz" },

  // Department-specific officials
  { id: "p1", name: "IGP Simon Sirro", role: "Inspector General of Police", level: "national", region: "Dodoma", department: "Policing", phone: "+255-22-211-7624", email: "igp@polisi.go.tz" },
  { id: "p2", name: "RPC David Misime", role: "Regional Police Commander", level: "regional", region: "Dar es Salaam", department: "Policing", phone: "+255-22-211-7002", email: "rpc@dsm.polisi.go.tz" },
  { id: "h1", name: "Dr. Aifello Sichalwe", role: "Chief Medical Officer", level: "national", region: "Dodoma", department: "Health", phone: "+255-22-213-1088", email: "cmo@afya.go.tz" },
  { id: "e1", name: "Prof. Eliamani Sedoyeka", role: "Commissioner for Education", level: "national", region: "Dodoma", department: "Education", phone: "+255-22-212-1481", email: "commissioner@moe.go.tz" },
  { id: "a1", name: "Eng. Patrick Rutabanzibwa", role: "Commissioner for Agriculture", level: "national", region: "Dodoma", department: "Agriculture", phone: "+255-22-286-2065", email: "commissioner@kilimo.go.tz" },
];

export const regions = [
  "All Regions", "Dar es Salaam", "Dodoma", "Arusha", "Mwanza", "Kilimanjaro",
  "Tanga", "Morogoro", "Mbeya", "Iringa", "Kagera"
];

export const departments: Department[] = [
  "Executive", "Policing", "Health", "Education", "Infrastructure", "Agriculture", "Finance", "Judiciary"
];

export const levelLabels: Record<OfficialLevel, string> = {
  national: "Kitaifa (National)",
  regional: "Mkoa (Regional)",
  district: "Wilaya (District)",
  local: "Kata (Local)",
};
