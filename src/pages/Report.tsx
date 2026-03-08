import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Landmark,
  Droplets,
  MapPin,
  Camera,
  EyeOff,
  Eye,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ReportCategory, categoryLabels } from "@/data/reports";
import { toast } from "sonner";

const categories = [
  { value: "graft" as ReportCategory, label: "Rushwa — Graft", icon: Landmark, desc: "Corruption, bribery, misuse of public funds" },
  { value: "crime" as ReportCategory, label: "Uhalifu — Crime", icon: ShieldAlert, desc: "Theft, violence, public safety threats" },
  { value: "service_delivery" as ReportCategory, label: "Huduma — Service Delivery", icon: Droplets, desc: "Water, health, roads, electricity issues" },
];

export default function Report() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canNext = () => {
    if (step === 1) return category !== "";
    if (step === 2) return title.trim().length > 0 && description.trim().length > 0;
    if (step === 3) return location.trim().length > 0;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Ripoti yako imetumwa! Your report has been submitted.");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Dar es Salaam (GPS detected)"),
        () => toast.error("Unable to detect location. Please enter manually.")
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
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Asante! Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your report has been submitted successfully. {anonymous ? "Your identity will remain anonymous." : "You can track its status in the Accountability Tracker."}
          </p>
          <div className="glass-card rounded-xl p-4 text-left text-sm mb-6">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium text-foreground">{category && categoryLabels[category]}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Title</span>
              <span className="font-medium text-foreground truncate max-w-[200px]">{title}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Status</span>
              <span className="status-sent px-2 py-0.5 rounded-md text-xs font-medium">Imetumwa — Sent</span>
            </div>
          </div>
          <Button asChild className="gradient-green text-accent-foreground border-0">
            <a href="/tracker">Fuatilia Ripoti — Track Report</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-navy py-10">
        <div className="container max-w-2xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
            Ripoti Tatizo — Report an Issue
          </h1>
          <p className="text-primary-foreground/60 text-sm">
            Sema Mapema — Speak Early, Speak Clearly
          </p>
        </div>
      </section>

      <div className="container max-w-2xl py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  s <= step
                    ? "gradient-green text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className={`w-8 h-0.5 ${s < step ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">Aina ya Tatizo</h2>
              <p className="text-sm text-muted-foreground mb-6">Select the category of your report</p>
              <div className="grid gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      category === cat.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category === cat.value ? "gradient-green text-accent-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      <cat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{cat.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{cat.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">Maelezo ya Tatizo</h2>
              <p className="text-sm text-muted-foreground mb-4">Describe the issue in detail</p>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title / Kichwa</label>
                <Input
                  placeholder="Brief title of the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description / Maelezo</label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Attach Photo/Video (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent/40 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tap to upload photo or video</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">Mahali — Location</h2>
              <p className="text-sm text-muted-foreground mb-4">Where did this occur?</p>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                <Input
                  placeholder="e.g. Temeke, Dar es Salaam"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2" onClick={handleGetLocation}>
                <MapPin className="w-4 h-4" />
                Detect My Location (GPS)
              </Button>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground mb-1">Kagua & Tuma</h2>
              <p className="text-sm text-muted-foreground mb-4">Review and submit your report</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{category && categoryLabels[category]}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium text-foreground">{title}</span>
                </div>
                <div className="py-2 border-b border-border">
                  <span className="text-muted-foreground block mb-1">Description</span>
                  <span className="text-foreground">{description}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{location}</span>
                </div>
              </div>

              {/* Anonymous toggle */}
              <button
                onClick={() => setAnonymous(!anonymous)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  anonymous ? "border-accent bg-accent/5" : "border-border"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  anonymous ? "gradient-green text-accent-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {anonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    {anonymous ? "Anonymous Mode — ON" : "Anonymous Mode — OFF"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {anonymous ? "Your identity will be hidden" : "Your identity will be visible to officials"}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Rudi — Back
              </Button>
            ) : <div />}
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="gradient-green text-accent-foreground border-0 gap-2"
              >
                Endelea — Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gradient-green text-accent-foreground border-0 gap-2"
              >
                <Send className="w-4 h-4" /> Tuma Ripoti — Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
