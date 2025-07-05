-- Create codebase version control system
CREATE TABLE public.codebase_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version_number TEXT NOT NULL,
  version_name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Codebase snapshot data
  file_contents JSONB NOT NULL DEFAULT '{}',
  file_count INTEGER NOT NULL DEFAULT 0,
  total_size_bytes BIGINT NOT NULL DEFAULT 0,
  
  -- Version metadata
  git_hash TEXT,
  branch_name TEXT DEFAULT 'main',
  commit_message TEXT,
  
  -- System metadata
  is_stable BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  restoration_count INTEGER NOT NULL DEFAULT 0,
  last_restored_at TIMESTAMP WITH TIME ZONE,
  
  -- Performance tracking
  capture_duration_ms INTEGER,
  compression_ratio NUMERIC(5,2),
  
  UNIQUE(version_number)
);

-- Enable RLS
ALTER TABLE public.codebase_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage all codebase versions" 
ON public.codebase_versions 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::user_role 
    AND is_active = true
  )
);

-- Create version restoration logs
CREATE TABLE public.version_restoration_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version_id UUID NOT NULL REFERENCES public.codebase_versions(id) ON DELETE CASCADE,
  restored_by UUID REFERENCES auth.users(id),
  restored_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Restoration details
  restoration_type TEXT NOT NULL DEFAULT 'full', -- 'full', 'partial', 'preview'
  files_restored INTEGER NOT NULL DEFAULT 0,
  restoration_duration_ms INTEGER,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'completed', -- 'pending', 'in_progress', 'completed', 'failed'
  error_message TEXT,
  rollback_available BOOLEAN NOT NULL DEFAULT true,
  
  -- Backup info before restoration
  backup_version_id UUID,
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS for restoration logs
ALTER TABLE public.version_restoration_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view restoration logs" 
ON public.version_restoration_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::user_role 
    AND is_active = true
  )
);

-- Create indexes for performance
CREATE INDEX idx_codebase_versions_created_at ON public.codebase_versions(created_at DESC);
CREATE INDEX idx_codebase_versions_version_number ON public.codebase_versions(version_number);
CREATE INDEX idx_codebase_versions_is_stable ON public.codebase_versions(is_stable) WHERE is_stable = true;
CREATE INDEX idx_restoration_logs_version_id ON public.version_restoration_logs(version_id);
CREATE INDEX idx_restoration_logs_restored_at ON public.version_restoration_logs(restored_at DESC);

-- Create function to capture codebase version
CREATE OR REPLACE FUNCTION public.capture_codebase_version(
  p_version_number TEXT,
  p_version_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_file_contents JSONB DEFAULT '{}',
  p_is_stable BOOLEAN DEFAULT false
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  version_id UUID;
  file_count INTEGER;
  total_size BIGINT;
BEGIN
  -- Calculate file statistics
  SELECT 
    jsonb_object_length(p_file_contents),
    COALESCE(SUM(length(value::text)), 0)
  INTO file_count, total_size
  FROM jsonb_each_text(p_file_contents);
  
  -- Insert new version
  INSERT INTO public.codebase_versions (
    version_number,
    version_name,
    description,
    created_by,
    file_contents,
    file_count,
    total_size_bytes,
    is_stable,
    commit_message
  ) VALUES (
    p_version_number,
    p_version_name,
    p_description,
    auth.uid(),
    p_file_contents,
    file_count,
    total_size,
    p_is_stable,
    COALESCE(p_description, 'Version ' || p_version_number || ' snapshot')
  ) RETURNING id INTO version_id;
  
  RETURN version_id;
END;
$$;

-- Create function to log version restoration
CREATE OR REPLACE FUNCTION public.log_version_restoration(
  p_version_id UUID,
  p_restoration_type TEXT DEFAULT 'full',
  p_files_restored INTEGER DEFAULT 0,
  p_status TEXT DEFAULT 'completed'
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.version_restoration_logs (
    version_id,
    restored_by,
    restoration_type,
    files_restored,
    status
  ) VALUES (
    p_version_id,
    auth.uid(),
    p_restoration_type,
    p_files_restored,
    p_status
  ) RETURNING id INTO log_id;
  
  -- Update restoration count
  UPDATE public.codebase_versions 
  SET 
    restoration_count = restoration_count + 1,
    last_restored_at = now()
  WHERE id = p_version_id;
  
  RETURN log_id;
END;
$$;

-- Create automated cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_old_versions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Keep only last 50 non-stable versions, all stable versions
  DELETE FROM public.codebase_versions 
  WHERE is_stable = false 
  AND id NOT IN (
    SELECT id FROM public.codebase_versions 
    WHERE is_stable = false 
    ORDER BY created_at DESC 
    LIMIT 50
  );
END;
$$;

-- Add trigger for updated_at
CREATE TRIGGER update_codebase_versions_updated_at
  BEFORE UPDATE ON public.codebase_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();