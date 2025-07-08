-- Fix infinite recursion in user_roles policies
-- First, drop the problematic policies that cause recursion
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create simple, non-recursive policies
CREATE POLICY "Enable read access for authenticated users" 
ON public.user_roles FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" 
ON public.user_roles FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" 
ON public.user_roles FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS public.ussd_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ussd_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ussd_code_id UUID REFERENCES public.ussd_codes(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.ussd_menu_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  service_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID,
  whatsapp_number TEXT,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'suspended')),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  platform TEXT DEFAULT 'whatsapp',
  chatbot_state JSONB DEFAULT '{}',
  fallback_triggered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on USSD tables
ALTER TABLE public.ussd_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;

-- Create simple policies for USSD tables
CREATE POLICY "Enable read access for authenticated users" 
ON public.ussd_codes FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable all operations for authenticated users" 
ON public.ussd_codes FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable read access for authenticated users" 
ON public.ussd_menu_items FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable all operations for authenticated users" 
ON public.ussd_menu_items FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable read access for authenticated users" 
ON public.whatsapp_sessions FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable all operations for authenticated users" 
ON public.whatsapp_sessions FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Add some sample data
INSERT INTO public.ussd_codes (code, description, status) VALUES 
('*120#', 'Main USSD Menu', 'active'),
('*121#', 'Balance Check', 'active'),
('*122#', 'Airtime Purchase', 'active')
ON CONFLICT (code) DO NOTHING;