import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronRight, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/integrations/supabase/client";

type POI = {
  id: string;
  name: string;
  type: "ofisi" | "hospitali" | "polisi" | "mkoa";
  lat: number;
  lng: number;
};

// Flagship landmarks (kept as-is)
const LANDMARKS: POI[] = [
  { id: "lm-1", name: "Ikulu — State House", type: "ofisi", lat: -6.8161, lng: 39.2803 },
  { id: "lm-2", name: "Muhimbili National Hospital", type: "hospitali", lat: -6.8004, lng: 39.2693 },
  { id: "lm-3", name: "Central Police HQ — Dar", type: "polisi", lat: -6.8186, lng: 39.2845 },
  { id: "lm-4", name: "Bugando Medical Centre — Mwanza", type: "hospitali", lat: -2.5165, lng: 32.9148 },
  { id: "lm-5", name: "Arusha Police Station", type: "polisi", lat: -3.3725, lng: 36.6822 },
];

const TYPE_COLOR: Record<POI["type"], string> = {
  ofisi: "hsl(158 70% 14%)",
  hospitali: "hsl(48 100% 48%)",
  polisi: "hsl(0 99% 38%)",
  mkoa: "hsl(158 70% 14%)",
};

const TYPE_LABEL: Record<POI["type"], string> = {
  ofisi: "Ofisi za Serikali",
  hospitali: "Hospitali",
  polisi: "Vituo vya Polisi",
  mkoa: "Mkoa",
};

export default function Ramani() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(true);
  const [pois, setPois] = useState<POI[]>(LANDMARKS);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-6.369, 34.888],
      zoom: 6,
      zoomControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "© OpenStreetMap • Boundaries: HDX/OCHA (NBS Tanzania) • Data: Kijacode",
      maxZoom: 19,
    }).addTo(map);

    // HDX/OCHA Tanzania ADM1 region boundaries overlay
    fetch("/geo/tz_regions.geojson")
      .then((r) => (r.ok ? r.json() : null))
      .then((gj) => {
        if (!gj || !mapInstance.current) return;
        L.geoJSON(gj, {
          style: {
            color: "hsl(158 70% 14%)",
            weight: 1,
            opacity: 0.55,
            fillColor: "hsl(158 70% 14%)",
            fillOpacity: 0.04,
          },
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.name;
            if (name) layer.bindTooltip(name, { sticky: true, direction: "center" });
          },
        }).addTo(map);
      })
      .catch(() => {});

    markersLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;
    return () => {
      map.remove();
      mapInstance.current = null;
      markersLayer.current = null;
    };
  }, []);

  // Load mikoa from Supabase (sourced from Kijacode/Tanzania_Geo_Data)
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("mikoa")
      .select("id, jina, lat, lng")
      .not("lat", "is", null)
      .not("lng", "is", null)
      .order("jina")
      .then(({ data }) => {
        if (cancelled || !data) return;
        const mkoaPois: POI[] = data.map((m: any) => ({
          id: `mk-${m.id}`,
          name: `${m.jina} — Mkoa`,
          type: "mkoa",
          lat: Number(m.lat),
          lng: Number(m.lng),
        }));
        setPois([...LANDMARKS, ...mkoaPois]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Render markers whenever POIs change
  useEffect(() => {
    if (!markersLayer.current) return;
    markersLayer.current.clearLayers();
    pois.forEach((p) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:9999px;background:${TYPE_COLOR[p.type]};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker([p.lat, p.lng], { icon })
        .addTo(markersLayer.current!)
        .bindPopup(
          `<strong>${p.name}</strong><br/><span style="color:#6B7280">${TYPE_LABEL[p.type]}</span>`,
        );
    });
  }, [pois]);

  const filtered = search.trim()
    ? pois.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : pois;

  const flyTo = (p: POI) => {
    mapInstance.current?.flyTo([p.lat, p.lng], 13, { duration: 0.8 });
    setSheetOpen(false);
  };

  return (
    <div className="font-ui relative" style={{ height: "calc(100dvh - 80px)" }}>
      {/* MAP — full bleed */}
      <div ref={mapRef} className="absolute inset-0 z-0 bg-cream overflow-hidden" />

      {/* FLOATING SEARCH */}
      <div
        className="absolute left-0 right-0 z-10 px-4"
        style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="bg-surface border border-gazette-border rounded-full px-4 py-2.5 flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <Search className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tafuta ofisi, hospitali..."
            className="flex-1 bg-transparent text-[14px] focus:outline-none placeholder:text-text-secondary min-h-[28px]"
          />
          <button aria-label="Filters" className="text-text-secondary">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FLOATING LEGEND */}
      <div className="absolute right-4 z-10 mb-24" style={{ bottom: "0" }}>
        <div className="gazette-card p-3 space-y-1.5">
          {(["ofisi", "hospitali", "polisi"] as POI["type"][]).map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: TYPE_COLOR[t] }} />
              <span className="text-[12px] text-ink">{TYPE_LABEL[t]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SHEET */}
      {sheetOpen && (
        <div className="absolute left-0 right-0 bottom-0 z-10 bg-surface rounded-t-2xl border-t border-gazette-border max-h-[45%] overflow-y-auto shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => setSheetOpen(false)}
            aria-label="Funga"
            className="absolute top-2 right-3 w-8 h-8 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
          <div className="w-10 h-1 rounded-full bg-gazette-border mx-auto mt-3 mb-2" />
          <p className="label-eyebrow px-4 mb-2">Karibu nawe</p>
          <ul className="px-2 pb-4">
            {filtered.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => flyTo(p)}
                  className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl active:bg-secondary/40 min-h-[52px]"
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${TYPE_COLOR[p.type]}1A` }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: TYPE_COLOR[p.type] }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-ink truncate">{p.name}</p>
                    <p className="text-[12px] text-text-secondary">{TYPE_LABEL[p.type]}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary shrink-0" />
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-[13px] text-text-secondary">Hakuna matokeo.</li>
            )}
          </ul>
        </div>
      )}

      {/* Reopen sheet pill */}
      {!sheetOpen && (
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-[13px] font-medium shadow-[0_4px_16px_rgba(11,61,46,0.25)]"
        >
          Onyesha orodha
        </button>
      )}
    </div>
  );
}
