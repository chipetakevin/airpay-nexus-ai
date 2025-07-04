-- Extend existing RBAC system for Addex Hub

-- Add missing enum values to existing user_role type
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'manager';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'contractor';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'support';

-- Create permission and resource type enums
CREATE TYPE public.permission_type AS ENUM ('view', 'edit', 'export', 'share', 'manage', 'audit');
CREATE TYPE public.resource_type AS ENUM ('reports', 'suspicious_activity', 'database_management', 'user_management', 'system_settings', 'compliance_data');

-- Create user roles table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL,
    department TEXT,
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint if table already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_roles_user_id_role_key'
    ) THEN
        ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE(user_id, role);
    END IF;
END $$;

-- Create permissions table
CREATE TABLE public.permissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    role user_role NOT NULL,
    resource_type resource_type NOT NULL,
    permission_type permission_type NOT NULL,
    resource_id TEXT, -- Optional: specific resource ID for granular permissions
    conditions JSONB, -- Additional conditions for the permission
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(role, resource_type, permission_type, resource_id)
);

-- Create audit log for permission activities
CREATE TABLE public.permission_audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- 'view', 'edit', 'export', 'share', 'access_denied'
    resource_type resource_type NOT NULL,
    resource_id TEXT,
    user_role user_role,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Everyone can view permissions for their role" ON public.permissions;
DROP POLICY IF EXISTS "Admins can manage permissions" ON public.permissions;
DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.permission_audit_logs;
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.permission_audit_logs;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.permission_audit_logs;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin' 
        AND ur.is_active = true
    )
);

-- RLS Policies for permissions
CREATE POLICY "Everyone can view permissions for their role" 
ON public.permissions 
FOR SELECT 
USING (
    role IN (
        SELECT ur.role FROM public.user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.is_active = true
    )
);

CREATE POLICY "Admins can manage permissions" 
ON public.permissions 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin' 
        AND ur.is_active = true
    )
);

-- RLS Policies for audit logs
CREATE POLICY "Users can view their own audit logs" 
ON public.permission_audit_logs 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all audit logs" 
ON public.permission_audit_logs 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin' 
        AND ur.is_active = true
    )
);

CREATE POLICY "System can insert audit logs" 
ON public.permission_audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION public.has_permission(
    _user_id UUID,
    _resource_type resource_type,
    _permission_type permission_type,
    _resource_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        INNER JOIN public.permissions p ON ur.role = p.role
        WHERE ur.user_id = _user_id
        AND ur.is_active = true
        AND (ur.expires_at IS NULL OR ur.expires_at > now())
        AND p.resource_type = _resource_type
        AND p.permission_type = _permission_type
        AND (_resource_id IS NULL OR p.resource_id IS NULL OR p.resource_id = _resource_id)
    );
$$;

-- Create function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS TABLE(role user_role, department TEXT, expires_at TIMESTAMP WITH TIME ZONE)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT ur.role, ur.department, ur.expires_at
    FROM public.user_roles ur
    WHERE ur.user_id = _user_id
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > now());
$$;

-- Create function to log permission activities
CREATE OR REPLACE FUNCTION public.log_permission_activity(
    _user_id UUID,
    _action TEXT,
    _resource_type resource_type,
    _resource_id TEXT DEFAULT NULL,
    _success BOOLEAN DEFAULT true,
    _error_message TEXT DEFAULT NULL,
    _metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
    _user_role user_role;
    _log_id UUID;
BEGIN
    -- Get user's primary role
    SELECT ur.role INTO _user_role
    FROM public.user_roles ur
    WHERE ur.user_id = _user_id
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > now())
    ORDER BY 
        CASE ur.role 
            WHEN 'admin' THEN 1
            WHEN 'manager' THEN 2
            WHEN 'support' THEN 3
            ELSE 4
        END
    LIMIT 1;

    -- Insert audit log
    INSERT INTO public.permission_audit_logs (
        user_id, action, resource_type, resource_id, user_role, 
        success, error_message, metadata
    ) VALUES (
        _user_id, _action, _resource_type, _resource_id, _user_role,
        _success, _error_message, _metadata
    ) RETURNING id INTO _log_id;

    RETURN _log_id;
END;
$$;