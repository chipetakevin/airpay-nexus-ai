import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ErrorLog {
  id: string;
  timestamp: string;
  error: Error | string;
  context: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoveryAttempts: number;
  recovered: boolean;
  stackTrace?: string;
}

export interface RecoveryStrategy {
  name: string;
  condition: (error: Error | string) => boolean;
  action: () => Promise<boolean>;
  maxAttempts: number;
}

export const useErrorRecovery = () => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStrategies, setRecoveryStrategies] = useState<RecoveryStrategy[]>([]);
  const { toast } = useToast();

  // Default recovery strategies
  useEffect(() => {
    const defaultStrategies: RecoveryStrategy[] = [
      {
        name: 'Network Retry',
        condition: (error) => 
          typeof error === 'string' 
            ? error.includes('network') || error.includes('timeout') || error.includes('fetch')
            : error.message?.includes('network') || error.message?.includes('timeout') || error.message?.includes('fetch'),
        action: async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return true;
        },
        maxAttempts: 3
      },
      {
        name: 'Database Reconnect',
        condition: (error) =>
          typeof error === 'string'
            ? error.includes('database') || error.includes('connection')
            : error.message?.includes('database') || error.message?.includes('connection'),
        action: async () => {
          // Simulate database reconnection
          await new Promise(resolve => setTimeout(resolve, 1000));
          return true;
        },
        maxAttempts: 2
      },
      {
        name: 'Authentication Refresh',
        condition: (error) =>
          typeof error === 'string'
            ? error.includes('401') || error.includes('unauthorized') || error.includes('token')
            : error.message?.includes('401') || error.message?.includes('unauthorized') || error.message?.includes('token'),
        action: async () => {
          // Simulate token refresh
          await new Promise(resolve => setTimeout(resolve, 500));
          return true;
        },
        maxAttempts: 1
      },
      {
        name: 'Form Reset',
        condition: (error) =>
          typeof error === 'string'
            ? error.includes('validation') || error.includes('form')
            : error.message?.includes('validation') || error.message?.includes('form'),
        action: async () => {
          // Trigger form reset through event
          window.dispatchEvent(new CustomEvent('resetForm'));
          return true;
        },
        maxAttempts: 1
      },
      {
        name: 'State Recovery',
        condition: (error) =>
          typeof error === 'string'
            ? error.includes('state') || error.includes('undefined') || error.includes('null')
            : error.message?.includes('state') || error.message?.includes('undefined') || error.message?.includes('null'),
        action: async () => {
          // Trigger state recovery
          window.dispatchEvent(new CustomEvent('recoverState'));
          return true;
        },
        maxAttempts: 1
      }
    ];

    setRecoveryStrategies(defaultStrategies);
  }, []);

  const logError = useCallback((
    error: Error | string,
    context: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) => {
    const errorLog: ErrorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      error,
      context,
      severity,
      recoveryAttempts: 0,
      recovered: false,
      stackTrace: error instanceof Error ? error.stack : undefined
    };

    setErrorLogs(prev => [errorLog, ...prev.slice(0, 99)]); // Keep last 100 errors
    return errorLog.id;
  }, []);

  const attemptRecovery = useCallback(async (
    error: Error | string,
    context: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<boolean> => {
    const errorId = logError(error, context, severity);
    setIsRecovering(true);

    try {
      // Find applicable recovery strategies
      const applicableStrategies = recoveryStrategies.filter(strategy =>
        strategy.condition(error)
      );

      if (applicableStrategies.length === 0) {
        toast({
          title: "Error Detected",
          description: `No recovery strategy available for: ${typeof error === 'string' ? error : error.message}`,
          variant: "destructive"
        });
        return false;
      }

      // Try each applicable strategy
      for (const strategy of applicableStrategies) {
        let attempts = 0;
        let recovered = false;

        while (attempts < strategy.maxAttempts && !recovered) {
          attempts++;
          
          try {
            toast({
              title: "Auto-Recovery",
              description: `Attempting ${strategy.name} (${attempts}/${strategy.maxAttempts})`,
            });

            recovered = await strategy.action();
            
            if (recovered) {
              // Update error log
              setErrorLogs(prev => prev.map(log => 
                log.id === errorId 
                  ? { ...log, recoveryAttempts: attempts, recovered: true }
                  : log
              ));

              toast({
                title: "Recovery Successful ✓",
                description: `${strategy.name} resolved the issue automatically`,
              });

              return true;
            }
          } catch (recoveryError) {
            console.error(`Recovery strategy ${strategy.name} failed:`, recoveryError);
          }
        }

        // Update recovery attempts
        setErrorLogs(prev => prev.map(log => 
          log.id === errorId 
            ? { ...log, recoveryAttempts: attempts }
            : log
        ));
      }

      // If we reach here, all strategies failed
      toast({
        title: "Auto-Recovery Failed",
        description: "Please try manual resolution or contact support",
        variant: "destructive"
      });

      return false;
    } finally {
      setIsRecovering(false);
    }
  }, [recoveryStrategies, logError, toast]);

  const addRecoveryStrategy = useCallback((strategy: RecoveryStrategy) => {
    setRecoveryStrategies(prev => [...prev, strategy]);
  }, []);

  const clearErrorLogs = useCallback(() => {
    setErrorLogs([]);
  }, []);

  const getErrorStats = useCallback(() => {
    const total = errorLogs.length;
    const recovered = errorLogs.filter(log => log.recovered).length;
    const critical = errorLogs.filter(log => log.severity === 'critical').length;
    const high = errorLogs.filter(log => log.severity === 'high').length;
    
    return {
      total,
      recovered,
      recoveryRate: total > 0 ? (recovered / total) * 100 : 0,
      critical,
      high,
      recent: errorLogs.slice(0, 5)
    };
  }, [errorLogs]);

  return {
    errorLogs,
    isRecovering,
    logError,
    attemptRecovery,
    addRecoveryStrategy,
    clearErrorLogs,
    getErrorStats,
    recoveryStrategies: recoveryStrategies.map(s => ({ name: s.name, maxAttempts: s.maxAttempts }))
  };
};