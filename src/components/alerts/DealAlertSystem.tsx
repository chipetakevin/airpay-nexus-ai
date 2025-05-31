
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Zap, 
  TrendingUp, 
  Clock, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface DealAlert {
  id: string;
  source: string;
  network: string;
  amount: number;
  originalPrice: number;
  discountPercentage: number;
  timeDetected: string;
  location: string;
  urgency: 'high' | 'medium' | 'low';
  status: 'new' | 'processing' | 'acquired' | 'missed';
  estimatedVolume: number;
  competitorAdvantage: string;
}

const DealAlertSystem = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<DealAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Simulated deal alerts - in production this would come from AI monitoring
  const sampleAlerts: DealAlert[] = [
    {
      id: 'DA001',
      source: 'CellularDirect.co.za',
      network: 'MTN',
      amount: 50,
      originalPrice: 55,
      discountPercentage: 9,
      timeDetected: '2 min ago',
      location: 'National',
      urgency: 'high',
      status: 'new',
      estimatedVolume: 500,
      competitorAdvantage: 'First to market by 15 minutes'
    },
    {
      id: 'DA002',
      source: 'AirtimeMax.com',
      network: 'Vodacom',
      amount: 100,
      originalPrice: 108,
      discountPercentage: 7.4,
      timeDetected: '5 min ago',
      location: 'Gauteng',
      urgency: 'medium',
      status: 'processing',
      estimatedVolume: 300,
      competitorAdvantage: 'Limited time offer'
    },
    {
      id: 'DA003',
      source: 'DataDeals.co.za',
      network: 'Cell C',
      amount: 25,
      originalPrice: 27.5,
      discountPercentage: 9.1,
      timeDetected: '12 min ago',
      location: 'Western Cape',
      urgency: 'high',
      status: 'acquired',
      estimatedVolume: 200,
      competitorAdvantage: 'Exclusive weekend deal'
    }
  ];

  useEffect(() => {
    setAlerts(sampleAlerts);
    
    // Simulate real-time monitoring
    const interval = setInterval(() => {
      if (isMonitoring && Math.random() > 0.7) {
        const newAlert: DealAlert = {
          id: `DA${Date.now()}`,
          source: `Vendor${Math.floor(Math.random() * 100)}.co.za`,
          network: ['MTN', 'Vodacom', 'Cell C', 'Telkom'][Math.floor(Math.random() * 4)],
          amount: [25, 50, 100, 200][Math.floor(Math.random() * 4)],
          originalPrice: 0,
          discountPercentage: Math.floor(Math.random() * 15) + 5,
          timeDetected: 'Just now',
          location: ['National', 'Gauteng', 'Western Cape', 'KZN'][Math.floor(Math.random() * 4)],
          urgency: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
          status: 'new',
          estimatedVolume: Math.floor(Math.random() * 1000) + 100,
          competitorAdvantage: 'Flash deal detected'
        };
        
        newAlert.originalPrice = newAlert.amount * (1 + newAlert.discountPercentage / 100);
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        
        toast({
          title: "🚨 New Deal Alert!",
          description: `${newAlert.network} R${newAlert.amount} deal detected with ${newAlert.discountPercentage}% margin`,
        });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isMonitoring, toast]);

  const handleAcquireDeal = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'processing' }
          : alert
      )
    );
    
    // Simulate acquisition process
    setTimeout(() => {
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: 'acquired' }
            : alert
        )
      );
      
      toast({
        title: "Deal Acquired! ✅",
        description: "Deal successfully added to AirPay system with markup protection",
      });
    }, 3000);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'acquired': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-orange-600" />
            🚨 AI Deal Monitor
          </h2>
          <p className="text-sm text-gray-600">Real-time competitive intelligence across SA</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm">{isMonitoring ? 'Monitoring' : 'Paused'}</span>
          </div>
          <Button 
            size="sm" 
            variant={isMonitoring ? 'destructive' : 'default'}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? 'Pause' : 'Start'} Monitor
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-lg font-bold text-orange-600">
              {alerts.filter(a => a.status === 'new').length}
            </div>
            <div className="text-xs text-gray-600">New Alerts</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-2" />
            <div className="text-lg font-bold text-green-600">
              {alerts.filter(a => a.status === 'acquired').length}
            </div>
            <div className="text-xs text-gray-600">Acquired</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <div className="text-lg font-bold text-blue-600">
              {alerts.reduce((sum, a) => sum + a.estimatedVolume, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Est. Volume</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto text-purple-600 mb-2" />
            <div className="text-lg font-bold text-purple-600">
              {Math.round(alerts.reduce((sum, a) => sum + a.discountPercentage, 0) / alerts.length) || 0}%
            </div>
            <div className="text-xs text-gray-600">Avg Margin</div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(alert.status)}
                  <div>
                    <div className="font-semibold text-sm">{alert.source}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location} • {alert.timeDetected}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getUrgencyBadge(alert.urgency)}>
                    {alert.urgency}
                  </Badge>
                  <Badge variant="outline">
                    {alert.network}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <div className="text-gray-600">Amount</div>
                  <div className="font-bold">R{alert.amount}</div>
                </div>
                <div>
                  <div className="text-gray-600">Margin</div>
                  <div className="font-bold text-green-600">{alert.discountPercentage}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Volume</div>
                  <div className="font-bold">{alert.estimatedVolume}</div>
                </div>
                <div>
                  <div className="text-gray-600">Advantage</div>
                  <div className="text-xs">{alert.competitorAdvantage}</div>
                </div>
              </div>

              <div className="flex gap-2">
                {alert.status === 'new' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleAcquireDeal(alert.id)}
                    className="bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Acquire Deal
                  </Button>
                )}
                {alert.status === 'processing' && (
                  <Button size="sm" disabled>
                    <Clock className="w-4 h-4 mr-1" />
                    Processing...
                  </Button>
                )}
                {alert.status === 'acquired' && (
                  <Button size="sm" variant="outline" disabled>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Acquired
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Source
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {alerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <div className="text-gray-600 mb-2">No alerts at the moment</div>
            <div className="text-sm text-gray-500">
              AI monitoring is active and will alert you when new deals are detected
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DealAlertSystem;
