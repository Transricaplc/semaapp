import { Phone, X, Shield, Flame, Heart, Scale, Users, Zap, Droplets } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const contacts = [
  { label: "🚨 Polisi", number: "112", icon: Shield, color: "bg-destructive" },
  { label: "🚑 Dharura ya Matibabu", number: "114", icon: Heart, color: "bg-accent" },
  { label: "🔥 Zimamoto", number: "115", icon: Flame, color: "bg-destructive" },
  { label: "🛡️ PCCB — Rushwa", number: "113", icon: Scale, color: "bg-primary" },
  { label: "👶 Mtoto / Jinsia", number: "116", icon: Users, color: "bg-yb-info" },
  { label: "⚡ TANESCO — Hitilafu", number: "0800 110 022", icon: Zap, color: "bg-warning" },
  { label: "💧 Maji — Hitilafu", number: "0800 110 033", icon: Droplets, color: "bg-yb-info" },
];

export default function EmergencyDrawer({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60" />
      {/* Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>

        <div className="px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">🚨 Nambari za Dharura</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-2">
            {contacts.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors min-h-[56px]"
              >
                <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center shrink-0`}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-[15px]">{c.label}</p>
                  <p className="font-phone text-[15px] text-muted-foreground">{c.number}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-[13px] text-muted-foreground mt-4">
            Nambari hizi zinapatikana hata bila mtandao
          </p>
        </div>
      </div>
    </div>
  );
}
