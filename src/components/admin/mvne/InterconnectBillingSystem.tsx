import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  DollarSign, 
  Network, 
  Building, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Calculator,
  CreditCard,
  Receipt,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Settings
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: 'MNO' | 'MVNO' | 'International';
  status: 'active' | 'suspended' | 'pending';
  monthlyVolume: number;
  outstandingAmount: number;
  lastSettlement: string;
  agreementType: 'bilateral' | 'multilateral';
}

interface SettlementRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  period: string;
  totalCalls: number;
  totalMinutes: number;
  grossAmount: number;
  netAmount: number;
  status: 'reconciled' | 'pending' | 'disputed' | 'paid';
  dueDate: string;
}

interface TrafficFlow {
  direction: 'inbound' | 'outbound';
  partner: string;
  minutes: number;
  revenue: number;
  cost: number;
  margin: number;
}

const InterconnectBillingSystem = () => {
  const [selectedPartner, setSelectedPartner] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [totalRevenue, setTotalRevenue] = useState(2847532);

  const [partners] = useState<Partner[]>([
    {
      id: 'P001',
      name: 'Vodacom SA',
      type: 'MNO',
      status: 'active',
      monthlyVolume: 1847560,
      outstandingAmount: 125400,
      lastSettlement: '2024-01-15',
      agreementType: 'bilateral'
    },
    {
      id: 'P002',
      name: 'MTN SA',
      type: 'MNO',
      status: 'active',
      monthlyVolume: 1256780,
      outstandingAmount: 89670,
      lastSettlement: '2024-01-14',
      agreementType: 'bilateral'
    },
    {
      id: 'P003',
      name: 'Cell C',
      type: 'MNO',
      status: 'active',
      monthlyVolume: 945230,
      outstandingAmount: 67890,
      lastSettlement: '2024-01-16',
      agreementType: 'bilateral'
    },
    {
      id: 'P004',
      name: 'Telkom Mobile',
      type: 'MNO',
      status: 'active',
      monthlyVolume: 567890,
      outstandingAmount: 42350,
      lastSettlement: '2024-01-13',
      agreementType: 'multilateral'
    },
    {
      id: 'P005',
      name: 'International Gateway',
      type: 'International',
      status: 'active',
      monthlyVolume: 234560,
      outstandingAmount: 78920,
      lastSettlement: '2024-01-12',
      agreementType: 'bilateral'
    }
  ]);

  const [settlementRecords] = useState<SettlementRecord[]>([
    {
      id: 'SR001',
      partnerId: 'P001',
      partnerName: 'Vodacom SA',
      period: 'Jan 2024',
      totalCalls: 156780,
      totalMinutes: 2847560,
      grossAmount: 425340,
      netAmount: 382806,
      status: 'reconciled',
      dueDate: '2024-02-15'
    },
    {
      id: 'SR002',
      partnerId: 'P002',
      partnerName: 'MTN SA',
      period: 'Jan 2024',
      totalCalls: 134560,
      totalMinutes: 1895430,
      grossAmount: 378920,
      netAmount: 341028,
      status: 'pending',
      dueDate: '2024-02-14'
    },
    {
      id: 'SR003',
      partnerId: 'P003',  
      partnerName: 'Cell C',
      period: 'Jan 2024',
      totalCalls: 98340,
      totalMinutes: 1234560,
      grossAmount: 234780,
      netAmount: 211302,
      status: 'disputed',
      dueDate: '2024-02-16'
    }
  ]);

  const trafficFlowData: TrafficFlow[] = [
    { direction: 'inbound', partner: 'Vodacom', minutes: 1847560, revenue: 425340, cost: 382806, margin: 10.0 },
    { direction: 'outbound', partner: 'Vodacom', minutes: 1456780, revenue: 335670, cost: 318887, margin: 5.0 },
    { direction: 'inbound', partner: 'MTN', minutes: 1256780, revenue: 289560, cost: 263194, margin: 9.1 },
    { direction: 'outbound', partner: 'MTN', minutes: 987650, revenue: 227670, cost: 218327, margin: 4.1 },
    { direction: 'inbound', partner: 'Cell C', minutes: 945230, revenue: 217830, cost: 198021, margin: 9.1 },
    { direction: 'outbound', partner: 'Cell C', minutes: 678450, revenue: 156450, cost: 149708, margin: 4.3 }
  ];

  const monthlyRevenueData = [
    { month: 'Aug', inbound: 1250000, outbound: 980000, net: 270000 },
    { month: 'Sep', inbound: 1380000, outbound: 1120000, net: 260000 },
    { month: 'Oct', inbound: 1520000, outbound: 1240000, net: 280000 },
    { month: 'Nov', inbound: 1680000, outbound: 1350000, net: 330000 },
    { month: 'Dec', inbound: 1890000, outbound: 1520000, net: 370000 },
    { month: 'Jan', inbound: 2100000, outbound: 1680000, net: 420000 }
  ];

  const partnerRevenueData = partners.map(partner => ({
    name: partner.name,
    value: partner.monthlyVolume,
    color: getPartnerColor(partner.type)
  }));

  function getPartnerColor(type: string) {
    switch (type) {
      case 'MNO': return '#3b82f6';
      case 'MVNO': return '#10b981';
      case 'International': return '#f59e0b';
      default: return '#6b7280';
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'reconciled':
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspended':
      case 'disputed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.floor(Math.random() * 1000) + 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Interconnect Billing System</h2>
            <p className="text-muted-foreground">Wholesale settlement, reconciliation & partner management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPartner} onValueChange={setSelectedPartner}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="mno">MNO Only</SelectItem>
              <SelectItem value="mvno">MVNO Only</SelectItem>
              <SelectItem value="international">International</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="previous">Previous</SelectItem>
              <SelectItem value="ytd">YTD</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Operational
          </Badge>
        </div>
      </div>

      {/* Revenue Overview Alert */}
      <Alert className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-white">
        <DollarSign className="h-4 w-4 text-emerald-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-emerald-800 font-medium">
              Monthly interconnect revenue: R{totalRevenue.toLocaleString()} with {partners.length} active partners
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2% MoM
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700">R{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Monthly Revenue</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Building className="w-8 h-8 text-green-600" />
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{partners.filter(p => p.status === 'active').length}</div>
            <div className="text-sm text-green-600">Active Partners</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Receipt className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Pending
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {settlementRecords.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-sm text-purple-600">Pending Settlements</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Disputed
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">
              {settlementRecords.filter(s => s.status === 'disputed').length}
            </div>
            <div className="text-sm text-orange-600">Disputed Records</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="inbound" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outbound" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Partner Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Partner Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={partnerRevenueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: R${(value/1000).toFixed(0)}K`}
                  >
                    {partnerRevenueData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partner Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Partner Management
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partners.map((partner) => (
                <div key={partner.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{partner.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {partner.type}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(partner.status)}>
                        {partner.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-medium">Monthly Volume:</span> {partner.monthlyVolume.toLocaleString()} min
                    </div>
                    <div>
                      <span className="font-medium">Outstanding:</span> R{partner.outstandingAmount.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Last Settlement:</span> {partner.lastSettlement}
                    </div>
                    <div>
                      <span className="font-medium">Agreement:</span> {partner.agreementType}
                    </div>
                  </div>
                  <Progress value={partner.outstandingAmount / 2000} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settlement Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Settlement Records
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settlementRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{record.partnerName}</span>
                      <span className="text-sm text-gray-500">({record.period})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {record.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">R{record.netAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Calls:</span> {record.totalCalls.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Minutes:</span> {record.totalMinutes.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Gross:</span> R{record.grossAmount.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Due:</span> {record.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterconnectBillingSystem;