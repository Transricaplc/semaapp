// Walks the HackEAC cascade endpoints to fully populate the location store
// from a single search hit (region | district | ward | place). After this
// runs, useOfficialsByLocation will pair the deepest matching code against
// region_code / district_code / ward_code on the Supabase officials table.

import { locationsApi, type Region, type District, type Ward, type Place } from "@/lib/locationsApi";
import { useLocationStore } from "@/store/locationStore";
import type { SearchResult } from "@/lib/locationsApi";

async function findRegionByCode(code: string): Promise<Region | null> {
  const store = useLocationStore.getState();
  const cached = store.allRegions.find((r) => r.regionCode === code);
  if (cached) return cached;
  try {
    return await locationsApi.getRegion(code);
  } catch {
    return null;
  }
}

async function loadDistrict(districtCode: string): Promise<District | null> {
  try {
    return await locationsApi.getDistrict(districtCode);
  } catch {
    return null;
  }
}

async function loadWard(wardCode: string): Promise<Ward | null> {
  try {
    return await locationsApi.getWard(wardCode);
  } catch {
    return null;
  }
}

async function loadPlace(placeId: number): Promise<Place | null> {
  try {
    return await locationsApi.getPlace(placeId);
  } catch {
    return null;
  }
}

/** Populate the location store with the full parent chain for a search hit. */
export async function resolveAndSelectLocation(r: SearchResult): Promise<void> {
  const store = useLocationStore.getState();

  if (r.type === "region" && r.code) {
    const region = await findRegionByCode(r.code);
    if (region) store.setSelectedRegion(region);
    return;
  }

  if (r.type === "district" && r.code) {
    const district = await loadDistrict(r.code);
    if (!district) return;
    const region = await findRegionByCode(district.regionCode);
    if (region) store.setSelectedRegion(region);
    store.setSelectedDistrict(district);
    return;
  }

  if (r.type === "ward" && r.code) {
    const ward = await loadWard(r.code);
    if (!ward) return;
    const district = ward.district ?? (await loadDistrict(ward.districtCode));
    const region = await findRegionByCode(ward.regionCode);
    if (region) store.setSelectedRegion(region);
    if (district) store.setSelectedDistrict(district);
    store.setSelectedWard(ward);
    return;
  }

  if (r.type === "place") {
    const place = await loadPlace(r.id);
    if (!place) return;
    const ward = place.ward ?? (await loadWard(place.wardCode));
    if (!ward) {
      store.setSelectedPlace(place);
      return;
    }
    const district = ward.district ?? (await loadDistrict(ward.districtCode));
    const region = await findRegionByCode(ward.regionCode);
    if (region) store.setSelectedRegion(region);
    if (district) store.setSelectedDistrict(district);
    store.setSelectedWard(ward);
    store.setSelectedPlace(place);
  }
}
