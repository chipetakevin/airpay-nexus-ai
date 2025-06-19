
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { loadAdminData } from './utils/adminDataLoader';
import { CustomerTable } from './admin/CustomerTable';
import { TransactionTable } from './admin/TransactionTable';
import { ReportsSection } from './admin/ReportsSection';
import EnhancedAdminDashboard from './admin/EnhancedAdminDashboard';
import { 
  Users, 
  CreditCard, 
  TrendingUp,
  Activity,
  BarChart3,
  FileText,
  UserCheck,
  Database
} from 'lucide-react';

const AdminOneCardDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAdminData();
        setCustomers(data.customers);
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabConfig = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'blue',
      description: 'Dashboard'
    },
    {
      value: 'customers',
      label: 'Directory',
      icon: <Users className="w-4 h-4" />,
      color: 'green',
      description: 'Customer'
    },
    {
      value: 'transactions',
      label: 'History',
      icon: <Activity className="w-4 h-4" />,
      color: 'purple',
      description: 'Transaction'
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: <FileText className="w-4 h-4" />,
      color: 'orange',
      description: 'Analytics'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
      orange: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-orange-400 bg-orange-50 border-orange-200 hover:border-orange-300 hover:bg-orange-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Enhanced Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full">
            <div className="grid grid-cols-4 gap-2 w-full">
              {tabConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  {tab.icon}
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="overview" className="mt-0 space-y-6">
          <EnhancedAdminDashboard customers={customers} transactions={transactions} />
        </TabsContent>

        <TabsContent value="customers" className="mt-0">
          <CustomerTable customers={customers} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <TransactionTable transactions={transactions} />
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <ReportsSection customers={customers} transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminOneCardDashboard;
