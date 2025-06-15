import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  PieChart, 
  Activity,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { Transaction } from '../types/admin';
import { formatCurrency, formatDate } from '../utils/adminUtils';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [activeTab, setActiveTab] = useState('history');

  const handleGenerateTransactionReport = () => {
    // Generate comprehensive transaction analytics report
    console.log('Generating transaction analytics report...');
    // This will be implemented with the enhanced PDF generator
  };

  const tabs = [
    {
      value: 'history',
      label: 'Transaction History',
      icon: '📊',
      description: 'Records',
      color: 'green'
    },
    {
      value: 'analytics',
      label: 'Reports & Analytics',
      icon: '📈',
      description: 'Insights',
      color: 'purple'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive'
    };
    return statusColors[status.toLowerCase()] || 'secondary';
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-First Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full">
            {/* Mobile: Single column */}
            <div className="grid grid-cols-1 gap-2 w-full sm:hidden">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Desktop: Single Row */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-2 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="history" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Transaction History ({transactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Customer</th>
                      <th className="text-left p-2 font-semibold">Amount</th>
                      <th className="text-left p-2 font-semibold">Network</th>
                      <th className="text-left p-2 font-semibold">Type</th>
                      <th className="text-left p-2 font-semibold">Status</th>
                      <th className="text-left p-2 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{transaction.customerName}</div>
                            <div className="text-sm text-gray-500">
                              ID: {transaction.customerId ? transaction.customerId.slice(0, 8) + '...' : 'N/A'}
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{formatCurrency(transaction.amount)}</div>
                            <div className="text-sm text-green-600">+{formatCurrency(transaction.cashbackEarned)} cashback</div>
                          </div>
                        </td>
                        <td className="p-2">{transaction.network}</td>
                        <td className="p-2 capitalize">{transaction.transactionType?.replace('_', ' ')}</td>
                        <td className="p-2">
                          <Badge variant={getStatusBadge(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="p-2">{formatDate(transaction.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 animate-fade-in">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Transaction Analytics</h1>
              </div>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Generate comprehensive transaction reports with modern visualizations
              </p>
            </div>

            {/* Enhanced Transaction Report - Main Feature */}
            <Card className="border border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900">Transaction Analytics Report</h2>
                    <p className="text-gray-600 text-sm max-w-sm mx-auto">
                      Comprehensive transaction insights with revenue and performance metrics
                    </p>
                  </div>

                  {/* Feature Icons */}
                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <PieChart className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs text-gray-600">Revenue</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-600">Trends</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs text-gray-600">Performance</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button 
                    onClick={handleGenerateTransactionReport} 
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Generate Transaction Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Features Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Transaction Analytics Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Report Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Analytics Features</h4>
                    <div className="space-y-2">
                      {[
                        { text: "Revenue and commission analysis", color: "bg-green-500" },
                        { text: "Network performance metrics", color: "bg-blue-500" },
                        { text: "Transaction volume trends", color: "bg-purple-500" },
                        { text: "Cashback distribution patterns", color: "bg-orange-500" }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-2 h-2 ${feature.color} rounded-full`}></div>
                          <span className="text-sm text-gray-600">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Export Options */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Report Options</h4>
                    <div className="space-y-2">
                      {[
                        { text: "Financial summary reports", color: "bg-red-500" },
                        { text: "Visual performance charts", color: "bg-yellow-500" },
                        { text: "Vendor commission breakdown", color: "bg-indigo-500" },
                        { text: "Executive dashboards", color: "bg-pink-500" }
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-2 h-2 ${option.color} rounded-full`}></div>
                          <span className="text-sm text-gray-600">{option.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTable;
