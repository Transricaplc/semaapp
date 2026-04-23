import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/hooks/useSortFilter";

interface SortSheetProps {
  open: boolean;
  value: SortKey;
  onClose: () => void;
  onApply: (key: SortKey) => void;
}

export default function SortSheet({ open, value, onClose, onApply }: SortSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 font-ui">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Funga"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 animate-fade-in"
      />
      {/* Sheet */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-surface rounded-t-2xl border-t border-gazette-border shadow-xl animate-slide-up max-h-[80vh] flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <span className="block w-10 h-1 rounded-full bg-gazette-border" />
        </div>

        {/* Header */}
        <div className="px-5 pb-2 flex items-center justify-between">
          <h2 className="font-serif-display text-[20px] text-ink">Panga Matokeo</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 -mr-2 flex items-center justify-center text-text-secondary active:opacity-65"
            aria-label="Funga"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <ul className="flex-1 overflow-y-auto px-2">
          {SORT_OPTIONS.map((opt) => {
            const active = opt.key === value;
            return (
              <li key={opt.key}>
                <button
                  type="button"
                  onClick={() => onApply(opt.key)}
                  className="w-full flex items-center justify-between px-3 py-4 border-b border-gazette-border/60 active:bg-cream/60 transition-colors min-h-[44px]"
                >
                  <span
                    className={`text-[14px] ${
                      active ? "text-primary font-semibold" : "text-ink font-normal"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {active && <Check className="w-4 h-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Apply */}
        <div className="px-5 pt-3 pb-4">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-ui text-[14px] font-medium active:opacity-65 transition-opacity"
          >
            Weka Mpangilio
          </button>
        </div>
      </div>
    </div>
  );
}
