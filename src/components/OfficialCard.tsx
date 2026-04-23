import { useState } from "react";
import { Phone, Mail, MapPin, AlertTriangle, Share2, BadgeCheck, MessageCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import type { Official } from "@/data/unified_officials";
import { roleTypeLabels } from "@/data/unified_officials";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function OfficialCard({ official }: { official: Official }) {
  const [open, setOpen] = useState(false);
  const phone = official.contacts?.find((c) => c.type === "phone")?.value;
  const email = official.contacts?.find((c) => c.type === "email")?.value;
  const addr = official.contacts?.find((c) => c.type === "office_address")?.value;
  const verified = official.verified_status === "VERIFIED";

  // Cleaned-up phone for WhatsApp (digits only with country code)
  const waNumber = phone ? phone.replace(/[^\d]/g, "") : "";
  const ministry = official.institution?.ministry;
  const region = official.location?.region;
  const subtitle = ministry || region || official.role_title;

  const idCode = official.id?.slice(0, 12).toUpperCase();

  return (
    <article className="gazette-official-card overflow-hidden font-ui">
      {/* Collapsed row — entire row is the toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 active:bg-secondary/40 transition-colors min-h-[44px]"
        aria-expanded={open}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-ui font-semibold text-[13px]">
          {initials(official.full_name)}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          {/* Name + role badge row */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-serif-display text-[17px] leading-tight text-ink truncate">
              {official.full_name}
            </h3>
            <span className="label-eyebrow shrink-0">{roleTypeLabels[official.role_type]}</span>
          </div>

          {/* Sub line */}
          {subtitle && (
            <p className="text-[13px] text-text-secondary truncate mt-0.5">{subtitle}</p>
          )}

          {/* Contact preview row (collapsed) */}
          {(phone || waNumber) && !open && (
            <div className="flex items-center gap-3 mt-1.5 text-[12px] text-text-secondary">
              {phone && (
                <span className="inline-flex items-center gap-1 font-code text-[11px]">
                  <Phone className="w-3 h-3" /> {phone}
                </span>
              )}
              {waNumber && (
                <MessageCircle className="w-3.5 h-3.5 text-primary" aria-label="WhatsApp" />
              )}
            </div>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-text-secondary mt-1 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded slot */}
      {open && (
        <div className="px-4 pb-4 pt-0 space-y-2 border-t border-gazette-border/60 bg-cream/40 animate-fade-in">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 px-3 h-12 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="font-code text-[13px] text-ink flex-1 truncate">{phone}</span>
              <span className="font-ui text-[12px] font-semibold text-primary">Piga</span>
            </a>
          )}
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 h-12 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <MessageCircle className="w-4 h-4 text-primary shrink-0" />
              <span className="font-code text-[13px] text-ink flex-1 truncate">WhatsApp</span>
              <span className="font-ui text-[12px] font-semibold text-primary">Tuma ujumbe</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 px-3 h-12 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="font-ui text-[13px] text-ink flex-1 truncate">{email}</span>
              <span className="font-ui text-[12px] font-semibold text-primary">Tuma</span>
            </a>
          )}
          {addr && (
            <div className="flex items-start gap-3 px-3 py-3 rounded-xl bg-surface border border-gazette-border">
              <MapPin className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
              <p className="font-ui text-[12px] text-text-secondary leading-snug flex-1">{addr}</p>
            </div>
          )}

          {/* Action strip */}
          <div className="flex items-center gap-2 pt-1">
            <Link
              to={`/report?official_name=${encodeURIComponent(official.full_name)}`}
              className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground font-ui text-[13px] font-medium active:opacity-65 transition-opacity"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Ripoti
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const text = `${official.full_name} — ${official.role_title}${phone ? `\n📞 ${phone}` : ""}${email ? `\n✉️ ${email}` : ""}\n\nSema: https://www.semaapp.co.tz`;
                if (navigator.share) navigator.share({ text }).catch(() => {});
                else navigator.clipboard.writeText(text);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl border border-primary text-primary bg-transparent font-ui text-[13px] font-medium active:opacity-60"
            >
              <Share2 className="w-3.5 h-3.5" /> Shiriki
            </button>
          </div>
        </div>
      )}

      {/* Footer — ID + verified */}
      <div className="px-4 pb-2 pt-0 flex items-center justify-between">
        <span className="font-code text-[10px] text-text-secondary/70">{idCode}</span>
        {verified && (
          <span className="inline-flex items-center gap-1 text-[10px] font-ui font-medium text-primary">
            <BadgeCheck className="w-3 h-3" /> Imethibitishwa
          </span>
        )}
      </div>
    </article>
  );
}
