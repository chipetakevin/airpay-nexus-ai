import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📊 Generating daily error report for:', new Date().toISOString());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const reportDate = yesterday.toISOString().split('T')[0];

    // Check if report already exists for this date
    const { data: existingReport } = await supabase
      .from('error_reports')
      .select('id')
      .eq('report_date', reportDate)
      .single();

    if (existingReport) {
      console.log('📋 Report already exists for date:', reportDate);
      return new Response(
        JSON.stringify({ message: 'Report already generated for this date' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate comprehensive error report
    const reportData = await generateErrorReport(reportDate);
    
    // Save report to database
    const { data: newReport, error: reportError } = await supabase
      .from('error_reports')
      .insert({
        report_date: reportDate,
        total_errors: reportData.totalErrors,
        critical_errors: reportData.criticalErrors,
        high_errors: reportData.highErrors,
        medium_errors: reportData.mediumErrors,
        low_errors: reportData.lowErrors,
        auto_fixes_attempted: reportData.autoFixesAttempted,
        auto_fixes_successful: reportData.autoFixesSuccessful,
        manual_fixes_pending: reportData.manualFixesPending,
        component_errors: reportData.componentBreakdown,
        error_trends: reportData.trends,
        report_data: reportData.fullReport,
        recommendations: reportData.recommendations
      })
      .select('id')
      .single();

    if (reportError) {
      console.error('❌ Error saving report:', reportError);
      throw reportError;
    }

    console.log('✅ Daily error report generated:', newReport.id);

    // Send notifications to administrators
    await notifyAdministrators(reportData);

    return new Response(
      JSON.stringify({
        success: true,
        reportId: newReport.id,
        summary: {
          totalErrors: reportData.totalErrors,
          criticalErrors: reportData.criticalErrors,
          autoFixesSuccessful: reportData.autoFixesSuccessful,
          manualFixesPending: reportData.manualFixesPending
        },
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Daily report generation failed:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate daily error report',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};

async function generateErrorReport(reportDate: string) {
  console.log('📈 Analyzing error data for:', reportDate);

  const startDate = `${reportDate} 00:00:00`;
  const endDate = `${reportDate} 23:59:59`;

  // Get all errors for the reporting period
  const { data: errors, error: errorsError } = await supabase
    .from('error_logs')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (errorsError) {
    console.error('❌ Error fetching error logs:', errorsError);
    throw errorsError;
  }

  // Count errors by severity
  const severityCounts = {
    critical: errors?.filter(e => e.severity === 'critical').length || 0,
    high: errors?.filter(e => e.severity === 'high').length || 0,
    medium: errors?.filter(e => e.severity === 'medium').length || 0,
    low: errors?.filter(e => e.severity === 'low').length || 0
  };

  // Count auto-fix statistics
  const autoFixStats = {
    attempted: errors?.filter(e => e.auto_fix_attempted).length || 0,
    successful: errors?.filter(e => e.auto_fix_successful).length || 0
  };

  // Get pending fix requests
  const { data: pendingFixes } = await supabase
    .from('error_fix_requests')
    .select('id')
    .eq('status', 'pending');

  // Component breakdown
  const componentBreakdown = {};
  errors?.forEach(error => {
    if (!componentBreakdown[error.component_name]) {
      componentBreakdown[error.component_name] = {
        total: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        autoFixed: 0
      };
    }
    componentBreakdown[error.component_name].total++;
    componentBreakdown[error.component_name][error.severity]++;
    if (error.auto_fix_successful) {
      componentBreakdown[error.component_name].autoFixed++;
    }
  });

  // Generate trends (compare with previous day)
  const prevDate = new Date(reportDate);
  prevDate.setDate(prevDate.getDate() - 1);
  
  const { data: prevErrors } = await supabase
    .from('error_logs')
    .select('severity')
    .gte('created_at', `${prevDate.toISOString().split('T')[0]} 00:00:00`)
    .lte('created_at', `${prevDate.toISOString().split('T')[0]} 23:59:59`);

  const prevTotal = prevErrors?.length || 0;
  const currentTotal = errors?.length || 0;
  const trend = currentTotal > prevTotal ? 'increasing' : 
                currentTotal < prevTotal ? 'decreasing' : 'stable';

  // Generate recommendations
  const recommendations = generateRecommendations(errors, componentBreakdown, trend);

  // Get system health metrics
  const { data: healthMetrics } = await supabase
    .from('system_health_metrics')
    .select('*')
    .eq('recorded_at', reportDate);

  const fullReport = {
    date: reportDate,
    summary: {
      totalErrors: currentTotal,
      errorTrend: trend,
      previousDayComparison: {
        current: currentTotal,
        previous: prevTotal,
        change: currentTotal - prevTotal
      }
    },
    errorDetails: errors?.slice(0, 50), // Top 50 errors
    componentHealth: healthMetrics,
    topErrorComponents: Object.entries(componentBreakdown)
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 10),
    autoHealingStats: {
      totalAttempts: autoFixStats.attempted,
      successfulFixes: autoFixStats.successful,
      successRate: autoFixStats.attempted > 0 ? 
        (autoFixStats.successful / autoFixStats.attempted * 100).toFixed(2) + '%' : '0%'
    }
  };

  return {
    totalErrors: currentTotal,
    criticalErrors: severityCounts.critical,
    highErrors: severityCounts.high,
    mediumErrors: severityCounts.medium,
    lowErrors: severityCounts.low,
    autoFixesAttempted: autoFixStats.attempted,
    autoFixesSuccessful: autoFixStats.successful,
    manualFixesPending: pendingFixes?.length || 0,
    componentBreakdown,
    trends: { trend, currentTotal, prevTotal },
    fullReport,
    recommendations
  };
}

function generateRecommendations(errors: any[], componentBreakdown: any, trend: string) {
  const recommendations = [];

  // Critical error recommendations
  const criticalErrors = errors?.filter(e => e.severity === 'critical') || [];
  if (criticalErrors.length > 0) {
    recommendations.push({
      priority: 'high',
      type: 'critical_errors',
      title: 'Critical Errors Require Immediate Attention',
      description: `${criticalErrors.length} critical errors detected. These may cause system instability.`,
      action: 'Review and resolve critical errors within 2 hours'
    });
  }

  // Component-specific recommendations
  const topErrorComponent = Object.entries(componentBreakdown)
    .sort(([,a], [,b]) => b.total - a.total)[0];
  
  if (topErrorComponent && topErrorComponent[1].total > 5) {
    recommendations.push({
      priority: 'medium',
      type: 'component_optimization',
      title: `${topErrorComponent[0]} Component Needs Attention`,
      description: `This component generated ${topErrorComponent[1].total} errors today.`,
      action: 'Review component code and error patterns for optimization opportunities'
    });
  }

  // Trend-based recommendations
  if (trend === 'increasing') {
    recommendations.push({
      priority: 'medium',
      type: 'trend_analysis',
      title: 'Error Rate is Increasing',
      description: 'Error count has increased compared to yesterday.',
      action: 'Investigate recent changes and monitor system performance closely'
    });
  }

  // Auto-healing recommendations
  const autoFixRate = errors?.filter(e => e.auto_fix_attempted).length || 0;
  const totalErrors = errors?.length || 0;
  
  if (totalErrors > 0 && (autoFixRate / totalErrors) < 0.5) {
    recommendations.push({
      priority: 'low',
      type: 'automation_improvement',
      title: 'Auto-Healing Coverage Can Be Improved',
      description: 'Consider implementing more auto-fix strategies for common error patterns.',
      action: 'Review error patterns and develop additional auto-healing rules'
    });
  }

  return recommendations;
}

async function notifyAdministrators(reportData: any) {
  console.log('📧 Sending notifications to administrators...');

  // Get admin users
  const { data: adminUsers } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', 'admin')
    .eq('is_active', true);

  if (!adminUsers?.length) {
    console.log('⚠️ No admin users found for notifications');
    return;
  }

  // For now, just log the notification
  // In production, this would integrate with email service
  console.log('📊 Daily Error Report Summary:');
  console.log(`- Total Errors: ${reportData.totalErrors}`);
  console.log(`- Critical Errors: ${reportData.criticalErrors}`);
  console.log(`- Auto-fixes Successful: ${reportData.autoFixesSuccessful}`);
  console.log(`- Manual Fixes Pending: ${reportData.manualFixesPending}`);
  console.log(`- Administrators to notify: ${adminUsers.length}`);
}

serve(handler);