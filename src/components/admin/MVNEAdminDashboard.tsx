import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Shield, 
  Building,
  Smartphone,
  Zap
} from 'lucide-react';
import ComprehensiveAdminDashboard from './ComprehensiveAdminDashboard';

interface DashboardStats {
  totalCustomers: number;
  verifiedCustomers: number;
  pendingRICA: number;
  totalVendors: number;
  verifiedVendors: number;
  activeSIMs: number;
  totalTransactions: number;
  complianceScore: number;
}

const MVNEAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalCustomers: 0,
    verifiedCustomers: 0,
    pendingRICA: 0,
    totalVendors: 0,
    verifiedVendors: 0,
    activeSIMs: 0,
    totalTransactions: 0,
    complianceScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load dashboard statistics
      const [customersResult, vendorsResult, simsResult, transactionsResult] = await Promise.all([
        supabase.from('customer_profiles').select('*'),
        supabase.from('vendor_profiles').select('*'),
        supabase.from('sim_cards').select('*'),
        supabase.from('mvne_transactions').select('*')
      ]);

      if (customersResult.data) {
        const verifiedCount = customersResult.data.filter(c => c.rica_status === 'verified').length;
        const pendingCount = customersResult.data.filter(c => c.rica_status === 'pending').length;
        
        setDashboardStats(prev => ({
          ...prev,
          totalCustomers: customersResult.data.length,
          verifiedCustomers: verifiedCount,
          pendingRICA: pendingCount
        }));
      }

      if (vendorsResult.data) {
        const verifiedVendorsCount = vendorsResult.data.filter(v => v.verification_status === 'verified').length;
        
        setDashboardStats(prev => ({
          ...prev,
          totalVendors: vendorsResult.data.length,
          verifiedVendors: verifiedVendorsCount
        }));
      }

      if (simsResult.data) {
        const activeCount = simsResult.data.filter(s => s.sim_status === 'active').length;
        setDashboardStats(prev => ({
          ...prev,
          activeSIMs: activeCount
        }));
      }

      if (transactionsResult.data) {
        setDashboardStats(prev => ({
          ...prev,
          totalTransactions: transactionsResult.data.length
        }));
      }

      // Calculate compliance score
      const totalEntities = (customersResult.data?.length || 0) + (vendorsResult.data?.length || 0);
      const compliantEntities = (customersResult.data?.filter(c => c.rica_status === 'verified').length || 0) + 
                              (vendorsResult.data?.filter(v => v.verification_status === 'verified').length || 0);
      const complianceScore = totalEntities > 0 ? Math.round((compliantEntities / totalEntities) * 100) : 0;
      
      setDashboardStats(prev => ({
        ...prev,
        complianceScore
      }));

    } catch (error) {
      toast({
        title: "Error loading dashboard data",
        description: "Failed to load admin dashboard statistics",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">MVNE Admin Dashboard</h1>
              <p className="text-gray-600">Divine Mobile RICA & Compliance Management</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800">
                Admin Access
              </Badge>
              <Badge className={`${dashboardStats.complianceScore >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {dashboardStats.complianceScore}% Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Customers</p>
                  <p className="text-3xl font-bold text-blue-900">{dashboardStats.totalCustomers}</p>
                  <p className="text-xs text-blue-600">{dashboardStats.verifiedCustomers} RICA verified</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Active Vendors</p>
                  <p className="text-3xl font-bold text-green-900">{dashboardStats.totalVendors}</p>
                  <p className="text-xs text-green-600">{dashboardStats.verifiedVendors} verified</p>
                </div>
                <Building className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Active SIMs</p>
                  <p className="text-3xl font-bold text-purple-900">{dashboardStats.activeSIMs}</p>
                  <p className="text-xs text-purple-600">MVNE managed</p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Compliance Score</p>
                  <p className="text-3xl font-bold text-orange-900">{dashboardStats.complianceScore}%</p>
                  <p className="text-xs text-orange-600">RICA & POPIA</p>
                </div>
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Comprehensive Admin Dashboard */}
        <ComprehensiveAdminDashboard />
      </div>
    </div>
  );
};

export default MVNEAdminDashboard;