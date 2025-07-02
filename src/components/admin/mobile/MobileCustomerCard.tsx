import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  CreditCard, 
  Activity, 
  AlertCircle,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface MobileCustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
  onQuickAction?: (action: string, customer: Customer) => void;
}

const MobileCustomerCard: React.FC<MobileCustomerCardProps> = ({
  customer,
  onSelect,
  onQuickAction
}) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 border-green-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {customer.firstName} {customer.lastName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {customer.id}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <Badge className={cn("text-xs", getStatusBadge(customer.status))}>
              {customer.status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction?.('menu', customer);
              }}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground truncate">{customer.email}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="font-semibold text-sm">R{customer.balance.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Plan</p>
              <p className="font-semibold text-sm truncate">{customer.plan}</p>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Data Usage</span>
            <span className="font-medium">{customer.dataUsage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(customer.dataUsage, 100)}%` }}
            />
          </div>
        </div>

        {/* Support Tickets Alert */}
        {customer.supportTickets > 0 && (
          <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg mb-3">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-800">
              {customer.supportTickets} open ticket{customer.supportTickets > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {customer.mvno}
            </Badge>
            <span>Last: {formatDate(customer.lastActivity)}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelect(customer)}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCustomerCard;