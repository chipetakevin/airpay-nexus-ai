import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  GripVertical,
  Code,
  Play,
  Save,
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { useUSSDData } from '@/hooks/useUSSDData';
import { useToast } from '@/hooks/use-toast';

interface MenuBuilderProps {
  ussdCodeId?: string;
}

const MenuBuilder = ({ ussdCodeId }: MenuBuilderProps) => {
  const { menuItems, createMenuItem, ussdCodes } = useUSSDData();
  const { toast } = useToast();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState([
    { 
      name: 'Divinely Mobile', 
      status: 'Active', 
      uptime: '99.9%', 
      color: 'green',
      icon: CheckCircle,
      description: 'Primary MVNO network'
    },
    { 
      name: 'MTN', 
      status: 'Active', 
      uptime: '99.8%', 
      color: 'yellow',
      icon: CheckCircle,
      description: 'Host network partner'
    },
    { 
      name: 'Vodacom', 
      status: 'Maintenance', 
      uptime: '98.5%', 
      color: 'orange',
      icon: AlertTriangle,
      description: 'Secondary network'
    },
    { 
      name: 'Cell C', 
      status: 'Active', 
      uptime: '99.2%', 
      color: 'blue',
      icon: CheckCircle,
      description: 'Backup network'
    }
  ]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    ussd_code_id: ussdCodeId || '',
    parent_id: null as string | null,
    level: 1,
    display_order: 0,
    service_id: null as string | null,
    status: 'active' as 'active' | 'inactive'
  });

  // Auto-refresh network status
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate network status updates
      setNetworkStatus(prev => prev.map(network => ({
        ...network,
        uptime: `${(Math.random() * 2 + 98).toFixed(1)}%`
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter menu items by USSD code
  const filteredMenuItems = menuItems.filter(item => 
    !ussdCodeId || item.ussd_code_id === ussdCodeId
  );

  // Build hierarchical structure
  const buildMenuTree = (items: typeof menuItems, parentId: string | null = null): any[] => {
    return items
      .filter(item => item.parent_id === parentId)
      .sort((a, b) => a.display_order - b.display_order)
      .map(item => ({
        ...item,
        children: buildMenuTree(items, item.id)
      }));
  };

  const menuTree = buildMenuTree(filteredMenuItems);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleCreateMenuItem = async () => {
    try {
      if (!newMenuItem.name || !newMenuItem.ussd_code_id) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      await createMenuItem(newMenuItem);
      
      // Reset form
      setNewMenuItem({
        name: '',
        ussd_code_id: ussdCodeId || '',
        parent_id: null,
        level: 1,
        display_order: 0,
        service_id: null,
        status: 'active'
      });
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  const renderMenuItem = (item: any, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="border rounded-lg mb-2">
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
        >
          <div className="flex items-center space-x-3">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(item.id)}
                className="p-1 h-6 w-6"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            )}
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">{item.name}</span>
              <Badge variant="outline" className="text-xs">
                Level {item.level}
              </Badge>
              <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                {item.status}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="w-3 h-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNewMenuItem({
                ...newMenuItem,
                parent_id: item.id,
                level: item.level + 1
              })}
            >
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="border-t">
            {item.children.map((child: any) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Code className="w-6 h-6 mr-2" />
          Menu Builder
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Test Menu
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Add New Menu Item */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Menu Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Menu Item Name</label>
              <Input
                placeholder="e.g., Check Balance"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">USSD Code</label>
              <Select
                value={newMenuItem.ussd_code_id}
                onValueChange={(value) => setNewMenuItem({ ...newMenuItem, ussd_code_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select USSD Code" />
                </SelectTrigger>
                <SelectContent>
                  {ussdCodes.map((code) => (
                    <SelectItem key={code.id} value={code.id}>
                      {code.code} - {code.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Parent Menu Item</label>
              <Select
                value={newMenuItem.parent_id || 'none'}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  parent_id: value === 'none' ? null : value,
                  level: value === 'none' ? 1 : 2 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Parent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Root Level</SelectItem>
                  {filteredMenuItems
                    .filter(item => item.level === 1)
                    .map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                placeholder="0"
                value={newMenuItem.display_order}
                onChange={(e) => setNewMenuItem({ 
                  ...newMenuItem, 
                  display_order: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Service Assignment</label>
              <Select
                value={newMenuItem.service_id || 'none'}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  service_id: value === 'none' ? null : value 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Service (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Service</SelectItem>
                  <SelectItem value="balance_check">Balance Check</SelectItem>
                  <SelectItem value="airtime_purchase">Airtime Purchase</SelectItem>
                  <SelectItem value="data_purchase">Data Purchase</SelectItem>
                  <SelectItem value="banking">Banking Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={newMenuItem.status}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  status: value as 'active' | 'inactive' 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleCreateMenuItem} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Menu Item
          </Button>
        </CardContent>
      </Card>

      {/* Network Status Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Network Status</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Real-time network monitoring for USSD services
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-muted-foreground mb-4">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkStatus.map((network, index) => {
              const StatusIcon = network.icon;
              const dotColors = {
                green: 'bg-green-500',
                yellow: 'bg-yellow-500', 
                orange: 'bg-orange-500',
                blue: 'bg-blue-500',
                red: 'bg-red-500'
              };
              
              const statusColors = {
                green: 'text-green-700 bg-green-50 border-green-200',
                yellow: 'text-yellow-700 bg-yellow-50 border-yellow-200',
                orange: 'text-orange-700 bg-orange-50 border-orange-200', 
                blue: 'text-blue-700 bg-blue-50 border-blue-200',
                red: 'text-red-700 bg-red-50 border-red-200'
              };

              return (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border hover:shadow-md transition-all duration-200 ${statusColors[network.color]}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${dotColors[network.color]} animate-pulse`} />
                      <h3 className="font-semibold text-lg">{network.name}</h3>
                    </div>
                    <StatusIcon className={`w-5 h-5 ${network.color === 'green' ? 'text-green-600' : network.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{network.status}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Uptime: <span className="font-medium">{network.uptime}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {network.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Network Performance Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="font-medium text-emerald-800">Overall Network Health</h4>
                  <p className="text-sm text-emerald-600">All systems operational</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-700">99.1%</div>
                <div className="text-xs text-emerald-600">Average Uptime</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Tree Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Structure</CardTitle>
        </CardHeader>
        <CardContent>
          {menuTree.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No menu items created yet.</p>
              <p className="text-sm">Add your first menu item above to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {menuTree.map(item => renderMenuItem(item))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuBuilder;