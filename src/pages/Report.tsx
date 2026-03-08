import { useState } from "react";
import {
  AlertTriangle, Droplets, Landmark, MapPin, Camera, EyeOff, Eye, ChevronRight, ChevronLeft, CheckCircle2, Send,
  HeartPulse, GraduationCap, Leaf, Sprout, PawPrint, Mic, MicOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ReportCategory, categoryLabels } from "@/data/reports";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceInput } from "@/hooks/useVoiceInput";

export default function Report() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const voice = useVoiceInput({
    lang: lang === "sw" ? "sw-TZ" : "en-US",
    onResult: (text) => {
      if (step === 2) {
        if (!title) setTitle(text);
        else setDescription((prev) => prev + " " + text);
      }
    },
  });

  const categories = [
    { value: "service_delivery" as ReportCategory, label: t("report.roads"), icon: AlertTriangle, desc: lang === "sw" ? "Mashimo, madaraja yaliyovunjika" : "Potholes, broken bridges" },
    { value: "service_delivery" as ReportCategory, label: t("report.waterCat"), icon: Droplets, desc: lang === "sw" ? "Ukosefu wa maji, uchafuzi" : "Water shortages, contamination" },
    { value: "service_delivery" as ReportCategory, label: t("report.healthCat"), icon: HeartPulse, desc: lang === "sw" ? "Hakuna dawa, upungufu wa wafanyakazi" : "No medicine, staff shortages" },
    { value: "service_delivery" as ReportCategory, label: t("report.educationCat"), icon: GraduationCap, desc: lang === "sw" ? "Madawati hayatoshi, upungufu wa walimu" : "Missing desks, teacher shortages" },
    { value: "service_delivery" as ReportCategory, label: t("report.environment"), icon: Leaf, desc: lang === "sw" ? "Uchafuzi, ukataji miti" : "Pollution, deforestation" },
    { value: "graft" as ReportCategory, label: t("report.corruption"), icon: Landmark, desc: lang === "sw" ? "Rushwa, matumizi mabaya ya fedha" : "Bribery, misuse of funds" },
    { value: "service_delivery" as ReportCategory, label: t("report.agriculture"), icon: Sprout, desc: lang === "sw" ? "Matatizo ya mazao, migogoro ya ardhi" : "Crop issues, land disputes" },
    { value: "crime" as ReportCategory, label: t("report.wildlife"), icon: PawPrint, desc: lang === "sw" ? "Ujangili, migogoro ya wanyamapori" : "Poaching, human-wildlife conflict" },
  ];

  const canNext = () => {
    if (step === 1) return category !== "";
    if (step === 2) return title.trim().length > 0 && description.trim().length > 0;
    if (step === 3) return location.trim().length > 0;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success(t("report.submitted"));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Dar es Salaam (GPS)"),
        () => toast.error(lang === "sw" ? "Imeshindikana kupata mahali" : "Unable to detect location")
      );
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full gradient-green flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">{t("report.thankyou")}</h1>
          <p className="text-muted-foreground mb-6">{t("report.submitted")}</p>
          <Button asChild className="gradient-green text-accent-foreground border-0">
            <a href="/tracker">{t("report.trackReport")}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="gradient-navy py-10">
        <div className="container max-w-2xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">{t("report.title")}</h1>
          <p className="text-primary-foreground/60 text-sm">{t("report.subtitle")}</p>
        </div>
      </section>

      <div className="container max-w-2xl py-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s <= step ? "gradient-green text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>{s}</div>
              {s < 4 && <div className={`w-8 h-0.5 ${s < step ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">{t("report.category")}</h2>
              <p className="text-sm text-muted-foreground mb-6">{t("report.categoryDesc")}</p>
              <div className="grid gap-3">
                {categories.map((cat, i) => (
                  <button key={`${cat.value}-${i}`} onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      category === cat.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category === cat.value ? "gradient-green text-accent-foreground" : "bg-secondary text-muted-foreground"
                    }`}><cat.icon className="w-6 h-6" /></div>
                    <div>
                      <div className="font-semibold text-foreground">{cat.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{cat.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-heading font-bold text-foreground mb-1">{t("report.details")}</h2>
                  <p className="text-sm text-muted-foreground">{t("report.detailsDesc")}</p>
                </div>
                {voice.isSupported && (
                  <Button variant="outline" size="sm" onClick={voice.toggleListening}
                    className={`gap-1.5 ${voice.isListening ? "bg-sema-red/10 text-sema-red border-sema-red/30" : ""}`}>
                    {voice.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {voice.isListening ? t("common.listening") : t("common.voiceInput")}
                  </Button>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.titleField")}</label>
                <Input placeholder={t("report.titlePlaceholder")} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.description")}</label>
                <Textarea placeholder={t("report.descPlaceholder")} rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.attachMedia")}</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent/40 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{t("report.tapUpload")}</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">{t("report.location")}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("report.locationDesc")}</p>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.location")}</label>
                <Input placeholder={t("report.locationPlaceholder")} value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <Button variant="outline" className="gap-2" onClick={handleGetLocation}>
                <MapPin className="w-4 h-4" />
                {t("report.detectGPS")}
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">{t("report.review")}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("report.reviewDesc")}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("report.category")}</span>
                  <span className="font-medium text-foreground">{category && categoryLabels[category]}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("report.titleField")}</span>
                  <span className="font-medium text-foreground">{title}</span>
                </div>
                <div className="py-2 border-b border-border">
                  <span className="text-muted-foreground block mb-1">{t("report.description")}</span>
                  <span className="text-foreground">{description}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("report.location")}</span>
                  <span className="font-medium text-foreground">{location}</span>
                </div>
              </div>
              <button onClick={() => setAnonymous(!anonymous)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  anonymous ? "border-accent bg-accent/5" : "border-border"
                }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  anonymous ? "gradient-green text-accent-foreground" : "bg-secondary text-muted-foreground"
                }`}>{anonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">{anonymous ? t("report.anonymousOn") : t("report.anonymousOff")}</div>
                  <div className="text-xs text-muted-foreground">{anonymous ? t("report.anonymousOnDesc") : t("report.anonymousOffDesc")}</div>
                </div>
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> {t("report.back")}
              </Button>
            ) : <div />}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="gradient-green text-accent-foreground border-0 gap-2">
                {t("report.next")} <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gradient-green text-accent-foreground border-0 gap-2">
                <Send className="w-4 h-4" /> {t("report.submit")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
