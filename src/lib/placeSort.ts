// Swahili + English aware sort key for Tanzanian place names.
//
// The HackEAC locations-API returns names in mixed conventions:
//   • English-style: "Dar es Salaam", "Kilimanjaro"
//   • Swahili admin prefixes: "Mji wa Tanga", "Halmashauri ya Wilaya ya Ilala",
//     "Wilaya ya Kinondoni", "Kata ya Kariakoo"
//   • Mixed diacritics: "Mbozí", "N'gambo"
//   • Numbered wards: "Kata 2", "Kata 10"
//
// A naive `localeCompare` groups everything starting with "Mji wa…" or "Wilaya
// ya…" together, which is wrong — we want users to find "Tanga" under T, not M.
//
// This module exposes:
//   • placeSortKey(name)        — canonicalised, lower-case, diacritic-free
//   • comparePlaceNames(a, b)   — Swahili-locale, numeric-aware comparator
//   • sortByPlaceName(items)    — convenience for arrays of { name }
//
// Always sort by the *canonical* key but render the original string.

const PREFIX_PATTERNS: RegExp[] = [
  // Swahili administrative prefixes (most → least specific)
  /^halmashauri\s+ya\s+(jiji|manispaa|mji|wilaya|kata|kijiji)\s+(la|ya|wa|cha)\s+/i,
  /^halmashauri\s+ya\s+(jiji|manispaa|mji|wilaya|kata|kijiji)\s+/i,
  /^halmashauri\s+ya\s+/i,
  /^manispaa\s+ya\s+/i,
  /^jiji\s+(la|ya)\s+/i,
  /^mji\s+(wa|mdogo\s+wa)\s+/i,
  /^wilaya\s+ya\s+/i,
  /^mkoa\s+wa\s+/i,
  /^kata\s+ya\s+/i,
  /^kijiji\s+cha\s+/i,
  /^mtaa\s+wa\s+/i,
  // English equivalents (locations-API occasionally emits these)
  /^(district|region|ward|village|street|city|town|municipality|municipal\s+council|district\s+council|city\s+council|town\s+council)\s+(of|the)\s+/i,
  /^(district|region|ward|village)\s+/i,
];

/** Strip diacritics: "Mbozí" → "Mbozi", "São" → "Sao". */
function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Canonical sort key — lowercase, diacritic-free, with admin prefixes removed. */
export function placeSortKey(name: string): string {
  if (!name) return "";
  let s = stripDiacritics(name).toLowerCase().trim();
  // Apply prefix strips repeatedly in case names nest (e.g. "Halmashauri ya Wilaya ya …").
  let prev: string;
  do {
    prev = s;
    for (const re of PREFIX_PATTERNS) {
      s = s.replace(re, "");
    }
  } while (s !== prev);
  // Collapse punctuation that breaks collation (apostrophes, hyphens, multiple spaces).
  s = s.replace(/['’`]/g, "").replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
  return s;
}

/** Swahili-locale comparator that handles numeric suffixes ("Kata 2" < "Kata 10"). */
export function comparePlaceNames(a: string, b: string): number {
  const ka = placeSortKey(a);
  const kb = placeSortKey(b);
  const cmp = ka.localeCompare(kb, "sw", { sensitivity: "base", numeric: true });
  if (cmp !== 0) return cmp;
  // Tie-break on the original string so identical canonical names stay stable.
  return a.localeCompare(b, "sw", { sensitivity: "base", numeric: true });
}

/** Returns a new array sorted by Swahili-aware place-name comparator. */
export function sortByPlaceName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => comparePlaceNames(a.name, b.name));
}
