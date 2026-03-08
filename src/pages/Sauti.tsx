import { useState } from "react";
import { Plus, TrendingUp, Share2, Heart, Target, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Petition {
  id: string;
  title: { sw: string; en: string };
  description: { sw: string; en: string };
  target: string;
  targetRole: string;
  signatures: number;
  goal: number;
  category: string;
  author: string;
  createdAt: string;
  trending: boolean;
}

const mockPetitions: Petition[] = [
  {
    id: "pet-001",
    title: { sw: "Tunadai maji safi Dodoma", en: "We demand clean water in Dodoma" },
    description: { sw: "Wakazi wa Dodoma wamekuwa bila maji safi kwa miezi 3.", en: "Dodoma residents have been without clean water for 3 months." },
    target: "Minister of Water", targetRole: "Ministry of Water",
    signatures: 2847, goal: 5000, category: "Water", author: "Citizens of Dodoma", createdAt: "2026-02-01", trending: true,
  },
  {
    id: "pet-002",
    title: { sw: "Rekebisha Barabara ya Morogoro", en: "Fix Morogoro Highway" },
    description: { sw: "Barabara hii imesababisha ajali nyingi.", en: "This road has caused many accidents." },
    target: "Minister of Works", targetRole: "Ministry of Works & Transport",
    signatures: 1523, goal: 3000, category: "Roads", author: "Morogoro Drivers", createdAt: "2026-02-15", trending: true,
  },
  {
    id: "pet-003",
    title: { sw: "Madawati kwa shule za Mwanza", en: "Desks for Mwanza schools" },
    description: { sw: "Wanafunzi 500+ wanakaa chini.", en: "500+ students are sitting on the floor." },
    target: "RC Mwanza", targetRole: "Regional Commissioner",
    signatures: 892, goal: 2000, category: "Education", author: "Parents of Mwanza", createdAt: "2026-03-01", trending: false,
  },
];

export default function Sauti() {
  const { t, lang } = useLanguage();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleSign = (id: string) => {
    toast.success(lang === "sw" ? "Umetia saini. Asante!" : "You signed the petition. Thank you!");
  };

  const handleShare = (petition: Petition) => {
    const msg = encodeURIComponent(`✊ ${petition.title[lang]}\n\n${lang === "sw" ? "Tia saini hapa" : "Sign here"}: https://semaapp.lovable.app/sauti\n\n#SautiYaMwananchi #Sema`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleDonate = (petition: Petition) => {
    toast.info("M-Pesa: Send to 0754 000 000 (Ref: " + petition.id + ")");
  };

  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    toast.success(lang === "sw" ? "Ombi lako limeundwa!" : "Your petition has been created!");
    setShowCreate(false);
    setNewTitle(""); setNewDesc(""); setNewTarget("");
  };

  return (
    <div className="animate-fade-in">
      <section className="gradient-hero py-10">
        <div className="container max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">{t("petition.title")}</h1>
          <p className="text-primary-foreground/60 text-sm">{t("petition.subtitle")}</p>
        </div>
      </section>

      <div className="container max-w-3xl py-6">
        <Button onClick={() => setShowCreate(!showCreate)}
          className="w-full mb-6 bg-sema-red hover:bg-sema-red-light text-primary-foreground font-semibold h-12 text-base gap-2 animate-warm-pulse">
          <Plus className="w-5 h-5" />
          {t("petition.startNew")}
        </Button>

        {showCreate && (
          <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in kitenge-border border-2">
            <h3 className="font-heading font-bold text-foreground mb-4">{t("petition.newPetition")}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">{t("petition.titleField")}</label>
                <Input placeholder={t("petition.titlePlaceholder")} value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">{t("petition.descField")}</label>
                <Textarea placeholder={t("petition.descPlaceholder")} rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">{t("petition.targetField")}</label>
                <Input placeholder={t("petition.targetPlaceholder")} value={newTarget} onChange={e => setNewTarget(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreate} className="flex-1 bg-sema-green text-primary-foreground gap-2">
                  <Target className="w-4 h-4" /> {t("petition.submitPetition")}
                </Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>{t("petition.cancel")}</Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-sema-red" />
          <span className="text-sm font-semibold text-foreground">{t("petition.trending")}</span>
        </div>

        <div className="space-y-4">
          {mockPetitions.map((petition) => {
            const progress = Math.min((petition.signatures / petition.goal) * 100, 100);
            return (
              <div key={petition.id} className="glass-card rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sema-red/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-sema-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {petition.trending && <Badge className="bg-sema-yellow/20 text-sema-yellow-warm border-sema-yellow/30 text-[10px]">🔥 Trending</Badge>}
                      <Badge variant="outline" className="text-[10px]">{petition.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{petition.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{petition.description[lang]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pl-[52px]">
                  <Target className="w-3 h-3" />
                  <span>{lang === "sw" ? "Kwa" : "To"}: <strong className="text-foreground">{petition.target}</strong> ({petition.targetRole})</span>
                </div>

                <div className="pl-[52px] mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-sema-red">{petition.signatures.toLocaleString()} {t("petition.signatures")}</span>
                    <span className="text-muted-foreground">{t("petition.goal")}: {petition.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sema-red to-sema-sunrise rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-[52px]">
                  <Button size="sm" onClick={() => handleSign(petition.id)} className="bg-sema-green text-primary-foreground text-xs gap-1 flex-1">
                    <Heart className="w-3 h-3" /> {t("petition.sign")}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShare(petition)} className="text-xs gap-1">
                    <Share2 className="w-3 h-3" /> WhatsApp
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDonate(petition)} className="text-xs gap-1 text-sema-green border-sema-green/30">
                    <Phone className="w-3 h-3" /> M-Pesa
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
