import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Share2, Phone, Mail, MapPin, MessageCircle, BadgeCheck,
  AlertCircle, Send, Flag, Bookmark, BookmarkCheck,
} from "lucide-react";
import { officials, roleTypeLabels, type Official } from "@/data/unified_officials";
import { getOfficialScore } from "@/hooks/useSortFilter";
import { useFollowOfficial } from "@/hooks/useFollowOfficial";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const t = setTimeout(() => setOffset(c - (Math.min(100, Math.max(0, score)) / 100) * c), 50);
    return () => clearTimeout(t);
  }, [c, score]);

  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
        <circle
          cx="48"
          cy="48"
          r={r}
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif-display text-[28px] text-primary leading-none">{score}</span>
      </div>
    </div>
  );
}

export default function OfficialProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const official = officials.find((o) => o.id === id);

  const [showCorrection, setShowCorrection] = useState(false);
  const [fieldIncorrect, setFieldIncorrect] = useState("");
  const [suggestedValue, setSuggestedValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const phone = official?.contacts?.find((c) => c.type === "phone")?.value;
  const email = official?.contacts?.find((c) => c.type === "email")?.value;
  const address = official?.contacts?.find((c) => c.type === "office_address")?.value;
  const waNumber = phone ? phone.replace(/[^\d]/g, "") : "";
  const verified = official?.verified_status === "VERIFIED";
  const score = useMemo(() => (official ? getOfficialScore(official) : 0), [official]);
  const { isFollowing, toggle: toggleFollow, loading: followLoading } = useFollowOfficial(
    official?.id ?? "",
    official?.full_name ?? ""
  );

  // ── Null guard: handle missing official cleanly ──
  if (!official) {
    return (
      <div className="font-ui px-6 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-primary opacity-60" />
        </div>
        <h1 className="font-serif-display text-[22px] text-ink mb-2">Kiongozi Hajapatikana</h1>
        <p className="text-[13px] text-text-secondary mb-6">Hatuwezi kupata kiongozi huyu kwenye saraka.</p>
        <Link
          to="/saka-viongozi"
          className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-[14px]"
        >
          Rudi kwenye Saraka
        </Link>
      </div>
    );
  }

  // Sub-metrics (placeholder until real data exists)
  const reportsCount = 0;
  const responseRate = "—";
  const tenure = "—";

  const handleShare = () => {
    const text = `🇹🇿 ${official.full_name}\n📌 ${official.role_title}${phone ? `\n📞 ${phone}` : ""}\n\n— Sema · https://www.semaapp.co.tz/kiongozi/${official.id}`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const handleReport = () => {
    const params = new URLSearchParams({
      official_id: official.id,
      official_name: official.full_name,
    });
    navigate(`/report?${params.toString()}`);
  };

  const handleSubmitCorrection = async () => {
    if (!fieldIncorrect.trim() || !suggestedValue.trim()) {
      toast.error("Tafadhali jaza sehemu zote mbili");
      return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("data_corrections").insert({
      official_id: official.id,
      official_name: official.full_name,
      field_incorrect: fieldIncorrect.trim(),
      suggested_value: suggestedValue.trim(),
      submitted_by: user?.id ?? null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Hitilafu. Jaribu tena.");
      return;
    }
    toast.success("Asante! Marekebisho yako yatatazamwa na timu yetu.");
    setFieldIncorrect("");
    setSuggestedValue("");
    setShowCorrection(false);
  };

  return (
    <div className="font-ui animate-fade-in pb-32">
      {/* ── Sticky header ── */}
      <header
        className="sticky top-0 z-30 bg-surface border-b border-gazette-border"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="px-3 h-12 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 flex items-center justify-center text-ink active:opacity-65"
            aria-label="Rudi nyuma"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="font-ui text-[13px] text-text-secondary">Maelezo ya Kiongozi</p>
          <div className="flex items-center">
            <button
              onClick={toggleFollow}
              disabled={followLoading}
              className="w-11 h-11 flex items-center justify-center text-ink active:opacity-65 disabled:opacity-40"
              aria-label={isFollowing ? "Acha kufuatilia" : "Fuatilia"}
            >
              {isFollowing ? (
                <BookmarkCheck className="w-5 h-5 text-primary" fill="currentColor" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="w-11 h-11 flex items-center justify-center text-ink active:opacity-65"
              aria-label="Shiriki"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-primary pt-8 pb-16 px-6 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-accent text-primary flex items-center justify-center font-serif-display text-[32px] font-bold">
          {initials(official.full_name)}
        </div>
        <h1 className="font-serif-display text-[28px] text-primary-foreground mt-4 leading-tight">
          {official.full_name}
        </h1>
        <p className="font-ui text-[13px] text-primary-foreground/70 mt-1">
          {official.role_title || roleTypeLabels[official.role_type]}
        </p>
        {verified && (
          <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-semibold text-accent">
            <BadgeCheck className="w-3 h-3" /> Imehakikishwa
          </span>
        )}
        {official.party && (
          <p className="font-code text-[10px] text-primary-foreground/50 mt-2">{official.party}</p>
        )}
      </section>

      {/* ── Accountability ring card ── */}
      <section className="-mt-8 mx-4 relative z-10">
        <div className="bg-surface rounded-2xl border border-gazette-border p-5">
          <ScoreRing score={score} />
          <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-text-secondary text-center mt-2">
            Alama ya Uwazi
          </p>
          <div className="mt-4 grid grid-cols-3 divide-x divide-gazette-border">
            <div className="text-center px-2">
              <p className="font-serif-display text-[20px] text-ink leading-none">{reportsCount}</p>
              <p className="font-ui text-[10px] uppercase tracking-wide text-text-secondary mt-1">Ripoti</p>
            </div>
            <div className="text-center px-2">
              <p className="font-serif-display text-[20px] text-ink leading-none">{responseRate}</p>
              <p className="font-ui text-[10px] uppercase tracking-wide text-text-secondary mt-1">Majibu</p>
            </div>
            <div className="text-center px-2">
              <p className="font-serif-display text-[20px] text-ink leading-none">{tenure}</p>
              <p className="font-ui text-[10px] uppercase tracking-wide text-text-secondary mt-1">Miaka</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="mx-4 mt-6">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-text-secondary mb-2">
          Mawasiliano
        </p>
        <div className="space-y-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="font-code text-[14px] text-ink flex-1 truncate">{phone}</span>
              <span className="text-[12px] font-medium text-primary">Piga</span>
            </a>
          )}
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <MessageCircle className="w-4 h-4 shrink-0" style={{ color: "#25D366" }} />
              <span className="font-ui text-[14px] text-ink flex-1">Wasiliana WhatsApp</span>
              <span className="text-[12px] font-medium text-primary">Tuma</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface border border-gazette-border active:opacity-65 transition-opacity"
            >
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="font-ui text-[14px] text-ink flex-1 truncate">{email}</span>
              <span className="text-[12px] font-medium text-primary">Tuma</span>
            </a>
          )}
          {address && (
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-surface border border-gazette-border">
              <MapPin className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
              <p className="font-ui text-[12px] text-text-secondary leading-snug flex-1">{address}</p>
            </div>
          )}
          {!phone && !email && !address && (
            <p className="text-[13px] text-text-secondary italic px-1">Hakuna mawasiliano yaliyoorodheshwa</p>
          )}
        </div>
      </section>

      {/* ── Public reports ── */}
      <section className="mx-4 mt-6">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-text-secondary mb-2">
          Ripoti za Umma · 0
        </p>
        <p className="font-ui text-[13px] text-text-secondary/80 italic">Hakuna ripoti bado</p>
      </section>

      {/* ── Data correction (collapsed) ── */}
      <section className="mx-4 mt-6">
        {!showCorrection ? (
          <button
            onClick={() => setShowCorrection(true)}
            className="text-[12px] text-text-secondary underline underline-offset-2 inline-flex items-center gap-1 active:opacity-65"
          >
            <AlertCircle className="w-3 h-3" /> Je, maelezo haya si sahihi?
          </button>
        ) : (
          <div className="rounded-xl bg-surface border border-gazette-border p-4 space-y-3 animate-fade-in">
            <h3 className="font-serif-display text-[16px] text-ink">Pendekeza Marekebisho</h3>
            <textarea
              rows={3}
              placeholder="Mfano: Nambari ya simu si sahihi..."
              value={fieldIncorrect}
              onChange={(e) => setFieldIncorrect(e.target.value)}
              className="w-full bg-cream border border-gazette-border rounded-xl px-3 py-2 text-[13px] focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Maelezo sahihi"
              value={suggestedValue}
              onChange={(e) => setSuggestedValue(e.target.value)}
              className="w-full h-11 bg-cream border border-gazette-border rounded-xl px-3 text-[13px] focus:border-primary focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmitCorrection}
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-medium active:opacity-65 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? "Inatuma..." : "Tuma"}
              </button>
              <button
                onClick={() => { setShowCorrection(false); setFieldIncorrect(""); setSuggestedValue(""); }}
                className="px-4 h-11 rounded-xl border border-primary text-primary text-[13px] font-medium active:opacity-60"
              >
                Ghairi
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <div
        className="fixed left-0 right-0 z-20 page-shell"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
      >
        <div className="page-shell-inner mx-4">
          <button
            onClick={handleReport}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium text-[14px] inline-flex items-center justify-center gap-2 active:opacity-65 shadow-lg"
          >
            <Flag className="w-4 h-4" /> Wasilisha Ripoti
          </button>
        </div>
      </div>
    </div>
  );
}
