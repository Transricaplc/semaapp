// HackEAC Locations API client — canonical Tanzania location data layer.
// Spec: api.tanzanialocations.org. All location dropdowns / search / breadcrumbs
// route through this module — never raw fetch in components.

const BASE =
  (import.meta.env.VITE_LOCATIONS_API_BASE as string | undefined) ??
  "https://api.tanzanialocations.org/v1";

export interface Region {
  id: number;
  name: string;
  regionCode: string;
  countryId: number;
}

export interface District {
  id: number;
  name: string;
  districtCode: string;
  regionCode: string;
  region?: Region;
}

export interface Ward {
  id: number;
  name: string;
  wardCode: string;
  districtCode: string;
  regionCode: string;
  district?: District;
}

export interface Place {
  id: number;
  name: string;
  wardCode: string;
  ward?: Ward;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface SearchResult {
  type: "region" | "district" | "ward" | "place";
  id: number;
  name: string;
  code?: string;
  parent?: string;
  breadcrumb: string;
}

async function apiGet<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (res.status === 429) throw new Error("RATE_LIMITED");
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const locationsApi = {
  getRegions: () => apiGet<PaginatedResponse<Region>>("/regions", { limit: 50 }),
  getDistricts: (regionCode: string) =>
    apiGet<PaginatedResponse<District>>("/districts", { regionCode, limit: 200 }),
  getWards: (districtCode: string, regionCode?: string) =>
    apiGet<PaginatedResponse<Ward>>("/wards", {
      districtCode,
      ...(regionCode ? { regionCode } : {}),
      limit: 500,
    }),
  getPlaces: (wardCode: string) =>
    apiGet<PaginatedResponse<Place>>("/places", { wardCode, limit: 200 }),

  getRegion: (regionCode: string) => apiGet<Region>(`/regions/${regionCode}`),
  getDistrict: (districtCode: string) => apiGet<District>(`/districts/${districtCode}`),
  getWard: (wardCode: string) => apiGet<Ward>(`/wards/${wardCode}`),
  getPlace: (placeId: number) => apiGet<Place>(`/places/${placeId}`),

  getRegionDistricts: (regionCode: string) =>
    apiGet<PaginatedResponse<District>>(`/regions/${regionCode}/districts`, { limit: 200 }),
  getDistrictWards: (districtCode: string) =>
    apiGet<PaginatedResponse<Ward>>(`/districts/${districtCode}/wards`, { limit: 500 }),
  getWardPlaces: (wardCode: string) =>
    apiGet<PaginatedResponse<Place>>(`/wards/${wardCode}/places`, { limit: 200 }),

  search: (q: string, page = 1) =>
    apiGet<PaginatedResponse<SearchResult>>("/search", { q, page, limit: 20 }),
};

// Static 26-region fallback when the API is unreachable.
export const STATIC_REGIONS_FALLBACK: Region[] = [
  { id: 1,  name: "Arusha",        regionCode: "ARU", countryId: 1 },
  { id: 2,  name: "Dar-es-Salaam", regionCode: "DAR", countryId: 1 },
  { id: 3,  name: "Dodoma",        regionCode: "DOD", countryId: 1 },
  { id: 4,  name: "Geita",         regionCode: "GEI", countryId: 1 },
  { id: 5,  name: "Iringa",        regionCode: "IRI", countryId: 1 },
  { id: 6,  name: "Kagera",        regionCode: "KAG", countryId: 1 },
  { id: 7,  name: "Katavi",        regionCode: "KAT", countryId: 1 },
  { id: 8,  name: "Kigoma",        regionCode: "KIG", countryId: 1 },
  { id: 9,  name: "Kilimanjaro",   regionCode: "KIL", countryId: 1 },
  { id: 10, name: "Lindi",         regionCode: "LIN", countryId: 1 },
  { id: 11, name: "Manyara",       regionCode: "MAN", countryId: 1 },
  { id: 12, name: "Mara",          regionCode: "MAR", countryId: 1 },
  { id: 13, name: "Mbeya",         regionCode: "MBE", countryId: 1 },
  { id: 14, name: "Morogoro",      regionCode: "MOR", countryId: 1 },
  { id: 15, name: "Mtwara",        regionCode: "MTW", countryId: 1 },
  { id: 16, name: "Mwanza",        regionCode: "MWA", countryId: 1 },
  { id: 17, name: "Njombe",        regionCode: "NJO", countryId: 1 },
  { id: 18, name: "Pwani",         regionCode: "PWA", countryId: 1 },
  { id: 19, name: "Rukwa",         regionCode: "RUK", countryId: 1 },
  { id: 20, name: "Ruvuma",        regionCode: "RUV", countryId: 1 },
  { id: 21, name: "Shinyanga",     regionCode: "SHI", countryId: 1 },
  { id: 22, name: "Simiyu",        regionCode: "SIM", countryId: 1 },
  { id: 23, name: "Singida",       regionCode: "SIN", countryId: 1 },
  { id: 24, name: "Songwe",        regionCode: "SON", countryId: 1 },
  { id: 25, name: "Tabora",        regionCode: "TAB", countryId: 1 },
  { id: 26, name: "Tanga",         regionCode: "TAN", countryId: 1 },
];

const REGIONS_CACHE_KEY = "sema_regions_cache";

export async function getRegionsWithFallback(): Promise<Region[]> {
  try {
    const res = await locationsApi.getRegions();
    try { sessionStorage.setItem(REGIONS_CACHE_KEY, JSON.stringify(res.data)); } catch {}
    return res.data;
  } catch {
    try {
      const cached = sessionStorage.getItem(REGIONS_CACHE_KEY);
      if (cached) return JSON.parse(cached) as Region[];
    } catch {}
    return STATIC_REGIONS_FALLBACK;
  }
}
