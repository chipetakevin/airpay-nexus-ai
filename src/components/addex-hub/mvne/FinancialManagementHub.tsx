import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  CreditCard, DollarSign, TrendingUp, TrendingDown, AlertTriangle,
  Calculator, Shield, Clock, CheckCircle, Eye, FileText, Zap,
  BarChart3, Users, Target, Coins, Receipt, Settings
} from 'lucide-react';

export const FinancialManagementHub: React.FC = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('');
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');

  const [financialStats] = useState({
    totalRevenue: 1547832.50,
    pendingAdjustments: 23,
    creditLimitUtilization: 67.8,
    billShockAlerts: 5,
    averageSpend: 425.75,
    creditUpgrades: 12,
    financialRisk: 'Low'
  });

  const [recentAdjustments] = useState([
    {
      id: 'ADJ001',
      customer: '+27821234567',
      type: 'Credit',
      amount: 150.00,
      reason: 'Service compensation',
      status: 'approved',
      processedBy: 'Mike Admin',
      processedAt: '2025-07-08 14:30:00'
    },
    {
      id: 'ADJ002',
      customer: '+27821234568',
      type: 'Debit',
      amount: -75.50,
      reason: 'Overpayment correction',
      status: 'pending',
      processedBy: 'System',
      processedAt: '2025-07-08 15:15:00'
    },
    {
      id: 'ADJ003',
      customer: '+27821234569',
      type: 'Credit',
      amount: 200.00,
      reason: 'Loyalty bonus',
      status: 'completed',
      processedBy: 'Sarah Finance',
      processedAt: '2025-07-08 13:45:00'
    }
  ]);

  const [billShockAlerts] = useState([
    {
      customer: '+27821234570',
      currentSpend: 890.50,
      limit: 500.00,
      threshold: '80%',
      severity: 'high',
      timeRemaining: '5 days'
    },
    {
      customer: '+27821234571',
      currentSpend: 425.75,
      limit: 500.00,
      threshold: '85%',
      severity: 'medium',
      timeRemaining: '12 days'
    }
  ]);

  const [creditUpgradeRequests] = useState([
    {
      customer: '+27821234572',
      currentLimit: 500,
      requestedLimit: 1000,
      avgSpend: 675.50,
      creditScore: 'A',
      tenure: '18 months',
      status: 'pending'
    },
    {
      customer: '+27821234573',
      currentLimit: 300,
      requestedLimit: 750,
      avgSpend: 425.25,
      creditScore: 'B+',
      tenure: '12 months',
      status: 'approved'
    }
  ]);

  const handleFinancialAdjustment = () => {
    if (!selectedCustomer || !adjustmentType || !adjustmentAmount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Financial Adjustment Submitted",
      description: `${adjustmentType} adjustment of R${adjustmentAmount} submitted for ${selectedCustomer}`,
    });

    // Reset form
    setSelectedCustomer('');
    setAdjustmentType('');
    setAdjustmentAmount('');
    setAdjustmentReason('');
  };

  const handleCreditUpgrade = (customer: string, action: 'approve' | 'reject') => {
    toast({
      title: `Credit Upgrade ${action}d`,
      description: `Credit upgrade request for ${customer} has been ${action}d.`,
    });
  };

  const handleBillShockAction = (customer: string) => {
    toast({
      title: "Bill Shock Alert Resolved",
      description: `Customer ${customer} has been notified and service adjusted.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Financial Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <Badge className="bg-green-500">Revenue</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">R{financialStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-600">Total</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <Badge className="bg-yellow-500">Pending</Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{financialStats.pendingAdjustments}</div>
            <div className="text-sm text-yellow-600">Adjustments</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <Badge className="bg-blue-500">Credit</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{financialStats.creditLimitUtilization}%</div>
            <div className="text-sm text-blue-600">Utilization</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <Badge className="bg-red-500">Alerts</Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{financialStats.billShockAlerts}</div>
            <div className="text-sm text-red-600">Bill Shock</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <Badge className="bg-purple-500">Average</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">R{financialStats.averageSpend}</div>
            <div className="text-sm text-purple-600">Spend</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <Badge className="bg-indigo-500">Upgrades</Badge>
            </div>
            <div className="text-2xl font-bold text-indigo-700">{financialStats.creditUpgrades}</div>
            <div className="text-sm text-indigo-600">Credit</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <Badge className="bg-teal-500">Risk</Badge>
            </div>
            <div className="text-2xl font-bold text-teal-700">{financialStats.financialRisk}</div>
            <div className="text-sm text-teal-600">Level</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Adjustment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Financial Adjustment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer MSISDN</Label>
              <Input
                id="customer"
                placeholder="+27821234567"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="type">Adjustment Type</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Adjustment</SelectItem>
                  <SelectItem value="debit">Debit Adjustment</SelectItem>
                  <SelectItem value="waiver">Fee Waiver</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="penalty">Penalty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount (R)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter adjustment reason..."
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
              />
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleFinancialAdjustment}
            >
              Submit Adjustment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-green-600" />
              Recent Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentAdjustments.map((adjustment) => (
                <div key={adjustment.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{adjustment.customer}</span>
                    <Badge className={getStatusColor(adjustment.status)}>
                      {adjustment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${adjustment.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {adjustment.amount > 0 ? '+' : ''}R{Math.abs(adjustment.amount)}
                    </span>
                    <span className="text-xs text-gray-500">{adjustment.type}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{adjustment.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">By {adjustment.processedBy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bill Shock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Bill Shock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billShockAlerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg border-red-200 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{alert.customer}</span>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Current Spend:</span>
                      <span className="font-semibold text-red-600">R{alert.currentSpend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Limit:</span>
                      <span>R{alert.limit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Remaining:</span>
                      <span>{alert.timeRemaining}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => handleBillShockAction(alert.customer)}
                  >
                    Take Action
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Upgrade Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Credit Upgrade Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Current Limit</th>
                  <th className="text-left p-3 font-medium">Requested Limit</th>
                  <th className="text-left p-3 font-medium">Avg Spend</th>
                  <th className="text-left p-3 font-medium">Credit Score</th>
                  <th className="text-left p-3 font-medium">Tenure</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creditUpgradeRequests.map((request, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono">{request.customer}</td>
                    <td className="p-3">R{request.currentLimit}</td>
                    <td className="p-3 font-semibold text-blue-600">R{request.requestedLimit}</td>
                    <td className="p-3">R{request.avgSpend}</td>
                    <td className="p-3">
                      <Badge variant="outline">{request.creditScore}</Badge>
                    </td>
                    <td className="p-3">{request.tenure}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {request.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleCreditUpgrade(request.customer, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCreditUpgrade(request.customer, 'reject')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};