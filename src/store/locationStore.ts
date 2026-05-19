import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Region, District, Ward, Place } from "@/lib/locationsApi";

interface LocationStore {
  allRegions: Region[];
  regionsLoaded: boolean;
  apiAvailable: boolean;

  selectedRegion: Region | null;
  selectedDistrict: District | null;
  selectedWard: Ward | null;
  selectedPlace: Place | null;

  homeRegionCode: string | null;
  homeDistrictCode: string | null;
  homeWardCode: string | null;

  setAllRegions: (regions: Region[]) => void;
  setApiAvailable: (ok: boolean) => void;
  setSelectedRegion: (region: Region | null) => void;
  setSelectedDistrict: (district: District | null) => void;
  setSelectedWard: (ward: Ward | null) => void;
  setSelectedPlace: (place: Place | null) => void;
  setHomeLocation: (regionCode: string, districtCode?: string, wardCode?: string) => void;
  clearSelection: () => void;

  getBreadcrumb: () => string;
  getActiveWardCode: () => string | null;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      allRegions: [],
      regionsLoaded: false,
      apiAvailable: true,
      selectedRegion: null,
      selectedDistrict: null,
      selectedWard: null,
      selectedPlace: null,
      homeRegionCode: null,
      homeDistrictCode: null,
      homeWardCode: null,

      setAllRegions: (regions) => set({ allRegions: regions, regionsLoaded: true }),
      setApiAvailable: (ok) => set({ apiAvailable: ok }),
      setSelectedRegion: (region) =>
        set({ selectedRegion: region, selectedDistrict: null, selectedWard: null, selectedPlace: null }),
      setSelectedDistrict: (district) =>
        set({ selectedDistrict: district, selectedWard: null, selectedPlace: null }),
      setSelectedWard: (ward) => set({ selectedWard: ward, selectedPlace: null }),
      setSelectedPlace: (place) => set({ selectedPlace: place }),

      setHomeLocation: (regionCode, districtCode, wardCode) =>
        set({
          homeRegionCode: regionCode,
          homeDistrictCode: districtCode ?? null,
          homeWardCode: wardCode ?? null,
        }),

      clearSelection: () =>
        set({ selectedRegion: null, selectedDistrict: null, selectedWard: null, selectedPlace: null }),

      getBreadcrumb: () => {
        const { selectedRegion, selectedDistrict, selectedWard, selectedPlace } = get();
        const parts = ["Tanzania"];
        if (selectedRegion) parts.push(selectedRegion.name);
        if (selectedDistrict) parts.push(selectedDistrict.name);
        if (selectedWard) parts.push(selectedWard.name);
        if (selectedPlace) parts.push(selectedPlace.name);
        return parts.join(" › ");
      },

      getActiveWardCode: () => get().selectedWard?.wardCode ?? null,
    }),
    {
      name: "sema-location",
      partialize: (state) => ({
        homeRegionCode: state.homeRegionCode,
        homeDistrictCode: state.homeDistrictCode,
        homeWardCode: state.homeWardCode,
      }),
    },
  ),
);
