// Lightweight CSV exporter — no deps, RFC 4180 quoting.
// Used by the directory "Pakua CSV" actions.

export type CsvRow = Record<string, string | number | null | undefined>;

function escapeCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // Quote if contains comma, quote, newline, or leading/trailing whitespace
  if (/[",\n\r]/.test(s) || /^\s|\s$/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(rows: CsvRow[], headers?: string[]): string {
  if (rows.length === 0) return "";
  const cols = headers ?? Object.keys(rows[0]);
  const lines = [cols.map(escapeCell).join(",")];
  for (const r of rows) {
    lines.push(cols.map((c) => escapeCell(r[c])).join(","));
  }
  // BOM for Excel/Swahili diacritic compatibility
  return "\uFEFF" + lines.join("\r\n");
}

export function downloadCsv(filename: string, rows: CsvRow[], headers?: string[]) {
  const blob = new Blob([toCsv(rows, headers)], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
