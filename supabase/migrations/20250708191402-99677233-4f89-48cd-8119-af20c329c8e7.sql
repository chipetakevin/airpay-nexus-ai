-- Create core MVNE architecture tables for automated scalable workflow

-- 1. MVNO Management (Multi-tenancy support)
CREATE TABLE public.mvno_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mvno_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255) NOT NULL,
    business_model VARCHAR(100) NOT NULL, -- prepaid, postpaid, hybrid
    onboarding_status VARCHAR(50) DEFAULT 'pending',
    contract_start_date DATE,
    contract_end_date DATE,
    isolated_environment_config JSONB DEFAULT '{}',
    branding_config JSONB DEFAULT '{}',
    pricing_config JSONB DEFAULT '{}',
    customer_base_limit INTEGER,
    revenue_share_percentage DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Subscriber Management (Enhanced customer lifecycle)
CREATE TABLE public.subscriber_lifecycle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    lifecycle_stage VARCHAR(50) NOT NULL, -- registration, kyc, activation, active, suspended, terminated
    onboarding_completed_at TIMESTAMP WITH TIME ZONE,
    kyc_verification_method VARCHAR(100),
    esim_provisioned BOOLEAN DEFAULT false,
    instant_activation_enabled BOOLEAN DEFAULT true,
    automated_support_enabled BOOLEAN DEFAULT true,
    churn_risk_score DECIMAL(3,2) DEFAULT 0.00,
    engagement_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Real-time Billing Engine
CREATE TABLE public.real_time_billing_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscriber_id UUID NOT NULL,
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    event_type VARCHAR(100) NOT NULL, -- call, sms, data, service_charge
    usage_amount DECIMAL(15,6),
    usage_unit VARCHAR(20), -- minutes, sms_count, mb, gb
    rated_amount DECIMAL(15,4),
    currency VARCHAR(3) DEFAULT 'ZAR',
    rating_engine_version VARCHAR(50),
    fraud_check_passed BOOLEAN DEFAULT true,
    real_time_charged BOOLEAN DEFAULT true,
    billing_cycle_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    processed_at TIMESTAMP WITH TIME ZONE,
    reconciliation_status VARCHAR(50) DEFAULT 'pending'
);

-- 4. API Gateway Configuration
CREATE TABLE public.api_gateway_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    api_name VARCHAR(255) NOT NULL,
    endpoint_url TEXT NOT NULL,
    authentication_method VARCHAR(100) NOT NULL,
    rate_limit_per_minute INTEGER DEFAULT 1000,
    version VARCHAR(50) NOT NULL,
    tm_forum_certified BOOLEAN DEFAULT false,
    integration_status VARCHAR(50) DEFAULT 'pending',
    health_check_url TEXT,
    monitoring_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Workflow Orchestration Engine
CREATE TABLE public.workflow_orchestrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name VARCHAR(255) NOT NULL,
    workflow_type VARCHAR(100) NOT NULL, -- onboarding, billing, support, provisioning
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    automation_level VARCHAR(50) DEFAULT 'full', -- full, partial, manual
    steps_configuration JSONB NOT NULL,
    error_handling_config JSONB DEFAULT '{}',
    retry_policy JSONB DEFAULT '{}',
    sla_requirements JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    success_rate DECIMAL(5,2) DEFAULT 0.00,
    avg_execution_time_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. Real-time Analytics & KPI Tracking
CREATE TABLE public.mvne_analytics_kpis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    kpi_type VARCHAR(100) NOT NULL, -- onboarding_time, billing_accuracy, support_resolution, churn_rate
    measurement_value DECIMAL(15,4),
    measurement_unit VARCHAR(50),
    measurement_period VARCHAR(50), -- daily, weekly, monthly
    target_value DECIMAL(15,4),
    threshold_min DECIMAL(15,4),
    threshold_max DECIMAL(15,4),
    automated_alert_triggered BOOLEAN DEFAULT false,
    improvement_suggestions JSONB DEFAULT '[]',
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. Automated Support & Ticket Management
CREATE TABLE public.automated_support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscriber_id UUID NOT NULL,
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    ticket_type VARCHAR(100) NOT NULL,
    severity_level VARCHAR(50) NOT NULL,
    auto_resolved BOOLEAN DEFAULT false,
    chatbot_handled BOOLEAN DEFAULT false,
    escalation_level INTEGER DEFAULT 0,
    resolution_time_minutes INTEGER,
    customer_satisfaction_score DECIMAL(3,2),
    automated_response TEXT,
    final_resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 8. Compliance & Regulatory Automation
CREATE TABLE public.regulatory_automation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    regulation_type VARCHAR(100) NOT NULL, -- popia, icasa, rica
    compliance_check_type VARCHAR(100) NOT NULL,
    automated_report_generated BOOLEAN DEFAULT false,
    compliance_score DECIMAL(5,2),
    violations_detected JSONB DEFAULT '[]',
    corrective_actions JSONB DEFAULT '[]',
    next_check_due TIMESTAMP WITH TIME ZONE,
    last_checked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. eSIM Provisioning Automation
CREATE TABLE public.esim_provisioning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscriber_id UUID NOT NULL,
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    eid VARCHAR(255) NOT NULL,
    iccid VARCHAR(255) NOT NULL,
    provisioning_method VARCHAR(50) DEFAULT 'qr_code', -- qr_code, activation_code, api
    instant_activation BOOLEAN DEFAULT true,
    activation_code VARCHAR(255),
    qr_code_url TEXT,
    download_status VARCHAR(50) DEFAULT 'pending',
    activation_attempts INTEGER DEFAULT 0,
    provisioned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    activated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 10. Revenue Management & Reconciliation
CREATE TABLE public.revenue_reconciliation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mvno_partner_id UUID REFERENCES public.mvno_partners(id),
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    total_revenue DECIMAL(15,4),
    mno_settlement_amount DECIMAL(15,4),
    mvne_fee DECIMAL(15,4),
    mvno_share DECIMAL(15,4),
    discrepancies_detected JSONB DEFAULT '[]',
    auto_reconciled BOOLEAN DEFAULT false,
    manual_review_required BOOLEAN DEFAULT false,
    reconciliation_status VARCHAR(50) DEFAULT 'pending',
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_mvno_partners_active ON public.mvno_partners(is_active);
CREATE INDEX idx_subscriber_lifecycle_stage ON public.subscriber_lifecycle(lifecycle_stage);
CREATE INDEX idx_billing_events_timestamp ON public.real_time_billing_events(timestamp);
CREATE INDEX idx_api_gateway_mvno ON public.api_gateway_configs(mvno_partner_id);
CREATE INDEX idx_workflows_active ON public.workflow_orchestrations(is_active);
CREATE INDEX idx_analytics_kpi_type ON public.mvne_analytics_kpis(kpi_type);
CREATE INDEX idx_support_tickets_severity ON public.automated_support_tickets(severity_level);

-- Enable RLS on all tables
ALTER TABLE public.mvno_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriber_lifecycle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_time_billing_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_gateway_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_orchestrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mvne_analytics_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automated_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_automation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esim_provisioning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_reconciliation ENABLE ROW LEVEL SECURITY;

-- Create admin-only access policies
CREATE POLICY "Admins can manage all MVNO data" ON public.mvno_partners
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

-- Apply similar policies to other tables
CREATE POLICY "Admins can manage subscriber lifecycle" ON public.subscriber_lifecycle
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage billing events" ON public.real_time_billing_events
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage API configs" ON public.api_gateway_configs
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage workflows" ON public.workflow_orchestrations
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view analytics" ON public.mvne_analytics_kpis
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage support tickets" ON public.automated_support_tickets
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage regulatory automation" ON public.regulatory_automation
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage eSIM provisioning" ON public.esim_provisioning
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage revenue reconciliation" ON public.revenue_reconciliation
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

-- Add helpful functions for MVNE operations
CREATE OR REPLACE FUNCTION public.calculate_mvno_churn_rate(p_mvno_id UUID, p_period_months INTEGER DEFAULT 1)
RETURNS DECIMAL(5,2)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    total_subscribers INTEGER;
    churned_subscribers INTEGER;
    churn_rate DECIMAL(5,2);
BEGIN
    SELECT COUNT(*) INTO total_subscribers
    FROM public.subscriber_lifecycle
    WHERE mvno_partner_id = p_mvno_id
    AND lifecycle_stage = 'active';
    
    SELECT COUNT(*) INTO churned_subscribers
    FROM public.subscriber_lifecycle
    WHERE mvno_partner_id = p_mvno_id
    AND lifecycle_stage = 'terminated'
    AND updated_at >= NOW() - (p_period_months || ' months')::INTERVAL;
    
    IF total_subscribers > 0 THEN
        churn_rate := (churned_subscribers::DECIMAL / total_subscribers) * 100;
    ELSE
        churn_rate := 0;
    END IF;
    
    RETURN churn_rate;
END;
$$;

CREATE OR REPLACE FUNCTION public.trigger_automated_workflow(p_workflow_name TEXT, p_mvno_id UUID, p_context JSONB DEFAULT '{}')
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    workflow_id UUID;
    execution_id UUID;
BEGIN
    SELECT id INTO workflow_id
    FROM public.workflow_orchestrations
    WHERE workflow_name = p_workflow_name
    AND mvno_partner_id = p_mvno_id
    AND is_active = true;
    
    IF workflow_id IS NOT NULL THEN
        -- Log workflow execution (you would expand this)
        INSERT INTO public.api_access_logs (api_endpoint, method, user_id)
        VALUES ('workflow_execution', 'POST', auth.uid())
        RETURNING id INTO execution_id;
    END IF;
    
    RETURN execution_id;
END;
$$;