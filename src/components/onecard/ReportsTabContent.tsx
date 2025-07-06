
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Star,
  ArrowRight,
  Wallet,
  Users,
  Building,
  Shield,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateEnhancedMasterReport } from './utils/enhancedPdfGenerator';

interface UnifiedProfile {
  userType: 'customer' | 'vendor' | 'admin';
  cardNumber: string;
  balance: number;
  totalEarned: number;
  firstName: string;
  lastName: string;
}

const ReportsTabContent = () => {
  const [unifiedProfiles, setUnifiedProfiles] = useState<UnifiedProfile[]>([]);
  const [totalConsolidatedBalance, setTotalConsolidatedBalance] = useState(0);
  const [totalLifetimeEarnings, setTotalLifetimeEarnings] = useState(0);
  const [unifiedAccountNumber, setUnifiedAccountNumber] = useState('');
  const [isUnifiedUser, setIsUnifiedUser] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUnifiedProfileData();
  }, []);

  const loadUnifiedProfileData = () => {
    const credentials = localStorage.getItem('userCredentials');
    
    if (!credentials) return;

    try {
      const userCreds = JSON.parse(credentials);
      const isUnified = userCreds.password === 'Malawi@1976';
      setIsUnifiedUser(isUnified);

      if (!isUnified) {
        toast({
          title: "Access Restricted",
          description: "Unified Reports are only available for unified profile users.",
          variant: "destructive"
        });
        return;
      }

      const profiles: UnifiedProfile[] = [];
      let consolidatedBalance = 0;
      let lifetimeEarnings = 0;

      // Load Customer Profile
      const customerData = localStorage.getItem('onecardUser');
      if (customerData) {
        try {
          const customer = JSON.parse(customerData);
          const profile: UnifiedProfile = {
            userType: 'customer',
            cardNumber: customer.cardNumber || 'OC00000001',
            balance: customer.cashbackBalance || customer.balance || 0,
            totalEarned: customer.totalEarned || 0,
            firstName: customer.firstName || 'Customer',
            lastName: customer.lastName || 'User'
          };
          profiles.push(profile);
          consolidatedBalance += profile.balance;
          lifetimeEarnings += profile.totalEarned;
        } catch (error) {
          console.error('Error parsing customer data:', error);
        }
      }

      // Load Vendor Profile
      const vendorData = localStorage.getItem('onecardVendor');
      if (vendorData) {
        try {
          const vendor = JSON.parse(vendorData);
          const profile: UnifiedProfile = {
            userType: 'vendor',
            cardNumber: vendor.vendorId || 'VN00000001',
            balance: vendor.onecardBalance || vendor.balance || 0,
            totalEarned: vendor.totalEarned || 0,
            firstName: vendor.firstName || 'Vendor',
            lastName: vendor.lastName || 'Business'
          };
          profiles.push(profile);
          consolidatedBalance += profile.balance;
          lifetimeEarnings += profile.totalEarned;
        } catch (error) {
          console.error('Error parsing vendor data:', error);
        }
      }

      // Load Admin Profile
      const adminData = localStorage.getItem('onecardAdmin');
      if (adminData) {
        try {
          const admin = JSON.parse(adminData);
          const profile: UnifiedProfile = {
            userType: 'admin',
            cardNumber: admin.adminId || 'AD00000001',
            balance: admin.onecardBalance || admin.balance || 0,
            totalEarned: admin.totalEarned || 0,
            firstName: admin.firstName || 'Admin',
            lastName: admin.lastName || 'User'
          };
          profiles.push(profile);
          consolidatedBalance += profile.balance;
          lifetimeEarnings += profile.totalEarned;
        } catch (error) {
          console.error('Error parsing admin data:', error);
        }
      }

      setUnifiedProfiles(profiles);
      setTotalConsolidatedBalance(consolidatedBalance);
      setTotalLifetimeEarnings(lifetimeEarnings);
      
      // Generate unified account number based on user credentials
      const unifiedAccount = generateUnifiedAccountNumber(userCreds.email);
      setUnifiedAccountNumber(unifiedAccount);

    } catch (error) {
      console.error('Error loading unified profile data:', error);
    }
  };

  const generateUnifiedAccountNumber = (email: string): string => {
    // Generate a unique 12-digit unified account number
    const emailHash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const baseNumber = Math.abs(emailHash).toString().padStart(8, '0').slice(0, 8);
    return `GOLD${baseNumber}`;
  };

  const handleGenerateReport = () => {
    try {
      // Mock data for demonstration - replace with actual data
      const mockCustomers = unifiedProfiles.map((profile, index) => ({
        id: `customer_${index}`,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: `${profile.firstName.toLowerCase()}@example.com`,
        phone: '+27123456789',
        cardNumber: profile.cardNumber,
        registrationDate: new Date().toISOString(),
        networkProvider: 'Vodacom',
        ricaVerified: true,
        onecardBalance: profile.balance,
        totalCashback: profile.totalEarned,
        isActive: true // Added missing isActive property
      }));

      const mockTransactions = unifiedProfiles.flatMap((profile, profileIndex) => 
        Array.from({ length: 5 }, (_, txIndex) => ({
          id: `tx_${profileIndex}_${txIndex}`,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: Math.floor(Math.random() * 500) + 50,
          network: ['Vodacom', 'MTN', 'Cell C'][Math.floor(Math.random() * 3)],
          status: 'completed',
          recipient_name: profile.firstName,
          cashback_earned: Math.floor(Math.random() * 25) + 5
        }))
      );

      generateEnhancedMasterReport(mockCustomers, mockTransactions, toast);

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getProfileIcon = (userType: string) => {
    switch (userType) {
      case 'customer': return <Users className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'vendor': return <Building className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'admin': return <Shield className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <Star className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getProfileGradient = (userType: string) => {
    switch (userType) {
      case 'customer': return 'from-green-500 to-emerald-600';
      case 'vendor': return 'from-blue-500 to-cyan-600';
      case 'admin': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getProfileBadgeColor = (userType: string) => {
    switch (userType) {
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      case 'vendor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRedeemToBank = () => {
    if (totalConsolidatedBalance <= 0) {
      toast({
        title: "Insufficient Balance",
        description: "You need a positive balance to redeem to your bank account.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Redemption Initiated",
      description: `R${totalConsolidatedBalance.toFixed(2)} redemption to registered bank account initiated. Processing time: 1-3 business days.`,
    });
  };

  if (!isUnifiedUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <Card className="max-w-md w-full text-center shadow-xl border-2 border-dashed border-gray-200">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Unified Access Required</h3>
            <p className="text-gray-600 leading-relaxed">
              Unified Reports are exclusively available for users with unified profile access. 
              Please contact your administrator for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-1 sm:p-0">
      {/* Premium Header Badge */}
      <div className="flex justify-center mb-4">
        <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold px-4 py-2 text-sm border-0 shadow-lg">
          <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-4 h-4 mr-2" />
          OneCard Gold Premium
        </Badge>
      </div>

      {/* OneCard Gold Card - Updated with black text */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-black shadow-2xl border-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardContent className="p-4 sm:p-6 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-black">OneCard Gold</h2>
                <p className="text-black/80 text-xs sm:text-sm">Unified Rewards Account</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
              <Badge className="bg-black/20 text-black border-black/30 text-xs">
                Premium
              </Badge>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-black/70 text-xs sm:text-sm mb-1">Unified Account Number</p>
              <p className="text-xl sm:text-2xl font-mono font-bold tracking-wider break-all text-black">{unifiedAccountNumber}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-black/70" />
                  <p className="text-black/70 text-xs sm:text-sm">Available Balance</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-black">R{totalConsolidatedBalance.toFixed(2)}</p>
              </div>
              <div className="bg-black/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-black/70" />
                  <p className="text-black/70 text-xs sm:text-sm">Lifetime Earnings</p>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-black">R{totalLifetimeEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Button */}
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Generate Unified Report</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Download comprehensive report with analytics and visualizations</p>
            </div>
            <Button 
              onClick={handleGenerateReport}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Breakdown - Mobile Optimized */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span>Profile Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {unifiedProfiles.map((profile, index) => (
            <div key={index} className="group hover:shadow-md transition-all duration-300 border border-gray-100 rounded-xl p-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${getProfileGradient(profile.userType)} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {getProfileIcon(profile.userType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {profile.firstName} {profile.lastName}
                      </h4>
                      <Badge className={`text-xs px-2 py-1 ${getProfileBadgeColor(profile.userType)}`}>
                        {profile.userType}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">****{profile.cardNumber.slice(-4)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg sm:text-xl text-gray-900">R{profile.balance.toFixed(2)}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Earned: R{profile.totalEarned.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bank Redemption - Enhanced Mobile Design */}
      <Card className="shadow-lg border-0 bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Bank Redemption</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Redemption Information</h4>
                <p className="text-blue-700 text-xs sm:text-sm leading-relaxed mb-3">
                  Your consolidated cashback balance will be transferred to the bank account 
                  registered during your initial registration.
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <CreditCard className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Processing Time: 1-3 Business Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Total Available for Redemption</h4>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                R{totalConsolidatedBalance.toFixed(2)}
              </p>
            </div>
            <Button 
              onClick={handleRedeemToBank}
              disabled={totalConsolidatedBalance <= 0}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Redeem to Bank
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Architecture Note - Enhanced */}
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-blue-900 text-base sm:text-lg">Cloud AI to Edge AI Architecture</h4>
          </div>
          <p className="text-blue-700 text-xs sm:text-sm leading-relaxed pl-11">
            This unified rewards system leverages intelligent data consolidation from multiple profile sources, 
            providing real-time cashback analytics and seamless bank redemption through a distributed AI architecture 
            that processes data both in the cloud and at the edge for optimal performance and security.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTabContent;
