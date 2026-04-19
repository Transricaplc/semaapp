import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, BadgeCheck, AlertCircle, ShieldAlert, MapPin, Phone, Mail, Building2,
  Share2, Send, ChevronRight, Flag, CalendarClock, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { officials, roleTypeLabels, roleBadgeColors, type Official } from "@/data/unified_officials";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function VerifiedBadge({ status }: { status: Official["verified_status"] }) {
  if (status === "VERIFIED") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30 text-badge font-heading uppercase">
        <BadgeCheck className="w-3.5 h-3.5" /> Imethibitishwa
      </span>
    );
  }
  if (status === "PENDING" || status === "OUTDATED") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-warning/10 text-warning border border-warning/30 text-badge font-heading uppercase">
        <AlertCircle className="w-3.5 h-3.5" /> Inasubiri
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-destructive/10 text-destructive border border-destructive/30 text-badge font-heading uppercase">
      <ShieldAlert className="w-3.5 h-3.5" /> Haijathibitishwa
    </span>
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

  if (!official) {
    return (
      <div className="container max-w-2xl py-16 text-center">
        <ShieldAlert className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
        <h1 className="font-heading text-h1 text-foreground mb-2">Kiongozi Hajapatikana</h1>
        <p className="text-body font-body text-muted-foreground mb-6">Hatuwezi kupata kiongozi huyu kwenye saraka.</p>
        <Button asChild variant="outline">
          <Link to="/saka-viongozi">Rudi kwenye Saraka</Link>
        </Button>
      </div>
    );
  }

  const phones = official.contacts?.filter((c) => c.type === "phone") || [];
  const emails = official.contacts?.filter((c) => c.type === "email") || [];
  const addresses = official.contacts?.filter((c) => c.type === "office_address") || [];

  const breadcrumb = [
    "Taifa",
    official.location.region,
    official.location.district,
    official.location.ward,
  ].filter(Boolean);

  const handleReport = () => {
    const params = new URLSearchParams({
      official_id: official.id,
      official_name: official.full_name,
    });
    navigate(`/report?${params.toString()}`);
  };

  const handleShare = () => {
    const phone = phones[0]?.value || "";
    const text = `🇹🇿 ${official.full_name}\n📌 ${official.role_title}${official.location.region ? `\n📍 ${official.location.region}` : ""}${phone ? `\n📞 ${phone}` : ""}\n\n— Sema Yellow Book`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
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
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-yb-charcoal py-8">
        <div className="container max-w-3xl">
          <Link to="/saka-viongozi" className="inline-flex items-center gap-1.5 text-yb-charcoal-muted hover:text-white text-meta font-body mb-4">
            <ArrowLeft className="w-4 h-4" /> Saraka
          </Link>

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-meta font-body text-yb-charcoal-muted mb-4">
            {breadcrumb.map((seg, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <span className={i === breadcrumb.length - 1 ? "text-primary font-medium" : ""}>{seg}</span>
              </span>
            ))}
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-yb-charcoal-mid flex items-center justify-center shrink-0 overflow-hidden">
              {official.profile_photo_url ? (
                <img src={official.profile_photo_url} alt={official.full_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  {official.full_name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-h1 text-white leading-tight">{official.full_name}</h1>
              <p className="text-body font-body text-yb-charcoal-muted mt-1">{official.role_title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className={`text-badge badge-role px-2.5 py-1 rounded-md border ${roleBadgeColors[official.role_type]}`}>
                  {roleTypeLabels[official.role_type]}
                </span>
                <VerifiedBadge status={official.verified_status} />
                {official.party && (
                  <span className="text-badge badge-role px-2.5 py-1 rounded-md bg-yb-charcoal-mid text-yb-charcoal-muted border border-white/10">
                    {official.party}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-6 space-y-5">
        {/* Primary CTA */}
        <Button
          onClick={handleReport}
          className="w-full bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-bold min-h-[56px] text-body gap-2"
        >
          <Flag className="w-5 h-5" /> Ripoti tatizo kwa kiongozi huyu
          <ChevronRight className="w-5 h-5" />
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full min-h-[48px] gap-2 border-accent/30 text-accent hover:bg-accent/5"
        >
          <Share2 className="w-4 h-4" /> Shiriki kupitia WhatsApp
        </Button>

        {/* Contacts */}
        <div className="yb-card p-5">
          <h2 className="font-heading text-h2 text-foreground mb-4">Mawasiliano</h2>
          <div className="space-y-2">
            {phones.length === 0 && emails.length === 0 && addresses.length === 0 && (
              <p className="text-meta font-body text-muted-foreground italic">Hakuna mawasiliano yaliyoorodheshwa</p>
            )}
            {phones.map((c, i) => (
              <a key={`p-${i}`} href={`tel:${c.value}`} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors min-h-[52px]">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-body text-foreground truncate">{c.value}</p>
                  {c.verified && <p className="text-meta font-body text-accent truncate">Imethibitishwa</p>}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
            {emails.map((c, i) => (
              <a key={`e-${i}`} href={`mailto:${c.value}`} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-accent/5 hover:bg-accent/10 border border-accent/10 transition-colors min-h-[52px]">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-body text-foreground truncate">{c.value}</p>
                  {c.verified && <p className="text-meta font-body text-accent truncate">Imethibitishwa</p>}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
            {addresses.map((c, i) => (
              <div key={`a-${i}`} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-secondary/40 border border-border min-h-[52px]">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-body text-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification meta */}
        {(official.verified_source || official.last_verified_date) && (
          <div className="flex flex-wrap items-center gap-4 px-3 text-meta font-body text-muted-foreground italic">
            {official.last_verified_date && (
              <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" />Imethibitishwa: {official.last_verified_date}</span>
            )}
            {official.verified_source && (
              <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" />{official.verified_source}</span>
            )}
          </div>
        )}

        {/* Data correction */}
        <div className="pt-4 border-t border-border/50">
          {!showCorrection ? (
            <button
              onClick={() => setShowCorrection(true)}
              className="text-meta font-body text-muted-foreground hover:text-primary underline underline-offset-2 inline-flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              Je, maelezo haya si sahihi?
            </button>
          ) : (
            <div className="yb-card p-5 animate-fade-in space-y-4">
              <div>
                <h3 className="font-heading text-h3 text-foreground">Pendekeza Marekebisho</h3>
                <p className="text-meta font-body text-muted-foreground mt-0.5">Tusaidie kuweka saraka sahihi</p>
              </div>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Nini si sahihi?</label>
                <Textarea
                  rows={3}
                  placeholder="Mfano: Nambari ya simu si sahihi, jina lina makosa..."
                  value={fieldIncorrect}
                  onChange={(e) => setFieldIncorrect(e.target.value)}
                  className="text-body"
                />
              </div>
              <div>
                <label className="text-meta font-body font-medium text-foreground mb-1.5 block">Maelezo sahihi</label>
                <Input
                  placeholder="Andika taarifa sahihi hapa"
                  value={suggestedValue}
                  onChange={(e) => setSuggestedValue(e.target.value)}
                  className="min-h-[48px] text-body"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitCorrection}
                  disabled={submitting}
                  className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-body font-semibold min-h-[48px] gap-2 flex-1"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Inatuma..." : "Tuma Marekebisho"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setShowCorrection(false); setFieldIncorrect(""); setSuggestedValue(""); }}
                  className="min-h-[48px]"
                >
                  Ghairi
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
