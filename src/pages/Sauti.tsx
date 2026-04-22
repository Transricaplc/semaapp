import { useState, useEffect } from "react";
import { Plus, Share2, Target, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Panel from "@/components/Panel";

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
  useLanguage();
  const { user, signInAnonymously } = useAuth();
  useEffect(() => { if (!user) signInAnonymously(); }, [user, signInAnonymously]);

  const [signedIds, setSignedIds] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleSign = (id: string) => {
    setSignedIds((s) => {
      const next = new Set(s);
      next.add(id);
      return next;
    });
    toast.success("Umesaini ombi. Asante!");
  };
  const handleShare = (p: Petition) => {
    const msg = encodeURIComponent(`✊ ${p.title}\n\nSaini hapa: https://semaapp.lovable.app/sauti\n\n#Sema`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };
  const handleDonate = (p: Petition) => toast.info("M-Pesa: 0754 000 000 (Ref: " + p.id + ")");
  const handleCreate = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    toast.success("Ombi lako limeundwa!");
    setShowCreate(false); setNewTitle(""); setNewDesc(""); setNewTarget("");
  };

  return (
    <div className="animate-fade-in mx-auto w-full max-w-[640px]">
      {/* HERO — left aligned */}
      <section className="bg-yb-charcoal-dark px-4 pt-6 pb-5">
        <p
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-primary text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
        >
          MAOMBI YA WANANCHI
        </p>
        <h1 className="text-[26px] leading-[1.1] font-extrabold text-white mb-2 tracking-tight">
          Saini, Shiriki, <br />
          <span className="text-primary">Anzisha Mabadiliko.</span>
        </h1>
        <p className="text-[13px] text-yb-charcoal-muted">Tia saini au anzisha ombi la kudai mabadiliko.</p>
      </section>

      <div className="px-4 py-4 bg-background">
        <button
          onClick={() => setShowCreate((v) => !v)}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground text-[14px] font-bold active:opacity-65 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Anzisha Ombi Jipya
        </button>

        {showCreate && (
          <div className="mt-3 p-4 rounded-xl bg-card border border-border" style={{ animation: "expandDown 240ms ease-out both" }}>
            <p
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3"
            >
              OMBI JIPYA
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Kichwa: Unataka nini?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="h-11 rounded-xl text-[14px]"
              />
              <Textarea
                placeholder="Eleza tatizo na unachotaka kifanyike..."
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="rounded-xl text-[14px]"
              />
              <Input
                placeholder="Lengo: Nani achukue hatua?"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="h-11 rounded-xl text-[14px]"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold active:opacity-65 transition-opacity inline-flex items-center justify-center gap-1.5"
                >
                  <Target className="w-4 h-4" /> Wasilisha
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 h-11 rounded-xl bg-secondary border border-border text-[13px] font-bold text-foreground active:opacity-65 transition-opacity"
                >
                  Ghairi
                </button>
              </div>
            </div>
          </div>
        )}

        <p
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mt-6 mb-2"
        >
          MAOMBI YANAYOCHOMEKA
        </p>
      </div>

      {/* Petition rows */}
      <div className="-mt-2 border-y border-border bg-card divide-y divide-border/60">
        {mockPetitions.map((p) => {
          const progress = Math.min((p.signatures / p.goal) * 100, 100);
          const signed = signedIds.has(p.id);
          return (
            <Panel
              key={p.id}
              left={
                <>
                  <span className="font-display text-[16px] font-extrabold text-primary leading-none">
                    {p.signatures > 999 ? `${(p.signatures / 1000).toFixed(1)}k` : p.signatures}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50">SAINI</span>
                </>
              }
              title={p.title}
              subtitle={`${p.signatures.toLocaleString()} saini · Lengo: ${p.goal.toLocaleString()}`}
              badge={p.trending ? "🔥 Hot" : p.category}
            >
              <div className="space-y-3 pt-2">
                <p className="text-[13px] text-muted-foreground leading-relaxed">{p.description}</p>

                <p className="text-[12px] text-muted-foreground">
                  Kwa: <span className="font-bold text-foreground">{p.target}</span> ({p.targetRole})
                </p>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="mono font-bold text-primary">
                      {p.signatures.toLocaleString()} / {p.goal.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSign(p.id)}
                    disabled={signed}
                    className={`flex-1 h-11 rounded-xl text-[13px] font-bold transition-opacity active:opacity-65 ${
                      signed
                        ? "bg-accent/15 text-accent border border-accent/25"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {signed ? "✓ Umesaini" : "Saini Ombi"}
                  </button>
                  <button
                    onClick={() => handleShare(p)}
                    className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center active:opacity-65 transition-opacity"
                    aria-label="Shiriki"
                  >
                    <Share2 className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDonate(p)}
                    className="w-11 h-11 rounded-xl bg-secondary border border-accent/30 flex items-center justify-center active:opacity-65 transition-opacity"
                    aria-label="M-Pesa"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                  </button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
