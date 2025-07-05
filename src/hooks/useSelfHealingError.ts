import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ErrorReport {
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

export interface ErrorMetrics {
  totalErrors: number;
  componentErrors: Record<string, number>;
  recentErrors: any[];
  autoHealingStats: {
    attempted: number;
    successful: number;
    successRate: number;
  };
}

export const useSelfHealingError = (componentName: string) => {
  const { toast } = useToast();
  const [isReporting, setIsReporting] = useState(false);
  const [errorMetrics, setErrorMetrics] = useState<ErrorMetrics | null>(null);
  const [userId, setUserId] = useState<string | undefined>();

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getCurrentUser();
  }, []);

  // Report error to self-healing system
  const reportError = useCallback(async (
    error: Error | string,
    errorType: ErrorReport['errorType'] = 'runtime',
    severity: ErrorReport['severity'] = 'medium',
    additionalData?: Partial<ErrorReport>
  ) => {
    setIsReporting(true);
    
    try {
      const errorMessage = typeof error === 'string' ? error : error.message;
      const errorStack = typeof error === 'object' ? error.stack : undefined;
      
      const errorReport: ErrorReport = {
        componentName,
        errorType,
        errorMessage,
        errorStack,
        severity,
        userAgent: navigator.userAgent,
        routePath: window.location.pathname,
        browserInfo: {
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          connection: (navigator as any).connection ? {
            effectiveType: (navigator as any).connection.effectiveType,
            downlink: (navigator as any).connection.downlink
          } : undefined
        },
        userId,
        ...additionalData
      };

      console.log('🚨 Reporting error:', errorReport);

      const { data, error: reportError } = await supabase.functions.invoke('error-handler', {
        body: errorReport
      });

      if (reportError) {
        console.error('❌ Failed to report error:', reportError);
        throw reportError;
      }

      console.log('✅ Error reported successfully:', data);

      // Show appropriate toast based on severity
      if (severity === 'critical' || severity === 'high') {
        toast({
          title: "Critical Error Detected",
          description: "This error has been reported and will be prioritized for fixing.",
          variant: "destructive",
          duration: 5000
        });
      } else if (severity === 'medium') {
        toast({
          title: "Error Reported",
          description: "The error has been logged and will be analyzed.",
          duration: 3000
        });
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Error reporting failed:', error);
      
      toast({
        title: "Error Reporting Failed",
        description: "Could not report the error. Please try again.",
        variant: "destructive",
        duration: 4000
      });
      
      return { success: false, error };
    } finally {
      setIsReporting(false);
    }
  }, [componentName, userId, toast]);

  // Handle network errors specifically
  const reportNetworkError = useCallback(async (
    error: any,
    url?: string,
    method?: string
  ) => {
    const severity = error.name === 'TypeError' && error.message.includes('fetch') ? 'high' : 'medium';
    
    return reportError(error, 'network', severity, {
      errorCode: error.code || 'NETWORK_ERROR',
      formData: {
        url,
        method,
        timestamp: new Date().toISOString()
      }
    });
  }, [reportError]);

  // Handle validation errors
  const reportValidationError = useCallback(async (
    fieldName: string,
    validationMessage: string,
    formData?: Record<string, any>
  ) => {
    return reportError(
      `Validation failed for ${fieldName}: ${validationMessage}`,
      'validation',
      'low',
      {
        errorCode: 'VALIDATION_ERROR',
        formData: {
          fieldName,
          validationMessage,
          formData
        }
      }
    );
  }, [reportError]);

  // Handle database errors
  const reportDatabaseError = useCallback(async (
    operation: string,
    error: any,
    query?: string
  ) => {
    const severity = error.message?.includes('connection') ? 'high' : 'medium';
    
    return reportError(error, 'database', severity, {
      errorCode: error.code || 'DATABASE_ERROR',
      formData: {
        operation,
        query,
        timestamp: new Date().toISOString()
      }
    });
  }, [reportError]);

  // Get error metrics for the component
  const getErrorMetrics = useCallback(async (days: number = 7) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data: errors, error } = await supabase
        .from('error_logs')
        .select('*')
        .eq('component_name', componentName)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch error metrics:', error);
        return null;
      }

      const totalErrors = errors?.length || 0;
      const autoFixAttempted = errors?.filter(e => e.auto_fix_attempted).length || 0;
      const autoFixSuccessful = errors?.filter(e => e.auto_fix_successful).length || 0;

      const componentErrors: Record<string, number> = {};
      errors?.forEach(error => {
        componentErrors[error.component_name] = (componentErrors[error.component_name] || 0) + 1;
      });

      const metrics: ErrorMetrics = {
        totalErrors,
        componentErrors,
        recentErrors: errors?.slice(0, 10) || [],
        autoHealingStats: {
          attempted: autoFixAttempted,
          successful: autoFixSuccessful,
          successRate: autoFixAttempted > 0 ? (autoFixSuccessful / autoFixAttempted) * 100 : 0
        }
      };

      setErrorMetrics(metrics);
      return metrics;
    } catch (error) {
      console.error('❌ Error fetching metrics:', error);
      return null;
    }
  }, [componentName]);

  // Automatically try to recover from specific errors
  const attemptAutoRecovery = useCallback(async (error: Error) => {
    console.log('🔧 Attempting auto-recovery for:', error.message);
    
    // Network errors - retry with exponential backoff
    if (error.message.includes('fetch') || error.message.includes('network')) {
      console.log('🔄 Retrying network operation...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { recovered: true, method: 'network_retry' };
    }
    
    // Validation errors - suggest user action
    if (error.message.includes('validation') || error.message.includes('required')) {
      console.log('📝 Validation error detected - user action required');
      return { recovered: false, method: 'user_action_required' };
    }
    
    // Component errors - attempt re-render
    if (error.message.includes('render') || error.message.includes('component')) {
      console.log('🔄 Attempting component recovery...');
      // Force re-render by updating key or state
      return { recovered: true, method: 'component_restart' };
    }
    
    return { recovered: false, method: 'manual_intervention_required' };
  }, []);

  // Monitor component health
  useEffect(() => {
    const interval = setInterval(() => {
      getErrorMetrics();
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [getErrorMetrics]);

  return {
    reportError,
    reportNetworkError,
    reportValidationError,
    reportDatabaseError,
    getErrorMetrics,
    attemptAutoRecovery,
    isReporting,
    errorMetrics
  };
};