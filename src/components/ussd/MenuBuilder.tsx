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
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left Section with Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border shadow-sm">
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <Code className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200" />
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <Code className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                Menu Builder
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Design and configure USSD menu structures
              </p>
            </div>
          </div>

          {/* Right Section with Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Menu
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Add New Menu Item Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Plus className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-800">Add New Menu Item</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Create new USSD menu options and configure their behavior
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Primary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Menu Item Name
              </label>
              <Input
                placeholder="e.g., Check Balance"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                USSD Code
              </label>
              <Select
                value={newMenuItem.ussd_code_id}
                onValueChange={(value) => setNewMenuItem({ ...newMenuItem, ussd_code_id: value })}
              >
                <SelectTrigger className="border-gray-200 focus:border-purple-500">
                  <SelectValue placeholder="Select USSD Code" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl">
                  {ussdCodes.map((code) => (
                    <SelectItem key={code.id} value={code.id} className="hover:bg-gray-50">
                      {code.code} - {code.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Parent Menu Item
              </label>
              <Select
                value={newMenuItem.parent_id || 'none'}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  parent_id: value === 'none' ? null : value,
                  level: value === 'none' ? 1 : 2 
                })}
              >
                <SelectTrigger className="border-gray-200 focus:border-green-500">
                  <SelectValue placeholder="Select Parent (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl">
                  <SelectItem value="none" className="hover:bg-gray-50">Root Level</SelectItem>
                  {filteredMenuItems
                    .filter(item => item.level === 1)
                    .map((item) => (
                    <SelectItem key={item.id} value={item.id} className="hover:bg-gray-50">
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Secondary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Display Order
              </label>
              <Input
                type="number"
                placeholder="0"
                value={newMenuItem.display_order}
                onChange={(e) => setNewMenuItem({ 
                  ...newMenuItem, 
                  display_order: parseInt(e.target.value) || 0 
                })}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Service Assignment
              </label>
              <Select
                value={newMenuItem.service_id || 'none'}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  service_id: value === 'none' ? null : value 
                })}
              >
                <SelectTrigger className="border-gray-200 focus:border-indigo-500">
                  <SelectValue placeholder="Select Service (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl">
                  <SelectItem value="none" className="hover:bg-gray-50">No Service</SelectItem>
                  <SelectItem value="balance_check" className="hover:bg-gray-50">Balance Check</SelectItem>
                  <SelectItem value="airtime_purchase" className="hover:bg-gray-50">Airtime Purchase</SelectItem>
                  <SelectItem value="data_purchase" className="hover:bg-gray-50">Data Purchase</SelectItem>
                  <SelectItem value="banking" className="hover:bg-gray-50">Banking Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Status
              </label>
              <Select
                value={newMenuItem.status}
                onValueChange={(value) => setNewMenuItem({ 
                  ...newMenuItem, 
                  status: value as 'active' | 'inactive' 
                })}
              >
                <SelectTrigger className="border-gray-200 focus:border-red-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl">
                  <SelectItem value="active" className="hover:bg-gray-50">Active</SelectItem>
                  <SelectItem value="inactive" className="hover:bg-gray-50">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <Button 
              onClick={handleCreateMenuItem} 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-md w-full md:w-auto px-8"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </div>
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