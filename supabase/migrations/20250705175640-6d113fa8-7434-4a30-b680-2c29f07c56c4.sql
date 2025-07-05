-- Create feature flags table for contractor access control
CREATE TABLE public.contractor_features (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    feature_key text NOT NULL,
    feature_name text NOT NULL,
    feature_description text,
    category text NOT NULL DEFAULT 'general',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create contractor feature access table
CREATE TABLE public.contractor_feature_access (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    feature_key text NOT NULL,
    is_enabled boolean NOT NULL DEFAULT false,
    enabled_by uuid REFERENCES auth.users(id),
    enabled_at timestamp with time zone,
    disabled_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(contractor_id, feature_key)
);

-- Create feature access audit log
CREATE TABLE public.feature_access_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_id uuid NOT NULL,
    feature_key text NOT NULL,
    action text NOT NULL, -- 'enabled' or 'disabled'
    changed_by uuid NOT NULL REFERENCES auth.users(id),
    reason text,
    metadata jsonb DEFAULT '{}',
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contractor_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contractor_feature_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_access_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contractor_features
CREATE POLICY "Admins can manage contractor features"
ON public.contractor_features
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin'::user_role 
        AND ur.is_active = true
    )
);

CREATE POLICY "Contractors can view active features"
ON public.contractor_features
FOR SELECT
USING (is_active = true);

-- RLS Policies for contractor_feature_access
CREATE POLICY "Admins can manage all feature access"
ON public.contractor_feature_access
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin'::user_role 
        AND ur.is_active = true
    )
);

CREATE POLICY "Contractors can view their own feature access"
ON public.contractor_feature_access
FOR SELECT
USING (contractor_id = auth.uid());

-- RLS Policies for feature_access_logs
CREATE POLICY "Admins can view all feature access logs"
ON public.feature_access_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM user_roles ur 
        WHERE ur.user_id = auth.uid() 
        AND ur.role = 'admin'::user_role 
        AND ur.is_active = true
    )
);

CREATE POLICY "System can insert feature access logs"
ON public.feature_access_logs
FOR INSERT
WITH CHECK (true);

-- Insert default features
INSERT INTO public.contractor_features (feature_key, feature_name, feature_description, category) VALUES
('sim_activation', 'SIM Activation', 'Allow contractors to submit SIM activation requests', 'core'),
('kyc_verification', 'KYC Verification', 'Allow contractors to submit KYC verification documents', 'core'),
('site_visits', 'Site Visits', 'Allow contractors to log site visit activities', 'field_work'),
('document_upload', 'Document Upload', 'Allow contractors to upload supporting documents', 'core'),
('photo_capture', 'Photo Capture', 'Allow contractors to capture and upload photos', 'media'),
('gps_tracking', 'GPS Tracking', 'Allow contractors to share location data with submissions', 'location'),
('bulk_submissions', 'Bulk Submissions', 'Allow contractors to submit multiple records at once', 'advanced'),
('report_viewing', 'Report Viewing', 'Allow contractors to view their performance reports', 'reporting'),
('commission_tracking', 'Commission Tracking', 'Allow contractors to view commission information', 'reporting'),
('offline_mode', 'Offline Mode', 'Allow contractors to work offline and sync later', 'advanced');

-- Function to check if contractor has feature access
CREATE OR REPLACE FUNCTION public.contractor_has_feature_access(
    _contractor_id uuid,
    _feature_key text
) RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM contractor_feature_access cfa
        JOIN contractor_features cf ON cf.feature_key = cfa.feature_key
        WHERE cfa.contractor_id = _contractor_id 
        AND cfa.feature_key = _feature_key
        AND cfa.is_enabled = true
        AND cf.is_active = true
    );
$$;

-- Function to log feature access changes
CREATE OR REPLACE FUNCTION public.log_feature_access_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO feature_access_logs (
            contractor_id, 
            feature_key, 
            action, 
            changed_by,
            metadata
        ) VALUES (
            NEW.contractor_id,
            NEW.feature_key,
            CASE WHEN NEW.is_enabled THEN 'enabled' ELSE 'disabled' END,
            COALESCE(NEW.enabled_by, auth.uid()),
            jsonb_build_object(
                'operation', 'insert',
                'enabled', NEW.is_enabled
            )
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_enabled != NEW.is_enabled THEN
            INSERT INTO feature_access_logs (
                contractor_id, 
                feature_key, 
                action, 
                changed_by,
                metadata
            ) VALUES (
                NEW.contractor_id,
                NEW.feature_key,
                CASE WHEN NEW.is_enabled THEN 'enabled' ELSE 'disabled' END,
                COALESCE(NEW.enabled_by, auth.uid()),
                jsonb_build_object(
                    'operation', 'update',
                    'old_enabled', OLD.is_enabled,
                    'new_enabled', NEW.is_enabled
                )
            );
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$;

-- Create trigger for feature access logging
CREATE TRIGGER log_feature_access_changes
    AFTER INSERT OR UPDATE ON contractor_feature_access
    FOR EACH ROW
    EXECUTE FUNCTION log_feature_access_change();

-- Create updated_at trigger for tables
CREATE TRIGGER update_contractor_features_updated_at
    BEFORE UPDATE ON contractor_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractor_feature_access_updated_at
    BEFORE UPDATE ON contractor_feature_access
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();