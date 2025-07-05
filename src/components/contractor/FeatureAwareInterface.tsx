import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { usePermissions } from '@/hooks/usePermissions';
import FeatureGuard from '@/components/common/FeatureGuard';
import { 
  Smartphone, 
  FileText, 
  MapPin, 
  Camera, 
  Upload, 
  Navigation, 
  Package, 
  BarChart3, 
  DollarSign, 
  Wifi,
  Lock
} from 'lucide-react';

const FeatureIcon = ({ featureKey }: { featureKey: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'sim_activation': <Smartphone className="h-5 w-5" />,
    'kyc_verification': <FileText className="h-5 w-5" />,
    'site_visits': <MapPin className="h-5 w-5" />,
    'document_upload': <Upload className="h-5 w-5" />,
    'photo_capture': <Camera className="h-5 w-5" />,
    'gps_tracking': <Navigation className="h-5 w-5" />,
    'bulk_submissions': <Package className="h-5 w-5" />,
    'report_viewing': <BarChart3 className="h-5 w-5" />,
    'commission_tracking': <DollarSign className="h-5 w-5" />,
    'offline_mode': <Wifi className="h-5 w-5" />
  };

  return iconMap[featureKey] || <FileText className="h-5 w-5" />;
};

export const FeatureAwareInterface: React.FC = () => {
  const { features, checkFeatureAccess } = useFeatureAccess();
  const { currentUser } = usePermissions();
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAvailableFeatures();
  }, [currentUser]);

  const loadAvailableFeatures = async () => {
    if (!currentUser?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const accessPromises = features.map(async (feature) => {
        const hasAccess = await checkFeatureAccess(currentUser.id, feature.feature_key);
        return hasAccess ? feature.feature_key : null;
      });

      const accessResults = await Promise.all(accessPromises);
      const enabledFeatures = accessResults.filter(Boolean) as string[];
      setAvailableFeatures(enabledFeatures);
    } catch (error) {
      console.error('Error loading available features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasFeature = (featureKey: string) => {
    return availableFeatures.includes(featureKey);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading interface...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Field Work Dashboard</h1>
          <p className="text-muted-foreground">
            Access your available features and tools
          </p>
        </div>
        <Badge variant="secondary">
          {availableFeatures.length} features enabled
        </Badge>
      </div>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="field_work">Field Work</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <FeatureGuard featureKey="sim_activation">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="sim_activation" />
                    SIM Activation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit SIM activation requests for customers
                  </p>
                  <Button className="w-full">
                    Start Activation
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="kyc_verification">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="kyc_verification" />
                    KYC Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit customer KYC documents
                  </p>
                  <Button className="w-full">
                    Submit KYC
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="document_upload">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="document_upload" />
                    Document Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload supporting documents
                  </p>
                  <Button className="w-full">
                    Upload Files
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

          </div>
        </TabsContent>

        <TabsContent value="field_work" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <FeatureGuard featureKey="site_visits">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="site_visits" />
                    Site Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Log site visit activities and observations
                  </p>
                  <Button className="w-full">
                    Log Visit
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="photo_capture">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="photo_capture" />
                    Photo Capture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Capture and upload photos for documentation
                  </p>
                  <Button className="w-full">
                    Take Photo
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="gps_tracking">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="gps_tracking" />
                    GPS Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share location data with submissions
                  </p>
                  <Button className="w-full">
                    Share Location
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

          </div>
        </TabsContent>

        <TabsContent value="reporting" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <FeatureGuard featureKey="report_viewing">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="report_viewing" />
                    Performance Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View your daily and monthly performance reports
                  </p>
                  <Button className="w-full">
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="commission_tracking">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="commission_tracking" />
                    Commission Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your earnings and commission status
                  </p>
                  <Button className="w-full">
                    View Commissions
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <FeatureGuard featureKey="bulk_submissions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="bulk_submissions" />
                    Bulk Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit multiple records at once for efficiency
                  </p>
                  <Button className="w-full">
                    Bulk Submit
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

            <FeatureGuard featureKey="offline_mode">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FeatureIcon featureKey="offline_mode" />
                    Offline Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Work offline and sync when connected
                  </p>
                  <Button className="w-full">
                    Enable Offline
                  </Button>
                </CardContent>
              </Card>
            </FeatureGuard>

          </div>
        </TabsContent>
      </Tabs>

      {/* Disabled Features Notice */}
      {features.length > availableFeatures.length && (
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            {features.length - availableFeatures.length} feature{features.length - availableFeatures.length !== 1 ? 's are' : ' is'} currently disabled for your account. 
            Contact your administrator to request access to additional features.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};