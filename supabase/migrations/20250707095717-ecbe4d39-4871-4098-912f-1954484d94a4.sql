-- Create customer accounts table for SIM management
CREATE TABLE public.customer_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  sim_iccid TEXT NOT NULL,
  sim_status TEXT DEFAULT 'active',
  airtime_balance DECIMAL(10,2) DEFAULT 0.00,
  data_balance_mb INTEGER DEFAULT 0,
  last_recharge_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customer transactions table
CREATE TABLE public.customer_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_account_id UUID REFERENCES public.customer_accounts(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL, -- 'airtime', 'data', 'bundle'
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create field worker customer assignments table
CREATE TABLE public.field_worker_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_worker_id UUID REFERENCES public.field_workers(id) ON DELETE CASCADE NOT NULL,
  customer_account_id UUID REFERENCES public.customer_accounts(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  assigned_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(field_worker_id, customer_account_id)
);

-- Create field worker permissions table
CREATE TABLE public.field_worker_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_worker_id UUID REFERENCES public.field_workers(id) ON DELETE CASCADE NOT NULL,
  permission_name TEXT NOT NULL, -- 'manage_sales', 'manage_marketing', 'view_analytics'
  is_enabled BOOLEAN DEFAULT false,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(field_worker_id, permission_name)
);

-- Enable RLS on all new tables
ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_worker_permissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for customer_accounts
CREATE POLICY "Customers can view their own account"
  ON public.customer_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can update their own account"
  ON public.customer_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all customer accounts"
  ON public.customer_accounts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  ));

CREATE POLICY "Field workers can view assigned customers"
  ON public.customer_accounts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.field_worker_customers fwc
    JOIN public.field_workers fw ON fw.id = fwc.field_worker_id
    WHERE fw.user_id = auth.uid() 
    AND fwc.customer_account_id = customer_accounts.id
    AND fwc.is_active = true
  ));

-- RLS policies for customer_transactions
CREATE POLICY "Customers can view their own transactions"
  ON public.customer_transactions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.customer_accounts ca
    WHERE ca.id = customer_transactions.customer_account_id
    AND ca.user_id = auth.uid()
  ));

CREATE POLICY "Customers can insert their own transactions"
  ON public.customer_transactions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.customer_accounts ca
    WHERE ca.id = customer_transactions.customer_account_id
    AND ca.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all transactions"
  ON public.customer_transactions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  ));

-- RLS policies for field_worker_customers
CREATE POLICY "Field workers can view their assignments"
  ON public.field_worker_customers FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.field_workers fw
    WHERE fw.id = field_worker_customers.field_worker_id
    AND fw.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all assignments"
  ON public.field_worker_customers FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  ));

-- RLS policies for field_worker_permissions
CREATE POLICY "Field workers can view their permissions"
  ON public.field_worker_permissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.field_workers fw
    WHERE fw.id = field_worker_permissions.field_worker_id
    AND fw.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all permissions"
  ON public.field_worker_permissions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin' 
    AND ur.is_active = true
  ));

-- Update triggers for timestamps
CREATE TRIGGER update_customer_accounts_updated_at
  BEFORE UPDATE ON public.customer_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to process airtime/data purchases
CREATE OR REPLACE FUNCTION public.process_customer_purchase(
  p_customer_account_id UUID,
  p_transaction_type TEXT,
  p_amount DECIMAL,
  p_description TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  transaction_id UUID;
BEGIN
  -- Insert transaction record
  INSERT INTO public.customer_transactions (
    customer_account_id,
    transaction_type,
    amount,
    description,
    status
  ) VALUES (
    p_customer_account_id,
    p_transaction_type,
    p_amount,
    p_description,
    'completed'
  ) RETURNING id INTO transaction_id;
  
  -- Update customer account balance
  IF p_transaction_type = 'airtime' THEN
    UPDATE public.customer_accounts
    SET airtime_balance = airtime_balance + p_amount,
        last_recharge_at = now(),
        updated_at = now()
    WHERE id = p_customer_account_id;
  ELSIF p_transaction_type = 'data' THEN
    UPDATE public.customer_accounts
    SET data_balance_mb = data_balance_mb + p_amount::INTEGER,
        last_recharge_at = now(),
        updated_at = now()
    WHERE id = p_customer_account_id;
  END IF;
  
  RETURN transaction_id;
END;
$$;