import { Phone, Mail, MapPin, Flag, Share2, BadgeCheck } from "lucide-react";
import ExpandableRow from "./ExpandableRow";
import type { Official } from "@/data/unified_officials";
import { roleTypeLabels } from "@/data/unified_officials";

export default function OfficialCard({ official }: { official: Official }) {
  const contacts = official.contacts ?? [];
  const phone = contacts.find((c) => c.type === "phone")?.value;
  const email = contacts.find((c) => c.type === "email")?.value;
  const address = contacts.find((c) => c.type === "office_address")?.value;

  const locationParts = [official.location.region, official.location.district, official.location.ward].filter(Boolean);

  return (
    <ExpandableRow
      avatar={official.full_name.charAt(0)}
      title={official.full_name}
      meta={official.role_title}
      badge={roleTypeLabels[official.role_type]}
      verified={official.verified_status === "VERIFIED"}
      expandedContent={
        <div className="space-y-3 pt-2">
          {/* Role + source */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-primary/15 text-foreground border border-primary/30">
              {roleTypeLabels[official.role_type]}
            </span>
            {official.verified_source && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <BadgeCheck className="w-3 h-3 text-accent" />
                {official.verified_source}
              </span>
            )}
          </div>

          {/* Location breadcrumb */}
          {locationParts.length > 0 && (
            <p className="text-[12px] text-muted-foreground">
              {locationParts.join(" → ")}
            </p>
          )}

          {/* Contact rows */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 px-3 h-12 active:opacity-65 transition-opacity border-b border-border last:border-b-0"
              >
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span
                  className="flex-1 text-[13px] text-foreground truncate"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {phone}
                </span>
                <span className="text-[11px] font-bold text-accent">Piga</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 px-3 h-12 active:opacity-65 transition-opacity border-b border-border last:border-b-0"
              >
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="flex-1 text-[13px] text-foreground truncate">{email}</span>
                <span className="text-[11px] font-bold text-primary">Tuma</span>
              </a>
            )}
            {address && (
              <div className="flex items-start gap-3 px-3 py-3">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="flex-1 text-[12px] text-muted-foreground leading-snug">{address}</p>
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center gap-2">
            <a
              href={`/report?official_name=${encodeURIComponent(official.full_name)}`}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-primary-foreground text-[12px] font-bold active:opacity-65 transition-opacity"
            >
              <Flag className="w-3.5 h-3.5" />
              Ripoti
            </a>
            <button
              onClick={() => {
                const text = `${official.full_name} — ${official.role_title}${phone ? `\n📞 ${phone}` : ""}${email ? `\n✉️ ${email}` : ""}\n\nSema App: https://semaapp.co.tz`;
                if (navigator.share) navigator.share({ text }).catch(() => {});
                else navigator.clipboard.writeText(text);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-secondary border border-border text-foreground text-[12px] font-bold active:opacity-65 transition-opacity"
            >
              <Share2 className="w-3.5 h-3.5" />
              Shiriki
            </button>
          </div>
        </div>
      }
    />
  );
}
