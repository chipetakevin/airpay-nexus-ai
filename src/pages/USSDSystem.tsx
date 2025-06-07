
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, Monitor, Users, Shield, 
  Globe, Zap, CheckCircle, Star
} from 'lucide-react';
import USSDSimulator from '@/components/ussd/USSDSimulator';
import USSDManagement from '@/components/ussd/USSDManagement';

const USSDSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Universal Compatibility',
      description: 'Works on all phone types - smartphones, feature phones, and basic handsets'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'No Internet Required',
      description: 'Operates without data connection or WiFi - uses cellular network only'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Activation',
      description: 'Services activate immediately upon successful payment processing'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Bank-Grade Security',
      description: 'End-to-end encryption and secure transaction processing'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Language Support',
      description: 'Available in 9 South African languages for inclusive access'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: '99.9% Uptime',
      description: 'Reliable service with enterprise-grade infrastructure'
    }
  ];

  const quickAccessCodes = [
    { code: '*739#', description: 'Main Menu - Access all services' },
    { code: '*739*1#', description: 'Account & Balance - Quick balance check' },
    { code: '*739*2#', description: 'Buy Airtime - Instant top-ups' },
    { code: '*739*3#', description: 'Buy Data - Data bundle purchases' },
    { code: '*739*4#', description: 'Pay Bills - Utility payments' },
    { code: '*739*5#', description: 'Customer Support - Get help' },
    { code: '*739*9#', description: 'Emergency Services - Zero balance assistance' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Devine Mobile USSD System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade USSD integration providing seamless mobile services through simple numeric codes. 
              Works on all phones, no internet required.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                99.9% Uptime
              </Badge>
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                Bank-Grade Security
              </Badge>
              <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
                <Globe className="w-3 h-3 mr-1" />
                All Networks
              </Badge>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="simulator">Try USSD</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Access Codes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Quick Access Codes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickAccessCodes.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-sm">
                            {item.code}
                          </code>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Session Timeout:</span>
                      <span className="font-medium">180 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">&lt; 3 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Concurrent Sessions:</span>
                      <span className="font-medium">5,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Support:</span>
                      <span className="font-medium">MTN, Vodacom, Cell C, Telkom</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Languages:</span>
                      <span className="font-medium">9 Languages</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security:</span>
                      <span className="font-medium">SSL/TLS Encryption</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Service Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Account Management</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Airtime Purchases</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Bundles</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bill Payments</span>
                      <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-800">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Support</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Services</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="simulator">
              <USSDSimulator />
            </TabsContent>

            <TabsContent value="management">
              <USSDManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default USSDSystem;
