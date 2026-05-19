import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocationStore } from "@/store/locationStore";

/** Officials filtered by the deepest selected location code. */
export function useOfficialsByLocation() {
  const selectedRegion = useLocationStore((s) => s.selectedRegion);
  const selectedDistrict = useLocationStore((s) => s.selectedDistrict);
  const selectedWard = useLocationStore((s) => s.selectedWard);

  return useQuery({
    queryKey: [
      "officials-by-location",
      selectedRegion?.regionCode ?? null,
      selectedDistrict?.districtCode ?? null,
      selectedWard?.wardCode ?? null,
    ],
    queryFn: async () => {
      let q = supabase.from("officials").select("*");
      if (selectedWard?.wardCode) q = q.eq("ward_code", selectedWard.wardCode);
      else if (selectedDistrict?.districtCode) q = q.eq("district_code", selectedDistrict.districtCode);
      else if (selectedRegion?.regionCode) q = q.eq("region_code", selectedRegion.regionCode);
      const { data, error } = await q.order("map_category").limit(100);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!(selectedRegion || selectedDistrict || selectedWard),
    staleTime: 1000 * 60 * 5,
  });
}
