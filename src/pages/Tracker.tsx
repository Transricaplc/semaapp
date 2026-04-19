import { Clock, CheckCircle2, Search as SearchIcon, AlertTriangle, FileText, Eye, LogIn } from "lucide-react";
import { categoryLabels, type ReportStatus, type ReportCategory } from "@/data/reports";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const statusConfig: Record<ReportStatus, { icon: React.ElementType; className: string }> = {
  sent: { icon: Clock, className: "status-sent" },
  received: { icon: FileText, className: "status-received" },
  investigating: { icon: SearchIcon, className: "status-investigating" },
  resolved: { icon: CheckCircle2, className: "status-resolved" },
};

const statusSteps: ReportStatus[] = ["sent", "received", "investigating", "resolved"];

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
    <div className="animate-fade-in">
      <section className="bg-yb-charcoal py-10">
        <div className="container max-w-3xl text-center">
          <h1 className="text-h1 md:text-h1-lg font-heading text-white mb-2">{t("tracker.title")}</h1>
          <p className="text-body font-body text-yb-charcoal-muted">{t("tracker.subtitle")}</p>
        </div>
      </section>

      <div className="container max-w-3xl py-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="yb-card p-5 md:p-6 animate-pulse">
                <div className="h-4 bg-secondary rounded w-1/3 mb-3" />
                <div className="h-6 bg-secondary rounded w-2/3 mb-2" />
                <div className="h-4 bg-secondary rounded w-full" />
              </div>
            ))}
          </div>
        ) : !authed ? (
          <div className="yb-card p-10 text-center">
            <LogIn className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="text-h2 font-heading text-foreground mb-2">Ingia ili kuona ripoti zako</h2>
            <p className="text-body font-body text-muted-foreground mb-5">Lazima uingie ili kufuatilia ripoti zako.</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold min-h-[48px]">
              <Link to="/mimi">Ingia / Jisajili</Link>
            </Button>
          </div>
        ) : reports.length === 0 ? (
          <div className="yb-card p-10 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-h2 font-heading text-foreground mb-2">Hujatuma ripoti yoyote bado</h2>
            <p className="text-body font-body text-muted-foreground mb-5">Anza kwa kuripoti tatizo katika eneo lako.</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold min-h-[48px]">
              <Link to="/report">Tuma Ripoti</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {statusSteps.map((status) => {
                const count = reports.filter((r) => r.status === status).length;
                const config = statusConfig[status];
                return (
                  <div key={status} className="yb-card p-4 text-center min-h-[80px]">
                    <config.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="text-h2 font-heading text-foreground">{count}</div>
                    <div className="text-meta font-body text-muted-foreground mt-0.5">{statusLabelsLocal[status]}</div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              {reports.map((report) => {
                const status = (statusSteps.includes(report.status as ReportStatus) ? report.status : "sent") as ReportStatus;
                const config = statusConfig[status];
                const currentIdx = statusSteps.indexOf(status);
                const catLabel = categoryLabels[report.category as ReportCategory] || report.category;
                const date = new Date(report.created_at).toLocaleDateString();
                return (
                  <div key={report.id} className="yb-card p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {report.anonymous && (
                            <span className="flex items-center gap-1 text-badge font-heading uppercase bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">
                              <Eye className="w-3 h-3" /> Anonymous
                            </span>
                          )}
                          <span className="text-meta font-mono text-muted-foreground">{report.id.slice(0, 8)}</span>
                        </div>
                        <h3 className="font-heading text-h3 text-foreground">{report.title}</h3>
                        <p className="text-body font-body text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
                      </div>
                      <span className={`${config.className} px-3 py-1 rounded-lg text-badge font-heading uppercase whitespace-nowrap`}>
                        {statusLabelsLocal[status]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {statusSteps.map((s, i) => (
                        <div key={s} className="flex-1 flex items-center gap-1">
                          <div className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentIdx ? "bg-primary" : "bg-border"}`} />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-meta font-body text-muted-foreground">
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{catLabel}</span>
                      <span>{report.location}</span>
                      <span>{date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
