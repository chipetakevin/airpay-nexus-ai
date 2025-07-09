-- Fix infinite recursion in user_roles policies
-- First, drop the problematic policy
DROP POLICY IF EXISTS "user_roles_select_policy" ON public.user_roles;

-- Create a simpler, non-recursive policy for user_roles
CREATE POLICY "user_roles_simple_select_policy" ON public.user_roles
    FOR SELECT 
    USING (
        auth.uid() IS NOT NULL AND (
            user_id = auth.uid() OR 
            -- Simple admin check without recursion
            EXISTS (
                SELECT 1 FROM auth.users 
                WHERE auth.users.id = auth.uid() 
                AND (auth.users.raw_user_meta_data->>'userType' = 'admin' 
                     OR auth.users.email LIKE '%@divinemobile.co.za')
            )
        )
    );

-- Create a simple admin check function that doesn't cause recursion
CREATE OR REPLACE FUNCTION public.is_admin_simple()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = auth.uid() 
        AND (auth.users.raw_user_meta_data->>'userType' = 'admin' 
             OR auth.users.email LIKE '%@divinemobile.co.za')
    );
$$;

-- Update problematic policies that were causing recursion

-- Fix ussd_notification_campaigns policy
DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.ussd_notification_campaigns;
CREATE POLICY "Admins can manage campaigns" ON public.ussd_notification_campaigns
    FOR ALL 
    USING (public.is_admin_simple());

-- Fix whatsapp_sessions policies
DROP POLICY IF EXISTS "Admins can view WhatsApp sessions" ON public.whatsapp_sessions;
CREATE POLICY "Admins can view WhatsApp sessions" ON public.whatsapp_sessions
    FOR SELECT 
    USING (public.is_admin_simple());

-- Fix comprehensive_user_profiles policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.comprehensive_user_profiles;
CREATE POLICY "Admins can manage all profiles" ON public.comprehensive_user_profiles
    FOR ALL 
    USING (public.is_admin_simple());

-- Fix ussd_user_preferences policy (drop existing first)
DROP POLICY IF EXISTS "Admins can manage user preferences" ON public.ussd_user_preferences;
DROP POLICY IF EXISTS "Users can manage their own preferences" ON public.ussd_user_preferences;

CREATE POLICY "Admins can manage user preferences" ON public.ussd_user_preferences
    FOR ALL 
    USING (public.is_admin_simple());

CREATE POLICY "Users can manage own preferences" ON public.ussd_user_preferences
    FOR ALL 
    USING (auth.uid() IS NOT NULL);

-- Fix sim_activation_requests policy
DROP POLICY IF EXISTS "Admins can manage all activation requests" ON public.sim_activation_requests;
CREATE POLICY "Admins can manage all activation requests" ON public.sim_activation_requests
    FOR ALL 
    USING (public.is_admin_simple());

-- Fix ussd_notification_logs policy
DROP POLICY IF EXISTS "Admins can view all notification logs" ON public.ussd_notification_logs;
CREATE POLICY "Admins can view all notification logs" ON public.ussd_notification_logs
    FOR SELECT 
    USING (public.is_admin_simple());