import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  Filter, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Smartphone,
  Shield,
  Zap,
  Target,
  Eye,
  Edit,
  Save,
  RefreshCw
} from 'lucide-react';

export const IntelligentCustomerManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [isEditing, setIsEditing] = useState(false);

  const [customers] = useState([
    {
      id: '11296442',
      name: 'Bonakele Rose Mashiane',
      msisdn: '27689043768',
      email: 'bonakele@example.com',
      status: 'active',
      riskLevel: 'low',
      churnProbability: 12,
      lifetimeValue: 4890,
      planType: 'Divine Bulk Activation Package',
      lastActivity: '2025-01-08',
      aiInsights: [
        'High engagement user - excellent retention candidate',
        'Usage pattern suggests upgrade potential',
        'Consistent payment history'
      ],
      contractDetails: {
        connectDate: '01-Jul-2025',
        contractPeriod: '24 months',
        idNumber: '6501310340089',
        address: '20 Woodlands Dr, Johannesburg'
      },
      usageMetrics: {
        dataUsage: 15.2,
        voiceMinutes: 450,
        smsCount: 89,
        monthlySpend: 149
      }
    },
    {
      id: '11336436',
      name: 'Miminyana Johannah Sebothoma',
      msisdn: '27689134811',
      email: 'miminyana@example.com',
      status: 'active',
      riskLevel: 'medium',
      churnProbability: 35,
      lifetimeValue: 2340,
      planType: 'Divine Prepaid Package',
      lastActivity: '2025-01-07',
      aiInsights: [
        'Declining usage pattern detected',
        'Potential churn risk - intervention recommended',
        'Price-sensitive customer'
      ],
      contractDetails: {
        connectDate: '07-Jul-2025',
        contractPeriod: '24 months',
        idNumber: '5404010716081',
        address: 'Gauteng, Johannesburg'
      },
      usageMetrics: {
        dataUsage: 8.5,
        voiceMinutes: 220,
        smsCount: 45,
        monthlySpend: 89
      }
    }
  ]);

  const [aiRecommendations] = useState([
    {
      type: 'retention',
      title: 'Churn Prevention Campaign',
      description: 'Target 23 at-risk customers with personalized offers',
      impact: 'Potential revenue save: R45,600',
      confidence: 87
    },
    {
      type: 'upsell',
      title: 'Plan Upgrade Opportunity',
      description: '156 customers ready for premium plans',
      impact: 'Revenue increase: R78,900',
      confidence: 92
    },
    {
      type: 'engagement',
      title: 'Re-engagement Campaign',
      description: 'Inactive users with high potential value',
      impact: 'Reactivation potential: 45 customers',
      confidence: 76
    }
  ]);

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
    toast({
      title: "Customer Loaded",
      description: `AI insights generated for ${customer.name}`,
    });
  };

  const handleAiAction = (action: string, customerId?: string) => {
    toast({
      title: "AI Action Triggered",
      description: `Executing intelligent action: ${action}`,
    });
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.msisdn.includes(searchQuery) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'all' || customer.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header with AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              AI Customer Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${rec.type === 'retention' ? 'bg-red-500' : rec.type === 'upsell' ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {rec.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">{rec.confidence}% confidence</span>
                  </div>
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-xs font-medium text-green-600 mb-3">{rec.impact}</p>
                  <Button size="sm" className="w-full" onClick={() => handleAiAction(rec.type)}>
                    Execute Campaign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="font-bold">2,847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">At Risk</span>
              <span className="font-bold text-red-600">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High Value</span>
              <span className="font-bold text-green-600">456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg LTV</span>
              <span className="font-bold">R3,247</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer Intelligence Hub
            </CardTitle>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, MSISDN, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedCustomer?.id === customer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{customer.name}</h4>
                    <Badge className={getRiskBadgeColor(customer.riskLevel)}>
                      {customer.riskLevel} risk
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {customer.msisdn}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      LTV: R{customer.lifetimeValue.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" />
                      Churn: {customer.churnProbability}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Customer Details
              </span>
              {selectedCustomer && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAiAction('refresh', selectedCustomer.id)}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input value={selectedCustomer.name} />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedCustomer.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>MSISDN</Label>
                    <p className="text-sm font-medium mt-1">{selectedCustomer.msisdn}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input value={selectedCustomer.email} />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedCustomer.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className="mt-1 bg-green-500">{selectedCustomer.status}</Badge>
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Insights
                  </Label>
                  <div className="mt-2 space-y-2">
                    {selectedCustomer.aiInsights.map((insight: string, index: number) => (
                      <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Metrics */}
                <div>
                  <Label>Usage Metrics (Current Month)</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600">Data Usage</div>
                      <div className="font-bold">{selectedCustomer.usageMetrics.dataUsage} GB</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600">Voice Minutes</div>
                      <div className="font-bold">{selectedCustomer.usageMetrics.voiceMinutes}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600">SMS Count</div>
                      <div className="font-bold">{selectedCustomer.usageMetrics.smsCount}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600">Monthly Spend</div>
                      <div className="font-bold">R{selectedCustomer.usageMetrics.monthlySpend}</div>
                    </div>
                  </div>
                </div>

                {/* Smart Actions */}
                <div>
                  <Label>AI-Recommended Actions</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAiAction('upgrade', selectedCustomer.id)}
                      className="justify-start"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Suggest Plan Upgrade
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAiAction('retention', selectedCustomer.id)}
                      className="justify-start"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Initiate Retention Flow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAiAction('support', selectedCustomer.id)}
                      className="justify-start"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Proactive Support
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a customer to view intelligent insights</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};