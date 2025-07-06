import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface OrderRequest {
  id: string;
  customer: string;
  msisdn: string;
  network: string;
  type: 'airtime' | 'data';
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: string;
  provider: string;
  reference?: string;
  processingTime?: number;
}

const RealTimeOrderProcessor = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderRequest[]>([
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      msisdn: '0821234567',
      network: 'MTN',
      type: 'airtime',
      amount: 50,
      status: 'processing',
      timestamp: new Date().toISOString(),
      provider: 'freepaid'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Jane Smith', 
      msisdn: '0827654321',
      network: 'Vodacom',
      type: 'data',
      amount: 100,
      status: 'pending',
      timestamp: new Date().toISOString(),
      provider: 'blu_telecoms'
    }
  ]);

  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 1247,
    successRate: 98.5,
    avgProcessingTime: 2.3,
    activeConnections: 4
  });

  useEffect(() => {
    // Simulate real-time order processing
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => {
        if (order.status === 'pending') {
          return { ...order, status: 'processing' as const };
        }
        if (order.status === 'processing') {
          const success = Math.random() > 0.05; // 95% success rate
          return {
            ...order,
            status: success ? 'completed' as const : 'failed' as const,
            reference: success ? `REF-${Math.random().toString(36).substr(2, 8)}` : undefined,
            processingTime: Math.round(Math.random() * 5 + 1)
          };
        }
        return order;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRetryOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'pending' as const }
        : order
    ));
    
    toast({
      title: "Order Retry",
      description: `Retrying order ${orderId}`,
    });
  };

  const handleManualProcess = (orderId: string) => {
    toast({
      title: "Manual Processing", 
      description: `Manually processing order ${orderId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return '✅';
      case 'processing': return '🔄';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Real-Time Order Processing</h3>
        <p className="text-gray-600">Live monitoring and processing of customer orders</p>
      </div>

      {/* Processing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{processingStats.totalProcessed}</div>
            <div className="text-sm text-gray-600">Orders Processed Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{processingStats.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{processingStats.avgProcessingTime}s</div>
            <div className="text-sm text-gray-600">Avg Processing Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{processingStats.activeConnections}</div>
            <div className="text-sm text-gray-600">Active Connections</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="animate-pulse text-green-500">●</span>
            Live Order Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.customer}</div>
                  </div>
                  
                  <div>
                    <div className="font-medium">{order.msisdn}</div>
                    <div className="text-sm text-gray-600">{order.network}</div>
                  </div>
                  
                  <div>
                    <div className="font-medium">{order.type}</div>
                    <div className="text-sm text-gray-600">R{order.amount}</div>
                  </div>
                  
                  <div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)} {order.status}
                    </Badge>
                    {order.processingTime && (
                      <div className="text-xs text-gray-500 mt-1">
                        {order.processingTime}s
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {order.reference && (
                      <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {order.reference}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      via {order.provider}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === 'failed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRetryOrder(order.id)}
                      >
                        Retry
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleManualProcess(order.id)}
                      >
                        Manual
                      </Button>
                    )}
                  </div>
                </div>
                
                {order.status === 'processing' && (
                  <div className="mt-3">
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">Processing...</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Health Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>API Connection Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Freepaid API</div>
                <div className="text-sm text-gray-600">SOAP Endpoint</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">●</span>
                <span className="text-sm">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">Blu Telecoms API</div>
                <div className="text-sm text-gray-600">REST Endpoint</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">●</span>
                <span className="text-sm">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">MTN Direct API</div>
                <div className="text-sm text-gray-600">REST Endpoint</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                <span className="text-sm">Offline</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeOrderProcessor;