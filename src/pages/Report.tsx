import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle2, Search, Send } from "lucide-react";
import { type ReportCategory } from "@/data/reports";
import { officials } from "@/data/unified_officials";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES: { value: ReportCategory; label: string }[] = [
  { value: "graft", label: "Ufisadi" },
  { value: "service_delivery", label: "Kutotoa huduma" },
  { value: "crime", label: "Ukiukwaji" },
  { value: "service_delivery", label: "Nyingine" },
];

export default function Report() {
  const { lang } = useLanguage();
  const { user, signInAnonymously, loading: authLoading } = useAuth();
  const [params] = useSearchParams();
  const targetName = params.get("official_name") || "";

  useEffect(() => { if (!authLoading && !user) signInAnonymously(); }, [user, authLoading, signInAnonymously]);

  const [step, setStep] = useState(1);
  const [officialSearch, setOfficialSearch] = useState(targetName);
  const [selectedOfficial, setSelectedOfficial] = useState<typeof officials[number] | null>(
    targetName ? officials.find((o) => o.full_name.toLowerCase().includes(targetName.toLowerCase())) ?? null : null
  );
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const officialMatches = useMemo(() => {
    if (!officialSearch.trim() || selectedOfficial) return [];
    const q = officialSearch.toLowerCase();
    return officials.filter(
      (o) => o.full_name.toLowerCase().includes(q) || o.role_title.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [officialSearch, selectedOfficial]);

  const canNext = () => {
    if (step === 1) return !!selectedOfficial;
    if (step === 2) return category !== "" && description.trim().length >= 10;
    return true;
  };

  const handleSubmit = async () => {
    if (!selectedOfficial || !category) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("reports").insert({
        title: `Kwa ${selectedOfficial.full_name} — ${categoryLabel}`,
        description,
        category,
        location: selectedOfficial.location.region || "Tanzania",
        anonymous,
        user_id: user?.id ?? null,
        status: "sent",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success(lang === "sw" ? "Ripoti imepokelewa" : "Report received");
    } catch {
      toast.error(lang === "sw" ? "Hitilafu. Jaribu tena." : "Error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="font-ui animate-fade-in flex flex-col items-center justify-center px-6 py-16 text-center" style={{ minHeight: "calc(100dvh - 80px)" }}>
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif-display text-[26px] text-ink mb-2">Ripoti Yako Imepokelewa</h1>
        <p className="text-[14px] text-text-secondary leading-relaxed max-w-[300px] mb-8">
          Tutafuatilia na kukujulisha mabadiliko.
        </p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-ui text-[14px] font-medium min-h-[44px] inline-flex items-center"
        >
          Rudi Nyumbani
        </Link>
      </div>
    );
  }

  return (
    <div className="font-ui animate-fade-in pb-24">
      {/* STICKY HEADER + PROGRESS */}
      <header
        className="sticky top-0 z-20 bg-cream border-b border-gazette-border"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <h1 className="font-serif-display text-[22px] text-ink">Wasilisha Ripoti</h1>
          <span className="text-[12px] text-text-secondary">Hatua {step} / 3</span>
        </div>
        <div className="h-[2px] w-full bg-gazette-border">
          <div className="h-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </header>

      {/* STEP 1 — choose official */}
      {step === 1 && (
        <section className="px-4 pt-5 space-y-4">
          <p className="label-eyebrow">Kiongozi unayemhusu</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              value={officialSearch}
              onChange={(e) => { setOfficialSearch(e.target.value); setSelectedOfficial(null); }}
              placeholder="Andika jina la kiongozi..."
              className="w-full bg-cream border border-gazette-border rounded-xl pl-10 pr-4 py-3 text-[14px] focus:border-primary focus:outline-none min-h-[44px]"
            />
          </div>

          {officialMatches.length > 0 && (
            <div className="gazette-card divide-y divide-gazette-border max-h-[320px] overflow-auto">
              {officialMatches.map((o) => (
                <button
                  key={o.id}
                  onClick={() => { setSelectedOfficial(o); setOfficialSearch(o.full_name); }}
                  className="w-full text-left px-4 py-3 active:bg-secondary/40"
                >
                  <p className="text-[14px] text-ink">{o.full_name}</p>
                  <p className="text-[12px] text-text-secondary truncate">{o.role_title}</p>
                </button>
              ))}
            </div>
          )}

          {selectedOfficial && (
            <div className="gazette-official-card p-4">
              <p className="label-eyebrow mb-1">Umechagua</p>
              <p className="font-serif-display text-[18px] text-ink">{selectedOfficial.full_name}</p>
              <p className="text-[12px] text-text-secondary mt-0.5">{selectedOfficial.role_title}</p>
            </div>
          )}
        </section>
      )}

      {/* STEP 2 — describe */}
      {step === 2 && (
        <section className="px-4 pt-5 space-y-4">
          <p className="label-eyebrow">Aina ya tatizo</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c.value && categoryLabel === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => { setCategory(c.value); setCategoryLabel(c.label); }}
                  className={`rounded-full px-4 py-1.5 text-[12px] border min-h-[36px] ${
                    active ? "bg-primary text-primary-foreground border-transparent" : "border-gazette-border bg-surface text-ink"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Eleza tatizo kwa undani..."
            className="w-full bg-cream border border-gazette-border rounded-xl px-4 py-3 text-[14px] focus:border-primary focus:outline-none min-h-[140px] resize-y"
          />

          <div className="gazette-card flex items-start gap-3 px-4 py-3">
            <div className="flex-1">
              <p className="text-[14px] text-ink font-medium">Wasilisha bila jina</p>
              <p className="text-[11px] text-text-secondary mt-0.5">Jina lako halitaonyeshwa kwa yeyote.</p>
            </div>
            <button
              onClick={() => setAnonymous((v) => !v)}
              role="switch"
              aria-checked={anonymous}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${anonymous ? "bg-primary" : "bg-gazette-border"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-surface transition-transform ${anonymous ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3 — confirm */}
      {step === 3 && selectedOfficial && (
        <section className="px-4 pt-5 space-y-4">
          <p className="label-eyebrow">Thibitisha</p>
          <div className="gazette-card p-4 space-y-3">
            <div>
              <p className="label-eyebrow">Kiongozi</p>
              <p className="text-[14px] text-ink mt-0.5">{selectedOfficial.full_name}</p>
              <p className="text-[12px] text-text-secondary">{selectedOfficial.role_title}</p>
            </div>
            <div>
              <p className="label-eyebrow">Aina</p>
              <p className="text-[14px] text-ink mt-0.5">{categoryLabel}</p>
            </div>
            <div>
              <p className="label-eyebrow">Maelezo</p>
              <p className="text-[13px] text-ink mt-0.5 leading-relaxed">{description}</p>
            </div>
            <div>
              <p className="label-eyebrow">Hali</p>
              <p className="text-[13px] text-ink mt-0.5">{anonymous ? "Bila jina" : "Pamoja na jina lako"}</p>
            </div>
          </div>
        </section>
      )}

      {/* STICKY FOOTER NAV */}
      <div
        className="fixed left-1/2 -translate-x-1/2 bottom-[80px] z-30 w-full max-w-[430px] px-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {step < 3 ? (
          <button
            onClick={() => canNext() && setStep(step + 1)}
            disabled={!canNext()}
            className="w-full bg-primary text-primary-foreground rounded-xl px-5 py-3 font-ui text-[15px] font-medium min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Endelea <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground rounded-xl px-5 py-3 font-ui text-[15px] font-medium min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Wasilisha Ripoti
          </button>
        )}
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-2 text-[13px] text-text-secondary py-2 inline-flex items-center justify-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Rudi nyuma
          </button>
        )}
      </div>
    </div>
  );
}
