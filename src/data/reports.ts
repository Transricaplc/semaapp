export type ReportCategory = "graft" | "crime" | "service_delivery";
export type ReportStatus = "sent" | "received" | "investigating" | "resolved";

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  description: string;
  location: string;
  status: ReportStatus;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockReports: Report[] = [
  {
    id: "rpt-001",
    title: "Road construction funds misused in Temeke",
    category: "graft",
    description: "Road construction project funds diverted. The road from Mbagala to Chang'ombe remains unfinished despite full budget allocation.",
    location: "Temeke, Dar es Salaam",
    status: "investigating",
    anonymous: true,
    createdAt: "2026-02-15",
    updatedAt: "2026-03-01",
  },
  {
    id: "rpt-002",
    title: "No medicine at Mwananyamala Hospital",
    category: "service_delivery",
    description: "Essential medicines have been out of stock for 3 weeks at Mwananyamala Regional Hospital. Patients turned away daily.",
    location: "Kinondoni, Dar es Salaam",
    status: "received",
    anonymous: false,
    createdAt: "2026-03-01",
    updatedAt: "2026-03-03",
  },
  {
    id: "rpt-003",
    title: "Armed robbery in Sinza area",
    category: "crime",
    description: "Multiple reports of armed robberies near Sinza Palestina area in the evenings. Residents feel unsafe.",
    location: "Sinza, Dar es Salaam",
    status: "sent",
    anonymous: true,
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
  },
  {
    id: "rpt-004",
    title: "Water supply disruption in Dodoma CBD",
    category: "service_delivery",
    description: "Water has been cut off for 5 days in the central business district. Businesses and residents severely affected.",
    location: "Dodoma CBD",
    status: "resolved",
    anonymous: false,
    createdAt: "2026-02-20",
    updatedAt: "2026-03-06",
  },
  {
    id: "rpt-005",
    title: "Bribery at local land office",
    category: "graft",
    description: "Officials demanding bribes for land title processing. Citizens unable to get legitimate services without paying extra.",
    location: "Ilala, Dar es Salaam",
    status: "investigating",
    anonymous: true,
    createdAt: "2026-02-28",
    updatedAt: "2026-03-04",
  },
];

export const trendingConcerns = [
  { id: 1, text: "Water shortages reported in 3 regions", category: "service_delivery" as ReportCategory, count: 47, region: "Multiple" },
  { id: 2, text: "Road safety concerns on Morogoro Highway", category: "crime" as ReportCategory, count: 32, region: "Dar es Salaam" },
  { id: 3, text: "School fee irregularities reported", category: "graft" as ReportCategory, count: 28, region: "Dodoma" },
  { id: 4, text: "Hospital staff shortages in rural areas", category: "service_delivery" as ReportCategory, count: 55, region: "Multiple" },
  { id: 5, text: "Market vendor licensing corruption", category: "graft" as ReportCategory, count: 19, region: "Mwanza" },
];

export const categoryLabels: Record<ReportCategory, string> = {
  graft: "Rushwa (Graft)",
  crime: "Uhalifu (Crime)",
  service_delivery: "Huduma (Service Delivery)",
};

export const statusLabels: Record<ReportStatus, string> = {
  sent: "Imetumwa (Sent)",
  received: "Imepokelewa (Received)",
  investigating: "Inachunguzwa (Under Investigation)",
  resolved: "Imeshughulikiwa (Resolved)",
};
