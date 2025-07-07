-- Create field_workers table with comprehensive profile information
CREATE TABLE public.field_workers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name text NOT NULL,
  id_number text NOT NULL UNIQUE,
  email text NOT NULL,
  phone text NOT NULL,
  physical_address text NOT NULL,
  postal_address text,
  province text,
  city text,
  
  -- Professional Details
  qualification text NOT NULL, -- Matric or higher
  skills text[], -- Array of skills
  region_assignment text NOT NULL,
  
  -- Banking Details
  bank_name text NOT NULL,
  account_number text NOT NULL,
  branch_code text NOT NULL,
  account_type text DEFAULT 'savings',
  
  -- Status and Verification
  registration_status text DEFAULT 'pending' CHECK (registration_status IN ('pending', 'approved', 'rejected', 'suspended')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  kyc_status text DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  
  -- Contract Information
  contract_url text,
  contract_signed_at timestamp with time zone,
  contract_approved_at timestamp with time zone,
  contract_approved_by uuid,
  commission_rate numeric DEFAULT 50.00, -- Commission per activation
  payment_cycle text DEFAULT 'monthly',
  
  -- Performance Tracking
  total_activations integer DEFAULT 0,
  total_commissions_earned numeric DEFAULT 0.00,
  current_month_activations integer DEFAULT 0,
  last_activity_at timestamp with time zone,
  
  -- Document URLs
  id_document_url text,
  proof_of_address_url text,
  qualification_certificate_url text,
  
  -- Compliance and Consent
  popia_consent boolean DEFAULT false,
  popia_consent_at timestamp with time zone,
  terms_accepted boolean DEFAULT false,
  terms_accepted_at timestamp with time zone,
  
  -- Metadata
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create field_worker_activations table for tracking customer onboarding
CREATE TABLE public.field_worker_activations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_worker_id uuid NOT NULL REFERENCES public.field_workers(id) ON DELETE CASCADE,
  
  -- Customer Information
  customer_name text NOT NULL,
  customer_id_number text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  
  -- SIM and Network Details
  sim_iccid text,
  msisdn text,
  network_provider text NOT NULL,
  activation_type text DEFAULT 'new' CHECK (activation_type IN ('new', 'port', 'upgrade')),
  
  -- Location and Verification
  activation_location jsonb,
  verification_method text DEFAULT 'in_person',
  rica_reference text,
  rica_status text DEFAULT 'pending' CHECK (rica_status IN ('pending', 'completed', 'failed')),
  
  -- Commission and Payment
  commission_amount numeric DEFAULT 50.00,
  commission_status text DEFAULT 'pending' CHECK (commission_status IN ('pending', 'approved', 'paid')),
  commission_paid_at timestamp with time zone,
  
  -- Timestamps
  activation_date timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create field_worker_commission_statements table
CREATE TABLE public.field_worker_commission_statements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_worker_id uuid NOT NULL REFERENCES public.field_workers(id) ON DELETE CASCADE,
  
  -- Statement Period
  statement_period_start date NOT NULL,
  statement_period_end date NOT NULL,
  statement_month integer NOT NULL,
  statement_year integer NOT NULL,
  
  -- Commission Calculations
  total_activations integer DEFAULT 0,
  commission_per_activation numeric DEFAULT 50.00,
  gross_commission numeric DEFAULT 0.00,
  deductions numeric DEFAULT 0.00,
  net_commission numeric DEFAULT 0.00,
  
  -- Tax and Compliance
  paye_deducted numeric DEFAULT 0.00,
  uif_deducted numeric DEFAULT 0.00,
  
  -- Payment Details
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processed', 'paid', 'failed')),
  payment_date timestamp with time zone,
  payment_reference text,
  
  -- Metadata
  generated_at timestamp with time zone DEFAULT now(),
  generated_by uuid,
  created_at timestamp with time zone DEFAULT now()
);

-- Create field_worker_documents table for document management
CREATE TABLE public.field_worker_documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_worker_id uuid NOT NULL REFERENCES public.field_workers(id) ON DELETE CASCADE,
  
  -- Document Details
  document_type text NOT NULL CHECK (document_type IN ('contract', 'id_document', 'proof_of_address', 'qualification_certificate', 'bank_statement', 'other')),
  document_name text NOT NULL,
  document_url text NOT NULL,
  file_size integer,
  mime_type text,
  
  -- Verification
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_at timestamp with time zone,
  verified_by uuid,
  verification_notes text,
  
  -- Metadata
  uploaded_at timestamp with time zone DEFAULT now(),
  uploaded_by uuid,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.field_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_commission_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for field_workers
CREATE POLICY "Admins can manage all field workers" ON public.field_workers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

CREATE POLICY "Field workers can view and update their own profile" ON public.field_workers
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for field_worker_activations
CREATE POLICY "Admins can view all activations" ON public.field_worker_activations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

CREATE POLICY "Field workers can manage their own activations" ON public.field_worker_activations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.field_workers fw 
      WHERE fw.id = field_worker_activations.field_worker_id 
      AND fw.user_id = auth.uid()
    )
  );

-- Create RLS policies for commission statements
CREATE POLICY "Admins can view all commission statements" ON public.field_worker_commission_statements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

CREATE POLICY "Field workers can view their own statements" ON public.field_worker_commission_statements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.field_workers fw 
      WHERE fw.id = field_worker_commission_statements.field_worker_id 
      AND fw.user_id = auth.uid()
    )
  );

-- Create RLS policies for documents
CREATE POLICY "Admins can manage all documents" ON public.field_worker_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

CREATE POLICY "Field workers can manage their own documents" ON public.field_worker_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.field_workers fw 
      WHERE fw.id = field_worker_documents.field_worker_id 
      AND fw.user_id = auth.uid()
    )
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_field_worker_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_field_workers_updated_at
  BEFORE UPDATE ON public.field_workers
  FOR EACH ROW EXECUTE FUNCTION public.update_field_worker_updated_at();

CREATE TRIGGER update_field_worker_activations_updated_at
  BEFORE UPDATE ON public.field_worker_activations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate monthly commissions
CREATE OR REPLACE FUNCTION public.calculate_field_worker_commission(
  p_field_worker_id uuid,
  p_month integer,
  p_year integer
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  statement_id uuid;
  activation_count integer;
  commission_rate numeric;
  gross_commission numeric;
  net_commission numeric;
BEGIN
  -- Get field worker commission rate
  SELECT fw.commission_rate INTO commission_rate
  FROM public.field_workers fw
  WHERE fw.id = p_field_worker_id;
  
  -- Count activations for the month
  SELECT COUNT(*) INTO activation_count
  FROM public.field_worker_activations fwa
  WHERE fwa.field_worker_id = p_field_worker_id
  AND EXTRACT(MONTH FROM fwa.activation_date) = p_month
  AND EXTRACT(YEAR FROM fwa.activation_date) = p_year
  AND fwa.rica_status = 'completed';
  
  -- Calculate commissions
  gross_commission := activation_count * commission_rate;
  net_commission := gross_commission; -- Simplified calculation
  
  -- Create or update commission statement
  INSERT INTO public.field_worker_commission_statements (
    field_worker_id,
    statement_period_start,
    statement_period_end,
    statement_month,
    statement_year,
    total_activations,
    commission_per_activation,
    gross_commission,
    net_commission,
    generated_by
  ) VALUES (
    p_field_worker_id,
    DATE(p_year || '-' || p_month || '-01'),
    (DATE(p_year || '-' || p_month || '-01') + INTERVAL '1 month - 1 day')::date,
    p_month,
    p_year,
    activation_count,
    commission_rate,
    gross_commission,
    net_commission,
    auth.uid()
  ) RETURNING id INTO statement_id;
  
  RETURN statement_id;
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_field_workers_user_id ON public.field_workers(user_id);
CREATE INDEX idx_field_workers_region ON public.field_workers(region_assignment);
CREATE INDEX idx_field_worker_activations_worker_id ON public.field_worker_activations(field_worker_id);
CREATE INDEX idx_field_worker_activations_date ON public.field_worker_activations(activation_date);
CREATE INDEX idx_field_worker_commission_statements_worker_id ON public.field_worker_commission_statements(field_worker_id);
CREATE INDEX idx_field_worker_documents_worker_id ON public.field_worker_documents(field_worker_id);