-- Fix permission issues for version management and ensure all admin functions work properly

-- First, ensure the codebase_versions table has proper permissions for authenticated users
ALTER TABLE public.codebase_versions ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies for version management
CREATE POLICY "Admins can manage all versions" 
ON public.codebase_versions 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
  OR 
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Create version restoration logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.version_restoration_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id UUID NOT NULL REFERENCES public.codebase_versions(id) ON DELETE CASCADE,
  restored_by UUID REFERENCES auth.users(id),
  restoration_type TEXT DEFAULT 'full',
  files_restored INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS on restoration logs
ALTER TABLE public.version_restoration_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for restoration logs
CREATE POLICY "Admins can access restoration logs" 
ON public.version_restoration_logs 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
  OR 
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Ensure admin profiles can be read by admins
DROP POLICY IF EXISTS "Admins can view own profile" ON public.admin_profiles;
CREATE POLICY "Admins can view profiles" 
ON public.admin_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
  OR user_id = auth.uid()
);

-- Create a comprehensive admin access function that doesn't rely on auth.users table
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'
    AND ur.is_active = true
  ) OR EXISTS (
    SELECT 1 FROM public.admin_profiles ap
    WHERE ap.user_id = auth.uid()
  );
$$;