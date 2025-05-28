
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Signal, Wifi, AlertCircle } from 'lucide-react';

const NetworkStatus = () => {
  const networks = [
    {
      name: "Vodacom",
      status: "Operational",
      uptime: "99.98%",
      transactions: "45,234",
      responseTime: "0.8s",
      color: "bg-red-500",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "MTN",
      status: "Operational",
      uptime: "99.95%",
      transactions: "38,912",
      responseTime: "1.1s",
      color: "bg-yellow-500",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Cell C",
      status: "Operational",
      uptime: "99.89%",
      transactions: "21,456",
      responseTime: "1.3s",
      color: "bg-blue-500",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Telkom",
      status: "Maintenance",
      uptime: "98.45%",
      transactions: "12,847",
      responseTime: "2.1s",
      color: "bg-purple-500",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Virgin Mobile",
      status: "Operational",
      uptime: "99.92%",
      transactions: "8,934",
      responseTime: "1.0s",
      color: "bg-pink-500",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Signal className="w-5 h-5 text-blue-600" />
          <span>Network Status Monitor</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {networks.map((network, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${network.color}`}></div>
                  <h3 className="font-semibold text-gray-900">{network.name}</h3>
                </div>
                <Badge className={network.statusColor}>
                  {network.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime:</span>
                  <span className="font-medium">{network.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transactions:</span>
                  <span className="font-medium">{network.transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response:</span>
                  <span className="font-medium">{network.responseTime}</span>
                </div>
              </div>
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${network.color}`}
                  style={{ width: network.uptime }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
