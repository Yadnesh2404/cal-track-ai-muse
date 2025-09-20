-- Enable RLS on all tables
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations for now (since there's no authentication yet)
-- Workouts policies
CREATE POLICY "Allow all operations on workouts" ON public.workouts
FOR ALL USING (true) WITH CHECK (true);

-- Diet policies  
CREATE POLICY "Allow all operations on diet" ON public.diet
FOR ALL USING (true) WITH CHECK (true);

-- Weight policies
CREATE POLICY "Allow all operations on weight" ON public.weight
FOR ALL USING (true) WITH CHECK (true);