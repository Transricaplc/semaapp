/**
 * Tanzania Healthcare Facilities Directory
 * Organized by level: National → Zonal Referral → Regional Referral → District
 * Source: Ministry of Health (MoH) Health Facility Registry (HFR)
 */

export type FacilityLevel = "National" | "Zonal Referral" | "Regional Referral" | "District";

export interface HealthFacility {
  id: string;
  name: string;
  level: FacilityLevel;
  region: string;
  district: string;
  phone: string;
  email: string;
  address: string;
}

export const healthFacilities: HealthFacility[] = [
  // ════════════════════════════════════════════
  // NATIONAL HOSPITALS
  // ════════════════════════════════════════════
  { id: "hosp-mnh", name: "Muhimbili National Hospital (MNH)", level: "National", region: "Dar es Salaam", district: "Ilala", phone: "022-215-1367", email: "info@mnh.or.tz", address: "Upanga, Dar es Salaam" },
  { id: "hosp-mloganzila", name: "Muhimbili Mloganzila (MNH Phase II)", level: "National", region: "Dar es Salaam", district: "Ilala", phone: "022-286-3601", email: "info@mnh.or.tz", address: "Mloganzila, Dar es Salaam" },
  { id: "hosp-ocean-road", name: "Ocean Road Cancer Institute (ORCI)", level: "National", region: "Dar es Salaam", district: "Ilala", phone: "022-211-7553", email: "info@orci.or.tz", address: "Ocean Road, Dar es Salaam" },
  { id: "hosp-jakaya", name: "Jakaya Kikwete Cardiac Institute (JKCI)", level: "National", region: "Dar es Salaam", district: "Ilala", phone: "022-215-4208", email: "info@jkci.or.tz", address: "Muhimbili, Dar es Salaam" },
  { id: "hosp-moi", name: "MOI — Muhimbili Orthopaedic Institute", level: "National", region: "Dar es Salaam", district: "Ilala", phone: "022-215-1599", email: "info@moi.or.tz", address: "Muhimbili, Dar es Salaam" },
  { id: "hosp-mkapa", name: "Benjamin Mkapa Hospital", level: "National", region: "Dodoma", district: "Dodoma City", phone: "026-232-4820", email: "info@bmh.go.tz", address: "Dodoma" },

  // ════════════════════════════════════════════
  // ZONAL REFERRAL HOSPITALS
  // ════════════════════════════════════════════
  { id: "hosp-kcmc", name: "Kilimanjaro Christian Medical Centre (KCMC)", level: "Zonal Referral", region: "Kilimanjaro", district: "Moshi MC", phone: "027-275-4377", email: "info@kcmc.ac.tz", address: "Moshi, Kilimanjaro" },
  { id: "hosp-bugando", name: "Bugando Medical Centre (BMC)", level: "Zonal Referral", region: "Mwanza", district: "Nyamagana", phone: "028-250-0610", email: "info@bugandomedicalcentre.go.tz", address: "Mwanza" },
  { id: "hosp-mbeya-zonal", name: "Mbeya Zonal Referral Hospital", level: "Zonal Referral", region: "Mbeya", district: "Mbeya City", phone: "025-250-3442", email: "info@mbeyareferral.go.tz", address: "Mbeya" },
  { id: "hosp-mnazi-mmoja", name: "Mnazi Mmoja Hospital", level: "Zonal Referral", region: "Unguja Mjini Magharibi", district: "Mjini", phone: "024-223-1071", email: "info@mnazimmoja.go.tz", address: "Zanzibar City" },

  // ════════════════════════════════════════════
  // REGIONAL REFERRAL HOSPITALS — All 26 mainland + Zanzibar
  // ════════════════════════════════════════════
  { id: "hosp-mt-meru", name: "Mount Meru Regional Referral Hospital", level: "Regional Referral", region: "Arusha", district: "Arusha City", phone: "027-254-4363", email: "info@mtmeru.go.tz", address: "Arusha" },
  { id: "hosp-amana", name: "Amana Regional Referral Hospital", level: "Regional Referral", region: "Dar es Salaam", district: "Ilala", phone: "022-218-0349", email: "amana@moh.go.tz", address: "Ilala, Dar es Salaam" },
  { id: "hosp-temeke", name: "Temeke Regional Referral Hospital", level: "Regional Referral", region: "Dar es Salaam", district: "Temeke", phone: "022-285-1098", email: "temeke@moh.go.tz", address: "Temeke, Dar es Salaam" },
  { id: "hosp-mwananyamala", name: "Mwananyamala Regional Referral Hospital", level: "Regional Referral", region: "Dar es Salaam", district: "Kinondoni", phone: "022-270-0815", email: "mwananyamala@moh.go.tz", address: "Kinondoni, Dar es Salaam" },
  { id: "hosp-dodoma-rr", name: "Dodoma Regional Referral Hospital", level: "Regional Referral", region: "Dodoma", district: "Dodoma City", phone: "026-232-1455", email: "dodoma.rr@moh.go.tz", address: "Dodoma" },
  { id: "hosp-geita-rr", name: "Geita Regional Referral Hospital", level: "Regional Referral", region: "Geita", district: "Geita DC", phone: "", email: "geita.rr@moh.go.tz", address: "Geita" },
  { id: "hosp-iringa-rr", name: "Iringa Regional Referral Hospital", level: "Regional Referral", region: "Iringa", district: "Iringa MC", phone: "026-270-2028", email: "iringa.rr@moh.go.tz", address: "Iringa" },
  { id: "hosp-kagera-rr", name: "Bukoba Regional Referral Hospital", level: "Regional Referral", region: "Kagera", district: "Bukoba MC", phone: "028-222-0422", email: "kagera.rr@moh.go.tz", address: "Bukoba" },
  { id: "hosp-katavi-rr", name: "Mpanda Regional Referral Hospital", level: "Regional Referral", region: "Katavi", district: "Mpanda TC", phone: "", email: "katavi.rr@moh.go.tz", address: "Mpanda" },
  { id: "hosp-kigoma-rr", name: "Maweni Regional Referral Hospital", level: "Regional Referral", region: "Kigoma", district: "Kigoma-Ujiji MC", phone: "028-280-2036", email: "kigoma.rr@moh.go.tz", address: "Kigoma" },
  { id: "hosp-kilimanjaro-rr", name: "Mawenzi Regional Referral Hospital", level: "Regional Referral", region: "Kilimanjaro", district: "Moshi MC", phone: "027-275-1802", email: "mawenzi@moh.go.tz", address: "Moshi" },
  { id: "hosp-lindi-rr", name: "Sokoine Regional Referral Hospital", level: "Regional Referral", region: "Lindi", district: "Lindi MC", phone: "023-220-2002", email: "lindi.rr@moh.go.tz", address: "Lindi" },
  { id: "hosp-manyara-rr", name: "Babati Regional Referral Hospital", level: "Regional Referral", region: "Manyara", district: "Babati TC", phone: "", email: "manyara.rr@moh.go.tz", address: "Babati" },
  { id: "hosp-mara-rr", name: "Musoma Regional Referral Hospital", level: "Regional Referral", region: "Mara", district: "Musoma MC", phone: "028-262-2001", email: "mara.rr@moh.go.tz", address: "Musoma" },
  { id: "hosp-mbeya-rr", name: "Mbeya Regional Referral Hospital", level: "Regional Referral", region: "Mbeya", district: "Mbeya City", phone: "025-250-2371", email: "mbeya.rr@moh.go.tz", address: "Mbeya" },
  { id: "hosp-morogoro-rr", name: "Morogoro Regional Referral Hospital", level: "Regional Referral", region: "Morogoro", district: "Morogoro MC", phone: "023-261-4782", email: "morogoro.rr@moh.go.tz", address: "Morogoro" },
  { id: "hosp-mtwara-rr", name: "Ligula Regional Referral Hospital", level: "Regional Referral", region: "Mtwara", district: "Mtwara MC", phone: "023-233-4073", email: "mtwara.rr@moh.go.tz", address: "Mtwara" },
  { id: "hosp-mwanza-rr", name: "Sekou Toure Regional Referral Hospital", level: "Regional Referral", region: "Mwanza", district: "Nyamagana", phone: "028-250-0050", email: "mwanza.rr@moh.go.tz", address: "Mwanza" },
  { id: "hosp-njombe-rr", name: "Kibena Regional Referral Hospital", level: "Regional Referral", region: "Njombe", district: "Njombe TC", phone: "", email: "njombe.rr@moh.go.tz", address: "Njombe" },
  { id: "hosp-pwani-rr", name: "Tumbi Regional Referral Hospital", level: "Regional Referral", region: "Pwani", district: "Kibaha TC", phone: "023-240-2396", email: "pwani.rr@moh.go.tz", address: "Kibaha" },
  { id: "hosp-rukwa-rr", name: "Sumbawanga Regional Referral Hospital", level: "Regional Referral", region: "Rukwa", district: "Sumbawanga MC", phone: "", email: "rukwa.rr@moh.go.tz", address: "Sumbawanga" },
  { id: "hosp-ruvuma-rr", name: "Ruvuma Regional Referral Hospital", level: "Regional Referral", region: "Ruvuma", district: "Songea MC", phone: "025-260-2060", email: "ruvuma.rr@moh.go.tz", address: "Songea" },
  { id: "hosp-shinyanga-rr", name: "Shinyanga Regional Referral Hospital", level: "Regional Referral", region: "Shinyanga", district: "Shinyanga MC", phone: "028-276-2042", email: "shinyanga.rr@moh.go.tz", address: "Shinyanga" },
  { id: "hosp-simiyu-rr", name: "Simiyu Regional Referral Hospital", level: "Regional Referral", region: "Simiyu", district: "Bariadi DC", phone: "", email: "simiyu.rr@moh.go.tz", address: "Bariadi" },
  { id: "hosp-singida-rr", name: "Singida Regional Referral Hospital", level: "Regional Referral", region: "Singida", district: "Singida MC", phone: "026-250-2043", email: "singida.rr@moh.go.tz", address: "Singida" },
  { id: "hosp-songwe-rr", name: "Songwe Regional Referral Hospital", level: "Regional Referral", region: "Songwe", district: "Songwe DC", phone: "", email: "songwe.rr@moh.go.tz", address: "Vwawa" },
  { id: "hosp-tabora-rr", name: "Kitete Regional Referral Hospital", level: "Regional Referral", region: "Tabora", district: "Tabora MC", phone: "026-260-4015", email: "tabora.rr@moh.go.tz", address: "Tabora" },
  { id: "hosp-tanga-rr", name: "Bombo Regional Referral Hospital", level: "Regional Referral", region: "Tanga", district: "Tanga City", phone: "027-264-4731", email: "tanga.rr@moh.go.tz", address: "Tanga" },

  // ════════════════════════════════════════════
  // DISTRICT HOSPITALS (major ones, representative sample per region)
  // ════════════════════════════════════════════
  // Arusha
  { id: "hosp-karatu", name: "Karatu District Hospital", level: "District", region: "Arusha", district: "Karatu", phone: "", email: "karatu.dh@moh.go.tz", address: "Karatu" },
  { id: "hosp-monduli", name: "Monduli District Hospital", level: "District", region: "Arusha", district: "Monduli", phone: "", email: "monduli.dh@moh.go.tz", address: "Monduli" },
  { id: "hosp-longido", name: "Longido District Hospital", level: "District", region: "Arusha", district: "Longido", phone: "", email: "longido.dh@moh.go.tz", address: "Longido" },
  // Dar es Salaam
  { id: "hosp-kigamboni-dh", name: "Kigamboni District Hospital", level: "District", region: "Dar es Salaam", district: "Kigamboni", phone: "", email: "kigamboni.dh@moh.go.tz", address: "Kigamboni" },
  { id: "hosp-ubungo-dh", name: "Sinza Palestina Hospital", level: "District", region: "Dar es Salaam", district: "Ubungo", phone: "022-270-0108", email: "sinza@moh.go.tz", address: "Sinza, Dar es Salaam" },
  // Dodoma
  { id: "hosp-kondoa-dh", name: "Kondoa District Hospital", level: "District", region: "Dodoma", district: "Kondoa", phone: "", email: "kondoa.dh@moh.go.tz", address: "Kondoa" },
  { id: "hosp-kongwa-dh", name: "Kongwa District Hospital", level: "District", region: "Dodoma", district: "Kongwa", phone: "", email: "kongwa.dh@moh.go.tz", address: "Kongwa" },
  { id: "hosp-mpwapwa-dh", name: "Mpwapwa District Hospital", level: "District", region: "Dodoma", district: "Mpwapwa", phone: "", email: "mpwapwa.dh@moh.go.tz", address: "Mpwapwa" },
  // Geita
  { id: "hosp-chato-dh", name: "Chato District Hospital", level: "District", region: "Geita", district: "Chato", phone: "", email: "chato.dh@moh.go.tz", address: "Chato" },
  { id: "hosp-bukombe-dh", name: "Bukombe District Hospital", level: "District", region: "Geita", district: "Bukombe", phone: "", email: "bukombe.dh@moh.go.tz", address: "Bukombe" },
  // Iringa
  { id: "hosp-mufindi-dh", name: "Mafinga District Hospital", level: "District", region: "Iringa", district: "Mafinga TC", phone: "", email: "mafinga.dh@moh.go.tz", address: "Mafinga" },
  { id: "hosp-kilolo-dh", name: "Kilolo District Hospital", level: "District", region: "Iringa", district: "Kilolo", phone: "", email: "kilolo.dh@moh.go.tz", address: "Kilolo" },
  // Kagera
  { id: "hosp-muleba-dh", name: "Muleba District Hospital", level: "District", region: "Kagera", district: "Muleba", phone: "", email: "muleba.dh@moh.go.tz", address: "Muleba" },
  { id: "hosp-ngara-dh", name: "Ngara District Hospital", level: "District", region: "Kagera", district: "Ngara", phone: "", email: "ngara.dh@moh.go.tz", address: "Ngara" },
  { id: "hosp-biharamulo-dh", name: "Biharamulo District Hospital", level: "District", region: "Kagera", district: "Biharamulo", phone: "", email: "biharamulo.dh@moh.go.tz", address: "Biharamulo" },
  // Kigoma
  { id: "hosp-kasulu-dh", name: "Kasulu District Hospital", level: "District", region: "Kigoma", district: "Kasulu DC", phone: "", email: "kasulu.dh@moh.go.tz", address: "Kasulu" },
  { id: "hosp-kibondo-dh", name: "Kibondo District Hospital", level: "District", region: "Kigoma", district: "Kibondo", phone: "", email: "kibondo.dh@moh.go.tz", address: "Kibondo" },
  // Kilimanjaro
  { id: "hosp-same-dh", name: "Same District Hospital", level: "District", region: "Kilimanjaro", district: "Same", phone: "", email: "same.dh@moh.go.tz", address: "Same" },
  { id: "hosp-hai-dh", name: "Hai District Hospital", level: "District", region: "Kilimanjaro", district: "Hai", phone: "", email: "hai.dh@moh.go.tz", address: "Hai" },
  { id: "hosp-rombo-dh", name: "Rombo District Hospital", level: "District", region: "Kilimanjaro", district: "Rombo", phone: "", email: "rombo.dh@moh.go.tz", address: "Rombo" },
  // Lindi
  { id: "hosp-kilwa-dh", name: "Kilwa District Hospital", level: "District", region: "Lindi", district: "Kilwa", phone: "", email: "kilwa.dh@moh.go.tz", address: "Kilwa" },
  { id: "hosp-nachingwea-dh", name: "Nachingwea District Hospital", level: "District", region: "Lindi", district: "Nachingwea", phone: "", email: "nachingwea.dh@moh.go.tz", address: "Nachingwea" },
  // Manyara
  { id: "hosp-hanang-dh", name: "Hanang District Hospital", level: "District", region: "Manyara", district: "Hanang", phone: "", email: "hanang.dh@moh.go.tz", address: "Hanang" },
  { id: "hosp-simanjiro-dh", name: "Simanjiro District Hospital", level: "District", region: "Manyara", district: "Simanjiro", phone: "", email: "simanjiro.dh@moh.go.tz", address: "Simanjiro" },
  // Mara
  { id: "hosp-tarime-dh", name: "Tarime District Hospital", level: "District", region: "Mara", district: "Tarime DC", phone: "", email: "tarime.dh@moh.go.tz", address: "Tarime" },
  { id: "hosp-serengeti-dh", name: "Serengeti District Hospital", level: "District", region: "Mara", district: "Serengeti", phone: "", email: "serengeti.dh@moh.go.tz", address: "Serengeti" },
  // Mbeya
  { id: "hosp-chunya-dh", name: "Chunya District Hospital", level: "District", region: "Mbeya", district: "Chunya", phone: "", email: "chunya.dh@moh.go.tz", address: "Chunya" },
  { id: "hosp-rungwe-dh", name: "Rungwe District Hospital", level: "District", region: "Mbeya", district: "Rungwe", phone: "", email: "rungwe.dh@moh.go.tz", address: "Rungwe" },
  // Morogoro
  { id: "hosp-kilosa-dh", name: "Kilosa District Hospital", level: "District", region: "Morogoro", district: "Kilosa", phone: "", email: "kilosa.dh@moh.go.tz", address: "Kilosa" },
  { id: "hosp-ulanga-dh", name: "Ulanga District Hospital", level: "District", region: "Morogoro", district: "Ulanga", phone: "", email: "ulanga.dh@moh.go.tz", address: "Ulanga" },
  { id: "hosp-mvomero-dh", name: "Mvomero District Hospital", level: "District", region: "Morogoro", district: "Mvomero", phone: "", email: "mvomero.dh@moh.go.tz", address: "Mvomero" },
  // Mtwara
  { id: "hosp-masasi-dh", name: "Masasi District Hospital", level: "District", region: "Mtwara", district: "Masasi DC", phone: "", email: "masasi.dh@moh.go.tz", address: "Masasi" },
  { id: "hosp-newala-dh", name: "Newala District Hospital", level: "District", region: "Mtwara", district: "Newala DC", phone: "", email: "newala.dh@moh.go.tz", address: "Newala" },
  // Mwanza
  { id: "hosp-sengerema-dh", name: "Sengerema District Hospital", level: "District", region: "Mwanza", district: "Sengerema", phone: "", email: "sengerema.dh@moh.go.tz", address: "Sengerema" },
  { id: "hosp-kwimba-dh", name: "Kwimba District Hospital", level: "District", region: "Mwanza", district: "Kwimba", phone: "", email: "kwimba.dh@moh.go.tz", address: "Kwimba" },
  // Njombe
  { id: "hosp-ludewa-dh", name: "Ludewa District Hospital", level: "District", region: "Njombe", district: "Ludewa", phone: "", email: "ludewa.dh@moh.go.tz", address: "Ludewa" },
  { id: "hosp-makete-dh", name: "Makete District Hospital", level: "District", region: "Njombe", district: "Makete", phone: "", email: "makete.dh@moh.go.tz", address: "Makete" },
  // Pwani
  { id: "hosp-bagamoyo-dh", name: "Bagamoyo District Hospital", level: "District", region: "Pwani", district: "Bagamoyo", phone: "", email: "bagamoyo.dh@moh.go.tz", address: "Bagamoyo" },
  { id: "hosp-rufiji-dh", name: "Utete District Hospital", level: "District", region: "Pwani", district: "Rufiji", phone: "", email: "rufiji.dh@moh.go.tz", address: "Utete" },
  // Rukwa
  { id: "hosp-nkasi-dh", name: "Nkasi District Hospital", level: "District", region: "Rukwa", district: "Nkasi", phone: "", email: "nkasi.dh@moh.go.tz", address: "Nkasi" },
  { id: "hosp-kalambo-dh", name: "Kalambo District Hospital", level: "District", region: "Rukwa", district: "Kalambo", phone: "", email: "kalambo.dh@moh.go.tz", address: "Kalambo" },
  // Ruvuma
  { id: "hosp-tunduru-dh", name: "Tunduru District Hospital", level: "District", region: "Ruvuma", district: "Tunduru", phone: "", email: "tunduru.dh@moh.go.tz", address: "Tunduru" },
  { id: "hosp-mbinga-dh", name: "Mbinga District Hospital", level: "District", region: "Ruvuma", district: "Mbinga DC", phone: "", email: "mbinga.dh@moh.go.tz", address: "Mbinga" },
  // Shinyanga
  { id: "hosp-kahama-dh", name: "Kahama District Hospital", level: "District", region: "Shinyanga", district: "Kahama DC", phone: "", email: "kahama.dh@moh.go.tz", address: "Kahama" },
  { id: "hosp-kishapu-dh", name: "Kishapu District Hospital", level: "District", region: "Shinyanga", district: "Kishapu", phone: "", email: "kishapu.dh@moh.go.tz", address: "Kishapu" },
  // Simiyu
  { id: "hosp-maswa-dh", name: "Maswa District Hospital", level: "District", region: "Simiyu", district: "Maswa", phone: "", email: "maswa.dh@moh.go.tz", address: "Maswa" },
  { id: "hosp-meatu-dh", name: "Meatu District Hospital", level: "District", region: "Simiyu", district: "Meatu", phone: "", email: "meatu.dh@moh.go.tz", address: "Meatu" },
  // Singida
  { id: "hosp-iramba-dh", name: "Iramba District Hospital", level: "District", region: "Singida", district: "Iramba", phone: "", email: "iramba.dh@moh.go.tz", address: "Iramba" },
  { id: "hosp-manyoni-dh", name: "Manyoni District Hospital", level: "District", region: "Singida", district: "Manyoni", phone: "", email: "manyoni.dh@moh.go.tz", address: "Manyoni" },
  // Songwe
  { id: "hosp-mbozi-dh", name: "Mbozi District Hospital", level: "District", region: "Songwe", district: "Mbozi", phone: "", email: "mbozi.dh@moh.go.tz", address: "Mbozi" },
  { id: "hosp-ileje-dh", name: "Ileje District Hospital", level: "District", region: "Songwe", district: "Ileje", phone: "", email: "ileje.dh@moh.go.tz", address: "Ileje" },
  // Tabora
  { id: "hosp-nzega-dh", name: "Nzega District Hospital", level: "District", region: "Tabora", district: "Nzega DC", phone: "", email: "nzega.dh@moh.go.tz", address: "Nzega" },
  { id: "hosp-igunga-dh", name: "Igunga District Hospital", level: "District", region: "Tabora", district: "Igunga", phone: "", email: "igunga.dh@moh.go.tz", address: "Igunga" },
  { id: "hosp-urambo-dh", name: "Urambo District Hospital", level: "District", region: "Tabora", district: "Urambo", phone: "", email: "urambo.dh@moh.go.tz", address: "Urambo" },
  // Tanga
  { id: "hosp-korogwe-dh", name: "Korogwe District Hospital", level: "District", region: "Tanga", district: "Korogwe DC", phone: "", email: "korogwe.dh@moh.go.tz", address: "Korogwe" },
  { id: "hosp-muheza-dh", name: "Muheza District Hospital", level: "District", region: "Tanga", district: "Muheza", phone: "", email: "muheza.dh@moh.go.tz", address: "Muheza" },
  { id: "hosp-lushoto-dh", name: "Lushoto District Hospital", level: "District", region: "Tanga", district: "Lushoto", phone: "", email: "lushoto.dh@moh.go.tz", address: "Lushoto" },
  // Katavi
  { id: "hosp-mlele-dh", name: "Mlele District Hospital", level: "District", region: "Katavi", district: "Mlele", phone: "", email: "mlele.dh@moh.go.tz", address: "Mlele" },
  // Pemba
  { id: "hosp-abdulla-mzee", name: "Abdulla Mzee Hospital", level: "Regional Referral", region: "Pemba Kusini", district: "Chake Chake", phone: "024-245-2223", email: "abdullamzee@moh.go.tz", address: "Chake Chake, Pemba" },
];

// ════════════════════════════════════════════
// LOOKUP HELPERS
// ════════════════════════════════════════════

/** Get facilities by region */
export function getFacilitiesByRegion(region: string): HealthFacility[] {
  return healthFacilities.filter((f) => f.region === region);
}

/** Get facilities by district */
export function getFacilitiesByDistrict(region: string, district: string): HealthFacility[] {
  return healthFacilities.filter((f) => f.region === region && f.district === district);
}

/** Get facilities by level */
export function getFacilitiesByLevel(level: FacilityLevel): HealthFacility[] {
  return healthFacilities.filter((f) => f.level === level);
}

/** Search facilities */
export function searchFacilities(query: string): HealthFacility[] {
  const q = query.toLowerCase();
  return healthFacilities.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.region.toLowerCase().includes(q) ||
      f.district.toLowerCase().includes(q) ||
      f.level.toLowerCase().includes(q)
  );
}

/** Facility level order for display */
export const facilityLevelOrder: FacilityLevel[] = ["National", "Zonal Referral", "Regional Referral", "District"];

/** Swahili labels */
export const facilityLevelLabels: Record<FacilityLevel, string> = {
  National: "Hospitali ya Taifa",
  "Zonal Referral": "Hospitali ya Rufaa Kanda",
  "Regional Referral": "Hospitali ya Rufaa Mkoa",
  District: "Hospitali ya Wilaya",
};

export const facilityStats = {
  total: healthFacilities.length,
  national: healthFacilities.filter((f) => f.level === "National").length,
  zonal: healthFacilities.filter((f) => f.level === "Zonal Referral").length,
  regional: healthFacilities.filter((f) => f.level === "Regional Referral").length,
  district: healthFacilities.filter((f) => f.level === "District").length,
};
