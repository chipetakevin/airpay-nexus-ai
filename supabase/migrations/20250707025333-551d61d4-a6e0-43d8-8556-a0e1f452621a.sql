-- Set up role-based access control system for customers, vendors, and admins

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

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'
    AND ur.is_active = true
  );
$$;

-- Function to check if current user is vendor (support role)
CREATE OR REPLACE FUNCTION public.is_vendor()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'support'
    AND ur.is_active = true
  );
$$;

-- Function to check if current user is customer (user role)
CREATE OR REPLACE FUNCTION public.is_customer()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'user'
    AND ur.is_active = true
  );
$$;