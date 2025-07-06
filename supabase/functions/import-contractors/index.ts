import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContractorData {
  name: string;
  employee_id: string;
  position: string;
  department: string;
  status: string;
  phone?: string;
  email?: string;
  start_date?: string;
  notes?: string;
}

interface ImportResult {
  success: boolean;
  totalRows: number;
  successfulImports: number;
  errors: string[];
  duplicates: string[];
  importId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Import request received from user: ${user.id}`);

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);

    // Read and parse the file
    const fileContent = await file.text();
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return new Response(
        JSON.stringify({ error: 'File must contain at least header and one data row' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse CSV headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const expectedHeaders = ['Name', 'Employee ID', 'Position', 'Department', 'Status'];
    
    // Validate headers
    const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: `Missing required columns: ${missingHeaders.join(', ')}`,
          expectedHeaders,
          receivedHeaders: headers
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse data rows
    const contractorData: ContractorData[] = [];
    const errors: string[] = [];
    const duplicates: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Validate required fields
      if (!row.Name) {
        errors.push(`Row ${i + 1}: Name is required`);
        continue;
      }
      
      if (!row['Employee ID']) {
        errors.push(`Row ${i + 1}: Employee ID is required`);
        continue;
      }
      
      if (!row.Status || !['Active', 'Inactive'].includes(row.Status)) {
        errors.push(`Row ${i + 1}: Status must be 'Active' or 'Inactive'`);
        continue;
      }

      // Check for duplicates in the batch
      const existingInBatch = contractorData.find(c => c.employee_id === row['Employee ID']);
      if (existingInBatch) {
        duplicates.push(`Row ${i + 1}: Duplicate Employee ID ${row['Employee ID']} in file`);
        continue;
      }

      // Map to database structure
      const contractor: ContractorData = {
        name: row.Name,
        employee_id: row['Employee ID'],
        position: row.Position || '',
        department: row.Department || '',
        status: row.Status.toLowerCase(),
        phone: row.Phone || null,
        email: row.Email || null,
        start_date: row['Start Date'] || null,
        notes: row.Notes || null
      };

      contractorData.push(contractor);
    }

    console.log(`Parsed ${contractorData.length} valid contractors, ${errors.length} errors, ${duplicates.length} duplicates`);

    // If there are validation errors, return them
    if (errors.length > 0 || duplicates.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          validationErrors: [...errors, ...duplicates],
          totalRows: lines.length - 1,
          validRows: contractorData.length
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for existing employee IDs in database
    const employeeIds = contractorData.map(c => c.employee_id);
    const { data: existingContractors, error: checkError } = await supabase
      .from('contractor_profiles')
      .select('employee_id')
      .in('employee_id', employeeIds);

    if (checkError) {
      console.error('Database check error:', checkError);
      return new Response(
        JSON.stringify({ error: 'Database validation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const existingIds = existingContractors?.map(c => c.employee_id) || [];
    const dbDuplicates = contractorData.filter(c => existingIds.includes(c.employee_id));
    
    if (dbDuplicates.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Duplicate employee IDs found in database',
          duplicateIds: dbDuplicates.map(c => c.employee_id)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate import ID for tracking
    const importId = crypto.randomUUID();

    // Prepare data for insertion with metadata
    const contractorsToInsert = contractorData.map(contractor => ({
      ...contractor,
      created_by: user.id,
      import_id: importId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Insert contractors in batches (Supabase recommends max 1000 per batch)
    const batchSize = 100;
    let successfulImports = 0;
    const insertErrors: string[] = [];

    for (let i = 0; i < contractorsToInsert.length; i += batchSize) {
      const batch = contractorsToInsert.slice(i, i + batchSize);
      
      const { data: insertData, error: insertError } = await supabase
        .from('contractor_profiles')
        .insert(batch)
        .select('id, employee_id');

      if (insertError) {
        console.error(`Batch insert error (${i}-${i + batch.length}):`, insertError);
        insertErrors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${insertError.message}`);
      } else {
        successfulImports += insertData?.length || 0;
        console.log(`Successfully inserted batch ${Math.floor(i / batchSize) + 1}: ${insertData?.length} records`);
      }
    }

    // Log the import activity
    const { error: auditError } = await supabase
      .from('import_audit_logs')
      .insert({
        import_id: importId,
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        total_rows: contractorData.length,
        successful_imports: successfulImports,
        failed_imports: contractorData.length - successfulImports,
        import_type: 'contractor',
        status: successfulImports > 0 ? 'completed' : 'failed',
        error_details: insertErrors.length > 0 ? insertErrors : null,
        created_at: new Date().toISOString()
      });

    if (auditError) {
      console.error('Audit log error:', auditError);
    }

    const result: ImportResult = {
      success: successfulImports > 0,
      totalRows: contractorData.length,
      successfulImports,
      errors: insertErrors,
      duplicates: [],
      importId
    };

    console.log(`Import completed: ${successfulImports}/${contractorData.length} successful`);

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Import function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});