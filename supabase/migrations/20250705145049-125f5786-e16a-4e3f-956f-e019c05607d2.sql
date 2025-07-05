-- Create comprehensive OneCard system with international payment support and MVNE compliance

-- Create OneCard accounts table for all user types
CREATE TABLE IF NOT EXISTS public.onecard_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- References auth.users
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'vendor', 'admin', 'field_worker', 'support')),
  
  -- OneCard Details
  onecard_number TEXT NOT NULL UNIQUE,
  onecard_type TEXT DEFAULT 'standard' CHECK (onecard_type IN ('standard', 'gold', 'platinum', 'enterprise')),
  
  -- Financial Information
  cashback_balance DECIMAL(12,2) DEFAULT 0.00,
  total_earned DECIMAL(12,2) DEFAULT 0.00,
  total_spent DECIMAL(12,2) DEFAULT 0.00,
  
  -- Account Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  verification_level TEXT DEFAULT 'basic' CHECK (verification_level IN ('basic', 'enhanced', 'premium')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_transaction_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'
);

-- Create international payment cards table
CREATE TABLE IF NOT EXISTS public.international_payment_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  onecard_account_id UUID REFERENCES public.onecard_accounts(id) ON DELETE CASCADE,
  
  -- Card Details
  card_type TEXT NOT NULL CHECK (card_type IN ('visa', 'mastercard', 'american_express', 'diners_club', 'discovery', 'jcb')),
  card_brand TEXT NOT NULL,
  last_four_digits TEXT NOT NULL,
  expiry_month INTEGER NOT NULL CHECK (expiry_month BETWEEN 1 AND 12),
  expiry_year INTEGER NOT NULL,
  
  -- Card Metadata
  cardholder_name TEXT NOT NULL,
  billing_country TEXT NOT NULL,
  billing_address JSONB,
  
  -- Security and Verification
  is_verified BOOLEAN DEFAULT false,
  verification_method TEXT DEFAULT 'pending',
  token_reference TEXT, -- For tokenized storage
  
  -- Status
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Compliance
  pci_compliant BOOLEAN DEFAULT true,
  encryption_standard TEXT DEFAULT 'AES-256'
);

-- Create MVNE compliant transactions table
CREATE TABLE IF NOT EXISTS public.mvne_compliant_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Transaction Identity
  transaction_reference TEXT NOT NULL UNIQUE,
  mvne_reference TEXT,
  mno_reference TEXT,
  
  -- Parties Involved
  onecard_account_id UUID REFERENCES public.onecard_accounts(id),
  customer_id UUID,
  vendor_id UUID,
  
  -- Transaction Details
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('airtime', 'data', 'voice', 'sms', 'bundle', 'transfer', 'cashback_redemption')),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  
  -- Network Information
  network_provider TEXT NOT NULL,
  recipient_msisdn TEXT NOT NULL,
  sender_msisdn TEXT,
  
  -- Payment Method
  payment_method TEXT CHECK (payment_method IN ('onecard_balance', 'cashback', 'bank_account', 'international_card')),
  payment_reference TEXT,
  
  -- Financial Breakdown
  base_amount DECIMAL(12,2) NOT NULL,
  discount_amount DECIMAL(12,2) DEFAULT 0.00,
  cashback_earned DECIMAL(12,2) DEFAULT 0.00,
  commission_paid DECIMAL(12,2) DEFAULT 0.00,
  mvne_fee DECIMAL(12,2) DEFAULT 0.00,
  regulatory_fee DECIMAL(12,2) DEFAULT 0.00,
  
  -- Status and Processing
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'reversed', 'cancelled')),
  processing_status TEXT,
  completion_code TEXT,
  
  -- Compliance and Audit
  regulatory_compliance JSONB DEFAULT '{}',
  icasa_compliant BOOLEAN DEFAULT true,
  rica_verified BOOLEAN DEFAULT false,
  
  -- Location and Device Information
  transaction_location JSONB,
  device_info JSONB,
  ip_address INET,
  
  -- Timestamps
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Receipt and Documentation
  receipt_url TEXT,
  receipt_data JSONB,
  
  -- Error Handling
  error_code TEXT,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cashback management table
CREATE TABLE IF NOT EXISTS public.cashback_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  onecard_account_id UUID REFERENCES public.onecard_accounts(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES public.mvne_compliant_transactions(id),
  
  -- Cashback Details
  cashback_type TEXT CHECK (cashback_type IN ('earning', 'redemption', 'bonus', 'referral', 'promotion')),
  amount DECIMAL(12,2) NOT NULL,
  percentage_rate DECIMAL(5,2),
  
  -- Source Information
  source_transaction_type TEXT,
  source_amount DECIMAL(12,2),
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'credited', 'redeemed', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  credited_at TIMESTAMP WITH TIME ZONE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.onecard_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.international_payment_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mvne_compliant_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashback_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for OneCard accounts
CREATE POLICY "Users can view their own OneCard account"
ON public.onecard_accounts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own OneCard account"
ON public.onecard_accounts
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can create OneCard accounts"
ON public.onecard_accounts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all OneCard accounts"
ON public.onecard_accounts
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- RLS Policies for international payment cards
CREATE POLICY "Users can manage their own payment cards"
ON public.international_payment_cards
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "System can create payment cards"
ON public.international_payment_cards
FOR INSERT
WITH CHECK (true);

-- RLS Policies for MVNE transactions
CREATE POLICY "Users can view their own transactions"
ON public.mvne_compliant_transactions
FOR SELECT
USING (
  auth.uid() = customer_id OR 
  auth.uid() = vendor_id OR
  EXISTS (
    SELECT 1 FROM public.onecard_accounts
    WHERE id = onecard_account_id AND user_id = auth.uid()
  )
);

CREATE POLICY "System can create transactions"
ON public.mvne_compliant_transactions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all transactions"
ON public.mvne_compliant_transactions
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- RLS Policies for cashback transactions
CREATE POLICY "Users can view their own cashback"
ON public.cashback_transactions
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.onecard_accounts
  WHERE id = onecard_account_id AND user_id = auth.uid()
));

CREATE POLICY "System can manage cashback"
ON public.cashback_transactions
FOR ALL
WITH CHECK (true);

-- Create function to generate unique OneCard numbers
CREATE OR REPLACE FUNCTION public.generate_onecard_number(user_type_param TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  prefix TEXT;
  random_digits TEXT;
  check_digit TEXT;
  onecard_number TEXT;
  counter INTEGER := 0;
BEGIN
  -- Set prefix based on user type
  prefix := CASE user_type_param
    WHEN 'customer' THEN 'OC'
    WHEN 'vendor' THEN 'OV'
    WHEN 'admin' THEN 'OA'
    WHEN 'field_worker' THEN 'OF'
    WHEN 'support' THEN 'OS'
    ELSE 'OC'
  END;
  
  -- Generate unique number with retry logic
  LOOP
    -- Generate 8 random digits
    random_digits := LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
    
    -- Calculate simple check digit (sum of digits mod 10)
    check_digit := (
      (SUBSTRING(random_digits, 1, 1)::INTEGER + 
       SUBSTRING(random_digits, 2, 1)::INTEGER + 
       SUBSTRING(random_digits, 3, 1)::INTEGER + 
       SUBSTRING(random_digits, 4, 1)::INTEGER + 
       SUBSTRING(random_digits, 5, 1)::INTEGER + 
       SUBSTRING(random_digits, 6, 1)::INTEGER + 
       SUBSTRING(random_digits, 7, 1)::INTEGER + 
       SUBSTRING(random_digits, 8, 1)::INTEGER) % 10
    )::TEXT;
    
    onecard_number := prefix || random_digits || check_digit;
    
    -- Check if number already exists
    IF NOT EXISTS (SELECT 1 FROM public.onecard_accounts WHERE onecard_number = onecard_number) THEN
      RETURN onecard_number;
    END IF;
    
    counter := counter + 1;
    IF counter > 100 THEN
      RAISE EXCEPTION 'Unable to generate unique OneCard number after 100 attempts';
    END IF;
  END LOOP;
END;
$$;

-- Create function to create OneCard account
CREATE OR REPLACE FUNCTION public.create_onecard_account(
  user_id_param UUID,
  user_type_param TEXT,
  onecard_type_param TEXT DEFAULT 'standard'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  onecard_number TEXT;
  account_id UUID;
BEGIN
  -- Generate unique OneCard number
  onecard_number := public.generate_onecard_number(user_type_param);
  
  -- Create OneCard account
  INSERT INTO public.onecard_accounts (
    user_id,
    user_type,
    onecard_number,
    onecard_type,
    is_verified,
    verification_level
  ) VALUES (
    user_id_param,
    user_type_param,
    onecard_number,
    onecard_type_param,
    CASE WHEN user_type_param = 'admin' THEN true ELSE false END,
    CASE WHEN user_type_param = 'admin' THEN 'premium' ELSE 'basic' END
  ) RETURNING id INTO account_id;
  
  RETURN onecard_number;
END;
$$;

-- Create function to update cashback balance
CREATE OR REPLACE FUNCTION public.update_cashback_balance(
  onecard_account_id_param UUID,
  amount_param DECIMAL,
  transaction_type_param TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update OneCard account balance
  UPDATE public.onecard_accounts
  SET 
    cashback_balance = CASE 
      WHEN transaction_type_param = 'earning' THEN cashback_balance + amount_param
      WHEN transaction_type_param = 'redemption' THEN cashback_balance - amount_param
      ELSE cashback_balance
    END,
    total_earned = CASE 
      WHEN transaction_type_param = 'earning' THEN total_earned + amount_param
      ELSE total_earned
    END,
    updated_at = now(),
    last_transaction_at = now()
  WHERE id = onecard_account_id_param;
  
  RETURN FOUND;
END;
$$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_onecard_accounts_updated_at
  BEFORE UPDATE ON public.onecard_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_international_payment_cards_updated_at
  BEFORE UPDATE ON public.international_payment_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mvne_compliant_transactions_updated_at
  BEFORE UPDATE ON public.mvne_compliant_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cashback_transactions_updated_at
  BEFORE UPDATE ON public.cashback_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_onecard_accounts_user_id ON public.onecard_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_onecard_accounts_onecard_number ON public.onecard_accounts(onecard_number);
CREATE INDEX IF NOT EXISTS idx_onecard_accounts_user_type ON public.onecard_accounts(user_type);

CREATE INDEX IF NOT EXISTS idx_international_payment_cards_user_id ON public.international_payment_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_international_payment_cards_onecard_account_id ON public.international_payment_cards(onecard_account_id);

CREATE INDEX IF NOT EXISTS idx_mvne_transactions_onecard_account_id ON public.mvne_compliant_transactions(onecard_account_id);
CREATE INDEX IF NOT EXISTS idx_mvne_transactions_customer_id ON public.mvne_compliant_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_mvne_transactions_vendor_id ON public.mvne_compliant_transactions(vendor_id);
CREATE INDEX IF NOT EXISTS idx_mvne_transactions_status ON public.mvne_compliant_transactions(status);
CREATE INDEX IF NOT EXISTS idx_mvne_transactions_network_provider ON public.mvne_compliant_transactions(network_provider);

CREATE INDEX IF NOT EXISTS idx_cashback_transactions_onecard_account_id ON public.cashback_transactions(onecard_account_id);
CREATE INDEX IF NOT EXISTS idx_cashback_transactions_status ON public.cashback_transactions(status);