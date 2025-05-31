
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  ShoppingBag, 
  Star, 
  MapPin, 
  Truck, 
  Phone,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react';

const SpazaMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const spazaVendors = [
    {
      id: 'SP001',
      name: 'Mama Sarah\'s Spaza',
      location: 'Soweto, Johannesburg',
      rating: 4.8,
      products: ['Groceries', 'Airtime', 'Electricity'],
      aiScore: 95,
      airtimeRevenue: 'R15,420',
      customers: 342,
      status: 'Premium Partner'
    },
    {
      id: 'SP002',
      name: 'Township Traders',
      location: 'Khayelitsha, Cape Town',
      rating: 4.6,
      products: ['Airtime', 'Data', 'Mobile Accessories'],
      aiScore: 88,
      airtimeRevenue: 'R9,650',
      customers: 198,
      status: 'Verified'
    },
    {
      id: 'SP003',
      name: 'Community Connect',
      location: 'Mamelodi, Pretoria',
      rating: 4.9,
      products: ['Full Service', 'Banking', 'Airtime'],
      aiScore: 92,
      airtimeRevenue: 'R22,180',
      customers: 456,
      status: 'AI Recommended'
    }
  ];

  const aiInsights = [
    {
      title: 'High-Demand Area Detected',
      description: 'Alexandra township showing 300% increase in airtime demand',
      action: 'Recommend Partnership',
      priority: 'High'
    },
    {
      title: 'Vendor Performance Alert',
      description: 'Mama Sarah\'s Spaza exceeding monthly targets by 150%',
      action: 'Increase Allocation',
      priority: 'Medium'
    },
    {
      title: 'New Market Opportunity',
      description: 'Orange Farm area has no AirPay partners within 5km radius',
      action: 'Recruit Vendors',
      priority: 'High'
    }
  ];

  const handleConnectVendor = (vendorId: string) => {
    console.log('Connecting with vendor:', vendorId);
  };

  return (
    <div className="space-y-4 p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Store className="w-6 h-6 text-green-600" />
            🏪 Spaza Marketplace
          </h2>
          <p className="text-sm text-gray-600">AI-powered township commerce integration</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          AI Enhanced
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-3">
        <Input
          placeholder="Search spaza shops, locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="sm">
          <MapPin className="w-4 h-4 mr-2" />
          Near Me
        </Button>
      </div>

      <Tabs defaultValue="vendors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="vendors">Spaza Partners</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spazaVendors.map((vendor) => (
              <Card key={vendor.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-sm font-semibold">{vendor.name}</CardTitle>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {vendor.location}
                      </div>
                    </div>
                    <Badge 
                      className={
                        vendor.status === 'Premium Partner' ? 'bg-gold-100 text-gold-800' :
                        vendor.status === 'AI Recommended' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span>AI: {vendor.aiScore}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-600">Revenue</div>
                      <div className="font-semibold text-green-600">{vendor.airtimeRevenue}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Customers</div>
                      <div className="font-semibold">{vendor.customers}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {vendor.products.map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConnectVendor(vendor.id)}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                AI Market Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-sm">{insight.title}</div>
                    <Badge 
                      className={
                        insight.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{insight.description}</div>
                  <Button size="sm" variant="outline" className="text-xs">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">New Partnership Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 15 spaza shops in high-demand areas</div>
                  <div>• Average monthly potential: R45,000</div>
                  <div>• Estimated customer reach: 2,340</div>
                </div>
                <Button size="sm" className="mt-3">
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-sm">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Focus on weekend promotions</div>
                  <div>• Increase data bundle offerings</div>
                  <div>• Partner with local schools</div>
                </div>
                <Button size="sm" className="mt-3" variant="outline">
                  Apply AI Strategy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpazaMarketplace;
