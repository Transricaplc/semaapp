// Office hours + duty roster resolver (EAT / Africa/Dar_es_Salaam)

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Day = (typeof DAYS)[number];

export interface DayHours { open: string; close: string }
export type OfficeHours = Partial<Record<Day, DayHours | null>>;

export interface DutyRoster {
  today?: { name: string; phone?: string | null } | null;
  updated_at?: string;
  updated_by?: string;
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  nextOpenLabel: string;
}

const DAY_NAMES_SW: Record<Day, string> = {
  sun: "Jumapili", mon: "Jumatatu", tue: "Jumanne",
  wed: "Jumatano", thu: "Alhamisi", fri: "Ijumaa", sat: "Jumamosi",
};

export function parseOfficeHours(value: unknown): OfficeHours | null {
  if (!value) return null;
  if (typeof value === "string") {
    try { return JSON.parse(value) as OfficeHours; } catch { return null; }
  }
  if (typeof value === "object") return value as OfficeHours;
  return null;
}

export function parseDutyRoster(value: unknown): DutyRoster | null {
  if (!value) return null;
  if (typeof value === "string") {
    try { return JSON.parse(value) as DutyRoster; } catch { return null; }
  }
  if (typeof value === "object") return value as DutyRoster;
  return null;
}

export function getOpenStatus(officeHours: OfficeHours | null, is24h: boolean): OpenStatus {
  if (is24h) return { isOpen: true, label: "Wazi 24/7", nextOpenLabel: "" };
  if (!officeHours) return { isOpen: false, label: "Muda haujulikani", nextOpenLabel: "" };

  const eat = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Dar_es_Salaam" })
  );
  const dayIndex = eat.getDay();
  const hours = officeHours[DAYS[dayIndex]];
  const currentMinutes = eat.getHours() * 60 + eat.getMinutes();

  if (hours?.open && hours?.close) {
    const [oh, om] = hours.open.split(":").map(Number);
    const [ch, cm] = hours.close.split(":").map(Number);
    if (currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm) {
      return { isOpen: true, label: `Wazi · Inafunga ${hours.close}`, nextOpenLabel: "" };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const nextDay = DAYS[(dayIndex + i) % 7];
    const nextHours = officeHours[nextDay];
    if (nextHours?.open) {
      return {
        isOpen: false,
        label: "Imefungwa",
        nextOpenLabel: `Inafungua ${DAY_NAMES_SW[nextDay]} ${nextHours.open}`,
      };
    }
  }
  return { isOpen: false, label: "Imefungwa", nextOpenLabel: "" };
}
