import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  User, Phone, CreditCard, History, Package, Network, Settings,
  Shield, FileText, BarChart3, Users, Smartphone, Wifi, Radio,
  Clock, MapPin, Headphones, MessageCircle, Wrench, Database,
  Monitor, Zap, CheckCircle, AlertTriangle, Edit, Eye, Download
} from 'lucide-react';

export const SubscriberDetailsTabs: React.FC = () => {
  const { toast } = useToast();
  const [activeSubscriber, setActiveSubscriber] = useState({
    msisdn: '+27821234567',
    imsi: '655012345678901',
    iccid: '8927011234567890123',
    name: 'Thabo Mthembu',
    status: 'active',
    tariffType: 'Postpaid Premium',
    ratePlan: 'Divine Unlimited Pro',
    networkType: '4G/LTE',
    billCycle: '1st of month',
    creditLimit: 500,
    contractEnd: '2025-12-31',
    pin: '1234',
    puk: '12345678'
  });

  const subscriberTabs = [
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'additional', label: 'Additional Info', icon: FileText },
    { id: 'balance', label: 'Balance Enquiry', icon: CreditCard },
    { id: 'billing', label: 'Billing', icon: BarChart3 },
    { id: 'callprofile', label: 'Call Profile', icon: Phone },
    { id: 'calls', label: 'Calls', icon: Headphones },
    { id: 'charges', label: 'Charges/Credit', icon: CreditCard },
    { id: 'creditlimits', label: 'Credit/Bill Limits', icon: Shield },
    { id: 'ebu', label: 'EBU Tasks', icon: Wrench },
    { id: 'faf', label: 'Faf', icon: Users },
    { id: 'hlr', label: 'HLR', icon: Database },
    { id: 'history', label: 'History', icon: History },
    { id: 'packages', label: 'IN Packages', icon: Package },
    { id: 'lineplant', label: 'Line Plant', icon: Network },
    { id: 'netcontrol', label: 'NetControl', icon: Monitor },
    { id: 'ota', label: 'OTA Configuration', icon: Radio },
    { id: 'openitems', label: 'Open Items', icon: AlertTriangle },
    { id: 'rainlte', label: 'Rain LTE', icon: Wifi },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'requests', label: 'Subscriber Requests', icon: MessageCircle },
    { id: 'attributes', label: 'Subscriber Attributes', icon: Edit },
    { id: 'swaphistory', label: 'Swap History', icon: Clock },
    { id: 'tphd', label: 'TPHD', icon: MapPin },
    { id: 'vas', label: 'VAS', icon: Zap },
    { id: 'voucher', label: 'Voucher Enquiry', icon: CheckCircle },
    { id: 'xce', label: 'xCE', icon: Smartphone },
    { id: 'twl', label: 'TWL Exclusion', icon: Shield }
  ];

  const subscriberFunctions = [
    { id: 'accountswap', label: 'Account Swap', action: 'swap-account' },
    { id: 'addremove', label: 'Add/Remove Services', action: 'manage-services' },
    { id: 'autobar', label: 'Autobar History', action: 'view-autobar' },
    { id: 'avgspend', label: 'Average Spend', action: 'calc-spend' },
    { id: 'billshock', label: 'Bill Shock', action: 'check-shock' },
    { id: 'creditupgrade', label: 'Credit Upgrade', action: 'upgrade-credit' },
    { id: 'credittab', label: 'Credit Tab', action: 'view-tab' },
    { id: 'deactivate', label: 'Deactivate', action: 'deactivate' },
    { id: 'external', label: 'External Spend', action: 'view-external' },
    { id: 'financial', label: 'Financial Adjustment', action: 'adjust-finance' },
    { id: 'penalty', label: 'Penalty Simulation', action: 'simulate-penalty' },
    { id: 'quickcalls', label: 'Quick Calls', action: 'make-call' },
    { id: 'sponsor', label: 'Sponsor', action: 'manage-sponsor' },
    { id: 'rcs', label: 'RCS', action: 'manage-rcs' },
    { id: 'msisdnswap', label: 'MSISDN Swap', action: 'swap-msisdn' }
  ];

  const handleFunctionAction = (action: string) => {
    toast({
      title: "Function Executed",
      description: `${action} action performed for subscriber ${activeSubscriber.msisdn}`,
    });
  };

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'customer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">MSISDN</label>
                    <Input value={activeSubscriber.msisdn} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">IMSI</label>
                    <Input value={activeSubscriber.imsi} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">ICCID</label>
                    <Input value={activeSubscriber.iccid} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge className="bg-green-500">{activeSubscriber.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PIN/PUK Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>PIN:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded">{activeSubscriber.pin}</code>
                      <Button size="sm" variant="outline">Reset</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PUK:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded">{activeSubscriber.puk}</code>
                      <Button size="sm" variant="outline">Reset</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'billing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium">Bill Cycle</label>
                    <Input value={activeSubscriber.billCycle} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Credit Limit</label>
                    <Input value={`R${activeSubscriber.creditLimit}`} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Current Balance</label>
                    <Input value="R125.50" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Voice Service', 'Data Service', 'SMS Service', 'Roaming', 'VAS Bundle'].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span>{service}</span>
                      <div className="flex gap-2">
                        <Badge className="bg-green-500">Active</Badge>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <h3 className="text-lg font-medium mb-2">{tabId.toUpperCase()} Module</h3>
                <p>Detailed {tabId} information and controls will be displayed here.</p>
                <Button className="mt-4" onClick={() => handleFunctionAction(`configure-${tabId}`)}>
                  Configure {tabId}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Modern Subscriber Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  {activeSubscriber.name}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                  <span className="text-blue-600 font-medium">{activeSubscriber.msisdn}</span>
                  <span className="hidden sm:block text-gray-400">•</span>
                  <span className="text-blue-700">{activeSubscriber.tariffType}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Modern Subscriber Functions Sidebar */}
        <Card className="lg:col-span-1 border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="text-sm font-semibold text-blue-900 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Subscriber Functions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <ScrollArea className="h-96">
              <div className="space-y-1">
                {subscriberFunctions.map((func, index) => (
                  <Button
                    key={func.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs h-9 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => handleFunctionAction(func.action)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="truncate">{func.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Tabs Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="customer" className="space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="grid grid-cols-9 lg:grid-cols-12 xl:grid-cols-15 min-w-max">
                {subscriberTabs.slice(0, 15).map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs px-2 py-1 flex items-center gap-1"
                  >
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="overflow-x-auto">
              <TabsList className="grid grid-cols-9 lg:grid-cols-12 min-w-max">
                {subscriberTabs.slice(15).map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs px-2 py-1 flex items-center gap-1"
                  >
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {subscriberTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {renderTabContent(tab.id)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};