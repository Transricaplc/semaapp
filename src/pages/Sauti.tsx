import { useState } from "react";
import { Plus, TrendingUp, Users, Share2, Heart, Target, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  {
    id: "pet-001",
    title: "Tunataka maji safi Dodoma — We demand clean water in Dodoma",
    description: "Wakazi wa Dodoma wamekuwa bila maji safi kwa miezi 3. Tunaomba Waziri wa Maji achukue hatua za haraka.",
    target: "Waziri wa Maji",
    targetRole: "Ministry of Water",
    signatures: 2847,
    goal: 5000,
    category: "Maji",
    author: "Wananchi wa Dodoma",
    createdAt: "2026-02-01",
    trending: true,
  },
  {
    id: "pet-002",
    title: "Barabara ya Morogoro irekebishwe — Fix Morogoro Highway",
    description: "Barabara hii imesababisha ajali nyingi. Tunaomba Serikali iirejeshe katika hali nzuri.",
    target: "Waziri wa Ujenzi",
    targetRole: "Ministry of Works",
    signatures: 1523,
    goal: 3000,
    category: "Barabara",
    author: "Madereva wa Morogoro",
    createdAt: "2026-02-15",
    trending: true,
  },
  {
    id: "pet-003",
    title: "Madawati shule za Mwanza — Desks for Mwanza schools",
    description: "Wanafunzi 500+ wanakaa chini. Tunaomba serikali ya mkoa itoe madawati ya kutosha.",
    target: "RC Mwanza",
    targetRole: "Regional Commissioner",
    signatures: 892,
    goal: 2000,
    category: "Elimu",
    author: "Wazazi wa Mwanza",
    createdAt: "2026-03-01",
    trending: false,
  },
];

export default function Sauti() {
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleSign = (id: string) => {
    toast.success("Umesaini! — You signed the petition. Asante!");
  };

  const handleShare = (petition: Petition) => {
    const msg = encodeURIComponent(`✊ ${petition.title}\n\nSaini hapa: https://semaapp.lovable.app/sauti\n\n#SautiyaMwananchi #Sema`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleDonate = (petition: Petition) => {
    toast.info("M-Pesa: Tuma kwa 0754 000 000 (Ref: " + petition.id + ")");
  };

  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    toast.success("Ombi lako limetumwa! — Your petition has been created.");
    setShowCreate(false);
    setNewTitle("");
    setNewDesc("");
    setNewTarget("");
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-hero py-10">
        <div className="container max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
            ✊ Sauti Zetu — Our Voices
          </h1>
          <p className="text-primary-foreground/60 text-sm">
            Anza ombi, saini, shiriki — Start petitions, sign, and make change happen
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-6">
        {/* Create button */}
        <Button
          onClick={() => setShowCreate(!showCreate)}
          className="w-full mb-6 bg-sema-red hover:bg-sema-red-light text-primary-foreground font-semibold h-12 text-base gap-2 animate-warm-pulse"
        >
          <Plus className="w-5 h-5" />
          Anza Ombi Jipya — Start New Petition
        </Button>

        {/* Create form */}
        {showCreate && (
          <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in kitenge-border border-2">
            <h3 className="font-heading font-bold text-foreground mb-4">Ombi Jipya — New Petition</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Kichwa / Title</label>
                <Input placeholder="e.g. Tunataka maji safi..." value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Maelezo / Description</label>
                <Textarea placeholder="Eleza tatizo na unachotaka..." rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Lengwa / Target (MP, Waziri, au Diwani)</label>
                <Input placeholder="e.g. Waziri wa Maji" value={newTarget} onChange={e => setNewTarget(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreate} className="flex-1 bg-sema-green text-primary-foreground gap-2">
                  <Target className="w-4 h-4" /> Tuma Ombi
                </Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Ghairi</Button>
              </div>
            </div>
          </div>
        )}

        {/* Trending badge */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-sema-red" />
          <span className="text-sm font-semibold text-foreground">Maombi Yanayoongoza</span>
          <span className="text-xs text-muted-foreground">— Trending Petitions</span>
        </div>

        {/* Petition cards */}
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
                      {petition.trending && (
                        <Badge className="bg-sema-yellow/20 text-sema-yellow-warm border-sema-yellow/30 text-[10px]">
                          🔥 Trending
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">{petition.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{petition.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{petition.description}</p>
                  </div>
                </div>

                {/* Target */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pl-[52px]">
                  <Target className="w-3 h-3" />
                  <span>Kwa: <strong className="text-foreground">{petition.target}</strong> ({petition.targetRole})</span>
                </div>

                {/* Progress bar */}
                <div className="pl-[52px] mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-sema-red">{petition.signatures.toLocaleString()} saini</span>
                    <span className="text-muted-foreground">Lengo: {petition.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sema-red to-sema-sunrise rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pl-[52px]">
                  <Button size="sm" onClick={() => handleSign(petition.id)} className="bg-sema-green text-primary-foreground text-xs gap-1 flex-1">
                    <Heart className="w-3 h-3" /> Saini — Sign
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
