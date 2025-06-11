
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, Activity, CheckCircle, Clock
} from 'lucide-react';

const WhatsAppMetrics = () => {
  const integrationMetrics = [
    {
      label: 'Active Conversations',
      value: '2,847',
      change: '+12%',
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: 'Transactions Today',
      value: '1,456',
      change: '+18%',
      icon: <Activity className="w-4 h-4" />
    },
    {
      label: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      label: 'Avg Response Time',
      value: '1.2s',
      change: '-0.5s',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {integrationMetrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-600">{metric.label}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WhatsAppMetrics;
