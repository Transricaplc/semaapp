import { useState, useEffect } from "react";
import { MapPin, X, ChevronDown } from "lucide-react";
import LocationPicker, { type LocationLabels } from "@/components/LocationPicker";

interface Props {
  /** When picker resolves a region label, page should set its text filter */
  onRegionLabelChange: (region: string, district: string) => void;
  currentRegion: string;
}

export default function LocationFilterChip({ onRegionLabelChange, currentRegion }: Props) {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<LocationLabels>({});

  useEffect(() => {
    if (!open) return;
  }, [open]);

  const handleChange = (
    _mkoa: number | null,
    _wilaya: number | null,
    _kata: number | null,
    l: LocationLabels,
  ) => {
    setLabels(l);
    onRegionLabelChange(l.mkoa_jina ?? "", l.wilaya_jina ?? "");
  };

  const activeLabel = labels.kata_jina || labels.wilaya_jina || labels.mkoa_jina || currentRegion;

  return (
    <div className="px-4 pb-3">
      {activeLabel ? (
        <div className="inline-flex items-center gap-1.5 bg-secondary text-primary rounded-full px-3 py-1.5 text-[12px] font-medium">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px]">{activeLabel}</span>
          <button
            type="button"
            onClick={() => {
              setLabels({});
              onRegionLabelChange("", "");
              setOpen(false);
            }}
            aria-label="Ondoa chujio"
            className="ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 bg-surface border border-gazette-border rounded-full px-3 py-1.5 text-[12px] font-medium text-ink active:opacity-65 transition-opacity"
        >
          <MapPin className="w-3.5 h-3.5 text-text-secondary" />
          Eneo lolote Tanzania
          <ChevronDown className={`w-3.5 h-3.5 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      {open && !activeLabel && (
        <div className="mt-3 bg-card border border-border rounded-xl p-4 animate-fade-in">
          <LocationPicker onChange={handleChange} />
        </div>
      )}
    </div>
  );
}
