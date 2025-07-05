import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { usePermissions } from '@/hooks/usePermissions';
import { Shield, CheckCircle, XCircle, Info } from 'lucide-react';

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

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}</span>
                  <Badge variant="outline">
                    {enabledFeatures.length}/{totalFeatures} enabled
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFeatures.map(feature => {
                    const isEnabled = getFeatureStatus(feature.feature_key);
                    
                    return (
                      <div
                        key={feature.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          isEnabled 
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                            : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{feature.feature_name}</h3>
                              {isEnabled ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            {feature.feature_description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {feature.feature_description}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <Badge 
                                variant={isEnabled ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {isEnabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {feature.feature_key}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {myFeatures.filter(f => f.is_enabled).length}
              </div>
              <div className="text-sm text-muted-foreground">Enabled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">
                {features.length - myFeatures.filter(f => f.is_enabled).length}
              </div>
              <div className="text-sm text-muted-foreground">Disabled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {features.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {categories.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};