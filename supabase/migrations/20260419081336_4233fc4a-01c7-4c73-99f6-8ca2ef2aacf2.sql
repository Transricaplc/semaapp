CREATE TABLE public.data_corrections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  official_id TEXT NOT NULL,
  official_name TEXT NOT NULL,
  field_incorrect TEXT NOT NULL,
  suggested_value TEXT NOT NULL,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.data_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit corrections"
ON public.data_corrections
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view corrections"
ON public.data_corrections
FOR SELECT
TO authenticated
USING (true);