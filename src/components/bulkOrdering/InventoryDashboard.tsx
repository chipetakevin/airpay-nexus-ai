import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  RefreshCw,
  Wallet,
  Phone,
  Wifi,
  Smartphone,
  Gift
} from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';

const InventoryDashboard = () => {
  const { catalog, storageLocations } = useBulkOrdering();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock inventory data - in real implementation, this would come from the backend
  const inventoryData = {
    onecard: {
      totalValue: 125000,
      totalItems: 8500,
      categories: {
        airtime: { value: 45000, items: 4500, reorderLevel: 1000 },
        data: { value: 65000, items: 2600, reorderLevel: 500 },
        devices: { value: 12000, items: 1200, reorderLevel: 200 },
        promotional: { value: 3000, items: 200, reorderLevel: 50 }
      }
    },
    revenue: {
      totalValue: 285000,
      totalItems: 19200,
      categories: {
        airtime: { value: 125000, items: 12500, reorderLevel: 2000 },
        data: { value: 135000, items: 5400, reorderLevel: 1000 },
        devices: { value: 22000, items: 1100, reorderLevel: 300 },
        promotional: { value: 3000, items: 200, reorderLevel: 100 }
      }
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'airtime': return <Phone className="w-4 h-4" />;
      case 'data': return <Wifi className="w-4 h-4" />;
      case 'devices': return <Smartphone className="w-4 h-4" />;
      case 'promotional': return <Gift className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStorageIcon = (location: string) => {
    switch (location) {
      case 'onecard': return <Wallet className="w-4 h-4" />;
      case 'revenue': return <BarChart3 className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (current: number, reorderLevel: number) => {
    const ratio = current / reorderLevel;
    if (ratio >= 2) return 'text-green-600';
    if (ratio >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (current: number, reorderLevel: number) => {
    const ratio = current / reorderLevel;
    if (ratio >= 2) return 'bg-green-500';
    if (ratio >= 1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalValue = inventoryData.onecard.totalValue + inventoryData.revenue.totalValue;
  const totalItems = inventoryData.onecard.totalItems + inventoryData.revenue.totalItems;

  const getLocationData = () => {
    if (selectedLocation === 'all') {
      return Object.entries(inventoryData);
    } else {
      return [[selectedLocation, inventoryData[selectedLocation as keyof typeof inventoryData]]] as const;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6" />
            Inventory Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time inventory levels across all storage locations
          </p>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">R{totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{totalItems.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sync Status</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Real-time sync enabled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Storage Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="onecard">OneCard Digital Wallet</SelectItem>
                <SelectItem value="revenue">Revenue Management</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="airtime">Airtime</SelectItem>
                <SelectItem value="data">Data Bundles</SelectItem>
                <SelectItem value="devices">Devices</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory by Location */}
      <div className="space-y-6">
        {getLocationData().map(([locationKey, locationData]) => {
          const data = locationData as typeof inventoryData.onecard;
          return (
          <Card key={locationKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStorageIcon(locationKey)}
                {locationKey === 'onecard' ? 'OneCard Digital Wallet' : 'Revenue Management'}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Total Value: R{data.totalValue.toLocaleString()}</span>
                <span>Total Items: {data.totalItems.toLocaleString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(data.categories)
                  .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
                  .map(([category, categoryData]) => {
                    const progressPercentage = Math.min((categoryData.items / categoryData.reorderLevel) * 50, 100);
                    const isLowStock = categoryData.items < categoryData.reorderLevel;
                    
                    return (
                      <Card key={category} className={`border ${isLowStock ? 'border-red-200 bg-red-50' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-muted rounded-lg">
                              {getIcon(category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm capitalize">{category}</h4>
                              <p className="text-xs text-muted-foreground">
                                R{categoryData.value.toLocaleString()}
                              </p>
                            </div>
                            {isLowStock && (
                              <Badge variant="destructive" className="text-xs">
                                Low
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Stock Level</span>
                              <span className={`font-medium ${getStatusColor(categoryData.items, categoryData.reorderLevel)}`}>
                                {categoryData.items.toLocaleString()}
                              </span>
                            </div>
                            
                            <Progress 
                              value={progressPercentage} 
                              className="h-2"
                            />
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Reorder: {categoryData.reorderLevel}</span>
                              <span>{Math.round((categoryData.items / categoryData.reorderLevel) * 100)}%</span>
                            </div>
                          </div>

                          {isLowStock && (
                            <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Reorder Now
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
      </div>

      {/* Storage Location Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Capacity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageLocations
              .filter(location => location.capacity)
              .map(location => {
                const usagePercentage = location.currentUsage && location.capacity 
                  ? (location.currentUsage / location.capacity) * 100 
                  : 0;
                
                return (
                  <div key={location.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStorageIcon(location.id)}
                        <span className="font-medium">{location.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {usagePercentage.toFixed(1)}% used
                      </Badge>
                    </div>
                    
                    <Progress value={usagePercentage} className="h-3" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {location.currentUsage?.toLocaleString()} / {location.capacity?.toLocaleString()}
                      </span>
                      <span>
                        {(location.capacity! - location.currentUsage!).toLocaleString()} available
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;