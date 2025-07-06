import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  
  const [oneCardAccounts] = useState<OneCardAccount[]>([
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

      {/* Balance Management Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Balance Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <div className="text-lg font-bold">Bulk Transfer</div>
              <div className="text-sm text-muted-foreground">Transfer between cards</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <div className="text-lg font-bold">Auto Allocation</div>
              <div className="text-sm text-muted-foreground">Set allocation rules</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <div className="text-lg font-bold">Balance Alerts</div>
              <div className="text-sm text-muted-foreground">Configure notifications</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <div className="text-lg font-bold">Usage Reports</div>
              <div className="text-sm text-muted-foreground">Generate analytics</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneCardBalancePanel;