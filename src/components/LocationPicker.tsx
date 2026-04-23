import { useEffect } from "react";
import { useLocationHierarchy } from "@/hooks/useLocationHierarchy";

export type LocationLabels = {
  mkoa_jina?: string;
  wilaya_jina?: string;
  kata_jina?: string;
};

interface LocationPickerProps {
  initial?: { mkoa_id?: number | null; wilaya_id?: number | null; kata_id?: number | null };
  onChange?: (
    mkoa_id: number | null,
    wilaya_id: number | null,
    kata_id: number | null,
    labels: LocationLabels,
  ) => void;
  showReset?: boolean;
}

export default function LocationPicker({ initial, onChange, showReset = true }: LocationPickerProps) {
  const {
    mikoa,
    wilaya,
    kata,
    selectedMkoa,
    selectedWilaya,
    selectedKata,
    setSelectedMkoa,
    setSelectedWilaya,
    setSelectedKata,
    reset,
  } = useLocationHierarchy(initial);

  useEffect(() => {
    if (!onChange) return;
    const mkoa_jina = mikoa.find((m) => m.id === selectedMkoa)?.jina;
    const wilaya_jina = wilaya.find((w) => w.id === selectedWilaya)?.jina;
    const kata_jina = kata.find((k) => k.id === selectedKata)?.jina;
    onChange(selectedMkoa, selectedWilaya, selectedKata, { mkoa_jina, wilaya_jina, kata_jina });
  }, [selectedMkoa, selectedWilaya, selectedKata, mikoa, wilaya, kata, onChange]);

  const selectClass =
    "w-full appearance-none cursor-pointer bg-card border border-border rounded-xl px-4 py-3 text-body font-body text-foreground focus:border-primary focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]";
  const labelClass =
    "block text-meta font-body uppercase tracking-widest text-muted-foreground mb-1.5";

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Mkoa</label>
        <select
          className={selectClass}
          value={selectedMkoa ?? ""}
          onChange={(e) => setSelectedMkoa(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Chagua Mkoa...</option>
          {mikoa.map((m) => (
            <option key={m.id} value={m.id}>
              {m.jina}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Wilaya</label>
        <select
          className={selectClass}
          value={selectedWilaya ?? ""}
          onChange={(e) => setSelectedWilaya(e.target.value ? Number(e.target.value) : null)}
          disabled={!selectedMkoa}
        >
          <option value="">{selectedMkoa ? "Chagua Wilaya..." : "Chagua Mkoa kwanza"}</option>
          {wilaya.map((w) => (
            <option key={w.id} value={w.id}>
              {w.jina}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Kata</label>
        <select
          className={selectClass}
          value={selectedKata ?? ""}
          onChange={(e) => setSelectedKata(e.target.value ? Number(e.target.value) : null)}
          disabled={!selectedWilaya}
        >
          <option value="">{selectedWilaya ? "Chagua Kata..." : "Chagua Wilaya kwanza"}</option>
          {kata.map((k) => (
            <option key={k.id} value={k.id}>
              {k.jina}
            </option>
          ))}
        </select>
      </div>

      {showReset && (selectedMkoa || selectedWilaya || selectedKata) && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="text-meta font-body text-primary hover:underline"
          >
            Weka upya
          </button>
        </div>
      )}
    </div>
  );
}
