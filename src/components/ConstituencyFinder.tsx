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
import { supabase } from "@/integrations/supabase/client";

const ZANZIBAR_REGIONS = ["Mjini Magharibi", "Kaskazini Unguja", "Kusini Unguja", "Kaskazini Pemba", "Kusini Pemba"];

export default function ConstituencyFinder() {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [results, setResults] = useState<Official[] | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HealthFacility[]>([]);
  const [nearbyFire, setNearbyFire] = useState<FireStation[]>([]);
  const [nearbyAgencies, setNearbyAgencies] = useState<{ agency: Agency; office: ZonalOffice }[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [resolvedHierarchy, setResolvedHierarchy] = useState<string>("");

  const availableDistricts = region ? districtsByRegion[region] || [] : [];

  const handleSearch = () => {
    if (!region) return;
    setResults(getYourOfficials(region, district || undefined));
    setNearbyHospitals((district ? getFacilitiesByDistrict(region, district) : getFacilitiesByRegion(region)).slice(0, 5));
    setNearbyFire((district ? getFireStationsByDistrict(region, district) : getFireStationsByRegion(region)).slice(0, 3));
    setNearbyAgencies(getAgenciesForRegion(region).slice(0, 4));
    try {
      localStorage.setItem("sema_selected_region", region);
      localStorage.setItem("sema_selected_district", district || "");
      window.dispatchEvent(new Event("sema_location_changed"));
    } catch {}
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
    setResolvedHierarchy("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = +pos.coords.latitude.toFixed(5);
        const lng = +pos.coords.longitude.toFixed(5);
        setCoords({ lat, lng });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "sw,en" } },
          );
          const geo = await res.json();
          const regionRaw = geo.address?.state || geo.address?.region || "";
          const districtRaw = geo.address?.county || geo.address?.district || "";
          const wardRaw = geo.address?.suburb || geo.address?.ward || geo.address?.neighbourhood || "";

          const cleanRegion = regionRaw.replace(/region/i, "").trim();
          const cleanDistrict = districtRaw.replace(/district/i, "").trim();

          let mkoaJina = "", wilayaJina = "", kataJina = "";
          if (cleanRegion) {
            const { data: mkoa } = await supabase
              .from("mikoa").select("id, jina")
              .ilike("jina", `%${cleanRegion}%`).limit(1).maybeSingle();
            if (mkoa) {
              mkoaJina = mkoa.jina;
              setRegion(mkoa.jina);
              if (cleanDistrict) {
                const { data: wil } = await supabase
                  .from("wilaya").select("id, jina")
                  .eq("mkoa_id", mkoa.id)
                  .ilike("jina", `%${cleanDistrict}%`).limit(1).maybeSingle();
                if (wil) {
                  wilayaJina = wil.jina;
                  if (wardRaw) {
                    const { data: kt } = await supabase
                      .from("kata").select("jina")
                      .eq("wilaya_id", wil.id)
                      .ilike("jina", `%${wardRaw.trim()}%`).limit(1).maybeSingle();
                    if (kt) kataJina = kt.jina;
                  }
                }
              }
            }
          }
          const breadcrumb = [mkoaJina, wilayaJina, kataJina].filter(Boolean).join(" › ");
          if (breadcrumb) {
            setResolvedHierarchy(breadcrumb);
            toast.success(`Eneo: ${breadcrumb}`);
          } else {
            toast.success(`Eneo: ${lat}, ${lng}`);
          }
        } catch {
          toast.success(`Eneo: ${lat}, ${lng}`);
        }
        setGpsLoading(false);
      },
      () => {
        setGpsLoading(false);
        toast.error("Haiwezi kupata mahali pako");
      },
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
          <span>
            {resolvedHierarchy ? (
              <>📍 <span className="font-heading text-h3 text-primary">{resolvedHierarchy}</span></>
            ) : (
              <>Eneo lako: <span className="font-mono">{coords.lat}, {coords.lng}</span> — chagua mkoa & wilaya hapa chini</>
            )}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-meta font-body font-medium text-muted-foreground mb-1.5 block">Region</label>
          <select value={region} onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-3 text-body font-body min-h-[48px]">
            <option value="">— All Regions —</option>
            <optgroup label="MAINLAND TANZANIA">
              {allRegionNames.filter((m) => !ZANZIBAR_REGIONS.includes(m)).map((m) => <option key={m} value={m}>{m}</option>)}
            </optgroup>
            <optgroup label="ZANZIBAR">
              {allRegionNames.filter((m) => ZANZIBAR_REGIONS.includes(m)).map((m) => <option key={m} value={m}>{m}</option>)}
            </optgroup>
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
              {ZANZIBAR_REGIONS.includes(region) && (
                <>
                  <div className="flex gap-0 w-20 h-1 mx-auto mb-4 rounded-full overflow-hidden">
                    <div className="flex-1 bg-[#1EB2E0]" />
                    <div className="flex-1 bg-[#1C1C1E]" />
                    <div className="flex-1 bg-[#006B3F]" />
                  </div>
                  <div className="flex items-start gap-3 px-4 py-3 bg-[#1EB2E0]/10 border border-[#1EB2E0]/20 rounded-xl mb-4">
                    <span className="text-2xl shrink-0">🏝️</span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-foreground">Zanzibar Revolutionary Government</p>
                      <p className="text-[12px] text-muted-foreground">
                        Zanzibar operates under a semi-autonomous government (Serikali ya Mapinduzi Zanzibar). For Union matters, Union officials also apply.
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[12px] font-medium">
                        <a href="https://hor.go.tz" target="_blank" rel="noopener noreferrer" className="text-[#1EB2E0] hover:underline">House of Representatives →</a>
                        <a href="https://zanzibarstate.go.tz" target="_blank" rel="noopener noreferrer" className="text-[#1EB2E0] hover:underline">State House Zanzibar →</a>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
