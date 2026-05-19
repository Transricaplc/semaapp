import { useEffect, useRef, useState } from "react";
import { locationsApi, type SearchResult } from "@/lib/locationsApi";

/** Debounced /v1/search hook. Respects API rate limit (30 req/min). */
export function useLocationSearch(query: string, debounceMs = 350) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      setRateLimited(false);
      try {
        const res = await locationsApi.search(query.trim());
        setResults(res.data);
      } catch (err) {
        if (err instanceof Error && err.message === "RATE_LIMITED") setRateLimited(true);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  return { results, loading, rateLimited };
}
