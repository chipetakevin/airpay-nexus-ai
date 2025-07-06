import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface MNOProvider {
  id: string;
  name: string;
  type: 'MNO' | 'Distributor';
  status: 'connected' | 'disconnected' | 'error';
  apiType: 'REST' | 'SOAP';
  balance: number;
  networks: string[];
  lastSync: string;
}

interface Product {
  id: string;
  network: string;
  type: 'airtime' | 'data';
  denomination: number;
  cost: number;
  margin: number;
  available: boolean;
}

const MNOIntegrationPanel = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<MNOProvider[]>([
    {
      id: 'freepaid',
      name: 'Freepaid API',
      type: 'Distributor',
      status: 'connected',
      apiType: 'SOAP',
      balance: 15750.50,
      networks: ['Vodacom', 'MTN', 'Cell C', 'Telkom'],
      lastSync: '2024-01-15T10:30:00'
    },
    {
      id: 'blu_telecoms',
      name: 'Blu Telecoms',
      type: 'Distributor', 
      status: 'connected',
      apiType: 'REST',
      balance: 28900.75,
      networks: ['Vodacom', 'MTN', 'Cell C', 'Telkom'],
      lastSync: '2024-01-15T10:25:00'
    },
    {
      id: 'mtn_direct',
      name: 'MTN Direct API',
      type: 'MNO',
      status: 'disconnected',
      apiType: 'REST',
      balance: 0,
      networks: ['MTN'],
      lastSync: 'Never'
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', network: 'MTN', type: 'airtime', denomination: 10, cost: 9.50, margin: 0.50, available: true },
    { id: '2', network: 'MTN', type: 'airtime', denomination: 50, cost: 47.50, margin: 2.50, available: true },
    { id: '3', network: 'Vodacom', type: 'data', denomination: 100, cost: 95.00, margin: 5.00, available: true },
    { id: '4', network: 'Cell C', type: 'airtime', denomination: 25, cost: 23.75, margin: 1.25, available: true }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [bulkOrderAmount, setBulkOrderAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  const handleSyncProvider = async (providerId: string) => {
    toast({
      title: "Syncing Provider",
      description: `Syncing balances and products for ${providers.find(p => p.id === providerId)?.name}...`
    });

    // Simulate API call
    setTimeout(() => {
      setProviders(prev => prev.map(p => 
        p.id === providerId 
          ? { ...p, lastSync: new Date().toISOString(), status: 'connected' as const }
          : p
      ));
      
      toast({
        title: "Sync Complete",
        description: "Provider data updated successfully"
      });
    }, 2000);
  };

  const handleBulkOrder = async () => {
    if (!selectedProvider || !bulkOrderAmount || !selectedNetwork) {
      toast({
        title: "Missing Information",
        description: "Please select provider, network, and enter amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing Bulk Order",
      description: `Placing bulk order for R${bulkOrderAmount} on ${selectedNetwork}...`
    });

    // Simulate API integration
    setTimeout(() => {
      toast({
        title: "Bulk Order Placed",
        description: `Successfully ordered R${bulkOrderAmount} inventory for ${selectedNetwork}`,
      });
      
      // Update provider balance
      setProviders(prev => prev.map(p => 
        p.id === selectedProvider 
          ? { ...p, balance: p.balance - parseFloat(bulkOrderAmount) }
          : p
      ));
      
      setBulkOrderAmount('');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">MNO & Distributor Integration Hub</h3>
        <p className="text-gray-600">Manage connections to Mobile Network Operators and bulk distributors</p>
      </div>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bulk-orders">Bulk Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-gray-600">{provider.type} • {provider.apiType}</p>
                    </div>
                    <Badge className={getStatusColor(provider.status)}>
                      {provider.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Balance</Label>
                    <p className="font-semibold text-lg">R{provider.balance.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Networks</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {provider.networks.map((network) => (
                        <Badge key={network} variant="outline" className="text-xs">
                          {network}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Last Sync</Label>
                    <p className="text-sm">
                      {provider.lastSync === 'Never' 
                        ? 'Never' 
                        : new Date(provider.lastSync).toLocaleString()
                      }
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => handleSyncProvider(provider.id)}
                    className="w-full"
                    size="sm"
                  >
                    Sync Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Network</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Value</th>
                      <th className="text-left p-2">Cost</th>
                      <th className="text-left p-2">Margin</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-2">{product.network}</td>
                        <td className="p-2 capitalize">{product.type}</td>
                        <td className="p-2">R{product.denomination}</td>
                        <td className="p-2">R{product.cost}</td>
                        <td className="p-2 text-green-600">R{product.margin}</td>
                        <td className="p-2">
                          <Badge className={product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Place Bulk Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.filter(p => p.status === 'connected').map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name} (R{provider.balance.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Network</Label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MTN">MTN</SelectItem>
                      <SelectItem value="Vodacom">Vodacom</SelectItem>
                      <SelectItem value="Cell C">Cell C</SelectItem>
                      <SelectItem value="Telkom">Telkom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={bulkOrderAmount}
                    onChange={(e) => setBulkOrderAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={handleBulkOrder} className="w-full md:w-auto">
                Place Bulk Order
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MNOIntegrationPanel;