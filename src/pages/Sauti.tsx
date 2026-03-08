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
  title: string;
  description: string;
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
  { id: "pet-001", title: "We demand clean water in Dodoma", description: "Dodoma residents have been without clean water for 3 months.", target: "Minister of Water", targetRole: "Ministry of Water", signatures: 2847, goal: 5000, category: "Water", author: "Citizens of Dodoma", createdAt: "2026-02-01", trending: true },
  { id: "pet-002", title: "Fix Morogoro Highway", description: "This road has caused many accidents.", target: "Minister of Works", targetRole: "Ministry of Works & Transport", signatures: 1523, goal: 3000, category: "Roads", author: "Morogoro Drivers", createdAt: "2026-02-15", trending: true },
  { id: "pet-003", title: "Desks for Mwanza schools", description: "500+ students are sitting on the floor.", target: "RC Mwanza", targetRole: "Regional Commissioner", signatures: 892, goal: 2000, category: "Education", author: "Parents of Mwanza", createdAt: "2026-03-01", trending: false },
];

export default function Sauti() {
  const { t } = useLanguage();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleSign = (id: string) => toast.success("You signed the petition. Thank you!");
  const handleShare = (petition: Petition) => {
    const msg = encodeURIComponent(`✊ ${petition.title}\n\nSign here: https://semaapp.lovable.app/sauti\n\n#CitizenYellowBook #Sema`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };
  const handleDonate = (petition: Petition) => toast.info("M-Pesa: Send to 0754 000 000 (Ref: " + petition.id + ")");
  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    toast.success("Your petition has been created!");
    setShowCreate(false); setNewTitle(""); setNewDesc(""); setNewTarget("");
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-yb-charcoal py-10">
        <div className="container max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">People's Petitions</h1>
          <p className="text-yb-charcoal-muted text-sm">Sign, share, or start petitions to demand change</p>
        </div>
      </section>

      <div className="container max-w-3xl py-6">
        <Button onClick={() => setShowCreate(!showCreate)}
          className="w-full mb-6 bg-primary hover:bg-yb-yellow-deep text-primary-foreground font-bold h-12 text-base gap-2">
          <Plus className="w-5 h-5" /> Start a New Petition
        </Button>

        {showCreate && (
          <div className="yb-card p-6 mb-6 animate-fade-in">
            <h3 className="font-heading font-bold text-foreground mb-4">New Petition</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
                <Input placeholder="What do you want to change?" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                <Textarea placeholder="Describe the issue and what you want done..." rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Target</label>
                <Input placeholder="Who should act? e.g. Minister of Water" value={newTarget} onChange={e => setNewTarget(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreate} className="flex-1 bg-primary text-primary-foreground hover:bg-yb-yellow-deep gap-2 font-bold">
                  <Target className="w-4 h-4" /> Submit Petition
                </Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Trending Petitions</span>
        </div>

        <div className="space-y-4">
          {mockPetitions.map((petition) => {
            const progress = Math.min((petition.signatures / petition.goal) * 100, 100);
            return (
              <div key={petition.id} className="yb-card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {petition.trending && <Badge className="bg-primary/15 text-foreground border-primary/30 text-[10px]">🔥 Trending</Badge>}
                      <Badge variant="outline" className="text-[10px]">{petition.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{petition.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{petition.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pl-[52px]">
                  <Target className="w-3 h-3" />
                  <span>To: <strong className="text-foreground">{petition.target}</strong> ({petition.targetRole})</span>
                </div>

                <div className="pl-[52px] mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-primary">{petition.signatures.toLocaleString()} signatures</span>
                    <span className="text-muted-foreground">Goal: {petition.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-[52px]">
                  <Button size="sm" onClick={() => handleSign(petition.id)} className="bg-primary text-primary-foreground text-xs gap-1 flex-1 font-bold hover:bg-yb-yellow-deep">
                    <Heart className="w-3 h-3" /> Sign
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShare(petition)} className="text-xs gap-1">
                    <Share2 className="w-3 h-3" /> WhatsApp
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDonate(petition)} className="text-xs gap-1 text-accent border-accent/30">
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
