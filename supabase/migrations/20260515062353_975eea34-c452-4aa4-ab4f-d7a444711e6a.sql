-- ── PHASE 2: Officials + Map intelligence ──

-- 1. Add lat/lng + name_sw to wilaya (mikoa already has them)
ALTER TABLE public.wilaya
  ADD COLUMN IF NOT EXISTS jina_sw TEXT;

ALTER TABLE public.kata
  ADD COLUMN IF NOT EXISTS jina_sw TEXT,
  ADD COLUMN IF NOT EXISTS post_code TEXT;

-- 2. map_category as text (open set; we validate in app code via locationHooks)
-- Officials table
CREATE TABLE IF NOT EXISTS public.officials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  role_title_sw TEXT,
  department TEXT,
  party TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  office_address TEXT,
  picha_url TEXT,
  -- location hooks
  mkoa_id INTEGER REFERENCES public.mikoa(id) ON DELETE SET NULL,
  wilaya_id INTEGER REFERENCES public.wilaya(id) ON DELETE SET NULL,
  kata_id INTEGER REFERENCES public.kata(id) ON DELETE SET NULL,
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  -- categorization
  map_category TEXT,
  mhimili TEXT,
  ngazi TEXT,
  -- transparency
  data_source TEXT DEFAULT 'manual',
  source_url TEXT,
  verified_by TEXT,
  verified_at TIMESTAMPTZ,
  accountability_score INTEGER DEFAULT 0,
  -- timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.officials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read officials"
  ON public.officials FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert officials"
  ON public.officials FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update officials"
  ON public.officials FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete officials"
  ON public.officials FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_officials_mkoa ON public.officials(mkoa_id);
CREATE INDEX IF NOT EXISTS idx_officials_wilaya ON public.officials(wilaya_id);
CREATE INDEX IF NOT EXISTS idx_officials_kata ON public.officials(kata_id);
CREATE INDEX IF NOT EXISTS idx_officials_category ON public.officials(map_category);
CREATE INDEX IF NOT EXISTS idx_officials_fts ON public.officials
  USING gin(to_tsvector('simple',
    coalesce(full_name,'') || ' ' || coalesce(role_title,'') ||
    ' ' || coalesce(role_title_sw,'') || ' ' || coalesce(department,'')
  ));

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_officials_updated_at ON public.officials;
CREATE TRIGGER trg_officials_updated_at
  BEFORE UPDATE ON public.officials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Saved contacts
CREATE TABLE IF NOT EXISTS public.saved_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  official_id UUID,
  external_official_id TEXT, -- for officials still in TS data
  official_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, official_id),
  UNIQUE (user_id, external_official_id)
);

ALTER TABLE public.saved_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own saved contacts"
  ON public.saved_contacts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users add own saved contacts"
  ON public.saved_contacts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own saved contacts"
  ON public.saved_contacts FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
