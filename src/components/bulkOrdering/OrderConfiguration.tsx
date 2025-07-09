import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Wallet, 
  BarChart3, 
  RefreshCw, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';

const OrderConfiguration = () => {
  const {
    catalog,
    configuration,
    setConfiguration,
    storageLocations,
    getRecommendedStorage,
    cartItems
  } = useBulkOrdering();

  const handleProviderChange = (provider: string) => {
    setConfiguration(prev => ({
      ...prev,
      provider,
      network: '' // Reset network when provider changes
    }));
  };

  const handleNetworkChange = (network: string) => {
    setConfiguration(prev => ({
      ...prev,
      network
    }));
  };

  const handleStorageLocationChange = (storageLocation: 'onecard' | 'revenue' | 'both') => {
    setConfiguration(prev => ({
      ...prev,
      storageLocation
    }));
  };

  const handleCustomerAssignmentTypeChange = (type: 'individual' | 'group' | 'bulk') => {
    setConfiguration(prev => ({
      ...prev,
      customerAssignments: {
        ...prev.customerAssignments,
        type
      }
    }));
  };

  const handleDeliveryModeChange = (immediate: boolean) => {
    setConfiguration(prev => ({
      ...prev,
      deliveryPreferences: {
        ...prev.deliveryPreferences,
        immediate
      }
    }));
  };

  const getStorageIcon = (id: string) => {
    switch (id) {
      case 'onecard': return <Wallet className="w-4 h-4" />;
      case 'revenue': return <BarChart3 className="w-4 h-4" />;
      case 'both': return <RefreshCw className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const selectedProvider = catalog?.providers.find(p => p.name === configuration.provider);
  const recommendedStorage = cartItems.length > 0 ? getRecommendedStorage(cartItems) : configuration.storageLocation;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Settings className="w-6 h-6" />
            Order Configuration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure your bulk order settings and delivery preferences
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider & Network Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Provider & Network</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select your provider and target network for the bulk order
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Provider</Label>
              <Select value={configuration.provider} onValueChange={handleProviderChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {catalog?.providers.map(provider => (
                    <SelectItem key={provider.id} value={provider.name}>
                      <div className="flex items-center justify-between w-full">
                        <span>{provider.name}</span>
                        {provider.available && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Available
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Network</Label>
              <Select 
                value={configuration.network} 
                onValueChange={handleNetworkChange}
                disabled={!configuration.provider}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvider?.networks.map(network => (
                    <SelectItem key={network} value={network}>
                      {network}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!configuration.provider && (
                <p className="text-xs text-muted-foreground">
                  Select a provider first to choose network
                </p>
              )}
            </div>

            {configuration.provider && configuration.network && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Provider and network configured
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Location Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Storage Location</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose where to store your bulk purchases for customer access
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {storageLocations.map(location => (
                <div
                  key={location.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    configuration.storageLocation === location.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleStorageLocationChange(location.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      {getStorageIcon(location.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{location.name}</h4>
                        {location.id === recommendedStorage && (
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{location.description}</p>
                      
                      {location.capacity && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Usage</span>
                            <span>{((location.currentUsage! / location.capacity) * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-muted h-1.5 rounded-full">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all"
                              style={{ 
                                width: `${(location.currentUsage! / location.capacity) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && recommendedStorage !== configuration.storageLocation && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>Recommendation:</strong> Based on your cart items, {' '}
                  {storageLocations.find(l => l.id === recommendedStorage)?.name} {' '}
                  would be optimal for this order.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Assignment Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Assignment</CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure how purchases will be assigned to customers
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  configuration.customerAssignments.type === 'bulk'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleCustomerAssignmentTypeChange('bulk')}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Bulk Assignment</h4>
                    <p className="text-xs text-muted-foreground">
                      Store items centrally for later distribution to customers
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  configuration.customerAssignments.type === 'individual'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleCustomerAssignmentTypeChange('individual')}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Individual Assignment</h4>
                    <p className="text-xs text-muted-foreground">
                      Assign specific items directly to individual customers
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  configuration.customerAssignments.type === 'group'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleCustomerAssignmentTypeChange('group')}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Group Assignment</h4>
                    <p className="text-xs text-muted-foreground">
                      Distribute items to predefined customer groups
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delivery Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">
              Set how and when the bulk order should be processed
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  configuration.deliveryPreferences.immediate
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleDeliveryModeChange(true)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Immediate Processing</h4>
                    <p className="text-xs text-muted-foreground">
                      Process and deliver the order immediately upon submission
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  !configuration.deliveryPreferences.immediate
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleDeliveryModeChange(false)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Scheduled Processing</h4>
                    <p className="text-xs text-muted-foreground">
                      Schedule the order for processing at a specific time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Provider</div>
              <div className="font-medium">
                {configuration.provider || 'Not selected'}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Network</div>
              <div className="font-medium">
                {configuration.network || 'Not selected'}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Storage</div>
              <div className="font-medium">
                {storageLocations.find(l => l.id === configuration.storageLocation)?.name}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Assignment</div>
              <div className="font-medium capitalize">
                {configuration.customerAssignments.type}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfiguration;