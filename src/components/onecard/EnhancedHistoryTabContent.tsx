
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, Search, TrendingUp, Eye, FileText, Receipt } from 'lucide-react';
import { IntelligentSearchBar } from './search/IntelligentSearchBar';
import { SmartReportsPanel } from './search/SmartReportsPanel';
import { StatementActions } from './StatementActions';

interface Transaction {
  customer_id: string;
  vendor_id: string;
  deal_id: string;
  recipient_phone: string;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  original_price: number;
  discounted_price: number;
  network: string;
  transaction_type: string;
  cashback_earned: number;
  admin_fee: number;
  vendor_commission: number;
  status: string;
  timestamp: string;
}

interface SearchFilters {
  searchTerm: string;
  network: string;
  transactionType: string;
  status: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  amountRange: {
    min: number | null;
    max: number | null;
  };
}

export const EnhancedHistoryTabContent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem('userTransactions');
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions);
        // Sort by timestamp (newest first)
        const sortedTransactions = parsedTransactions.sort((a: Transaction, b: Transaction) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setTransactions(sortedTransactions);
        setFilteredTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error parsing transactions:', error);
      }
    }
  }, []);

  // Smart search and filtering function
  const handleSearch = useMemo(() => (filters: SearchFilters) => {
    let filtered = [...transactions];

    // Text search across multiple fields
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.network.toLowerCase().includes(searchTerm) ||
        transaction.recipient_name.toLowerCase().includes(searchTerm) ||
        transaction.transaction_type.toLowerCase().includes(searchTerm) ||
        transaction.status.toLowerCase().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm) ||
        generateTransactionId(transaction.timestamp).toLowerCase().includes(searchTerm)
      );
    }

    // Network filter
    if (filters.network) {
      filtered = filtered.filter(t => t.network === filters.network);
    }

    // Transaction type filter
    if (filters.transactionType) {
      filtered = filtered.filter(t => t.transaction_type === filters.transactionType);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange.from) {
      filtered = filtered.filter(t => new Date(t.timestamp) >= filters.dateRange.from!);
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(t => new Date(t.timestamp) <= filters.dateRange.to!);
    }

    // Amount range filter
    if (filters.amountRange.min !== null) {
      filtered = filtered.filter(t => t.amount >= filters.amountRange.min!);
    }
    if (filters.amountRange.max !== null) {
      filtered = filtered.filter(t => t.amount <= filters.amountRange.max!);
    }

    setFilteredTransactions(filtered);
  }, [transactions]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'self_purchase':
        return 'Self Purchase';
      case 'third_party_purchase':
        return 'Gift Purchase';
      case 'vendor_purchase':
        return 'Vendor Sale';
      default:
        return type;
    }
  };

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const tabs = [
    {
      value: 'history',
      label: 'Smart History',
      icon: '🔍',
      description: 'Search & Filter',
      color: 'blue'
    },
    {
      value: 'reports',
      label: 'AI Reports',
      icon: '📊',
      description: 'Analytics',
      color: 'green'
    },
    {
      value: 'receipts',
      label: 'Receipts',
      icon: '🧾',
      description: 'Generated',
      color: 'purple'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-h-[55px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  if (transactions.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <History className="w-5 h-5" />
              Smart Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">
                No transactions yet. Start purchasing airtime and data to see your intelligent history!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
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

        {/* Smart History Tab */}
        <TabsContent value="history" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Search className="w-5 h-5" />
                Intelligent Transaction Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IntelligentSearchBar 
                onSearch={handleSearch}
                totalTransactions={transactions.length}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5" />
                Search Results ({filteredTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {filteredTransactions.map((transaction, index) => (
                  <Card key={index} className="bg-gray-50 border-l-4 border-l-blue-500">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {generateTransactionId(transaction.timestamp)}
                            </span>
                            <Badge className={getStatusColor(transaction.status)} variant="secondary">
                              {transaction.status}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getTransactionTypeLabel(transaction.transaction_type)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Network:</span>
                              <span className="font-medium">{transaction.network}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">R{transaction.amount.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Recipient:</span>
                              <span className="font-medium">{transaction.recipient_name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cashback:</span>
                              <span className="font-medium text-green-600">
                                R{transaction.cashback_earned.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            {formatDate(transaction.timestamp)}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            <StatementActions transaction={transaction} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Reports Tab */}
        <TabsContent value="reports" className="space-y-4 animate-fade-in">
          <SmartReportsPanel transactions={filteredTransactions} />
        </TabsContent>

        {/* Receipts Tab */}
        <TabsContent value="receipts" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-purple-600" />
                Generated Receipts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Receipt Management</h3>
                <p className="text-sm leading-relaxed max-w-md mx-auto">
                  All your transaction receipts are automatically generated and sent via WhatsApp and Email. 
                  Check your messages for detailed payment confirmations with 7-character session IDs.
                </p>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">📱</span>
                    <span className="text-2xl">📧</span>
                  </div>
                  <p className="text-sm text-purple-700 font-medium">
                    Receipts delivered automatically via WhatsApp & Email
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedHistoryTabContent;
