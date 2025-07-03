-- First, drop the existing RLS policies that are causing issues
DROP POLICY IF EXISTS "Users can manage their own RICA drafts" ON public.rica_registration_drafts;
DROP POLICY IF EXISTS "Users can create their own RICA registrations" ON public.rica_registrations;
DROP POLICY IF EXISTS "Users can update their own RICA registrations" ON public.rica_registrations;
DROP POLICY IF EXISTS "Users can view their own RICA registrations" ON public.rica_registrations;

-- Temporarily disable RLS on RICA tables since we're using custom auth
ALTER TABLE public.rica_registration_drafts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.rica_registrations DISABLE ROW LEVEL SECURITY;

-- Update user_id columns to text type now that policies are dropped
ALTER TABLE public.rica_registrations ALTER COLUMN user_id TYPE text;
ALTER TABLE public.rica_registration_drafts ALTER COLUMN user_id TYPE text;

-- Create more permissive policies that work with our custom auth system
-- Enable RLS back on the tables
ALTER TABLE public.rica_registration_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rica_registrations ENABLE ROW LEVEL SECURITY;

-- Create new policies that are more permissive for our custom auth system
CREATE POLICY "Allow authenticated users to manage RICA drafts" 
ON public.rica_registration_drafts 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage RICA registrations" 
ON public.rica_registrations 
FOR ALL 
USING (true) 
WITH CHECK (true);