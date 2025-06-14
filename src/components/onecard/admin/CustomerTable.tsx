
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Eye } from 'lucide-react';
import { Customer } from '../types/admin';
import { formatCurrency } from '../utils/adminUtils';

interface CustomerTableProps {
  customers: Customer[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCustomerSelect: (customer: Customer) => void;
  onGenerateReport: (customer: Customer) => void;
  onGenerateMasterReport: () => void;
}

const CustomerTable = ({
  customers,
  searchTerm,
  onSearchChange,
  onCustomerSelect,
  onGenerateReport,
  onGenerateMasterReport
}: CustomerTableProps) => {
  const filteredCustomers = customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customer Directory</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button onClick={onGenerateMasterReport}>
              <Download className="w-4 h-4 mr-2" />
              Master Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Card Number</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Cashback</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="font-mono">{customer.cardNumber}</TableCell>
                <TableCell className="font-bold text-green-600">
                  {formatCurrency(customer.onecardBalance)}
                </TableCell>
                <TableCell className="font-bold text-purple-600">
                  {formatCurrency(customer.totalCashback)}
                </TableCell>
                <TableCell>{customer.networkProvider}</TableCell>
                <TableCell>
                  <Badge variant={customer.ricaVerified ? "default" : "secondary"}>
                    {customer.ricaVerified ? 'RICA Verified' : 'Pending RICA'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCustomerSelect(customer)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onGenerateReport(customer)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Report
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
