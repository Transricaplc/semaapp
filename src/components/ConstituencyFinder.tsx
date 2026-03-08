import { useState } from "react";
import {
  MapPin,
  Search,
  ChevronRight,
  User,
  Phone,
  Mail,
  BadgeCheck,
  AlertCircle,
  Share2,
  CalendarClock,
  ExternalLink,
  Shield,
  Scale,
  Building2,
  Heart,
  Flame,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  allRegionNames,
  districtsByRegion,
  getYourOfficials,
  roleLabels,
  roleBadgeColors,
  type Official,
} from "@/data/tanzania_directory";
import { getFacilitiesByRegion, getFacilitiesByDistrict, facilityLevelLabels, type HealthFacility } from "@/data/health_facilities";
import { getFireStationsByRegion, getFireStationsByDistrict, type FireStation } from "@/data/fire_stations";
import { getAgenciesForRegion, sectorLabels, type Agency, type ZonalOffice } from "@/data/agencies";

function shareWhatsApp(official: Official) {
  const text = `🇹🇿 ${official.name}\n📌 ${official.roleTitle}${official.office ? `\n📍 ${official.office}` : ""}${official.phone ? `\n📞 ${official.phone}` : ""}${official.email ? `\n✉️ ${official.email}` : ""}\n\n— Sema App`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

const roleIcons: Record<string, React.ElementType> = {
  RC: Building2,
  RAS: Building2,
  DC: MapPin,
  RPC: Shield,
  OCD: Shield,
  Judge: Scale,
  Minister: Building2,
};

export default function ConstituencyFinder() {
  const [mkoa, setMkoa] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [results, setResults] = useState<Official[] | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HealthFacility[]>([]);
  const [nearbyFire, setNearbyFire] = useState<FireStation[]>([]);
  const [nearbyAgencies, setNearbyAgencies] = useState<{ agency: Agency; office: ZonalOffice }[]>([]);

  const availableWilaya = mkoa ? districtsByRegion[mkoa] || [] : [];

  const handleSearch = () => {
    if (!mkoa) return;
    const found = getYourOfficials(mkoa, wilaya || undefined);
    setResults(found);

    // Get nearby health & fire services
    const hospitals = wilaya
      ? getFacilitiesByDistrict(mkoa, wilaya)
      : getFacilitiesByRegion(mkoa);
    setNearbyHospitals(hospitals.slice(0, 5));

    const fireStns = wilaya
      ? getFireStationsByDistrict(mkoa, wilaya)
      : getFireStationsByRegion(mkoa);
    setNearbyFire(fireStns.slice(0, 3));

    // Get zonal agency offices for this region
    const agencyOffices = getAgenciesForRegion(mkoa);
    setNearbyAgencies(agencyOffices.slice(0, 4));
  };

  const handleMkoaChange = (val: string) => {
    setMkoa(val);
    setWilaya("");
    setResults(null);
    setNearbyHospitals([]);
    setNearbyFire([]);
    setNearbyAgencies([]);
  };

  return (
    <div className="glass-card rounded-xl p-5 md:p-6 mb-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
          <MapPin className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg">Tafuta Viongozi Wako</h3>
          <p className="text-xs text-muted-foreground">Chagua mkoa na wilaya kupata viongozi wako wa karibu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Chagua Mkoa
          </label>
          <select
            value={mkoa}
            onChange={(e) => handleMkoaChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
          >
            <option value="">— Mikoa yote 31 —</option>
            {allRegionNames.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Chagua Wilaya
          </label>
          <select
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            disabled={!mkoa}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50"
          >
            <option value="">{mkoa ? "— Wilaya Zote —" : "Chagua mkoa kwanza"}</option>
            {availableWilaya.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleSearch}
          disabled={!mkoa}
          className="gap-2 gradient-green text-accent-foreground h-[42px]"
        >
          <Search className="w-4 h-4" />
          Tafuta Viongozi
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Results */}
      {results !== null && (
        <div className="mt-6 pt-5 border-t border-border/50">
          {results.length === 0 ? (
            <div className="text-center py-6">
              <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-foreground">Hakuna viongozi waliopatikana</p>
              <p className="text-xs text-muted-foreground mt-1">
                Bado tunaongeza taarifa za viongozi wa eneo hili
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-accent" />
                <h4 className="font-heading font-bold text-foreground">
                  Viongozi Wako — {mkoa}{wilaya ? `, ${wilaya}` : ""}
                </h4>
                <span className="text-xs text-muted-foreground">({results.length})</span>
              </div>
              <div className="grid gap-3">
                {results.map((official) => (
                  <OfficialCard key={official.id} official={official} />
                ))}
              </div>

              {/* Nearby Emergency Services */}
              {(nearbyHospitals.length > 0 || nearbyFire.length > 0 || nearbyAgencies.length > 0) && (
                <div className="mt-6 pt-4 border-t border-border/30">
                  <h4 className="font-heading font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Huduma za Dharura Karibu Nawe
                  </h4>

                  {/* Hospitals */}
                  {nearbyHospitals.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-accent" />
                        Hospitali ({nearbyHospitals.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyHospitals.map((h) => (
                          <div key={h.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/5 border border-accent/10">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                              <Heart className="w-4 h-4 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{h.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {facilityLevelLabels[h.level]} · {h.district}
                              </p>
                            </div>
                            {h.phone && (
                              <a href={`tel:${h.phone}`} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-bold hover:bg-accent/20 transition-colors shrink-0">
                                <Phone className="w-3 h-3" />
                                {h.phone}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fire Stations */}
                  {nearbyFire.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-destructive" />
                        Zimamoto ({nearbyFire.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyFire.map((s) => (
                          <div key={s.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-destructive/5 border border-destructive/10">
                            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                              <Flame className="w-4 h-4 text-destructive" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                              <p className="text-[10px] text-muted-foreground">{s.district}</p>
                            </div>
                            <a href={`tel:${s.hotline}`} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-bold hover:bg-destructive/20 transition-colors shrink-0">
                              <Phone className="w-3 h-3" />
                              {s.hotline}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Agency Zonal Offices */}
                  {nearbyAgencies.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-primary" />
                        Taasisi za Serikali ({nearbyAgencies.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyAgencies.map(({ agency, office }) => (
                          <div key={`${agency.id}-${office.zone}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Building className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{agency.acronym} — {office.zone}</p>
                              <p className="text-[10px] text-muted-foreground">{office.manager}</p>
                            </div>
                            {office.phone && (
                              <a href={`tel:${office.phone}`} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors shrink-0">
                                <Phone className="w-3 h-3" />
                                {office.phone}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OfficialCard({ official }: { official: Official }) {
  const Icon = roleIcons[official.role] || User;

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center shrink-0">
        {official.photoUrl ? (
          <img src={official.photoUrl} alt={official.name} className="w-full h-full rounded-xl object-cover" />
        ) : (
          <Icon className="w-6 h-6 text-primary-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h4 className="font-semibold text-foreground text-sm">{official.name}</h4>
          {official.verified && <BadgeCheck className="w-4 h-4 text-accent shrink-0" />}
        </div>
        <span className={`inline-flex text-[11px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role]}`}>
          {roleLabels[official.role]}
        </span>
        {official.office && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {official.office}
          </p>
        )}
        {/* Source + date */}
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
          {official.lastVerified && (
            <span className="flex items-center gap-0.5">
              <CalendarClock className="w-2.5 h-2.5" /> {official.lastVerified}
            </span>
          )}
          {official.source && (
            <span className="flex items-center gap-0.5">
              <ExternalLink className="w-2.5 h-2.5" /> {official.source}
            </span>
          )}
        </div>
      </div>

      {/* Actions — one-tap contact */}
      <div className="flex sm:flex-col gap-2 shrink-0">
        {official.phone && (
          <a
            href={`tel:${official.phone}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg gradient-green text-accent-foreground text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Piga Simu</span>
          </a>
        )}
        {official.email && (
          <a
            href={`mailto:${official.email}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-secondary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Barua Pepe</span>
          </a>
        )}
        <Link
          to="/report"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/15 text-foreground border border-gold/30 text-xs font-medium hover:bg-gold/25 transition-colors"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ripoti</span>
        </Link>
        <button
          onClick={() => shareWhatsApp(official)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-xs font-medium hover:bg-accent/20 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shiriki</span>
        </button>
      </div>
    </div>
  );
}
