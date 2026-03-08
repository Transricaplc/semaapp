import { Phone, Mail, FileText, User, MapPin, Share2, CalendarClock, ExternalLink, BadgeCheck, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Official } from "@/data/unified_officials";
import { roleTypeLabels, roleBadgeColors, getContact } from "@/data/unified_officials";

function shareWhatsApp(official: Official) {
  const phone = getContact(official, "phone");
  const email = getContact(official, "email");
  const text = `🇹🇿 ${official.full_name}\n📌 ${official.role_title}${official.institution.office_address ? `\n📍 ${official.institution.office_address}` : ""}${phone ? `\n📞 ${phone}` : ""}${email ? `\n✉️ ${email}` : ""}\n\n— Sema App`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

const verifiedStatusBadge = (status: Official["verified_status"]) => {
  switch (status) {
    case "VERIFIED": return <BadgeCheck className="w-4 h-4 text-accent shrink-0" />;
    case "PENDING": return <AlertCircle className="w-4 h-4 text-warning shrink-0" />;
    default: return null;
  }
};

export default function OfficialCard({ official }: { official: Official }) {
  const phone = getContact(official, "phone");
  const email = getContact(official, "email");

  return (
    <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl gradient-navy flex items-center justify-center shrink-0">
          {official.profile_photo_url ? (
            <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <User className="w-7 h-7 text-primary-foreground" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-foreground">{official.full_name}</h3>
            {verifiedStatusBadge(official.verified_status)}
          </div>
          <p className="text-sm text-muted-foreground">{official.role_title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {official.institution.office_address && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {official.institution.office_address}
              </span>
            )}
            <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role_type]}`}>
              {roleTypeLabels[official.role_type]}
            </span>
            {official.location.region && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-secondary text-muted-foreground">
                {official.location.region}
              </span>
            )}
            {official.party && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-secondary text-muted-foreground">
                {official.party}
              </span>
            )}
          </div>

          {/* Contacts display */}
          {official.contacts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {official.contacts.map((c, i) => (
                <span key={i} className="text-[10px] text-muted-foreground flex items-center gap-1">
                  {c.type === "phone" && <Phone className="w-2.5 h-2.5" />}
                  {c.type === "email" && <Mail className="w-2.5 h-2.5" />}
                  {c.type === "office_address" && <MapPin className="w-2.5 h-2.5" />}
                  {c.value}
                  {c.verified && <BadgeCheck className="w-2.5 h-2.5 text-accent" />}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex sm:flex-col gap-2 shrink-0">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-green text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          )}
          <Link
            to="/report"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/15 text-foreground border border-gold/30 text-sm font-medium hover:bg-gold/25 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Report</span>
          </Link>
          <button
            onClick={() => shareWhatsApp(official)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm font-medium hover:bg-accent/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Source citation footer */}
      {(official.verified_source || official.last_verified_date) && (
        <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          {official.last_verified_date && (
            <span className="flex items-center gap-1">
              <CalendarClock className="w-3 h-3" />
              Verified: {official.last_verified_date}
            </span>
          )}
          {official.verified_source && (
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Source: {official.verified_source}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
