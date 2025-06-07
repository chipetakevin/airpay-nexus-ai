
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Gamepad2, 
  CreditCard, 
  MapPin, 
  Music, 
  Ticket,
  Lightbulb,
  Droplets,
  Wallet
} from 'lucide-react';

const VirtualServicesPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState('utilities');

  const serviceCategories = [
    {
      id: 'utilities',
      name: 'Utility Vouchers',
      icon: <Zap className="w-5 h-5" />,
      services: [
        { name: 'Electricity Prepaid', icon: <Lightbulb className="w-4 h-4" />, volume: 15420, revenue: 'R 2,847,392' },
        { name: 'Water Vouchers', icon: <Droplets className="w-4 h-4" />, volume: 8934, revenue: 'R 934,847' }
      ]
    },
    {
      id: 'gaming',
      name: 'Gaming & Entertainment',
      icon: <Gamepad2 className="w-5 h-5" />,
      services: [
        { name: 'Gaming Credits', icon: <Gamepad2 className="w-4 h-4" />, volume: 12847, revenue: 'R 1,394,827' },
        { name: 'Content Services', icon: <Music className="w-4 h-4" />, volume: 9247, revenue: 'R 284,739' }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Services',
      icon: <CreditCard className="w-5 h-5" />,
      services: [
        { name: 'Money Transfers', icon: <Wallet className="w-4 h-4" />, volume: 18420, revenue: 'R 3,847,392' },
        { name: 'Bill Payments', icon: <CreditCard className="w-4 h-4" />, volume: 25934, revenue: 'R 5,294,847' }
      ]
    },
    {
      id: 'location',
      name: 'Location Services',
      icon: <MapPin className="w-5 h-5" />,
      services: [
        { name: 'GPS Services', icon: <MapPin className="w-4 h-4" />, volume: 5847, revenue: 'R 584,729' },
        { name: 'Mapping Solutions', icon: <MapPin className="w-4 h-4" />, volume: 3247, revenue: 'R 324,739' }
      ]
    },
    {
      id: 'ticketing',
      name: 'Ticketing Services',
      icon: <Ticket className="w-5 h-5" />,
      services: [
        { name: 'Event Tickets', icon: <Ticket className="w-4 h-4" />, volume: 7420, revenue: 'R 1,247,392' },
        { name: 'Transport Tickets', icon: <Ticket className="w-4 h-4" />, volume: 12934, revenue: 'R 1,934,847' }
      ]
    }
  ];

  const recentTransactions = [
    { id: 1, service: 'Electricity', amount: 'R 150', customer: '***8394', status: 'Completed', time: '2 min ago' },
    { id: 2, service: 'Gaming Credit', amount: 'R 75', customer: '***2847', status: 'Processing', time: '5 min ago' },
    { id: 3, service: 'Bill Payment', amount: 'R 320', customer: '***9472', status: 'Completed', time: '8 min ago' },
    { id: 4, service: 'Event Ticket', amount: 'R 250', customer: '***1847', status: 'Completed', time: '12 min ago' }
  ];

  const selectedCategoryData = serviceCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Virtual Merchandise & Value-Added Services</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Navigation */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Service Categories</h4>
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Service Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            {selectedCategoryData?.icon}
            <h4 className="text-lg font-medium text-gray-900">{selectedCategoryData?.name}</h4>
          </div>
          
          <div className="grid gap-4">
            {selectedCategoryData?.services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{service.name}</h5>
                        <p className="text-sm text-gray-600">{service.volume.toLocaleString()} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{service.revenue}</p>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">98.7%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Processing</p>
                  <p className="text-2xl font-bold text-blue-600">1.2s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Daily Volume</p>
                  <p className="text-2xl font-bold text-gray-900">24.5K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">94.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{transaction.service}</p>
                      <p className="text-xs text-gray-600">{transaction.customer} • {transaction.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{transaction.amount}</p>
                      <Badge 
                        variant={transaction.status === 'Completed' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Configure New Service
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  View Service Reports
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Manage Integrations
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Update Pricing
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualServicesPanel;
