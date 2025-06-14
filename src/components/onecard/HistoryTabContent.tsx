
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Download, Eye } from 'lucide-react';

interface Transaction {
  customer_id: string;
  vendor_id: string;
  deal_id: string;
  recipient_phone: string;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  original_price: number;
  discounted_price: number;
  network: string;
  transaction_type: string;
  cashback_earned: number;
  admin_fee: number;
  vendor_commission: number;
  status: string;
  timestamp: string;
}

export const HistoryTabContent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem('userTransactions');
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions);
        // Sort by timestamp (newest first)
        const sortedTransactions = parsedTransactions.sort((a: Transaction, b: Transaction) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error parsing transactions:', error);
      }
    }
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'self_purchase':
        return 'Self Purchase';
      case 'third_party_purchase':
        return 'Gift Purchase';
      case 'vendor_purchase':
        return 'Vendor Sale';
      default:
        return type;
    }
  };

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  if (transactions.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <History className="w-5 h-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">
                No transactions yet. Start purchasing airtime and data to see your history!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History ({transactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <Card key={index} className="bg-gray-50 border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">
                          {generateTransactionId(transaction.timestamp)}
                        </span>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getTransactionTypeLabel(transaction.transaction_type)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Network:</span>
                          <span className="ml-1 font-medium">{transaction.network}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <span className="ml-1 font-medium">R{transaction.amount.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Recipient:</span>
                          <span className="ml-1 font-medium">{transaction.recipient_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Cashback:</span>
                          <span className="ml-1 font-medium text-green-600">
                            R{transaction.cashback_earned.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        {formatDate(transaction.timestamp)}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
