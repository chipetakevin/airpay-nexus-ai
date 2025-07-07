-- Ensure user roles and permissions are properly set up for role-based access control

-- Create user_roles table if not exists (with proper structure)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  department text,
  is_active boolean DEFAULT true,
  expires_at timestamp with time zone,
  assigned_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  )
);

-- Function to automatically assign roles based on user type during registration
CREATE OR REPLACE FUNCTION public.assign_user_role_on_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role_type user_role;
  user_type_meta text;
BEGIN
  -- Get user type from metadata
  user_type_meta := NEW.raw_user_meta_data ->> 'userType';
  
  -- Determine role based on user type
  CASE user_type_meta
    WHEN 'admin' THEN user_role_type := 'admin';
    WHEN 'vendor' THEN user_role_type := 'support'; -- Vendors get support role (limited access)
    WHEN 'customer' THEN user_role_type := 'user'; -- Customers get user role (most limited)
    ELSE user_role_type := 'user'; -- Default to user role
  END CASE;
  
  -- Insert role assignment
  INSERT INTO public.user_roles (user_id, role, is_active)
  VALUES (NEW.id, user_role_type, true)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic role assignment
DROP TRIGGER IF EXISTS on_auth_user_role_assignment ON auth.users;
CREATE TRIGGER on_auth_user_role_assignment
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_user_role_on_registration();

-- Create comprehensive permissions for different roles
INSERT INTO public.permissions (role, resource_type, permission_type, resource_id) VALUES
-- Admin permissions (full access)
('admin', 'deals', 'read', NULL),
('admin', 'deals', 'write', NULL),
('admin', 'deals', 'delete', NULL),
('admin', 'onecard', 'read', NULL),
('admin', 'onecard', 'write', NULL),
('admin', 'transactions', 'read', NULL),
('admin', 'transactions', 'write', NULL),
('admin', 'users', 'read', NULL),
('admin', 'users', 'write', NULL),
('admin', 'reports', 'read', NULL),
('admin', 'settings', 'read', NULL),
('admin', 'settings', 'write', NULL),

-- Support permissions (vendor-level access)
('support', 'deals', 'read', NULL),
('support', 'deals', 'write', NULL),
('support', 'onecard', 'read', NULL),
('support', 'transactions', 'read', NULL),

-- User permissions (customer-level access)
('user', 'deals', 'read', NULL),
('user', 'onecard', 'read', NULL),
('user', 'transactions', 'read', NULL)
ON CONFLICT (role, resource_type, permission_type, resource_id) DO NOTHING;

-- Function to check if user has specific permission
CREATE OR REPLACE FUNCTION public.user_has_permission(
  resource_type_param resource_type,
  permission_type_param permission_type,
  resource_id_param text DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT public.has_permission(
    auth.uid(),
    resource_type_param,
    permission_type_param,
    resource_id_param
  );
$$;

-- Function to get current user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT ur.role
  FROM public.user_roles ur
  WHERE ur.user_id = auth.uid()
  AND ur.is_active = true
  ORDER BY 
    CASE ur.role 
      WHEN 'admin' THEN 1
      WHEN 'manager' THEN 2
      WHEN 'support' THEN 3
      WHEN 'user' THEN 4
      ELSE 5
    END
  LIMIT 1;
$$;