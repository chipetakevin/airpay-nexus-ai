-- Advanced MVNE Compliance: Next-Generation Features

-- 1. Microservices Architecture Management
CREATE TABLE public.microservices_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(255) NOT NULL UNIQUE,
    service_type VARCHAR(100) NOT NULL, -- billing, provisioning, analytics, support, orchestration
    container_image VARCHAR(500),
    deployment_status VARCHAR(50) DEFAULT 'pending',
    health_check_endpoint TEXT,
    resource_requirements JSONB DEFAULT '{}',
    environment_config JSONB DEFAULT '{}',
    scaling_config JSONB DEFAULT '{}',
    last_health_check TIMESTAMP WITH TIME ZONE,
    cpu_usage DECIMAL(5,2) DEFAULT 0.00,
    memory_usage DECIMAL(5,2) DEFAULT 0.00,
    response_time_ms INTEGER DEFAULT 0,
    error_rate DECIMAL(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Low-Code Workflow Builder
CREATE TABLE public.workflow_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- onboarding, billing, support, compliance
    description TEXT,
    visual_config JSONB NOT NULL, -- nodes, connections, coordinates
    business_logic JSONB NOT NULL, -- conditions, actions, triggers
    input_schema JSONB DEFAULT '{}',
    output_schema JSONB DEFAULT '{}',
    complexity_level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
    estimated_duration_minutes INTEGER,
    success_criteria JSONB DEFAULT '{}',
    is_template BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES public.workflow_orchestrations(id),
    template_id UUID REFERENCES public.workflow_templates(id),
    execution_context JSONB NOT NULL,
    current_step VARCHAR(255),
    execution_status VARCHAR(50) DEFAULT 'running', -- running, completed, failed, paused
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    steps_completed INTEGER DEFAULT 0,
    total_steps INTEGER,
    error_details JSONB DEFAULT '{}',
    performance_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Advanced Fraud Detection System
CREATE TABLE public.fraud_detection_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(100) NOT NULL, -- velocity, pattern, anomaly, geographic, behavioral
    ai_model_version VARCHAR(50),
    detection_criteria JSONB NOT NULL,
    risk_score_threshold DECIMAL(5,2) NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- block, review, alert, log
    confidence_threshold DECIMAL(5,2) DEFAULT 0.75,
    false_positive_rate DECIMAL(5,2) DEFAULT 0.00,
    detection_rate DECIMAL(5,2) DEFAULT 0.00,
    is_ml_enhanced BOOLEAN DEFAULT false,
    training_data_size INTEGER DEFAULT 0,
    last_model_update TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.fraud_detection_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID,
    rule_id UUID REFERENCES public.fraud_detection_rules(id),
    customer_id UUID,
    alert_type VARCHAR(100) NOT NULL,
    risk_score DECIMAL(5,2) NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    detection_reason TEXT NOT NULL,
    ai_analysis JSONB DEFAULT '{}',
    transaction_details JSONB NOT NULL,
    behavioral_patterns JSONB DEFAULT '{}',
    geographic_data JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'pending', -- pending, investigating, resolved, false_positive
    investigated_by UUID,
    investigation_notes TEXT,
    resolution_action VARCHAR(100),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. 24/7 Monitoring Dashboard System
CREATE TABLE public.system_health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.microservices_registry(id),
    metric_type VARCHAR(100) NOT NULL, -- cpu, memory, disk, network, response_time, throughput
    metric_value DECIMAL(15,4) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    threshold_warning DECIMAL(15,4),
    threshold_critical DECIMAL(15,4),
    status VARCHAR(50) NOT NULL, -- healthy, warning, critical
    alert_triggered BOOLEAN DEFAULT false,
    alert_sent_at TIMESTAMP WITH TIME ZONE,
    auto_scaling_triggered BOOLEAN DEFAULT false,
    recovery_action JSONB DEFAULT '{}',
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.real_time_dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dashboard_name VARCHAR(255) NOT NULL,
    dashboard_type VARCHAR(100) NOT NULL, -- operations, business, technical, executive
    widget_configuration JSONB NOT NULL,
    data_sources JSONB NOT NULL,
    refresh_interval_seconds INTEGER DEFAULT 30,
    alert_configuration JSONB DEFAULT '{}',
    access_permissions JSONB DEFAULT '{}',
    auto_refresh BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    created_by UUID,
    last_accessed TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. CDR Processing System
CREATE TABLE public.cdr_processing_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mno_provider VARCHAR(255) NOT NULL,
    cdr_format VARCHAR(100) NOT NULL, -- asn1, csv, xml, json
    processing_rules JSONB NOT NULL,
    field_mappings JSONB NOT NULL,
    validation_rules JSONB DEFAULT '{}',
    enrichment_rules JSONB DEFAULT '{}',
    billing_rules JSONB DEFAULT '{}',
    batch_size INTEGER DEFAULT 1000,
    processing_frequency VARCHAR(50) DEFAULT 'real_time', -- real_time, hourly, daily
    error_handling_strategy VARCHAR(100) DEFAULT 'retry_with_dlq',
    data_retention_days INTEGER DEFAULT 365,
    compression_enabled BOOLEAN DEFAULT true,
    encryption_enabled BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.cdr_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cdr_id VARCHAR(255) NOT NULL UNIQUE,
    mno_provider VARCHAR(255) NOT NULL,
    record_type VARCHAR(50) NOT NULL, -- voice, sms, data, mms
    calling_party VARCHAR(50),
    called_party VARCHAR(50),
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    data_volume_mb DECIMAL(15,6),
    location_info JSONB DEFAULT '{}',
    service_info JSONB DEFAULT '{}',
    charging_info JSONB NOT NULL,
    quality_metrics JSONB DEFAULT '{}',
    processing_status VARCHAR(50) DEFAULT 'pending',
    billing_status VARCHAR(50) DEFAULT 'pending',
    validation_errors JSONB DEFAULT '[]',
    enriched_data JSONB DEFAULT '{}',
    processed_at TIMESTAMP WITH TIME ZONE,
    billed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.cdr_processing_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    processing_date DATE NOT NULL,
    mno_provider VARCHAR(255) NOT NULL,
    total_records_received INTEGER DEFAULT 0,
    total_records_processed INTEGER DEFAULT 0,
    total_records_failed INTEGER DEFAULT 0,
    processing_time_seconds INTEGER DEFAULT 0,
    data_volume_processed_gb DECIMAL(15,4) DEFAULT 0,
    revenue_calculated DECIMAL(15,4) DEFAULT 0,
    error_rate DECIMAL(5,2) DEFAULT 0,
    processing_efficiency DECIMAL(5,2) DEFAULT 0,
    peak_throughput_per_second INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create performance indexes
CREATE INDEX idx_microservices_health ON public.microservices_registry(last_health_check, is_active);
CREATE INDEX idx_workflow_executions_status ON public.workflow_executions(execution_status, started_at);
CREATE INDEX idx_fraud_alerts_risk ON public.fraud_detection_alerts(risk_score DESC, created_at);
CREATE INDEX idx_health_metrics_time ON public.system_health_metrics(measured_at, service_id);
CREATE INDEX idx_cdr_processing_time ON public.cdr_records(start_time, mno_provider);
CREATE INDEX idx_cdr_billing_status ON public.cdr_records(billing_status, processing_status);

-- Enable RLS on all new tables
ALTER TABLE public.microservices_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_detection_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_detection_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_time_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cdr_processing_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cdr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cdr_processing_stats ENABLE ROW LEVEL SECURITY;

-- Admin-only access policies for advanced features
CREATE POLICY "Admins can manage microservices" ON public.microservices_registry
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage workflow templates" ON public.workflow_templates
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view workflow executions" ON public.workflow_executions
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage fraud detection" ON public.fraud_detection_rules
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view fraud alerts" ON public.fraud_detection_alerts
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view system metrics" ON public.system_health_metrics
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage dashboards" ON public.real_time_dashboards
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can manage CDR configs" ON public.cdr_processing_configs
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view CDR records" ON public.cdr_records
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

CREATE POLICY "Admins can view CDR stats" ON public.cdr_processing_stats
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin' 
        AND is_active = true
    )
);

-- Advanced MVNE Functions
CREATE OR REPLACE FUNCTION public.calculate_fraud_risk_score(
    p_transaction_amount DECIMAL,
    p_customer_id UUID,
    p_transaction_location JSONB DEFAULT '{}'
)
RETURNS DECIMAL(5,2)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    risk_score DECIMAL(5,2) := 0.0;
    avg_transaction DECIMAL(15,4);
    transaction_count INTEGER;
    location_risk DECIMAL(3,2) := 0.0;
BEGIN
    -- Calculate average transaction amount for customer
    SELECT AVG(amount), COUNT(*) 
    INTO avg_transaction, transaction_count
    FROM public.mvne_compliant_transactions
    WHERE customer_id = p_customer_id
    AND created_at >= NOW() - INTERVAL '30 days';
    
    -- Velocity check - unusually high amount
    IF p_transaction_amount > (avg_transaction * 5) THEN
        risk_score := risk_score + 0.3;
    END IF;
    
    -- Frequency check - too many transactions
    IF transaction_count > 50 THEN
        risk_score := risk_score + 0.2;
    END IF;
    
    -- Geographic risk (simplified)
    IF p_transaction_location->>'country' != 'ZA' THEN
        risk_score := risk_score + 0.4;
    END IF;
    
    -- Cap at maximum risk
    risk_score := LEAST(risk_score, 1.0);
    
    RETURN risk_score;
END;
$$;

CREATE OR REPLACE FUNCTION public.process_cdr_batch(
    p_mno_provider TEXT,
    p_batch_size INTEGER DEFAULT 1000
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    processed_count INTEGER := 0;
    failed_count INTEGER := 0;
    total_revenue DECIMAL(15,4) := 0;
    processing_start TIMESTAMP := NOW();
    result JSONB;
BEGIN
    -- Process pending CDR records in batches
    UPDATE public.cdr_records 
    SET processing_status = 'processing'
    WHERE mno_provider = p_mno_provider
    AND processing_status = 'pending'
    AND id IN (
        SELECT id FROM public.cdr_records 
        WHERE mno_provider = p_mno_provider
        AND processing_status = 'pending'
        LIMIT p_batch_size
    );
    
    GET DIAGNOSTICS processed_count = ROW_COUNT;
    
    -- Simulate processing and calculate revenue
    total_revenue := processed_count * 0.25; -- Average revenue per record
    
    -- Update processed records
    UPDATE public.cdr_records 
    SET 
        processing_status = 'completed',
        processed_at = NOW(),
        billing_status = 'billed',
        billed_at = NOW()
    WHERE mno_provider = p_mno_provider
    AND processing_status = 'processing';
    
    -- Create processing stats record
    INSERT INTO public.cdr_processing_stats (
        processing_date,
        mno_provider,
        total_records_processed,
        processing_time_seconds,
        revenue_calculated,
        processing_efficiency
    ) VALUES (
        CURRENT_DATE,
        p_mno_provider,
        processed_count,
        EXTRACT(EPOCH FROM (NOW() - processing_start))::INTEGER,
        total_revenue,
        CASE WHEN processed_count > 0 THEN 100.0 ELSE 0.0 END
    );
    
    result := jsonb_build_object(
        'processed_count', processed_count,
        'failed_count', failed_count,
        'total_revenue', total_revenue,
        'processing_time_seconds', EXTRACT(EPOCH FROM (NOW() - processing_start))
    );
    
    RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.trigger_health_check_alerts()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    service_record RECORD;
    alert_message TEXT;
BEGIN
    FOR service_record IN 
        SELECT * FROM public.microservices_registry 
        WHERE is_active = true 
        AND (
            cpu_usage > 80 
            OR memory_usage > 85 
            OR response_time_ms > 5000 
            OR error_rate > 5
        )
    LOOP
        alert_message := format(
            'Service %s is experiencing issues: CPU: %s%%, Memory: %s%%, Response Time: %sms, Error Rate: %s%%',
            service_record.service_name,
            service_record.cpu_usage,
            service_record.memory_usage,
            service_record.response_time_ms,
            service_record.error_rate
        );
        
        -- Log alert (in real implementation, send to monitoring system)
        INSERT INTO public.api_access_logs (api_endpoint, method, user_id)
        VALUES (
            'health_check_alert',
            'ALERT',
            NULL
        );
    END LOOP;
END;
$$;