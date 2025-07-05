-- Self-Healing Error Handling System
-- This system tracks, analyzes, and manages errors across all components

-- Create error logs table for comprehensive error tracking
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  component_name TEXT NOT NULL,
  error_type TEXT NOT NULL, -- 'runtime', 'ui', 'network', 'validation', 'database'
  error_message TEXT NOT NULL,
  error_stack TEXT,
  error_code TEXT,
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  
  -- Context Information
  user_agent TEXT,
  ip_address INET,
  route_path TEXT,
  form_data JSONB,
  component_props JSONB,
  browser_info JSONB,
  
  -- Error Analysis
  error_category TEXT, -- 'recoverable', 'non-recoverable', 'user-error'
  potential_fix TEXT,
  auto_fix_attempted BOOLEAN DEFAULT false,
  auto_fix_successful BOOLEAN DEFAULT false,
  
  -- Resolution Tracking
  status TEXT DEFAULT 'open', -- 'open', 'analyzing', 'pending_approval', 'approved', 'denied', 'resolved'
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID,
  resolution_method TEXT, -- 'auto', 'manual', 'user-action'
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Frequency tracking
  occurrence_count INTEGER DEFAULT 1,
  last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create error reports table for daily summaries
CREATE TABLE IF NOT EXISTS public.error_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Summary Statistics
  total_errors INTEGER DEFAULT 0,
  critical_errors INTEGER DEFAULT 0,
  high_errors INTEGER DEFAULT 0,
  medium_errors INTEGER DEFAULT 0,
  low_errors INTEGER DEFAULT 0,
  
  -- Auto-healing Statistics
  auto_fixes_attempted INTEGER DEFAULT 0,
  auto_fixes_successful INTEGER DEFAULT 0,
  manual_fixes_pending INTEGER DEFAULT 0,
  
  -- Component Breakdown
  component_errors JSONB DEFAULT '{}',
  error_trends JSONB DEFAULT '{}',
  
  -- Report Content
  report_data JSONB NOT NULL,
  recommendations JSONB DEFAULT '[]',
  
  -- Distribution Status
  report_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipients TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create error fix requests table for manual approval
CREATE TABLE IF NOT EXISTS public.error_fix_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  error_log_id UUID REFERENCES public.error_logs(id) NOT NULL,
  
  -- Fix Details
  fix_type TEXT NOT NULL, -- 'component_restart', 'data_correction', 'config_update', 'code_patch'
  fix_description TEXT NOT NULL,
  fix_code TEXT, -- Proposed fix code
  risk_level TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  
  -- Approval Process
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'denied', 'implemented'
  requested_by TEXT DEFAULT 'system',
  reviewed_by UUID,
  review_notes TEXT,
  
  -- Implementation
  implemented_at TIMESTAMP WITH TIME ZONE,
  implementation_result TEXT,
  rollback_available BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create system health metrics table
CREATE TABLE IF NOT EXISTS public.system_health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Component Health
  component_name TEXT NOT NULL,
  health_score DECIMAL(5,2) DEFAULT 100.00, -- 0-100
  availability_percentage DECIMAL(5,2) DEFAULT 100.00,
  error_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- Performance Metrics
  avg_response_time INTEGER DEFAULT 0, -- milliseconds
  memory_usage DECIMAL(10,2) DEFAULT 0.00,
  cpu_usage DECIMAL(5,2) DEFAULT 0.00,
  
  -- Healing Statistics
  self_healing_events INTEGER DEFAULT 0,
  manual_interventions INTEGER DEFAULT 0,
  uptime_hours DECIMAL(10,2) DEFAULT 0.00,
  
  -- Trend Data
  trend_direction TEXT DEFAULT 'stable', -- 'improving', 'stable', 'degrading'
  last_incident TIMESTAMP WITH TIME ZONE,
  recovery_time INTEGER DEFAULT 0, -- seconds
  
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_fix_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for error logs
CREATE POLICY "Users can view their own error logs"
ON public.error_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert error logs"
ON public.error_logs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all error logs"
ON public.error_logs
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- Create RLS policies for error reports
CREATE POLICY "Admins can manage error reports"
ON public.error_reports
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- Create RLS policies for fix requests
CREATE POLICY "Admins can manage fix requests"
ON public.error_fix_requests
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- Create RLS policies for health metrics
CREATE POLICY "System can insert health metrics"
ON public.system_health_metrics
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view health metrics"
ON public.system_health_metrics
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid()
  AND role = 'admin'::user_role
  AND is_active = true
));

-- Create function for automatic error analysis
CREATE OR REPLACE FUNCTION public.analyze_error_patterns()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update error categories based on patterns
  UPDATE public.error_logs
  SET error_category = CASE
    WHEN error_type = 'network' AND error_message ILIKE '%timeout%' THEN 'recoverable'
    WHEN error_type = 'validation' THEN 'user-error'
    WHEN error_type = 'database' AND error_message ILIKE '%connection%' THEN 'recoverable'
    WHEN severity = 'critical' THEN 'non-recoverable'
    ELSE 'recoverable'
  END
  WHERE error_category IS NULL;

  -- Generate potential fixes
  UPDATE public.error_logs
  SET potential_fix = CASE
    WHEN error_type = 'network' AND error_message ILIKE '%timeout%' THEN 'Retry with exponential backoff'
    WHEN error_type = 'validation' THEN 'Show user-friendly validation message'
    WHEN error_type = 'ui' AND error_message ILIKE '%render%' THEN 'Component restart with error boundary'
    WHEN error_type = 'database' THEN 'Connection pool refresh'
    ELSE 'Manual investigation required'
  END
  WHERE potential_fix IS NULL;
END;
$$;

-- Create function for system health calculation
CREATE OR REPLACE FUNCTION public.calculate_component_health(component_name_param TEXT)
RETURNS DECIMAL
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  error_count INTEGER;
  total_requests INTEGER;
  health_score DECIMAL;
BEGIN
  -- Get error count for last 24 hours
  SELECT COUNT(*)
  INTO error_count
  FROM public.error_logs
  WHERE component_name = component_name_param
  AND created_at >= NOW() - INTERVAL '24 hours';

  -- Estimate total requests (simplified calculation)
  total_requests := GREATEST(error_count * 10, 100);

  -- Calculate health score (100 - error percentage)
  health_score := GREATEST(0, 100 - (error_count::DECIMAL / total_requests * 100));

  RETURN health_score;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_error_logs_updated_at
  BEFORE UPDATE ON public.error_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_error_reports_updated_at
  BEFORE UPDATE ON public.error_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_error_fix_requests_updated_at
  BEFORE UPDATE ON public.error_fix_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_error_logs_component_name ON public.error_logs(component_name);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON public.error_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON public.error_logs(severity);
CREATE INDEX IF NOT EXISTS idx_error_logs_status ON public.error_logs(status);
CREATE INDEX IF NOT EXISTS idx_error_reports_date ON public.error_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_system_health_component ON public.system_health_metrics(component_name);
CREATE INDEX IF NOT EXISTS idx_system_health_recorded_at ON public.system_health_metrics(recorded_at);