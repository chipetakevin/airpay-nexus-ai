-- Create field workers table
CREATE TABLE public.field_workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  id_number text NOT NULL UNIQUE,
  email text NOT NULL,
  phone text NOT NULL,
  physical_address text NOT NULL,
  postal_address text,
  province text NOT NULL,
  city text,
  qualification text NOT NULL,
  skills text[] DEFAULT '{}',
  region_assignment text NOT NULL,
  bank_name text NOT NULL,
  account_number text NOT NULL,
  branch_code text NOT NULL,
  account_type text DEFAULT 'savings',
  registration_status text DEFAULT 'pending',
  approved_at timestamp with time zone,
  approved_by uuid,
  total_activations integer DEFAULT 0,
  current_month_activations integer DEFAULT 0,
  total_commissions_earned numeric DEFAULT 0.00,
  commission_rate numeric DEFAULT 50.00,
  last_activity_at timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  -- Document URLs
  contract_url text,
  id_document_url text,
  proof_of_address_url text,
  qualification_certificate_url text,
  
  -- Compliance
  popia_consent boolean DEFAULT false,
  terms_accepted boolean DEFAULT false,
  
  CONSTRAINT valid_registration_status CHECK (registration_status IN ('pending', 'approved', 'rejected'))
);

-- Create field worker activations table
CREATE TABLE public.field_worker_activations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_worker_id uuid REFERENCES public.field_workers(id) ON DELETE CASCADE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_id_number text NOT NULL,
  network_provider text NOT NULL,
  sim_iccid text NOT NULL,
  activation_date timestamp with time zone DEFAULT now(),
  rica_status text DEFAULT 'pending',
  commission_amount numeric DEFAULT 0.00,
  commission_status text DEFAULT 'pending',
  rica_reference_number text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT valid_rica_status CHECK (rica_status IN ('pending', 'completed', 'failed')),
  CONSTRAINT valid_commission_status CHECK (commission_status IN ('pending', 'approved', 'paid'))
);

-- Create field worker commission statements table
CREATE TABLE public.field_worker_commission_statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_worker_id uuid REFERENCES public.field_workers(id) ON DELETE CASCADE NOT NULL,
  statement_period_start date NOT NULL,
  statement_period_end date NOT NULL,
  statement_month integer NOT NULL,
  statement_year integer NOT NULL,
  total_activations integer DEFAULT 0,
  commission_per_activation numeric DEFAULT 0.00,
  gross_commission numeric DEFAULT 0.00,
  deductions numeric DEFAULT 0.00,
  net_commission numeric DEFAULT 0.00,
  payment_status text DEFAULT 'pending',
  payment_date timestamp with time zone,
  payment_reference text,
  generated_by uuid,
  generated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'processed', 'paid')),
  UNIQUE(field_worker_id, statement_month, statement_year)
);

-- Enable RLS on all tables
ALTER TABLE public.field_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_commission_statements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for field_workers
CREATE POLICY "Field workers can view their own profile"
ON public.field_workers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Field workers can update their own profile"
ON public.field_workers FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can register as field worker"
ON public.field_workers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all field workers"
ON public.field_workers FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin' 
  AND is_active = true
));

-- RLS Policies for field_worker_activations
CREATE POLICY "Field workers can view their own activations"
ON public.field_worker_activations FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.field_workers 
  WHERE id = field_worker_activations.field_worker_id 
  AND user_id = auth.uid()
));

CREATE POLICY "Field workers can create activations"
ON public.field_worker_activations FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.field_workers 
  WHERE id = field_worker_activations.field_worker_id 
  AND user_id = auth.uid()
));

CREATE POLICY "Admins can manage all activations"
ON public.field_worker_activations FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin' 
  AND is_active = true
));

-- RLS Policies for commission statements
CREATE POLICY "Field workers can view their own statements"
ON public.field_worker_commission_statements FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.field_workers 
  WHERE id = field_worker_commission_statements.field_worker_id 
  AND user_id = auth.uid()
));

CREATE POLICY "Admins can manage all statements"
ON public.field_worker_commission_statements FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin' 
  AND is_active = true
));

-- Create triggers for updated_at columns
CREATE TRIGGER update_field_workers_updated_at
BEFORE UPDATE ON public.field_workers
FOR EACH ROW EXECUTE FUNCTION public.update_field_worker_updated_at();

CREATE TRIGGER update_field_worker_activations_updated_at
BEFORE UPDATE ON public.field_worker_activations
FOR EACH ROW EXECUTE FUNCTION public.update_field_worker_updated_at();

-- Create storage bucket for field worker documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('field-worker-documents', 'field-worker-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for field worker documents
CREATE POLICY "Field workers can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'field-worker-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Field workers can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'field-worker-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can manage all field worker documents"
ON storage.objects FOR ALL
USING (
  bucket_id = 'field-worker-documents' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);