-- RICA & MVNE/MVNO Compliance Database Schema
-- South African Telecom Regulatory Compliance

-- Enhanced RICA Registration with Full Compliance
CREATE TABLE public.rica_compliance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Individual Identity Verification (RICA Required)
  id_number TEXT NOT NULL,
  id_type TEXT NOT NULL DEFAULT 'SA_ID',
  id_document_front_url TEXT,
  id_document_back_url TEXT,
  
  -- Address Verification (RICA Required)
  physical_address TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT,
  proof_of_address_url TEXT NOT NULL,
  proof_of_address_type TEXT, -- utility bill, bank statement, etc
  proof_of_address_date DATE,
  
  -- Contact Information (RICA Required)
  mobile_number TEXT NOT NULL,
  email TEXT,
  alternative_contact TEXT,
  
  -- SIM Registration (RICA Required)
  sim_iccid TEXT NOT NULL,
  sim_serial_number TEXT,
  msisdn TEXT, -- Mobile Station International Subscriber Directory Number
  
  -- Business Information (For Corporate Clients)
  is_business BOOLEAN DEFAULT false,
  company_name TEXT,
  company_registration_number TEXT,
  company_document_url TEXT,
  tax_number TEXT,
  vat_number TEXT,
  company_letterhead_url TEXT,
  
  -- Verification Status
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_progress', 'verified', 'rejected', 'expired')),
  verification_method TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Compliance Flags
  rica_compliant BOOLEAN DEFAULT false,
  kyc_compliant BOOLEAN DEFAULT false,
  popia_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Geographic Controls
  registration_location JSONB, -- GPS coordinates, IP address
  geographic_boundary_check BOOLEAN DEFAULT false,
  
  -- Document Retention
  document_retention_period INTERVAL DEFAULT '10 years',
  retention_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Audit Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  last_modified_by UUID REFERENCES auth.users(id),
  
  -- Additional Metadata
  compliance_notes TEXT,
  rejection_reason TEXT,
  additional_documents JSONB DEFAULT '[]'::jsonb
);

-- SIM Lifecycle Management (MVNE/MVNO Requirement)
CREATE TABLE public.sim_lifecycle_management (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- SIM Details
  sim_iccid TEXT NOT NULL UNIQUE,
  sim_serial_number TEXT,
  msisdn TEXT,
  imsi TEXT, -- International Mobile Subscriber Identity
  
  -- User Association
  rica_record_id UUID REFERENCES public.rica_compliance_records(id),
  current_user_id UUID REFERENCES auth.users(id),
  
  -- Lifecycle Status
  status TEXT DEFAULT 'inventory' CHECK (status IN ('inventory', 'allocated', 'activated', 'suspended', 'terminated', 'lost_stolen', 'recycling')),
  activation_date TIMESTAMP WITH TIME ZONE,
  suspension_date TIMESTAMP WITH TIME ZONE,
  termination_date TIMESTAMP WITH TIME ZONE,
  
  -- Network Information
  network_provider TEXT NOT NULL,
  network_type TEXT, -- 2G, 3G, 4G, 5G
  home_network_code TEXT,
  
  -- Security Features
  pin_code TEXT,
  puk_code TEXT,
  ki_key TEXT, -- Authentication key (encrypted)
  
  -- Geographic Controls
  allowed_countries TEXT[] DEFAULT ARRAY['ZA'], -- South Africa only
  roaming_enabled BOOLEAN DEFAULT false,
  last_location JSONB,
  
  -- DID Recycling (6-month cool down period)
  recycling_eligible_date TIMESTAMP WITH TIME ZONE,
  previous_assignments JSONB DEFAULT '[]'::jsonb,
  
  -- Audit Trail
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status_history JSONB DEFAULT '[]'::jsonb,
  
  -- Compliance
  lawful_interception_enabled BOOLEAN DEFAULT true,
  emergency_services_enabled BOOLEAN DEFAULT true
);

-- Enhanced User Roles and Permissions for MVNE/MVNO
CREATE TYPE public.telecom_role AS ENUM (
  'super_admin',
  'compliance_officer', 
  'network_admin',
  'customer_service',
  'vendor_manager',
  'audit_reviewer',
  'technical_support',
  'billing_admin',
  'security_admin'
);

CREATE TABLE public.telecom_user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.telecom_role NOT NULL,
  
  -- Role Scope
  department TEXT,
  location TEXT,
  access_level INTEGER DEFAULT 1, -- 1-5 security clearance
  
  -- Permissions
  can_access_rica_data BOOLEAN DEFAULT false,
  can_modify_sim_status BOOLEAN DEFAULT false,
  can_export_data BOOLEAN DEFAULT false,
  can_view_audit_logs BOOLEAN DEFAULT false,
  can_approve_registrations BOOLEAN DEFAULT false,
  
  -- Temporal Control
  is_active BOOLEAN DEFAULT true,
  effective_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  last_login TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, role)
);

-- Comprehensive Audit Log for Regulatory Compliance
CREATE TABLE public.telecom_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Event Details
  event_type TEXT NOT NULL, -- rica_registration, sim_activation, data_export, etc.
  event_category TEXT NOT NULL, -- compliance, security, operational
  event_description TEXT NOT NULL,
  event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- User Information
  user_id UUID REFERENCES auth.users(id),
  user_role TEXT,
  user_ip INET,
  user_agent TEXT,
  session_id TEXT,
  
  -- Affected Resources  
  affected_table TEXT,
  affected_record_id UUID,
  customer_id UUID,
  sim_iccid TEXT,
  
  -- Before/After Data (for changes)
  old_values JSONB,
  new_values JSONB,
  
  -- Compliance Context
  compliance_requirement TEXT, -- RICA, POPIA, etc.
  legal_basis TEXT,
  retention_period INTERVAL DEFAULT '7 years',
  
  -- Risk Assessment
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  security_impact BOOLEAN DEFAULT false,
  
  -- Geographic Context
  location_data JSONB,
  geographic_compliance BOOLEAN DEFAULT true,
  
  -- Additional Context
  metadata JSONB DEFAULT '{}'::jsonb,
  related_audit_ids UUID[]
);

-- Data Retention and Compliance Monitoring
CREATE TABLE public.compliance_monitoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Monitoring Target
  entity_type TEXT NOT NULL, -- customer, sim, document, etc.
  entity_id UUID NOT NULL,
  
  -- Compliance Status
  compliance_type TEXT NOT NULL, -- RICA, POPIA, MVNE_OPERATIONAL
  status TEXT DEFAULT 'compliant' CHECK (status IN ('compliant', 'non_compliant', 'under_review', 'grace_period')),
  compliance_score NUMERIC(5,2) DEFAULT 100.00,
  
  -- Check Details
  last_checked TIMESTAMP WITH TIME ZONE DEFAULT now(),
  next_check_due TIMESTAMP WITH TIME ZONE,
  check_frequency INTERVAL DEFAULT '30 days',
  
  -- Issues and Remediation
  issues JSONB DEFAULT '[]'::jsonb,
  remediation_steps JSONB DEFAULT '[]'::jsonb,
  remediation_deadline TIMESTAMP WITH TIME ZONE,
  auto_resolved BOOLEAN DEFAULT false,
  
  -- Escalation
  escalation_level INTEGER DEFAULT 0,
  escalated_to UUID REFERENCES auth.users(id),
  escalation_date TIMESTAMP WITH TIME ZONE,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  monitored_by UUID REFERENCES auth.users(id)
);

-- Document Management for RICA Compliance
CREATE TABLE public.compliance_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Document Details
  document_type TEXT NOT NULL, -- id_front, id_back, proof_of_address, company_reg, etc.
  document_category TEXT NOT NULL, -- identity, address, business, compliance
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  
  -- Associated Records
  rica_record_id UUID REFERENCES public.rica_compliance_records(id),
  user_id UUID REFERENCES auth.users(id),
  
  -- Verification Status
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  verification_notes TEXT,
  
  -- AI/ML Processing
  ai_processed BOOLEAN DEFAULT false,
  ai_confidence_score NUMERIC(5,2),
  ai_extracted_data JSONB,
  manual_review_required BOOLEAN DEFAULT false,
  
  -- Security
  encrypted BOOLEAN DEFAULT true,
  encryption_key_id TEXT,
  access_restricted BOOLEAN DEFAULT true,
  
  -- Retention
  retention_period INTERVAL DEFAULT '10 years',
  deletion_scheduled_date TIMESTAMP WITH TIME ZONE,
  legal_hold BOOLEAN DEFAULT false,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id),
  access_log JSONB DEFAULT '[]'::jsonb
);

-- Network Provider Management for MVNE/MVNO
CREATE TABLE public.network_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Provider Details
  provider_name TEXT NOT NULL UNIQUE,
  provider_code TEXT NOT NULL UNIQUE,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('MNO', 'MVNE', 'MVNO')),
  
  -- South African Compliance
  icasa_licensed BOOLEAN DEFAULT false,
  icasa_license_number TEXT,
  license_expiry_date DATE,
  
  -- Technical Details
  network_codes TEXT[], -- MNC codes
  supported_technologies TEXT[], -- 2G, 3G, 4G, 5G
  coverage_areas TEXT[], -- provinces/regions
  
  -- Business Details
  billing_integration BOOLEAN DEFAULT false,
  api_endpoint TEXT,
  api_credentials_encrypted TEXT,
  
  -- Compliance
  rica_compliant BOOLEAN DEFAULT true,
  popia_compliant BOOLEAN DEFAULT true,
  security_certified BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_divine_mobile_compatible BOOLEAN DEFAULT true,
  default_provider BOOLEAN DEFAULT false,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert Divine Mobile as default provider
INSERT INTO public.network_providers (
  provider_name, 
  provider_code, 
  provider_type,
  icasa_licensed,
  rica_compliant,
  popia_compliant,
  is_active,
  is_divine_mobile_compatible,
  default_provider,
  supported_technologies,
  coverage_areas
) VALUES (
  'Divine Mobile',
  'DM',
  'MVNO',
  true,
  true,
  true,
  true,
  true,
  true,
  ARRAY['2G', '3G', '4G', '5G'],
  ARRAY['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Free State']
);

-- Add other South African providers
INSERT INTO public.network_providers (provider_name, provider_code, provider_type, icasa_licensed, rica_compliant, is_active, supported_technologies, coverage_areas) VALUES
('MTN', 'MTN', 'MNO', true, true, true, ARRAY['2G', '3G', '4G', '5G'], ARRAY['National']),
('Vodacom', 'VDC', 'MNO', true, true, true, ARRAY['2G', '3G', '4G', '5G'], ARRAY['National']),
('Cell C', 'CLC', 'MNO', true, true, true, ARRAY['2G', '3G', '4G'], ARRAY['National']),
('Telkom Mobile', 'TKM', 'MNO', true, true, true, ARRAY['3G', '4G', '5G'], ARRAY['National']),
('Rain', 'RAIN', 'MNO', true, true, true, ARRAY['4G', '5G'], ARRAY['Urban Areas']),
('FNB Connect', 'FNB', 'MVNO', true, true, true, ARRAY['2G', '3G', '4G'], ARRAY['National']),
('MakroCall', 'MKR', 'MVNO', true, true, true, ARRAY['2G', '3G'], ARRAY['Regional']);

-- Create indexes for performance
CREATE INDEX idx_rica_compliance_user_id ON public.rica_compliance_records(user_id);
CREATE INDEX idx_rica_compliance_status ON public.rica_compliance_records(verification_status);
CREATE INDEX idx_rica_compliance_mobile ON public.rica_compliance_records(mobile_number);
CREATE INDEX idx_sim_lifecycle_iccid ON public.sim_lifecycle_management(sim_iccid);
CREATE INDEX idx_sim_lifecycle_msisdn ON public.sim_lifecycle_management(msisdn);
CREATE INDEX idx_sim_lifecycle_status ON public.sim_lifecycle_management(status);
CREATE INDEX idx_telecom_audit_event_type ON public.telecom_audit_logs(event_type);
CREATE INDEX idx_telecom_audit_timestamp ON public.telecom_audit_logs(event_timestamp);
CREATE INDEX idx_telecom_audit_user ON public.telecom_audit_logs(user_id);
CREATE INDEX idx_compliance_monitoring_entity ON public.compliance_monitoring(entity_type, entity_id);
CREATE INDEX idx_compliance_monitoring_status ON public.compliance_monitoring(status);
CREATE INDEX idx_compliance_documents_rica ON public.compliance_documents(rica_record_id);
CREATE INDEX idx_network_providers_active ON public.network_providers(is_active);
CREATE INDEX idx_network_providers_default ON public.network_providers(default_provider);

-- Enable Row Level Security
ALTER TABLE public.rica_compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sim_lifecycle_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telecom_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telecom_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_providers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for RICA Compliance Records
CREATE POLICY "Users can manage their own RICA records" ON public.rica_compliance_records
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Compliance officers can view all RICA records" ON public.rica_compliance_records
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'compliance_officer', 'audit_reviewer')
    AND is_active = true
    AND can_access_rica_data = true
  )
);

-- RLS Policies for SIM Lifecycle Management
CREATE POLICY "Admins can manage SIM lifecycle" ON public.sim_lifecycle_management
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'network_admin', 'technical_support')
    AND is_active = true
    AND can_modify_sim_status = true
  )
);

-- RLS Policies for Telecom User Roles
CREATE POLICY "Super admins can manage all roles" ON public.telecom_user_roles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
    AND is_active = true
  )
);

CREATE POLICY "Users can view their own roles" ON public.telecom_user_roles
FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for Audit Logs
CREATE POLICY "Authorized users can view audit logs" ON public.telecom_audit_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'audit_reviewer', 'security_admin')
    AND is_active = true
    AND can_view_audit_logs = true
  )
);

CREATE POLICY "System can insert audit logs" ON public.telecom_audit_logs
FOR INSERT WITH CHECK (true);

-- RLS Policies for Compliance Monitoring
CREATE POLICY "Compliance team can access monitoring" ON public.compliance_monitoring
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'compliance_officer', 'audit_reviewer')
    AND is_active = true
  )
);

-- RLS Policies for Compliance Documents
CREATE POLICY "Authorized users can access compliance documents" ON public.compliance_documents
FOR ALL USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'compliance_officer')
    AND is_active = true
    AND can_access_rica_data = true
  )
);

-- RLS Policies for Network Providers
CREATE POLICY "Everyone can view active network providers" ON public.network_providers
FOR SELECT USING (is_active = true);

CREATE POLICY "Network admins can manage providers" ON public.network_providers
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.telecom_user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'network_admin')
    AND is_active = true
  )
);

-- Create functions for automated compliance checking
CREATE OR REPLACE FUNCTION public.check_rica_compliance(record_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  record_data public.rica_compliance_records%ROWTYPE;
  is_compliant BOOLEAN := false;
BEGIN
  SELECT * INTO record_data FROM public.rica_compliance_records WHERE id = record_id;
  
  IF record_data.id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check all required fields are present
  IF record_data.id_number IS NOT NULL AND
     record_data.physical_address IS NOT NULL AND
     record_data.mobile_number IS NOT NULL AND
     record_data.sim_iccid IS NOT NULL AND
     record_data.proof_of_address_url IS NOT NULL AND
     record_data.verification_status = 'verified' AND
     record_data.popia_consent = true THEN
    is_compliant := true;
  END IF;
  
  -- Update compliance status
  UPDATE public.rica_compliance_records 
  SET rica_compliant = is_compliant, updated_at = now()
  WHERE id = record_id;
  
  RETURN is_compliant;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function for audit logging
CREATE OR REPLACE FUNCTION public.log_telecom_audit(
  p_event_type TEXT,
  p_event_category TEXT,
  p_event_description TEXT,
  p_affected_table TEXT DEFAULT NULL,
  p_affected_record_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL,
  p_risk_level TEXT DEFAULT 'low'
)
RETURNS UUID AS $$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.telecom_audit_logs (
    event_type,
    event_category, 
    event_description,
    user_id,
    affected_table,
    affected_record_id,
    old_values,
    new_values,
    risk_level
  ) VALUES (
    p_event_type,
    p_event_category,
    p_event_description,
    auth.uid(),
    p_affected_table,
    p_affected_record_id,
    p_old_values,
    p_new_values,
    p_risk_level
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for automatic audit logging
CREATE OR REPLACE FUNCTION public.audit_rica_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.log_telecom_audit(
    'rica_record_modified',
    'compliance',
    'RICA compliance record was ' || TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    'medium'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_rica_compliance_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.rica_compliance_records
  FOR EACH ROW EXECUTE FUNCTION public.audit_rica_changes();

-- Create trigger for SIM lifecycle audit
CREATE OR REPLACE FUNCTION public.audit_sim_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.log_telecom_audit(
    'sim_lifecycle_modified',
    'operational',
    'SIM lifecycle record was ' || TG_OP || ' - Status: ' || COALESCE(NEW.status, OLD.status),
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    'high'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_sim_lifecycle_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.sim_lifecycle_management
  FOR EACH ROW EXECUTE FUNCTION public.audit_sim_changes();