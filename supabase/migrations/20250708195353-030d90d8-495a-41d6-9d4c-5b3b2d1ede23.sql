-- Fix infinite recursion in user_roles RLS policies
-- First, drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_roles;

-- Create simple, non-recursive policies for user_roles
CREATE POLICY "Enable read access for authenticated users" ON public.user_roles
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Enable insert for authenticated users" ON public.user_roles
FOR INSERT WITH CHECK (user_id = auth.uid());

-- Fix other tables that might have circular dependencies
-- Drop and recreate policies for tables that use user role functions

-- Fix ussd_codes policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ussd_codes;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.ussd_codes;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.ussd_codes;

CREATE POLICY "Enable read access for all users" ON public.ussd_codes
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.ussd_codes
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.ussd_codes
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Fix ussd_menu_items policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ussd_menu_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.ussd_menu_items;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.ussd_menu_items;

CREATE POLICY "Enable read access for all users" ON public.ussd_menu_items
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.ussd_menu_items
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.ussd_menu_items
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Fix whatsapp_sessions policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.whatsapp_sessions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.whatsapp_sessions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.whatsapp_sessions;

CREATE POLICY "Enable read access for authenticated users" ON public.whatsapp_sessions
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON public.whatsapp_sessions
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.whatsapp_sessions
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Fix comprehensive_user_profiles policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.comprehensive_user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.comprehensive_user_profiles;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.comprehensive_user_profiles;

CREATE POLICY "Enable read access for authenticated users" ON public.comprehensive_user_profiles
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON public.comprehensive_user_profiles
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.comprehensive_user_profiles
FOR UPDATE USING (auth.uid() IS NOT NULL);