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
import { supabase } from "@/integrations/supabase/client";

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
    { value: "service_delivery" as ReportCategory, label: "Roads & Infrastructure", icon: AlertTriangle, desc: "Potholes, broken bridges" },
    { value: "service_delivery" as ReportCategory, label: "Water & Sanitation", icon: Droplets, desc: "Water shortages, contamination" },
    { value: "service_delivery" as ReportCategory, label: "Healthcare", icon: HeartPulse, desc: "No medicine, staff shortages" },
    { value: "service_delivery" as ReportCategory, label: "Education", icon: GraduationCap, desc: "Missing desks, teacher shortages" },
    { value: "service_delivery" as ReportCategory, label: "Environment", icon: Leaf, desc: "Pollution, deforestation" },
    { value: "graft" as ReportCategory, label: "Corruption", icon: Landmark, desc: "Bribery, misuse of funds" },
    { value: "service_delivery" as ReportCategory, label: "Agriculture", icon: Sprout, desc: "Crop issues, land disputes" },
    { value: "crime" as ReportCategory, label: "Wildlife & Poaching", icon: PawPrint, desc: "Poaching, human-wildlife conflict" },
  ];

  const canNext = () => {
    if (step === 1) return category !== "";
    if (step === 2) return title.trim().length > 0 && description.trim().length > 0;
    if (step === 3) return location.trim().length > 0;
    return true;
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("reports").insert({
        title,
        description,
        category,
        location,
        anonymous,
        status: "sent",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success(lang === "sw" ? "Ripoti imetumwa!" : "Report submitted!");
    } catch (err) {
      toast.error(lang === "sw" ? "Hitilafu. Jaribu tena." : "Error. Please try again.");
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("GPS haipatikani kwenye kifaa hiki");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        setLocation(`${lat}, ${lng}`);
        toast.success("Mahali pako kumegunduliwa");
      },
      () => {
        toast.error("Haiwezi kupata mahali. Andika jina la mtaa.");
      }
    );
  };

  if (submitted) {
    return (
      <div className="animate-fade-in min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-h1 font-heading text-foreground mb-2">Thank You!</h1>
          <p className="text-body font-body text-muted-foreground mb-6">Your report has been submitted and will be reviewed.</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold min-h-[48px]">
            <a href="/tracker">Track Your Report</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="bg-yb-charcoal py-10">
        <div className="container max-w-2xl text-center">
          <h1 className="text-h1 md:text-h1-lg font-heading text-white mb-2">Report an Issue</h1>
          <p className="text-body font-body text-yb-charcoal-muted">Your voice matters. Report issues in your community.</p>
        </div>
      </section>

      <div className="container max-w-2xl py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-meta font-heading font-bold transition-colors ${
                s <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>{s}</div>
              {s < 4 && <div className={`w-8 h-0.5 ${s < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="yb-card p-6 md:p-8">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-h2 font-heading text-foreground mb-1">Select Category</h2>
              <p className="text-body font-body text-muted-foreground mb-6">What type of issue are you reporting?</p>
              <div className="grid gap-3">
                {categories.map((cat, i) => (
                  <button key={`${cat.value}-${i}`} onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left min-h-[64px] ${
                      category === cat.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category === cat.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}><cat.icon className="w-6 h-6" /></div>
                    <div>
                      <div className="font-body font-semibold text-foreground">{cat.label}</div>
                      <div className="text-meta font-body text-muted-foreground mt-0.5">{cat.desc}</div>
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
                  <h2 className="text-h2 font-heading text-foreground mb-1">Describe the Issue</h2>
                  <p className="text-body font-body text-muted-foreground">Provide details about the problem</p>
                </div>
                {voice.isSupported && (
                  <Button variant="outline" size="sm" onClick={voice.toggleListening}
                    className={`gap-1.5 min-h-[40px] ${voice.isListening ? "bg-destructive/10 text-destructive border-destructive/30" : ""}`}>
                    {voice.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {voice.isListening ? "Listening..." : "Voice Input"}
                  </Button>
                )}
              </div>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Title</label>
                <Input placeholder="Brief title for your report" value={title} onChange={(e) => setTitle(e.target.value)} className="min-h-[52px] text-body" />
              </div>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Description</label>
                <Textarea placeholder="Describe the issue in detail..." rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="text-body" />
              </div>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Attach Media</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer min-h-[80px] flex flex-col items-center justify-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-body font-body text-muted-foreground">Tap to upload photo or video</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-h2 font-heading text-foreground mb-1">Location</h2>
              <p className="text-body font-body text-muted-foreground mb-4">Where is this issue happening?</p>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Location</label>
                <Input placeholder="e.g. Temeke, Dar es Salaam" value={location} onChange={(e) => setLocation(e.target.value)} className="min-h-[52px] text-body" />
              </div>
              <Button variant="outline" className="gap-2 min-h-[48px]" onClick={handleGetLocation}>
                <MapPin className="w-4 h-4" /> Detect GPS Location
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-h2 font-heading text-foreground mb-1">Review & Submit</h2>
              <p className="text-body font-body text-muted-foreground mb-4">Confirm your report details</p>
              <div className="space-y-3">
                {[
                  { label: "Category", value: category && categoryLabels[category] },
                  { label: "Title", value: title },
                  { label: "Location", value: location },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-border">
                    <span className="text-body font-body text-muted-foreground">{item.label}</span>
                    <span className="text-body font-body font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
                <div className="py-2 border-b border-border">
                  <span className="text-body font-body text-muted-foreground block mb-1">Description</span>
                  <span className="text-body font-body text-foreground">{description}</span>
                </div>
              </div>
              <button onClick={() => setAnonymous(!anonymous)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all min-h-[64px] ${
                  anonymous ? "border-primary bg-primary/5" : "border-border"
                }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  anonymous ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>{anonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</div>
                <div className="text-left">
                  <div className="font-body font-semibold text-foreground">{anonymous ? "Submit Anonymously" : "Include My Identity"}</div>
                  <div className="text-meta font-body text-muted-foreground">{anonymous ? "Your identity will be hidden" : "Your name will be attached"}</div>
                </div>
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2 border-border min-h-[48px] font-body font-semibold">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : <div />}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold gap-2 min-h-[48px]">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold gap-2 min-h-[48px]">
                <Send className="w-4 h-4" /> Submit Report
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}