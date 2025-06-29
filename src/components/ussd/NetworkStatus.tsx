import React from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const NetworkStatus = () => {
  const networks = [
    { name: 'Divinely Mobile', status: 'active', uptime: '99.9%', color: 'bg-green-500' },
    { name: 'MTN', status: 'active', uptime: '99.8%', color: 'bg-yellow-500' },
    { name: 'Vodacom', status: 'maintenance', uptime: '98.5%', color: 'bg-orange-500' },
    { name: 'Telkom', status: 'active', uptime: '99.2%', color: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Network Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {networks.map((network) => (
          <div key={network.name} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{network.name}</h3>
              <div className={`w-3 h-3 rounded-full ${network.color}`}></div>
            </div>
            
            <div className="flex items-center mb-2">
              {network.status === 'active' ? (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
              )}
              <span className="text-sm capitalize text-gray-600">{network.status}</span>
            </div>
            
            <div className="text-sm text-gray-500">
              Uptime: {network.uptime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkStatus;
