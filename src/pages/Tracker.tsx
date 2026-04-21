import { Clock, CheckCircle2, Search as SearchIcon, FileText, LogIn } from "lucide-react";
import {
  categoryLabels,
  type ReportStatus,
  type ReportCategory,
} from "@/data/reports";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "@/components/Row";

const statusSteps: ReportStatus[] = ["sent", "received", "investigating", "resolved"];

const statusBadgeColor: Record<ReportStatus, string> = {
  sent:          "bg-[hsl(var(--primary))]/15 text-foreground border-[hsl(var(--primary))]/30",
  received:      "bg-[hsl(var(--tz-blue))]/15 text-[hsl(var(--tz-blue))] border-[hsl(var(--tz-blue))]/30",
  investigating: "bg-warning/15 text-warning border-warning/30",
  resolved:      "bg-accent/15 text-accent border-accent/30",
};

const statusIcon: Record<ReportStatus, React.ElementType> = {
  sent: Clock,
  received: FileText,
  investigating: SearchIcon,
  resolved: CheckCircle2,
};

interface DBReport {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  anonymous: boolean;
  created_at: string;
}

export default function Tracker() {
  const { t } = useLanguage();
  const [reports, setReports] = useState<DBReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  const statusLabelsLocal: Record<ReportStatus, string> = {
    sent: t("tracker.sent"),
    received: t("tracker.received"),
    investigating: t("tracker.investigating"),
    resolved: t("tracker.resolved"),
  };

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setAuthed(true);
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setReports(data as DBReport[]);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="animate-fade-in mx-auto w-full max-w-[640px]">
      {/* HERO — left aligned */}
      <section className="bg-yb-charcoal-dark px-4 pt-6 pb-5">
        <p className="mono text-primary text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
          FUATILIA RIPOTI
        </p>
        <h1 className="text-[24px] leading-[1.15] font-extrabold text-white tracking-tight">
          {t("tracker.title")}
        </h1>
        <p className="text-[13px] text-yb-charcoal-muted mt-2 leading-relaxed">
          {t("tracker.subtitle")}
        </p>
      </section>

      <div className="px-4 py-4 bg-background">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-4 animate-pulse min-h-[64px]">
                <div className="h-4 bg-secondary rounded w-2/3 mb-2" />
                <div className="h-3 bg-secondary rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : !authed ? (
          <div className="rounded-xl bg-card border border-border p-6">
            <LogIn className="w-8 h-8 text-primary mb-3" />
            <h2 className="text-[18px] font-extrabold text-foreground mb-1">
              Ingia ili kuona ripoti zako
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
              Lazima uingie ili kufuatilia ripoti zako.
            </p>
            <Link
              to="/mimi"
              className="inline-flex items-center justify-center h-11 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity"
            >
              Ingia / Jisajili
            </Link>
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-xl bg-card border border-border p-6">
            <FileText className="w-8 h-8 text-muted-foreground mb-3" />
            <h2 className="text-[18px] font-extrabold text-foreground mb-1">
              Hujatuma ripoti yoyote
            </h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
              Anza kwa kuripoti tatizo katika eneo lako.
            </p>
            <Link
              to="/report"
              className="inline-flex items-center justify-center h-11 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity"
            >
              Tuma Ripoti
            </Link>
          </div>
        ) : (
          <>
            {/* Status counts — 2x2 grid, left-aligned */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {statusSteps.map((status) => {
                const count = reports.filter((r) => r.status === status).length;
                const Icon = statusIcon[status];
                return (
                  <div
                    key={status}
                    className="rounded-xl bg-card border border-border p-3 flex items-center gap-3 min-h-[64px]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="mono text-[18px] font-extrabold text-foreground leading-none">
                        {count}
                      </p>
                      <p className="text-[11px] font-medium text-muted-foreground mt-1 uppercase tracking-wide">
                        {statusLabelsLocal[status]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
              RIPOTI ZANGU
            </p>

            <div className="-mx-4 border-y border-border bg-card">
              {reports.map((report) => {
                const status = (statusSteps.includes(report.status as ReportStatus)
                  ? report.status
                  : "sent") as ReportStatus;
                const currentIdx = statusSteps.indexOf(status);
                const catLabel =
                  categoryLabels[report.category as ReportCategory] || report.category;
                const date = new Date(report.created_at).toLocaleDateString();
                const StatusIcon = statusIcon[status];

                return (
                  <Row
                    key={report.id}
                    leading={<StatusIcon className="w-5 h-5 text-primary" />}
                    title={report.title}
                    subtitle={`${catLabel} · ${report.location}`}
                    badge={statusLabelsLocal[status]}
                    badgeColor={statusBadgeColor[status]}
                  >
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="mono">#{report.id.slice(0, 8)}</span>
                        <span>·</span>
                        <span>{date}</span>
                      </div>

                      {/* Status progress dots */}
                      <div className="flex items-center gap-1">
                        {statusSteps.map((s, i) => (
                          <div
                            key={s}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i <= currentIdx ? "bg-primary" : "bg-border"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        {report.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">
                          {catLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">
                          {report.location}
                        </span>
                        {report.anonymous && (
                          <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">
                            Bila jina
                          </span>
                        )}
                      </div>
                    </div>
                  </Row>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
