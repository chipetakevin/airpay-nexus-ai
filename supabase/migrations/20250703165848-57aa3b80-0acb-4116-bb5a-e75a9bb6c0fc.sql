-- Create comprehensive MVNE/MVNO admin database with RICA compliance

-- User roles enum
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'vendor');
CREATE TYPE public.rica_status AS ENUM ('pending', 'verified', 'rejected', 'expired');
CREATE TYPE public.sim_status AS ENUM ('inactive', 'active', 'suspended', 'deactivated');
CREATE TYPE public.kyc_status AS ENUM ('pending', 'verified', 'rejected', 'requires_update');

-- Enhanced customers table for RICA compliance
CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  id_number TEXT NOT NULL UNIQUE,
  id_type TEXT DEFAULT 'SA_ID',
  date_of_birth DATE,
  gender TEXT,
  nationality TEXT DEFAULT 'South African',
  physical_address TEXT NOT NULL,
  postal_address TEXT,
  province TEXT,
  rica_status rica_status DEFAULT 'pending',
  rica_verified_at TIMESTAMP WITH TIME ZONE,
  rica_reference_number TEXT,
  kyc_status kyc_status DEFAULT 'pending',
  kyc_verified_at TIMESTAMP WITH TIME ZONE,
  id_document_url TEXT,
  proof_of_address_url TEXT,
  selfie_url TEXT,
  onecard_balance NUMERIC DEFAULT 0.00,
  total_cashback NUMERIC DEFAULT 0.00,
  network_provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced vendors table
CREATE TABLE public.vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  registration_number TEXT,
  contact_person_name TEXT NOT NULL,
  contact_person_email TEXT NOT NULL,
  contact_person_phone TEXT NOT NULL,
  business_address TEXT NOT NULL,
  business_type TEXT,
  tax_number TEXT,
  bank_account_holder TEXT,
  bank_name TEXT,
  account_number TEXT,
  branch_code TEXT,
  commission_rate NUMERIC DEFAULT 10.00,
  total_sales NUMERIC DEFAULT 0.00,
  onecard_balance NUMERIC DEFAULT 0.00,
  admin_percentage NUMERIC DEFAULT 5.00,
  kyc_status kyc_status DEFAULT 'pending',
  kyc_verified_at TIMESTAMP WITH TIME ZONE,
  verification_status TEXT DEFAULT 'pending',
  business_license_url TEXT,
  tax_certificate_url TEXT,
  bank_statement_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Admin profiles table
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role_level TEXT DEFAULT 'admin',
  permissions JSONB DEFAULT '{}',
  department TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- SIM card management table
CREATE TABLE public.sim_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iccid TEXT NOT NULL UNIQUE,
  msisdn TEXT UNIQUE,
  assigned_to UUID REFERENCES public.customer_profiles(id),
  sim_status sim_status DEFAULT 'inactive',
  network_provider TEXT,
  sim_type TEXT DEFAULT 'physical',
  activated_at TIMESTAMP WITH TIME ZONE,
  deactivated_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  data_usage_mb NUMERIC DEFAULT 0,
  voice_usage_minutes NUMERIC DEFAULT 0,
  sms_usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced transactions table with compliance tracking
CREATE TABLE public.mvne_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customer_profiles(id),
  vendor_id UUID REFERENCES public.vendor_profiles(id),
  sim_id UUID REFERENCES public.sim_cards(id),
  transaction_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  original_price NUMERIC NOT NULL,
  discounted_price NUMERIC NOT NULL,
  cashback_earned NUMERIC DEFAULT 0.00,
  admin_fee NUMERIC DEFAULT 0.00,
  vendor_commission NUMERIC DEFAULT 0.00,
  recipient_phone TEXT,
  recipient_name TEXT,
  recipient_relationship TEXT,
  network TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  compliance_checked BOOLEAN DEFAULT false,
  compliance_notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RICA audit logs for compliance
CREATE TABLE public.rica_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customer_profiles(id),
  admin_id UUID REFERENCES public.admin_profiles(id),
  action TEXT NOT NULL,
  document_type TEXT,
  old_status TEXT,
  new_status TEXT,
  verification_method TEXT,
  ai_confidence_score NUMERIC,
  compliance_notes TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- AI-driven insights and actions
CREATE TABLE public.ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL, -- customer, vendor, transaction
  entity_id UUID NOT NULL,
  analysis_type TEXT NOT NULL, -- fraud_detection, compliance_check, churn_prediction
  ai_model_version TEXT,
  confidence_score NUMERIC,
  insights JSONB,
  recommendations JSONB,
  action_taken TEXT,
  admin_reviewed BOOLEAN DEFAULT false,
  reviewed_by UUID REFERENCES public.admin_profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- System notifications and alerts
CREATE TABLE public.system_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL,
  recipient_type TEXT NOT NULL, -- customer, vendor, admin
  notification_type TEXT NOT NULL, -- compliance, usage, billing, system
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal', -- low, normal, high, critical
  read_at TIMESTAMP WITH TIME ZONE,
  action_required BOOLEAN DEFAULT false,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Compliance monitoring table
CREATE TABLE public.compliance_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  compliance_type TEXT NOT NULL, -- rica, popia, mvne
  status TEXT NOT NULL, -- compliant, non_compliant, pending_review
  last_checked TIMESTAMP WITH TIME ZONE DEFAULT now(),
  next_check_due TIMESTAMP WITH TIME ZONE,
  compliance_score NUMERIC,
  issues JSONB,
  remediation_steps JSONB,
  auto_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sim_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mvne_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rica_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_monitoring ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admins can manage all customer profiles" ON public.customer_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can view their own profile" ON public.customer_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Customers can update their own profile" ON public.customer_profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all vendor profiles" ON public.vendor_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can view their own profile" ON public.vendor_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Vendors can update their own profile" ON public.vendor_profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage admin profiles" ON public.admin_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view own profile" ON public.admin_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage SIM cards" ON public.sim_cards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage transactions" ON public.mvne_transactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can view their transactions" ON public.mvne_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.customer_profiles 
      WHERE user_id = auth.uid() AND id = customer_id
    )
  );

CREATE POLICY "Vendors can view their transactions" ON public.mvne_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vendor_profiles 
      WHERE user_id = auth.uid() AND id = vendor_id
    )
  );

CREATE POLICY "Admins can access audit logs" ON public.rica_audit_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can access AI analytics" ON public.ai_analytics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their notifications" ON public.system_notifications
  FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Admins can manage all notifications" ON public.system_notifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can access compliance monitoring" ON public.compliance_monitoring
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Create update triggers
CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_profiles_updated_at
  BEFORE UPDATE ON public.vendor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sim_cards_updated_at
  BEFORE UPDATE ON public.sim_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mvne_transactions_updated_at
  BEFORE UPDATE ON public.mvne_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_monitoring_updated_at
  BEFORE UPDATE ON public.compliance_monitoring
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_customer_profiles_user_id ON public.customer_profiles(user_id);
CREATE INDEX idx_customer_profiles_rica_status ON public.customer_profiles(rica_status);
CREATE INDEX idx_customer_profiles_kyc_status ON public.customer_profiles(kyc_status);
CREATE INDEX idx_customer_profiles_phone ON public.customer_profiles(phone);
CREATE INDEX idx_customer_profiles_id_number ON public.customer_profiles(id_number);

CREATE INDEX idx_vendor_profiles_user_id ON public.vendor_profiles(user_id);
CREATE INDEX idx_vendor_profiles_kyc_status ON public.vendor_profiles(kyc_status);
CREATE INDEX idx_vendor_profiles_verification_status ON public.vendor_profiles(verification_status);

CREATE INDEX idx_admin_profiles_user_id ON public.admin_profiles(user_id);

CREATE INDEX idx_sim_cards_iccid ON public.sim_cards(iccid);
CREATE INDEX idx_sim_cards_msisdn ON public.sim_cards(msisdn);
CREATE INDEX idx_sim_cards_assigned_to ON public.sim_cards(assigned_to);
CREATE INDEX idx_sim_cards_status ON public.sim_cards(sim_status);

CREATE INDEX idx_mvne_transactions_customer_id ON public.mvne_transactions(customer_id);
CREATE INDEX idx_mvne_transactions_vendor_id ON public.mvne_transactions(vendor_id);
CREATE INDEX idx_mvne_transactions_created_at ON public.mvne_transactions(created_at);
CREATE INDEX idx_mvne_transactions_status ON public.mvne_transactions(status);

CREATE INDEX idx_rica_audit_logs_customer_id ON public.rica_audit_logs(customer_id);
CREATE INDEX idx_rica_audit_logs_created_at ON public.rica_audit_logs(created_at);

CREATE INDEX idx_ai_analytics_entity_type_id ON public.ai_analytics(entity_type, entity_id);
CREATE INDEX idx_ai_analytics_analysis_type ON public.ai_analytics(analysis_type);
CREATE INDEX idx_ai_analytics_created_at ON public.ai_analytics(created_at);

CREATE INDEX idx_system_notifications_recipient ON public.system_notifications(recipient_id, recipient_type);
CREATE INDEX idx_system_notifications_type ON public.system_notifications(notification_type);
CREATE INDEX idx_system_notifications_read ON public.system_notifications(read_at);

CREATE INDEX idx_compliance_monitoring_entity ON public.compliance_monitoring(entity_type, entity_id);
CREATE INDEX idx_compliance_monitoring_type_status ON public.compliance_monitoring(compliance_type, status);
CREATE INDEX idx_compliance_monitoring_next_check ON public.compliance_monitoring(next_check_due);