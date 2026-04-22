import { useState, type ReactNode, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, BadgeCheck } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PanelProps {
  left: ReactNode;
  leftBg?: string;
  leftFg?: string;
  title: string;
  subtitle?: string;
  mono?: string;
  badge?: string;
  badgeColor?: string;
  verified?: boolean;
  trailing?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  defaultOpen?: boolean;
}

/**
 * Sema's left-to-right panel primitive.
 *  ▸ Narrow dark accent panel (left) — icon, initials, count
 *  ▸ Wide content panel (right)      — title, subtitle, mono, trailing
 *  ▸ Optional expanded slot          — left-indented to align with right panel
 */
export default function Panel({
  left, leftBg, leftFg,
  title, subtitle, mono,
  badge, badgeColor,
  verified, trailing,
  children, onClick, href, to,
  defaultOpen,
}: PanelProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const leftStyle: CSSProperties = {};
  if (leftBg) leftStyle.background = leftBg;
  if (leftFg) leftStyle.color = leftFg;

  const RowInner = (
    <>
      {/* LEFT — narrow accent slab */}
      <div className="panel-left" style={leftStyle}>
        {left}
      </div>

      {/* RIGHT — content */}
      <div className="panel-right">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-heading text-[15px] font-bold text-foreground truncate leading-tight">
                {title}
              </span>
              {verified && (
                <BadgeCheck className="w-4 h-4 text-accent shrink-0" />
              )}
            </div>
            {subtitle && (
              <p className="font-body text-[12px] font-medium text-muted-foreground truncate mt-0.5">
                {subtitle}
              </p>
            )}
            {mono && (
              <p className="font-mono text-[13px] text-primary mt-1 truncate">
                {mono}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && (
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md border"
                style={
                  badgeColor
                    ? { background: `${badgeColor}1f`, color: badgeColor, borderColor: `${badgeColor}40` }
                    : undefined
                }
              >
                {badge}
              </span>
            )}
            {trailing}
            {children && (
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Non-interactive (no children, no link, no click) → simple div
  if (!children && !href && !to && !onClick) {
    return <div className="panel-row">{RowInner}</div>;
  }

  // Link variant
  if ((href || to) && !children) {
    const cls = "panel-row-button";
    return to ? (
      <Link to={to} className={cls}>{RowInner}</Link>
    ) : (
      <a href={href} className={cls}>{RowInner}</a>
    );
  }

  // Click-only (no expand)
  if (onClick && !children) {
    return (
      <button type="button" onClick={onClick} className="panel-row-button w-full text-left">
        {RowInner}
      </button>
    );
  }

  // Expandable
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="panel-row flex-col">
      <CollapsibleTrigger asChild>
        <button type="button" className="flex items-stretch w-full text-left active:opacity-90 transition-opacity">
          {RowInner}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="panel-expanded">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/** Wraps a vertical stack of panels with consistent gap. */
export function PanelGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
}

/** Section label (mono uppercase). */
export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 px-1">
      {children}
    </p>
  );
}
