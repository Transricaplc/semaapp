ALTER TABLE public.officials
  ADD COLUMN IF NOT EXISTS region_code   TEXT,
  ADD COLUMN IF NOT EXISTS district_code TEXT,
  ADD COLUMN IF NOT EXISTS ward_code     TEXT,
  ADD COLUMN IF NOT EXISTS place_name    TEXT;

CREATE INDEX IF NOT EXISTS idx_officials_region_code   ON public.officials(region_code);
CREATE INDEX IF NOT EXISTS idx_officials_district_code ON public.officials(district_code);
CREATE INDEX IF NOT EXISTS idx_officials_ward_code     ON public.officials(ward_code);