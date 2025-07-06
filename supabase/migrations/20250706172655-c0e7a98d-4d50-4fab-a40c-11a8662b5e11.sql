-- Create complete South African payroll system with compliance calculations

-- Create enums for payroll system
CREATE TYPE employment_type AS ENUM ('permanent', 'contract', 'temporary', 'intern');
CREATE TYPE payroll_status AS ENUM ('draft', 'processing', 'completed', 'cancelled');
CREATE TYPE deduction_type AS ENUM ('statutory', 'voluntary', 'loan', 'garnishment');
CREATE TYPE allowance_type AS ENUM ('basic', 'housing', 'transport', 'medical', 'overtime', 'bonus');
CREATE TYPE compliance_status AS ENUM ('compliant', 'non_compliant', 'pending', 'exception');
CREATE TYPE payroll_user_role AS ENUM ('director', 'hr_admin', 'payroll_clerk', 'employee', 'field_worker');

-- Employees table
CREATE TABLE payroll_employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    id_number VARCHAR(20) UNIQUE,
    employment_type employment_type NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    grade_level INTEGER,
    start_date DATE NOT NULL,
    end_date DATE,
    base_salary DECIMAL(15,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    manager_id UUID REFERENCES payroll_employees(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Salary structures and pay bands
CREATE TABLE salary_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_level INTEGER NOT NULL,
    position_title VARCHAR(100) NOT NULL,
    min_salary DECIMAL(15,2) NOT NULL,
    max_salary DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    effective_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payroll runs
CREATE TABLE payroll_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_number VARCHAR(50) UNIQUE NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    payment_date DATE NOT NULL,
    status payroll_status DEFAULT 'draft',
    total_gross DECIMAL(15,2) DEFAULT 0,
    total_deductions DECIMAL(15,2) DEFAULT 0,
    total_net DECIMAL(15,2) DEFAULT 0,
    employee_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Allowances master
CREATE TABLE allowances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    allowance_code VARCHAR(50) UNIQUE NOT NULL,
    allowance_name VARCHAR(100) NOT NULL,
    description TEXT,
    allowance_type allowance_type NOT NULL,
    is_taxable BOOLEAN DEFAULT true,
    calculation_method VARCHAR(20) DEFAULT 'fixed', -- fixed, percentage, formula
    default_amount DECIMAL(15,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Employee allowances
CREATE TABLE employee_allowances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES payroll_employees(id) NOT NULL,
    allowance_id UUID REFERENCES allowances(id) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    percentage DECIMAL(5,2),
    effective_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Deductions master
CREATE TABLE deductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deduction_code VARCHAR(50) UNIQUE NOT NULL,
    deduction_name VARCHAR(100) NOT NULL,
    description TEXT,
    deduction_type deduction_type NOT NULL,
    is_statutory BOOLEAN DEFAULT false,
    calculation_method VARCHAR(20) DEFAULT 'fixed',
    default_amount DECIMAL(15,2),
    percentage DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Employee deductions
CREATE TABLE employee_deductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES payroll_employees(id) NOT NULL,
    deduction_id UUID REFERENCES deductions(id) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    percentage DECIMAL(5,2),
    effective_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payroll calculations (payslips)
CREATE TABLE payroll_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_run_id UUID REFERENCES payroll_runs(id) NOT NULL,
    employee_id UUID REFERENCES payroll_employees(id) NOT NULL,
    base_salary DECIMAL(15,2) NOT NULL,
    total_allowances DECIMAL(15,2) DEFAULT 0,
    gross_salary DECIMAL(15,2) NOT NULL,
    total_deductions DECIMAL(15,2) DEFAULT 0,
    net_salary DECIMAL(15,2) NOT NULL,
    paye_tax DECIMAL(15,2) DEFAULT 0,
    uif_contribution DECIMAL(15,2) DEFAULT 0,
    sdl_contribution DECIMAL(15,2) DEFAULT 0,
    days_worked INTEGER DEFAULT 0,
    hours_worked DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    overtime_amount DECIMAL(15,2) DEFAULT 0,
    leave_days INTEGER DEFAULT 0,
    leave_amount DECIMAL(15,2) DEFAULT 0,
    calculation_status VARCHAR(20) DEFAULT 'calculated',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(payroll_run_id, employee_id)
);

-- Banking details
CREATE TABLE employee_banking_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES payroll_employees(id) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    branch_code VARCHAR(10) NOT NULL,
    account_type VARCHAR(20) DEFAULT 'current',
    account_holder_name VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    verification_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Payment batches for banking integration
CREATE TABLE payment_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_run_id UUID REFERENCES payroll_runs(id) NOT NULL,
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    bank_name VARCHAR(100),
    total_amount DECIMAL(15,2) NOT NULL,
    employee_count INTEGER NOT NULL,
    batch_status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE,
    batch_file_path TEXT,
    bank_reference VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Compliance records
CREATE TABLE compliance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_run_id UUID REFERENCES payroll_runs(id),
    employee_id UUID REFERENCES payroll_employees(id),
    compliance_type VARCHAR(50) NOT NULL, -- PAYE, UIF, SDL, BCEA, POPIA
    compliance_status compliance_status NOT NULL,
    check_date DATE NOT NULL,
    details JSONB,
    exceptions TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Audit logs
CREATE TABLE payroll_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User roles for RBAC
CREATE TABLE payroll_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    role payroll_user_role NOT NULL,
    permissions JSONB,
    assigned_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_payroll_employees_code ON payroll_employees(employee_code);
CREATE INDEX idx_payroll_employees_active ON payroll_employees(is_active);
CREATE INDEX idx_payroll_runs_status ON payroll_runs(status);
CREATE INDEX idx_payroll_calculations_run ON payroll_calculations(payroll_run_id);
CREATE INDEX idx_employee_allowances_employee ON employee_allowances(employee_id);
CREATE INDEX idx_employee_deductions_employee ON employee_deductions(employee_id);
CREATE INDEX idx_compliance_records_run ON compliance_records(payroll_run_id);

-- RLS Policies
ALTER TABLE payroll_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_banking_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_audit_logs ENABLE ROW LEVEL SECURITY;

-- Directors can see all data
CREATE POLICY "Directors can access all payroll data" ON payroll_employees FOR ALL USING (
    EXISTS (SELECT 1 FROM payroll_user_roles WHERE user_id = auth.uid() AND role = 'director' AND is_active = true)
);

-- HR Admins can access all employee and payroll data
CREATE POLICY "HR Admins can access employee data" ON payroll_employees FOR ALL USING (
    EXISTS (SELECT 1 FROM payroll_user_roles WHERE user_id = auth.uid() AND role IN ('director', 'hr_admin') AND is_active = true)
);

-- Payroll Clerks can access payroll data but not director compensation
CREATE POLICY "Payroll Clerks limited access" ON payroll_calculations FOR ALL USING (
    EXISTS (SELECT 1 FROM payroll_user_roles WHERE user_id = auth.uid() AND role IN ('director', 'hr_admin', 'payroll_clerk') AND is_active = true)
    AND (
        EXISTS (SELECT 1 FROM payroll_user_roles WHERE user_id = auth.uid() AND role IN ('director', 'hr_admin') AND is_active = true)
        OR 
        NOT EXISTS (SELECT 1 FROM payroll_employees pe WHERE pe.id = employee_id AND pe.position ILIKE '%director%')
    )
);

-- Employees can only see their own data
CREATE POLICY "Employees can view own data" ON payroll_employees FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM payroll_user_roles WHERE user_id = auth.uid() AND role IN ('director', 'hr_admin', 'payroll_clerk') AND is_active = true)
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payroll_employees_updated_at BEFORE UPDATE ON payroll_employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_runs_updated_at BEFORE UPDATE ON payroll_runs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_calculations_updated_at BEFORE UPDATE ON payroll_calculations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_payroll_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO payroll_audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW) ELSE to_jsonb(NEW) END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to critical tables
CREATE TRIGGER audit_payroll_employees AFTER INSERT OR UPDATE OR DELETE ON payroll_employees FOR EACH ROW EXECUTE FUNCTION audit_payroll_changes();
CREATE TRIGGER audit_payroll_runs AFTER INSERT OR UPDATE OR DELETE ON payroll_runs FOR EACH ROW EXECUTE FUNCTION audit_payroll_changes();
CREATE TRIGGER audit_payroll_calculations AFTER INSERT OR UPDATE OR DELETE ON payroll_calculations FOR EACH ROW EXECUTE FUNCTION audit_payroll_changes();