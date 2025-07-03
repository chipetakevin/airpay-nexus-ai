-- Create RICA registrations table
CREATE TABLE public.rica_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'vendor', 'admin')),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  nationality TEXT NOT NULL,
  id_number TEXT NOT NULL,
  id_type TEXT NOT NULL CHECK (id_type IN ('SA ID', 'Passport', 'Refugee', 'Asylum')),
  
  -- Contact & Address
  mobile_number TEXT NOT NULL,
  email TEXT,
  physical_address TEXT NOT NULL,
  province TEXT NOT NULL,
  proof_of_residence_url TEXT,
  
  -- SIM Details
  sim_serial_number TEXT NOT NULL,
  selfie_with_id_url TEXT,
  
  -- Declaration
  confirm_information BOOLEAN NOT NULL DEFAULT false,
  consent_processing BOOLEAN NOT NULL DEFAULT false,
  
  -- Status & Metadata
  registration_status TEXT NOT NULL DEFAULT 'pending' CHECK (registration_status IN ('pending', 'processing', 'approved', 'rejected')),
  reference_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  auto_saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Unique constraints
  UNIQUE(mobile_number),
  UNIQUE(id_number),
  UNIQUE(sim_serial_number)
);

-- Enable Row Level Security
ALTER TABLE public.rica_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own RICA registrations" 
ON public.rica_registrations 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own RICA registrations" 
ON public.rica_registrations 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own RICA registrations" 
ON public.rica_registrations 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Admins can view all registrations
CREATE POLICY "Admins can view all RICA registrations" 
ON public.rica_registrations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.uid() = id 
  AND raw_user_meta_data ->> 'user_type' = 'admin'
));

-- Create auto-save drafts table for unsaved data
CREATE TABLE public.rica_registration_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL,
  form_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, user_type)
);

-- Enable RLS for drafts
ALTER TABLE public.rica_registration_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own RICA drafts" 
ON public.rica_registration_drafts 
FOR ALL 
USING (auth.uid()::text = user_id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_rica_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_rica_registrations_updated_at
BEFORE UPDATE ON public.rica_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_rica_updated_at_column();

CREATE TRIGGER update_rica_drafts_updated_at
BEFORE UPDATE ON public.rica_registration_drafts
FOR EACH ROW
EXECUTE FUNCTION public.update_rica_updated_at_column();

-- Create function to generate reference number
CREATE OR REPLACE FUNCTION public.generate_rica_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RICA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8));
END;
$$ LANGUAGE plpgsql;