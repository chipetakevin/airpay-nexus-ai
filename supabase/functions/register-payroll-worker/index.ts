import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PayrollWorkerRequest {
  field_worker_id: string;
  employee_data: {
    full_name: string;
    id_number: string;
    email: string;
    phone: string;
    bank_name: string;
    account_number: string;
    branch_code: string;
    account_type: string;
    position: string;
    department: string;
    commission_rate: number;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { field_worker_id, employee_data }: PayrollWorkerRequest = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create employee in payroll system
    const { data: employee, error: employeeError } = await supabaseClient
      .from('payroll_employees')
      .insert({
        employee_number: `FW-${Date.now()}`,
        first_name: employee_data.full_name.split(' ')[0],
        last_name: employee_data.full_name.split(' ').slice(1).join(' '),
        id_number: employee_data.id_number,
        email: employee_data.email,
        phone: employee_data.phone,
        position: employee_data.position,
        department: employee_data.department,
        employment_type: 'contractor',
        base_salary: 0, // Commission-based
        is_active: true,
        field_worker_id: field_worker_id
      })
      .select()
      .single();

    if (employeeError) throw employeeError;

    // Add banking details
    const { error: bankingError } = await supabaseClient
      .from('employee_banking_details')
      .insert({
        employee_id: employee.id,
        bank_name: employee_data.bank_name,
        account_number: employee_data.account_number,
        branch_code: employee_data.branch_code,
        account_type: employee_data.account_type,
        account_holder_name: employee_data.full_name,
        is_primary: true,
        is_verified: false
      });

    if (bankingError) throw bankingError;

    // Set up commission structure
    const { error: allowanceError } = await supabaseClient
      .from('employee_allowances')
      .insert({
        employee_id: employee.id,
        allowance_id: (await supabaseClient
          .from('allowances')
          .select('id')
          .eq('name', 'Commission')
          .single()).data?.id,
        amount: employee_data.commission_rate,
        percentage: null,
        effective_date: new Date().toISOString().split('T')[0],
        is_active: true
      });

    if (allowanceError) {
      console.warn('Commission allowance setup failed:', allowanceError);
    }

    console.log("Field worker registered in payroll system:", employee.id);

    return new Response(JSON.stringify({ 
      success: true, 
      employee_id: employee.id,
      message: "Worker registered in payroll system" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error registering payroll worker:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);