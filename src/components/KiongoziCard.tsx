import { Phone, Mail, FileText, User, MapPin, Share2, CalendarClock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Kiongozi, Mhimili } from "@/data/serikali";

const mhimiliColor = (m: Mhimili) => {
  switch (m) {
    case "Executive": return "bg-primary/15 text-foreground border border-primary/25";
    case "Legislature": return "bg-primary/15 text-foreground border border-primary/30";
    case "LocalGov": return "bg-accent/15 text-accent border border-accent/25";
    case "Judiciary": return "bg-destructive/10 text-destructive border border-destructive/20";
    default: return "bg-secondary text-muted-foreground";
  }
};

function shareWhatsApp(kiongozi: Kiongozi) {
  const text = `🇹🇿 ${kiongozi.jina}\n📌 ${kiongozi.wadhifa}${kiongozi.ofisi ? `\n📍 ${kiongozi.ofisi}` : ""}${kiongozi.simu ? `\n📞 ${kiongozi.simu}` : ""}${kiongozi.barua_pepe ? `\n✉️ ${kiongozi.barua_pepe}` : ""}\n\n— Sema Yellow Book`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

export default function KiongoziCard({ kiongozi }: { kiongozi: Kiongozi }) {
  return (
    <div className="yb-card p-4 md:p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-yb-charcoal-mid flex items-center justify-center shrink-0">
          {kiongozi.picha_url ? (
            <img src={kiongozi.picha_url} alt={kiongozi.jina} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <span className="text-xl font-bold text-primary">{kiongozi.jina.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{kiongozi.jina}</h3>
          <p className="text-sm text-muted-foreground">{kiongozi.wadhifa}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {kiongozi.ofisi && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />{kiongozi.ofisi}
              </span>
            )}
            {kiongozi.mkoa && (
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${mhimiliColor(kiongozi.mhimili)}`}>{kiongozi.mkoa}</span>
            )}
            {kiongozi.chama && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-secondary text-muted-foreground">{kiongozi.chama}</span>
            )}
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 shrink-0">
          {kiongozi.simu && (
            <a href={`tel:${kiongozi.simu}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-yb-yellow-deep transition-colors">
              <Phone className="w-4 h-4" /><span className="hidden sm:inline">Call</span>
            </a>
          )}
          {kiongozi.barua_pepe && (
            <a href={`mailto:${kiongozi.barua_pepe}`} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              <Mail className="w-4 h-4" /><span className="hidden sm:inline">Email</span>
            </a>
          )}
          <Link to="/report" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/15 text-foreground border border-primary/30 text-sm font-medium hover:bg-primary/25 transition-colors">
            <FileText className="w-4 h-4" /><span className="hidden sm:inline">Report</span>
          </Link>
          <button onClick={() => shareWhatsApp(kiongozi)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm font-medium hover:bg-accent/20 transition-colors">
            <Share2 className="w-4 h-4" /><span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {(kiongozi.chanzo || kiongozi.tarehe_uhakiki) && (
        <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          {kiongozi.tarehe_uhakiki && (
            <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" />Verified: {kiongozi.tarehe_uhakiki}</span>
          )}
          {kiongozi.chanzo && (
            <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" />Source: {kiongozi.chanzo}</span>
          )}
        </div>
      )}
    </div>
  );
}
