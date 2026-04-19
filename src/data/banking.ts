/**
 * Tanzania Banking Institutions
 * - bankingCEOs: Top executives at major commercial banks
 * - botRegisteredBanks: BOT-registered commercial banks (with HQ contacts)
 * - bureauxDeChange: BOT-licensed Bureau de Change operators
 * Source: Bank of Tanzania (BOT) — bot.go.tz
 */

export interface BankingCEO {
  id: string;
  name: string;
  position: string;
  organization: string;
  category: "Banking_CEOs";
}

export interface BotBank {
  id: string;
  name: string;          // contact person
  organization: string;  // institution name
  phone: string;
  email: string;
  address: string;
}

export interface BureauDeChange {
  id: string;
  name: string;
  region: string;
  address: string;
}

export const bankingCEOs: BankingCEO[] = [
  { id: "bank-crdb", name: "Abdulmajid Mussa Nsekela", position: "Group CEO & Managing Director", organization: "CRDB Bank", category: "Banking_CEOs" },
  { id: "bank-nmb", name: "Ruth Zaipuna", position: "Managing Director & CEO", organization: "NMB Bank", category: "Banking_CEOs" },
  { id: "bank-nbc", name: "Theobald Sabi", position: "Managing Director", organization: "NBC (National Bank of Commerce)", category: "Banking_CEOs" },
  { id: "bank-exim", name: "Jaffari Matundu", position: "Chief Executive Officer", organization: "Exim Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-stanbic", name: "Manzi Rwegasira", position: "Chief Executive Officer", organization: "Stanbic Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-dtb", name: "Lilian Mbassy Awinja", position: "Managing Director", organization: "DTB (Diamond Trust Bank)", category: "Banking_CEOs" },
  { id: "bank-equity", name: "Jackson Minja", position: "Managing Director", organization: "Equity Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-absa", name: "Abdi Mohamed", position: "Managing Director", organization: "Absa Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-kcb", name: "Richard Sobir Gillyon", position: "Managing Director", organization: "KCB Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-scb", name: "Sanjay Rughani", position: "CEO", organization: "Standard Chartered Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-tib", name: "Sabasaba Moshingi", position: "Managing Director", organization: "TIB (Tanzania Investment Bank)", category: "Banking_CEOs" },
  { id: "bank-pbz", name: "Hafidh Khalil Ali", position: "Managing Director", organization: "PBZ (People's Bank of Zanzibar)", category: "Banking_CEOs" },
  { id: "bank-azania", name: "Dunstan Mhando", position: "Managing Director", organization: "Azania Bank", category: "Banking_CEOs" },
  { id: "bank-bot", name: "Emmanuel Tutuba", position: "Governor", organization: "Bank of Tanzania (BOT)", category: "Banking_CEOs" },
];

/** BOT-registered commercial banks NOT already in bankingCEOs. Source: bot.go.tz */
export const botRegisteredBanks: BotBank[] = [
  { id: "bot-united-bank-for-africa-tanzania-limited", name: "Olugbenga Makinde", organization: "United Bank For Africa Tanzania Limited", phone: "+255 22 286 4468", email: "customerservicetz@ubagroup.com", address: "P. O. Box 80514, Dar Es Salaam" },
  { id: "bot-ecobank-tanzania-limited", name: "Mr. Charles Asiedu", organization: "Ecobank Tanzania Limited", phone: "+255 22 213 7447", email: "ecobank@ecobank.co.tz", address: "P. O. Box 20500, Dar Es Salaam" },
  { id: "bot-mkombozi-commercial-bank-plc", name: "Mr. Respige Kimati", organization: "Mkombozi Commercial Bank PLC", phone: "+255 22 213 7806", email: "info@mkombozibank.co.tz", address: "P. O. Box 38448, Dar Es Salaam" },
  { id: "bot-canara-bank-tanzania-limited", name: "Tanjore Balaji Rao", organization: "Canara Bank Tanzania Limited", phone: "+255 22 211 2530-3", email: "mdcbtl@canarabank.co.tz", address: "P. O. Box 491, Dar Es Salaam" },
  { id: "bot-bank-of-baroda-tanzania-limited", name: "Aditya Narayan Singh", organization: "Bank Of Baroda Tanzania Limited", phone: "+255 22 212 4472", email: "md.tanzania@bankofbaroda.com", address: "P. O. Box 5356, Dar Es Salaam" },
  { id: "bot-bank-of-africa-tanzania-limited", name: "Ms. Esther Cecil Maruma", organization: "Bank Of Africa Tanzania Limited", phone: "+255 22 211 0104", email: "marketing@boatanzania.com", address: "P. O. Box 3054, Dar Es Salaam" },
  { id: "bot-habib-african-bank-limited", name: "Dr. Hassan S. Rizvi", organization: "Habib African Bank Limited", phone: "+255 22 211 1107", email: "info@habibafricanbank.co.tz", address: "P. O. Box 70086, Dar Es Salaam" },
  { id: "bot-akiba-commercial-bank-plc", name: "Mr. Sylivester Arumasi", organization: "Akiba Commercial Bank PLC", phone: "+255 22 211 8430-7", email: "info@acbtz.co.tz", address: "P. O. Box 669, Dar Es Salaam" },
  { id: "bot-ncba-bank-tanzania-limited", name: "Claver Serumaga", organization: "Ncba Bank Tanzania Limited", phone: "+255 22 229 5000", email: "tanzaniainfo@nic-bank.com", address: "P. O. Box 20268, Dar Es Salaam" },
  { id: "bot-international-commercial-bank-tanzania-ltd", name: "Mr. Gan Poh Beng", organization: "International Commercial Bank Tanzania LTD", phone: "+255 22 215 0361-2", email: "pohbeng.gan@icbank.co.tz", address: "P. O. Box 9362, Dar Es Salaam" },
  { id: "bot-i-m-bank-tanzania-limited", name: "Zahid Mustafa", organization: "I & M Bank Tanzania Limited", phone: "+255 22 212 7330-4", email: "customercare@imbank.co.tz", address: "P.o. Box 1509, Dar Es Salaam" },
  { id: "bot-access-bank-tanzania-ltd", name: "Mr. Imani John Bgoya", organization: "Access Bank Tanzania LTD", phone: "+255 22 211 9422", email: "info@bancabc.co.tz", address: "P.o. Box 31, Dar Es Salaam" },
  { id: "bot-peoples-bank-of-zanzibar-limited", name: "Mr. Arafat Ali Haji", organization: "Peoples Bank Of Zanzibar Limited", phone: "+255 24 223 1118-20", email: "info@pbzbank.co.tz", address: "P. O. Box 1173, Zanzibar" },
  { id: "bot-citibank-tanzania-limited", name: "Geofrey Daniel Mchangila", organization: "Citibank Tanzania Limited", phone: "255 22 211 1200", email: "info@citibank.co.tz", address: "P.o.box 71625, Dar Es Salaam" },
  { id: "bot-tanzania-commercial-bank-plc", name: "Mr. Adam Mihayo", organization: "Tanzania Commercial Bank PLC", phone: "+255 22 216 2940", email: "info@tpbbank.co.tz", address: "P. O. Box 9300, Dar Es Salaam" },
  { id: "bot-letshego-faidika-bank-tanzania-limited", name: "Mr Baraka Munisi", organization: "Letshego Faidika Bank Tanzania Limited", phone: "+255 22 240 1174-6", email: "info.tz@letshego.com", address: "P. O. Box 34459, Dar Es Salaam" },
  { id: "bot-amana-bank-limited", name: "Abubakar Athman Ali", organization: "Amana Bank Limited", phone: "+255 22 212 9007-8", email: "info@amanabank.co.tz", address: "P. O. Box 9771, Dar Es Salaam" },
  { id: "bot-mwalimu-commercial-bank-plc", name: "Richard Makungwa", organization: "Mwalimu Commercial Bank PLC", phone: "+255 22 277 5131", email: "info@mcb.co.tz", address: "P. O. Box 61002, Dar Es Salaam" },
  { id: "bot-guaranty-trust-bank-tanzania-limited", name: "Ms. Beatrice Njau", organization: "Guaranty Trust Bank Tanzania Limited", phone: "+255 22 277 2533", email: "beatrice.njau@gtbank.co.tz", address: "P. O. Box 31111, Dar Es Salaam" },
  { id: "bot-china-dasheng-bank-limited", name: "Cheng Ji", organization: "China Dasheng Bank Limited", phone: "+255 22 212 7586", email: "info@cdbbank.co.tz", address: "P. O. Box 388, Dar Es Salaam" },
  { id: "bot-dcb-commercial-bank-plc", name: "Mr. Sabasaba Moshingi", organization: "Dcb Commercial Bank PLC", phone: "+255 22 217 2200-1", email: "info@dcb.co.tz", address: "P. O. Box 19798, Dar Es Salaam" },
  { id: "bot-bank-of-india-tanzania-limited", name: "Mr. Antaryami Sarangi", organization: "Bank Of India Tanzania Limited", phone: "+255 22 213 5358", email: "boitanzania@bankofindia.co.in", address: "P. O. Box 7581, Dar Es Salaam" },
  { id: "bot-mwanga-hakika-bank-ltd", name: "Mr. Jagjit Singh", organization: "Mwanga Hakika Bank LTD", phone: "+255 747 666 511", email: "info@mhbbank.co.tz", address: "P. O. Box 11735, Dar Es Salaam" },
];

/** BOT-licensed Bureaux de Change. Source: bot.go.tz */
export const bureauxDeChange: BureauDeChange[] = [
  { id: "bdc-posta-bureau-de-change", name: "Posta Bureau De Change", region: "Dar es Salaam", address: "POSTA HOUSE  PLOT N0.687-GHANA /OHIO ST" },
  { id: "bdc-kadoo-bureau-de-change-limited-samora-branch", name: "Kadoo Bureau De Change Limited - Samora Branch", region: "Dar es Salaam", address: "NHC HOUSE, SAMORA STREET  DAR ES SALAAM" },
  { id: "bdc-posta-bureau-de-change-limited-zanzibar-branc", name: "Posta Bureau De Change Limited - Zanzibar Branch", region: "Kaskazini Unguj", address: "SHANGANI POSTA OFFICE-STONE TOWN" },
  { id: "bdc-kadoo-bureau-de-change-sinza-branch", name: "Kadoo Bureau De Change-sinza Branch", region: "Dar es Salaam", address: "Plot No. 30, BLOCK D,EMIRATE HSE SINZA MADUKANI" },
  { id: "bdc-kadoo-bdc-samora-branch-no-2", name: "Kadoo Bdc Samora Branch No. 2", region: "Dar es Salaam", address: "Morogoro/ India street Plot 1036/102" },
  { id: "bdc-kadoo-bdc-mlimani-city-branch-no-2", name: "Kadoo Bdc Mlimani City Branch No. 2", region: "Dar es Salaam", address: "MLIMANI CITY MALL SHOP 14 A" },
  { id: "bdc-kadoo-bdc-namanga-branch", name: "Kadoo Bdc Namanga Branch", region: "Dar es Salaam", address: "NAMANGA DAR ES SALAAM" },
  { id: "bdc-kadoo-bdc-masaki-branch", name: "Kadoo Bdc Masaki Branch", region: "Dar es Salaam", address: "HAILE SELASSIE/ MAKANGIRA STREET" },
  { id: "bdc-posta-bdc-arusha-hpo", name: "Posta Bdc Arusha Hpo", region: "Arusha", address: "CLOCK TOWER ARUSHA HEAD  POST OFFICE" },
  { id: "bdc-posta-bdc-marangu-branch", name: "Posta Bdc Marangu Branch", region: "Kilimanjaro", address: "MARANGU MTONI KILIMANJARO 0754 587199" },
  { id: "bdc-posta-bdc-mbeya-branch", name: "Posta Bdc Mbeya Branch", region: "Mbeya", address: "LUPA MBEYA POST OFFICE" },
  { id: "bdc-posta-bdc-namanga-branch", name: "Posta Bdc Namanga Branch", region: "Arusha", address: "NAMANGA POST OFFICE" },
  { id: "bdc-posta-bdc-meru-branch", name: "Posta Bdc Meru Branch", region: "Arusha", address: "MERU POST OFFICE" },
  { id: "bdc-posta-bdc-airport-terminal-2", name: "Posta Bdc Airport Terminal 2", region: "Dar es Salaam", address: "AIRPORT TERMINAL 2" },
  { id: "bdc-posta-bdc-zanzibar-airport", name: "Posta Bdc Zanzibar Airport", region: "Mjini Magharibi", address: "ZANZIBAR AIRPORT" },
  { id: "bdc-posta-bdc-terminal-3-airport", name: "Posta Bdc Terminal 3 Airport", region: "Dar es Salaam", address: "AIRPORT TERMINAL 3" },
  { id: "bdc-posta-bdc-tunduma-branch", name: "Posta Bdc Tunduma Branch", region: "Songwe", address: "TUNDUMA POST OFFICE" },
  { id: "bdc-posta-bdc-moshi-branch", name: "Posta Bdc Moshi Branch", region: "Kilimanjaro", address: "RENGUA MOSHI" },
  { id: "bdc-posta-bdc-dodoma-branch", name: "Posta Bdc Dodoma Branch", region: "Dodoma", address: "DODOMA HEAD POST OFFICE" },
  { id: "bdc-posta-bdc-libya-street", name: "Posta Bdc Libya Street", region: "Dar es Salaam", address: "LIBYA POST OFFICE  LIBYA STREET" },
  { id: "bdc-posta-bdc-sokoine-branch", name: "Posta Bdc Sokoine Branch", region: "Dar es Salaam", address: "SOKOINE POST OFFICE  SOKOINE DRIVE" },
  { id: "bdc-posta-bdc-sokoine-kariakoo-branch", name: "Posta Bdc Sokoine Kariakoo Branch", region: "Dar es Salaam", address: "KARIAKOO POST OFFICE  MKUNGUNI STREET" },
  { id: "bdc-kadoo-bureau-de-change-sikukuu-branch", name: "Kadoo Bureau De Change Sikukuu Branch", region: "Dar es Salaam", address: "Sikukuu / Narung'ombe street  Kariakoo  Dar es salaam" },
  { id: "bdc-fast-forex-bureau-limited", name: "Fast Forex Bureau Limited", region: "Dar es Salaam", address: "Plot 53/2 Confort Building, Uhuru/Livingstone" },
  { id: "bdc-posta-bureau-kigoma-branch", name: "Posta Bureau Kigoma Branch", region: "Kigoma", address: "KASSIM MAJALIWA ROAD RUZOKA STREET TEL 06769946078" },
  { id: "bdc-kadoo-bureau-de-change-uhuru-branch", name: "Kadoo Bureau De Change Uhuru Branch", region: "Dar es Salaam", address: "AMAZING BUREAU UHURU & LIVINGSTONE" },
  { id: "bdc-kadoo-bdc-arusha-branch", name: "Kadoo Bdc Arusha Branch", region: "Arusha", address: "SOKOINE ROAD PLOT 58/E APT NO. 003" },
  { id: "bdc-kadoo-bureau-de-change-limited-morocco-branch", name: "Kadoo Bureau De Change Limited - Morocco Branch", region: "Dar es Salaam", address: "Morocco Square" },
  { id: "bdc-posta-bdc-kijangwani-branch", name: "Posta Bdc Kijangwani Branch", region: "Mjini Magharibi", address: "Kijangwani Head Post Office - Unguja" },
  { id: "bdc-kadoo-bureaude-change-mwanza-branch", name: "Kadoo Bureaude Change Mwanza Branch", region: "Mwanza", address: "New Mwanza Hotel Building Posta Road, Nyamagana" },
  { id: "bdc-karen-bureau-de-change", name: "Karen Bureau De Change", region: "Dar es Salaam", address: "Riki Hotel  Plot 37 Block 76 Kleist Sykes street  Kariakoo" },
  { id: "bdc-kadoo-bdc-narung-ombe-branch", name: "Kadoo Bdc Narung'ombe Branch", region: "Dar es Salaam", address: "Narung'ombe street, Kariakoo Dar es salaam" },
  { id: "bdc-optimum-rates-bureau-de-change-oysterbay-bran", name: "Optimum Rates Bureau De Change Oysterbay Branch", region: "Dar es Salaam", address: "Plot No. 42 at Oysterbay Haile Selassie rd, Dar es Salaam." },
  { id: "bdc-kadoo-bureau-de-change-kijitonyama-branch", name: "Kadoo Bureau De Change - Kijitonyama Branch", region: "Dar es Salaam", address: "Dar Village Near Kijitonyama Traffic Lights, Kinondoni district, Dar es Salaam Region." },
  { id: "bdc-kadoo-bureau-de-change-moshi-branch", name: "Kadoo Bureau De Change - Moshi Branch", region: "Kilimanjaro", address: "Boma  Road, Moshi Kilimanjaro" },
  { id: "bdc-kadoo-bureau-de-change-arusha-tfa-branch", name: "Kadoo Bureau De Change- Arusha Tfa Branch", region: "Arusha", address: "TFA Building, Sokoine Rd Arusha" },
  { id: "bdc-kadoo-bureau-de-change-mkunguni-branch", name: "Kadoo Bureau De Change Mkunguni Branch", region: "Mbeya", address: "MBEYA" },
  { id: "bdc-kadoo-bureau-de-change-karatu-branch", name: "Kadoo Bureau De Change Karatu Branch", region: "Arusha", address: "KARATU" },
  { id: "bdc-kadoo-bureau-de-change-dodoma-branch", name: "Kadoo Bureau De Change Dodoma Branch", region: "Dodoma", address: "NEAR DODOMA CITY HOTEL IN DODOMA" },
  { id: "bdc-asamia-bureau-de-change-investment-company-li", name: "Asamia Bureau De Change Investment Company Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-limited-mugumu-branch", name: "Marangu Forex Bureau Limited Mugumu Branch", region: "Mara", address: "MUGUMU MARA REGION" },
  { id: "bdc-stallion-xchange-forex-bureau", name: "Stallion Xchange Forex Bureau", region: "Dar es Salaam", address: "DAR ES SALAAM KINONDONI HAILE SALASSIE ROAD PLOT NO 476 BLOCK B P.O.BOX 8527 DSM" },
  { id: "bdc-kadoo-bureau-de-change-paje-branch", name: "Kadoo Bureau De Change Paje Branch", region: "Kaskazini Unguj", address: "PAJE ZAZNIBAR" },
  { id: "bdc-kadoo-bureau-de-change-nungwi-branch", name: "Kadoo Bureau De Change Nungwi Branch", region: "Kaskazini Unguj", address: "NUNGWI ZANZIBAR" },
  { id: "bdc-kadoo-bureau-de-change-kiwengwa-branch", name: "Kadoo Bureau De Change Kiwengwa Branch", region: "Kaskazini Unguj", address: "KIWENGWA ZANZIBAR" },
  { id: "bdc-furaha-safari-bureau-de-change", name: "Furaha Safari Bureau De Change", region: "Mjini Magharibi", address: "MLANDEGE ZANZIBAR NERA MLANDGE TRAFFIC LIGHTS" },
  { id: "bdc-furaha-safari-bureau-paje-branch", name: "Furaha Safari Bureau-paje Branch", region: "Kusini Unguja", address: "PAJE ROUNF ABOUT AREA ZANZIBAR" },
  { id: "bdc-fast-forex-bureau-de-change-msimbazi-branch", name: "Fast Forex Bureau De Change-msimbazi Branch", region: "Dar es Salaam", address: "Kariakoo,Msimbazi Street near Big Born Petrol Station." },
  { id: "bdc-fast-forex-bureau-limited-zanaki-branch", name: "Fast Forex Bureau Limited-zanaki Branch", region: "Dar es Salaam", address: "SAMAORA, Zanaki Street" },
  { id: "bdc-mcsoms-bureau-de-change-limited", name: "Mcsoms Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-stallion-forex-xchange-bureau-limited-mikoche", name: "Stallion Forex Xchange Bureau Limited-mikocheni Branch", region: "Dar es Salaam", address: "Dar es salaam" },
  { id: "bdc-marangu-forex-bureau-goliondoi-branch", name: "Marangu Forex Bureau - Goliondoi Branch", region: "Arusha", address: "ARUSHA" },
  { id: "bdc-vinmar-bureau-de-change-limited", name: "Vinmar Bureau De Change Limited", region: "Kilimanjaro", address: "MOSHI-KILIMANJARO" },
  { id: "bdc-sanya-bureau-de-change-limited", name: "Sanya Bureau De Change Limited", region: "Arusha", address: "PLOT NO. 5 ALONGSIDE SOKOINE ROAD, ARUSHA" },
  { id: "bdc-zena-bureau-de-change-limited", name: "Zena Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-al-bashash-bureau-de-change-company-limited", name: "Al Bashash Bureau De Change Company Limited", region: "Mjini Magharibi", address: "Airport, Mjini magharibi, P.O.BOX 3964, Zanzibar." },
  { id: "bdc-furaha-safari-bureau-de-change-jamhuri-branch", name: "Furaha Safari Bureau De Change Jamhuri Branch", region: "Dar es Salaam", address: "JAMHURI ILALA DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-limited-samora-b-branch", name: "Marangu Forex Bureau Limited Samora \\"b\\" Branch", region: "Dar es Salaam", address: "Grand Casino Building, Samora Street, Ilala District, Dar es Salaam." },
  { id: "bdc-firdaus-forex-bureau-de-change-limited", name: "Firdaus Forex Bureau De Change Limited", region: "Dar es Salaam", address: "Plot no. 3, Istiqama building, Lumumba street, Ilala, Dar es salaam" },
  { id: "bdc-rashid-tani-bureau-de-change", name: "Rashid Tani Bureau De Change", region: "Kusini Unguja", address: "Darajani a?? Mchangan Urban West Zanzibar" },
  { id: "bdc-oldstone-t-limited", name: "Oldstone (t) Limited", region: "Dar es Salaam", address: "PLOT 170/171 JANGWANI BEACH, AFRICANA ROAD, KUNDUCHI, DAR ES SALAAM" },
  { id: "bdc-duluti-bureau-de-change-goliondoi-branch", name: "Duluti Bureau De Change Goliondoi Branch", region: "Arusha", address: "India Street,  House no. 3 Goliondoi, Arusha CBD, Arusha" },
  { id: "bdc-suma-bureau-de-change-smc-private-limited", name: "Suma Bureau De Change (smc-private) Limited", region: "Mjini Magharibi", address: "Building No.2470 Darajani Street Mjini Magharibi, Zanzibar.  P.O.BOX 3784 ZANZIBAR." },
  { id: "bdc-al-mouj-forex-bureau-limited", name: "Al Mouj Forex Bureau Limited", region: "Dar es Salaam", address: "Mkunguni Street, Kariakoo, Ilala, Dar es Salaam,  P.O. Box 16144." },
  { id: "bdc-melia-serengeti-lodge", name: "Melia Serengeti Lodge", region: "Mara", address: "P.O.BOX 1184 SERENGETI MARA" },
  { id: "bdc-kasuku-bureau-de-change-limited", name: "Kasuku Bureau De Change Limited", region: "Shinyanga", address: "Business centre, Kahama." },
  { id: "bdc-lenox-bureau-de-change-limited-msimbazi-branc", name: "Lenox Bureau De Change Limited - Msimbazi Branch", region: "Dar es Salaam", address: "Building Tres House Plot No. 236, Mwenge, Kinondoni, Dar es salaam, P O BOX 35641 DAR ES SALAAM" },
  { id: "bdc-furaha-safari-bureau-darajani-souk-branch", name: "Furaha Safari Bureau-darajani Souk Branch", region: "Mjini Magharibi", address: "Darajani Souk Area Abeid Aman Karume Gate BLOCK B 11 â€˜Aâ€™" },
  { id: "bdc-fast-forex-bureau-limited-kisutu-branch", name: "Fast Forex Bureau Limited -kisutu Branch", region: "Dar es Salaam", address: "LIBYA STREET, KISUTU DAR ES SALAAM." },
  { id: "bdc-stallion-xchange-forex-bureau-zanzibar-branch", name: "Stallion Xchange Forex Bureau - Zanzibar Branch", region: "Kusini Unguja", address: "ARSHNOOR SHIRAZ MUKHI P.O.BOX 8527 DAR ES SALAAM 0755032229" },
  { id: "bdc-fast-forex-bureau-limited-paje-branch", name: "Fast Forex Bureau Limited- Paje Branch", region: "Kusini Unguja", address: "Paje opposite Jambiani Road." },
  { id: "bdc-vee-bureau-de-change-limited", name: "Vee Bureau De Change Limited", region: "Arusha", address: "indian street, Metropole in Arusha. P.O. Box 887," },
  { id: "bdc-timiro-forex-bureau-limited", name: "Timiro Forex Bureau Limited", region: "Dar es Salaam", address: "POBOX 100049, DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-limited-kiwengwa-branch", name: "Marangu Forex Bureau Limited Kiwengwa Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-al-bashash-bureau-de-change-company-limited-p", name: "Al Bashash Bureau De Change Company Limited-paje Branch", region: "Mjini Magharibi", address: "AIRPORT, MJINI MAGHARIBI P.O.BOX 3964, ZANZIBAR." },
  { id: "bdc-papa-faru-bureau-de-change-limited", name: "Papa Faru Bureau De Change Limited", region: "Dar es Salaam", address: "Msasani Village, Kinondoni district in Dar es salaam." },
  { id: "bdc-cocomaster-bureau-de-change-limited", name: "Cocomaster Bureau De Change Limited", region: "Dar es Salaam", address: "Building Number 41, Plot Number 2229. Zanaki Street, Ilala CBD, Dar es Salaam" },
  { id: "bdc-nano-bureau-de-change-limited", name: "Nano Bureau De Change Limited", region: "Dar es Salaam", address: "MBEZI BEACH, JANGWANI PLAZA, KINONDONI, DAR ES SALAAM." },
  { id: "bdc-fast-forex-bureau-limited-shangani-branch", name: "Fast Forex Bureau Limited-shangani Branch", region: "Mjini Magharibi", address: "SHANGANI STREET, ZANZIBAR" },
  { id: "bdc-l-s-forex-bureau-limited", name: "L & S Forex Bureau Limited", region: "Dar es Salaam", address: "PLOT 1003 BLOCK J TEGETA BAGAMOYO ROAD P.O.BOX 33832 DAR ES SALAAM" },
  { id: "bdc-farizal-forex-bureau-limited", name: "Farizal Forex Bureau Limited.", region: "Dar es Salaam", address: "PLOT NUMBER 152, MCHAFUKOGE/SAMORA STREET, ILALA DISTRICT, DAR ES SALAAM." },
  { id: "bdc-ok-bureau-de-change-limited", name: "Ok Bureau De Change Limited", region: "Dar es Salaam", address: "MBEZI BEACH PLAZA KINONDONI DISTRICT DAR ES SALAAM" },
  { id: "bdc-exponential-bureau-de-change-limited", name: "Exponential Bureau De Change Limited", region: "Dar es Salaam", address: "MKUNGUNI STREET KARIKAOO DAR ES SALAAM" },
  { id: "bdc-whitesands-hotel-limited", name: "Whitesands Hotel Limited", region: "Dar es Salaam", address: "JANGWANI STREET KINONDONI DISTRICT DAR ES SALAAM" },
  { id: "bdc-ick-tz-bureau-de-change-limited", name: "Ick(tz) Bureau De Change Limited", region: "Dar es Salaam", address: "Dar es salaam" },
  { id: "bdc-congo-bureau-de-change-limited", name: "Congo Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-kadoo-bureau-de-change-usa-river-branch", name: "Kadoo Bureau De Change-usa River Branch", region: "Arusha", address: "Usa River near Himo Road. ARUSHA." },
  { id: "bdc-rafiki-forex-bureau-limited", name: "Rafiki Forex Bureau Limited", region: "Dar es Salaam", address: "House Number 20. Block 16, Garden/Ohio Street, Kisutu, Ilala CBD Dar es Salaam." },
  { id: "bdc-okinawa-forex-bureau-limited", name: "Okinawa Forex Bureau Limited", region: "Dar es Salaam", address: "Haidery Plaza Ilala CBD Kisutu Street Ilala, P.O. Box 45728, Dar es salaam" },
  { id: "bdc-sanya-bureau-de-change-limited-kisongo-branch", name: "Sanya Bureau De Change Limited - Kisongo Branch", region: "Arusha", address: "Kisongo Arusha" },
  { id: "bdc-timiro-forex-bureau-limited-terminal-3-branch", name: "Timiro Forex Bureau Limited-terminal 3 Branch", region: "Dar es Salaam", address: "P.O.BOX 10049 DAR ES SALAAM" },
  { id: "bdc-freedom-bureau-de-change-limited", name: "Freedom Bureau De Change Limited", region: "Dar es Salaam", address: "Oysterbay, Kinondoni district Dar es Salaam" },
  { id: "bdc-genoson-bureau-de-change-limited", name: "Genoson Bureau De Change Limited", region: "Dar es Salaam", address: "Ilala City Centre, Indragand Street." },
  { id: "bdc-kadoo-bureau-de-change-kunduchi-branch", name: "Kadoo Bureau De Change-kunduchi Branch", region: "Dar es Salaam", address: "Kunduchi Mall, along Sala Sala, Dar es salaam." },
  { id: "bdc-fast-forex-bureau-de-change-sea-cliff-branch", name: "Fast Forex Bureau De Change- Sea Cliff Branch", region: "Dar es Salaam", address: "SEA CLIFF, DAR ES SALAAM." },
  { id: "bdc-marangu-forex-bureau-limited-usa-river-branch", name: "Marangu Forex Bureau Limited-usa River Branch", region: "Arusha", address: "ROTTADAM PLAZA BUILDING, USA RIVER STREET, MERU DISTRICT, ARUSHA." },
  { id: "bdc-fareed-bureau-de-change-limited-namanga-branc", name: "Fareed Bureau De Change Limited - Namanga Branch", region: "Dar es Salaam", address: "KINONDONI MUNICIPAL" },
  { id: "bdc-hotel-sea-cliff-limited", name: "Hotel Sea Cliff Limited", region: "Dar es Salaam", address: "MASAKI,KINONDONI, DAR ES SALAAM." },
  { id: "bdc-kibo-palace-hotel", name: "Kibo Palace Hotel", region: "Arusha", address: "Uzunguni Street Arusha Municipal Council Arusha." },
  { id: "bdc-lashku-forex-bureau-limited", name: "Lashku Forex Bureau Limited", region: "Arusha", address: "Building No 10 (Aim mall), Plot No 165, Burka Street, Arusha District. P.O.BOX 8357 ARUSHA" },
  { id: "bdc-all-season-bureau-de-change-limited-moshi-bra", name: "All Season Bureau De Change Limited-moshi Branch", region: "Kilimanjaro", address: "P.O.BOX 1037 ARUSHA" },
  { id: "bdc-kadoo-bureau-de-change-ubungo-branch", name: "Kadoo Bureau De Change - Ubungo Branch", region: "Dar es Salaam", address: "EACL Centre, Ubungo Dar es Salaam" },
  { id: "bdc-total-90-bureau-de-change-limited", name: "Total 90 Bureau De Change Limited", region: "Dar es Salaam", address: "P.O.Box 5297, Mtava street,  changombe ward,  Temeke district, Dar es salaam." },
  { id: "bdc-l-s-forex-bureau-limited-masaki-branch", name: "L & S Forex Bureau Limited Masaki Branch", region: "Dar es Salaam", address: "THERRY HOUSE PLOT 1003, BLOCK J TEGETA BAGAMOYO ROAD P.O.BOX 33832 DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-limited-aim-branch", name: "Marangu Forex Bureau Limited-aim Branch", region: "Arusha", address: "Aim Mall building, Majengo ya Chini street, Arusha City" },
  { id: "bdc-sanya-bureau-de-change-karatu-branch", name: "Sanya Bureau De Change - Karatu Branch", region: "Arusha", address: "PLOT 1353 BLOCK G, BUILDING 1002 TFA ROAD, KARATU, ARUSHA" },
  { id: "bdc-fareed-bureau-de-change-limited-serena-branch", name: "Fareed Bureau De Change Limited - Serena Branch", region: "Dar es Salaam", address: "KINONDONI MUNICIPAL" },
  { id: "bdc-abumusa-forex-bureau-de-change-limited", name: "Abumusa Forex Bureau De Change Limited", region: "Dar es Salaam", address: "Ali Hassan Mwinyi Street, Ilala District, Dar es Salaam" },
  { id: "bdc-serena-forex-bureau-limited", name: "Serena Forex Bureau Limited", region: "Dar es Salaam", address: "Mlalakuwa Road, Kinondoni District, Dar es Salaam" },
  { id: "bdc-sanya-bureau-de-change-mto-wa-mbu-branch", name: "Sanya Bureau De Change - Mto Wa Mbu Branch", region: "Arusha", address: "Mto wa mbu, Monduli, Arusha." },
  { id: "bdc-d-k-bureau-de-change-limited", name: "D.k Bureau De Change Limited", region: "Kusini Unguja", address: "P. O. Box 32, DARAJANI ZANZIBAR." },
  { id: "bdc-posta-bdc-kigamboni-branch", name: "Posta Bdc Kigamboni Branch", region: "Dar es Salaam", address: "KIGAMBONI POST OFFICE NEAR FERRY" },
  { id: "bdc-morning-star-bureau-de-change-paje-branch", name: "Morning Star Bureau De Change -paje Branch", region: "Kaskazini Unguj", address: "Near by Paje Round Paje, Paje, Zanzibar." },
  { id: "bdc-swiftex-bureau-de-change-limited", name: "Swiftex Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-amal-bureau-de-change-limited", name: "Amal Bureau De Change Limited", region: "Mjini Magharibi", address: "Darajani-Mchangani Street Urban, P.O.BOX 1739, Urban West Zanzibar" },
  { id: "bdc-galaxy-forex-bureau-limited", name: "Galaxy Forex Bureau Limited", region: "Dar es Salaam", address: "Address: P.O.BOX 21219 DAR ES SALAAM" },
  { id: "bdc-gran-melia-arusha", name: "Gran Melia Arusha", region: "Arusha", address: "Plot 77, Simeon Road,  Arusha city council,  Arusha." },
  { id: "bdc-all-season-bureau-de-change-limited-karatu-br", name: "All Season Bureau De Change Limited-karatu Branch", region: "Arusha", address: "P.O.BOX 1037 ARUSHA" },
  { id: "bdc-blink-bureau-de-change-limited", name: "Blink Bureau De Change Limited", region: "Arusha", address: "Plot no 3, Commercial Area, Goliondoi street, Arusha, Near Exim Bank" },
  { id: "bdc-lenox-bureau-de-change-limited-magila-branch", name: "Lenox Bureau De Change Limited-magila Branch", region: "Dar es Salaam", address: "Building Tres House Plot No. 236, Mwenge Kinondoni, Dar es salaam P O BOX 35641 DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-karatu-branch", name: "Marangu Forex Bureau-karatu Branch", region: "Arusha", address: "NGORONGORO ROAD,UCHUMI COMMERCIAL BUILDING, KARATU. ARUSHA" },
  { id: "bdc-marangu-forex-bureau-moshi-branch", name: "Marangu Forex Bureau-moshi Branch", region: "Kilimanjaro", address: "KILIMANJARO BUILDING, MALINDI STREET, MOSHI, KILIMANJARO" },
  { id: "bdc-z-l-bureau-de-change-limited", name: "Z&l Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-bwana-ni-mwema-bureau-de-change-ltd", name: "Bwana Ni Mwema Bureau De Change LTD", region: "Shinyanga", address: "SHINYANGA" },
  { id: "bdc-darajani-bureau-de-change-limited", name: "Darajani Bureau De Change Limited", region: "Mjini Magharibi", address: "P.O.BOX 2250 DARAJANI ZANZIBAR" },
  { id: "bdc-furaha-safari-bureau-de-change-limited-clock-", name: "Furaha Safari Bureau De Change Limited - Clock Tower - Arusha", region: "Mjini Magharibi", address: "Zanzibar" },
  { id: "bdc-furaha-safari-bureau-de-change-mkunazini-bran", name: "Furaha Safari Bureau De Change Mkunazini Branch", region: "Mjini Magharibi", address: "MKUNAZI ZANZIBAR" },
  { id: "bdc-marangu-forex-bureau-sable-square-branch", name: "Marangu Forex Bureau Sable Square Branch", region: "Arusha", address: "Ngaramtoni ya Chini Street Sable Square Building in Arusha" },
  { id: "bdc-marangu-forex-bureau-limited-jambiani-branch", name: "Marangu Forex Bureau Limited Jambiani Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-new-kariakoo-forex-bureau-limited", name: "New Kariakoo Forex Bureau Limited", region: "Dar es Salaam", address: "Dar es Salaam" },
  { id: "bdc-duluti-bureau-de-change-limited", name: "Duluti Bureau De Change Limited", region: "Arusha", address: "Joel Maeda street, Plot No. 50, National Housing Cooperation  (NHC), Arusha City Council" },
  { id: "bdc-karen-bureau-de-change-magila-branch", name: "Karen Bureau De Change - Magila Branch", region: "Dar es Salaam", address: "RIKI HOTEL,  PLOT 37,  BLOCK SYSKES STREET,  KARIAKOO." },
  { id: "bdc-stallion-xchange-forex-bureau-mbezi-branch", name: "Stallion Xchange Forex Bureau - Mbezi Branch", region: "Dar es Salaam", address: "ARSHNOOR SHIRAZ MUKHI P.O.BOX 8527 DAR ES SALAAM 0755032229" },
  { id: "bdc-tarakea-bureau-de-change-limited", name: "Tarakea Bureau De Change Limited", region: "Kilimanjaro", address: "Building no. 49B Mbomai  Tarakea,Rombo,   P.O.BOX 3041, Kilimanjaro" },
  { id: "bdc-farizal-forex-bureau-de-change-limited-chole", name: "Farizal Forex Bureau De Change Limited - Chole", region: "Dar es Salaam", address: "CHOLE MASAKI DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-palm-village-branch", name: "Marangu Forex Bureau Palm Village Branch", region: "Dar es Salaam", address: "PALM VILLAGE SHOPPING MALL MIKOCHENI KINONDONI DISTRICT DAR ES SALAAM" },
  { id: "bdc-marangu-forex-bureau-limited-forodhani-branch", name: "Marangu Forex Bureau Limited Forodhani Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-marangu-forex-bureau-limited-nungwi-a-branch", name: "Marangu Forex Bureau Limited Nungwi \\"a\\" Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-karen-bureau-de-change-msimbazi-branch", name: "Karen Bureau De Change-msimbazi Branch", region: "Dar es Salaam", address: "Msimbazi,  Kariakoo Dar es Salaam." },
  { id: "bdc-fareed-bureau-de-change-limited", name: "Fareed Bureau De Change Limited", region: "Dar es Salaam", address: "KINONDONI MUNICIPAL" },
  { id: "bdc-fast-forex-bureau-limited-darajani-branch", name: "Fast Forex Bureau Limited-darajani Branch", region: "Mjini Magharibi", address: "DARAJANI STREET, ZANZIBAR." },
  { id: "bdc-karen-bureau-de-change-sikukuu-branch", name: "Karen Bureau De Change-sikukuu Branch", region: "Dar es Salaam", address: "RIKI HOTEL  PLOT37, BLOCK 76 KLEST SYSKES STREET KARIAKOO" },
  { id: "bdc-morning-star-bureau-de-change-limited", name: "Morning Star Bureau De Change Limited", region: "Kaskazini Unguj", address: "ZANZIBAR" },
  { id: "bdc-all-season-bureau-de-change-limited", name: "All Season Bureau De Change Limited", region: "Arusha", address: "ARUSHA" },
  { id: "bdc-marangu-forex-bureau-limited-nungwi-b-branch", name: "Marangu Forex Bureau Limited Nungwi \\"b\\" Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-marangu-forex-bureau-limited-paje-branch", name: "Marangu Forex Bureau Limited Paje Branch", region: "Arusha", address: "P.O.BOX 1037 Arusha" },
  { id: "bdc-coinex-bureau-de-change-limited", name: "Coinex Bureau De Change Limited", region: "Dar es Salaam", address: "P.O. Box 5297 Dar es Salaam" },
  { id: "bdc-lenox-bureau-de-change-limited", name: "Lenox Bureau De Change Limited", region: "Dar es Salaam", address: "DAR ES SALAAM" },
  { id: "bdc-al-bashash-bureau-de-change-company-limited-n", name: "Al Bashash Bureau De Change Company Limited-nungwi Branch", region: "Mjini Magharibi", address: "AIRPORT,MJINI MAGHARIBI, P.O.BOX 3964, ZANZIBAR." },
  { id: "bdc-al-bashash-bureau-de-change-company-limited-s", name: "Al Bashash Bureau De Change Company Limited-shangani Branch", region: "Mjini Magharibi", address: "AIRPORT,MJINI MAGHARIBI P.O.BOX 3964, ZANZIBAR" },
  { id: "bdc-southern-sun-hotels-tanzania-limited", name: "Southern Sun Hotels (tanzania) Limited", region: "Dar es Salaam", address: "Plot no. 217-220, block 35, Ilala district, Dar  es Salaam." },
  { id: "bdc-saanature-forex-bureau-limited", name: "Saanature Forex Bureau Limited", region: "Arusha", address: "GOLIONDOI, ARUSHA URBAN DISTRICT" },
  { id: "bdc-marangu-forex-bureau-limited", name: "Marangu Forex Bureau Limited", region: "Arusha", address: "ARUSHA" },
];

export function searchBanking(query: string): BankingCEO[] {
  const q = query.toLowerCase().trim();
  if (!q) return bankingCEOs;
  return bankingCEOs.filter((b) =>
    b.name.toLowerCase().includes(q) ||
    b.organization.toLowerCase().includes(q) ||
    b.position.toLowerCase().includes(q)
  );
}

export function searchBotBanks(query: string): BotBank[] {
  const q = query.toLowerCase().trim();
  if (!q) return botRegisteredBanks;
  return botRegisteredBanks.filter((b) =>
    b.name.toLowerCase().includes(q) ||
    b.organization.toLowerCase().includes(q) ||
    b.address.toLowerCase().includes(q)
  );
}

export function searchBureaux(query: string): BureauDeChange[] {
  const q = query.toLowerCase().trim();
  if (!q) return bureauxDeChange;
  return bureauxDeChange.filter((b) =>
    b.name.toLowerCase().includes(q) ||
    b.region.toLowerCase().includes(q) ||
    b.address.toLowerCase().includes(q)
  );
}

export const bankingStats = {
  total: bankingCEOs.length,
  botBanks: botRegisteredBanks.length,
  bureaux: bureauxDeChange.length,
};
