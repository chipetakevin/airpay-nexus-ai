-- USSD Management Database Schema
-- Create enums for better data integrity
CREATE TYPE ussd_status AS ENUM ('active', 'inactive');
CREATE TYPE platform_type AS ENUM ('gsm', 'whatsapp', 'website');
CREATE TYPE session_status AS ENUM ('active', 'ended', 'suspended');
CREATE TYPE fallback_type AS ENUM ('default', 'contextual', 'human_handover');

-- 1. USSD Codes Management Tables
CREATE TABLE ussd_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    status ussd_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Menu Items Table (supports multi-level hierarchical menus)
CREATE TABLE ussd_menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ussd_code_id UUID REFERENCES ussd_codes(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES ussd_menu_items(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    display_order INTEGER NOT NULL DEFAULT 0,
    service_id UUID,
    status ussd_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Platforms Table
CREATE TABLE platforms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    platform_type platform_type NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default platforms
INSERT INTO platforms (name, platform_type, description) VALUES
('GSM', 'gsm', 'Traditional GSM/USSD interface'),
('WhatsApp', 'whatsapp', 'WhatsApp Business API integration'),
('Website', 'website', 'Web portal interface');

-- 4. USSD Code Platform Assignments
CREATE TABLE ussd_code_platform_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ussd_code_id UUID REFERENCES ussd_codes(id) ON DELETE CASCADE,
    platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
    status ussd_status DEFAULT 'active',
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(ussd_code_id, platform_id)
);

-- 5. Unified Customer Profiles (enhanced from existing comprehensive_user_profiles)
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS registered_platforms TEXT[] DEFAULT '{}';
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS platform_ids JSONB DEFAULT '{}';
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS last_active_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS session_count INTEGER DEFAULT 0;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS engagement_score DECIMAL(5,2) DEFAULT 0.00;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS service_enrollments TEXT[] DEFAULT '{}';
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS customer_segment VARCHAR(50) DEFAULT 'standard';
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS lifetime_value DECIMAL(15,2) DEFAULT 0.00;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS opt_in_status BOOLEAN DEFAULT false;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS data_privacy_consent BOOLEAN DEFAULT false;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS account_manager VARCHAR(100);
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE comprehensive_user_profiles ADD COLUMN IF NOT EXISTS additional_identifiers JSONB DEFAULT '{}';

-- 6. WhatsApp API Configuration
CREATE TABLE whatsapp_api_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_phone_number VARCHAR(20) NOT NULL,
    webhook_url TEXT NOT NULL,
    api_key_reference TEXT, -- Reference to secure vault, not actual key
    status ussd_status DEFAULT 'active',
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. WhatsApp Session Tracking
CREATE TABLE whatsapp_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES comprehensive_user_profiles(id),
    whatsapp_number VARCHAR(20) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
    end_time TIMESTAMP WITH TIME ZONE,
    status session_status DEFAULT 'active',
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
    platform VARCHAR(20) DEFAULT 'whatsapp',
    chatbot_state JSONB DEFAULT '{}',
    fallback_triggered BOOLEAN DEFAULT false,
    fallback_type fallback_type,
    fallback_time TIMESTAMP WITH TIME ZONE,
    agent_id UUID,
    transcript_ref TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8. Website Portal Configurations
CREATE TABLE website_portals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ussd_status DEFAULT 'active',
    analytics_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. Portal API Endpoints
CREATE TABLE portal_api_endpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portal_id UUID REFERENCES website_portals(id) ON DELETE CASCADE,
    api_url TEXT NOT NULL,
    method VARCHAR(10) NOT NULL DEFAULT 'GET',
    auth_type VARCHAR(50) DEFAULT 'bearer',
    status ussd_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. API Metrics Tracking
CREATE TABLE api_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint_id UUID REFERENCES portal_api_endpoints(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    request_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    average_latency_ms INTEGER DEFAULT 0,
    max_latency_ms INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 100.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 11. Cross-Platform Session Management
CREATE TABLE cross_platform_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shared_session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES comprehensive_user_profiles(id),
    platform VARCHAR(20) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
    end_time TIMESTAMP WITH TIME ZONE,
    status session_status DEFAULT 'active',
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
    session_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 12. Admin Activity Audit
CREATE TABLE ussd_admin_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES comprehensive_user_profiles(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_ussd_menu_items_parent ON ussd_menu_items(parent_id);
CREATE INDEX idx_ussd_menu_items_code ON ussd_menu_items(ussd_code_id);
CREATE INDEX idx_whatsapp_sessions_user ON whatsapp_sessions(user_id);
CREATE INDEX idx_whatsapp_sessions_status ON whatsapp_sessions(status);
CREATE INDEX idx_api_metrics_endpoint ON api_metrics(endpoint_id);
CREATE INDEX idx_cross_platform_sessions_user ON cross_platform_sessions(user_id);
CREATE INDEX idx_ussd_admin_audit_admin ON ussd_admin_audit(admin_id);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ussd_codes_updated_at BEFORE UPDATE ON ussd_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ussd_menu_items_updated_at BEFORE UPDATE ON ussd_menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whatsapp_api_configs_updated_at BEFORE UPDATE ON whatsapp_api_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_portals_updated_at BEFORE UPDATE ON website_portals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portal_api_endpoints_updated_at BEFORE UPDATE ON portal_api_endpoints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for security
ALTER TABLE ussd_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ussd_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ussd_code_platform_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_api_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_api_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_platform_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ussd_admin_audit ENABLE ROW LEVEL SECURITY;

-- Admin access policies
CREATE POLICY "Admins can manage USSD codes" ON ussd_codes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage menu items" ON ussd_menu_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage platform assignments" ON ussd_code_platform_assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage WhatsApp configs" ON whatsapp_api_configs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can view WhatsApp sessions" ON whatsapp_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage website portals" ON website_portals
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage API endpoints" ON portal_api_endpoints
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can view API metrics" ON api_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can view cross-platform sessions" ON cross_platform_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can view audit logs" ON ussd_admin_audit
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin' 
            AND is_active = true
        )
    );