import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { locationsApi, type SearchResult } from "@/lib/locationsApi";

/** Fan-out search: officials (Supabase) + locations (HackEAC API), debounced. */
export function useUnifiedSearch(query: string, debounceMs = 350) {
  const [officialResults, setOfficialResults] = useState<any[]>([]);
  const [locationResults, setLocationResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setOfficialResults([]);
      setLocationResults([]);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      const q = query.trim();
      const [officialsRes, locationsRes] = await Promise.allSettled([
        supabase
          .from("officials")
          .select("*")
          .or(
            [
              `full_name.ilike.%${q}%`,
              `role_title.ilike.%${q}%`,
              `role_title_sw.ilike.%${q}%`,
              `department.ilike.%${q}%`,
              `place_name.ilike.%${q}%`,
              `region_code.ilike.%${q}%`,
              `district_code.ilike.%${q}%`,
              `ward_code.ilike.%${q}%`,
            ].join(","),
          )
          .limit(8),
        locationsApi.search(q),
      ]);
      if (officialsRes.status === "fulfilled") setOfficialResults(officialsRes.value.data ?? []);
      else setOfficialResults([]);
      if (locationsRes.status === "fulfilled") setLocationResults(locationsRes.value.data.slice(0, 5));
      else setLocationResults([]);
      setLoading(false);
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  return { officialResults, locationResults, loading };
}
