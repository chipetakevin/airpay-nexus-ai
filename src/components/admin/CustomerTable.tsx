import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  MoreHorizontal,
  CreditCard,
  Activity,
  Pause,
  Play
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mvno: string;
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  plan: string;
  joinDate: string;
  lastActivity: string;
  dataUsage: number;
  voiceUsage: number;
  smsUsage: number;
  simStatus: 'active' | 'inactive' | 'suspended';
  supportTickets: number;
}

interface CustomerTableProps {
  customers: Customer[];
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onCustomerSelect }) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 hover:bg-green-200',
      suspended: 'bg-red-100 text-red-800 hover:bg-red-200',
      inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAction = (action: string, customer: Customer) => {
    console.log(`${action} customer:`, customer.id);
    // Implement actions: view, edit, suspend, activate, etc.
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Customer Directory ({customers.length} customers)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>MVNO</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onCustomerSelect(customer)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                      <p className="text-sm text-gray-500">{customer.id}</p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-32">{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {customer.mvno}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusBadge(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span className="font-medium">R{customer.balance.toFixed(2)}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{customer.plan}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div>Data: {customer.dataUsage}%</div>
                      <div>Voice: {customer.voiceUsage}%</div>
                      <div>SMS: {customer.smsUsage}%</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatDate(customer.lastActivity)}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    {customer.supportTickets > 0 ? (
                      <Badge variant="outline" className="bg-orange-50 text-orange-600">
                        {customer.supportTickets}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('view', customer)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('edit', customer)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        {customer.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleAction('suspend', customer)}>
                            <Pause className="w-4 h-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleAction('activate', customer)}>
                            <Play className="w-4 h-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleAction('topup', customer)}>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Top Up
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {customers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No customers found matching the current filters.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerTable;