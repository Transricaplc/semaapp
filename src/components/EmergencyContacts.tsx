import { Phone, Shield, Flame, Heart, Scale, Users, Car, AlertTriangle, Building } from "lucide-react";
import { emergencyContacts, type EmergencyContact } from "@/data/tanzania_directory";
import { facilityStats } from "@/data/health_facilities";
import { fireStats } from "@/data/fire_stations";

const categoryIcons: Record<EmergencyContact["category"], React.ElementType> = {
  police: Shield,
  fire: Flame,
  medical: Heart,
  antigraft: Scale,
  gender: Users,
  child: Users,
  traffic: Car,
};

const categoryColors: Record<EmergencyContact["category"], string> = {
  police: "bg-destructive/10 text-destructive border-destructive/20",
  fire: "bg-destructive/15 text-destructive border-destructive/25",
  medical: "bg-accent/10 text-accent border-accent/20",
  antigraft: "bg-gold/15 text-foreground border-gold/30",
  gender: "bg-primary/10 text-primary border-primary/20",
  child: "bg-primary/10 text-primary border-primary/20",
  traffic: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function EmergencyBanner() {
  // Show the top 4 most critical contacts as a compact bar
  const critical = emergencyContacts.filter((c) =>
    ["police", "antigraft", "fire", "medical"].includes(c.category)
  ).slice(0, 4);

  return (
    <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <h3 className="font-heading font-bold text-foreground text-sm">
          Nambari za Dharura — Emergency Contacts
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {critical.map((contact) => {
          const Icon = categoryIcons[contact.category];
          return (
            <a
              key={contact.id}
              href={`tel:${contact.phone}`}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium hover:opacity-90 transition-opacity ${categoryColors[contact.category]}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-base leading-tight">{contact.phone}</div>
                <div className="text-[10px] opacity-70 truncate">{contact.name.split("—")[0].trim()}</div>
              </div>
            </a>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">
        TAKUKURU/PCCB: 113 · Polisi: 112/999 · Zimamoto: 114 · Ambulansi: 115 · Jinsia/Watoto: 116
      </p>
      <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 text-accent" />
          Hospitali {facilityStats.total} kwenye mfumo
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-2.5 h-2.5 text-destructive" />
          Vituo vya Zimamoto {fireStats.totalStations}
        </span>
      </div>
    </div>
  );
}

export function EmergencyContactsFull() {
  return (
    <div className="space-y-2">
      {emergencyContacts.map((contact) => {
        const Icon = categoryIcons[contact.category];
        return (
          <div
            key={contact.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${categoryColors[contact.category]}`}
          >
            <div className="w-10 h-10 rounded-lg bg-card/50 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{contact.name}</h4>
              <p className="text-xs opacity-70">{contact.description}</p>
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card text-foreground border border-border text-sm font-bold hover:bg-secondary transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </a>
          </div>
        );
      })}
    </div>
  );
}
