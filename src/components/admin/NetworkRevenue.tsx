
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown } from 'lucide-react';

interface NetworkRevenueProps {
  isNetworkRevenueCollapsed?: boolean;
  onToggleNetworkRevenue?: (collapsed: boolean) => void;
}

const NetworkRevenue: React.FC<NetworkRevenueProps> = ({
  isNetworkRevenueCollapsed = false,
  onToggleNetworkRevenue
}) => {
  const { toast } = useToast();
  
  const [networks] = useState([
    {
      id: 1,
      name: 'MTN South Africa',
      type: 'Mobile Network',
      revenue: 45230.50,
      transactions: 523,
      accountNumber: '****7845',
      lastPayment: '2024-01-15T10:30:00',
      status: 'Paid'
    },
    {
      id: 2,
      name: 'Vodacom',
      type: 'Mobile Network',
      revenue: 38475.25,
      transactions: 445,
      accountNumber: '****9123',
      lastPayment: '2024-01-15T10:30:00',
      status: 'Paid'
    },
    {
      id: 3,
      name: 'Cell C',
      type: 'Mobile Network',
      revenue: 22890.75,
      transactions: 287,
      accountNumber: '****5567',
      lastPayment: '2024-01-15T10:30:00',
      status: 'Paid'
    },
    {
      id: 4,
      name: 'Telkom Mobile',
      type: 'Mobile Network',
      revenue: 12952.50,
      transactions: 156,
      accountNumber: '****3341',
      lastPayment: '2024-01-15T10:30:00',
      status: 'Paid'
    }
  ]);

  const handlePayNetwork = (networkId: number, networkName: string, amount: number) => {
    // Simulate automatic payment
    const paymentRef = `PAY-${Date.now()}-${networkId}`;
    
    toast({
      title: "Payment Processed",
      description: `R${amount.toLocaleString()} paid to ${networkName}. Ref: ${paymentRef}`,
    });

    // Simulate email notification
    setTimeout(() => {
      toast({
        title: "Email Sent",
        description: `Payment confirmation sent to ${networkName}`,
      });
    }, 1000);
  };

  const totalNetworkRevenue = networks.reduce((sum, network) => sum + network.revenue, 0);

  if (isNetworkRevenueCollapsed) {
    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📊</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-green-800">
                    Network Revenue Management
                  </div>
                  <div className="text-xs text-green-700 mt-0.5">
                    Total: R{totalNetworkRevenue.toLocaleString()} • {networks.length} Networks • 95% Revenue Share
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onToggleNetworkRevenue?.(false)}
                className="text-xs text-green-700 hover:bg-green-100 flex items-center gap-1"
              >
                <ChevronDown className="w-4 h-4" />
                Show Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Network Revenue Management</h3>
        <p className="text-gray-600">Automated payment distribution to network providers</p>
      </div>

      {/* Revenue Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                R{totalNetworkRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Network Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {networks.length}
              </div>
              <div className="text-sm text-gray-600">Active Networks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Revenue Share</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Networks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Network Payment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Network Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Revenue (R)</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networks.map((network) => (
                <TableRow key={network.id}>
                  <TableCell className="font-medium">{network.name}</TableCell>
                  <TableCell>{network.type}</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    R{network.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>{network.transactions}</TableCell>
                  <TableCell>{network.accountNumber}</TableCell>
                  <TableCell>
                    {new Date(network.lastPayment).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {network.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handlePayNetwork(network.id, network.name, network.revenue)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Pay Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Automatic Payment Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg">🤖</div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Automated Payment System</h4>
              <p className="text-sm text-blue-700">
                Payments are automatically processed to network providers upon transaction completion. 
                Email confirmations with payment references are sent immediately to each network.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkRevenue;
