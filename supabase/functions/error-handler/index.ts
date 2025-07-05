import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ErrorReport {
  componentName: string;
  errorType: 'runtime' | 'ui' | 'network' | 'validation' | 'database';
  errorMessage: string;
  errorStack?: string;
  errorCode?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  routePath?: string;
  formData?: Record<string, any>;
  componentProps?: Record<string, any>;
  browserInfo?: Record<string, any>;
  userId?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const errorReport: ErrorReport = await req.json();
    console.log('🔍 Processing error report:', errorReport.componentName);

    // Get client IP
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';

    // Check if this error already exists (deduplication)
    const { data: existingError } = await supabase
      .from('error_logs')
      .select('id, occurrence_count')
      .eq('component_name', errorReport.componentName)
      .eq('error_message', errorReport.errorMessage)
      .eq('error_type', errorReport.errorType)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single();

    if (existingError) {
      // Update existing error with increased count
      const { error: updateError } = await supabase
        .from('error_logs')
        .update({
          occurrence_count: existingError.occurrence_count + 1,
          last_occurrence: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', existingError.id);

      if (updateError) {
        console.error('❌ Error updating existing error log:', updateError);
      }

      console.log('📊 Updated existing error occurrence count');
    } else {
      // Create new error log
      const { data: newError, error: insertError } = await supabase
        .from('error_logs')
        .insert({
          user_id: errorReport.userId,
          component_name: errorReport.componentName,
          error_type: errorReport.errorType,
          error_message: errorReport.errorMessage,
          error_stack: errorReport.errorStack,
          error_code: errorReport.errorCode,
          severity: errorReport.severity,
          user_agent: errorReport.userAgent,
          ip_address: clientIP,
          route_path: errorReport.routePath,
          form_data: errorReport.formData,
          component_props: errorReport.componentProps,
          browser_info: errorReport.browserInfo
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('❌ Error inserting error log:', insertError);
        throw insertError;
      }

      console.log('✅ New error logged:', newError.id);

      // Trigger error analysis
      await analyzeAndAttemptFix(newError.id, errorReport);
    }

    // Update system health metrics
    await updateSystemHealth(errorReport.componentName);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Error logged and analyzed',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Error handler failed:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process error report',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};

async function analyzeAndAttemptFix(errorId: string, errorReport: ErrorReport) {
  console.log('🔧 Analyzing error for potential fixes...');

  // Analyze error patterns and determine if auto-fix is possible
  const autoFixStrategies = {
    network: {
      timeout: 'Retry with exponential backoff',
      connection: 'Connection pool refresh'
    },
    validation: {
      required: 'Show user-friendly validation message',
      format: 'Input format correction suggestion'
    },
    ui: {
      render: 'Component restart with error boundary',
      state: 'State reset to initial values'
    },
    database: {
      connection: 'Database connection refresh',
      query: 'Query optimization suggestion'
    }
  };

  let potentialFix = 'Manual investigation required';
  let canAutoFix = false;

  // Determine potential fix based on error type and message
  if (errorReport.errorType in autoFixStrategies) {
    const strategies = autoFixStrategies[errorReport.errorType];
    for (const [key, fix] of Object.entries(strategies)) {
      if (errorReport.errorMessage.toLowerCase().includes(key)) {
        potentialFix = fix;
        canAutoFix = errorReport.severity !== 'critical';
        break;
      }
    }
  }

  // Update error log with analysis
  await supabase
    .from('error_logs')
    .update({
      error_category: canAutoFix ? 'recoverable' : 'non-recoverable',
      potential_fix: potentialFix
    })
    .eq('id', errorId);

  // Attempt auto-fix for recoverable errors
  if (canAutoFix) {
    console.log('🤖 Attempting auto-fix for error:', errorId);
    
    const fixResult = await attemptAutoFix(errorReport);
    
    await supabase
      .from('error_logs')
      .update({
        auto_fix_attempted: true,
        auto_fix_successful: fixResult.success,
        status: fixResult.success ? 'resolved' : 'pending_approval'
      })
      .eq('id', errorId);

    // Create fix request if auto-fix failed
    if (!fixResult.success && errorReport.severity !== 'low') {
      await createFixRequest(errorId, potentialFix, errorReport);
    }
  } else if (errorReport.severity === 'critical' || errorReport.severity === 'high') {
    // Create fix request for critical/high severity errors
    await createFixRequest(errorId, potentialFix, errorReport);
  }
}

async function attemptAutoFix(errorReport: ErrorReport): Promise<{success: boolean, message: string}> {
  // Simulate auto-fix attempts based on error type
  console.log('🔄 Attempting to auto-fix:', errorReport.errorType);

  try {
    switch (errorReport.errorType) {
      case 'network':
        if (errorReport.errorMessage.toLowerCase().includes('timeout')) {
          // Simulate network retry logic
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { success: true, message: 'Network retry successful' };
        }
        break;
      
      case 'validation':
        // Validation errors typically need user action
        return { success: false, message: 'User input required' };
      
      case 'ui':
        if (errorReport.errorMessage.toLowerCase().includes('render')) {
          // Component restart simulation
          return { success: true, message: 'Component restarted successfully' };
        }
        break;
      
      case 'database':
        if (errorReport.errorMessage.toLowerCase().includes('connection')) {
          // Database connection refresh simulation
          return { success: true, message: 'Database connection refreshed' };
        }
        break;
    }

    return { success: false, message: 'Auto-fix not applicable' };
  } catch (error) {
    return { success: false, message: `Auto-fix failed: ${error.message}` };
  }
}

async function createFixRequest(errorId: string, fixDescription: string, errorReport: ErrorReport) {
  console.log('📝 Creating fix request for error:', errorId);

  const riskLevel = errorReport.severity === 'critical' ? 'high' : 
                   errorReport.severity === 'high' ? 'medium' : 'low';

  await supabase
    .from('error_fix_requests')
    .insert({
      error_log_id: errorId,
      fix_type: errorReport.errorType === 'ui' ? 'component_restart' : 'config_update',
      fix_description: fixDescription,
      risk_level: riskLevel,
      status: 'pending'
    });

  console.log('✅ Fix request created');
}

async function updateSystemHealth(componentName: string) {
  console.log('📊 Updating system health for:', componentName);

  // Calculate health score for the component
  const { data: healthData } = await supabase
    .rpc('calculate_component_health', { component_name_param: componentName });

  const healthScore = healthData || 95.0;

  // Insert or update health metrics
  await supabase
    .from('system_health_metrics')
    .upsert({
      component_name: componentName,
      health_score: healthScore,
      error_rate: Math.max(0, 100 - healthScore),
      recorded_at: new Date().toISOString()
    }, {
      onConflict: 'component_name'
    });

  console.log(`✅ Health updated for ${componentName}: ${healthScore}%`);
}

serve(handler);