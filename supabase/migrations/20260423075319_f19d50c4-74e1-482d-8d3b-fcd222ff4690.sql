-- MIKOA (Regions)
CREATE TABLE IF NOT EXISTS public.mikoa (
  id SERIAL PRIMARY KEY,
  pcode TEXT UNIQUE NOT NULL,
  jina TEXT NOT NULL,
  jina_sw TEXT,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- WILAYA (Districts)
CREATE TABLE IF NOT EXISTS public.wilaya (
  id SERIAL PRIMARY KEY,
  pcode TEXT UNIQUE NOT NULL,
  jina TEXT NOT NULL,
  mkoa_id INTEGER REFERENCES public.mikoa(id) ON DELETE CASCADE,
  mkoa_pcode TEXT,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_wilaya_mkoa ON public.wilaya(mkoa_id);

-- KATA (Wards)
CREATE TABLE IF NOT EXISTS public.kata (
  id SERIAL PRIMARY KEY,
  pcode TEXT UNIQUE NOT NULL,
  jina TEXT NOT NULL,
  wilaya_id INTEGER REFERENCES public.wilaya(id) ON DELETE CASCADE,
  wilaya_pcode TEXT,
  mkoa_id INTEGER REFERENCES public.mikoa(id),
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_kata_wilaya ON public.kata(wilaya_id);
CREATE INDEX IF NOT EXISTS idx_kata_mkoa ON public.kata(mkoa_id);

-- VIJIJI (Villages, optional)
CREATE TABLE IF NOT EXISTS public.vijiji (
  id SERIAL PRIMARY KEY,
  jina TEXT NOT NULL,
  kata_id INTEGER REFERENCES public.kata(id) ON DELETE CASCADE,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_vijiji_kata ON public.vijiji(kata_id);

-- Profiles preferred location
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS mkoa_id INTEGER REFERENCES public.mikoa(id),
  ADD COLUMN IF NOT EXISTS wilaya_id INTEGER REFERENCES public.wilaya(id),
  ADD COLUMN IF NOT EXISTS kata_id INTEGER REFERENCES public.kata(id);

-- Reports location columns
ALTER TABLE public.reports
  ADD COLUMN IF NOT EXISTS mkoa_id INTEGER REFERENCES public.mikoa(id),
  ADD COLUMN IF NOT EXISTS wilaya_id INTEGER REFERENCES public.wilaya(id),
  ADD COLUMN IF NOT EXISTS kata_id INTEGER REFERENCES public.kata(id);

-- RLS: civic data, public read; anyone authenticated can seed (no admin gating per user choice)
ALTER TABLE public.mikoa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wilaya ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vijiji ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read mikoa" ON public.mikoa FOR SELECT USING (true);
CREATE POLICY "Public read wilaya" ON public.wilaya FOR SELECT USING (true);
CREATE POLICY "Public read kata" ON public.kata FOR SELECT USING (true);
CREATE POLICY "Public read vijiji" ON public.vijiji FOR SELECT USING (true);

CREATE POLICY "Anyone can insert mikoa" ON public.mikoa FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update mikoa" ON public.mikoa FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert wilaya" ON public.wilaya FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update wilaya" ON public.wilaya FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert kata" ON public.kata FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update kata" ON public.kata FOR UPDATE USING (true);

-- RPC for fuzzy hierarchy resolution
CREATE OR REPLACE FUNCTION public.get_hierarchy_by_name(
  search_region TEXT,
  search_district TEXT DEFAULT NULL
)
RETURNS TABLE(mkoa_id INT, wilaya_id INT, mkoa_jina TEXT, wilaya_jina TEXT)
LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT m.id, w.id, m.jina, w.jina
  FROM public.mikoa m
  LEFT JOIN public.wilaya w ON w.mkoa_id = m.id
    AND (search_district IS NULL OR w.jina ILIKE '%' || search_district || '%')
  WHERE m.jina ILIKE '%' || search_region || '%'
  LIMIT 1;
$$;

-- Seed 31 mikoa
INSERT INTO public.mikoa (pcode, jina, lat, lng) VALUES
('TZ01','Arusha',-3.3869,36.6830),
('TZ02','Dar es Salaam',-6.7924,39.2083),
('TZ03','Dodoma',-6.1630,35.7516),
('TZ04','Iringa',-7.7676,35.6943),
('TZ05','Kagera',-1.9988,31.3667),
('TZ06','Kaskazini Pemba',-5.0333,39.7833),
('TZ07','Kaskazini Unguja',-5.7667,39.3667),
('TZ08','Kigoma',-4.8770,29.6276),
('TZ09','Kilimanjaro',-3.3596,37.3413),
('TZ10','Kusini Pemba',-5.2500,39.8000),
('TZ11','Kusini Unguja',-6.2667,39.5167),
('TZ12','Lindi',-9.9975,39.7153),
('TZ13','Manyara',-4.3167,36.9500),
('TZ14','Mara',-1.7500,34.0000),
('TZ15','Mbeya',-8.9000,33.4600),
('TZ16','Mjini Magharibi',-6.1667,39.2000),
('TZ17','Morogoro',-6.8160,37.6500),
('TZ18','Mtwara',-10.2667,40.1833),
('TZ19','Mwanza',-2.5164,32.9175),
('TZ20','Pwani',-7.0000,38.8000),
('TZ21','Rukwa',-7.9333,31.4500),
('TZ22','Ruvuma',-10.6833,36.0000),
('TZ23','Shinyanga',-3.6635,33.4231),
('TZ24','Singida',-4.8167,34.7500),
('TZ25','Tabora',-5.0167,32.8000),
('TZ26','Tanga',-5.0667,39.1000),
('TZ27','Geita',-2.8667,32.2333),
('TZ28','Katavi',-6.5667,31.0667),
('TZ29','Njombe',-9.3333,34.7667),
('TZ30','Simiyu',-2.8500,34.0000),
('TZ31','Songwe',-8.7667,32.9000)
ON CONFLICT (pcode) DO NOTHING;