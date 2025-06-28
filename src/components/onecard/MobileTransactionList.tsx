
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatementActions } from './StatementActions';
import { Transaction } from './types/admin';

interface MobileTransactionListProps {
  transactions: Transaction[];
  title?: string;
}

export const MobileTransactionList = ({ transactions, title = "Recent Transactions" }: MobileTransactionListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <div className="text-gray-500">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm">Your transaction history will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getStatusColor(transaction.status || 'completed')} variant="outline">
                          {(transaction.status || 'completed').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(transaction.timestamp || new Date().toISOString())}
                        </span>
                      </div>
                      <div className="font-semibold text-sm text-indigo-600">
                        ID: {`AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-green-600">
                        R{transaction.amount?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium">{transaction.network || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">
                        {transaction.transaction_type || transaction.type || 'Airtime'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600">Recipient:</span>
                      <span className="font-medium text-xs">
                        {transaction.recipient_phone || transaction.recipientPhone || 'Self'}
                      </span>
                    </div>
                    {(transaction.cashbackEarned || transaction.cashback_earned) && (
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Cashback:</span>
                        <span className="font-medium text-yellow-600">
                          R{(transaction.cashbackEarned || transaction.cashback_earned || 0).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-100">
                    <StatementActions transaction={transaction} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
