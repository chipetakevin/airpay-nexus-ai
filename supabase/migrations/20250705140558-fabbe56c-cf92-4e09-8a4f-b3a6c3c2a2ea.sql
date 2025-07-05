-- Comprehensive Universal Data Storage System for All Forms
-- This ensures all form data is stored permanently in the database

-- Create universal form submissions table for all form data
CREATE TABLE IF NOT EXISTS public.universal_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  form_type TEXT NOT NULL, -- 'customer', 'vendor', 'admin', 'staff', 'field_worker', 'rica', 'banking', 'onecard'
  form_data JSONB NOT NULL,
  submission_source TEXT DEFAULT 'web', -- 'web', 'mobile', 'api'
  ip_address INET,
  user_agent TEXT,
  is_complete BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  verification_method TEXT, -- 'email', 'sms', 'manual'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  version INTEGER DEFAULT 1
);

-- Create permanent local storage mirror table
CREATE TABLE IF NOT EXISTS public.local_storage_mirror (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  storage_key TEXT NOT NULL,
  storage_data JSONB NOT NULL,
  storage_type TEXT DEFAULT 'localStorage', -- 'localStorage', 'sessionStorage'
  form_reference_id UUID REFERENCES public.universal_form_submissions(id),
  sync_status TEXT DEFAULT 'synced', -- 'synced', 'pending', 'failed'
  last_sync_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create comprehensive user profiles table (enhanced)
CREATE TABLE IF NOT EXISTS public.comprehensive_user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  user_type TEXT NOT NULL, -- 'customer', 'vendor', 'admin', 'staff', 'field_worker'
  
  -- Personal Information
  first_name TEXT,
  last_name TEXT,  
  full_name TEXT,
  email TEXT,
  phone TEXT,
  id_number TEXT,
  id_type TEXT DEFAULT 'SA_ID',
  date_of_birth DATE,
  gender TEXT,
  nationality TEXT DEFAULT 'South African',
  
  -- Address Information
  physical_address TEXT,
  postal_address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'South Africa',
  
  -- Banking Information
  bank_name TEXT,
  account_number TEXT,
  branch_code TEXT,
  account_type TEXT DEFAULT 'savings',
  account_holder_name TEXT,
  
  -- Business Information (for vendors/admins)
  business_name TEXT,
  business_type TEXT,
  registration_number TEXT,
  tax_number TEXT,
  vat_number TEXT,
  business_address TEXT,
  business_phone TEXT,
  business_email TEXT,
  
  -- Contact Information
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  
  -- Financial Information
  onecard_balance DECIMAL(15,2) DEFAULT 0.00,
  total_cashback DECIMAL(15,2) DEFAULT 0.00,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  total_sales DECIMAL(15,2) DEFAULT 0.00,
  admin_percentage DECIMAL(5,2) DEFAULT 5.00,
  
  -- Status Information
  verification_status TEXT DEFAULT 'pending',
  rica_status TEXT DEFAULT 'pending',
  kyc_status TEXT DEFAULT 'pending',
  
  -- Document URLs
  id_document_url TEXT,
  proof_of_address_url TEXT,
  selfie_url TEXT,
  business_license_url TEXT,
  tax_certificate_url TEXT,
  bank_statement_url TEXT,
  
  -- Consent and Terms
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  privacy_policy_accepted BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- System Fields
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Additional Data (for flexibility)
  additional_data JSONB DEFAULT '{}'::jsonb,
  
  -- Indexes for performance
  CONSTRAINT unique_user_profile UNIQUE(user_id, user_type)
);

-- Create payment cards storage table
CREATE TABLE IF NOT EXISTS public.payment_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL,
  card_type TEXT NOT NULL, -- 'visa', 'mastercard', 'amex'
  last_four_digits TEXT NOT NULL,
  expiry_month INTEGER NOT NULL,
  expiry_year INTEGER NOT NULL,
  cardholder_name TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  billing_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rica registrations enhanced table
CREATE TABLE IF NOT EXISTS public.enhanced_rica_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  reference_number TEXT NOT NULL UNIQUE DEFAULT ('RICA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8))),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  id_type TEXT NOT NULL DEFAULT 'SA_ID',
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  nationality TEXT NOT NULL DEFAULT 'South African',
  
  -- Contact Information
  mobile_number TEXT NOT NULL,
  email TEXT,
  physical_address TEXT NOT NULL,
  province TEXT NOT NULL,
  
  -- SIM Information
  sim_serial_number TEXT NOT NULL,
  network_provider TEXT,
  
  -- Document URLs
  id_document_url TEXT,
  proof_of_residence_url TEXT,
  selfie_with_id_url TEXT,
  
  -- Consent and Status
  confirm_information BOOLEAN NOT NULL DEFAULT false,
  consent_processing BOOLEAN NOT NULL DEFAULT false,
  registration_status TEXT NOT NULL DEFAULT 'pending',
  
  -- System Fields
  completed_at TIMESTAMP WITH TIME ZONE,
  auto_saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Link to universal form submissions
  form_submission_id UUID REFERENCES public.universal_form_submissions(id)
);

-- Create banking profiles table
CREATE TABLE IF NOT EXISTS public.banking_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL,
  
  -- Bank Information
  bank_name TEXT NOT NULL,
  branch_code TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_type TEXT DEFAULT 'savings',
  account_holder_name TEXT NOT NULL,
  
  -- Additional Information
  is_primary BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  verification_method TEXT,
  verification_date TIMESTAMP WITH TIME ZONE,
  
  -- System Fields
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Link to universal form submissions
  form_submission_id UUID REFERENCES public.universal_form_submissions(id)
);

-- Create OneCard transactions and rewards table
CREATE TABLE IF NOT EXISTS public.onecard_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL,
  
  -- Transaction Information
  transaction_id UUID,
  reward_type TEXT NOT NULL, -- 'cashback', 'bonus', 'referral', 'loyalty'
  reward_amount DECIMAL(15,2) NOT NULL,
  base_transaction_amount DECIMAL(15,2),
  
  -- Reward Details
  reward_percentage DECIMAL(5,2),
  reward_description TEXT,
  reward_source TEXT, -- 'purchase', 'referral', 'bonus', 'admin'
  
  -- Status Information
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'paid', 'expired'
  is_redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.universal_form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_storage_mirror ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comprehensive_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_rica_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banking_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onecard_rewards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for universal form submissions
CREATE POLICY "Users can manage their own form submissions" 
ON public.universal_form_submissions 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all form submissions" 
ON public.universal_form_submissions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'::user_role 
  AND is_active = true
));

-- Create RLS policies for local storage mirror
CREATE POLICY "Users can manage their own local storage" 
ON public.local_storage_mirror 
FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for comprehensive user profiles
CREATE POLICY "Users can manage their own profile" 
ON public.comprehensive_user_profiles 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all profiles" 
ON public.comprehensive_user_profiles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'::user_role 
  AND is_active = true
));

-- Create RLS policies for payment cards
CREATE POLICY "Users can manage their own payment cards" 
ON public.payment_cards 
FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for enhanced RICA registrations
CREATE POLICY "Users can manage their own RICA registrations" 
ON public.enhanced_rica_registrations 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all RICA registrations" 
ON public.enhanced_rica_registrations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'::user_role 
  AND is_active = true
));

-- Create RLS policies for banking profiles
CREATE POLICY "Users can manage their own banking profiles" 
ON public.banking_profiles 
FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for OneCard rewards
CREATE POLICY "Users can view their own rewards" 
ON public.onecard_rewards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all rewards" 
ON public.onecard_rewards 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'::user_role 
  AND is_active = true
));

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_universal_form_submissions_updated_at BEFORE UPDATE ON public.universal_form_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_local_storage_mirror_updated_at BEFORE UPDATE ON public.local_storage_mirror FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_comprehensive_user_profiles_updated_at BEFORE UPDATE ON public.comprehensive_user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payment_cards_updated_at BEFORE UPDATE ON public.payment_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enhanced_rica_registrations_updated_at BEFORE UPDATE ON public.enhanced_rica_registrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_banking_profiles_updated_at BEFORE UPDATE ON public.banking_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_onecard_rewards_updated_at BEFORE UPDATE ON public.onecard_rewards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_universal_form_submissions_user_id ON public.universal_form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_universal_form_submissions_form_type ON public.universal_form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_local_storage_mirror_user_id ON public.local_storage_mirror(user_id);
CREATE INDEX IF NOT EXISTS idx_comprehensive_user_profiles_user_id ON public.comprehensive_user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_comprehensive_user_profiles_user_type ON public.comprehensive_user_profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_payment_cards_user_id ON public.payment_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_rica_registrations_user_id ON public.enhanced_rica_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_banking_profiles_user_id ON public.banking_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_onecard_rewards_user_id ON public.onecard_rewards(user_id);