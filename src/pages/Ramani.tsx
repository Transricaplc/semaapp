import { useState } from "react";
import { Link } from "react-router-dom";
import { X, AlertTriangle, Droplets, HeartPulse, GraduationCap, Landmark, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Region = {
  id: string;
  name: string;
  sw: string;
  path: string;
  labelX: number;
  labelY: number;
  island?: boolean;
};

const TZ_REGIONS: Region[] = [
  { id: "arusha", name: "Arusha", sw: "Arusha", labelX: 310, labelY: 95,
    path: "M280,60 L360,55 L380,80 L350,115 L300,120 L270,100 Z" },
  { id: "kilimanjaro", name: "Kilimanjaro", sw: "Kilimanjaro", labelX: 395, labelY: 72,
    path: "M360,55 L420,50 L440,70 L410,90 L380,80 Z" },
  { id: "tanga", name: "Tanga", sw: "Tanga", labelX: 425, labelY: 118,
    path: "M410,90 L460,85 L470,130 L430,145 L390,130 L380,100 Z" },
  { id: "manyara", name: "Manyara", sw: "Manyara", labelX: 310, labelY: 145,
    path: "M270,100 L350,115 L360,150 L330,175 L280,160 L260,130 Z" },
  { id: "pwani", name: "Pwani", sw: "Pwani", labelX: 415, labelY: 195,
    path: "M390,130 L450,145 L460,220 L420,240 L385,200 L380,155 Z" },
  { id: "dar-es-salaam", name: "Dar es Salaam", sw: "Dar es Salaam", labelX: 445, labelY: 252,
    path: "M420,240 L460,235 L465,265 L435,268 Z" },
  { id: "morogoro", name: "Morogoro", sw: "Morogoro", labelX: 360, labelY: 230,
    path: "M330,175 L420,185 L420,240 L385,260 L340,270 L310,240 L300,200 Z" },
  { id: "dodoma", name: "Dodoma", sw: "Dodoma", labelX: 280, labelY: 215,
    path: "M260,180 L330,175 L300,200 L310,240 L270,250 L240,220 L250,185 Z" },
  { id: "singida", name: "Singida", sw: "Singida", labelX: 220, labelY: 205,
    path: "M200,170 L260,180 L250,220 L220,240 L190,215 L185,185 Z" },
  { id: "tabora", name: "Tabora", sw: "Tabora", labelX: 175, labelY: 250,
    path: "M140,210 L220,205 L220,240 L200,280 L155,285 L130,255 Z" },
  { id: "shinyanga", name: "Shinyanga", sw: "Shinyanga", labelX: 215, labelY: 158,
    path: "M185,140 L240,135 L260,165 L220,175 L185,165 Z" },
  { id: "simiyu", name: "Simiyu", sw: "Simiyu", labelX: 200, labelY: 125,
    path: "M165,110 L240,108 L240,135 L185,140 L160,130 Z" },
  { id: "geita", name: "Geita", sw: "Geita", labelX: 150, labelY: 172,
    path: "M120,155 L185,150 L185,185 L155,195 L118,180 Z" },
  { id: "mwanza", name: "Mwanza", sw: "Mwanza", labelX: 145, labelY: 128,
    path: "M130,108 L165,108 L160,130 L140,145 L118,135 Z" },
  { id: "kagera", name: "Kagera", sw: "Kagera", labelX: 115, labelY: 100,
    path: "M90,80 L150,78 L165,108 L130,108 L100,115 L85,100 Z" },
  { id: "mara", name: "Mara", sw: "Mara", labelX: 235, labelY: 95,
    path: "M195,78 L270,75 L280,100 L240,108 L195,105 L190,88 Z" },
  { id: "kigoma", name: "Kigoma", sw: "Kigoma", labelX: 100, labelY: 200,
    path: "M75,170 L130,165 L130,210 L100,230 L70,210 Z" },
  { id: "katavi", name: "Katavi", sw: "Katavi", labelX: 135, labelY: 295,
    path: "M100,265 L165,258 L175,310 L140,330 L100,305 Z" },
  { id: "rukwa", name: "Rukwa", sw: "Rukwa", labelX: 120, labelY: 345,
    path: "M85,315 L150,308 L160,355 L125,375 L85,355 Z" },
  { id: "songwe", name: "Songwe", sw: "Songwe", labelX: 155, labelY: 388,
    path: "M120,365 L185,360 L195,400 L155,415 L120,395 Z" },
  { id: "mbeya", name: "Mbeya", sw: "Mbeya", labelX: 210, labelY: 363,
    path: "M175,340 L240,335 L250,375 L210,390 L175,375 Z" },
  { id: "njombe", name: "Njombe", sw: "Njombe", labelX: 250, labelY: 388,
    path: "M225,368 L275,362 L280,400 L245,415 L220,400 Z" },
  { id: "iringa", name: "Iringa", sw: "Iringa", labelX: 278, labelY: 312,
    path: "M245,285 L310,280 L315,325 L275,340 L240,325 Z" },
  { id: "ruvuma", name: "Ruvuma", sw: "Ruvuma", labelX: 295, labelY: 408,
    path: "M250,380 L335,372 L340,425 L290,435 L250,420 Z" },
  { id: "lindi", name: "Lindi", sw: "Lindi", labelX: 350, labelY: 372,
    path: "M315,345 L385,340 L390,390 L345,405 L310,385 Z" },
  { id: "mtwara", name: "Mtwara", sw: "Mtwara", labelX: 370, labelY: 422,
    path: "M340,400 L400,395 L405,440 L355,445 L335,425 Z" },
  { id: "mjini-magharibi", name: "Mjini Magharibi", sw: "Mjini Magharibi", labelX: 444, labelY: 298,
    path: "M425,280 L460,278 L462,310 L428,312 Z", island: true },
  { id: "kaskazini-unguja", name: "Kaskazini Unguja", sw: "Kaskazini Unguja", labelX: 446, labelY: 268,
    path: "M432,255 L462,253 L463,278 L430,280 Z", island: true },
  { id: "kusini-unguja", name: "Kusini Unguja", sw: "Kusini Unguja", labelX: 444, labelY: 330,
    path: "M425,312 L462,310 L460,345 L426,347 Z", island: true },
  { id: "kaskazini-pemba", name: "Kaskazini Pemba", sw: "Kaskazini Pemba", labelX: 480, labelY: 162,
    path: "M468,148 L490,146 L492,172 L470,174 Z", island: true },
  { id: "kusini-pemba", name: "Kusini Pemba", sw: "Kusini Pemba", labelX: 481, labelY: 188,
    path: "M470,175 L492,173 L493,198 L471,200 Z", island: true },
];

const CATEGORY_META = {
  barabara:  { label: "Barabara", color: "hsl(var(--warning))",     Icon: AlertTriangle },
  maji:      { label: "Maji",     color: "hsl(var(--yb-info))",     Icon: Droplets },
  afya:      { label: "Afya",     color: "hsl(var(--destructive))", Icon: HeartPulse },
  elimu:     { label: "Elimu",    color: "hsl(var(--accent))",      Icon: GraduationCap },
  rushwa:    { label: "Rushwa",   color: "hsl(var(--primary))",     Icon: Landmark },
  kilimo:    { label: "Kilimo",   color: "hsl(var(--gold))",        Icon: AlertTriangle },
  mazingira: { label: "Mazingira",color: "hsl(var(--accent))",      Icon: AlertTriangle },
} as const;

type Report = { title: string; category: keyof typeof CATEGORY_META; count: number };

const REGION_REPORTS: Record<string, Report[]> = {
  "dar-es-salaam": [
    { title: "Barabara iliyoharibika — Temeke", category: "barabara", count: 23 },
    { title: "Maji hayapatikani — Ilala", category: "maji", count: 15 },
    { title: "Hospitali haina dawa — Kinondoni", category: "afya", count: 31 },
  ],
  "dodoma": [
    { title: "Ufisadi ofisi ya ardhi", category: "rushwa", count: 12 },
    { title: "Shule haina madawati — Kondoa", category: "elimu", count: 8 },
  ],
  "arusha": [
    { title: "Ujangili karibu na Ngorongoro", category: "mazingira", count: 9 },
    { title: "Maji — Monduli DC", category: "maji", count: 6 },
  ],
  "mwanza": [
    { title: "Haki za uvuvi — Ukerewe", category: "mazingira", count: 11 },
  ],
  "mbeya": [
    { title: "Ruzuku za kilimo zimechelewa", category: "kilimo", count: 18 },
  ],
};

export default function Ramani() {
  useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const reports = selectedRegion ? (REGION_REPORTS[selectedRegion.id] ?? []) : [];
  const hasReports = reports.length > 0;
  const totalReports = Object.values(REGION_REPORTS).flat().reduce((s, r) => s + r.count, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-end justify-between gap-4 max-w-[1200px] mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Ramani ya Tanzania</h1>
          <p className="text-meta mt-1">Gusa mkoa wowote kuona ripoti</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border shrink-0">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-[13px] font-semibold text-foreground">
            {totalReports} ripoti
          </span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="px-4 max-w-[1200px] mx-auto">
        <div className="yb-card p-2 sm:p-4 overflow-hidden">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-auto select-none"
            role="img"
            aria-label="Ramani ya Tanzania"
          >
            <rect x="0" y="0" width="500" height="500" fill="hsl(var(--yb-info) / 0.06)" />

            {[100, 200, 300, 400].map(x => (
              <line key={`vx${x}`} x1={x} y1="0" x2={x} y2="500"
                stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
            ))}
            {[100, 200, 300, 400].map(y => (
              <line key={`hy${y}`} x1="0" y1={y} x2="500" y2={y}
                stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
            ))}

            {/* Lake Victoria */}
            <ellipse cx="170" cy="92" rx="55" ry="22"
              fill="hsl(var(--yb-info) / 0.18)" stroke="hsl(var(--yb-info) / 0.4)" strokeWidth="0.8" />
            <text x="170" y="95" textAnchor="middle" fill="hsl(var(--yb-info))"
              fontSize="8" fontWeight="600" letterSpacing="0.5">VICTORIA</text>

            {/* Lake Tanganyika */}
            <path d="M55,200 Q50,260 60,310 Q65,360 75,400"
              stroke="hsl(var(--yb-info) / 0.4)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.45" />
            <text x="40" y="290" textAnchor="middle" transform="rotate(-90 40 290)"
              fill="hsl(var(--yb-info))" fontSize="7" fontWeight="600" letterSpacing="0.8">TANGANYIKA</text>

            {/* Indian Ocean label */}
            <text x="475" y="400" textAnchor="end" fill="hsl(var(--yb-info))"
              fontSize="9" fontWeight="600" letterSpacing="1" opacity="0.7">BAHARI YA HINDI</text>

            {/* Region paths */}
            {TZ_REGIONS.filter(r => r.path && r.path.trim().length > 0).map(region => {
              const isSelected = selectedRegion?.id === region.id;
              const isHovered = hoveredId === region.id;
              const reportCount = REGION_REPORTS[region.id]?.reduce((s, r) => s + r.count, 0) ?? 0;
              const hasData = reportCount > 0;

              const fill = isSelected
                ? "hsl(var(--primary))"
                : isHovered
                ? "hsl(var(--primary) / 0.35)"
                : hasData
                ? "hsl(var(--destructive) / 0.18)"
                : "hsl(var(--card))";

              const stroke = isSelected ? "hsl(var(--primary))" : "hsl(var(--border))";

              return (
                <g key={region.id} className="cursor-pointer">
                  <path
                    d={region.path}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    onClick={() => setSelectedRegion(isSelected ? null : region)}
                    onMouseEnter={() => setHoveredId(region.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ transition: "fill 150ms, stroke-width 150ms" }}
                  />
                  <text
                    x={region.labelX}
                    y={region.labelY}
                    textAnchor="middle"
                    fontSize={region.island ? 5 : 6.5}
                    fontWeight="600"
                    pointerEvents="none"
                    fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
                    opacity={isSelected || isHovered ? 1 : 0.78}
                  >
                    {region.name.split(" ").slice(-1)[0]}
                  </text>
                  {hasData && !isSelected && (
                    <>
                      <circle
                        cx={region.labelX + (region.island ? 12 : 22)}
                        cy={region.labelY - 6}
                        r="6"
                        fill="hsl(var(--destructive))"
                        pointerEvents="none"
                      />
                      <text
                        x={region.labelX + (region.island ? 12 : 22)}
                        y={region.labelY - 4}
                        textAnchor="middle"
                        fontSize="6"
                        fontWeight="700"
                        fill="hsl(var(--destructive-foreground))"
                        pointerEvents="none"
                      >
                        {reportCount}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Zanzibar connector */}
            <line x1="465" y1="200" x2="445" y2="280"
              stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 3" />

            {/* North arrow */}
            <g transform="translate(465 50)">
              <circle cx="0" cy="0" r="14" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.8" />
              <path d="M0,-9 L4,4 L0,1 L-4,4 Z" fill="hsl(var(--primary))" />
              <text x="0" y="-15" textAnchor="middle" fontSize="6" fontWeight="700"
                fill="hsl(var(--foreground))">N</text>
            </g>
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 px-2 pt-3 pb-1 text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border border-border bg-card" />
              <span className="text-muted-foreground">Hakuna ripoti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: "hsl(var(--destructive) / 0.18)" }} />
              <span className="text-muted-foreground">Zenye ripoti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-primary" />
              <span className="text-muted-foreground">Imechaguliwa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {selectedRegion && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/40 animate-fade-in"
            onClick={() => setSelectedRegion(null)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.18)] max-h-[75vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground tracking-tight">{selectedRegion.name}</h2>
                  <p className="text-[13px] text-muted-foreground mt-0.5">
                    {hasReports ? `${reports.length} aina za ripoti` : "Hakuna ripoti bado"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                aria-label="Funga"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center active:bg-muted/70 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {hasReports ? (
                reports.map((r, i) => {
                  const meta = CATEGORY_META[r.category] ?? CATEGORY_META.barabara;
                  const Icon = meta.Icon;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `color-mix(in srgb, ${meta.color} 15%, transparent)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: meta.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-foreground truncate">{r.title}</p>
                        <p className="text-[13px] text-muted-foreground">{meta.label} · Ripoti {r.count}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                    <AlertTriangle className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-semibold">Hakuna ripoti kwa mkoa huu bado.</p>
                  <p className="text-[13px] text-muted-foreground mt-1 mb-4">Kuwa wa kwanza kuripoti tatizo.</p>
                  <Link to="/report" className="btn-primary inline-flex">
                    <AlertTriangle className="w-4 h-4" />
                    Ripoti Tatizo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
