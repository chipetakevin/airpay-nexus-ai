-- Create comprehensive customer profiles table for telecom platform
CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  nationality TEXT DEFAULT 'South African',
  
  -- Contact Information
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  alternative_phone TEXT,
  
  -- Identity and RICA Compliance
  id_number TEXT NOT NULL UNIQUE,
  id_type TEXT DEFAULT 'SA_ID' CHECK (id_type IN ('SA_ID', 'passport', 'asylum_permit', 'temporary_permit')),
  passport_number TEXT,
  passport_country TEXT,
  
  -- Address Information
  physical_address TEXT NOT NULL,
  postal_address TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'South Africa',
  
  -- RICA Compliance Fields
  rica_status TEXT DEFAULT 'pending' CHECK (rica_status IN ('pending', 'in_progress', 'verified', 'rejected', 'expired')),
  rica_reference_number TEXT UNIQUE,
  rica_verified_at TIMESTAMP WITH TIME ZONE,
  rica_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- KYC and Verification
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'in_progress', 'verified', 'rejected', 'requires_review')),
  kyc_verified_at TIMESTAMP WITH TIME ZONE,
  verification_level TEXT DEFAULT 'basic' CHECK (verification_level IN ('basic', 'enhanced', 'premium')),
  
  -- Document Storage References
  id_document_url TEXT,
  proof_of_address_url TEXT,
  selfie_url TEXT,
  additional_documents JSONB DEFAULT '[]',
  
  -- Biometric and Security
  biometric_data_hash TEXT,
  security_questions JSONB DEFAULT '[]',
  two_factor_enabled BOOLEAN DEFAULT false,
  
  -- Account Status and Preferences
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'closed', 'pending_activation')),
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'af', 'zu', 'xh', 'st', 'tn', 'ss', 've', 'ts', 'nr', 'nd')),
  marketing_consent BOOLEAN DEFAULT false,
  sms_consent BOOLEAN DEFAULT true,
  email_consent BOOLEAN DEFAULT true,
  
  -- Service Information
  primary_network TEXT,
  service_preferences JSONB DEFAULT '{}',
  usage_limits JSONB DEFAULT '{}',
  
  -- Financial Information
  credit_limit DECIMAL(15,2) DEFAULT 0.00,
  outstanding_balance DECIMAL(15,2) DEFAULT 0.00,
  payment_method_id TEXT,
  
  -- OneCard Integration
  onecard_number TEXT UNIQUE,
  cashback_balance DECIMAL(15,2) DEFAULT 0.00,
  total_cashback_earned DECIMAL(15,2) DEFAULT 0.00,
  
  -- Compliance and Risk
  aml_status TEXT DEFAULT 'pending' CHECK (aml_status IN ('pending', 'cleared', 'flagged', 'under_review')),
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  compliance_notes TEXT,
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 1,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_customer_profiles_user_id ON public.customer_profiles(user_id);
CREATE INDEX idx_customer_profiles_phone ON public.customer_profiles(phone_number);
CREATE INDEX idx_customer_profiles_id_number ON public.customer_profiles(id_number);
CREATE INDEX idx_customer_profiles_rica_ref ON public.customer_profiles(rica_reference_number);
CREATE INDEX idx_customer_profiles_onecard ON public.customer_profiles(onecard_number);
CREATE INDEX idx_customer_profiles_status ON public.customer_profiles(account_status, rica_status, kyc_status);

-- Enable RLS
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.customer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all customer profiles"
  ON public.customer_profiles FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  ));

-- Create function to generate RICA reference number
CREATE OR REPLACE FUNCTION generate_rica_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RICA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Create function to generate OneCard number
CREATE OR REPLACE FUNCTION generate_onecard_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  counter INTEGER := 0;
BEGIN
  LOOP
    new_number := 'OC' || LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
    
    -- Check if number already exists
    IF NOT EXISTS (SELECT 1 FROM public.customer_profiles WHERE onecard_number = new_number) THEN
      RETURN new_number;
    END IF;
    
    counter := counter + 1;
    IF counter > 100 THEN
      RAISE EXCEPTION 'Unable to generate unique OneCard number after 100 attempts';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_customer_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_customer_profiles_updated_at();

-- Create function to auto-populate profile on user creation
CREATE OR REPLACE FUNCTION handle_new_customer_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customer_profiles (
    user_id,
    email,
    first_name,
    last_name,
    phone_number,
    rica_reference_number,
    onecard_number
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, ''),
    generate_rica_reference(),
    generate_onecard_number()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created_customer
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_customer_user();