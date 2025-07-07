-- Create secure version management system with admin access control
CREATE TABLE IF NOT EXISTS public.codebase_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version_number TEXT NOT NULL UNIQUE,
  version_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  file_contents JSONB NOT NULL DEFAULT '{}',
  file_count INTEGER NOT NULL DEFAULT 0,
  total_size_bytes BIGINT NOT NULL DEFAULT 0,
  lines_of_code INTEGER NOT NULL DEFAULT 0,
  file_extensions JSONB NOT NULL DEFAULT '{}',
  is_stable BOOLEAN NOT NULL DEFAULT false,
  is_production_ready BOOLEAN NOT NULL DEFAULT false,
  commit_message TEXT,
  restoration_count INTEGER NOT NULL DEFAULT 0,
  last_restored_at TIMESTAMP WITH TIME ZONE,
  download_count INTEGER NOT NULL DEFAULT 0,
  access_level TEXT NOT NULL DEFAULT 'admin', -- admin, manager, user
  security_hash TEXT,
  pdf_documentation_url TEXT,
  pdf_generated_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for secure access
ALTER TABLE public.codebase_versions ENABLE ROW LEVEL SECURITY;

-- Create admin-only access policy
CREATE POLICY "Admin full access to versions" ON public.codebase_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::user_role 
      AND ur.is_active = true
    )
  );

-- Create version restoration logs table
CREATE TABLE IF NOT EXISTS public.version_restoration_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version_id UUID NOT NULL REFERENCES public.codebase_versions(id) ON DELETE CASCADE,
  restored_by UUID REFERENCES auth.users(id),
  restored_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  restoration_type TEXT NOT NULL DEFAULT 'full',
  files_restored INTEGER NOT NULL DEFAULT 0,
  restoration_duration_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'completed',
  error_message TEXT,
  rollback_available BOOLEAN NOT NULL DEFAULT true,
  backup_version_id UUID,
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS for restoration logs
ALTER TABLE public.version_restoration_logs ENABLE ROW LEVEL SECURITY;

-- Admin access policy for restoration logs
CREATE POLICY "Admins can view restoration logs" ON public.version_restoration_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::user_role 
      AND ur.is_active = true
    )
  );