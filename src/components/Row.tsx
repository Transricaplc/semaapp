import { useState, type ReactNode } from "react";
import { ChevronRight, BadgeCheck } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RowProps {
  leading?: ReactNode;
  title: string;
  subtitle?: string;
  mono?: string;
  badge?: string;
  badgeColor?: string;
  verified?: boolean;
  children?: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Sema's expandable list-row primitive.
 * - Always left-aligned.
 * - 52px min-height tap target.
 * - Uses Radix Collapsible for accessibility.
 */
export default function Row({
  leading,
  title,
  subtitle,
  mono,
  badge,
  badgeColor,
  verified,
  children,
  defaultOpen,
}: RowProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const interactive = !!children;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/60 bg-card last:border-b-0">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          disabled={!interactive}
          className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-65 transition-opacity min-h-[52px] disabled:cursor-default disabled:active:opacity-100"
        >
          {leading && (
            <div className="w-10 h-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              {leading}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-foreground truncate">
                {title}
              </span>
              {verified && (
                <BadgeCheck className="w-4 h-4 text-accent shrink-0" />
              )}
            </div>
            {subtitle && (
              <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                {subtitle}
              </p>
            )}
            {mono && (
              <p className="mono text-[12px] text-muted-foreground truncate mt-0.5">
                {mono}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && (
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${
                  badgeColor ?? "bg-primary/15 text-foreground border-primary/30"
                }`}
              >
                {badge}
              </span>
            )}
            {interactive && (
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ease-out ${
                  open ? "rotate-90" : ""
                }`}
              />
            )}
          </div>
        </button>
      </CollapsibleTrigger>

      {interactive && (
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down">
          <div className="px-4 pb-4 pl-[60px] bg-secondary/30">{children}</div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
