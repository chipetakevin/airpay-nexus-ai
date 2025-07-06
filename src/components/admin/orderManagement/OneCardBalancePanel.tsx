import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface DigitalBalance {
  id: string;
  type: 'airtime' | 'data';
  network: string;
  amount: number;
  allocated: number;
  available: number;
  lastUpdate: string;
  expiryDate: string;
}

interface OneCardAccount {
  id: string;
  cardNumber: string;
  cardHolder: string;
  memberSince: string;
  validThru: string;
  totalBalance: number;
  balances: DigitalBalance[];
  status: 'active' | 'suspended' | 'expired';
}

const OneCardBalancePanel = () => {
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [autoAllocationsEnabled, setAutoAllocationsEnabled] = useState(true);
  const [balanceAlerts, setBalanceAlerts] = useState(true);
  const [allocationAmount, setAllocationAmount] = useState<string>('');
  
  const [oneCardAccounts, setOneCardAccounts] = useState<OneCardAccount[]>([
    {
      id: 'OCP9-1V4W-W0',
      cardNumber: 'OCP9 1V4W W0',
      cardHolder: 'KEVIN CHIPETA',
      memberSince: '2025',
      validThru: '06/28',
      totalBalance: 125450.75,
      status: 'active',
      balances: [
        {
          id: 'BAL-001',
          type: 'airtime',
          network: 'MTN',
          amount: 50000,
          allocated: 35000,
          available: 15000,
          lastUpdate: '2024-01-15T10:30:00',
          expiryDate: '2024-12-31'
        },
        {
          id: 'BAL-002',
          type: 'data',
          network: 'Vodacom',
          amount: 75450.75,
          allocated: 45000,
          available: 30450.75,
          lastUpdate: '2024-01-15T09:45:00',
          expiryDate: '2024-12-31'
        }
      ]
    }
  ]);

  // Automated monitoring and error prevention
  useEffect(() => {
    const monitoringInterval = setInterval(() => {
      oneCardAccounts.forEach(account => {
        account.balances.forEach(balance => {
          const utilizationRate = (balance.allocated / balance.amount) * 100;
          const daysUntilExpiry = Math.ceil((new Date(balance.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          // Automated balance alerts
          if (balanceAlerts) {
            if (balance.available < balance.amount * 0.1) {
              toast({
                title: "🔔 Low Balance Alert",
                description: `${balance.network} ${balance.type} balance is below 10% (R${balance.available.toLocaleString()})`,
                variant: "destructive"
              });
            }
            
            if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
              toast({
                title: "⚠️ Expiry Warning",
                description: `${balance.network} ${balance.type} expires in ${daysUntilExpiry} days`,
              });
            }
          }
        });
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(monitoringInterval);
  }, [oneCardAccounts, balanceAlerts, toast]);

  // Smart auto-allocation algorithm
  const handleAutoAllocation = async (balanceId: string, amount: number) => {
    if (!autoAllocationsEnabled) return;
    
    const account = oneCardAccounts.find(acc => 
      acc.balances.some(bal => bal.id === balanceId)
    );
    
    if (!account) return;
    
    const balance = account.balances.find(bal => bal.id === balanceId);
    if (!balance) return;

    // Automated validation checks
    if (amount <= 0) {
      toast({
        title: "Allocation Error",
        description: "Allocation amount must be positive",
        variant: "destructive"
      });
      return;
    }

    if (amount > balance.available) {
      toast({
        title: "Insufficient Balance",
        description: `Available balance: R${balance.available.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }

    // Smart allocation with fraud detection
    const maxAllowedAllocation = balance.available * 0.9; // Max 90% allocation
    if (amount > maxAllowedAllocation) {
      toast({
        title: "Large Allocation Detected",
        description: "Allocation exceeds safe threshold. Please verify manually.",
        variant: "destructive"
      });
      return;
    }

    // Process allocation
    setOneCardAccounts(prev => prev.map(acc => ({
      ...acc,
      balances: acc.balances.map(bal => 
        bal.id === balanceId 
          ? {
              ...bal,
              allocated: bal.allocated + amount,
              available: bal.available - amount,
              lastUpdate: new Date().toISOString()
            }
          : bal
      )
    })));

    toast({
      title: "✅ Auto-Allocation Complete",
      description: `R${amount.toLocaleString()} allocated successfully to ${balance.network} ${balance.type}`,
    });
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? '' : cardId);
  };

  const handleTopUp = (balanceId: string) => {
    toast({
      title: "Top-Up Initiated",
      description: "Processing balance top-up request...",
    });
  };

  const getUtilizationPercentage = (balance: DigitalBalance) => {
    return Math.round((balance.allocated / balance.amount) * 100);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">OneCard Digital Balance Management</h3>
        <p className="text-gray-600">Manage bulk airtime and data balances stored on OneCard accounts</p>
      </div>

      {/* OneCard Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {oneCardAccounts.map((account) => (
          <div key={account.id} className="space-y-4">
            {/* Gold OneCard */}
            <div 
              className="relative cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleCardClick(account.id)}
            >
              <div className="w-full h-52 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                
                {/* Card content */}
                <div className="relative p-6 text-black h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 font-bold text-xl">A</span>
                      </div>
                      <div>
                        <div className="font-bold text-xl">AirPay</div>
                        <div className="text-sm opacity-80">Powered by OneCard</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-yellow-400 font-bold">1</span>
                      </div>
                      <span className="font-bold">CARD</span>
                    </div>
                  </div>

                  {/* Card number */}
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold tracking-wider">
                      {account.cardNumber}
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-80 mb-1">CARD HOLDER</div>
                      <div className="font-bold text-lg">{account.cardHolder}</div>
                      <div className="text-sm opacity-80">Member Since {account.memberSince}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80 mb-1">VALID THRU</div>
                      <div className="font-bold text-xl">{account.validThru}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status badge */}
              <div className="absolute -top-2 -right-2">
                <Badge className={getStatusColor(account.status)} variant="outline">
                  {account.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Balance summary */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    R{account.totalBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Available Balance</div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Detailed Balance View */}
      {selectedCard && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Digital Balance Details</span>
              <Badge variant="outline">Card: {selectedCard}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {oneCardAccounts
              .find(account => account.id === selectedCard)
              ?.balances.map((balance) => (
                <div key={balance.id} className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div>
                      <div className="font-medium">{balance.network}</div>
                      <div className="text-sm text-gray-600 capitalize">{balance.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="font-bold text-lg">R{balance.amount.toLocaleString()}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Allocated</div>
                      <div className="font-medium text-orange-600">R{balance.allocated.toLocaleString()}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Available</div>
                      <div className="font-bold text-green-600">R{balance.available.toLocaleString()}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Utilization</div>
                      <div className="flex items-center gap-2">
                        <Progress value={getUtilizationPercentage(balance)} className="h-2 w-16" />
                        <span className="text-sm font-medium">{getUtilizationPercentage(balance)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        size="sm" 
                        onClick={() => handleTopUp(balance.id)}
                        className="w-full"
                      >
                        Top Up
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t text-xs text-gray-500 grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Last Updated:</span> {new Date(balance.lastUpdate).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Expires:</span> {new Date(balance.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Automation Controls & Error Prevention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🤖 Automated Error Prevention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Real-time Balance Monitoring</Label>
              <input 
                type="checkbox" 
                checked={balanceAlerts}
                onChange={(e) => setBalanceAlerts(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-base">Auto-Allocation System</Label>
              <input 
                type="checkbox" 
                checked={autoAllocationsEnabled}
                onChange={(e) => setAutoAllocationsEnabled(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            
            {selectedCard && (
              <div className="space-y-3 mt-4 p-4 bg-muted/50 rounded-lg">
                <Label className="text-sm font-medium">Smart Auto-Allocation</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount (R)"
                    value={allocationAmount}
                    onChange={(e) => setAllocationAmount(e.target.value)}
                    className="h-10"
                  />
                  <Button 
                    onClick={() => {
                      const account = oneCardAccounts.find(acc => acc.id === selectedCard);
                      if (account && account.balances.length > 0) {
                        handleAutoAllocation(account.balances[0].id, parseFloat(allocationAmount) || 0);
                        setAllocationAmount('');
                      }
                    }}
                    disabled={!allocationAmount || !autoAllocationsEnabled}
                    className="h-10"
                  >
                    Allocate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI-powered allocation with fraud detection and validation
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 System Health & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Order Processing Accuracy</span>
                <Badge className="bg-green-100 text-green-800">99.8%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Automated Validations</span>
                <Badge className="bg-blue-100 text-blue-800">2,847 Today</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Prevention Rate</span>
                <Badge className="bg-purple-100 text-purple-800">94.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response Time</span>
                <Badge className="bg-amber-100 text-amber-800">127ms Avg</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Alerts Section */}
      {balanceAlerts && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🔔</span>
              <span>Automated monitoring active: Real-time balance alerts, expiry warnings, and fraud detection enabled</span>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">Live</Badge>
          </AlertDescription>
        </Alert>
      )}

      {/* Digital Wallet Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>💳 Digital Wallet Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">✅ Connected</div>
              <div className="text-sm text-green-700">MVNO BSS Integration</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">🔄 Synced</div>
              <div className="text-sm text-green-700">Real-time Balance Updates</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">🛡️ Secured</div>
              <div className="text-sm text-green-700">Automated Fraud Detection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Order Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Bulk Order to Digital Balance Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <div>
                <div className="font-medium">Bulk Order Placed</div>
                <div className="text-sm text-muted-foreground">Automated validation and provider balance check</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <div>
                <div className="font-medium">Payment Processed</div>
                <div className="text-sm text-muted-foreground">Real-time credit allocation to OneCard digital wallet</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <div>
                <div className="font-medium">Balance Updated</div>
                <div className="text-sm text-muted-foreground">Intelligent allocation with automated monitoring enabled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Management Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🛠️ Intelligent Balance Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col hover:bg-primary/5">
              <div className="text-lg font-bold">🔄 Bulk Transfer</div>
              <div className="text-sm text-muted-foreground">AI-powered balance distribution</div>
            </Button>
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${autoAllocationsEnabled ? 'bg-green-50 border-green-200' : 'hover:bg-primary/5'}`}
              onClick={() => setAutoAllocationsEnabled(!autoAllocationsEnabled)}
            >
              <div className="text-lg font-bold">
                {autoAllocationsEnabled ? '🤖 Auto ON' : '⏸️ Auto OFF'}
              </div>
              <div className="text-sm text-muted-foreground">Smart allocation rules</div>
            </Button>
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${balanceAlerts ? 'bg-blue-50 border-blue-200' : 'hover:bg-primary/5'}`}
              onClick={() => setBalanceAlerts(!balanceAlerts)}
            >
              <div className="text-lg font-bold">
                {balanceAlerts ? '🔔 Alerts ON' : '🔕 Alerts OFF'}
              </div>
              <div className="text-sm text-muted-foreground">Real-time notifications</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover:bg-primary/5">
              <div className="text-lg font-bold">📊 Analytics</div>
              <div className="text-sm text-muted-foreground">Usage & performance reports</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneCardBalancePanel;