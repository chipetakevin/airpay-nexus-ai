-- Create policy documents table
CREATE TABLE public.policy_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    version TEXT NOT NULL,
    category TEXT NOT NULL, -- 'ict', 'cybersecurity', 'sop', 'training'
    content JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'approved', 'active', 'archived'
    effective_date TIMESTAMP WITH TIME ZONE,
    expiry_date TIMESTAMP WITH TIME ZONE,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create policy acknowledgments table
CREATE TABLE public.policy_acknowledgments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    policy_id UUID NOT NULL REFERENCES public.policy_documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    user_email TEXT NOT NULL,
    user_name TEXT,
    user_role TEXT,
    user_type TEXT NOT NULL, -- 'staff', 'contractor', 'admin', 'support'
    acknowledged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    training_completed BOOLEAN DEFAULT false,
    training_completed_at TIMESTAMP WITH TIME ZONE,
    quiz_score INTEGER,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create policy distribution table
CREATE TABLE public.policy_distributions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    policy_id UUID NOT NULL REFERENCES public.policy_documents(id) ON DELETE CASCADE,
    distribution_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    total_recipients INTEGER NOT NULL DEFAULT 0,
    total_acknowledged INTEGER NOT NULL DEFAULT 0,
    email_sent_count INTEGER NOT NULL DEFAULT 0,
    email_failed_count INTEGER NOT NULL DEFAULT 0,
    distribution_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sending', 'completed', 'failed'
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stakeholder contacts table
CREATE TABLE public.stakeholder_contacts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    user_type TEXT NOT NULL, -- 'staff', 'contractor', 'admin', 'support', 'field_contractor'
    location TEXT,
    phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_email_sent TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.policy_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stakeholder_contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage policy documents"
ON public.policy_documents
FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role IN ('admin', 'manager') 
    AND ur.is_active = true
));

CREATE POLICY "All users can view active policies"
ON public.policy_documents
FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can create acknowledgments"
ON public.policy_acknowledgments
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own acknowledgments"
ON public.policy_acknowledgments
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all acknowledgments"
ON public.policy_acknowledgments
FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role IN ('admin', 'manager') 
    AND ur.is_active = true
));

CREATE POLICY "Admins can manage distributions"
ON public.policy_distributions
FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role IN ('admin', 'manager') 
    AND ur.is_active = true
));

CREATE POLICY "Admins can manage stakeholder contacts"
ON public.stakeholder_contacts
FOR ALL
USING (EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role IN ('admin', 'manager') 
    AND ur.is_active = true
));

-- Create triggers for updated_at
CREATE TRIGGER update_policy_documents_updated_at
    BEFORE UPDATE ON public.policy_documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_policy_distributions_updated_at
    BEFORE UPDATE ON public.policy_distributions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stakeholder_contacts_updated_at
    BEFORE UPDATE ON public.stakeholder_contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample stakeholder contacts
INSERT INTO public.stakeholder_contacts (email, first_name, last_name, role, user_type, department) VALUES
('admin@divinemobile.co.za', 'System', 'Administrator', 'System Admin', 'admin', 'IT'),
('support@divinemobile.co.za', 'Support', 'Team', 'Support Lead', 'support', 'Support'),
('security@divinemobile.co.za', 'Security', 'Team', 'Security Officer', 'staff', 'Security'),
('compliance@divinemobile.co.za', 'Compliance', 'Officer', 'Compliance Manager', 'staff', 'Compliance'),
('field.contractor@divinemobile.co.za', 'Field', 'Contractor', 'Field Technician', 'field_contractor', 'Operations');