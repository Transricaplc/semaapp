import { Phone, Shield, Flame, Heart, Scale, Users, Car, AlertTriangle } from "lucide-react";
import { facilityStats } from "@/data/health_facilities";
import { fireStats } from "@/data/fire_stations";

interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  category: "police" | "fire" | "medical" | "antigraft" | "gender" | "child" | "traffic";
}

const emergencyContacts: EmergencyContact[] = [
  { id: "em-police", name: "Police Emergency", description: "National police emergency number", phone: "112", category: "police" },
  { id: "em-fire", name: "Fire & Rescue", description: "Fire and Rescue Services", phone: "114", category: "fire" },
  { id: "em-ambulance", name: "Ambulance", description: "Health emergency and ambulance services", phone: "115", category: "medical" },
  { id: "em-pccb", name: "PCCB — Anti-Corruption", description: "Report corruption and abuse of power", phone: "113", category: "antigraft" },
  { id: "em-gender", name: "Gender Desk", description: "Report gender-based and domestic violence", phone: "116", category: "gender" },
  { id: "em-child", name: "Child Helpline", description: "Report child abuse", phone: "116", category: "child" },
  { id: "em-traffic", name: "Traffic Police", description: "Report accidents and traffic violations", phone: "112", category: "traffic" },
];

const categoryIcons: Record<EmergencyContact["category"], React.ElementType> = {
  police: Shield, fire: Flame, medical: Heart, antigraft: Scale, gender: Users, child: Users, traffic: Car,
};

const categoryColors: Record<EmergencyContact["category"], string> = {
  police: "bg-destructive/10 text-destructive border-destructive/20",
  fire: "bg-destructive/15 text-destructive border-destructive/25",
  medical: "bg-accent/10 text-accent border-accent/20",
  antigraft: "bg-primary/15 text-foreground border-primary/30",
  gender: "bg-yb-info/10 text-yb-info border-yb-info/20",
  child: "bg-yb-info/10 text-yb-info border-yb-info/20",
  traffic: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function EmergencyBanner() {
  const critical = emergencyContacts.filter((c) =>
    ["police", "antigraft", "fire", "medical"].includes(c.category)
  ).slice(0, 4);

  return (
    <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <h3 className="font-heading font-bold text-foreground text-sm">Emergency Contacts</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {critical.map((contact) => {
          const Icon = categoryIcons[contact.category];
          return (
            <a key={contact.id} href={`tel:${contact.phone}`}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium hover:opacity-90 transition-opacity ${categoryColors[contact.category]}`}>
              <Icon className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-base leading-tight">{contact.phone}</div>
                <div className="text-[10px] opacity-70 truncate">{contact.name}</div>
              </div>
            </a>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">
        PCCB: 113 · Police: 112/999 · Fire: 114 · Ambulance: 115 · Gender/Child: 116
      </p>
      <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><Heart className="w-2.5 h-2.5 text-accent" />{facilityStats.total} hospitals in system</span>
        <span className="flex items-center gap-1"><Flame className="w-2.5 h-2.5 text-destructive" />{fireStats.totalStations} fire stations</span>
      </div>
    </div>
  );
}
