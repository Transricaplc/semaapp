import { getOpenStatus, parseOfficeHours, parseDutyRoster } from "@/lib/officeHours";

type OfficialLike = {
  office_hours?: unknown;
  is_open_24h?: boolean | null;
  duty_roster?: unknown;
  map_category?: string | null;
};

export function OfficeHoursBadge({ official }: { official: OfficialLike }) {
  const hours = parseOfficeHours(official.office_hours);
  const is24h = !!official.is_open_24h;
  if (!hours && !is24h) return null;

  const status = getOpenStatus(hours, is24h);

  return (
    <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
      <span
        aria-hidden
        className={`w-1.5 h-1.5 rounded-full ${
          status.isOpen
            ? "bg-[hsl(var(--verified-green,142_71%_45%))]"
            : "bg-muted-foreground"
        }`}
      />
      <span className={status.isOpen ? "text-[hsl(var(--verified-green,142_71%_45%))] font-medium" : "text-muted-foreground"}>
        {status.label}
      </span>
      {status.nextOpenLabel && (
        <span className="text-muted-foreground/80">· {status.nextOpenLabel}</span>
      )}
    </div>
  );
}

const DUTY_CATEGORIES = ["health_centre", "hospital_district", "hospital_regional", "hospital_national", "police_district", "police_regional"];

export function DutyRosterBadge({ official }: { official: OfficialLike }) {
  const roster = parseDutyRoster(official.duty_roster);
  const relevant = DUTY_CATEGORIES.includes(official.map_category ?? "");
  if (!relevant || !roster?.today?.name) return null;

  return (
    <div className="mt-1.5 flex items-center gap-2 flex-wrap rounded-lg bg-secondary border border-border px-2 py-1.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
        Leo anahudumu
      </span>
      <span className="text-[12px] text-foreground font-medium">{roster.today.name}</span>
      {roster.today.phone && (
        <a
          href={`tel:${roster.today.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[11px] text-primary"
        >
          {roster.today.phone}
        </a>
      )}
    </div>
  );
}
