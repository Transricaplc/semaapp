import { useState } from "react";
import { MapPin, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mikoa, wilayaByMkoa, viongoziWote, type Kiongozi } from "@/data/serikali";
import KiongoziCard from "./KiongoziCard";

export default function ConstituencyFinder() {
  const [mkoa, setMkoa] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [results, setResults] = useState<Kiongozi[] | null>(null);

  const availableWilaya = mkoa ? wilayaByMkoa[mkoa] || [] : [];

  const handleSearch = () => {
    const found = viongoziWote.filter((k) => {
      if (mkoa && k.mkoa !== mkoa) return false;
      if (wilaya && k.wilaya !== wilaya) return false;
      return mkoa ? true : false;
    });
    setResults(found);
  };

  const handleMkoaChange = (val: string) => {
    setMkoa(val);
    setWilaya("");
    setResults(null);
  };

  return (
    <div className="glass-card rounded-xl p-5 md:p-6 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
          <MapPin className="w-4 h-4 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-foreground">Tafuta Jimbo Lako</h3>
          <p className="text-xs text-muted-foreground">Chagua mkoa na wilaya kupata viongozi wako</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mkoa Wako</label>
          <select
            value={mkoa}
            onChange={(e) => handleMkoaChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm"
          >
            <option value="">— Chagua Mkoa —</option>
            {mikoa.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Wilaya Yako</label>
          <select
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            disabled={!mkoa}
            className="w-full rounded-lg border border-border bg-card text-foreground px-3 py-2.5 text-sm disabled:opacity-50"
          >
            <option value="">{mkoa ? "— Wilaya Zote —" : "Chagua mkoa kwanza"}</option>
            {availableWilaya.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleSearch}
          disabled={!mkoa}
          className="gap-2 gradient-green text-accent-foreground h-[42px]"
        >
          <Search className="w-4 h-4" />
          Tafuta Viongozi
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {results !== null && (
        <div className="mt-5 pt-4 border-t border-border/50">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Hakuna viongozi waliopatikana katika eneo hili bado.
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Viongozi {results.length} wamepatikana:
              </p>
              {results.map((k) => (
                <KiongoziCard key={k.id} kiongozi={k} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
