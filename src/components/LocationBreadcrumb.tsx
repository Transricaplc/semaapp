import { useLocationStore } from "@/store/locationStore";

interface Props { compact?: boolean }

export function LocationBreadcrumb({ compact = false }: Props) {
  const {
    selectedRegion, selectedDistrict, selectedWard, selectedPlace,
    clearSelection, setSelectedDistrict, setSelectedWard,
  } = useLocationStore();

  type Part = { label: string; code?: string; onClick?: () => void };
  const parts: Part[] = [{ label: "Tanzania", onClick: clearSelection }];
  if (selectedRegion)
    parts.push({
      label: selectedRegion.name,
      onClick: () => { setSelectedDistrict(null); setSelectedWard(null); },
    });
  if (selectedDistrict)
    parts.push({ label: selectedDistrict.name, onClick: () => setSelectedWard(null) });
  if (selectedWard) parts.push({ label: selectedWard.name, code: selectedWard.wardCode });
  if (selectedPlace) parts.push({ label: selectedPlace.name });

  const renderPart = (p: Part, i: number, last: boolean) => (
    <span key={i} className="inline-flex items-center gap-1">
      {i > 0 && <span className="text-border mx-1">›</span>}
      <button
        type="button"
        onClick={p.onClick}
        disabled={!p.onClick}
        className={
          last
            ? "text-foreground font-semibold cursor-default"
            : "text-muted-foreground hover:text-foreground underline decoration-primary underline-offset-2"
        }
      >
        {p.label}
      </button>
      {p.code && (
        <code className="ml-1 px-1.5 py-0.5 rounded bg-secondary text-[10px] font-mono text-foreground">
          {p.code}
        </code>
      )}
    </span>
  );

  if (compact && parts.length > 3) {
    const tail = parts.slice(-2);
    return (
      <nav className="flex flex-wrap items-center gap-1 font-mono text-[11px]" aria-label="Location">
        {renderPart(parts[0], 0, false)}
        <span className="text-border mx-1">›</span>
        <span className="text-muted-foreground">…</span>
        {tail.map((p, i) => renderPart(p, i + 1, i === tail.length - 1))}
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap items-center gap-0.5 font-mono text-[11px]" aria-label="Location">
      {parts.map((p, i) => renderPart(p, i, i === parts.length - 1))}
    </nav>
  );
}

export default LocationBreadcrumb;
