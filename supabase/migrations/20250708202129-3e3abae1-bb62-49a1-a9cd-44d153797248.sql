-- Create USSD notification and SIM activation system tables

-- South African languages support
CREATE TABLE public.south_african_languages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language_code varchar(5) NOT NULL UNIQUE,
  language_name varchar(50) NOT NULL,
  native_name varchar(50) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Insert supported South African languages
INSERT INTO public.south_african_languages (language_code, language_name, native_name) VALUES
('en', 'English', 'English'),
('zu', 'isiZulu', 'isiZulu'),
('xh', 'isiXhosa', 'isiXhosa'),
('af', 'Afrikaans', 'Afrikaans'),
('st', 'Sesotho', 'Sesotho'),
('tn', 'Setswana', 'Setswana'),
('nso', 'Sepedi', 'Sepedi'),
('ts', 'Xitsonga', 'Xitsonga'),
('ve', 'Tshivenda', 'Tshivenda'),
('nr', 'isiNdebele', 'isiNdebele');

-- USSD user preferences and opt-in/out management
CREATE TABLE public.ussd_user_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number varchar(20) NOT NULL,
  preferred_language varchar(5) DEFAULT 'en',
  is_opted_in boolean DEFAULT false,
  opted_in_at timestamp with time zone,
  opted_out_at timestamp with time zone,
  sim_iccid varchar(50),
  rica_status varchar(20) DEFAULT 'pending',
  activation_status varchar(20) DEFAULT 'pending',
  last_interaction_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  FOREIGN KEY (preferred_language) REFERENCES south_african_languages(language_code)
);

-- USSD notification campaigns for bulk messaging
CREATE TABLE public.ussd_notification_campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_name varchar(100) NOT NULL,
  campaign_type varchar(20) DEFAULT 'sim_activation', -- 'sim_activation', 'rica_reminder', 'bulk_notification'
  message_template jsonb NOT NULL, -- Stores templates for all languages
  target_audience varchar(20) DEFAULT 'all', -- 'all', 'pending_activation', 'rica_pending'
  total_recipients integer DEFAULT 0,
  messages_sent integer DEFAULT 0,
  messages_delivered integer DEFAULT 0,
  messages_failed integer DEFAULT 0,
  campaign_status varchar(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'running', 'completed', 'paused'
  scheduled_at timestamp with time zone,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- USSD session states for maintaining context
CREATE TABLE public.ussd_session_states (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id varchar(100) NOT NULL UNIQUE,
  phone_number varchar(20) NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  current_menu varchar(50),
  session_data jsonb DEFAULT '{}',
  language_preference varchar(5) DEFAULT 'en',
  session_status varchar(20) DEFAULT 'active', -- 'active', 'completed', 'expired'
  last_activity_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT (now() + interval '10 minutes'),
  created_at timestamp with time zone DEFAULT now(),
  FOREIGN KEY (language_preference) REFERENCES south_african_languages(language_code)
);

-- SIM activation requests tracking
CREATE TABLE public.sim_activation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number varchar(20) NOT NULL,
  sim_iccid varchar(50) NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  activation_method varchar(20) DEFAULT 'ussd', -- 'ussd', 'sms', 'web'
  activation_status varchar(20) DEFAULT 'initiated', -- 'initiated', 'in_progress', 'completed', 'failed'
  rica_required boolean DEFAULT true,
  rica_status varchar(20) DEFAULT 'pending',
  activation_code varchar(10),
  language_preference varchar(5) DEFAULT 'en',
  activation_attempts integer DEFAULT 0,
  last_attempt_at timestamp with time zone,
  completed_at timestamp with time zone,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  FOREIGN KEY (language_preference) REFERENCES south_african_languages(language_code)
);

-- USSD notification logs for tracking
CREATE TABLE public.ussd_notification_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid REFERENCES ussd_notification_campaigns(id),
  phone_number varchar(20) NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  message_type varchar(20) DEFAULT 'ussd', -- 'ussd', 'sms'
  message_content text NOT NULL,
  language_used varchar(5) DEFAULT 'en',
  delivery_status varchar(20) DEFAULT 'sent', -- 'sent', 'delivered', 'failed', 'pending'
  response_received text,
  session_id varchar(100),
  delivery_attempt integer DEFAULT 1,
  sent_at timestamp with time zone DEFAULT now(),
  delivered_at timestamp with time zone,
  failed_at timestamp with time zone,
  error_message text,
  metadata jsonb DEFAULT '{}',
  FOREIGN KEY (language_used) REFERENCES south_african_languages(language_code)
);

-- USSD menu configurations for multi-language support
CREATE TABLE public.ussd_menu_configurations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_key varchar(50) NOT NULL,
  language_code varchar(5) NOT NULL,
  menu_text text NOT NULL,
  menu_options jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  FOREIGN KEY (language_code) REFERENCES south_african_languages(language_code),
  UNIQUE(menu_key, language_code)
);

-- Insert default menu configurations for English
INSERT INTO public.ussd_menu_configurations (menu_key, language_code, menu_text, menu_options) VALUES
('main_menu', 'en', 'Welcome to Divine Mobile\n1. Activate SIM\n2. Check Status\n3. Language\n9. Unsubscribe\n0. Exit', '{"1": "activate_sim", "2": "check_status", "3": "language_menu", "9": "unsubscribe", "0": "exit"}'),
('activation_menu', 'en', 'SIM Activation\n1. Start Activation\n2. Enter RICA Code\n3. Get Help\n9. Main Menu\n0. Exit', '{"1": "start_activation", "2": "rica_code", "3": "help", "9": "main_menu", "0": "exit"}'),
('language_menu', 'en', 'Select Language:\n1. English\n2. isiZulu\n3. isiXhosa\n4. Afrikaans\n5. Sesotho\n9. Back\n0. Exit', '{"1": "en", "2": "zu", "3": "xh", "4": "af", "5": "st", "9": "main_menu", "0": "exit"}'),
('opt_out_confirm', 'en', 'Are you sure you want to unsubscribe?\n1. Yes, unsubscribe\n2. No, keep me subscribed\n0. Exit', '{"1": "confirm_unsubscribe", "2": "main_menu", "0": "exit"}');

-- Create indexes for performance
CREATE INDEX idx_ussd_user_preferences_phone ON ussd_user_preferences(phone_number);
CREATE INDEX idx_ussd_user_preferences_sim ON ussd_user_preferences(sim_iccid);
CREATE INDEX idx_ussd_session_states_phone ON ussd_session_states(phone_number);
CREATE INDEX idx_ussd_session_states_session_id ON ussd_session_states(session_id);
CREATE INDEX idx_sim_activation_requests_phone ON sim_activation_requests(phone_number);
CREATE INDEX idx_sim_activation_requests_sim ON sim_activation_requests(sim_iccid);
CREATE INDEX idx_ussd_notification_logs_campaign ON ussd_notification_logs(campaign_id);
CREATE INDEX idx_ussd_notification_logs_phone ON ussd_notification_logs(phone_number);

-- Enable RLS on all tables
ALTER TABLE public.south_african_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_notification_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_session_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sim_activation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_menu_configurations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for south_african_languages (public read)
CREATE POLICY "Anyone can view languages" ON public.south_african_languages FOR SELECT USING (true);

-- RLS Policies for ussd_user_preferences
CREATE POLICY "Users can manage their own preferences" ON public.ussd_user_preferences
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all preferences" ON public.ussd_user_preferences
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- RLS Policies for ussd_notification_campaigns
CREATE POLICY "Admins can manage campaigns" ON public.ussd_notification_campaigns
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- RLS Policies for ussd_session_states
CREATE POLICY "Users can view their own sessions" ON public.ussd_session_states
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage all sessions" ON public.ussd_session_states
FOR ALL USING (true);

-- RLS Policies for sim_activation_requests
CREATE POLICY "Users can manage their own activation requests" ON public.sim_activation_requests
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all activation requests" ON public.sim_activation_requests
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- RLS Policies for ussd_notification_logs
CREATE POLICY "Admins can view all notification logs" ON public.ussd_notification_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

CREATE POLICY "System can insert notification logs" ON public.ussd_notification_logs
FOR INSERT WITH CHECK (true);

-- RLS Policies for ussd_menu_configurations
CREATE POLICY "Anyone can view menu configurations" ON public.ussd_menu_configurations FOR SELECT USING (true);

CREATE POLICY "Admins can manage menu configurations" ON public.ussd_menu_configurations
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ussd_user_preferences_updated_at 
  BEFORE UPDATE ON ussd_user_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ussd_notification_campaigns_updated_at 
  BEFORE UPDATE ON ussd_notification_campaigns 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sim_activation_requests_updated_at 
  BEFORE UPDATE ON sim_activation_requests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ussd_menu_configurations_updated_at 
  BEFORE UPDATE ON ussd_menu_configurations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();