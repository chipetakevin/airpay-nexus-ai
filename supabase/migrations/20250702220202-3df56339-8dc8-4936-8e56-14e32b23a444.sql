-- Create porting requests table
CREATE TABLE public.porting_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  phone_number TEXT NOT NULL,
  current_network TEXT NOT NULL,
  target_network TEXT NOT NULL,
  request_type TEXT DEFAULT 'individual' CHECK (request_type IN ('individual', 'bulk', 'scheduled')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'document_verification', 'ai_processing', 'npc_submitted', 'approved', 'rejected', 'completed', 'cancelled')),
  progress_percentage INTEGER DEFAULT 0,
  scheduled_cutover TIMESTAMP WITH TIME ZONE,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  documents JSONB DEFAULT '[]',
  ai_verification_result JSONB,
  npc_reference TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create bulk porting batches table
CREATE TABLE public.bulk_porting_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  batch_name TEXT NOT NULL,
  total_numbers INTEGER DEFAULT 0,
  completed_numbers INTEGER DEFAULT 0,
  failed_numbers INTEGER DEFAULT 0,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'partial_failure', 'failed')),
  scheduled_cutover TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create porting notifications table
CREATE TABLE public.porting_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  porting_request_id UUID REFERENCES public.porting_requests(id),
  user_id UUID REFERENCES auth.users(id),
  notification_type TEXT NOT NULL CHECK (notification_type IN ('sms', 'email', 'push', 'webhook')),
  status TEXT NOT NULL,
  message TEXT NOT NULL,
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create porting analytics table
CREATE TABLE public.porting_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  network_from TEXT NOT NULL,
  network_to TEXT NOT NULL,
  total_requests INTEGER DEFAULT 0,
  successful_requests INTEGER DEFAULT 0,
  failed_requests INTEGER DEFAULT 0,
  average_processing_time INTERVAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, network_from, network_to)
);

-- Create API access logs table
CREATE TABLE public.api_access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  api_endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.porting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_porting_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.porting_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.porting_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_access_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for porting_requests
CREATE POLICY "Users can view their own porting requests" 
ON public.porting_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own porting requests" 
ON public.porting_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own porting requests" 
ON public.porting_requests 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for bulk_porting_batches
CREATE POLICY "Users can view their own bulk batches" 
ON public.bulk_porting_batches 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bulk batches" 
ON public.bulk_porting_batches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bulk batches" 
ON public.bulk_porting_batches 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.porting_notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.porting_notifications 
FOR INSERT 
WITH CHECK (true);

-- Analytics and logs are admin-only for now
CREATE POLICY "Admin access to analytics" 
ON public.porting_analytics 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin access to API logs" 
ON public.api_access_logs 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for performance
CREATE INDEX idx_porting_requests_user_id ON public.porting_requests(user_id);
CREATE INDEX idx_porting_requests_status ON public.porting_requests(status);
CREATE INDEX idx_porting_requests_phone_number ON public.porting_requests(phone_number);
CREATE INDEX idx_bulk_batches_user_id ON public.bulk_porting_batches(user_id);
CREATE INDEX idx_notifications_user_id ON public.porting_notifications(user_id);
CREATE INDEX idx_notifications_request_id ON public.porting_notifications(porting_request_id);
CREATE INDEX idx_analytics_date ON public.porting_analytics(date);
CREATE INDEX idx_api_logs_user_id ON public.api_access_logs(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_porting_requests_updated_at
BEFORE UPDATE ON public.porting_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bulk_batches_updated_at
BEFORE UPDATE ON public.bulk_porting_batches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();