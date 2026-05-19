import { useState } from "react";
import Report from "./Report";
import Tracker from "./Tracker";
import { useLanguage } from "@/contexts/LanguageContext";

type Tab = "mpya" | "historia";

export default function Ripoti() {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("mpya");

  const labels = {
    mpya: lang === "sw" ? "Mpya" : "New",
    historia: lang === "sw" ? "Historia" : "History",
  };

  return (
    <div className="font-ui animate-fade-in">
      <div
        className="sticky top-0 z-30 bg-cream border-b border-gazette-border"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          {(["mpya", "historia"] as Tab[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 min-h-[40px] rounded-xl px-4 py-2 text-[13px] font-medium transition-colors border ${
                  active
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-surface text-ink border-gazette-border"
                }`}
                aria-pressed={active}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "mpya" ? <Report /> : <Tracker />}
    </div>
  );
}
