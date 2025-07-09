-- Create missing USSD tables for compliance monitoring

-- USSD User Preferences table
CREATE TABLE public.ussd_user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  phone_number TEXT NOT NULL,
  is_opted_in BOOLEAN DEFAULT false,
  opted_in_at TIMESTAMP WITH TIME ZONE,
  opted_out_at TIMESTAMP WITH TIME ZONE,
  preferred_language TEXT DEFAULT 'en',
  last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- USSD Session States table
CREATE TABLE public.ussd_session_states (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  user_id UUID,
  session_status TEXT DEFAULT 'active',
  current_menu TEXT,
  session_data JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '3 minutes'),
  completed_at TIMESTAMP WITH TIME ZONE,
  timeout_at TIMESTAMP WITH TIME ZONE,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.ussd_user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_session_states ENABLE ROW LEVEL SECURITY;

-- RLS policies for ussd_user_preferences
CREATE POLICY "Admins can manage user preferences" 
ON public.ussd_user_preferences 
FOR ALL 
USING (is_admin_simple());

CREATE POLICY "Users can view their own preferences" 
ON public.ussd_user_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert preferences" 
ON public.ussd_user_preferences 
FOR INSERT 
WITH CHECK (true);

-- RLS policies for ussd_session_states
CREATE POLICY "Admins can manage session states" 
ON public.ussd_session_states 
FOR ALL 
USING (is_admin_simple());

CREATE POLICY "Users can view their own sessions" 
ON public.ussd_session_states 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage session states" 
ON public.ussd_session_states 
FOR ALL 
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_ussd_user_preferences_phone ON public.ussd_user_preferences(phone_number);
CREATE INDEX idx_ussd_user_preferences_user_id ON public.ussd_user_preferences(user_id);
CREATE INDEX idx_ussd_session_states_session_id ON public.ussd_session_states(session_id);
CREATE INDEX idx_ussd_session_states_phone ON public.ussd_session_states(phone_number);
CREATE INDEX idx_ussd_session_states_user_id ON public.ussd_session_states(user_id);
CREATE INDEX idx_ussd_session_states_status ON public.ussd_session_states(session_status);

-- Add trigger for updated_at timestamps
CREATE TRIGGER update_ussd_user_preferences_updated_at
  BEFORE UPDATE ON public.ussd_user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ussd_session_states_updated_at
  BEFORE UPDATE ON public.ussd_session_states
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();