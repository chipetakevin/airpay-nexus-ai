import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FeatureToggleRow } from '@/components/common/FeatureToggleRow';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { usePermissions } from '@/hooks/usePermissions';
import { Shield, CheckCircle, XCircle, Info, TrendingUp, Clock } from 'lucide-react';

export const ContractorFeaturePanel: React.FC = () => {
  const { features, isLoading, getContractorFeatureAccess } = useFeatureAccess();
  const { currentUser } = usePermissions();
  const [myFeatures, setMyFeatures] = useState<any[]>([]);
  const [loadingAccess, setLoadingAccess] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      loadMyFeatures();
    }
  }, [currentUser]);

  const loadMyFeatures = async () => {
    if (!currentUser?.id) return;
    
    try {
      const access = await getContractorFeatureAccess(currentUser.id);
      setMyFeatures(access);
    } catch (error) {
      console.error('Error loading my features:', error);
    } finally {
      setLoadingAccess(false);
    }
  };

  const getFeatureStatus = (featureKey: string) => {
    const access = myFeatures.find(f => f.feature_key === featureKey);
    return access?.is_enabled || false;
  };

  const getFeatureByKey = (featureKey: string) => {
    return features.find(f => f.feature_key === featureKey);
  };

  const getCategoryFeatures = (category: string) => {
    return features.filter(f => f.category === category);
  };

  const categories = [...new Set(features.map(f => f.category))];

  if (isLoading || loadingAccess) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading your features...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Features</h1>
          <p className="text-muted-foreground">
            Features available for your account
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Contractor Access
        </Badge>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Contact your administrator if you need access to additional features for your work.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {categories.map(category => {
          const categoryFeatures = getCategoryFeatures(category);
          const enabledFeatures = categoryFeatures.filter(f => getFeatureStatus(f.feature_key));
          const totalFeatures = categoryFeatures.length;
          const completionRate = totalFeatures > 0 ? (enabledFeatures.length / totalFeatures) * 100 : 0;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {completionRate > 75 ? (
                      <CheckCircle className="h-5 w-5 text-toggle-enabled" />
                    ) : completionRate > 25 ? (
                      <Clock className="h-5 w-5 text-feature-pending-text" />
                    ) : (
                      <XCircle className="h-5 w-5 text-toggle-disabled" />
                    )}
                    <span>{category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={
                      completionRate > 75 ? "border-feature-enabled-border text-feature-enabled-text" :
                      completionRate > 25 ? "border-feature-pending-border text-feature-pending-text" :
                      "border-feature-disabled-border text-feature-disabled-text"
                    }>
                      {enabledFeatures.length}/{totalFeatures} enabled
                    </Badge>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          completionRate > 75 ? "bg-toggle-enabled" :
                          completionRate > 25 ? "bg-feature-pending-border" :
                          "bg-toggle-disabled"
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryFeatures.map(feature => (
                    <FeatureToggleRow
                      key={feature.id}
                      featureKey={feature.feature_key}
                      featureName={feature.feature_name}
                      featureDescription={feature.feature_description}
                      category={feature.category}
                      isEnabled={getFeatureStatus(feature.feature_key)}
                      canToggle={false}
                      variant="detailed"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Feature Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-feature-enabled-bg rounded-lg border border-feature-enabled-border">
              <div className="text-2xl font-bold text-feature-enabled-text">
                {myFeatures.filter(f => f.is_enabled).length}
              </div>
              <div className="text-sm text-feature-enabled-text">Enabled</div>
            </div>
            <div className="text-center p-4 bg-feature-disabled-bg rounded-lg border border-feature-disabled-border">
              <div className="text-2xl font-bold text-feature-disabled-text">
                {features.length - myFeatures.filter(f => f.is_enabled).length}
              </div>
              <div className="text-sm text-feature-disabled-text">Disabled</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold">
                {features.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Available</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">
                {categories.length}
              </div>
              <div className="text-sm text-primary/80">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};