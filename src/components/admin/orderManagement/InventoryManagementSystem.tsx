import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  network: string;
  type: 'airtime' | 'data';
  denomination: number;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  costPrice: number;
  sellingPrice: number;
  margin: number;
  lastRestocked: string;
  autoReorderEnabled: boolean;
  provider: string;
}

interface StockAlert {
  id: string;
  itemId: string;
  type: 'low_stock' | 'out_of_stock' | 'reorder_failed';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const InventoryManagementSystem = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      network: 'MTN',
      type: 'airtime',
      denomination: 10,
      currentStock: 150,
      minThreshold: 50,
      maxThreshold: 500,
      costPrice: 9.50,
      sellingPrice: 10.00,
      margin: 0.50,
      lastRestocked: '2024-01-14T10:30:00',
      autoReorderEnabled: true,
      provider: 'freepaid'
    },
    {
      id: 'INV-002',
      network: 'MTN',
      type: 'airtime',
      denomination: 50,
      currentStock: 25,
      minThreshold: 30,
      maxThreshold: 200,
      costPrice: 47.50,
      sellingPrice: 50.00,
      margin: 2.50,
      lastRestocked: '2024-01-13T15:20:00',
      autoReorderEnabled: true,
      provider: 'freepaid'
    },
    {
      id: 'INV-003',
      network: 'Vodacom',
      type: 'data',
      denomination: 100,
      currentStock: 0,
      minThreshold: 20,
      maxThreshold: 150,
      costPrice: 95.00,
      sellingPrice: 100.00,
      margin: 5.00,
      lastRestocked: '2024-01-10T09:15:00',
      autoReorderEnabled: false,
      provider: 'blu_telecoms'
    }
  ]);

  const [alerts, setAlerts] = useState<StockAlert[]>([
    {
      id: 'ALERT-001',
      itemId: 'INV-002',
      type: 'low_stock',
      message: 'MTN R50 Airtime stock is below minimum threshold (25/30)',
      timestamp: '2024-01-15T08:30:00',
      resolved: false
    },
    {
      id: 'ALERT-002', 
      itemId: 'INV-003',
      type: 'out_of_stock',
      message: 'Vodacom R100 Data is out of stock',
      timestamp: '2024-01-15T07:45:00',
      resolved: false
    }
  ]);

  const [reorderAmount, setReorderAmount] = useState<{ [key: string]: string }>({});

  const handleManualReorder = (itemId: string) => {
    const amount = parseInt(reorderAmount[itemId] || '0');
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid reorder amount",
        variant: "destructive"
      });
      return;
    }

    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    toast({
      title: "Reorder Initiated",
      description: `Ordering ${amount} units of ${item.network} R${item.denomination} ${item.type}`,
    });

    // Simulate API call and update stock
    setTimeout(() => {
      setInventory(prev => prev.map(i => 
        i.id === itemId 
          ? { ...i, currentStock: i.currentStock + amount, lastRestocked: new Date().toISOString() }
          : i
      ));
      
      toast({
        title: "Reorder Complete",
        description: `Successfully added ${amount} units to inventory`,
      });
      
      setReorderAmount(prev => ({ ...prev, [itemId]: '' }));
    }, 2000);
  };

  const handleAutoReorderToggle = (itemId: string) => {
    setInventory(prev => prev.map(i => 
      i.id === itemId 
        ? { ...i, autoReorderEnabled: !i.autoReorderEnabled }
        : i
    ));
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId 
        ? { ...a, resolved: true }
        : a
    ));
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) return { status: 'out', color: 'bg-red-100 text-red-800' };
    if (item.currentStock <= item.minThreshold) return { status: 'low', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'good', color: 'bg-green-100 text-green-800' };
  };

  const getStockPercentage = (item: InventoryItem) => {
    return Math.min((item.currentStock / item.maxThreshold) * 100, 100);
  };

  const totalInventoryValue = inventory.reduce((total, item) => total + (item.currentStock * item.costPrice), 0);
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minThreshold).length;
  const outOfStockItems = inventory.filter(item => item.currentStock === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Inventory Management System</h3>
        <p className="text-gray-600">Monitor and manage airtime/data stock levels and automatic reordering</p>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">R{totalInventoryValue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Inventory Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{inventory.length}</div>
            <div className="text-sm text-gray-600">Total SKUs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <div className="text-sm text-gray-600">Low Stock Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts */}
      {alerts.filter(a => !a.resolved).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">⚠️ Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.filter(a => !a.resolved).map((alert) => (
                <Alert key={alert.id} className="border-red-200">
                  <AlertDescription className="flex justify-between items-center">
                    <span>{alert.message}</span>
                    <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                      Resolve
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((item) => {
              const stockStatus = getStockStatus(item);
              const stockPercentage = getStockPercentage(item);
              
              return (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <div className="font-medium">{item.network}</div>
                      <div className="text-sm text-gray-600">
                        R{item.denomination} {item.type}
                      </div>
                      <div className="text-xs text-gray-500">{item.id}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium">{item.currentStock}</div>
                      <div className="text-sm text-gray-600">units</div>
                      <Badge className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Stock Level</div>
                      <Progress value={stockPercentage} className="h-2 mt-1" />
                      <div className="text-xs text-gray-500 mt-1">
                        {item.minThreshold} - {item.maxThreshold}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Cost/Sell</div>
                      <div className="font-medium">R{item.costPrice}/R{item.sellingPrice}</div>
                      <div className="text-xs text-green-600">+R{item.margin}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Provider</div>
                      <div className="font-medium">{item.provider}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="checkbox" 
                          checked={item.autoReorderEnabled}
                          onChange={() => handleAutoReorderToggle(item.id)}
                        />
                        <span className="text-sm">Auto Reorder</span>
                      </div>
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={reorderAmount[item.id] || ''}
                          onChange={(e) => setReorderAmount(prev => ({ ...prev, [item.id]: e.target.value }))}
                          className="w-20 h-8"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleManualReorder(item.id)}
                          className="h-8"
                        >
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reorder Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Reorder Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Global Auto-Reorder</Label>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Enable automatic reordering for all eligible items</span>
              </div>
            </div>
            
            <div>
              <Label>Reorder Schedule</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Check stock levels every</span>
                <Input type="number" defaultValue="4" className="w-16" />
                <span className="text-sm">hours</span>
              </div>
            </div>
            
            <div>
              <Label>Emergency Threshold</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Alert when stock drops below</span>
                <Input type="number" defaultValue="10" className="w-16" />
                <span className="text-sm">% of minimum</span>
              </div>
            </div>
            
            <div>
              <Label>Maximum Order Value</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">R</span>
                <Input type="number" defaultValue="50000" className="w-24" />
                <span className="text-sm">per single order</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button>Save Settings</Button>
            <Button variant="outline">Run Stock Check Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagementSystem;