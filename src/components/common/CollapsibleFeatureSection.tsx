import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FeatureToggleRow } from './FeatureToggleRow';
import { ChevronDown, ChevronRight, CheckCircle2, Clock, AlertCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  feature_key: string;
  feature_name: string;
  feature_description?: string;
  category: string;
  is_active: boolean;
}

interface CollapsibleFeatureSectionProps {
  category: string;
  features: Feature[];
  getFeatureStatus: (featureKey: string) => boolean;
  onToggleFeature?: (featureKey: string, enabled: boolean) => void;
  canToggle?: boolean;
  isLoading?: boolean;
  onBulkToggle?: (category: string, enabled: boolean) => void;
  defaultOpen?: boolean;
  showQuickActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export const CollapsibleFeatureSection: React.FC<CollapsibleFeatureSectionProps> = ({
  category,
  features,
  getFeatureStatus,
  onToggleFeature,
  canToggle = false,
  isLoading = false,
  onBulkToggle,
  defaultOpen = false,
  showQuickActions = false,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const enabledFeatures = features.filter(f => getFeatureStatus(f.feature_key));
  const totalFeatures = features.length;
  const completionRate = totalFeatures > 0 ? (enabledFeatures.length / totalFeatures) * 100 : 0;

  const getCategoryIcon = () => {
    if (completionRate === 100) {
      return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
    } else if (completionRate > 0) {
      return <Clock className="h-4 w-4 text-feature-pending-text" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-toggle-disabled" />;
    }
  };

  const getCategoryBadgeColor = () => {
    if (completionRate === 100) {
      return "border-feature-enabled-border text-feature-enabled-text bg-feature-enabled-bg";
    } else if (completionRate > 0) {
      return "border-feature-pending-border text-feature-pending-text bg-feature-pending-bg";
    } else {
      return "border-feature-disabled-border text-feature-disabled-text bg-feature-disabled-bg";
    }
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
  };

  const handleBulkToggle = (enabled: boolean) => {
    if (onBulkToggle) {
      onBulkToggle(category, enabled);
    } else if (onToggleFeature) {
      features.forEach(feature => {
        if (onToggleFeature) {
          onToggleFeature(feature.feature_key, enabled);
        }
      });
    }
  };

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                {getCategoryIcon()}
                <div>
                  <h3 className="font-semibold">{formatCategoryName(category)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {enabledFeatures.length} of {totalFeatures} features enabled
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getCategoryBadgeColor())}
                >
                  {enabledFeatures.length}/{totalFeatures}
                </Badge>
                
                {/* Progress Bar */}
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      completionRate === 100 ? "bg-toggle-enabled" :
                      completionRate > 0 ? "bg-feature-pending-border" :
                      "bg-toggle-disabled"
                    )}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                
                <span className="text-xs text-muted-foreground font-mono min-w-[3rem]">
                  {Math.round(completionRate)}%
                </span>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {/* Quick Actions */}
            {showQuickActions && canToggle && (
              <div className="flex items-center justify-between mb-4 p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Quick Actions</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkToggle(true)}
                    disabled={isLoading || completionRate === 100}
                    className="h-7 px-3 text-xs hover:bg-feature-enabled-bg hover:border-feature-enabled-border"
                  >
                    Enable All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkToggle(false)}
                    disabled={isLoading || completionRate === 0}
                    className="h-7 px-3 text-xs hover:bg-feature-disabled-bg hover:border-feature-disabled-border"
                  >
                    Disable All
                  </Button>
                </div>
              </div>
            )}

            {/* Feature List */}
            <div className={cn(
              "space-y-3",
              variant === 'compact' && "space-y-2"
            )}>
              {features.map(feature => (
                <FeatureToggleRow
                  key={feature.id}
                  featureKey={feature.feature_key}
                  featureName={feature.feature_name}
                  featureDescription={feature.feature_description}
                  category={feature.category}
                  isEnabled={getFeatureStatus(feature.feature_key)}
                  isLoading={isLoading}
                  canToggle={canToggle}
                  onToggle={(enabled) => onToggleFeature?.(feature.feature_key, enabled)}
                  variant={variant}
                  showQuickActions={false} // Already handled at section level
                />
              ))}
            </div>

            {features.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No features available in this category</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};