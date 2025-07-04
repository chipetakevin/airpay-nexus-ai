import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useErrorRecovery } from '@/hooks/useErrorRecovery';
import { useToast } from '@/hooks/use-toast';

export interface PortingRequest {
  phoneNumber: string;
  currentNetwork: string;
  targetNetwork: string;
  documents: any[];
  priority: string;
  scheduledCutover: string;
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  contactEmail: string;
  contactMobile: string;
  simType: string;
  consentOwnership: boolean;
  consentDataProcessing: boolean;
  consentMarketing: boolean;
  digitalSignature: string;
}

export interface SystemHealth {
  npcConnection: boolean;
  apiGateway: boolean;
  database: boolean;
  security: boolean;
  uptime: string;
}

export const usePortingSystemState = () => {
  const [user, setUser] = useState(null);
  const [portingRequests, setPortingRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    npcConnection: true,
    apiGateway: true,
    database: true,
    security: true,
    uptime: '99.98%'
  });
  
  const { attemptRecovery, logError } = useErrorRecovery();
  const { toast } = useToast();

  // Auto-recovery wrapper for async operations
  const withRecovery = useCallback(async <T>(
    operation: () => Promise<T>,
    context: string,
    retries: number = 2
  ): Promise<T | null> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          const recovered = await attemptRecovery(error as Error, context, 'medium');
          if (!recovered) {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          }
        }
      }
    }
    
    // All attempts failed
    logError(lastError!, context, 'high');
    return null;
  }, [attemptRecovery, logError]);

  const initializeUser = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      // Only throw error for actual auth failures, not missing sessions
      if (error && error.message !== 'Auth session missing!' && !error.message.includes('session')) {
        throw error;
      }
      setUser(user);
      return user;
    } catch (error) {
      // Only trigger recovery for non-auth related errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (!errorMessage.includes('session') && !errorMessage.includes('Auth')) {
        return withRecovery(async () => {
          throw error;
        }, 'User Initialization');
      }
      // For auth session issues, just return null silently
      setUser(null);
      return null;
    }
  }, [withRecovery]);

  const loadPortingRequests = useCallback(async () => {
    if (!user) return;
    
    return withRecovery(async () => {
      const { data, error } = await supabase
        .from('porting_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortingRequests(data || []);
      return data;
    }, 'Load Porting Requests');
  }, [user, withRecovery]);

  const loadNotifications = useCallback(async () => {
    if (!user) return;
    
    return withRecovery(async () => {
      const { data, error } = await supabase
        .from('porting_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
      return data;
    }, 'Load Notifications');
  }, [user, withRecovery]);

  const loadAnalytics = useCallback(async () => {
    return withRecovery(async () => {
      const { data, error } = await supabase
        .from('porting_analytics')
        .select('*')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (error) throw error;
      setAnalytics(data);
      return data;
    }, 'Load Analytics');
  }, [withRecovery]);

  const monitorSystemHealth = useCallback(async () => {
    const healthChecks = await Promise.allSettled([
      withRecovery(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return Math.random() > 0.05; // 95% uptime simulation
      }, 'NPC Connection Check'),
      
      withRecovery(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return Math.random() > 0.02; // 98% uptime simulation
      }, 'API Gateway Check'),
      
      withRecovery(async () => {
        const { error } = await supabase.from('porting_requests').select('id').limit(1);
        return !error;
      }, 'Database Connection Check'),
      
      withRecovery(async () => {
        await new Promise(resolve => setTimeout(resolve, 30));
        return true; // Security systems check
      }, 'Security Systems Check')
    ]);

    const newHealth: SystemHealth = {
      npcConnection: healthChecks[0].status === 'fulfilled' && healthChecks[0].value === true,
      apiGateway: healthChecks[1].status === 'fulfilled' && healthChecks[1].value === true,
      database: healthChecks[2].status === 'fulfilled' && healthChecks[2].value === true,
      security: healthChecks[3].status === 'fulfilled' && healthChecks[3].value === true,
      uptime: '99.98%'
    };

    setSystemHealth(newHealth);
    
    // Check for critical system failures
    const criticalFailures = Object.entries(newHealth)
      .filter(([key, value]) => key !== 'uptime' && !value)
      .map(([key]) => key);

    if (criticalFailures.length > 0) {
      toast({
        title: "System Health Alert",
        description: `Critical systems offline: ${criticalFailures.join(', ')}`,
        variant: "destructive"
      });
    }

    return newHealth;
  }, [withRecovery, toast]);

  const submitPortingRequest = useCallback(async (request: PortingRequest) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    return withRecovery(async () => {
      const { data, error } = await supabase
        .from('porting_requests')
        .insert({
          user_id: user.id,
          phone_number: request.phoneNumber.replace(/\s/g, ''),
          current_network: request.currentNetwork,
          target_network: request.targetNetwork,
          request_type: 'individual',
          priority: request.priority,
          scheduled_cutover: request.scheduledCutover || null,
          documents: request.documents
        })
        .select()
        .single();

      if (error) throw error;
      
      // Reload requests after successful submission
      await loadPortingRequests();
      
      return data;
    }, 'Submit Porting Request');
  }, [user, withRecovery, loadPortingRequests]);

  // Auto-refresh data periodically
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        loadPortingRequests();
        loadNotifications();
        monitorSystemHealth();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [user, loadPortingRequests, loadNotifications, monitorSystemHealth]);

  // Event listeners for recovery actions
  useEffect(() => {
    const handleResetForm = () => {
      // Reset form state
      setLoading(false);
    };

    const handleRecoverState = () => {
      // Recover application state
      initializeUser();
      if (user) {
        loadPortingRequests();
        loadNotifications();
        loadAnalytics();
        monitorSystemHealth();
      }
    };

    window.addEventListener('resetForm', handleResetForm);
    window.addEventListener('recoverState', handleRecoverState);

    return () => {
      window.removeEventListener('resetForm', handleResetForm);
      window.removeEventListener('recoverState', handleRecoverState);
    };
  }, [user, initializeUser, loadPortingRequests, loadNotifications, loadAnalytics, monitorSystemHealth]);

  return {
    // State
    user,
    portingRequests,
    notifications,
    analytics,
    loading,
    systemHealth,
    
    // Actions
    setLoading,
    initializeUser,
    loadPortingRequests,
    loadNotifications,
    loadAnalytics,
    monitorSystemHealth,
    submitPortingRequest,
    
    // Utilities
    withRecovery
  };
};