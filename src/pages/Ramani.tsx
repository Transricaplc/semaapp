import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ChevronRight, MapPin, Phone, MessageCircle, BadgeCheck, AlertTriangle, Share2, Download } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import { supabase } from "@/integrations/supabase/client";
import {
  MAP_CATEGORY_META,
  resolveMapCategory,
  type MapCategory,
  TANZANIA_CENTROID,
} from "@/lib/locationHooks";
import { downloadVCard } from "@/lib/vcard";

type Pin = {
  id: string;
  name: string;
  subtitle?: string;
  category: MapCategory;
  lat: number;
  lng: number;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  verified?: boolean;
  verifiedBy?: string | null;
  source?: string | null;
  region?: string | null;
};

// Filter groups (spec §3)
const FILTER_GROUPS: { key: string; labelSw: string; labelEn: string; categories: MapCategory[] }[] = [
  { key: "all",      labelSw: "Zote",        labelEn: "All",        categories: [] },
  { key: "gov",      labelSw: "Serikali",    labelEn: "Gov't",      categories: ["national_ministry", "president_office", "parliament", "regional_commissioner", "regional_secretariat", "district_commissioner", "district_council", "ward_executive", "village_executive"] },
  { key: "health",   labelSw: "Afya",        labelEn: "Health",     categories: ["hospital_national", "hospital_regional", "hospital_district", "health_centre"] },
  { key: "security", labelSw: "Usalama",     labelEn: "Security",   categories: ["police_regional", "police_district"] },
  { key: "justice",  labelSw: "Mahakama",    labelEn: "Courts",     categories: ["court_high", "court_district"] },
  { key: "edu",      labelSw: "Elimu",       labelEn: "Education",  categories: ["school_secondary", "school_primary"] },
  { key: "utils",    labelSw: "Huduma",      labelEn: "Utilities",  categories: ["water_authority", "electricity_tanesco", "revenue_authority", "immigration"] },
];

function makePinIcon(category: MapCategory) {
  const meta = MAP_CATEGORY_META[category];
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:32px;height:40px;">
      <div style="position:absolute;inset:0;display:flex;align-items:flex-start;justify-content:center;">
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 24 16 24s16-13 16-24C32 7.16 24.84 0 16 0z" fill="${meta.color}" stroke="#fff" stroke-width="2"/>
        </svg>
      </div>
      <div style="position:absolute;top:5px;left:0;right:0;text-align:center;font-size:14px;line-height:1;">${meta.icon}</div>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });
}

export default function Ramani() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [pins, setPins] = useState<Pin[]>([]);
  const [selected, setSelected] = useState<Pin | null>(null);
  const [listOpen, setListOpen] = useState(true);

  // Init map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: TANZANIA_CENTROID,
      zoom: 6,
      zoomControl: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap · NBS Tanzania · HackEAC",
      maxZoom: 19,
    }).addTo(map);

    // Region boundaries overlay
    fetch("/geo/tz_regions.geojson")
      .then((r) => (r.ok ? r.json() : null))
      .then((gj) => {
        if (!gj || !mapInstance.current) return;
        L.geoJSON(gj, {
          style: {
            color: "hsl(var(--primary))",
            weight: 1,
            opacity: 0.4,
            fillColor: "hsl(var(--primary))",
            fillOpacity: 0.03,
          },
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.name;
            if (name) layer.bindTooltip(name, { sticky: true, direction: "center" });
          },
        }).addTo(map);
      })
      .catch(() => {});

    const cluster = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      iconCreateFunction: (c: any) => {
        const n = c.getChildCount();
        return L.divIcon({
          html: `<div style="width:40px;height:40px;border-radius:9999px;background:hsl(var(--primary));color:hsl(var(--primary-foreground));display:flex;align-items:center;justify-content:center;font-weight:700;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-family:'DM Sans',sans-serif;">${n}</div>`,
          className: "",
          iconSize: [40, 40],
        });
      },
    });
    map.addLayer(cluster);

    clusterRef.current = cluster;
    mapInstance.current = map;
    return () => {
      map.remove();
      mapInstance.current = null;
      clusterRef.current = null;
    };
  }, []);

  // Load officials + region centroids
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [officialsRes, mikoaRes] = await Promise.all([
        supabase
          .from("officials")
          .select("id, full_name, role_title, role_title_sw, department, lat, lng, mkoa_id, wilaya_id, kata_id, map_category, phone, whatsapp, email, office_address, verified_at, verified_by, data_source")
          .not("lat", "is", null)
          .not("lng", "is", null)
          .limit(2000),
        supabase
          .from("mikoa")
          .select("id, jina, lat, lng")
          .not("lat", "is", null)
          .not("lng", "is", null),
      ]);

      if (cancelled) return;

      const mikoaPins: Pin[] = (mikoaRes.data ?? []).map((m: any) => ({
        id: `mk-${m.id}`,
        name: `${m.jina}`,
        subtitle: "Mkoa · Ofisi ya Mkuu wa Mkoa",
        category: "regional_commissioner",
        lat: Number(m.lat),
        lng: Number(m.lng),
        verified: true,
        verifiedBy: "NBS Tanzania",
        source: "HDX / OCHA",
        region: m.jina,
      }));

      const officialPins: Pin[] = (officialsRes.data ?? []).map((o: any) => ({
        id: `o-${o.id}`,
        name: o.full_name,
        subtitle: o.role_title_sw ?? o.role_title,
        category: resolveMapCategory(o),
        lat: Number(o.lat),
        lng: Number(o.lng),
        phone: o.phone,
        whatsapp: o.whatsapp,
        email: o.email,
        address: o.office_address,
        verified: !!o.verified_at,
        verifiedBy: o.verified_by,
        source: o.data_source,
      }));

      setPins([...officialPins, ...mikoaPins]);
    })();
    return () => { cancelled = true; };
  }, []);

  // Filter pins by group + search
  const filtered = useMemo(() => {
    const group = FILTER_GROUPS.find((g) => g.key === activeGroup);
    const allowedCats = group && group.categories.length ? new Set(group.categories) : null;
    const q = search.trim().toLowerCase();
    return pins.filter((p) => {
      if (allowedCats && !allowedCats.has(p.category)) return false;
      if (q && !`${p.name} ${p.subtitle ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [pins, activeGroup, search]);

  // Render pins into cluster
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    cluster.clearLayers();
    const layers: L.Marker[] = [];
    filtered.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: makePinIcon(p.category) });
      marker.on("click", () => {
        setSelected(p);
        mapInstance.current?.flyTo([p.lat, p.lng], Math.max(mapInstance.current.getZoom(), 11), { duration: 0.6 });
      });
      layers.push(marker);
    });
    cluster.addLayers(layers);
  }, [filtered]);

  const flyTo = (p: Pin) => {
    mapInstance.current?.flyTo([p.lat, p.lng], 12, { duration: 0.7 });
    setSelected(p);
    setListOpen(false);
  };

  return (
    <div className="relative font-body" style={{ height: "calc(100dvh - 80px)" }}>
      {/* MAP */}
      <div ref={mapRef} className="absolute inset-0 z-0 bg-muted overflow-hidden" />

      {/* SEARCH BAR */}
      <div className="absolute left-0 right-0 z-[400] px-3" style={{ top: "calc(env(safe-area-inset-top) + 10px)" }}>
        <div className="bg-card border border-border rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tafuta ofisi, hospitali, polisi..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground min-h-[28px]"
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Futa" className="text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* CATEGORY CHIPS */}
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {FILTER_GROUPS.map((g) => {
            const active = g.key === activeGroup;
            return (
              <button
                key={g.key}
                onClick={() => setActiveGroup(g.key)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-[32px] ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {g.labelSw}
              </button>
            );
          })}
        </div>
      </div>

      {/* COUNT PILL */}
      <div className="absolute right-3 z-[399]" style={{ top: "calc(env(safe-area-inset-top) + 130px)" }}>
        <div className="bg-card/95 backdrop-blur border border-border rounded-full px-3 py-1 text-[11px] font-mono text-muted-foreground shadow">
          {filtered.length} pini
        </div>
      </div>

      {/* PIN DETAIL BOTTOM SHEET */}
      {selected && (
        <div className="absolute left-0 right-0 bottom-0 z-[500] bg-card rounded-t-3xl border-t border-border max-h-[75vh] overflow-y-auto shadow-2xl border-l-[4px] border-l-primary animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setSelected(null)}
            aria-label="Funga"
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted z-10"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="w-10 h-1 rounded-full bg-border mx-auto mt-3 mb-3" />

          <div className="px-5 pb-5 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${MAP_CATEGORY_META[selected.category].color}22`, color: MAP_CATEGORY_META[selected.category].color }}
              >
                {MAP_CATEGORY_META[selected.category].icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-lg font-semibold text-foreground leading-tight">
                  {selected.name}
                </h2>
                {selected.subtitle && (
                  <p className="text-sm text-muted-foreground mt-0.5">{selected.subtitle}</p>
                )}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ background: `${MAP_CATEGORY_META[selected.category].color}1A`, color: MAP_CATEGORY_META[selected.category].color }}
                  >
                    {MAP_CATEGORY_META[selected.category].labelSw}
                  </span>
                  {selected.verified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[hsl(var(--verified-green,142_71%_45%))]/10 text-[hsl(var(--verified-green,142_71%_45%))]">
                      <BadgeCheck className="w-3 h-3" /> Imethibitishwa
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[hsl(var(--unverified-red,0_100%_61%))]/10 text-[hsl(var(--unverified-red,0_100%_61%))]">
                      Haijathibitishwa
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact actions */}
            <div className="space-y-2">
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-3 px-3 h-12 rounded-xl bg-secondary border border-border active:opacity-65"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono text-sm flex-1 truncate">{selected.phone}</span>
                  <span className="text-xs font-semibold text-primary">Piga</span>
                </a>
              )}
              {(selected.whatsapp || selected.phone) && (
                <a
                  href={`https://wa.me/${(selected.whatsapp || selected.phone || "").replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Habari, nina swali kuhusu ${selected.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 active:opacity-65"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span className="text-sm flex-1">WhatsApp</span>
                  <span className="text-xs font-semibold text-[#25D366]">Tuma</span>
                </a>
              )}
              {selected.address && (
                <div className="flex items-start gap-3 px-3 py-3 rounded-xl bg-secondary border border-border">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-snug flex-1">{selected.address}</p>
                </div>
              )}
            </div>

            {/* Action strip */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const text = `${selected.name}${selected.subtitle ? ` — ${selected.subtitle}` : ""}${selected.phone ? `\n📞 ${selected.phone}` : ""}\n\nSema: https://semaapp.lovable.app`;
                  if (navigator.share) navigator.share({ text }).catch(() => {});
                  else navigator.clipboard.writeText(text);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium active:opacity-70"
              >
                <Share2 className="w-3.5 h-3.5" /> Shiriki
              </button>
              <button
                onClick={() => downloadVCard({
                  fullName: selected.name,
                  title: selected.subtitle ?? undefined,
                  phone: selected.phone,
                  whatsapp: selected.whatsapp,
                  email: selected.email,
                  address: selected.address,
                })}
                className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-xl border border-primary text-primary bg-transparent text-sm font-medium active:opacity-60"
              >
                <Download className="w-3.5 h-3.5" /> vCard
              </button>
              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`;
                  window.open(url, "_blank");
                }}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-border text-muted-foreground active:opacity-60"
                aria-label="Elekeza"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            {/* Source footer */}
            {(selected.verifiedBy || selected.source) && (
              <div className="text-[10px] text-muted-foreground/80 font-mono uppercase tracking-wider pt-2 border-t border-border">
                {selected.verifiedBy && <span>Verified by: {selected.verifiedBy}</span>}
                {selected.verifiedBy && selected.source && <span> · </span>}
                {selected.source && <span>Source: {selected.source}</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULTS LIST SHEET (when no pin selected) */}
      {!selected && listOpen && (
        <div className="absolute left-0 right-0 bottom-0 z-[400] bg-card rounded-t-3xl border-t border-border max-h-[42%] overflow-y-auto shadow-2xl">
          <button
            onClick={() => setListOpen(false)}
            aria-label="Funga"
            className="absolute top-2 right-3 w-8 h-8 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="w-10 h-1 rounded-full bg-border mx-auto mt-3 mb-2" />
          <p className="px-4 mb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Karibu nawe · {filtered.length}
          </p>
          <ul className="px-2 pb-4">
            {filtered.slice(0, 50).map((p) => {
              const meta = MAP_CATEGORY_META[p.category];
              return (
                <li key={p.id}>
                  <button
                    onClick={() => flyTo(p)}
                    className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl active:bg-muted min-h-[56px] border-l-2 border-l-transparent hover:border-l-primary"
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base"
                      style={{ background: `${meta.color}1A`, color: meta.color }}
                    >
                      {meta.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.subtitle ?? meta.labelSw}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">Hakuna matokeo.</li>
            )}
          </ul>
        </div>
      )}

      {/* Reopen pill */}
      {!selected && !listOpen && (
        <button
          onClick={() => setListOpen(true)}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 z-[400] bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-medium shadow-xl"
        >
          Onyesha orodha
        </button>
      )}
    </div>
  );
}
