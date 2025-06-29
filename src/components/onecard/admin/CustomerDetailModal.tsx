
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Customer, Transaction } from '../types/admin';
import { formatCurrency, formatDate } from '../utils/adminUtils';

interface CustomerDetailModalProps {
  customer: Customer;
  customerTransactions: Transaction[];
  onClose: () => void;
}

const CustomerDetailModal = ({ customer, customerTransactions, onClose }: CustomerDetailModalProps) => {
  return (
    <Card className="fixed inset-4 z-50 bg-white shadow-2xl rounded-lg overflow-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customer Details: {customer.firstName} {customer.lastName}</CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Personal Information</h4>
            <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Registration:</strong> {formatDate(customer.registrationDate)}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Account Information</h4>
            <p><strong>Card Number:</strong> {customer.cardNumber}</p>
            <p><strong>Balance:</strong> {formatCurrency(customer.onecardBalance)}</p>
            <p><strong>Total Cashback:</strong> {formatCurrency(customer.totalCashback)}</p>
            <p><strong>Network:</strong> {customer.networkProvider}</p>
            <p><strong>RICA Status:</strong> {customer.ricaVerified ? 'Verified' : 'Pending'}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Recent Transactions</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Cashback</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerTransactions.slice(0, 5).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.timestamp)}</TableCell>
                  <TableCell>{formatCurrency(tx.amount)}</TableCell>
                  <TableCell>{formatCurrency(tx.cashbackEarned)}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailModal;
