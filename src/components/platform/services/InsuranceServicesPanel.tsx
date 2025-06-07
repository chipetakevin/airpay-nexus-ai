
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Smartphone, Heart, Users, CreditCard, TrendingUp } from 'lucide-react';

const InsuranceServicesPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const insuranceProducts = [
    {
      id: 'device',
      name: 'Mobile Device Insurance',
      icon: <Smartphone className="w-5 h-5" />,
      activePolices: 15420,
      revenue: 'R 847,392',
      claimsRatio: '8.5%',
      growth: '+12%'
    },
    {
      id: 'airtime',
      name: 'Airtime Insurance',
      icon: <Shield className="w-5 h-5" />,
      activePolices: 8934,
      revenue: 'R 284,739',
      claimsRatio: '3.2%',
      growth: '+25%'
    },
    {
      id: 'life',
      name: 'Life Micro-Insurance',
      icon: <Heart className="w-5 h-5" />,
      activePolices: 12847,
      revenue: 'R 1,394,827',
      claimsRatio: '2.1%',
      growth: '+18%'
    },
    {
      id: 'funeral',
      name: 'Funeral Cover',
      icon: <Users className="w-5 h-5" />,
      activePolices: 9247,
      revenue: 'R 947,382',
      claimsRatio: '4.7%',
      growth: '+8%'
    },
    {
      id: 'credit',
      name: 'Credit Life Insurance',
      icon: <CreditCard className="w-5 h-5" />,
      activePolices: 5847,
      revenue: 'R 584,729',
      claimsRatio: '6.3%',
      growth: '+15%'
    }
  ];

  const recentClaims = [
    { id: 1, type: 'Device', amount: 'R 2,500', status: 'Approved', date: '2024-01-15' },
    { id: 2, type: 'Life', amount: 'R 15,000', status: 'Processing', date: '2024-01-14' },
    { id: 3, type: 'Funeral', amount: 'R 8,500', status: 'Approved', date: '2024-01-14' },
    { id: 4, type: 'Airtime', amount: 'R 150', status: 'Approved', date: '2024-01-13' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Insurance Products</h3>
        <div className="flex gap-2">
          {['week', 'month', 'quarter'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insurance Products Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insuranceProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        {product.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {product.growth} growth
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Policies</span>
                      <span className="font-semibold">{product.activePolices.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="font-semibold text-green-600">{product.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Claims Ratio</span>
                      <span className={`font-semibold ${
                        parseFloat(product.claimsRatio) < 5 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {product.claimsRatio}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Claims & Analytics */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Claims</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{claim.type}</p>
                      <p className="text-xs text-gray-600">{claim.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{claim.amount}</p>
                      <Badge 
                        variant={claim.status === 'Approved' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-semibold text-green-600">24.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Policy Value</span>
                  <span className="font-semibold">R 127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer Retention</span>
                  <span className="font-semibold text-blue-600">87.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Claims Processing</span>
                  <span className="font-semibold">2.3 days avg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InsuranceServicesPanel;
