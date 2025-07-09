import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Wifi, 
  MessageSquare, 
  Globe,
  Users,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  type: 'voice' | 'data' | 'sms' | 'vas';
  status: 'active' | 'inactive' | 'maintenance';
  subscribers: number;
  plan: string;
  pricing: number;
  validity: number;
  description: string;
  features: string[];
}

interface ServicePlan {
  id: string;
  name: string;
  type: 'prepaid' | 'postpaid' | 'hybrid';
  services: string[];
  basePrice: number;
  currency: string;
  validity: number;
  description: string;
}

const ServiceManagement = () => {
  const { toast } = useToast();
  
  const [services, setServices] = useState<Service[]>([
    {
      id: 'svc-001',
      name: 'Voice Basic',
      type: 'voice',
      status: 'active',
      subscribers: 45000,
      plan: 'Basic Voice Plan',
      pricing: 49.99,
      validity: 30,
      description: 'Basic voice calling service with national coverage',
      features: ['National calls', 'Call waiting', 'Voicemail']
    },
    {
      id: 'svc-002',
      name: 'Data Premium',
      type: 'data',
      status: 'active',
      subscribers: 38000,
      plan: 'Premium Data Plan',
      pricing: 199.99,
      validity: 30,
      description: 'High-speed data service with unlimited access',
      features: ['5GB data', 'High-speed 4G/5G', 'No throttling', 'Hotspot enabled']
    },
    {
      id: 'svc-003',
      name: 'SMS Bundle',
      type: 'sms',
      status: 'active',
      subscribers: 52000,
      plan: 'SMS Package',
      pricing: 29.99,
      validity: 30,
      description: 'Unlimited SMS service for personal and business use',
      features: ['Unlimited SMS', 'Delivery reports', 'Bulk SMS API']
    },
    {
      id: 'svc-004',
      name: 'International Roaming',
      type: 'vas',
      status: 'maintenance',
      subscribers: 12000,
      plan: 'Roaming Add-on',
      pricing: 99.99,
      validity: 7,
      description: 'International roaming service for travelers',
      features: ['International roaming', 'Data roaming', 'Emergency support']
    }
  ]);

  const [servicePlans, setServicePlans] = useState<ServicePlan[]>([
    {
      id: 'plan-001',
      name: 'Starter Package',
      type: 'prepaid',
      services: ['voice', 'sms'],
      basePrice: 79.99,
      currency: 'ZAR',
      validity: 30,
      description: 'Perfect for light users with basic communication needs'
    },
    {
      id: 'plan-002',
      name: 'Professional Package',
      type: 'postpaid',
      services: ['voice', 'data', 'sms'],
      basePrice: 299.99,
      currency: 'ZAR',
      validity: 30,
      description: 'Comprehensive package for business professionals'
    },
    {
      id: 'plan-003',
      name: 'Enterprise Solution',
      type: 'hybrid',
      services: ['voice', 'data', 'sms', 'vas'],
      basePrice: 499.99,
      currency: 'ZAR',
      validity: 30,
      description: 'Full-featured enterprise telecommunications solution'
    }
  ]);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="h-5 w-5" />;
      case 'data': return <Wifi className="h-5 w-5" />;
      case 'sms': return <MessageSquare className="h-5 w-5" />;
      case 'vas': return <Globe className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Clock className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case 'prepaid': return 'bg-blue-100 text-blue-800';
      case 'postpaid': return 'bg-purple-100 text-purple-800';
      case 'hybrid': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleService = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
    
    toast({
      title: "Service Updated",
      description: "Service status has been updated successfully.",
    });
  };

  const calculateTotalSubscribers = () => {
    return services.reduce((total, service) => total + service.subscribers, 0);
  };

  const calculateTotalRevenue = () => {
    return services.reduce((total, service) => total + (service.subscribers * service.pricing), 0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Service Management
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage telecommunications services, pricing plans, and service configurations for MVNO partners
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{services.length}</p>
                <p className="text-sm text-blue-600">Active Services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {calculateTotalSubscribers().toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Total Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  R{calculateTotalRevenue().toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-700">{servicePlans.length}</p>
                <p className="text-sm text-orange-600">Service Plans</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="plans">Service Plans</TabsTrigger>
          <TabsTrigger value="provisioning">Provisioning</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Catalog</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getServiceIcon(service.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1 capitalize">{service.status}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold">R{service.pricing}</p>
                      <p className="text-xs text-muted-foreground">Monthly Price</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{service.subscribers.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleService(service.id)}
                    >
                      {service.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Plans</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicePlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge className={getPlanTypeColor(plan.type)}>
                      {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      R{plan.basePrice}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      per {plan.validity} days
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Included Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service.charAt(0).toUpperCase() + service.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="provisioning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Provisioning</CardTitle>
              <CardDescription>
                Automated service provisioning and lifecycle management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4" />
                <p>Service provisioning workflows coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceManagement;