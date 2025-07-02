import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Phone, 
  Mail, 
  CreditCard, 
  Activity, 
  AlertCircle,
  Edit,
  Pause,
  Play,
  DollarSign,
  Calendar,
  Smartphone,
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react';
import MobileAdminHeader from './MobileAdminHeader';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mvno: string;
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  plan: string;
  joinDate: string;
  lastActivity: string;
  dataUsage: number;
  voiceUsage: number;
  smsUsage: number;
  simStatus: 'active' | 'inactive' | 'suspended';
  supportTickets: number;
}

interface MobileCustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
}

const MobileCustomerDetailView: React.FC<MobileCustomerDetailViewProps> = ({
  customer,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 border-green-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const usageData = [
    { label: 'Data', value: customer.dataUsage, color: 'bg-blue-600' },
    { label: 'Voice', value: customer.voiceUsage, color: 'bg-green-600' },
    { label: 'SMS', value: customer.smsUsage, color: 'bg-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileAdminHeader
        title={`${customer.firstName} ${customer.lastName}`}
        subtitle={customer.id}
        onBack={onBack}
        onMenuToggle={() => {}}
      />

      <div className="p-4 space-y-4 pb-20">
        {/* Customer Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{customer.id}</p>
              </div>
              <Badge className={cn("text-xs", getStatusBadge(customer.status))}>
                {customer.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{customer.email}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.mvno}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{formatDate(customer.joinDate)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {customer.status === 'active' ? (
                <Button size="sm" variant="outline" className="flex-1">
                  <Pause className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
              <Button size="sm" className="flex-1">
                <DollarSign className="w-4 h-4 mr-2" />
                Top Up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets Alert */}
        {customer.supportTickets > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-orange-800">Open Support Tickets</h3>
                  <p className="text-sm text-orange-700">
                    {customer.supportTickets} ticket{customer.supportTickets > 1 ? 's' : ''} requiring attention
                  </p>
                </div>
                <Button size="sm" variant="outline" className="border-orange-300">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Details Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="usage" className="text-xs">Usage</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs">Billing</TabsTrigger>
            <TabsTrigger value="support" className="text-xs">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">Current Balance</p>
                    <p className="text-xl font-bold text-green-800">R{customer.balance.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">Current Plan</p>
                    <p className="text-lg font-semibold text-blue-800">{customer.plan}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SIM Status</span>
                    <Badge variant="outline">{customer.simStatus}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Activity</span>
                    <span>{formatDate(customer.lastActivity)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Provider</span>
                    <span>{customer.mvno}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Current Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {usageData.map((usage) => (
                  <div key={usage.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{usage.label}</span>
                      <span className="font-medium">{usage.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={cn("h-2 rounded-full transition-all", usage.color)}
                        style={{ width: `${Math.min(usage.value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Billing features</p>
                  <p className="text-sm">Transaction history, payment methods, and billing details will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            {/* Support History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Support & Tickets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customer.supportTickets > 0 ? (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-medium text-orange-800 mb-1">
                      {customer.supportTickets} Open Ticket{customer.supportTickets > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-orange-700">
                      Customer support tickets and communication history.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800 mb-1">No Open Tickets</p>
                    <p className="text-sm text-green-700">
                      Customer has no active support tickets.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileCustomerDetailView;