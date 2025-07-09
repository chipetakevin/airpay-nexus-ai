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

-- Fix ussd_user_preferences policy (create if doesn't exist)
DROP POLICY IF EXISTS "Admins can manage user preferences" ON public.ussd_user_preferences;
CREATE POLICY "Admins can manage user preferences" ON public.ussd_user_preferences
    FOR ALL 
    USING (public.is_admin_simple());

CREATE POLICY "Users can manage their own preferences" ON public.ussd_user_preferences
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

-- Create missing tables that might be needed for USSD functionality

-- USSD Menu Items table (if it doesn't exist or needs fixing)
CREATE TABLE IF NOT EXISTS public.ussd_menu_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id varchar NOT NULL,
    parent_id varchar,
    level integer NOT NULL DEFAULT 1,
    display_order integer NOT NULL DEFAULT 1,
    menu_text jsonb NOT NULL, -- Multi-language support
    action_type varchar DEFAULT 'menu',
    action_value text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on ussd_menu_items
ALTER TABLE public.ussd_menu_items ENABLE ROW LEVEL SECURITY;

-- Create policy for ussd_menu_items
CREATE POLICY "Everyone can view active menu items" ON public.ussd_menu_items
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Admins can manage menu items" ON public.ussd_menu_items
    FOR ALL 
    USING (public.is_admin_simple());

-- USSD User Preferences table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.ussd_user_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid,
    phone_number varchar NOT NULL,
    language_preference varchar DEFAULT 'en',
    menu_shortcuts jsonb DEFAULT '{}',
    notification_preferences jsonb DEFAULT '{}',
    last_interaction_at timestamptz DEFAULT now(),
    session_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on ussd_user_preferences
ALTER TABLE public.ussd_user_preferences ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger for ussd_menu_items
CREATE OR REPLACE FUNCTION public.update_ussd_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_ussd_menu_items_updated_at
    BEFORE UPDATE ON public.ussd_menu_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_ussd_updated_at();

CREATE TRIGGER update_ussd_user_preferences_updated_at
    BEFORE UPDATE ON public.ussd_user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_ussd_updated_at();

-- Insert some default USSD menu items for testing
INSERT INTO public.ussd_menu_items (menu_id, level, display_order, menu_text, action_type) VALUES
('main', 1, 1, '{"en": "Welcome to Divine Mobile\n1. Check Balance\n2. Buy Airtime\n3. Help\n0. Exit", "af": "Welkom by Divine Mobile\n1. Tjek Balans\n2. Koop Lugtyd\n3. Hulp\n0. Verlaat"}', 'menu'),
('balance', 2, 1, '{"en": "Your balance is R50.00\n1. Main Menu\n0. Exit", "af": "Jou balans is R50.00\n1. Hoofkieslys\n0. Verlaat"}', 'action'),
('airtime', 2, 2, '{"en": "Buy Airtime\n1. R10\n2. R20\n3. R50\n0. Main Menu", "af": "Koop Lugtyd\n1. R10\n2. R20\n3. R50\n0. Hoofkieslys"}', 'menu')
ON CONFLICT DO NOTHING;