
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Download, Eye, Search } from 'lucide-react';
import { StatementActions } from './StatementActions';

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
      <div className="space-y-4 p-4">
        <Card className="w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <History className="w-5 h-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-sm">
              No transactions yet. Start purchasing airtime and data to see your history!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 max-w-full">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History ({transactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {/* Mobile-First Vertical Layout */}
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-sm">
                <CardContent className="p-4">
                  {/* Vertical Stack for Mobile Optimization */}
                  <div className="space-y-3">
                    {/* Transaction Header */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-600">
                          {generateTransactionId(transaction.timestamp)}
                        </span>
                        <Badge className={getStatusColor(transaction.status)} variant="secondary">
                          {transaction.status}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {getTransactionTypeLabel(transaction.transaction_type)}
                      </Badge>
                    </div>
                    
                    {/* Transaction Details - Clean Vertical Layout */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Network:</span>
                          <span className="font-semibold text-right">{transaction.network}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Amount:</span>
                          <span className="font-bold text-green-600 text-right">R{transaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Recipient:</span>
                          <span className="font-semibold text-right">{transaction.recipient_name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Cashback:</span>
                          <span className="font-bold text-green-600 text-right">
                            R{transaction.cashback_earned.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 font-medium">Date:</span>
                          <span className="text-xs text-gray-500 text-right">
                            {formatDate(transaction.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Mobile Optimized */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <StatementActions transaction={transaction} />
                      </div>
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
