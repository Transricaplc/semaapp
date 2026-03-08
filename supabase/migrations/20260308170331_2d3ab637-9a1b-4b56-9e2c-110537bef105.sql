-- Fix the permissive INSERT policy on reports to require authenticated or anonymous users
DROP POLICY "Anyone can insert reports" ON public.reports;
CREATE POLICY "Authenticated and anonymous users can insert reports" ON public.reports FOR INSERT TO authenticated, anon WITH CHECK (true);

-- Restrict petition views and signature views to authenticated role only
DROP POLICY "Anyone can view petitions" ON public.petitions;
CREATE POLICY "Authenticated users can view petitions" ON public.petitions FOR SELECT TO authenticated USING (true);

DROP POLICY "Anyone can view signatures" ON public.petition_signatures;  
CREATE POLICY "Authenticated users can view signatures" ON public.petition_signatures FOR SELECT TO authenticated USING (true);

-- Allow anon users to also view petitions (public feature)
CREATE POLICY "Anon users can view petitions" ON public.petitions FOR SELECT TO anon USING (true);

-- Fix reports SELECT to be role-specific
DROP POLICY "Users can view their own reports" ON public.reports;
CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Fix reports UPDATE
DROP POLICY "Users can update their own reports" ON public.reports;
CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Fix profiles policies to be role-specific
DROP POLICY "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);