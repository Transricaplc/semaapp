import { Clock, CheckCircle2, Search as SearchIcon, AlertTriangle, FileText, Eye } from "lucide-react";
import { mockReports, categoryLabels, type ReportStatus } from "@/data/reports";
import { useLanguage } from "@/contexts/LanguageContext";

const statusConfig: Record<ReportStatus, { icon: React.ElementType; className: string }> = {
  sent: { icon: Clock, className: "status-sent" },
  received: { icon: FileText, className: "status-received" },
  investigating: { icon: SearchIcon, className: "status-investigating" },
  resolved: { icon: CheckCircle2, className: "status-resolved" },
};

const statusSteps: ReportStatus[] = ["sent", "received", "investigating", "resolved"];

export default function Tracker() {
  const { t } = useLanguage();

  const statusLabelsLocal: Record<ReportStatus, string> = {
    sent: t("tracker.sent"),
    received: t("tracker.received"),
    investigating: t("tracker.investigating"),
    resolved: t("tracker.resolved"),
  };

  return (
    <div className="animate-fade-in">
      <section className="gradient-navy py-10">
        <div className="container max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">{t("tracker.title")}</h1>
          <p className="text-primary-foreground/60 text-sm">{t("tracker.subtitle")}</p>
        </div>
      </section>

      <div className="container max-w-3xl py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {statusSteps.map((status) => {
            const count = mockReports.filter((r) => r.status === status).length;
            const config = statusConfig[status];
            return (
              <div key={status} className="glass-card rounded-xl p-4 text-center">
                <config.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-heading font-bold text-foreground">{count}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{statusLabelsLocal[status]}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {mockReports.map((report) => {
            const config = statusConfig[report.status];
            const currentIdx = statusSteps.indexOf(report.status);
            return (
              <div key={report.id} className="glass-card rounded-2xl p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {report.anonymous && (
                        <span className="flex items-center gap-1 text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">
                          <Eye className="w-3 h-3" /> {t("common.anonymous")}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{report.id}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
                  </div>
                  <span className={`${config.className} px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap`}>
                    {statusLabelsLocal[report.status]}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {statusSteps.map((s, i) => (
                    <div key={s} className="flex-1 flex items-center gap-1">
                      <div className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentIdx ? "bg-accent" : "bg-border"}`} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{categoryLabels[report.category]}</span>
                  <span>{report.location}</span>
                  <span>{report.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
