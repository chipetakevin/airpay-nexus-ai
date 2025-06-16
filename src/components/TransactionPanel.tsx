
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Search, Filter } from 'lucide-react';

const TransactionPanel = () => {
  const recentTransactions = [
    {
      id: "TXN-001847",
      amount: "R 150.00",
      network: "Vodacom",
      type: "Data Bundle",
      status: "Completed",
      time: "2 mins ago",
      agent: "Cape Town Store #23"
    },
    {
      id: "TXN-001846",
      amount: "R 55.00",
      network: "MTN",
      type: "Airtime",
      status: "Completed",
      time: "3 mins ago",
      agent: "Johannesburg Agent #145"
    },
    {
      id: "TXN-001845",
      amount: "R 299.00",
      network: "Cell C",
      type: "Monthly Bundle",
      status: "Processing",
      time: "5 mins ago",
      agent: "Durban Distributor #7"
    },
    {
      id: "TXN-001844",
      amount: "R 25.00",
      network: "Telkom",
      type: "SMS Bundle",
      status: "Failed",
      time: "7 mins ago",
      agent: "Pretoria Store #89"
    },
    {
      id: "TXN-001843",
      amount: "R 100.00",
      network: "Virgin Mobile",
      type: "Data Bundle",
      status: "Completed",
      time: "8 mins ago",
      agent: "Online Portal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Real-time Transactions</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Search className="w-3 h-3 mr-1" />
              Search
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        {/* Mobile-First Vertical Layout */}
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <Card key={index} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Vertical Stack for Mobile */}
                <div className="space-y-3">
                  {/* Transaction Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-blue-600">{transaction.id}</span>
                      <Badge className={getStatusColor(transaction.status)} variant="secondary">
                        {transaction.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{transaction.time}</span>
                  </div>
                  
                  {/* Transaction Details - Vertical Stack */}
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-green-600">{transaction.amount}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium">{transaction.network}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{transaction.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600">Agent:</span>
                      <span className="font-medium text-xs text-right">{transaction.agent}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="w-full sm:w-auto">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPanel;
