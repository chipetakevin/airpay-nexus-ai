
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server } from 'lucide-react';

const ServiceStatus = () => {
  const serviceStatus = [
    { name: 'AI Agent Orchestrator', status: 'operational', uptime: '99.99%', requests: '156K/min' },
    { name: 'Data Mesh Platform', status: 'operational', uptime: '99.97%', requests: '234K/min' },
    { name: 'WhatsApp Business API', status: 'operational', uptime: '99.94%', requests: '87K/min' },
    { name: 'Customer Data Platform', status: 'operational', uptime: '99.92%', requests: '145K/min' },
    { name: 'Real-time Analytics', status: 'operational', uptime: '99.96%', requests: '298K/min' },
    { name: 'Security Intelligence', status: 'operational', uptime: '99.98%', requests: '67K/min' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="lg:col-span-2 shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Server className="w-6 h-6 text-blue-600" />
          Agentic BaaS Platform Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {serviceStatus.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full shadow-lg ${
                  service.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></div>
                <div>
                  <span className="font-semibold text-gray-800">{service.name}</span>
                  <div className="text-xs text-gray-500">{service.requests}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">{service.uptime}</span>
                <Badge className={`${getStatusColor(service.status)} text-xs px-2 py-1`}>
                  {service.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
