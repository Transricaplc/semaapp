import { useState, type ReactNode } from "react";
import { ChevronRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface ExpandableRowProps {
  icon?: ReactNode;
  avatar?: string;
  title: string;
  meta?: string;
  badge?: string;
  badgeColor?: string;
  detail?: ReactNode | string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  verified?: boolean;
  mono?: string;
  expandedContent?: ReactNode;
}

export default function ExpandableRow({
  icon, avatar, title, meta, badge, badgeColor,
  detail, actionLabel, actionHref, onAction,
  verified, mono, expandedContent,
}: ExpandableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60 bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-65 transition-opacity min-h-[52px]"
      >
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-foreground">
            {icon}
          </div>
        )}
        {!icon && avatar && (
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 font-bold text-[14px]">
            {avatar}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-bold text-foreground truncate">{title}</span>
            {verified && <BadgeCheck className="w-4 h-4 text-accent shrink-0" />}
          </div>
          {meta && (
            <p className="text-[12px] text-muted-foreground truncate mt-0.5">{meta}</p>
          )}
          {mono && (
            <p
              className="text-[12px] text-muted-foreground truncate mt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {mono}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${badgeColor ?? "bg-primary/15 text-foreground border-primary/30"}`}>
              {badge}
            </span>
          )}
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-[240ms] ease-out ${open ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div
          className="px-4 pb-4 pl-[60px] bg-secondary/30"
          style={{ animation: "expandDown 240ms ease-out both" }}
        >
          {expandedContent ?? (
            <div className="space-y-3 pt-2">
              {typeof detail === "string" ? (
                <p className="text-[13px] text-muted-foreground leading-relaxed">{detail}</p>
              ) : detail}
              {actionLabel && (
                actionHref ? (
                  <Link
                    to={actionHref}
                    className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity"
                  >
                    {actionLabel} →
                  </Link>
                ) : (
                  <button
                    onClick={onAction}
                    className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity"
                  >
                    {actionLabel}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
