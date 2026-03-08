import { useState } from "react";
import { User, MapPin, BadgeCheck, Send, Tag, Share2, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SecureActionCardProps {
  name: string;
  position: string;
  organization: string;
  area?: string;
  verified?: boolean;
  photoUrl?: string;
  badgeColor?: string;
  badgeLabel?: string;
}

export default function SecureActionCard({
  name,
  position,
  organization,
  area,
  verified = false,
  photoUrl,
  badgeColor = "bg-secondary text-foreground border-border",
  badgeLabel,
}: SecureActionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="yb-card overflow-hidden">
      {/* Main card — tap to expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-yb-charcoal-mid flex items-center justify-center shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <span className="text-lg font-bold text-primary">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-sm text-foreground truncate">{name}</h3>
            {verified && <BadgeCheck className="w-3.5 h-3.5 text-accent shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground truncate">{position} — {organization}</p>
          {area && (
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground mt-0.5">
              <MapPin className="w-2.5 h-2.5" />
              {area}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {badgeLabel && (
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${badgeColor}`}>
              {badgeLabel}
            </span>
          )}
          <ChevronRight className={`w-4 h-4 text-muted-foreground/50 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>

      {/* Expanded secure actions */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-border/50 animate-fade-in space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Secure Actions</p>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-foreground hover:bg-primary/15 transition-colors text-left">
            <Send className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-xs">Send Direct Message</p>
              <p className="text-[10px] text-muted-foreground truncate">Private & secure — only they see it</p>
            </div>
          </button>

          <Link
            to="/report"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/10 text-foreground hover:bg-accent/15 transition-colors text-left"
          >
            <Tag className="w-4 h-4 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-xs">Tag in Public Report</p>
              <p className="text-[10px] text-muted-foreground truncate">Attach to your report or petition</p>
            </div>
          </Link>

          <button
            onClick={() => {
              const text = `🇹🇿 ${name}\n📌 ${position} — ${organization}${area ? `\n📍 ${area}` : ""}\n\n— Sema Yellow Book`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/10 text-foreground hover:bg-accent/15 transition-colors text-left"
          >
            <Share2 className="w-4 h-4 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-xs">Share via WhatsApp</p>
              <p className="text-[10px] text-muted-foreground truncate">Share profile with others</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-left border border-border">
            <Phone className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-xs">Request Contact Info</p>
              <p className="text-[10px] text-muted-foreground truncate">Verified contact shared securely</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
