import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bell, Search, Flag, Map, Mic, X } from "lucide-react";
import GlobalSearch from "@/components/GlobalSearch";
import ConstituencyFinder from "@/components/ConstituencyFinder";
import { directoryStats, getYourOfficials } from "@/data/unified_officials";
import OfficialCard from "@/components/OfficialCard";

const QUICK_ACTIONS = [
  { label: "Saka Kiongozi", to: "/saka-viongozi", icon: Search, color: "text-primary" },
  { label: "Wasilisha Ripoti", to: "/report", icon: Flag, color: "text-alert" },
  { label: "Ramani", to: "/ramani", icon: Map, color: "text-accent" },
  { label: "Sauti", to: "/sauti", icon: Mic, color: "text-primary" },
];

const SWAHILI_DAYS = ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
const SWAHILI_MONTHS = ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"];

function todayLabel() {
  const d = new Date();
  return `${SWAHILI_DAYS[d.getDay()]}, ${d.getDate()} ${SWAHILI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Index() {
  const [savedRegion, setSavedRegion] = useState("");
  const [savedDistrict, setSavedDistrict] = useState("");

  useEffect(() => {
    const read = () => {
      setSavedRegion(localStorage.getItem("sema_selected_region") || "");
      setSavedDistrict(localStorage.getItem("sema_selected_district") || "");
    };
    read();
    window.addEventListener("sema_location_changed", read);
    return () => window.removeEventListener("sema_location_changed", read);
  }, []);

  const yourOfficials = savedRegion ? getYourOfficials(savedRegion, savedDistrict || undefined) : [];

  const clearLocation = () => {
    localStorage.removeItem("sema_selected_region");
    localStorage.removeItem("sema_selected_district");
    setSavedRegion(""); setSavedDistrict("");
  };

  return (
    <div className="font-ui animate-fade-in">
      {/* ── Header ── */}
      <header
        className="px-4 pt-4 pb-3 flex items-start justify-between"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}
      >
        <div>
          <h1 className="font-serif-display text-[26px] leading-tight text-ink">Habari, Mwananchi</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">{todayLabel()}</p>
        </div>
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center" aria-label="Notifications">
          <Bell className="w-5 h-5 text-ink" strokeWidth={1.75} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-alert" />
        </button>
      </header>

      {/* ── Hero stat card ── */}
      <section className="mx-4 mt-1">
        <div className="relative bg-primary rounded-2xl p-5 overflow-hidden">
          <p className="font-serif-display text-[38px] leading-none text-primary-foreground">
            Viongozi {directoryStats.totalOfficials}+
          </p>
          <p className="text-[13px] text-primary-foreground/70 mt-2">wanapatikana Tanzania</p>
          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
        </div>
      </section>

      {/* ── Search ── */}
      <section className="mx-4 mt-4">
        <GlobalSearch />
      </section>

      {/* ── Quick action grid ── */}
      <section className="mx-4 mt-4">
        <p className="label-eyebrow mb-2">Vitendo vya haraka</p>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ label, to, icon: Icon, color }) => (
            <Link
              key={to + label}
              to={to}
              className="gazette-card p-4 flex flex-col gap-3 min-h-[88px] active:opacity-65 transition-opacity"
            >
              <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.75} />
              <span className="font-ui text-[14px] font-medium text-ink leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Viongozi wako ── */}
      <section className="mx-4 mt-6">
        <p className="label-eyebrow mb-2">Viongozi wako</p>
        <ConstituencyFinder />
      </section>

      {savedRegion && yourOfficials.length > 0 && (
        <section className="mx-4 mt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-ui text-[13px] text-text-secondary">
              {savedRegion}{savedDistrict ? ` · ${savedDistrict}` : ""}
            </p>
            <button
              onClick={clearLocation}
              className="inline-flex items-center gap-1 font-code text-[11px] text-text-secondary active:opacity-65"
            >
              <X className="w-3 h-3" /> Badilisha
            </button>
          </div>
          <div className="space-y-2">
            {yourOfficials.slice(0, 5).map((o) => (
              <OfficialCard key={`saved-${o.id}`} official={o} />
            ))}
          </div>
        </section>
      )}

      {/* ── Recent activity placeholder ── */}
      <section className="mx-4 mt-6">
        <p className="label-eyebrow mb-2">Shughuli za hivi karibuni</p>
        <div className="gazette-card divide-y divide-gazette-border">
          {[
            { label: "Uliripoti tatizo la maji", time: "2h" },
            { label: "Ulisaini ombi la barabara", time: "1d" },
            { label: "Ulipiga simu kwa Mbunge", time: "3d" },
          ].map((a) => (
            <div key={a.label} className="flex items-center justify-between px-4 py-3">
              <span className="text-[14px] text-ink">{a.label}</span>
              <span className="font-code text-[10px] text-text-secondary">{a.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
