import React from 'react';
import { EnhancedToggle } from '@/components/ui/enhanced-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Info, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface FeatureToggleRowProps {
  featureKey: string;
  featureName: string;
  featureDescription?: string;
  category: string;
  isEnabled: boolean;
  isLoading?: boolean;
  canToggle?: boolean;
  onToggle?: (enabled: boolean) => void;
  showQuickActions?: boolean;
  onQuickEnable?: () => void;
  onQuickDisable?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const FeatureToggleRow: React.FC<FeatureToggleRowProps> = ({
  featureKey,
  featureName,
  featureDescription,
  category,
  isEnabled,
  isLoading = false,
  canToggle = true,
  onToggle,
  showQuickActions = false,
  onQuickEnable,
  onQuickDisable,
  variant = 'default',
  className
}) => {
  const handleToggle = (checked: boolean) => {
    if (canToggle && onToggle) {
      onToggle(checked);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />;
    if (isEnabled) return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
    return <AlertCircle className="h-4 w-4 text-toggle-disabled" />;
  };

  const getRowStyles = () => {
    const baseStyles = "transition-all duration-200 rounded-lg border";
    
    if (isEnabled) {
      return cn(baseStyles, "bg-feature-enabled-bg border-feature-enabled-border");
    }
    
    if (isLoading) {
      return cn(baseStyles, "bg-feature-pending-bg border-feature-pending-border");
    }
    
    return cn(baseStyles, "bg-feature-disabled-bg border-feature-disabled-border");
  };

  if (variant === 'compact') {
    return (
      <div className={cn(getRowStyles(), "p-3 flex items-center justify-between", className)}>
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <span className="font-medium text-sm">{featureName}</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {category}
            </Badge>
          </div>
        </div>
        
        {canToggle ? (
          <EnhancedToggle
            checked={isEnabled}
            onCheckedChange={handleToggle}
            loading={isLoading}
            size="sm"
            showLabels={false}
            disabled={!canToggle}
          />
        ) : (
          <Badge variant={isEnabled ? "default" : "secondary"} className="text-xs">
            {isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className={cn(getRowStyles(), "p-4", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          {getStatusIcon()}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium">{featureName}</h3>
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </div>
            
            {featureDescription && variant === 'detailed' && (
              <p className="text-sm text-muted-foreground mb-2">
                {featureDescription}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                {featureKey}
              </span>
              
              {canToggle ? (
                <EnhancedToggle
                  checked={isEnabled}
                  onCheckedChange={handleToggle}
                  loading={isLoading}
                  disabled={!canToggle}
                  showIcons={variant === 'detailed'}
                />
              ) : (
                <Badge 
                  variant={isEnabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {isEnabled ? "Enabled" : "Disabled"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {showQuickActions && canToggle && (
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            onClick={onQuickEnable}
            disabled={isEnabled || isLoading}
            className="h-7 px-3 text-xs"
          >
            Enable
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onQuickDisable}
            disabled={!isEnabled || isLoading}
            className="h-7 px-3 text-xs"
          >
            Disable
          </Button>
        </div>
      )}
    </div>
  );
};