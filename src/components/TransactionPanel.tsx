
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Real-time Transactions</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-1" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{transaction.id}</div>
                  <div className="text-gray-500">{transaction.agent}</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{transaction.amount}</div>
                  <div className="text-gray-500">{transaction.network} - {transaction.type}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
                <div className="text-sm text-gray-500 text-right">
                  {transaction.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPanel;
