import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, MessageSquare, Phone, Globe, Zap } from 'lucide-react';

const PrepaidServicesPanel = () => {
  const [selectedService, setSelectedService] = useState('airtime');

  const services = [
    {
      id: 'airtime',
      name: 'Airtime Top-ups',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Instant airtime purchases and recharges',
      transactions: 15420,
      revenue: 'R 2,847,392'
    },
    {
      id: 'data',
      name: 'Data Bundles',
      icon: <Wifi className="w-5 h-5" />,
      description: 'Daily, weekly, monthly data packages',
      transactions: 8934,
      revenue: 'R 1,934,847'
    },
    {
      id: 'sms',
      name: 'SMS Bundles',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Text messaging and international SMS',
      transactions: 3247,
      revenue: 'R 284,739'
    },
    {
      id: 'voice',
      name: 'Voice Minutes',
      icon: <Phone className="w-5 h-5" />,
      description: 'Prepaid calling packages',
      transactions: 2847,
      revenue: 'R 394,827'
    },
    {
      id: 'roaming',
      name: 'Roaming Services',
      icon: <Globe className="w-5 h-5" />,
      description: 'International roaming packages',
      transactions: 1247,
      revenue: 'R 847,392'
    }
  ];

  const networkStats = [
    { network: 'MTN', uptime: '99.8%', transactions: 5847 },
    { network: 'Vodacom', uptime: '99.5%', transactions: 4923 },
    { network: 'Divine Mobile', uptime: '98.9%', transactions: 2847 },
    { network: 'Telkom', uptime: '99.1%', transactions: 1847 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Categories */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Prepaid Mobile Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all ${
                  selectedService === service.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Transactions</p>
                      <p className="font-semibold">{service.transactions.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">{service.revenue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Network Status</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {networkStats.map((network, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        parseFloat(network.uptime) > 99 ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="font-medium">{network.network}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{network.uptime}</p>
                      <p className="text-xs text-gray-600">{network.transactions} txns</p>
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
                  Process Bulk Recharge
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Generate Service Report
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Configure Promotions
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrepaidServicesPanel;
