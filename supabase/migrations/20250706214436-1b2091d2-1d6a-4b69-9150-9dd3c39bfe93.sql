-- Create table for SMS campaign logs
CREATE TABLE IF NOT EXISTS public.sms_campaign_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name TEXT NOT NULL,
  sender_name TEXT DEFAULT 'Divine Mobile',
  message_content TEXT NOT NULL,
  total_recipients INTEGER NOT NULL DEFAULT 0,
  total_sent INTEGER NOT NULL DEFAULT 0,
  total_failed INTEGER NOT NULL DEFAULT 0,
  total_cost DECIMAL(10,2) DEFAULT 0.00,
  success_rate TEXT,
  failed_recipients JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  campaign_status TEXT DEFAULT 'completed',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS on SMS campaign logs
ALTER TABLE public.sms_campaign_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for SMS campaign logs
CREATE POLICY "Admins can manage SMS campaigns" ON public.sms_campaign_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_sms_campaigns_created_at ON public.sms_campaign_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sms_campaigns_status ON public.sms_campaign_logs(campaign_status);

-- Create function to log bulk operations
CREATE OR REPLACE FUNCTION public.log_bulk_operation(
  operation_type TEXT,
  operation_data JSONB,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.bulk_operation_logs (
    operation_type,
    operation_data,
    success_count,
    failure_count,
    executed_by,
    executed_at
  ) VALUES (
    operation_type,
    operation_data,
    success_count,
    failure_count,
    auth.uid(),
    now()
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Create bulk operation logs table
CREATE TABLE IF NOT EXISTS public.bulk_operation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_type TEXT NOT NULL,
  operation_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  executed_by UUID REFERENCES auth.users(id),
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  duration_seconds INTEGER,
  status TEXT DEFAULT 'completed'
);

-- Enable RLS on bulk operation logs
ALTER TABLE public.bulk_operation_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for bulk operation logs
CREATE POLICY "Admins can view bulk operation logs" ON public.bulk_operation_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_bulk_operations_type ON public.bulk_operation_logs(operation_type);
CREATE INDEX IF NOT EXISTS idx_bulk_operations_executed_at ON public.bulk_operation_logs(executed_at DESC);