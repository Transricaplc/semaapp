import { useState } from "react";
import { User, MapPin, BadgeCheck, AlertCircle, Send, Tag, Share2, Phone, CalendarClock, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Official } from "@/data/unified_officials";
import { roleTypeLabels, roleBadgeColors } from "@/data/unified_officials";

const verifiedStatusBadge = (status: Official["verified_status"]) => {
  switch (status) {
    case "VERIFIED": return <BadgeCheck className="w-4 h-4 text-accent shrink-0" />;
    case "PENDING": return <AlertCircle className="w-4 h-4 text-warning shrink-0" />;
    default: return null;
  }
};

export default function OfficialCard({ official }: { official: Official }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="yb-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left min-h-[72px]"
      >
        <div className="w-14 h-14 rounded-xl bg-yb-charcoal-mid flex items-center justify-center shrink-0">
          {official.profile_photo_url ? (
            <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <span className="text-xl font-heading font-bold text-primary">{official.full_name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-heading text-h3 text-foreground truncate">{official.full_name}</h3>
            {verifiedStatusBadge(official.verified_status)}
          </div>
          <p className="text-meta font-body text-muted-foreground truncate">{official.role_title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={`text-badge badge-role px-2 py-0.5 rounded-md border ${roleBadgeColors[official.role_type]}`}>
              {roleTypeLabels[official.role_type]}
            </span>
            {official.location.region && (
              <span className="flex items-center gap-0.5 text-meta font-body text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {official.location.region}
              </span>
            )}
            {official.party && (
              <span className="text-badge badge-role px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                {official.party}
              </span>
            )}
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 text-muted-foreground/40 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>

      {expanded && (
        <div className="px-4 md:px-5 pb-4 pt-1 border-t border-border/50 animate-fade-in space-y-2">
          <p className="text-badge badge-role text-muted-foreground mb-2">Secure Actions</p>

          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-foreground hover:bg-primary/15 transition-colors text-left min-h-[48px]">
            <Send className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="font-body font-medium text-meta">Send Direct Message</p>
              <p className="text-meta font-body text-muted-foreground">Private & secure</p>
            </div>
          </button>

          <Link
            to="/report"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-accent/10 text-foreground hover:bg-accent/15 transition-colors text-left min-h-[48px]"
          >
            <Tag className="w-4 h-4 text-accent shrink-0" />
            <div>
              <p className="font-body font-medium text-meta">Tag in Public Report</p>
              <p className="text-meta font-body text-muted-foreground">Attach to your report or petition</p>
            </div>
          </Link>

          <button
            onClick={() => {
              const text = `🇹🇿 ${official.full_name}\n📌 ${official.role_title}${official.location.region ? `\n📍 ${official.location.region}` : ""}\n\n— Sema Yellow Book`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-accent/10 text-foreground hover:bg-accent/15 transition-colors text-left min-h-[48px]"
          >
            <Share2 className="w-4 h-4 text-accent shrink-0" />
            <div>
              <p className="font-body font-medium text-meta">Share via WhatsApp</p>
              <p className="text-meta font-body text-muted-foreground">Share profile securely</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-left border border-border min-h-[48px]">
            <Phone className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-body font-medium text-meta">Request Contact Info</p>
              <p className="text-meta font-body text-muted-foreground">Verified contact shared securely</p>
            </div>
          </button>

          {(official.verified_source || official.last_verified_date) && (
            <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-meta font-body text-muted-foreground italic">
              {official.last_verified_date && (
                <span className="flex items-center gap-1">
                  <CalendarClock className="w-3 h-3" />
                  Verified: {official.last_verified_date}
                </span>
              )}
              {official.verified_source && (
                <span className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  {official.verified_source}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}