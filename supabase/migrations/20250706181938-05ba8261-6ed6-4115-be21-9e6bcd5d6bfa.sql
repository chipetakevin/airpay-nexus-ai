-- Create contractor_profiles table
CREATE TABLE public.contractor_profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    position TEXT,
    department TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    phone TEXT,
    email TEXT,
    start_date DATE,
    notes TEXT,
    created_by UUID,
    import_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create import_audit_logs table
CREATE TABLE public.import_audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    import_id UUID NOT NULL,
    user_id UUID,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    total_rows INTEGER NOT NULL DEFAULT 0,
    successful_imports INTEGER NOT NULL DEFAULT 0,
    failed_imports INTEGER NOT NULL DEFAULT 0,
    import_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    error_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for contractor_profiles
CREATE POLICY "Users can view all contractor profiles" 
ON public.contractor_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert contractor profiles" 
ON public.contractor_profiles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update contractor profiles they created" 
ON public.contractor_profiles 
FOR UPDATE 
USING (auth.uid() = created_by OR auth.uid() IS NOT NULL);

-- Create policies for import_audit_logs
CREATE POLICY "Users can view their own import logs" 
ON public.import_audit_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert import logs" 
ON public.import_audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_contractor_profiles_employee_id ON public.contractor_profiles(employee_id);
CREATE INDEX idx_contractor_profiles_created_by ON public.contractor_profiles(created_by);
CREATE INDEX idx_contractor_profiles_import_id ON public.contractor_profiles(import_id);
CREATE INDEX idx_import_audit_logs_user_id ON public.import_audit_logs(user_id);
CREATE INDEX idx_import_audit_logs_import_id ON public.import_audit_logs(import_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_contractor_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contractor_profiles_updated_at
    BEFORE UPDATE ON public.contractor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_contractor_updated_at_column();