import React, { useState, useEffect } from 'react';
import '../../styles/ussd-mobile.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Smartphone, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Wifi, 
  Power,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Shield,
  History,
  Send,
  Code,
  Database,
  Globe,
  Menu,
  Lock,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  EyeOff,
  Play,
  Save,
  RefreshCw,
  ChevronRight,
  ArrowLeft,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUSSDData } from '@/hooks/useUSSDData';
import AdvancedCustomerSearch from './AdvancedCustomerSearch';
import AnalyticsDashboard from './AnalyticsDashboard';
import RealTimeSessionManager from './RealTimeSessionManager';

interface MenuBuilderState {
  menuItems: Array<{
    id: string;
    name: string;
    code: string;
    level: number;
    parent_id?: string;
    children?: MenuBuilderState['menuItems'];
  }>;
  selectedItem: string | null;
  editingItem: string | null;
}

const EnhancedUSSDManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('menu-builder');
  const [showAddForm, setShowAddForm] = useState(false);
  const [menuBuilderState, setMenuBuilderState] = useState<MenuBuilderState>({
    menuItems: [
      { id: '1', name: 'Check Balance', code: '*101#', level: 1 },
      { id: '2', name: 'Buy Airtime', code: '*102#', level: 1 },
      { id: '3', name: 'Buy Data', code: '*103#', level: 1 },
      { id: '4', name: 'Help & Support', code: '*104#', level: 1 },
    ],
    selectedItem: null,
    editingItem: null
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    code: '',
    level: 1,
    parent_id: ''
  });

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.code) {
      toast({
        title: "Missing Information",
        description: "Please fill in both menu item name and code.",
        variant: "destructive"
      });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newMenuItem.name,
      code: newMenuItem.code,
      level: newMenuItem.level,
      parent_id: newMenuItem.parent_id || undefined
    };

    setMenuBuilderState(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, newItem]
    }));

    setNewMenuItem({ name: '', code: '', level: 1, parent_id: '' });
    setShowAddForm(false);
    
    toast({
      title: "Menu Item Added",
      description: `Successfully added "${newItem.name}" to the menu structure.`,
    });
  };

  const handleTestMenu = () => {
    toast({
      title: "Testing Menu",
      description: "Simulating USSD menu flow...",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "USSD menu structure has been updated successfully.",
    });
  };

  // Enhanced Menu Builder Component
  const MenuBuilderTab = () => (
    <div className="space-y-4 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Menu Builder</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Design and configure USSD menu structures
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              onClick={handleTestMenu}
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-primary/10"
            >
              <Play className="w-4 h-4" />
              Test Menu
            </Button>
            <Button 
              onClick={handleSaveChanges}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Add New Menu Item Section */}
      <Card className="border-green-200 bg-green-50/30 animate-scale-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Add New Menu Item</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Create new USSD menu options and configure their behavior
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="shrink-0"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${showAddForm ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Menu Item Name
                </label>
                <Input
                  placeholder="e.g., Check Balance"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  USSD Code
                </label>
                <Input
                  placeholder="e.g., *101#"
                  value={newMenuItem.code}
                  onChange={(e) => setNewMenuItem(prev => ({ ...prev, code: e.target.value }))}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Menu Level
                </label>
                <Select value={newMenuItem.level.toString()} onValueChange={(value) => setNewMenuItem(prev => ({ ...prev, level: parseInt(value) }))}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Level 1 (Main Menu)</SelectItem>
                    <SelectItem value="2">Level 2 (Sub Menu)</SelectItem>
                    <SelectItem value="3">Level 3 (Action)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Parent Menu (Optional)
                </label>
                <Select value={newMenuItem.parent_id} onValueChange={(value) => setNewMenuItem(prev => ({ ...prev, parent_id: value }))}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select parent menu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None (Top Level)</SelectItem>
                    {menuBuilderState.menuItems.map(item => (
                      <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button 
                onClick={handleAddMenuItem}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Menu Item
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Current Menu Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-primary" />
            Current Menu Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {menuBuilderState.menuItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Menu className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No menu items configured yet.</p>
                <p className="text-sm">Add your first menu item to get started.</p>
              </div>
            ) : (
              menuBuilderState.menuItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.code}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Level {item.level} • {item.parent_id ? 'Sub-menu' : 'Main menu'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Enhanced Analytics Tab
  const AnalyticsTab = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 md:p-6 border">
        <h2 className="text-xl md:text-2xl font-bold mb-2">USSD Analytics</h2>
        <p className="text-muted-foreground">Real-time insights and performance metrics</p>
      </div>
      <AnalyticsDashboard />
    </div>
  );

  // Enhanced Customers Tab
  const CustomersTab = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Customer Management</h2>
        <p className="text-muted-foreground">Search, manage and track customer interactions</p>
      </div>
      <AdvancedCustomerSearch />
    </div>
  );

  // Enhanced Sessions Tab
  const SessionsTab = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 md:p-6 border">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Live Sessions</h2>
        <p className="text-muted-foreground">Monitor active USSD sessions in real-time</p>
      </div>
      <RealTimeSessionManager />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                  USSD Manager
                  <Badge variant="secondary" className="text-xs">ADMIN</Badge>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Divine Mobile GSM Customer Onboarding & Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border shadow-sm overflow-hidden">
            <TabsList className="w-full h-auto p-2 bg-transparent">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                <TabsTrigger 
                  value="menu-builder" 
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
                >
                  <Code className="w-4 h-4" />
                  <span className="text-xs font-medium">Menu Builder</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-medium">Analytics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="customers" 
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-medium">Customers</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sessions" 
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all hover:bg-muted/50"
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-medium">Live Sessions</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="mt-4 sm:mt-6">
            <TabsContent value="menu-builder" className="mt-0">
              <MenuBuilderTab />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <AnalyticsTab />
            </TabsContent>
            
            <TabsContent value="customers" className="mt-0">
              <CustomersTab />
            </TabsContent>
            
            <TabsContent value="sessions" className="mt-0">
              <SessionsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedUSSDManager;