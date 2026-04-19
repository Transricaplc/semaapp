// Registered Political Parties of Tanzania
// Source: Office of the Registrar of Political Parties (ORPP) — orpp.go.tz
// Verified list as at 17th March, 2025 (full permanent registration)

export interface PoliticalParty {
  no: number;
  registrationNo: string;
  name: string;          // Full official name (English / Swahili as gazetted)
  acronym: string;       // Short form e.g. CCM, CHADEMA
  registeredOn: string;  // Date of permanent registration
  chairperson: string;
  secretaryGeneral: string;
  hqAddress: string;
  hqRegion: string;
  phone?: string;
  email?: string;
  website?: string;
}

export const politicalParties: PoliticalParty[] = [
  {
    no: 1, registrationNo: "0000001",
    name: "Chama cha Mapinduzi", acronym: "CCM",
    registeredOn: "01 July, 1992",
    chairperson: "Dkt. Samia Suluhu Hassan",
    secretaryGeneral: "Dkt. Emmanuel Nchimbi",
    hqAddress: "House No. 15, Mtaa wa Kuu, Madukani — Dodoma. P.O. Box 50",
    hqRegion: "Dodoma",
    phone: "0754 498752", email: "katibumkuu@ccmtz.org", website: "www.ccm.or.tz",
  },
  {
    no: 2, registrationNo: "0000002",
    name: "The Civic United Front (Chama cha Wananchi)", acronym: "CUF",
    registeredOn: "21 January, 1993",
    chairperson: "Prof. Ibrahim Haruna Lipumba",
    secretaryGeneral: "Husna Abdalla Mohammed",
    hqAddress: "House No. ZM/18, Mtendeni, Mchangani — Mjini, Unguja",
    hqRegion: "Mjini Magharibi",
    phone: "0684 625442", email: "info@cuf.or.tz", website: "www.cuf.or.tz",
  },
  {
    no: 3, registrationNo: "0000003",
    name: "Chama cha Demokrasia na Maendeleo", acronym: "CHADEMA",
    registeredOn: "21 January, 1993",
    chairperson: "Tundu Antipas Lissu",
    secretaryGeneral: "John John Mnyika",
    hqAddress: "House No. 31, Daima St., Mikocheni — Kinondoni, Dar es Salaam. P.O. Box 31191",
    hqRegion: "Dar es Salaam",
    phone: "+255 22 2668866", email: "info@chadema.or.tz", website: "www.chadema.or.tz",
  },
  {
    no: 4, registrationNo: "0000004",
    name: "Union for Multiparty Democracy", acronym: "UMD",
    registeredOn: "21 January, 1993",
    chairperson: "Mohamed Omari Shaame",
    secretaryGeneral: "Moshi Rashid Kigundula",
    hqAddress: "House No. 8, Mwembeni, Tabata Changombe — Ilala, Dar es Salaam. P.O. Box 61117",
    hqRegion: "Dar es Salaam",
    phone: "0653 295920", email: "unionformultipartydemocracy@gmail.com",
  },
  {
    no: 5, registrationNo: "0000005",
    name: "National Convention for Construction and Reform", acronym: "NCCR-Mageuzi",
    registeredOn: "21 January, 1993",
    chairperson: "Haji Ambari Khamis (Ag.)",
    secretaryGeneral: "Ameir Ali Mshindani (Ag.)",
    hqAddress: "House No. 2, Kilosa St., next to Ilala Market — Dar es Salaam. P.O. Box 72474",
    hqRegion: "Dar es Salaam",
    phone: "0684 146162", email: "info@nccrmageuzi.or.tz", website: "www.nccrmageuzi.or.tz",
  },
  {
    no: 6, registrationNo: "0000006",
    name: "National League for Democracy", acronym: "NLD",
    registeredOn: "21 January, 1993",
    chairperson: "Mfaume Khamis Hassan",
    secretaryGeneral: "Doyo Hassan Doyo",
    hqAddress: "House No. 3, Litui St., Tandika Magorofani — Temeke, Dar es Salaam. P.O. Box 42600",
    hqRegion: "Dar es Salaam",
    phone: "0777 847099", email: "nld.tz93@gmail.com",
  },
  {
    no: 7, registrationNo: "0000008",
    name: "United Peoples' Democratic Party", acronym: "UPDP",
    registeredOn: "04 February, 1993",
    chairperson: "Twalib Ibrahim Kadege",
    secretaryGeneral: "Hamadi Mohamed Ibrahim",
    hqAddress: "House No. MCH/F.219, Garagara Rd, Mtoni Chemchem — Magharibi A, Unguja. P.O. Box 480",
    hqRegion: "Mjini Magharibi",
    phone: "0719 743403", email: "twalibkadege@gmail.com",
  },
  {
    no: 8, registrationNo: "0000009",
    name: "National Reconstruction Alliance", acronym: "NRA",
    registeredOn: "08 February, 1993",
    chairperson: "Khamis Faki Mgau",
    secretaryGeneral: "Hassan Kisabya Almas",
    hqAddress: "House No. 68, Kilwa/Mbagala Rd, Mtoni — Temeke, Dar es Salaam. P.O. Box 77146",
    hqRegion: "Dar es Salaam",
    phone: "0773 147208", email: "kisabya@gmail.com",
  },
  {
    no: 9, registrationNo: "00000011",
    name: "African Democratic Alliance Party", acronym: "ADA-TADEA",
    registeredOn: "05 April, 1993",
    chairperson: "Hon. Juma Ali Khatib",
    secretaryGeneral: "Saleh Msumari",
    hqAddress: "House No. 24, Tanga/Utete junction, Ilala Market — Dar es Salaam. P.O. Box 25400",
    hqRegion: "Dar es Salaam",
    phone: "0776 620062", email: "adatadea93@gmail.com",
  },
  {
    no: 10, registrationNo: "00000012",
    name: "Tanzania Labour Party", acronym: "TLP",
    registeredOn: "24 November, 1993",
    chairperson: "Richard Shadrack Lyimo",
    secretaryGeneral: "Yustus Mbatina Rwamugira",
    hqAddress: "House No. 10, Morogoro Rd, Magomeni Usalama — Kinondoni, Dar es Salaam. P.O. Box 90093",
    hqRegion: "Dar es Salaam",
    phone: "0788 181890", email: "labourparty1993@gmail.com",
  },
  {
    no: 11, registrationNo: "00000013",
    name: "United Democratic Party", acronym: "UDP",
    registeredOn: "24 March, 1994",
    chairperson: "John Momose Cheyo",
    secretaryGeneral: "Saum Hussein Rashid",
    hqAddress: "House No. 23, Mchangani St., Mwananyamala — Kinondoni, Dar es Salaam. P.O. Box 80857",
    hqRegion: "Dar es Salaam",
    phone: "0786 613723", email: "udpheadquarters@gmail.com",
  },
  {
    no: 12, registrationNo: "00000053",
    name: "Chama cha Demokrasia Makini", acronym: "MAKINI",
    registeredOn: "15 November, 2001",
    chairperson: "Coaster Jimmy Kibonde",
    secretaryGeneral: "Ameir Hassan Ameir",
    hqAddress: "House No. 74, Binti Kahenga, Karuni — Mabibo, Ubungo, Dar es Salaam. P.O. Box 10612",
    hqRegion: "Dar es Salaam",
    phone: "0717 910788", email: "demokrasiamakini@gmail.com",
  },
  {
    no: 13, registrationNo: "00000057",
    name: "Democratic Party", acronym: "DP",
    registeredOn: "07 June, 2002",
    chairperson: "Philipo John Fumbo",
    secretaryGeneral: "Abdul Juma Mluya",
    hqAddress: "Shop No. 50, Mburahati Rd, KIFA Football Grounds — Ubungo, Dar es Salaam. P.O. Box 10488",
    hqRegion: "Dar es Salaam",
    phone: "0769 506455", email: "democraticparty@gmail.com",
  },
  {
    no: 14, registrationNo: "00000066",
    name: "Sauti ya Umma", acronym: "SAU",
    registeredOn: "17 February, 2005",
    chairperson: "Bertha Nkango Mpata",
    secretaryGeneral: "Majalio Paul Kyara",
    hqAddress: "House No. 6, Geita/Kagera junction, Magomeni Kagera — Kinondoni, Dar es Salaam. P.O. Box 33928",
    hqRegion: "Dar es Salaam",
    phone: "0756 756032", email: "sautiyaumma@yahoo.com",
  },
  {
    no: 15, registrationNo: "00000067",
    name: "Alliance for African Farmers Party", acronym: "AAFP",
    registeredOn: "03 November, 2009",
    chairperson: "Said Soud Said",
    secretaryGeneral: "Rashid Ligania Rai",
    hqAddress: "House No. 11, Maunda St., Tandika — Temeke, Dar es Salaam. P.O. Box 42575",
    hqRegion: "Dar es Salaam",
    phone: "0777 477496", email: "saidsoud68@gmail.com",
  },
  {
    no: 16, registrationNo: "00000079",
    name: "Chama cha Kijamii", acronym: "CCK",
    registeredOn: "27 January, 2012",
    chairperson: "David Daudi Mwaijjojele",
    secretaryGeneral: "Masoud Ali Abdallah",
    hqAddress: "House No. 58, Azimio St., Ndogole — Mabibo, Ubungo, Dar es Salaam. P.O. Box 71383",
    hqRegion: "Dar es Salaam",
    phone: "0677 316032", email: "cckchamachakijamii@yahoo.com",
  },
  {
    no: 17, registrationNo: "00000080",
    name: "Alliance for Democratic Change", acronym: "ADC",
    registeredOn: "28 August, 2012",
    chairperson: "Shaban Haji Itutu",
    secretaryGeneral: "Mwalimu Hamad Azizi",
    hqAddress: "Nyumba 17, Magorofani, Buguruni Market — Ilala, Dar es Salaam. P.O. Box 25276",
    hqRegion: "Dar es Salaam",
    phone: "0682 122526", email: "adctanzania.info@gmail.com",
  },
  {
    no: 18, registrationNo: "00000081",
    name: "Chama cha Ukombozi wa Umma", acronym: "CHAUMMA",
    registeredOn: "04 June, 2013",
    chairperson: "Hashim Rungwe Spunda",
    secretaryGeneral: "Mohammed Masoud Rashid",
    hqAddress: "House No. 16, Kameruni Rd, Makumbusho Stendi — Kijitonyama, Kinondoni, Dar es Salaam. P.O. Box 34011",
    hqRegion: "Dar es Salaam",
    phone: "0754 387370", email: "chaumma@gmail.com",
  },
  {
    no: 19, registrationNo: "000000083",
    name: "Alliance for Change and Transparency", acronym: "ACT-Wazalendo",
    registeredOn: "05 May, 2014",
    chairperson: "Hon. Othman Masoud Othman",
    secretaryGeneral: "Ado Shaibu Ado",
    hqAddress: "House No. 12, Mbweni St., Magomeni Mwembechai — Ubungo, Dar es Salaam. P.O. Box 105043",
    hqRegion: "Dar es Salaam",
    phone: "0784 500862", email: "actwazalendo15@gmail.com", website: "www.act.or.tz",
  },
];

export function searchParties(query: string): PoliticalParty[] {
  const q = query.toLowerCase().trim();
  if (!q) return politicalParties;
  return politicalParties.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.acronym.toLowerCase().includes(q) ||
    p.registrationNo.includes(q) ||
    p.chairperson.toLowerCase().includes(q) ||
    p.secretaryGeneral.toLowerCase().includes(q) ||
    p.hqRegion.toLowerCase().includes(q)
  );
}
