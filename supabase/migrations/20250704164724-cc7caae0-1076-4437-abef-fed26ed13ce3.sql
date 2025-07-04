-- Insert default permissions for each role
INSERT INTO public.permissions (role, resource_type, permission_type) VALUES
-- Admin permissions (full access)
('admin', 'reports', 'view'),
('admin', 'reports', 'edit'),
('admin', 'reports', 'export'),
('admin', 'reports', 'share'),
('admin', 'reports', 'manage'),
('admin', 'reports', 'audit'),
('admin', 'suspicious_activity', 'view'),
('admin', 'suspicious_activity', 'edit'),
('admin', 'suspicious_activity', 'manage'),
('admin', 'database_management', 'view'),
('admin', 'database_management', 'edit'),
('admin', 'database_management', 'manage'),
('admin', 'user_management', 'view'),
('admin', 'user_management', 'edit'),
('admin', 'user_management', 'manage'),
('admin', 'system_settings', 'view'),
('admin', 'system_settings', 'edit'),
('admin', 'compliance_data', 'view'),
('admin', 'compliance_data', 'edit'),
('admin', 'compliance_data', 'audit'),

-- Manager permissions
('manager', 'reports', 'view'),
('manager', 'reports', 'edit'),
('manager', 'reports', 'export'),
('manager', 'suspicious_activity', 'view'),
('manager', 'compliance_data', 'view'),

-- Support permissions
('support', 'reports', 'view'),
('support', 'suspicious_activity', 'view'),
('support', 'suspicious_activity', 'edit'),
('support', 'user_management', 'view'),

-- Contractor permissions (limited)
('contractor', 'reports', 'view'),

-- Vendor permissions (limited)
('vendor', 'reports', 'view'),

-- Customer permissions (very limited)
('customer', 'reports', 'view');

-- Create triggers for updated_at columns
CREATE OR REPLACE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_permissions_updated_at
    BEFORE UPDATE ON public.permissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();