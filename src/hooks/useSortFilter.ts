import { useMemo, useState } from "react";
import type { Official } from "@/data/unified_officials";

export type SortKey =
  | "name-asc"
  | "name-desc"
  | "ministry"
  | "region"
  | "score-desc"
  | "recent"
  | "verified";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name-asc", label: "Jina A → Z" },
  { key: "name-desc", label: "Jina Z → A" },
  { key: "ministry", label: "Wizara / Idara" },
  { key: "region", label: "Mkoa (A → Z)" },
  { key: "score-desc", label: "Alama ya Uwazi ↓" },
  { key: "recent", label: "Hivi Karibuni" },
  { key: "verified", label: "Imehakikishwa Tu" },
];

export const GROUPING_KEYS: SortKey[] = ["ministry", "region"];

/** Pseudo-stable score in [40..98] derived from id, used until Supabase scores exist. */
function pseudoScore(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return 40 + (Math.abs(h) % 59);
}

export function getOfficialScore(o: Official): number {
  return pseudoScore(o.id);
}

export function applySort(list: Official[], sortBy: SortKey): Official[] {
  const arr = [...list];
  switch (sortBy) {
    case "name-asc":
      return arr.sort((a, b) => a.full_name.localeCompare(b.full_name));
    case "name-desc":
      return arr.sort((a, b) => b.full_name.localeCompare(a.full_name));
    case "ministry":
      return arr.sort((a, b) =>
        (a.institution.ministry || "Nyingine").localeCompare(b.institution.ministry || "Nyingine") ||
        a.full_name.localeCompare(b.full_name)
      );
    case "region":
      return arr.sort((a, b) =>
        (a.location.region || "Nyingine").localeCompare(b.location.region || "Nyingine") ||
        a.full_name.localeCompare(b.full_name)
      );
    case "score-desc":
      return arr.sort((a, b) => getOfficialScore(b) - getOfficialScore(a));
    case "recent":
      // No timestamps yet — reverse stable order as proxy for "newest first"
      return arr.reverse();
    case "verified":
      return arr.filter((o) => o.verified_status === "VERIFIED");
    default:
      return arr;
  }
}

export function groupBySort(list: Official[], sortBy: SortKey): { label: string; items: Official[] }[] | null {
  if (!GROUPING_KEYS.includes(sortBy)) return null;
  const map = new Map<string, Official[]>();
  list.forEach((o) => {
    const key =
      sortBy === "ministry"
        ? o.institution.ministry || "Nyingine"
        : o.location.region || "Bila Mkoa";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(o);
  });
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
}

export function useSortFilter(initial: SortKey = "name-asc") {
  const [sortBy, setSortBy] = useState<SortKey>(initial);
  const isFilter = sortBy === "verified";
  return { sortBy, setSortBy, isFilter };
}

export function sortLabel(key: SortKey): string {
  return SORT_OPTIONS.find((o) => o.key === key)?.label ?? "Panga";
}

/** Convenience: returns either flat sorted list OR groups when a grouping sort is active. */
export function useSortedOfficials(list: Official[], sortBy: SortKey) {
  return useMemo(() => {
    const sorted = applySort(list, sortBy);
    const groups = groupBySort(sorted, sortBy);
    return { sorted, groups };
  }, [list, sortBy]);
}
