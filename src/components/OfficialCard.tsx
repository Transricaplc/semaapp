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
    <div className="glass-card rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Main card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left"
      >
        <div className="w-14 h-14 rounded-xl gradient-navy flex items-center justify-center shrink-0">
          {official.profile_photo_url ? (
            <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <User className="w-7 h-7 text-primary-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-foreground truncate">{official.full_name}</h3>
            {verifiedStatusBadge(official.verified_status)}
          </div>
          <p className="text-sm text-muted-foreground truncate">{official.role_title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${roleBadgeColors[official.role_type]}`}>
              {roleTypeLabels[official.role_type]}
            </span>
            {official.location.region && (
              <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {official.location.region}
              </span>
            )}
            {official.party && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-secondary text-muted-foreground">
                {official.party}
              </span>
            )}
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 text-muted-foreground/40 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>

      {/* Expanded secure actions */}
      {expanded && (
        <div className="px-4 md:px-5 pb-4 pt-1 border-t border-border/50 animate-fade-in space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Secure Actions</p>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-colors text-left">
            <Send className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-medium text-xs">Send Direct Message</p>
              <p className="text-[10px] text-primary/60">Private & secure</p>
            </div>
          </button>

          <Link
            to="/report"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/15 transition-colors text-left"
          >
            <Tag className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-medium text-xs">Tag in Public Report</p>
              <p className="text-[10px] text-accent/60">Attach to your report or petition</p>
            </div>
          </Link>

          <button
            onClick={() => {
              const text = `🇹🇿 ${official.full_name}\n📌 ${official.role_title}${official.location.region ? `\n📍 ${official.location.region}` : ""}\n\n— Sema App`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/15 transition-colors text-left"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-medium text-xs">Share via WhatsApp</p>
              <p className="text-[10px] text-accent/60">Share profile securely</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-left">
            <Phone className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-medium text-xs">Request Contact Info</p>
              <p className="text-[10px] text-muted-foreground">Verified contact shared securely</p>
            </div>
          </button>

          {/* Source */}
          {(official.verified_source || official.last_verified_date) && (
            <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-[10px] text-muted-foreground">
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
