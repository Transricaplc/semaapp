import { useLocationStore } from "@/store/locationStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle } from "lucide-react";

/**
 * Shows a thin yellow warning bar at the top whenever the HackEAC locations-API
 * is unreachable and the app is operating on cached / static fallback data.
 */
export default function LocationsOfflineBanner() {
  const apiAvailable = useLocationStore((s) => s.apiAvailable);
  const regionsLoaded = useLocationStore((s) => s.regionsLoaded);
  const { lang } = useLanguage();

  if (!regionsLoaded || apiAvailable) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-primary/95 text-ink border-b-2 border-ink/10"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-[430px] mx-auto px-4 py-2 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 mt-[2px] shrink-0" strokeWidth={2} />
        <div className="flex-1 leading-snug">
          <p className="text-[12px] font-medium">
            {lang === "sw"
              ? "Huduma ya maeneo haipo — unaona data iliyohifadhiwa"
              : "Location service unavailable — showing cached data"}
          </p>
        </div>
      </div>
    </div>
  );
}
