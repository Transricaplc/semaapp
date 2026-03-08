/**
 * Bilingual translation system — Swahili (default) + English
 */

export type Lang = "sw" | "en";

export const translations = {
  // ── Navigation ──
  "nav.home": { sw: "Nyumbani", en: "Home" },
  "nav.map": { sw: "Ramani", en: "Map" },
  "nav.report": { sw: "Ripoti", en: "Report" },
  "nav.petitions": { sw: "Sauti", en: "Petitions" },
  "nav.profile": { sw: "Mimi", en: "Profile" },
  "nav.directory": { sw: "Kitabu", en: "Directory" },
  "nav.tracker": { sw: "Fuatilia", en: "Tracker" },
  "nav.yellowBook": { sw: "Kitabu cha Njano", en: "Yellow Book" },

  // ── Hero ──
  "hero.badge": { sw: "Uwazi & Uwajibikaji", en: "Transparency & Accountability" },
  "hero.title": { sw: "Sauti Yako", en: "Your Voice" },
  "hero.titleHighlight": { sw: "Inasikilizwa", en: "Matters" },
  "hero.subtitle": { sw: "Ripoti matatizo, tafuta viongozi wako, na washikilie watumishi wa umma kuwajibika — yote mahali pamoja.", en: "Report issues, find your leaders, and hold public servants accountable — all in one place." },
  "hero.reportBtn": { sw: "Ripoti Tatizo", en: "Report an Issue" },
  "hero.directoryBtn": { sw: "Kitabu Kamili", en: "Full Directory" },

  // ── Search ──
  "search.placeholder": { sw: "Andika jina, eneo, shida au taasisi... (mfano: Waziri Fedha, TRA, Diwani Tabata, maji Dodoma)", en: "Type a leader's name, ward, district, or issue... (e.g. Minister of Finance, water Dodoma)" },
  "search.filterLeader": { sw: "Kiongozi", en: "Leader" },
  "search.filterArea": { sw: "Eneo", en: "Area" },
  "search.filterIssue": { sw: "Shida", en: "Issue" },
  "search.filterReport": { sw: "Ripoti / Ombi", en: "Report / Petition" },
  "search.filterContacts": { sw: "Mawasiliano Yangu", en: "My Messages" },
  "search.quickCategory": { sw: "Tafuta haraka kwa aina", en: "Quick search by category" },
  "search.minister": { sw: "Waziri", en: "Minister" },
  "search.mp": { sw: "Mbunge", en: "MP" },
  "search.commissioner": { sw: "Kamishna", en: "Commissioner" },
  "search.water": { sw: "Maji", en: "Water" },
  "search.health": { sw: "Afya", en: "Health" },
  "search.education": { sw: "Elimu", en: "Education" },
  "search.results": { sw: "matokeo yamepatikana", en: "results found" },
  "search.noResults": { sw: "Hakuna matokeo", en: "No results found" },
  "search.notFound": { sw: "haukupatikana kwenye mfumo", en: "was not found in the system" },
  "search.suggestAdd": { sw: "Pendekeza kiongozi huyu aongezwe", en: "Suggest this official be added" },
  "search.browseDirectory": { sw: "Tazama kitabu kamili", en: "Browse full directory" },

  // ── Stats ──
  "stats.officials": { sw: "Viongozi", en: "Officials" },
  "stats.hospitals": { sw: "Hospitali", en: "Hospitals" },
  "stats.agencies": { sw: "Taasisi", en: "Agencies" },
  "stats.fireStations": { sw: "Zimamoto", en: "Fire Stations" },
  "stats.listedDirectory": { sw: "Walioorodheshwa", en: "Listed in Directory" },
  "stats.healthFacilities": { sw: "Vituo vya Afya", en: "Health Facilities" },
  "stats.govAgencies": { sw: "Taasisi za Serikali", en: "Government Agencies" },
  "stats.fireRescue": { sw: "Zimamoto & Uokoaji", en: "Fire & Rescue" },

  // ── Quick Actions ──
  "actions.map": { sw: "Ramani", en: "Map" },
  "actions.mapDesc": { sw: "Tazama ripoti kwenye ramani", en: "View reports on the map" },
  "actions.petitions": { sw: "Ombi la Umma", en: "Petitions" },
  "actions.petitionsDesc": { sw: "Ombi & utetezi", en: "Petitions & advocacy" },

  // ── Trending ──
  "trending.title": { sw: "Ripoti za Hivi Karibuni", en: "Latest Reports" },
  "trending.subtitle": { sw: "Matatizo yanayozungumzwa na wananchi", en: "Trending concerns from citizens" },
  "trending.reportNow": { sw: "Ripoti Sasa", en: "Report Now" },
  "trending.share": { sw: "Shiriki", en: "Share" },

  // ── Success Stories ──
  "success.title": { sw: "Sauti Zilizosikika", en: "Voices That Were Heard" },
  "success.subtitle": { sw: "Hadithi za mafanikio kutoka kwa ripoti za wananchi", en: "Success stories from citizen reports" },
  "success.resolved": { sw: "✅ Imetatuliwa", en: "✅ Resolved" },
  "success.benefited": { sw: "wamenufaika", en: "benefited" },

  // ── Emergency ──
  "emergency.title": { sw: "Nambari za Dharura", en: "Emergency Contacts" },

  // ── Constituency Finder ──
  "finder.title": { sw: "Tafuta Viongozi Wako", en: "Find Your Leaders" },
  "finder.subtitle": { sw: "Chagua mkoa na wilaya yako kutafuta viongozi wa eneo lako", en: "Select your region and district to find your local leaders" },
  "finder.region": { sw: "Mkoa", en: "Region" },
  "finder.district": { sw: "Wilaya", en: "District" },
  "finder.allRegions": { sw: "— Mikoa Yote 31 —", en: "— All 31 Regions —" },
  "finder.allDistricts": { sw: "— Wilaya Zote —", en: "— All Districts —" },
  "finder.selectRegion": { sw: "Chagua mkoa kwanza", en: "Select region first" },
  "finder.findBtn": { sw: "Tafuta Viongozi", en: "Find Leaders" },
  "finder.yourLeaders": { sw: "Viongozi Wako", en: "Your Leaders" },
  "finder.noOfficials": { sw: "Hakuna viongozi walioopatikana", en: "No officials found" },
  "finder.noOfficialsDesc": { sw: "Bado tunaongeza viongozi wa eneo hili", en: "We're still adding officials for this area" },
  "finder.nearbyServices": { sw: "Huduma za Dharura Jirani", en: "Nearby Emergency Services" },

  // ── Secure Actions ──
  "action.secureActions": { sw: "Vitendo Salama", en: "Secure Actions" },
  "action.sendMessage": { sw: "Tuma Ujumbe Moja kwa Moja", en: "Send Direct Message" },
  "action.sendMessageDesc": { sw: "Faragha na salama — wao tu watauona", en: "Private & secure — only they see it" },
  "action.tagReport": { sw: "Tag kwenye Ripoti ya Umma", en: "Tag in Public Report" },
  "action.tagReportDesc": { sw: "Ambatanisha kwenye ripoti au ombi lako", en: "Attach to your report or petition" },
  "action.shareWhatsApp": { sw: "Shiriki WhatsApp", en: "Share via WhatsApp" },
  "action.shareWhatsAppDesc": { sw: "Shiriki profaili na wengine", en: "Share profile with others" },
  "action.requestContact": { sw: "Omba Mawasiliano", en: "Request Contact Info" },
  "action.requestContactDesc": { sw: "Mawasiliano yaliyothibitishwa yatashirikiwa kwa usalama", en: "Verified contact shared securely" },
  "action.call": { sw: "Pigia", en: "Call" },

  // ── Report Page ──
  "report.title": { sw: "Ripoti Tatizo", en: "Report an Issue" },
  "report.subtitle": { sw: "Sema mapema, sema wazi — saidia jamii yako", en: "Speak early, speak clearly — help your community" },
  "report.category": { sw: "Aina ya Tatizo", en: "Issue Category" },
  "report.categoryDesc": { sw: "Chagua aina ya ripoti yako", en: "Select the category of your report" },
  "report.details": { sw: "Maelezo ya Tatizo", en: "Issue Details" },
  "report.detailsDesc": { sw: "Elezea tatizo kwa undani", en: "Describe the issue in detail" },
  "report.titleField": { sw: "Kichwa", en: "Title" },
  "report.titlePlaceholder": { sw: "Kichwa kifupi cha tatizo", en: "Brief title of the issue" },
  "report.description": { sw: "Maelezo", en: "Description" },
  "report.descPlaceholder": { sw: "Elezea tatizo kwa undani...", en: "Describe the issue in detail..." },
  "report.attachMedia": { sw: "Ambatanisha Picha/Video (Si lazima)", en: "Attach Photo/Video (Optional)" },
  "report.tapUpload": { sw: "Bonyeza kupakia picha au video", en: "Tap to upload photo or video" },
  "report.location": { sw: "Mahali", en: "Location" },
  "report.locationDesc": { sw: "Tatizo limetokea wapi?", en: "Where did this occur?" },
  "report.locationPlaceholder": { sw: "mfano: Temeke, Dar es Salaam", en: "e.g. Temeke, Dar es Salaam" },
  "report.detectGPS": { sw: "Tambua Mahali Pangu (GPS)", en: "Detect My Location (GPS)" },
  "report.review": { sw: "Kagua & Tuma", en: "Review & Submit" },
  "report.reviewDesc": { sw: "Kagua na utume ripoti yako", en: "Review and submit your report" },
  "report.anonymousOn": { sw: "Hali ya Siri — IMEWASHWA", en: "Anonymous Mode — ON" },
  "report.anonymousOff": { sw: "Hali ya Siri — IMEZIMWA", en: "Anonymous Mode — OFF" },
  "report.anonymousOnDesc": { sw: "Utambulisho wako utafichwa", en: "Your identity will be hidden" },
  "report.anonymousOffDesc": { sw: "Utambulisho wako utaonekana kwa maafisa", en: "Your identity will be visible to officials" },
  "report.back": { sw: "Rudi", en: "Back" },
  "report.next": { sw: "Endelea", en: "Next" },
  "report.submit": { sw: "Tuma Ripoti", en: "Submit Report" },
  "report.thankyou": { sw: "Asante!", en: "Thank You!" },
  "report.submitted": { sw: "Ripoti yako imetumwa kwa mafanikio.", en: "Your report has been submitted successfully." },
  "report.trackReport": { sw: "Fuatilia Ripoti", en: "Track Report" },
  "report.roads": { sw: "Barabara", en: "Roads" },
  "report.waterCat": { sw: "Maji", en: "Water" },
  "report.healthCat": { sw: "Afya", en: "Health" },
  "report.educationCat": { sw: "Elimu", en: "Education" },
  "report.environment": { sw: "Mazingira", en: "Environment" },
  "report.corruption": { sw: "Rushwa", en: "Corruption" },
  "report.agriculture": { sw: "Kilimo", en: "Agriculture" },
  "report.wildlife": { sw: "Wanyamapori", en: "Wildlife" },

  // ── Tracker ──
  "tracker.title": { sw: "Uwajibikaji — Fuatilia", en: "Accountability Tracker" },
  "tracker.subtitle": { sw: "Fuatilia hali ya ripoti zako zilizotumwa", en: "Track the status of your submitted reports" },
  "tracker.sent": { sw: "Imetumwa", en: "Sent" },
  "tracker.received": { sw: "Imepokelewa", en: "Received" },
  "tracker.investigating": { sw: "Inachunguzwa", en: "Under Investigation" },
  "tracker.resolved": { sw: "Imetatuliwa", en: "Resolved" },

  // ── Petitions (Sauti) ──
  "petition.title": { sw: "✊ Sauti Zetu — Maombi", en: "✊ Our Voices — Petitions" },
  "petition.subtitle": { sw: "Anzisha maombi, tia saini, na fanya mabadiliko", en: "Start petitions, sign, and make change happen" },
  "petition.startNew": { sw: "Anzisha Ombi Jipya", en: "Start New Petition" },
  "petition.newPetition": { sw: "Ombi Jipya", en: "New Petition" },
  "petition.titleField": { sw: "Kichwa", en: "Title" },
  "petition.titlePlaceholder": { sw: "mfano: Tunadai maji safi...", en: "e.g. We demand clean water..." },
  "petition.descField": { sw: "Maelezo", en: "Description" },
  "petition.descPlaceholder": { sw: "Elezea tatizo na unachotaka...", en: "Describe the issue and what you want..." },
  "petition.targetField": { sw: "Lengwa (Mbunge, Waziri, au Diwani)", en: "Target (MP, Minister, or Councillor)" },
  "petition.targetPlaceholder": { sw: "mfano: Waziri wa Maji", en: "e.g. Minister of Water" },
  "petition.submitPetition": { sw: "Tuma Ombi", en: "Submit Petition" },
  "petition.cancel": { sw: "Ghairi", en: "Cancel" },
  "petition.trending": { sw: "Maombi Yanayotrendisha", en: "Trending Petitions" },
  "petition.signatures": { sw: "saini", en: "signatures" },
  "petition.goal": { sw: "Lengo", en: "Goal" },
  "petition.sign": { sw: "Tia Saini", en: "Sign" },

  // ── Map (Ramani) ──
  "map.title": { sw: "🗺️ Ramani ya Matatizo", en: "🗺️ Issue Map" },
  "map.subtitle": { sw: "Tazama ripoti zote kwenye ramani", en: "View all reports on the map" },
  "map.all": { sw: "Zote", en: "All" },
  "map.reportsOnMap": { sw: "ripoti kwenye ramani", en: "reports on map" },
  "map.clickPin": { sw: "OpenStreetMap · Bonyeza pini kwa maelezo", en: "OpenStreetMap · Click a pin for details" },
  "map.filter": { sw: "Chuja", en: "Filter" },

  // ── Profile (Mimi) ──
  "profile.welcome": { sw: "Karibu Sema", en: "Welcome to Sema" },
  "profile.loginPrompt": { sw: "Ingia kwa nambari yako ya simu kuona ripoti na athari zako", en: "Log in with your phone number to view your reports and impact" },
  "profile.phoneLabel": { sw: "Nambari ya Simu", en: "Phone Number" },
  "profile.sendOTP": { sw: "Tuma Nambari ya OTP", en: "Send OTP Code" },
  "profile.otpSent": { sw: "Tutatuma SMS ya uthibitishaji", en: "We'll send you a verification SMS" },
  "profile.or": { sw: "au", en: "or" },
  "profile.continueAnon": { sw: "Endelea Bila Jina", en: "Continue Anonymously" },
  "profile.citizen": { sw: "Mwananchi", en: "Citizen" },
  "profile.myReports": { sw: "Ripoti Zangu", en: "My Reports" },
  "profile.resolved": { sw: "Zilizotatuliwa", en: "Resolved" },
  "profile.petitionsSigned": { sw: "Maombi Yaliyotiwa Saini", en: "Petitions Signed" },
  "profile.peopleImpacted": { sw: "Watu Walioathiriwa", en: "People Impacted" },
  "profile.logout": { sw: "Ondoka", en: "Log Out" },
  "profile.enterOTP": { sw: "Weka nambari ya OTP", en: "Enter OTP code" },
  "profile.verify": { sw: "Thibitisha", en: "Verify" },

  // ── Directory ──
  "dir.title": { sw: "Kitabu cha Taifa", en: "National Directory" },
  "dir.subtitle": { sw: "Tafuta mtu au taasisi sahihi — bila foleni, bila dalali", en: "Find the right person or institution — no queues, no middlemen" },
  "dir.officials": { sw: "Viongozi wa Serikali", en: "Government Officials" },
  "dir.agencies": { sw: "Wakala za Serikali", en: "Government Agencies" },
  "dir.banking": { sw: "Taasisi za Benki", en: "Banking Institutions" },
  "dir.executive": { sw: "Utendaji", en: "Executive" },
  "dir.parliament": { sw: "Bunge", en: "Parliament" },
  "dir.localGov": { sw: "Serikali za Mitaa", en: "Local Govt" },
  "dir.judiciary": { sw: "Mahakama & Usalama", en: "Judiciary & Security" },
  "dir.region": { sw: "Mkoa", en: "Region" },
  "dir.clear": { sw: "Futa", en: "Clear" },
  "dir.noResults": { sw: "Hakuna matokeo", en: "No results found" },
  "dir.noResultsDesc": { sw: "Jaribu kubadilisha utafutaji au vichujio vyako", en: "Try adjusting your search or filters" },

  // ── Language ──
  "lang.toggle": { sw: "English", en: "Kiswahili" },

  // ── Common ──
  "common.verified": { sw: "Imethibitishwa", en: "Verified" },
  "common.pending": { sw: "Inasubiri", en: "Pending" },
  "common.anonymous": { sw: "Bila Jina", en: "Anonymous" },
  "common.voiceInput": { sw: "Ingiza kwa Sauti", en: "Voice Input" },
  "common.listening": { sw: "Inasikiliza...", en: "Listening..." },

  // ── Footer ──
  "footer.brand": { sw: "Sema — Sauti ya Mwananchi", en: "Sema — The Citizen's Voice" },
  "footer.tagline": { sw: "Kuwezesha Uwazi & Uwajibikaji Tanzania", en: "Empowering Transparency & Accountability in Tanzania" },
} as const;

export type TranslationKey = keyof typeof translations;
