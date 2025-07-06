
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
  CreditCard,
  Crown
} from 'lucide-react';
import { Transaction } from '../types/admin';
import { formatCurrency, formatDate } from '../utils/adminUtils';
import { generateCleanPremiumReport, generateCleanCustomerReport } from '../utils/cleanPdfGenerator';
import { useToast } from '@/hooks/use-toast';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [activeTab, setActiveTab] = useState('history');
  const { toast } = useToast();

  const handleGeneratePremiumReport = () => {
    try {
      generateCleanPremiumReport(transactions, toast);
    } catch (error) {
      console.error('Error generating premium report:', error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the premium report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGenerateCustomerReport = () => {
    try {
      generateCleanCustomerReport(transactions, toast);
    } catch (error) {
      console.error('Error generating customer report:', error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the customer report. Please try again.",
        variant: "destructive"
      });
    }
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
      value: 'premium',
      label: 'Premium Report',
      icon: '👑',
      description: 'Master Analytics',
      color: 'purple'
    },
    {
      value: 'customer',
      label: 'Customer Report',
      icon: '📈',
      description: 'Insights',
      color: 'blue'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-h-[55px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100"
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
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Compact Tab Navigation */}
        <div className="w-full mb-4">
          <TabsList className="w-full max-w-full">
            <div className="grid grid-cols-3 gap-1 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-base">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>

        {/* Transaction History Tab - Mobile-First Design */}
        <TabsContent value="history" className="space-y-3 animate-fade-in">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Transaction History ({transactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {/* Mobile-First Vertical Card Layout */}
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="bg-gray-50 border-l-4 border-l-green-500">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        {/* Header with Customer and Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 truncate">
                              {transaction.customerName}
                            </h4>
                            <p className="text-xs text-gray-500 font-mono">
                              ID: {transaction.customerId ? transaction.customerId.slice(0, 8) + '...' : 'N/A'}
                            </p>
                          </div>
                          <Badge variant={getStatusBadge(transaction.status)} className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                        
                        {/* Transaction Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-semibold">{formatCurrency(transaction.amount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Network:</span>
                              <span className="font-medium">{transaction.network}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cashback:</span>
                              <span className="font-semibold text-green-600">+{formatCurrency(transaction.cashbackEarned)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium capitalize">{transaction.transactionType?.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Date */}
                        <div className="text-xs text-gray-500 pt-1 border-t border-gray-200">
                          {formatDate(transaction.timestamp)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Premium Report Tab */}
        <TabsContent value="premium" className="space-y-4 animate-fade-in">
          <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">Premium Master Report</h2>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Professional PDF with charts, Divine Mobile logo, and comprehensive analytics
                  </p>
                </div>

                {/* Feature Icons */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-600">Charts</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-pink-600" />
                    </div>
                    <span className="text-xs text-gray-600">Trends</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-gray-600">Premium</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGeneratePremiumReport} 
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-5 h-5 mr-2" />
                  Generate Premium Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Report Tab */}
        <TabsContent value="customer" className="space-y-4 animate-fade-in">
          <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">Customer Analytics Report</h2>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Comprehensive customer insights with charts and performance metrics
                  </p>
                </div>

                {/* Feature Icons */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600">Demographics</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-600">Growth</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-xs text-gray-600">Behavior</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateCustomerReport} 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Generate Customer Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTable;
