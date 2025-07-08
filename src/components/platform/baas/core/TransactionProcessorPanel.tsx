import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, TrendingUp, Clock, DollarSign,
  CheckCircle, AlertTriangle, Activity, Zap,
  RefreshCw, Shield, Users, Database
} from 'lucide-react';

const TransactionProcessorPanel = () => {
  const [selectedProcessor, setSelectedProcessor] = useState('airtime');

  const transactionMetrics = [
    { 
      label: 'Total Transactions', 
      value: '847,392', 
      change: '+12%', 
      icon: <Activity className="w-4 h-4" /> 
    },
    { 
      label: 'Success Rate', 
      value: '99.94%', 
      change: '+0.02%', 
      icon: <CheckCircle className="w-4 h-4" /> 
    },
    { 
      label: 'Avg Processing Time', 
      value: '1.2s', 
      change: '-0.3s', 
      icon: <Clock className="w-4 h-4" /> 
    },
    { 
      label: 'Revenue Today', 
      value: 'R 2.4M', 
      change: '+18%', 
      icon: <DollarSign className="w-4 h-4" /> 
    }
  ];

  const transactionProcessors = [
    {
      id: 'airtime',
      name: 'Airtime Processing',
      type: 'Real-time',
      status: 'operational',
      throughput: '1,247 TPS',
      queue: '23',
      latency: '0.8s',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Direct carrier integration for airtime top-ups'
    },
    {
      id: 'data',
      name: 'Data Bundle Engine',
      type: 'Batch + Real-time',
      status: 'operational',
      throughput: '892 TPS',
      queue: '7',
      latency: '1.1s',
      icon: <Zap className="w-5 h-5" />,
      description: 'Data package allocation and management'
    },
    {
      id: 'payment',
      name: 'Payment Gateway',
      type: 'Real-time',
      status: 'operational',
      throughput: '2,156 TPS',
      queue: '45',
      latency: '0.6s',
      icon: <Shield className="w-5 h-5" />,
      description: 'Multi-gateway payment processing'
    },
    {
      id: 'reconciliation',
      name: 'Reconciliation Service',
      type: 'Scheduled',
      status: 'operational',
      throughput: '15K/hour',
      queue: '0',
      latency: '2.1s',
      icon: <RefreshCw className="w-5 h-5" />,
      description: 'Automated transaction reconciliation'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN-8472',
      type: 'Airtime',
      amount: 'R 50.00',
      network: 'MTN',
      status: 'completed',
      timestamp: '2 mins ago',
      customer: 'customer@email.com'
    },
    {
      id: 'TXN-8473',
      type: 'Data Bundle',
      amount: 'R 149.00',
      network: 'Vodacom',
      status: 'processing',
      timestamp: '3 mins ago',
      customer: 'user@domain.com'
    },
    {
      id: 'TXN-8474',
      type: 'Airtime',
      amount: 'R 25.00',
      network: 'Divine Mobile',
      status: 'completed',
      timestamp: '5 mins ago',
      customer: 'client@example.com'
    },
    {
      id: 'TXN-8475',
      type: 'Data Bundle',
      amount: 'R 99.00',
      network: 'Telkom',
      status: 'failed',
      timestamp: '7 mins ago',
      customer: 'user@test.com'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'operational': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Transaction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transactionMetrics.map((metric, index) => (
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
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Processors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {transactionProcessors.map((processor) => (
          <Card 
            key={processor.id}
            className={`cursor-pointer transition-all ${
              selectedProcessor === processor.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedProcessor(processor.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    {processor.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{processor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{processor.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(processor.status)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {processor.status}
                      </Badge>
                      <Badge variant="outline">{processor.type}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Throughput</p>
                  <p className="font-semibold">{processor.throughput}</p>
                </div>
                <div>
                  <p className="text-gray-600">Queue</p>
                  <p className="font-semibold">{processor.queue}</p>
                </div>
                <div>
                  <p className="text-gray-600">Latency</p>
                  <p className="font-semibold">{processor.latency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{transaction.id}</span>
                      <span className="text-xs text-gray-600">{transaction.customer}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">{transaction.type}</span>
                      <span className="text-xs text-gray-600">{transaction.network}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{transaction.amount}</span>
                    <Badge className={getStatusColor(transaction.status)}>
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
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Transaction Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">2,847</p>
                  <p className="text-xs text-gray-600">Currently transacting</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Peak TPS</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">3,456</p>
                  <p className="text-xs text-gray-600">Today's maximum</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Management Actions</h5>
                <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Force Reconciliation
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Process Failed Transactions
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Transaction Reports
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionProcessorPanel;
