import { useEffect } from "react";
import { getRegionsWithFallback, STATIC_REGIONS_FALLBACK } from "@/lib/locationsApi";
import { useLocationStore } from "@/store/locationStore";

/** Preload 26 regions once on app boot; gracefully falls back to cached/static list. */
export default function LocationsApiBootstrap() {
  const regionsLoaded = useLocationStore((s) => s.regionsLoaded);
  const setAllRegions = useLocationStore((s) => s.setAllRegions);
  const setApiAvailable = useLocationStore((s) => s.setApiAvailable);

  useEffect(() => {
    if (regionsLoaded) return;
    let cancelled = false;
    (async () => {
      try {
        const regions = await getRegionsWithFallback();
        if (cancelled) return;
        setAllRegions(regions);
        // If we got the static fallback verbatim, mark API as unavailable.
        setApiAvailable(regions !== STATIC_REGIONS_FALLBACK);
      } catch {
        if (!cancelled) {
          setAllRegions(STATIC_REGIONS_FALLBACK);
          setApiAvailable(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [regionsLoaded, setAllRegions, setApiAvailable]);

  return null;
}
