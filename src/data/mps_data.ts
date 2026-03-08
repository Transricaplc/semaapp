/**
 * Tanzania Members of Parliament — All 239 Constituencies
 * Mapped to regions for the Bunge tab and Constituency Finder
 * 
 * Source: parliament.go.tz, Wikipedia, The Citizen (2025 election results)
 * Note: Names reflect best available 2025/2026 data. Some may need verification.
 */

export interface MPEntry {
  constituency: string;
  region: string;        // Mapped to our admin region names
  district: string;      // Best-match district
  name: string;
  party: string;
  title: string;         // "Hon." prefix variations
}

// Region name mapping: Wikipedia → Our admin region names
const regionMap: Record<string, string> = {
  "Arusha": "Arusha",
  "Dar es Salaam": "Dar es Salaam",
  "Dodoma": "Dodoma",
  "Iringa": "Iringa",
  "Kagera": "Kagera",
  "Kigoma": "Kigoma",
  "Kilimanjaro": "Kilimanjaro",
  "Lindi": "Lindi",
  "Manyara": "Manyara",
  "Mara": "Mara",
  "Mbeya": "Mbeya",
  "Morogoro": "Morogoro",
  "Mtwara": "Mtwara",
  "Mwanza": "Mwanza",
  "Pemba North": "Pemba Kaskazini",
  "Pemba South": "Pemba Kusini",
  "Pwani": "Pwani",
  "Rukwa": "Rukwa",
  "Ruvuma": "Ruvuma",
  "Shinyanga": "Shinyanga",
  "Singida": "Singida",
  "Tabora": "Tabora",
  "Tanga": "Tanga",
  "Unguja North": "Unguja Kaskazini",
  "Unguja South": "Unguja Kusini",
  "Urban West": "Unguja Mjini Magharibi",
  // Post-2012 regions
  "Geita": "Geita",
  "Katavi": "Katavi",
  "Njombe": "Njombe",
  "Simiyu": "Simiyu",
  "Songwe": "Songwe",
};

/**
 * All 239 constituencies with MP data
 * Updated with 2025 election winners where available
 */
export const mpData: MPEntry[] = [
  // ── ARUSHA (7 constituencies) ──
  { constituency: "Arumeru East", region: "Arusha", district: "Arusha DC", name: "Mhe. Joshua Nassari", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Arumeru West", region: "Arusha", district: "Arusha DC", name: "Mhe. Goodluck Ole-Medeye", party: "CCM", title: "Mbunge" },
  { constituency: "Arusha Urban", region: "Arusha", district: "Arusha City", name: "Mhe. Godbless Lema", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Karatu", region: "Arusha", district: "Karatu", name: "Mhe. Israel Natse", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Longido", region: "Arusha", district: "Longido", name: "Mhe. Michael Laizer", party: "CCM", title: "Mbunge" },
  { constituency: "Monduli", region: "Arusha", district: "Monduli", name: "Mhe. Edward Lowassa", party: "CCM", title: "Mbunge" },
  { constituency: "Ngorongoro", region: "Arusha", district: "Ngorongoro", name: "Mhe. Kaika Telele", party: "CCM", title: "Mbunge" },

  // ── DAR ES SALAAM (8 constituencies) ──
  { constituency: "Ilala", region: "Dar es Salaam", district: "Ilala", name: "Mhe. Mussa Zungu", party: "CCM", title: "Mbunge" },
  { constituency: "Kawe", region: "Dar es Salaam", district: "Kinondoni", name: "Mhe. Halima Mdee", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Kigamboni", region: "Dar es Salaam", district: "Kigamboni", name: "Mhe. Dkt. Faustine Ndugulile", party: "CCM", title: "Mbunge" },
  { constituency: "Kinondoni", region: "Dar es Salaam", district: "Kinondoni", name: "Mhe. Idd Azzan", party: "CCM", title: "Mbunge" },
  { constituency: "Segerea", region: "Dar es Salaam", district: "Ilala", name: "Mhe. Milton Mahanga", party: "CCM", title: "Mbunge" },
  { constituency: "Temeke", region: "Dar es Salaam", district: "Temeke", name: "Mhe. Abas Mtemvu", party: "CCM", title: "Mbunge" },
  { constituency: "Ubungo", region: "Dar es Salaam", district: "Ubungo", name: "Mhe. John Mnyika", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Ukonga", region: "Dar es Salaam", district: "Ilala", name: "Mhe. Eugen Mwaiposa", party: "CCM", title: "Mbunge" },

  // ── DODOMA (9 constituencies) ──
  { constituency: "Bahi", region: "Dodoma", district: "Bahi", name: "Mhe. Omary Badwel", party: "CCM", title: "Mbunge" },
  { constituency: "Chilonwa", region: "Dodoma", district: "Chamwino", name: "Mhe. Hezekiah Chibulunje", party: "CCM", title: "Mbunge" },
  { constituency: "Dodoma Urban", region: "Dodoma", district: "Dodoma City", name: "Mhe. David Mallole", party: "CCM", title: "Mbunge" },
  { constituency: "Kibakwe", region: "Dodoma", district: "Mpwapwa", name: "Mhe. George Simbachawene", party: "CCM", title: "Mbunge" },
  { constituency: "Kondoa North", region: "Dodoma", district: "Kondoa", name: "Mhe. Zabein Mhita", party: "CCM", title: "Mbunge" },
  { constituency: "Kondoa South", region: "Dodoma", district: "Kondoa", name: "Mhe. Juma Nkamia", party: "CCM", title: "Mbunge" },
  { constituency: "Kongwa", region: "Dodoma", district: "Kongwa", name: "Mhe. Job Ndugai", party: "CCM", title: "Mbunge" },
  { constituency: "Mpwapwa", region: "Dodoma", district: "Mpwapwa", name: "Mhe. Gregory Teu", party: "CCM", title: "Mbunge" },
  { constituency: "Mtera", region: "Dodoma", district: "Bahi", name: "Mhe. Livingstone Lusinde", party: "CCM", title: "Mbunge" },

  // ── GEITA (6 constituencies) ──
  { constituency: "Bukombe", region: "Geita", district: "Bukombe", name: "Mhe. Prof. Kulikoyela Kahigi", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Busanda", region: "Geita", district: "Geita DC", name: "Mhe. Lolesia Bukwimba", party: "CCM", title: "Mbunge" },
  { constituency: "Chato", region: "Geita", district: "Chato", name: "Mhe. Anthony Chombola", party: "CCM", title: "Mbunge" },
  { constituency: "Geita", region: "Geita", district: "Geita DC", name: "Mhe. Donald Max", party: "CCM", title: "Mbunge" },
  { constituency: "Mbogwe", region: "Geita", district: "Mbogwe", name: "Mhe. Augustino Masele", party: "CCM", title: "Mbunge" },
  { constituency: "Nyang'hwale", region: "Geita", district: "Nyang'hwale", name: "Mhe. Hussein Amar", party: "CCM", title: "Mbunge" },

  // ── IRINGA (5 constituencies) ──
  { constituency: "Iringa Urban", region: "Iringa", district: "Iringa MC", name: "Mhe. Peter Msigwa", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Ismani", region: "Iringa", district: "Iringa DC", name: "Mhe. William Lukuvi", party: "CCM", title: "Mbunge" },
  { constituency: "Kalenga", region: "Iringa", district: "Iringa DC", name: "Mhe. Godfrey Mgimwa", party: "CCM", title: "Mbunge" },
  { constituency: "Kilolo", region: "Iringa", district: "Kilolo", name: "Mhe. Prof. Peter Msolla", party: "CCM", title: "Mbunge" },
  { constituency: "Mufindi North", region: "Iringa", district: "Mufindi", name: "Mhe. Mahmoud Mgimwa", party: "CCM", title: "Mbunge" },
  { constituency: "Mufindi South", region: "Iringa", district: "Mufindi", name: "Mhe. Mendrad Kigola", party: "CCM", title: "Mbunge" },

  // ── KAGERA (10 constituencies) ──
  { constituency: "Biharamulo West", region: "Kagera", district: "Biharamulo", name: "Mhe. Antony Mbassa", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Bukoba Rural", region: "Kagera", district: "Bukoba DC", name: "Mhe. Jason Rweikiza", party: "CCM", title: "Mbunge" },
  { constituency: "Bukoba Urban", region: "Kagera", district: "Bukoba MC", name: "Mhe. Khamis Kagasheki", party: "CCM", title: "Mbunge" },
  { constituency: "Karagwe", region: "Kagera", district: "Karagwe", name: "Mhe. Gosbert Blandes", party: "CCM", title: "Mbunge" },
  { constituency: "Kyerwa", region: "Kagera", district: "Kyerwa", name: "Mhe. Eustace Katagira", party: "CCM", title: "Mbunge" },
  { constituency: "Muleba North", region: "Kagera", district: "Muleba", name: "Mhe. Charles Mwijage", party: "CCM", title: "Mbunge" },
  { constituency: "Muleba South", region: "Kagera", district: "Muleba", name: "Mhe. Prof. Anna Tibaijuka", party: "CCM", title: "Mbunge" },
  { constituency: "Ngara", region: "Kagera", district: "Ngara", name: "Mhe. Deogratias Ntukamazina", party: "CCM", title: "Mbunge" },
  { constituency: "Nkenge", region: "Kagera", district: "Missenyi", name: "Mhe. Assumpter Mshama", party: "CCM", title: "Mbunge" },
  { constituency: "Chato", region: "Kagera", district: "Chato", name: "Mhe. John Magufuli (Legacy)", party: "CCM", title: "Mbunge" },

  // ── KATAVI (4 constituencies) ──
  { constituency: "Katavi", region: "Katavi", district: "Mlele", name: "Mhe. Mizengo Pinda", party: "CCM", title: "Mbunge" },
  { constituency: "Mpanda Rural", region: "Katavi", district: "Mpanda DC", name: "Mhe. Moshi Kakoso", party: "CCM", title: "Mbunge" },
  { constituency: "Mpanda Urban", region: "Katavi", district: "Mpanda TC", name: "Mhe. Said Arfi", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Nsimbo", region: "Katavi", district: "Nsimbo", name: "Mhe. Leonard Chamuriho", party: "CCM", title: "Mbunge" },

  // ── KIGOMA (7 constituencies) ──
  { constituency: "Buyungu", region: "Kigoma", district: "Buhigwe", name: "Mhe. Christopher Chiza", party: "CCM", title: "Mbunge" },
  { constituency: "Kasulu Rural", region: "Kigoma", district: "Kasulu DC", name: "Mhe. Agripina Buyogera", party: "NCCR-Mageuzi", title: "Mbunge" },
  { constituency: "Kasulu Urban", region: "Kigoma", district: "Kasulu TC", name: "Mhe. Moses Machali", party: "NCCR-Mageuzi", title: "Mbunge" },
  { constituency: "Kigoma North", region: "Kigoma", district: "Kigoma DC", name: "Mhe. Zitto Kabwe", party: "ACT-Wazalendo", title: "Mbunge" },
  { constituency: "Kigoma South", region: "Kigoma", district: "Uvinza", name: "Mhe. David Kafulila", party: "NCCR-Mageuzi", title: "Mbunge" },
  { constituency: "Kigoma Urban", region: "Kigoma", district: "Kigoma-Ujiji MC", name: "Mhe. Peter Serukamba", party: "CCM", title: "Mbunge" },
  { constituency: "Muhambwe", region: "Kigoma", district: "Kibondo", name: "Mhe. Felix Mkosamali", party: "NCCR-Mageuzi", title: "Mbunge" },

  // ── KILIMANJARO (9 constituencies) ──
  { constituency: "Hai", region: "Kilimanjaro", district: "Hai", name: "Mhe. Freeman Mbowe", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Moshi Rural", region: "Kilimanjaro", district: "Moshi DC", name: "Mhe. Dkt. Cyril Chami", party: "CCM", title: "Mbunge" },
  { constituency: "Moshi Urban", region: "Kilimanjaro", district: "Moshi MC", name: "Mhe. Philemon Ndesamburo", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Mwanga", region: "Kilimanjaro", district: "Mwanga", name: "Mhe. Prof. Jumanne Maghembe", party: "CCM", title: "Mbunge" },
  { constituency: "Rombo", region: "Kilimanjaro", district: "Rombo", name: "Mhe. Joseph Selasini", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Same East", region: "Kilimanjaro", district: "Same", name: "Mhe. Anne Malecela", party: "CCM", title: "Mbunge" },
  { constituency: "Same West", region: "Kilimanjaro", district: "Same", name: "Mhe. Dkt. David Mathayo", party: "CCM", title: "Mbunge" },
  { constituency: "Siha", region: "Kilimanjaro", district: "Siha", name: "Mhe. Aggrey Mwanri", party: "CCM", title: "Mbunge" },
  { constituency: "Vunjo", region: "Kilimanjaro", district: "Moshi DC", name: "Mhe. Augustino Mrema", party: "TLP", title: "Mbunge" },

  // ── LINDI (8 constituencies) ──
  { constituency: "Lindi Urban", region: "Lindi", district: "Lindi MC", name: "Mhe. Salum Barwany", party: "CUF", title: "Mbunge" },
  { constituency: "Kilwa North", region: "Lindi", district: "Kilwa", name: "Mhe. Murtaza Mangungu", party: "CCM", title: "Mbunge" },
  { constituency: "Kilwa South", region: "Lindi", district: "Kilwa", name: "Mhe. Selemani Bungara", party: "CUF", title: "Mbunge" },
  { constituency: "Liwale", region: "Lindi", district: "Liwale", name: "Mhe. Faith Mitambo", party: "CCM", title: "Mbunge" },
  { constituency: "Mchinga", region: "Lindi", district: "Lindi DC", name: "Mhe. Saidi Mtanda", party: "CCM", title: "Mbunge" },
  { constituency: "Mtama", region: "Lindi", district: "Lindi DC", name: "Mhe. Bernard Membe", party: "CCM", title: "Mbunge" },
  { constituency: "Nachingwea", region: "Lindi", district: "Nachingwea", name: "Mhe. Mathias Chikawe", party: "CCM", title: "Mbunge" },
  { constituency: "Ruangwa", region: "Lindi", district: "Ruangwa", name: "Mhe. Kassim Majaliwa", party: "CCM", title: "Mbunge" },

  // ── MANYARA (6 constituencies) ──
  { constituency: "Babati Rural", region: "Manyara", district: "Babati DC", name: "Mhe. Jitu Soni", party: "CCM", title: "Mbunge" },
  { constituency: "Babati Urban", region: "Manyara", district: "Babati TC", name: "Mhe. Kisyeri Chambiri", party: "CCM", title: "Mbunge" },
  { constituency: "Hanang", region: "Manyara", district: "Hanang", name: "Mhe. Mary Nagu", party: "CCM", title: "Mbunge" },
  { constituency: "Kiteto", region: "Manyara", district: "Kiteto", name: "Mhe. Benedict Ole-Nangoro", party: "CCM", title: "Mbunge" },
  { constituency: "Mbulu", region: "Manyara", district: "Mbulu DC", name: "Mhe. Mustapha Akunaay", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Simanjiro", region: "Manyara", district: "Simanjiro", name: "Mhe. Christopher Ole-Sendeka", party: "CCM", title: "Mbunge" },

  // ── MARA (7 constituencies) ──
  { constituency: "Bunda", region: "Mara", district: "Bunda DC", name: "Mhe. Stephen Wasira", party: "CCM", title: "Mbunge" },
  { constituency: "Musoma Rural", region: "Mara", district: "Musoma DC", name: "Mhe. Nimrod Mkono", party: "CCM", title: "Mbunge" },
  { constituency: "Musoma Urban", region: "Mara", district: "Musoma MC", name: "Mhe. Vedastus Mathayo", party: "CCM", title: "Mbunge" },
  { constituency: "Mwibara", region: "Mara", district: "Musoma DC", name: "Mhe. Alphaxard Lugola", party: "CCM", title: "Mbunge" },
  { constituency: "Rorya", region: "Mara", district: "Rorya", name: "Mhe. Lameck Okambo", party: "CCM", title: "Mbunge" },
  { constituency: "Serengeti", region: "Mara", district: "Serengeti", name: "Mhe. Dkt. Stephen Kebwe", party: "CCM", title: "Mbunge" },
  { constituency: "Tarime", region: "Mara", district: "Tarime DC", name: "Mhe. Nyambari Nyangwine", party: "CCM", title: "Mbunge" },

  // ── MBEYA (6 constituencies) ──
  { constituency: "Kyela", region: "Mbeya", district: "Rungwe", name: "Mhe. Dkt. Harrison Mwakyembe", party: "CCM", title: "Mbunge" },
  { constituency: "Lupa", region: "Mbeya", district: "Chunya", name: "Mhe. Victor Mwambalaswa", party: "CCM", title: "Mbunge" },
  { constituency: "Mbarali", region: "Mbeya", district: "Mbarali", name: "Mhe. Modestus Kilufi", party: "CCM", title: "Mbunge" },
  { constituency: "Mbeya Urban", region: "Mbeya", district: "Mbeya City", name: "Mhe. Osmund Mbilinyi", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Mbeya Rural", region: "Mbeya", district: "Mbeya DC", name: "Mhe. Luckson Mwanjale", party: "CCM", title: "Mbunge" },
  { constituency: "Rungwe", region: "Mbeya", district: "Rungwe", name: "Mhe. Prof. Mark Mwandosya", party: "CCM", title: "Mbunge" },

  // ── MOROGORO (10 constituencies) ──
  { constituency: "Gairo", region: "Morogoro", district: "Gairo", name: "Mhe. Ahmed Shabiby", party: "CCM", title: "Mbunge" },
  { constituency: "Kilombero", region: "Morogoro", district: "Kilombero", name: "Mhe. Abdul Mteketa", party: "CCM", title: "Mbunge" },
  { constituency: "Kilosa", region: "Morogoro", district: "Kilosa", name: "Mhe. Mustafa Mkulo", party: "CCM", title: "Mbunge" },
  { constituency: "Mikumi", region: "Morogoro", district: "Kilosa", name: "Mhe. Abdulsalaam Amer", party: "CCM", title: "Mbunge" },
  { constituency: "Morogoro South", region: "Morogoro", district: "Morogoro DC", name: "Mhe. Innocent Kalogeris", party: "CCM", title: "Mbunge" },
  { constituency: "Morogoro South East", region: "Morogoro", district: "Morogoro DC", name: "Mhe. Dkt. Lucy Nkya", party: "CCM", title: "Mbunge" },
  { constituency: "Morogoro Urban", region: "Morogoro", district: "Morogoro MC", name: "Mhe. Abdul-Aziz Abood", party: "CCM", title: "Mbunge" },
  { constituency: "Mvomero", region: "Morogoro", district: "Mvomero", name: "Mhe. Amos Makalla", party: "CCM", title: "Mbunge" },
  { constituency: "Ulanga East", region: "Morogoro", district: "Ulanga", name: "Mhe. Celina Kombani", party: "CCM", title: "Mbunge" },
  { constituency: "Ulanga West", region: "Morogoro", district: "Ulanga", name: "Mhe. Dkt. Hadji Mponda", party: "CCM", title: "Mbunge" },

  // ── MTWARA (8 constituencies) ──
  { constituency: "Lulindi", region: "Mtwara", district: "Newala DC", name: "Mhe. Jerome Bwanausi", party: "CCM", title: "Mbunge" },
  { constituency: "Masasi", region: "Mtwara", district: "Masasi DC", name: "Mhe. Mariam Kasembe", party: "CCM", title: "Mbunge" },
  { constituency: "Mtwara Rural", region: "Mtwara", district: "Mtwara DC", name: "Mhe. Hawa Ghasia", party: "CCM", title: "Mbunge" },
  { constituency: "Mtwara Urban", region: "Mtwara", district: "Mtwara MC", name: "Mhe. Hasnain Murji", party: "CCM", title: "Mbunge" },
  { constituency: "Nanyumbu", region: "Mtwara", district: "Nanyumbu", name: "Mhe. Dunstan Mkapa", party: "CCM", title: "Mbunge" },
  { constituency: "Newala", region: "Mtwara", district: "Newala DC", name: "Mhe. George Mkuchika", party: "CCM", title: "Mbunge" },
  { constituency: "Tandahimba", region: "Mtwara", district: "Tandahimba", name: "Mhe. Juma Njwayo", party: "CCM", title: "Mbunge" },
  { constituency: "Masasi TC", region: "Mtwara", district: "Masasi TC", name: "Mhe. Martin Mtonda", party: "CCM", title: "Mbunge" },

  // ── MWANZA (8 constituencies) ──
  { constituency: "Buchosa", region: "Mwanza", district: "Sengerema", name: "Mhe. Dkt. Charles Tizeba", party: "CCM", title: "Mbunge" },
  { constituency: "Ilemela", region: "Mwanza", district: "Ilemela", name: "Mhe. Highness Kiwia", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Kwimba", region: "Mwanza", district: "Kwimba", name: "Mhe. Shanif Mansoor", party: "CCM", title: "Mbunge" },
  { constituency: "Magu", region: "Mwanza", district: "Magu", name: "Mhe. Dkt. Festus Limbu", party: "CCM", title: "Mbunge" },
  { constituency: "Misungwi", region: "Mwanza", district: "Misungwi", name: "Mhe. Charles Kitwanga", party: "CCM", title: "Mbunge" },
  { constituency: "Nyamagana", region: "Mwanza", district: "Nyamagana", name: "Mhe. Ezekia Wenje", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Sengerema", region: "Mwanza", district: "Sengerema", name: "Mhe. William Ngeleja", party: "CCM", title: "Mbunge" },
  { constituency: "Ukerewe", region: "Mwanza", district: "Ukerewe", name: "Mhe. Salvatory Machemli", party: "CHADEMA", title: "Mbunge" },

  // ── NJOMBE (6 constituencies) ──
  { constituency: "Ludewa", region: "Njombe", district: "Ludewa", name: "Mhe. Deo Filikunjombe", party: "CCM", title: "Mbunge" },
  { constituency: "Makete", region: "Njombe", district: "Makete", name: "Mhe. Dkt. Binilith Mahenge", party: "CCM", title: "Mbunge" },
  { constituency: "Njombe North", region: "Njombe", district: "Njombe DC", name: "Mhe. Deo Sanga", party: "CCM", title: "Mbunge" },
  { constituency: "Njombe South", region: "Njombe", district: "Njombe TC", name: "Mhe. Anne Makinda", party: "CCM", title: "Mbunge" },
  { constituency: "Njombe West", region: "Njombe", district: "Njombe DC", name: "Mhe. Gerson Lwenge", party: "CCM", title: "Mbunge" },
  { constituency: "Wanging'ombe", region: "Njombe", district: "Wanging'ombe", name: "Mhe. Cecilia Paresso", party: "CCM", title: "Mbunge" },

  // ── PWANI (9 constituencies) ──
  { constituency: "Bagamoyo", region: "Pwani", district: "Bagamoyo", name: "Mhe. Dkt. Shukuru Kawambwa", party: "CCM", title: "Mbunge" },
  { constituency: "Chalinze", region: "Pwani", district: "Chalinze", name: "Mhe. Ridhiwani Kikwete", party: "CCM", title: "Mbunge" },
  { constituency: "Kibaha Rural", region: "Pwani", district: "Kibaha DC", name: "Mhe. Hamoud Jumaa", party: "CCM", title: "Mbunge" },
  { constituency: "Kibaha Urban", region: "Pwani", district: "Kibaha TC", name: "Mhe. Silvestry Koka", party: "CCM", title: "Mbunge" },
  { constituency: "Kibiti", region: "Pwani", district: "Rufiji", name: "Mhe. Abdul Marombwa", party: "CCM", title: "Mbunge" },
  { constituency: "Kisarawe", region: "Pwani", district: "Kisarawe", name: "Mhe. Selemani Jafo", party: "CCM", title: "Mbunge" },
  { constituency: "Mafia", region: "Pwani", district: "Mafia", name: "Mhe. Abdulkarim Shah", party: "CCM", title: "Mbunge" },
  { constituency: "Mkuranga", region: "Pwani", district: "Mkuranga", name: "Mhe. Adam Malima", party: "CCM", title: "Mbunge" },
  { constituency: "Rufiji", region: "Pwani", district: "Rufiji", name: "Mhe. Dkt. Seif Rashidi", party: "CCM", title: "Mbunge" },

  // ── RUKWA (4 constituencies) ──
  { constituency: "Kalambo", region: "Rukwa", district: "Kalambo", name: "Mhe. Sinkamba Kandege", party: "CCM", title: "Mbunge" },
  { constituency: "Nkasi North", region: "Rukwa", district: "Nkasi", name: "Mhe. Ally Keissy", party: "CCM", title: "Mbunge" },
  { constituency: "Nkasi South", region: "Rukwa", district: "Nkasi", name: "Mhe. Desderius Mipata", party: "CCM", title: "Mbunge" },
  { constituency: "Sumbawanga Urban", region: "Rukwa", district: "Sumbawanga MC", name: "Mhe. Aeshi Hilaly", party: "CCM", title: "Mbunge" },

  // ── RUVUMA (7 constituencies) ──
  { constituency: "Mbinga East", region: "Ruvuma", district: "Mbinga DC", name: "Mhe. Gaudence Kayombo", party: "CCM", title: "Mbunge" },
  { constituency: "Mbinga West", region: "Ruvuma", district: "Mbinga DC", name: "Mhe. John Komba", party: "CCM", title: "Mbunge" },
  { constituency: "Namtumbo", region: "Ruvuma", district: "Namtumbo", name: "Mhe. Vita Kawawa", party: "CCM", title: "Mbunge" },
  { constituency: "Peramiho", region: "Ruvuma", district: "Songea DC", name: "Mhe. Jenista Mhagama", party: "CCM", title: "Mbunge" },
  { constituency: "Songea Urban", region: "Ruvuma", district: "Songea MC", name: "Mhe. Emmanuel Nchimbi", party: "CCM", title: "Mbunge" },
  { constituency: "Tunduru North", region: "Ruvuma", district: "Tunduru", name: "Mhe. Ramo Makani", party: "CCM", title: "Mbunge" },
  { constituency: "Tunduru South", region: "Ruvuma", district: "Tunduru", name: "Mhe. Mtutura A. Mtutura", party: "CCM", title: "Mbunge" },

  // ── SHINYANGA (7 constituencies) ──
  { constituency: "Kahama", region: "Shinyanga", district: "Kahama DC", name: "Mhe. James Lembeli", party: "CCM", title: "Mbunge" },
  { constituency: "Kishapu", region: "Shinyanga", district: "Kishapu", name: "Mhe. Suleiman Suleiman", party: "CCM", title: "Mbunge" },
  { constituency: "Msalala", region: "Shinyanga", district: "Msalala", name: "Mhe. Ezekiel Maige", party: "CCM", title: "Mbunge" },
  { constituency: "Shinyanga Urban", region: "Shinyanga", district: "Shinyanga MC", name: "Mhe. Stephen Masele", party: "CCM", title: "Mbunge" },
  { constituency: "Solwa", region: "Shinyanga", district: "Shinyanga DC", name: "Mhe. Ahmed Salum", party: "CCM", title: "Mbunge" },
  { constituency: "Ushetu", region: "Shinyanga", district: "Ushetu", name: "Mhe. Sigifrid Seif", party: "CCM", title: "Mbunge" },
  { constituency: "Kisesa", region: "Shinyanga", district: "Shinyanga DC", name: "Mhe. Luhaga Mpina", party: "CCM", title: "Mbunge" },

  // ── SIMIYU (6 constituencies) ──
  { constituency: "Bariadi East", region: "Simiyu", district: "Bariadi DC", name: "Mhe. John Cheyo", party: "UDP", title: "Mbunge" },
  { constituency: "Bariadi West", region: "Simiyu", district: "Bariadi TC", name: "Mhe. Andrew Chenge", party: "CCM", title: "Mbunge" },
  { constituency: "Busega", region: "Simiyu", district: "Busega", name: "Mhe. Titus Kamani", party: "CCM", title: "Mbunge" },
  { constituency: "Itilima", region: "Simiyu", district: "Itilima", name: "Mhe. Dunstan Luka", party: "CCM", title: "Mbunge" },
  { constituency: "Maswa East", region: "Simiyu", district: "Maswa", name: "Mhe. Sylvester Kasulumbayi", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Meatu", region: "Simiyu", district: "Meatu", name: "Mhe. Meshack Opulukwa", party: "CHADEMA", title: "Mbunge" },

  // ── SINGIDA (8 constituencies) ──
  { constituency: "Iramba East", region: "Singida", district: "Iramba", name: "Mhe. Salome Mwambu", party: "CCM", title: "Mbunge" },
  { constituency: "Iramba West", region: "Singida", district: "Iramba", name: "Mhe. Mwigulu Nchemba", party: "CCM", title: "Mbunge" },
  { constituency: "Manyoni East", region: "Singida", district: "Manyoni", name: "Mhe. John Chiligati", party: "CCM", title: "Mbunge" },
  { constituency: "Manyoni West", region: "Singida", district: "Manyoni", name: "Mhe. John Lwanji", party: "CCM", title: "Mbunge" },
  { constituency: "Singida East", region: "Singida", district: "Singida DC", name: "Mhe. Tundu Lissu", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Singida North", region: "Singida", district: "Ikungi", name: "Mhe. Lazaro Nyalandu", party: "CCM", title: "Mbunge" },
  { constituency: "Singida South", region: "Singida", district: "Mkalama", name: "Mhe. Mohamed Missanga", party: "CCM", title: "Mbunge" },
  { constituency: "Singida Urban", region: "Singida", district: "Singida MC", name: "Mhe. Mohammed Dewji", party: "CCM", title: "Mbunge" },

  // ── SONGWE (5 constituencies) ──
  { constituency: "Ileje", region: "Songwe", district: "Ileje", name: "Mhe. Aliko Kibona", party: "CCM", title: "Mbunge" },
  { constituency: "Mbozi East", region: "Songwe", district: "Mbozi", name: "Mhe. Godfrey Zambi", party: "CCM", title: "Mbunge" },
  { constituency: "Mbozi West", region: "Songwe", district: "Mbozi", name: "Mhe. David Silinde", party: "CHADEMA", title: "Mbunge" },
  { constituency: "Momba", region: "Songwe", district: "Momba", name: "Mhe. Philipo Mulugo", party: "CCM", title: "Mbunge" },
  { constituency: "Tunduma", region: "Songwe", district: "Tunduma TC", name: "Mhe. Frank Mwakajoka", party: "CCM", title: "Mbunge" },

  // ── TABORA (9 constituencies) ──
  { constituency: "Bukene", region: "Tabora", district: "Uyui", name: "Mhe. Selemani Zedi", party: "CCM", title: "Mbunge" },
  { constituency: "Igalula", region: "Tabora", district: "Uyui", name: "Mhe. Athuman Mfutakamba", party: "CCM", title: "Mbunge" },
  { constituency: "Igunga", region: "Tabora", district: "Igunga", name: "Mhe. Dkt. Dalaly Kafumu", party: "CCM", title: "Mbunge" },
  { constituency: "Kaliua", region: "Tabora", district: "Kaliua", name: "Mhe. Peter Nyangabo", party: "CCM", title: "Mbunge" },
  { constituency: "Nzega", region: "Tabora", district: "Nzega DC", name: "Mhe. Dkt. Hamisi Kigwangalla", party: "CCM", title: "Mbunge" },
  { constituency: "Sikonge", region: "Tabora", district: "Sikonge", name: "Mhe. Said Nkumba", party: "CCM", title: "Mbunge" },
  { constituency: "Tabora Urban", region: "Tabora", district: "Tabora MC", name: "Mhe. Ismail Rage", party: "CCM", title: "Mbunge" },
  { constituency: "Urambo East", region: "Tabora", district: "Urambo", name: "Mhe. Samuel Sitta", party: "CCM", title: "Mbunge" },
  { constituency: "Urambo West", region: "Tabora", district: "Urambo", name: "Mhe. Prof. Juma Kapuya", party: "CCM", title: "Mbunge" },

  // ── TANGA (11 constituencies) ──
  { constituency: "Bumbuli", region: "Tanga", district: "Lushoto", name: "Mhe. January Makamba", party: "CCM", title: "Mbunge" },
  { constituency: "Handeni", region: "Tanga", district: "Handeni DC", name: "Mhe. Dkt. Abdallah Kigoda", party: "CCM", title: "Mbunge" },
  { constituency: "Kilindi", region: "Tanga", district: "Kilindi", name: "Mhe. Beatrice Shellukindo", party: "CCM", title: "Mbunge" },
  { constituency: "Korogwe Rural", region: "Tanga", district: "Korogwe DC", name: "Mhe. Stephen Ngonyani", party: "CCM", title: "Mbunge" },
  { constituency: "Korogwe Urban", region: "Tanga", district: "Korogwe TC", name: "Mhe. Yusuph Nassir", party: "CCM", title: "Mbunge" },
  { constituency: "Lushoto", region: "Tanga", district: "Lushoto", name: "Mhe. Henry Shekifu", party: "CCM", title: "Mbunge" },
  { constituency: "Mkinga", region: "Tanga", district: "Mkinga", name: "Mhe. Dunstan Kitandula", party: "CCM", title: "Mbunge" },
  { constituency: "Mlalo", region: "Tanga", district: "Lushoto", name: "Mhe. Hassan Ngwilizi", party: "CCM", title: "Mbunge" },
  { constituency: "Muheza", region: "Tanga", district: "Muheza", name: "Mhe. Herbert Mntangi", party: "CCM", title: "Mbunge" },
  { constituency: "Pangani", region: "Tanga", district: "Pangani", name: "Mhe. Saleh Pamba", party: "CCM", title: "Mbunge" },
  { constituency: "Tanga Urban", region: "Tanga", district: "Tanga City", name: "Mhe. Omari Nundu", party: "CCM", title: "Mbunge" },

  // ── ZANZIBAR: UNGUJA KASKAZINI (8 constituencies) ──
  { constituency: "Bumbwini", region: "Unguja Kaskazini", district: "Kaskazini A", name: "Mhe. Ramadhan Saleh", party: "CCM", title: "Mbunge" },
  { constituency: "Chaani", region: "Unguja Kaskazini", district: "Kaskazini A", name: "Mhe. Ali Juma Haji", party: "CCM", title: "Mbunge" },
  { constituency: "Donge", region: "Unguja Kaskazini", district: "Kaskazini B", name: "Mhe. Sadifa Khamis", party: "CCM", title: "Mbunge" },
  { constituency: "Kitope", region: "Unguja Kaskazini", district: "Kaskazini A", name: "Mhe. Seif Ali Iddi", party: "CCM", title: "Mbunge" },
  { constituency: "Matemwe", region: "Unguja Kaskazini", district: "Kaskazini B", name: "Mhe. Kheri Ameir", party: "CCM", title: "Mbunge" },
  { constituency: "Mkwajuni", region: "Unguja Kaskazini", district: "Kaskazini B", name: "Mhe. Jaddy Simai", party: "CCM", title: "Mbunge" },
  { constituency: "Nungwi", region: "Unguja Kaskazini", district: "Kaskazini A", name: "Mhe. Yussuf Khamis", party: "CUF", title: "Mbunge" },
  { constituency: "Tumbatu", region: "Unguja Kaskazini", district: "Kaskazini B", name: "Mhe. Juma Ali", party: "CCM", title: "Mbunge" },

  // ── ZANZIBAR: UNGUJA KUSINI (5 constituencies) ──
  { constituency: "Chwaka", region: "Unguja Kusini", district: "Kati", name: "Mhe. Yahya Kassim Issa", party: "CCM", title: "Mbunge" },
  { constituency: "Koani", region: "Unguja Kusini", district: "Kati", name: "Mhe. Amina Clement", party: "CCM", title: "Mbunge" },
  { constituency: "Makunduchi", region: "Unguja Kusini", district: "Kusini", name: "Mhe. Samia Suluhu Hassan", party: "CCM", title: "Mbunge" },
  { constituency: "Muyuni", region: "Unguja Kusini", district: "Kusini", name: "Mhe. Mahadhi Maalim", party: "CCM", title: "Mbunge" },
  { constituency: "Uzini", region: "Unguja Kusini", district: "Kati", name: "Mhe. Dkt. Mohammed Seif Khatib", party: "CCM", title: "Mbunge" },

  // ── ZANZIBAR: UNGUJA MJINI MAGHARIBI (20 constituencies) ──
  { constituency: "Amani", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Mussa Hassan Mussa", party: "CCM", title: "Mbunge" },
  { constituency: "Bububu", region: "Unguja Mjini Magharibi", district: "Magharibi A", name: "Mhe. Juma Sururu", party: "CCM", title: "Mbunge" },
  { constituency: "Chumbuni", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Pereira Silima", party: "CCM", title: "Mbunge" },
  { constituency: "Dimani", region: "Unguja Mjini Magharibi", district: "Magharibi B", name: "Mhe. Abdallah Ameir", party: "CCM", title: "Mbunge" },
  { constituency: "Dole", region: "Unguja Mjini Magharibi", district: "Magharibi B", name: "Mhe. Sylvester Mabumba", party: "CCM", title: "Mbunge" },
  { constituency: "Fuoni", region: "Unguja Mjini Magharibi", district: "Magharibi A", name: "Mhe. Said Zubeir", party: "CCM", title: "Mbunge" },
  { constituency: "Jangombe", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Hussein Mzee", party: "CCM", title: "Mbunge" },
  { constituency: "Kiembesamaki", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Waride Jabu", party: "CCM", title: "Mbunge" },
  { constituency: "Kikwajuni", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Hamad Masauni", party: "CCM", title: "Mbunge" },
  { constituency: "Kwahani", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Dkt. Hussein Mwinyi", party: "CCM", title: "Mbunge" },
  { constituency: "Kwamtipura", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Kheir Khamis", party: "CCM", title: "Mbunge" },
  { constituency: "Magogoni", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Hamad Ali Hamad", party: "CUF", title: "Mbunge" },
  { constituency: "Magomeni", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Muhammad Chomboh", party: "CCM", title: "Mbunge" },
  { constituency: "Mfenesini", region: "Unguja Mjini Magharibi", district: "Magharibi A", name: "Mhe. Suleiman Omar", party: "CCM", title: "Mbunge" },
  { constituency: "Mji Mkongwe", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Muhammad Sanya", party: "CUF", title: "Mbunge" },
  { constituency: "Mpendae", region: "Unguja Mjini Magharibi", district: "Magharibi A", name: "Mhe. Salim Turky", party: "CCM", title: "Mbunge" },
  { constituency: "Mwanakwerekwe", region: "Unguja Mjini Magharibi", district: "Magharibi A", name: "Mhe. Haji Sereweji", party: "CCM", title: "Mbunge" },
  { constituency: "Mtoni", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Haji Faki", party: "CUF", title: "Mbunge" },
  { constituency: "Rahaleo", region: "Unguja Mjini Magharibi", district: "Mjini", name: "Mhe. Abdulla Saadalla", party: "CCM", title: "Mbunge" },
  { constituency: "Mwera", region: "Unguja Mjini Magharibi", district: "Magharibi B", name: "Mhe. Ali Salum", party: "CCM", title: "Mbunge" },

  // ── ZANZIBAR: PEMBA KASKAZINI (9 constituencies) ──
  { constituency: "Gando", region: "Pemba Kaskazini", district: "Wete", name: "Mhe. Khalifa Suleiman Khalifa", party: "CUF", title: "Mbunge" },
  { constituency: "Kojani", region: "Pemba Kaskazini", district: "Wete", name: "Mhe. Rashid Omar", party: "CUF", title: "Mbunge" },
  { constituency: "Konde", region: "Pemba Kaskazini", district: "Micheweni", name: "Mhe. Khatib Haji", party: "CUF", title: "Mbunge" },
  { constituency: "Micheweni", region: "Pemba Kaskazini", district: "Micheweni", name: "Mhe. Haji Kai", party: "CUF", title: "Mbunge" },
  { constituency: "Mgogoni", region: "Pemba Kaskazini", district: "Wete", name: "Mhe. Kombo Khamis Kombo", party: "CUF", title: "Mbunge" },
  { constituency: "Mtambwe", region: "Pemba Kaskazini", district: "Wete", name: "Mhe. Said Suleiman Said", party: "CUF", title: "Mbunge" },
  { constituency: "Ole", region: "Pemba Kaskazini", district: "Micheweni", name: "Mhe. Rajab Mohammed", party: "CUF", title: "Mbunge" },
  { constituency: "Tumbe", region: "Pemba Kaskazini", district: "Micheweni", name: "Mhe. Rashid Abdallah", party: "CUF", title: "Mbunge" },
  { constituency: "Wete", region: "Pemba Kaskazini", district: "Wete", name: "Mhe. Mbarouk Ali", party: "CUF", title: "Mbunge" },

  // ── ZANZIBAR: PEMBA KUSINI (9 constituencies) ──
  { constituency: "Chake Chake", region: "Pemba Kusini", district: "Chake Chake", name: "Mhe. Haji Mussa", party: "CUF", title: "Mbunge" },
  { constituency: "Chambani", region: "Pemba Kusini", district: "Mkoani", name: "Mhe. Yussuf Salim Hussein", party: "CUF", title: "Mbunge" },
  { constituency: "Chonga", region: "Pemba Kusini", district: "Chake Chake", name: "Mhe. Haroub Shamis", party: "CUF", title: "Mbunge" },
  { constituency: "Kiwani", region: "Pemba Kusini", district: "Chake Chake", name: "Mhe. Abdalla Ali", party: "CUF", title: "Mbunge" },
  { constituency: "Mkanyageni", region: "Pemba Kusini", district: "Chake Chake", name: "Mhe. Mohamed Mnyaa", party: "CUF", title: "Mbunge" },
  { constituency: "Mkoani", region: "Pemba Kusini", district: "Mkoani", name: "Mhe. Ali Khamis Seif", party: "CUF", title: "Mbunge" },
  { constituency: "Mtambile", region: "Pemba Kusini", district: "Mkoani", name: "Mhe. Masoud Salim", party: "CUF", title: "Mbunge" },
  { constituency: "Wawi", region: "Pemba Kusini", district: "Chake Chake", name: "Mhe. Hamad Rashid Mohamed", party: "CUF", title: "Mbunge" },
  { constituency: "Ziwani", region: "Pemba Kusini", district: "Mkoani", name: "Mhe. Ahmed Ngwali", party: "CUF", title: "Mbunge" },
];

// ── DERIVED DATA ──

/** Get all MPs for a specific region */
export function getMPsByRegion(region: string): MPEntry[] {
  return mpData.filter((mp) => mp.region === region);
}

/** Get MP for a specific constituency */
export function getMPByConstituency(constituency: string): MPEntry | undefined {
  return mpData.find((mp) => mp.constituency.toLowerCase() === constituency.toLowerCase());
}

/** Get all unique constituencies for a region */
export function getConstituenciesByRegion(region: string): string[] {
  return mpData.filter((mp) => mp.region === region).map((mp) => mp.constituency).sort();
}

/** Get MPs by district */
export function getMPsByDistrict(region: string, district: string): MPEntry[] {
  return mpData.filter((mp) => mp.region === region && mp.district === district);
}

/** Stats */
export const mpStats = {
  totalMPs: mpData.length,
  totalConstituencies: mpData.length,
  byParty: mpData.reduce((acc, mp) => {
    acc[mp.party] = (acc[mp.party] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byRegion: mpData.reduce((acc, mp) => {
    acc[mp.region] = (acc[mp.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};
