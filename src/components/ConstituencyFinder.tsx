import { useState } from "react";
import {
  MapPin, Search, ChevronRight, Phone, BadgeCheck, AlertCircle, Shield, Heart, Flame, Building, Crosshair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  allRegionNames, districtsByRegion, getYourOfficials, roleTypeLabels, roleBadgeColors, getContact, type Official,
} from "@/data/unified_officials";
import { getFacilitiesByRegion, getFacilitiesByDistrict, facilityLevelLabels, type HealthFacility } from "@/data/health_facilities";
import { getFireStationsByRegion, getFireStationsByDistrict, type FireStation } from "@/data/fire_stations";
import { getAgenciesForRegion, type Agency, type ZonalOffice } from "@/data/agencies";
import OfficialCard from "@/components/OfficialCard";
import { toast } from "sonner";

export default function ConstituencyFinder() {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [results, setResults] = useState<Official[] | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HealthFacility[]>([]);
  const [nearbyFire, setNearbyFire] = useState<FireStation[]>([]);
  const [nearbyAgencies, setNearbyAgencies] = useState<{ agency: Agency; office: ZonalOffice }[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const availableDistricts = region ? districtsByRegion[region] || [] : [];

  const handleSearch = () => {
    if (!region) return;
    setResults(getYourOfficials(region, district || undefined));
    setNearbyHospitals((district ? getFacilitiesByDistrict(region, district) : getFacilitiesByRegion(region)).slice(0, 5));
    setNearbyFire((district ? getFireStationsByDistrict(region, district) : getFireStationsByRegion(region)).slice(0, 3));
    setNearbyAgencies(getAgenciesForRegion(region).slice(0, 4));
  };

  const handleRegionChange = (val: string) => {
    setRegion(val); setDistrict(""); setResults(null); setNearbyHospitals([]); setNearbyFire([]); setNearbyAgencies([]);
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      toast.error("GPS haipatikani kwenye kifaa hiki");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = +pos.coords.latitude.toFixed(5);
        const lng = +pos.coords.longitude.toFixed(5);
        setCoords({ lat, lng });
        setGpsLoading(false);
        toast.success(`Eneo lako: ${lat}, ${lng} — Chagua mkoa wako hapa chini ili kupata viongozi wa karibu`);
      },
      () => {
        setGpsLoading(false);
        toast.error("Haiwezi kupata mahali pako");
      }
    );
  };

  const wardOfficials = coords && region && district ? getYourOfficials(region, district) : [];

  return (
    <div className="yb-card p-5 md:p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-heading text-h2 text-foreground">Find Your Leaders</h3>
            <p className="text-meta font-body text-muted-foreground">Select your region and district to find your local leaders</p>
          </div>
        </div>
        <Button
          onClick={handleUseGPS}
          disabled={gpsLoading}
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0 border-primary/40 text-primary hover:bg-primary/5"
        >
          <Crosshair className={`w-3.5 h-3.5 ${gpsLoading ? "animate-spin" : ""}`} />
          Tumia GPS
        </Button>
      </div>

      {coords && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 text-meta font-body text-foreground flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Eneo lako: <span className="font-mono">{coords.lat}, {coords.lng}</span> — chagua mkoa & wilaya hapa chini</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-meta font-body font-medium text-muted-foreground mb-1.5 block">Region</label>
          <select value={region} onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-3 text-body font-body min-h-[48px]">
            <option value="">— All 31 Regions —</option>
            {allRegionNames.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="text-meta font-body font-medium text-muted-foreground mb-1.5 block">District</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!region}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-3 text-body font-body disabled:opacity-50 min-h-[48px]">
            <option value="">{region ? "— All Districts —" : "Select region first"}</option>
            {availableDistricts.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <Button onClick={handleSearch} disabled={!region} className="gap-2 bg-primary text-primary-foreground min-h-[48px] font-body font-semibold hover:bg-yb-yellow-deep">
          <Search className="w-4 h-4" /> Find Leaders <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {coords && region && district && wardOfficials.length > 0 && (
        <div className="mt-6 pt-5 border-t border-primary/30">
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className="w-4 h-4 text-primary" />
            <h4 className="font-heading text-h3 text-foreground">Viongozi wa Kata Yako</h4>
            <span className="text-meta font-body text-muted-foreground">({wardOfficials.length})</span>
          </div>
          <div className="grid gap-3">
            {wardOfficials.map((official) => <OfficialCard key={`ward-${official.id}`} official={official} />)}
          </div>
        </div>
      )}

      {results !== null && (
        <div className="mt-6 pt-5 border-t border-border/50">
          {results.length === 0 ? (
            <div className="text-center py-6">
              <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground/40 mb-2" />
              <p className="font-heading text-h3 text-foreground">No officials found</p>
              <p className="text-meta font-body text-muted-foreground mt-1">We're still adding officials for this area</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <h4 className="font-heading text-h3 text-foreground">Your Leaders — {region}{district ? ` · ${district}` : ""}</h4>
                <span className="text-meta font-body text-muted-foreground">({results.length})</span>
              </div>
              <div className="grid gap-3">
                {results.map((official) => <OfficialCard key={official.id} official={official} />)}
              </div>

              {(nearbyHospitals.length > 0 || nearbyFire.length > 0 || nearbyAgencies.length > 0) && (
                <div className="mt-6 pt-4 border-t border-border/30">
                  <h4 className="font-heading text-h3 text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" /> Nearby Emergency Services
                  </h4>

                  {nearbyHospitals.length > 0 && (
                    <div className="mb-3">
                      <p className="text-meta font-body font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-accent" /> Hospitals ({nearbyHospitals.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyHospitals.map((h) => (
                          <div key={h.id} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-accent/5 border border-accent/10 min-h-[56px]">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                              <Heart className="w-4 h-4 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body font-medium text-body text-foreground truncate">{h.name}</p>
                              <p className="text-meta font-body text-muted-foreground">{facilityLevelLabels[h.level]} · {h.district}</p>
                            </div>
                            {h.phone && (
                              <a href={`tel:${h.phone}`} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-accent/10 text-accent text-meta font-mono font-bold hover:bg-accent/20 transition-colors shrink-0 min-h-[40px]">
                                <Phone className="w-3 h-3" />{h.phone}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {nearbyFire.length > 0 && (
                    <div>
                      <p className="text-meta font-body font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-destructive" /> Fire Stations ({nearbyFire.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyFire.map((s) => (
                          <div key={s.id} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-destructive/5 border border-destructive/10 min-h-[56px]">
                            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                              <Flame className="w-4 h-4 text-destructive" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body font-medium text-body text-foreground truncate">{s.name}</p>
                              <p className="text-meta font-body text-muted-foreground">{s.district}</p>
                            </div>
                            <a href={`tel:${s.hotline}`} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-destructive/10 text-destructive text-meta font-mono font-bold hover:bg-destructive/20 transition-colors shrink-0 min-h-[40px]">
                              <Phone className="w-3 h-3" />{s.hotline}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {nearbyAgencies.length > 0 && (
                    <div className="mt-3">
                      <p className="text-meta font-body font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-primary" /> Government Agencies ({nearbyAgencies.length})
                      </p>
                      <div className="grid gap-2">
                        {nearbyAgencies.map(({ agency, office }) => (
                          <div key={`${agency.id}-${office.zone}`} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/5 border border-primary/10 min-h-[56px]">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Building className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body font-medium text-body text-foreground truncate">{agency.acronym} — {office.zone}</p>
                              <p className="text-meta font-body text-muted-foreground">{office.manager}</p>
                            </div>
                            {office.phone && (
                              <a href={`tel:${office.phone}`} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-primary/10 text-primary text-meta font-mono font-bold hover:bg-primary/20 transition-colors shrink-0 min-h-[40px]">
                                <Phone className="w-3 h-3" />{office.phone}
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
