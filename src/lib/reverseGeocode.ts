import { locationsApi, type SearchResult } from "@/lib/locationsApi";

export interface ResolvedLocation {
  ward: SearchResult | null;
  district: SearchResult | null;
  region: SearchResult | null;
  nominatimLabel: string;
  breadcrumb: string;
}

/** Reverse-geocode lat/lng to a HackEAC ward via Nominatim + /v1/search. */
export async function resolveCoordinatesToWard(
  lat: number,
  lng: number,
): Promise<ResolvedLocation | null> {
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const nominatimRes = await fetch(nominatimUrl, {
      headers: { "User-Agent": "SemaApp/1.0 (semaapp.lovable.app)" },
    });
    const nominatimData = await nominatimRes.json();
    const address = nominatimData?.address ?? {};
    const searchTerm: string =
      address.suburb ??
      address.village ??
      address.town ??
      address.quarter ??
      address.city_district ??
      address.county ??
      "";
    if (!searchTerm) return null;

    const searchRes = await locationsApi.search(searchTerm);
    const wardMatch = searchRes.data.find((r) => r.type === "ward") ?? null;
    const districtMatch = searchRes.data.find((r) => r.type === "district") ?? null;
    const regionMatch = searchRes.data.find((r) => r.type === "region") ?? null;

    return {
      ward: wardMatch,
      district: districtMatch,
      region: regionMatch,
      nominatimLabel: nominatimData?.display_name ?? "",
      breadcrumb: wardMatch?.breadcrumb ?? districtMatch?.breadcrumb ?? regionMatch?.name ?? "",
    };
  } catch {
    return null;
  }
}
