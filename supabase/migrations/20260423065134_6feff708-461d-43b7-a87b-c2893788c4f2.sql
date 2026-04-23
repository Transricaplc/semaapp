CREATE TABLE public.followed_officials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  official_id TEXT NOT NULL,
  official_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, official_id)
);

ALTER TABLE public.followed_officials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their follows"
ON public.followed_officials
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can add follows"
ON public.followed_officials
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their follows"
ON public.followed_officials
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_followed_officials_user ON public.followed_officials(user_id);