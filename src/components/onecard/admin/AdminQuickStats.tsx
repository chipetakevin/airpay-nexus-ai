
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CreditCard, TrendingUp, FileText } from 'lucide-react';
import { Customer, Transaction } from '../types/admin';
import { formatCurrency } from '../utils/adminUtils';

interface AdminQuickStatsProps {
  customers: Customer[];
  transactions: Transaction[];
}

const AdminQuickStats = ({ customers, transactions }: AdminQuickStatsProps) => {
  const totalBalance = customers.reduce((sum, customer) => sum + (Number(customer.onecardBalance) || 0), 0);
  const totalCashback = customers.reduce((sum, customer) => sum + (Number(customer.totalCashback) || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Total Cashback</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCashback)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuickStats;
