import { Phone } from "lucide-react";

const EMERGENCY_NUMBERS: { name: string; number: string }[] = [
  { name: "Polisi", number: "112" },
  { name: "Zimamoto", number: "115" },
  { name: "Hospitali ya Dharura", number: "114" },
  { name: "NIDA", number: "0800110016" },
  { name: "TAKUKURU", number: "113" },
];

export default function EmergencyStrip() {
  return (
    <div
      className="bg-[hsl(0_85%_97%)] border-b border-[hsl(0_85%_88%)] px-4 py-2 overflow-x-auto whitespace-nowrap no-scrollbar"
      role="region"
      aria-label="Namba za dharura"
    >
      {EMERGENCY_NUMBERS.map((e) => (
        <a
          key={e.number}
          href={`tel:${e.number}`}
          className="inline-flex items-center gap-1.5 bg-surface border border-[hsl(0_85%_88%)] rounded-full px-3 py-1 mr-2 active:opacity-65 transition-opacity"
        >
          <Phone className="w-3 h-3 fill-destructive text-destructive shrink-0" strokeWidth={0} />
          <span className="font-ui text-[11px] font-semibold text-destructive">{e.name}</span>
          <span className="font-code text-[11px] text-ink">{e.number}</span>
        </a>
      ))}
    </div>
  );
}
