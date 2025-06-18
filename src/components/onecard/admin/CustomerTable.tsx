
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Eye, 
  FileText, 
  Download, 
  Users, 
  TrendingUp, 
  PieChart, 
  Activity,
  BarChart3
} from 'lucide-react';
import { Customer } from '../types/admin';
import { formatCurrency, formatDate } from '../utils/adminUtils';

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
  const [activeTab, setActiveTab] = useState('directory');

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleGenerateCustomerReport = () => {
    // Generate comprehensive customer analytics report
    console.log('Generating customer analytics report...');
    onGenerateMasterReport(); // Reusing the master report for now, can be customized later
  };

  const tabs = [
    {
      value: 'directory',
      label: 'Customer Directory',
      icon: '👥',
      description: 'Browse',
      color: 'blue'
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
    let baseClass = "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-h-[55px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Compact Tab Navigation */}
        <div className="w-full mb-4">
          <TabsList className="w-full max-w-full">
            <div className="grid grid-cols-2 gap-1 w-full">
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

        {/* Customer Directory Tab - Mobile-First Vertical Layout */}
        <TabsContent value="directory" className="space-y-3 animate-fade-in">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Customer Directory ({filteredCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search customers by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Mobile-First Vertical Card Layout */}
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <Card key={customer.id} className="bg-gray-50 border-l-4 border-l-blue-500">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        {/* Header with Customer Name and Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 truncate">
                              {customer.firstName} {customer.lastName}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Joined {formatDate(customer.registrationDate)}
                            </p>
                          </div>
                          <Badge variant={customer.ricaVerified ? "default" : "secondary"} className="text-xs">
                            {customer.ricaVerified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                        
                        {/* Customer Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium truncate text-right">{customer.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{customer.phone}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Balance:</span>
                              <span className="font-semibold text-green-600">{formatCurrency(customer.onecardBalance)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Network:</span>
                              <span className="font-medium">{customer.networkProvider || 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCustomerSelect(customer)}
                            className="text-xs px-2 py-1 h-6"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onGenerateReport(customer)}
                            className="text-xs px-2 py-1 h-6"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 animate-fade-in">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
              </div>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Generate comprehensive customer reports with modern visualizations
              </p>
            </div>

            {/* Enhanced Customer Report - Main Feature */}
            <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
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
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs text-gray-600">Behavior</span>
                    </div>
                  </div>

                  {/* Download Button */}
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

            {/* Report Features Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Customer Analytics Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Report Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Analytics Features</h4>
                    <div className="space-y-2">
                      {[
                        { text: "Customer demographics breakdown", color: "bg-green-500" },
                        { text: "Network provider distribution", color: "bg-blue-500" },
                        { text: "Balance and spending patterns", color: "bg-purple-500" },
                        { text: "Registration and growth trends", color: "bg-orange-500" }
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
                        { text: "Executive summary format", color: "bg-red-500" },
                        { text: "Visual charts and graphs", color: "bg-yellow-500" },
                        { text: "Professional presentation ready", color: "bg-indigo-500" },
                        { text: "Actionable insights included", color: "bg-pink-500" }
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

export default CustomerTable;
