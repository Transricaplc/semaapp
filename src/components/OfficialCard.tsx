import Panel from "@/components/Panel";
import { Phone, Mail, MapPin, AlertTriangle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Official, RoleType } from "@/data/unified_officials";
import { roleTypeLabels } from "@/data/unified_officials";

const PARTY_COLORS: Record<string, string> = {
  CCM: "#CC0000",
  CHADEMA: "#1565C0",
  ACT: "#E65100",
  CUF: "#2E7D32",
};

const ROLE_ICONS: Partial<Record<RoleType, string>> = {
  PRESIDENT: "🇹🇿",
  VICE_PRESIDENT: "🇹🇿",
  PRIME_MINISTER: "🇹🇿",
  MINISTER: "🏛",
  DEPUTY_MINISTER: "🏛",
  PERMANENT_SECRETARY: "📋",
  MP: "🗳",
  SPEAKER: "🎙",
  REGIONAL_COMMISSIONER: "📍",
  REGIONAL_ADMIN_SECRETARY: "📋",
  REGIONAL_POLICE_COMMANDER: "👮",
  DISTRICT_COMMISSIONER: "📌",
  DISTRICT_EXECUTIVE_DIRECTOR: "📋",
  MUNICIPAL_MAYOR: "🏙",
  DISTRICT_POLICE_COMMANDER: "👮",
  WARD_EXECUTIVE_OFFICER: "🏘",
  WARD_COUNCILLOR: "🗣",
  VILLAGE_EXECUTIVE_OFFICER: "🏡",
  VILLAGE_CHAIRMAN: "🗣",
  JUDGE: "⚖️",
  ANTI_CORRUPTION: "🔍",
  EMERGENCY: "🚨",
  POLICE: "👮",
  COMMISSIONER: "📍",
  MUNICIPAL_DIRECTOR: "🏙",
  DIVISION_OFFICER: "📋",
};

export default function OfficialCard({ official }: { official: Official }) {
  const phone = official.contacts?.find((c) => c.type === "phone")?.value;
  const email = official.contacts?.find((c) => c.type === "email")?.value;
  const addr = official.contacts?.find((c) => c.type === "office_address")?.value;
  const icon = ROLE_ICONS[official.role_type] ?? "👤";
  const partyColor = official.party ? PARTY_COLORS[official.party] : undefined;

  const breadcrumb = [official.location.region, official.location.district, official.location.ward]
    .filter(Boolean)
    .join(" › ");

  return (
    <Panel
      left={<span className="text-xl leading-none">{icon}</span>}
      title={official.full_name}
      subtitle={official.role_title}
      mono={phone}
      verified={official.verified_status === "VERIFIED"}
      badge={official.party || undefined}
      badgeColor={partyColor}
    >
      {/* Role + source row */}
      <div className="flex items-center gap-2 flex-wrap mb-3 -ml-[60px]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md bg-primary/15 text-foreground border border-primary/30">
          {roleTypeLabels[official.role_type]}
        </span>
        {official.verified_source && (
          <span className="font-mono text-[10px] text-muted-foreground">
            src: {official.verified_source}
          </span>
        )}
      </div>

      {breadcrumb && (
        <p className="font-mono text-[11px] text-muted-foreground mb-3 -ml-[60px]">
          {breadcrumb}
        </p>
      )}

      {/* Contact rows — full-width inside expanded slot */}
      <div className="-ml-[60px] space-y-2">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 px-3 h-12 rounded-xl bg-card border border-border active:opacity-65 transition-opacity"
          >
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <span className="font-mono text-[13px] text-foreground flex-1 truncate">{phone}</span>
            <span className="font-heading text-[12px] font-bold text-accent">Piga</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 px-3 h-12 rounded-xl bg-card border border-border active:opacity-65 transition-opacity"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span className="font-body text-[13px] text-foreground flex-1 truncate">{email}</span>
            <span className="font-heading text-[12px] font-bold text-primary">Tuma</span>
          </a>
        )}
        {addr && (
          <div className="flex items-start gap-3 px-3 py-3 rounded-xl bg-card border border-border">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="font-body text-[12px] text-muted-foreground leading-snug flex-1">{addr}</p>
          </div>
        )}

        {/* Action strip */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/report?official_name=${encodeURIComponent(official.full_name)}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-primary-foreground font-heading text-[13px] font-bold active:opacity-65 transition-opacity"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Ripoti
          </Link>
          <button
            type="button"
            onClick={() => {
              const text = `${official.full_name} — ${official.role_title}${phone ? `\n📞 ${phone}` : ""}${email ? `\n✉️ ${email}` : ""}\n\nSema App: https://semaapp.co.tz`;
              if (navigator.share) navigator.share({ text }).catch(() => {});
              else navigator.clipboard.writeText(text);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-secondary border border-border text-foreground font-heading text-[13px] font-bold active:opacity-60"
          >
            <Share2 className="w-3.5 h-3.5" /> Shiriki
          </button>
        </div>
      </div>
    </Panel>
  );
}
