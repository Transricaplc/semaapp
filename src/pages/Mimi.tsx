import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Settings, ChevronRight, FileText, Users, Sliders, Globe, LogOut, EyeOff, BookmarkCheck, MapPin } from "lucide-react";
import { mockReports } from "@/data/reports";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFollowedList } from "@/hooks/useFollowOfficial";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import LocationPicker, { type LocationLabels } from "@/components/LocationPicker";
import { supabase } from "@/integrations/supabase/client";

export default function Mimi() {
  const { t, lang, setLang } = useLanguage();
  const { user, signInWithPhone, verifyOTP, signInAnonymously, signOut, isAnonymous } = useAuth();
  const { items: followed } = useFollowedList();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [sending, setSending] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [savedLoc, setSavedLoc] = useState<{ mkoa_id: number | null; wilaya_id: number | null; kata_id: number | null; label: string }>({
    mkoa_id: null, wilaya_id: null, kata_id: null, label: "",
  });

  // Load saved location
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("mkoa_id, wilaya_id, kata_id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(async ({ data }) => {
        if (!data) return;
        const ids = { mkoa_id: data.mkoa_id, wilaya_id: data.wilaya_id, kata_id: data.kata_id };
        // resolve labels
        const labels: string[] = [];
        if (ids.mkoa_id) {
          const { data: m } = await supabase.from("mikoa").select("jina").eq("id", ids.mkoa_id).maybeSingle();
          if (m) labels.push(m.jina);
        }
        if (ids.wilaya_id) {
          const { data: w } = await supabase.from("wilaya").select("jina").eq("id", ids.wilaya_id).maybeSingle();
          if (w) labels.push(w.jina);
        }
        if (ids.kata_id) {
          const { data: k } = await supabase.from("kata").select("jina").eq("id", ids.kata_id).maybeSingle();
          if (k) labels.push(k.jina);
        }
        setSavedLoc({ ...ids, label: labels.join(" › ") });
      });
  }, [user]);

  const handleSaveLocation = async (mkoa_id: number | null, wilaya_id: number | null, kata_id: number | null, labels: LocationLabels) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ mkoa_id, wilaya_id, kata_id })
      .eq("user_id", user.id);
    if (error) {
      toast.error("Imeshindikana kuhifadhi");
      return;
    }
    const label = [labels.mkoa_jina, labels.wilaya_jina, labels.kata_jina].filter(Boolean).join(" › ");
    setSavedLoc({ mkoa_id, wilaya_id, kata_id, label });
    if (mkoa_id) toast.success("Eneo limehifadhiwa");
  };

  const handleSendOTP = async () => {
    if (!phone.trim()) return;
    setSending(true);
    const fullPhone = phone.startsWith("+") ? phone : `+255${phone.replace(/^0/, "")}`;
    const { error } = await signInWithPhone(fullPhone);
    setSending(false);
    if (error) toast.error(error.message || "Failed to send OTP");
    else { toast.success("OTP imetumwa"); setStep("otp"); }
  };

  const handleVerify = async () => {
    if (!otp.trim()) return;
    setSending(true);
    const fullPhone = phone.startsWith("+") ? phone : `+255${phone.replace(/^0/, "")}`;
    const { error } = await verifyOTP(fullPhone, otp);
    setSending(false);
    if (error) toast.error(error.message || "OTP si sahihi");
    else toast.success("Karibu");
  };

  if (!user) {
    return (
      <div className="font-ui animate-fade-in">
        <header className="px-4 pt-6 pb-2" style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}>
          <h1 className="font-serif-display text-[26px] text-ink">Wasifu Wangu</h1>
          <p className="text-[13px] text-text-secondary mt-1">{t("profile.loginPrompt") || "Ingia ili kuona ripoti zako."}</p>
        </header>

        <section className="mx-4 mt-4 gazette-card p-5">
          {step === "phone" ? (
            <>
              <label className="label-eyebrow mb-2 block">Nambari ya simu</label>
              <div className="flex gap-2">
                <div className="bg-cream border border-gazette-border rounded-xl px-3 flex items-center font-code text-[13px] text-ink">+255</div>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="7XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-cream border border-gazette-border rounded-xl px-4 py-3 text-[14px] focus:border-primary focus:outline-none min-h-[44px]"
                />
              </div>
              <button
                onClick={handleSendOTP}
                disabled={sending}
                className="mt-4 w-full bg-primary text-primary-foreground rounded-xl px-5 py-3 font-ui text-[14px] font-medium min-h-[44px] disabled:opacity-50"
              >
                {sending ? "Inatuma..." : "Tuma OTP"}
              </button>
            </>
          ) : (
            <>
              <label className="label-eyebrow mb-2 block">Andika OTP</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="XXXXXX"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-cream border border-gazette-border rounded-xl px-4 py-3 font-code text-center text-[18px] tracking-[0.3em] min-h-[48px]"
              />
              <button
                onClick={handleVerify}
                disabled={sending}
                className="mt-4 w-full bg-primary text-primary-foreground rounded-xl px-5 py-3 font-ui text-[14px] font-medium min-h-[44px] disabled:opacity-50"
              >
                {sending ? "..." : "Thibitisha"}
              </button>
              <button onClick={() => setStep("phone")} className="mt-3 w-full text-[12px] text-text-secondary">
                ← Rudi
              </button>
            </>
          )}
        </section>

        <div className="mx-4 my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gazette-border" />
          <span className="text-[11px] text-text-secondary uppercase tracking-wider">au</span>
          <div className="h-px flex-1 bg-gazette-border" />
        </div>

        <section className="mx-4">
          <button
            onClick={() => signInAnonymously()}
            className="w-full border border-primary text-primary rounded-xl px-5 py-3 font-ui text-[14px] font-medium min-h-[44px] flex items-center justify-center gap-2"
          >
            <EyeOff className="w-4 h-4" /> Endelea bila jina
          </button>
        </section>
      </div>
    );
  }

  // Authenticated view
  const displayName = isAnonymous ? "Mwananchi" : (user.phone || user.email || "Mwananchi");
  const ini = (displayName.match(/[A-Z0-9+]/g)?.slice(0, 2).join("") || "MW").toUpperCase();
  const memberYear = user.created_at ? new Date(user.created_at).getFullYear() : new Date().getFullYear();

  const stats = [
    { label: "Ripoti", value: String(mockReports.length) },
    { label: "Wafuatiliwa", value: String(followed.length) },
    { label: "Alama", value: "78" },
  ];

  const handleToggleLang = () => setLang(lang === "sw" ? "en" : "sw");

  return (
    <div className="font-ui animate-fade-in">
      {/* HERO — magazine profile */}
      <section className="bg-primary pb-16 pt-2 relative" style={{ paddingTop: "calc(env(safe-area-inset-top) + 8px)" }}>
        <div className="px-4 flex items-center justify-between h-12">
          <button className="w-9 h-9 -ml-2 flex items-center justify-center" aria-label="Rudi" onClick={() => window.history.back()}>
            <ChevronLeft className="w-5 h-5 text-primary-foreground/80" />
          </button>
          <span className="text-[13px] text-primary-foreground/70">Wasifu Wangu</span>
          <button className="w-9 h-9 -mr-2 flex items-center justify-center" aria-label="Mipangilio">
            <Settings className="w-5 h-5 text-primary-foreground/80" />
          </button>
        </div>

        <div className="flex flex-col items-center px-4 mt-4">
          <div className="w-[72px] h-[72px] rounded-full bg-accent flex items-center justify-center font-serif-display text-[28px] font-semibold text-ink">
            {ini}
          </div>
          <h1 className="font-serif-display text-[26px] text-primary-foreground mt-3 text-center break-all max-w-full">{displayName}</h1>
          <p className="text-[13px] text-primary-foreground/60 mt-1">Mwanachama tangu {memberYear}</p>

          {/* Accountability score bar */}
          <div className="w-full max-w-[280px] mt-4">
            <div className="flex items-center justify-end mb-1">
              <span className="font-code text-[11px] text-primary-foreground/80">Alama 78/100</span>
            </div>
            <div className="h-1 w-full bg-primary-foreground/15 rounded-full overflow-hidden">
              <div className="h-full bg-accent" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS — overlapping white card */}
      <section className="mx-4 -mt-6 relative z-10">
        <div className="gazette-card grid grid-cols-3 divide-x divide-gazette-border">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-4 text-left">
              <p className="font-serif-display text-[22px] text-ink leading-none">{s.value}</p>
              <p className="label-eyebrow mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WAFUATILIWA */}
      {followed.length > 0 && (
        <section className="mx-4 mt-5">
          <p className="label-eyebrow mb-2 px-1">Ninaowafuatilia</p>
          <div className="space-y-2">
            {followed.slice(0, 5).map((f) => (
              <Link
                key={f.official_id}
                to={`/kiongozi/${f.official_id}`}
                className="gazette-card flex items-center gap-3 px-4 py-3 min-h-[52px] active:bg-secondary/40 transition-colors"
              >
                <BookmarkCheck className="w-5 h-5 text-primary" strokeWidth={1.75} />
                <span className="flex-1 text-[14px] text-ink truncate">{f.official_name}</span>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MENU LIST */}
      <nav className="mx-4 mt-4 space-y-2">
        {[
          { icon: FileText, label: "Taarifa zangu", to: "/tracker" },
          { icon: Users, label: "Viongozi ninaowafuatilia", to: "/saka-viongozi" },
          { icon: Sliders, label: "Mipangilio", to: "#" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.to}
            className="gazette-card flex items-center gap-3 px-4 py-3 min-h-[52px] active:bg-secondary/40 transition-colors"
          >
            <item.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
            <span className="flex-1 text-[14px] text-ink">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </a>
        ))}

        <button
          onClick={handleToggleLang}
          className="w-full gazette-card flex items-center gap-3 px-4 py-3 min-h-[52px] active:bg-secondary/40 transition-colors text-left"
        >
          <Globe className="w-5 h-5 text-primary" strokeWidth={1.75} />
          <span className="flex-1 text-[14px] text-ink">Lugha</span>
          <span className="font-code text-[12px] text-text-secondary uppercase tracking-wider">
            {lang === "sw" ? "SW" : "EN"}
          </span>
        </button>

        <button
          onClick={signOut}
          className="w-full gazette-card flex items-center gap-3 px-4 py-3 min-h-[52px] active:bg-secondary/40 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 text-alert" strokeWidth={1.75} />
          <span className="flex-1 text-[14px] text-alert font-medium">Ondoka</span>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </nav>
    </div>
  );
}
