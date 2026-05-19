import { useEffect, useState } from "react";
import { locationsApi, type Region, type District, type Ward, type Place } from "@/lib/locationsApi";
import { useLocationStore } from "@/store/locationStore";
import { sortByPlaceName } from "@/lib/placeSort";

interface Props {
  showPlaces?: boolean;
  onSelectionChange?: (sel: {
    region?: Region;
    district?: District;
    ward?: Ward;
    place?: Place;
  }) => void;
  placeholder?: { region?: string; district?: string; ward?: string; place?: string };
}

/** Cascading Region › District › Ward › Place selector backed by HackEAC locations-API. */
export function LocationSelectorApi({ showPlaces = false, onSelectionChange, placeholder }: Props) {
  const store = useLocationStore();
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState({ districts: false, wards: false, places: false });

  useEffect(() => {
    if (!store.selectedRegion) { setDistricts([]); return; }
    setLoading((l) => ({ ...l, districts: true }));
    locationsApi
      .getRegionDistricts(store.selectedRegion.regionCode)
      .then((res) => setDistricts(sortByPlaceName(res.data)))
      .catch(() => setDistricts([]))
      .finally(() => setLoading((l) => ({ ...l, districts: false })));
  }, [store.selectedRegion?.regionCode]);

  useEffect(() => {
    if (!store.selectedDistrict) { setWards([]); return; }
    setLoading((l) => ({ ...l, wards: true }));
    locationsApi
      .getDistrictWards(store.selectedDistrict.districtCode)
      .then((res) => setWards(sortByPlaceName(res.data)))
      .catch(() => setWards([]))
      .finally(() => setLoading((l) => ({ ...l, wards: false })));
  }, [store.selectedDistrict?.districtCode]);

  useEffect(() => {
    if (!store.selectedWard || !showPlaces) { setPlaces([]); return; }
    setLoading((l) => ({ ...l, places: true }));
    locationsApi
      .getWardPlaces(store.selectedWard.wardCode)
      .then((res) => setPlaces(sortByPlaceName(res.data)))
      .catch(() => setPlaces([]))
      .finally(() => setLoading((l) => ({ ...l, places: false })));
  }, [store.selectedWard?.wardCode, showPlaces]);

  useEffect(() => {
    onSelectionChange?.({
      region: store.selectedRegion ?? undefined,
      district: store.selectedDistrict ?? undefined,
      ward: store.selectedWard ?? undefined,
      place: store.selectedPlace ?? undefined,
    });
  }, [store.selectedRegion, store.selectedDistrict, store.selectedWard, store.selectedPlace]);

  const selectClass =
    "w-full appearance-none cursor-pointer bg-card border border-border rounded-xl px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]";

  return (
    <div className="flex flex-col gap-3">
      <select
        className={selectClass}
        value={store.selectedRegion?.regionCode ?? ""}
        onChange={(e) => {
          const r = store.allRegions.find((x) => x.regionCode === e.target.value) ?? null;
          store.setSelectedRegion(r);
        }}
        aria-label="Mkoa / Region"
      >
        <option value="">{placeholder?.region ?? "Chagua Mkoa (Select Region)"}</option>
        {store.allRegions.map((r) => (
          <option key={r.regionCode} value={r.regionCode}>{r.name}</option>
        ))}
      </select>

      {store.selectedRegion && (
        <select
          className={selectClass}
          value={store.selectedDistrict?.districtCode ?? ""}
          disabled={loading.districts}
          onChange={(e) => {
            const d = districts.find((x) => x.districtCode === e.target.value) ?? null;
            store.setSelectedDistrict(d);
          }}
          aria-label="Wilaya / District"
        >
          <option value="">
            {loading.districts ? "Inapakia..." : placeholder?.district ?? "Chagua Wilaya (Select District)"}
          </option>
          {districts.map((d) => (
            <option key={d.districtCode} value={d.districtCode}>{d.name}</option>
          ))}
        </select>
      )}

      {store.selectedDistrict && (
        <select
          className={selectClass}
          value={store.selectedWard?.wardCode ?? ""}
          disabled={loading.wards}
          onChange={(e) => {
            const w = wards.find((x) => x.wardCode === e.target.value) ?? null;
            store.setSelectedWard(w);
          }}
          aria-label="Kata / Ward"
        >
          <option value="">
            {loading.wards ? "Inapakia..." : placeholder?.ward ?? "Chagua Kata (Select Ward)"}
          </option>
          {wards.map((w) => (
            <option key={w.wardCode} value={w.wardCode}>
              {w.name}{w.wardCode ? ` · ${w.wardCode}` : ""}
            </option>
          ))}
        </select>
      )}

      {store.selectedWard?.wardCode && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-primary/40 self-start">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">
            Kode ya Kata
          </span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {store.selectedWard.wardCode}
          </span>
        </div>
      )}

      {showPlaces && store.selectedWard && (
        <select
          className={selectClass}
          value={store.selectedPlace?.id ?? ""}
          disabled={loading.places}
          onChange={(e) => {
            const p = places.find((x) => String(x.id) === e.target.value) ?? null;
            store.setSelectedPlace(p);
          }}
          aria-label="Mtaa / Place"
        >
          <option value="">
            {loading.places ? "Inapakia..." : placeholder?.place ?? "Chagua Mtaa (Select Street/Place)"}
          </option>
          {places.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default LocationSelectorApi;
