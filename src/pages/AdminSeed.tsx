import { useEffect, useState } from "react";
import { Database, Download, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Counts = { mikoa: number; wilaya: number; kata: number };

export default function AdminSeed() {
  const [counts, setCounts] = useState<Counts>({ mikoa: 0, wilaya: 0, kata: 0 });
  const [loadingCounts, setLoadingCounts] = useState(true);

  const [seedingWilaya, setSeedingWilaya] = useState(false);
  const [seedWilayaResult, setSeedWilayaResult] = useState<string | null>(null);

  const [seedingKata, setSeedingKata] = useState(false);
  const [kataProgress, setKataProgress] = useState(0);
  const [seedKataResult, setSeedKataResult] = useState<string | null>(null);

  const refreshCounts = async () => {
    setLoadingCounts(true);
    const [m, w, k] = await Promise.all([
      supabase.from("mikoa").select("*", { count: "exact", head: true }),
      supabase.from("wilaya").select("*", { count: "exact", head: true }),
      supabase.from("kata").select("*", { count: "exact", head: true }),
    ]);
    setCounts({
      mikoa: m.count ?? 0,
      wilaya: w.count ?? 0,
      kata: k.count ?? 0,
    });
    setLoadingCounts(false);
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  async function seedWilaya() {
    setSeedingWilaya(true);
    setSeedWilayaResult(null);
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/Kijacode/Tanzania_Geo_Data/main/Districts.json",
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();
      // Source is a GeoJSON-like object: { name, features: [{ properties: { region, District } }] }
      const features: any[] = Array.isArray(raw) ? raw : raw.features || [];
      const data: any[] = features.map((f: any, idx: number) => ({
        ...(f.properties || f),
        id: f.properties?.id ?? f.id ?? idx + 1,
      }));

      let inserted = 0;
      for (let i = 0; i < data.length; i += 100) {
        const chunk = data.slice(i, i + 100);
        const rows = await Promise.all(
          chunk.map(async (d: any) => {
            const regionName =
              d.region || d.Region || d.region_name || d.mkoa || null;
            let mkoa_id: number | null = null;
            if (regionName) {
              const { data: mkoa } = await supabase
                .from("mikoa")
                .select("id")
                .ilike("jina", `%${regionName}%`)
                .limit(1)
                .maybeSingle();
              if (mkoa) mkoa_id = mkoa.id;
            }
            return {
              pcode: `TZD${String(d.id ?? `${i}${chunk.indexOf(d)}`).padStart(4, "0")}`,
              jina: d.name || d.district_name || d.jina || "Unknown",
              mkoa_id,
            };
          }),
        );
        const { error } = await supabase.from("wilaya").upsert(rows, { onConflict: "pcode" });
        if (error) throw error;
        inserted += chunk.length;
      }
      setSeedWilayaResult(`Imefanikiwa: wilaya ${inserted} zimejazwa`);
      await refreshCounts();
    } catch (e: any) {
      setSeedWilayaResult(`Hitilafu: ${e.message ?? e}`);
    }
    setSeedingWilaya(false);
  }

  async function seedKata() {
    setSeedingKata(true);
    setSeedKataResult(null);
    setKataProgress(0);
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/Kijacode/Tanzania_Geo_Data/main/Wards.json",
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: any[] = await res.json();

      const chunkSize = 100;
      let inserted = 0;

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const rows = await Promise.all(
          chunk.map(async (w: any) => {
            const wilayaName = w.district || w.district_name || w.wilaya || null;
            let wilaya_id: number | null = null;
            let mkoa_id: number | null = null;
            if (wilayaName) {
              const { data: wil } = await supabase
                .from("wilaya")
                .select("id, mkoa_id")
                .ilike("jina", `%${wilayaName}%`)
                .limit(1)
                .maybeSingle();
              if (wil) {
                wilaya_id = wil.id;
                mkoa_id = wil.mkoa_id;
              }
            }
            return {
              pcode: `TZW${String(w.id ?? `${i}${chunk.indexOf(w)}`).padStart(5, "0")}`,
              jina: w.name || w.ward_name || w.jina || "Unknown",
              wilaya_id,
              mkoa_id,
            };
          }),
        );
        const { error } = await supabase.from("kata").upsert(rows, { onConflict: "pcode" });
        if (error) throw error;
        inserted += chunk.length;
        setKataProgress(Math.round((inserted / data.length) * 100));
      }
      setSeedKataResult(`Imefanikiwa: kata ${inserted} zimejazwa`);
      await refreshCounts();
    } catch (e: any) {
      setSeedKataResult(`Hitilafu: ${e.message ?? e}`);
    }
    setSeedingKata(false);
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 pb-4 border-b border-border">
        <h1 className="font-heading text-h1 text-foreground">Jaza Data ya Kijiografia</h1>
        <p className="text-meta font-body text-muted-foreground mt-1">
          Chanzo: NBS Tanzania + Kijacode
        </p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Card 1: Mikoa */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-primary" />
            <h2 className="font-heading text-h3 text-foreground">Mikoa (Regions)</h2>
            <span className="ml-auto text-meta font-body px-2 py-0.5 rounded-md bg-primary/10 text-foreground border border-primary/20">
              {loadingCounts ? "..." : counts.mikoa}
            </span>
          </div>
          <p className="text-meta font-body text-muted-foreground mb-3">
            Mikoa 31 — imeshaseedwa moja kwa moja
          </p>
          <Button onClick={refreshCounts} size="sm" variant="outline" className="gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Thibitisha Mikoa
          </Button>
        </div>

        {/* Card 2: Wilaya */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-primary" />
            <h2 className="font-heading text-h3 text-foreground">Wilaya (Districts)</h2>
            <span className="ml-auto text-meta font-body px-2 py-0.5 rounded-md bg-primary/10 text-foreground border border-primary/20">
              {loadingCounts ? "..." : counts.wilaya}
            </span>
          </div>
          <p className="text-meta font-body text-muted-foreground mb-3">
            Chanzo: github.com/Kijacode/Tanzania_Geo_Data — Districts.json
          </p>
          <Button onClick={seedWilaya} disabled={seedingWilaya} size="sm" className="gap-1.5">
            {seedingWilaya ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            Pakua na Jaza Wilaya
          </Button>
          {seedWilayaResult && (
            <p
              className={`mt-3 text-meta font-body ${seedWilayaResult.startsWith("Hitilafu") ? "text-destructive" : "text-primary"}`}
            >
              {seedWilayaResult}
            </p>
          )}
        </div>

        {/* Card 3: Kata */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-primary" />
            <h2 className="font-heading text-h3 text-foreground">Kata (Wards)</h2>
            <span className="ml-auto text-meta font-body px-2 py-0.5 rounded-md bg-primary/10 text-foreground border border-primary/20">
              {loadingCounts ? "..." : counts.kata}
            </span>
          </div>
          <p className="text-meta font-body text-muted-foreground mb-2">
            Chanzo: github.com/Kijacode/Tanzania_Geo_Data — Wards.json (~3,957 kata)
          </p>
          <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-meta font-body text-amber-700 dark:text-amber-300">
              Hii itachukua dakika 2-3 kwa sababu ya rekodi nyingi
            </p>
          </div>
          <Button onClick={seedKata} disabled={seedingKata} size="sm" className="gap-1.5">
            {seedingKata ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            Pakua na Jaza Kata
          </Button>
          {seedingKata && (
            <div className="mt-3 space-y-1.5">
              <Progress value={kataProgress} className="h-1" />
              <p className="text-meta font-body text-muted-foreground">
                Kata {kataProgress}% zimejazwa...
              </p>
            </div>
          )}
          {seedKataResult && (
            <p
              className={`mt-3 text-meta font-body ${seedKataResult.startsWith("Hitilafu") ? "text-destructive" : "text-primary"}`}
            >
              {seedKataResult}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
