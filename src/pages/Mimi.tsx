import { useState } from "react";
import { User, FileText, TrendingUp, Award, EyeOff, Star, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockReports, statusLabels, categoryLabels, type ReportStatus } from "@/data/reports";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const statusColors: Record<ReportStatus, string> = {
  sent: "bg-warning/15 text-warning",
  received: "bg-primary/10 text-foreground",
  investigating: "bg-gold/15 text-foreground",
  resolved: "bg-accent/15 text-accent",
};

export default function Mimi() {
  const { t, lang } = useLanguage();
  const { user, signInWithPhone, verifyOTP, signInAnonymously, signOut, loading, isAnonymous } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [sending, setSending] = useState(false);

  const handleSendOTP = async () => {
    if (!phone.trim()) return;
    setSending(true);
    const fullPhone = phone.startsWith("+") ? phone : `+255${phone.replace(/^0/, "")}`;
    const { error } = await signInWithPhone(fullPhone);
    setSending(false);
    if (error) { toast.error(error.message || "Failed to send OTP"); }
    else { toast.success("OTP sent!"); setStep("otp"); }
  };

  const handleVerify = async () => {
    if (!otp.trim()) return;
    setSending(true);
    const fullPhone = phone.startsWith("+") ? phone : `+255${phone.replace(/^0/, "")}`;
    const { error } = await verifyOTP(fullPhone, otp);
    setSending(false);
    if (error) { toast.error(error.message || "Invalid OTP"); }
    else { toast.success("Logged in!"); }
  };

  const handleAnonymous = async () => {
    const { error } = await signInAnonymously();
    if (error) { toast.error(error.message); }
    else { toast.success("Continuing anonymously"); }
  };

  if (!user) {
    return (
      <div className="animate-fade-in">
        <section className="bg-yb-charcoal py-16">
          <div className="container max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-yb-charcoal-mid flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-h1 font-heading text-white mb-2">{t("profile.welcome")}</h1>
            <p className="text-body font-body text-yb-charcoal-muted mb-8">{t("profile.loginPrompt")}</p>

            <div className="bg-yb-charcoal-mid border border-yb-charcoal-soft rounded-2xl p-6 text-left">
              {step === "phone" ? (
                <>
                  <label className="text-meta font-body font-medium text-white/80 mb-2 block">Phone Number</label>
                  <div className="flex gap-2 mb-4">
                    <div className="bg-yb-charcoal-soft border border-yb-charcoal-soft rounded-xl px-3 flex items-center text-white font-mono text-body">+255</div>
                    <input type="tel" placeholder="7XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-yb-charcoal-soft border border-yb-charcoal-soft rounded-xl px-4 py-3 text-white placeholder:text-yb-charcoal-muted text-body font-body min-h-[52px]" />
                  </div>
                  <Button onClick={handleSendOTP} disabled={sending} className="w-full bg-primary text-primary-foreground font-body font-semibold min-h-[52px] text-body hover:bg-yb-yellow-deep">
                    {sending ? "..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <label className="text-meta font-body font-medium text-white/80 mb-2 block">Enter OTP</label>
                  <input type="text" placeholder="XXXXXX" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6}
                    className="w-full bg-yb-charcoal-soft border border-yb-charcoal-soft rounded-xl px-4 py-3 text-white placeholder:text-yb-charcoal-muted text-body font-mono text-center tracking-[0.3em] mb-4 min-h-[52px]" />
                  <Button onClick={handleVerify} disabled={sending} className="w-full bg-primary text-primary-foreground font-body font-semibold min-h-[52px] text-body hover:bg-yb-yellow-deep">
                    {sending ? "..." : "Verify"}
                  </Button>
                  <button onClick={() => setStep("phone")} className="w-full text-meta font-body text-yb-charcoal-muted mt-3 hover:underline">← Back</button>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 justify-center">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-meta font-body text-yb-charcoal-muted">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Button variant="outline" onClick={handleAnonymous} className="mt-4 w-full border-yb-charcoal-soft text-white bg-transparent hover:bg-white/5 gap-2 min-h-[48px] font-body">
              <EyeOff className="w-4 h-4" /> Continue Anonymously
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const impactStats = [
    { label: "My Reports", value: "5", icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Resolved", value: "2", icon: Award, color: "bg-accent/10 text-accent" },
    { label: "Petitions Signed", value: "12", icon: Star, color: "bg-primary/10 text-primary" },
    { label: "People Impacted", value: "340", icon: TrendingUp, color: "bg-warning/10 text-warning" },
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-yb-charcoal py-10">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yb-charcoal-mid flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-h2 font-heading text-white">
                {isAnonymous ? "Anonymous" : "Citizen"}
              </h1>
              <p className="text-body font-body text-yb-charcoal-muted">{user.phone || user.email || "Anonymous"}</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="border-yb-charcoal-soft text-white gap-1.5 hover:bg-white/5 min-h-[40px] font-body">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {impactStats.map((stat) => (
            <div key={stat.label} className="yb-card p-4 text-center min-h-[80px]">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-h2 font-heading text-foreground">{stat.value}</div>
              <div className="text-meta font-body text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-h2 font-heading text-foreground mb-4">My Reports</h2>
        <div className="space-y-3">
          {mockReports.slice(0, 3).map((report) => (
            <div key={report.id} className="yb-card p-4 flex items-center gap-3 min-h-[56px]">
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-body text-foreground truncate">{report.title}</p>
                <p className="text-meta font-body text-muted-foreground">{categoryLabels[report.category]} · {report.location}</p>
              </div>
              <Badge className={`${statusColors[report.status]} text-badge font-heading uppercase whitespace-nowrap`}>
                {statusLabels[report.status]}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}