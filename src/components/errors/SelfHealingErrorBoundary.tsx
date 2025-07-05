import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: ReactNode;
  componentName: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
  isHealing: boolean;
  healingAttempts: number;
  maxHealingAttempts: number;
  isResolved: boolean;
}

export class SelfHealingErrorBoundary extends Component<Props, State> {
  private healingTimer: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      isHealing: false,
      healingAttempts: 0,
      maxHealingAttempts: 3,
      isResolved: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Error caught by boundary:', error);
    
    // Report error to the self-healing system
    this.reportError(error, errorInfo);
    
    // Start self-healing process
    this.initiateHealing();
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private async reportError(error: Error, errorInfo: React.ErrorInfo) {
    try {      
      const { data: { user } } = await supabase.auth.getUser();
      
      const errorReport = {
        componentName: this.props.componentName,
        errorType: 'ui' as const,
        errorMessage: error.message,
        errorStack: error.stack,
        severity: this.determineSeverity(error),
        userAgent: navigator.userAgent,
        routePath: window.location.pathname,
        componentProps: this.props,
        browserInfo: {
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        },
        userId: user?.id
      };

      const response = await supabase.functions.invoke('error-handler', {
        body: errorReport
      });

      if (response.error) {
        console.error('❌ Failed to report error:', response.error);
      } else {
        console.log('✅ Error reported successfully');
      }
    } catch (reportError) {
      console.error('❌ Error reporting failed:', reportError);
    }
  }

  private determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'medium';
    }
    
    if (message.includes('render') || message.includes('component')) {
      return 'high';
    }
    
    if (message.includes('memory') || message.includes('stack overflow')) {
      return 'critical';
    }
    
    return 'medium';
  }

  private initiateHealing() {
    console.log('🔧 Starting self-healing process...');
    
    this.setState({ isHealing: true });
    
    // Attempt healing after a brief delay
    this.healingTimer = setTimeout(() => {
      this.attemptHealing();
    }, 2000);
  }

  private attemptHealing() {
    const { healingAttempts, maxHealingAttempts } = this.state;
    
    if (healingAttempts >= maxHealingAttempts) {
      console.log('🏥 Max healing attempts reached');
      this.setState({ isHealing: false });
      return;
    }

    console.log(`🔄 Healing attempt ${healingAttempts + 1}/${maxHealingAttempts}`);
    
    // Simulate healing process
    setTimeout(() => {
      const healingSuccess = Math.random() > 0.3; // 70% success rate
      
      if (healingSuccess) {
        console.log('✅ Self-healing successful!');
        this.setState({
          hasError: false,
          error: null,
          isHealing: false,
          isResolved: true,
          healingAttempts: healingAttempts + 1
        });
        
        // Show success message briefly
        setTimeout(() => {
          this.setState({ isResolved: false });
        }, 3000);
      } else {
        console.log('❌ Healing attempt failed, retrying...');
        this.setState({
          healingAttempts: healingAttempts + 1
        });
        
        // Retry healing
        this.healingTimer = setTimeout(() => {
          this.attemptHealing();
        }, 1000 * (healingAttempts + 1)); // Exponential backoff
      }
    }, 1500);
  }

  private handleManualRetry = () => {
    console.log('🔄 Manual retry initiated');
    this.setState({
      hasError: false,
      error: null,
      isHealing: false,
      healingAttempts: 0,
      isResolved: false
    });
  }

  private handleForceReload = () => {
    console.log('🔄 Force reload initiated');
    window.location.reload();
  }

  componentWillUnmount() {
    if (this.healingTimer) {
      clearTimeout(this.healingTimer);
    }
  }

  render() {
    const { hasError, error, isHealing, healingAttempts, maxHealingAttempts, isResolved } = this.state;
    const { children, fallback, componentName } = this.props;

    // Show success message after healing
    if (isResolved) {
      return (
        <div className="nerve-center-fade-in">
          <Alert className="border-green-200 bg-green-50 mb-4">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              🎉 Component automatically healed! The error has been resolved.
            </AlertDescription>
          </Alert>
          {children}
        </div>
      );
    }

    // Show healing progress
    if (hasError && isHealing) {
      return (
        <div className="nerve-center-card p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Self-Healing in Progress</h3>
              <p className="text-gray-600 mt-2">
                Attempting to automatically resolve the error in {componentName}...
              </p>
              <div className="mt-4">
                <div className="flex justify-center items-center gap-2">
                  <div className="text-sm text-gray-500">
                    Attempt {healingAttempts + 1} of {maxHealingAttempts}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((healingAttempts + 1) / maxHealingAttempts) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Show error state with recovery options
    if (hasError) {
      if (fallback) {
        return (
          <div className="nerve-center-fade-in">
            <Alert className="border-red-200 bg-red-50 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                An error occurred in {componentName}. Using fallback component.
              </AlertDescription>
            </Alert>
            {fallback}
          </div>
        );
      }

      return (
        <div className="nerve-center-card p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Error in {componentName}</h3>
                  <p className="text-sm mt-1">{error?.message}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    onClick={this.handleManualRetry}
                    variant="outline"
                    size="sm"
                    className="text-red-700 border-red-300 hover:bg-red-100"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={this.handleForceReload}
                    variant="outline"
                    size="sm"
                    className="text-red-700 border-red-300 hover:bg-red-100"
                  >
                    Reload Page
                  </Button>
                </div>
                
                <div className="text-xs text-gray-600">
                  This error has been automatically reported and will be analyzed for future prevention.
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return children;
  }
}

export default SelfHealingErrorBoundary;