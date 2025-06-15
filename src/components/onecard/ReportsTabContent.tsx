
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
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getProfileIcon = (userType: string) => {
    switch (userType) {
      case 'customer': return <Users className="w-5 h-5" />;
      case 'vendor': return <Building className="w-5 h-5" />;
      case 'admin': return <Shield className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getProfileColor = (userType: string) => {
    switch (userType) {
      case 'customer': return 'bg-green-500';
      case 'vendor': return 'bg-blue-500';
      case 'admin': return 'bg-red-500';
      default: return 'bg-gray-500';
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
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center">
          <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Unified Access Required</h3>
          <p className="text-gray-500">Reports are only available for unified profile users.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* OneCard Gold Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-200" />
              <div>
                <h2 className="text-xl font-bold">OneCard Gold</h2>
                <p className="text-yellow-200 text-sm">Unified Rewards Account</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              Premium
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-yellow-200 text-sm">Unified Account Number</p>
              <p className="text-2xl font-mono font-bold tracking-wider">{unifiedAccountNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-yellow-200 text-sm">Available Balance</p>
                <p className="text-2xl font-bold">R{totalConsolidatedBalance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-yellow-200 text-sm">Lifetime Earnings</p>
                <p className="text-xl font-semibold">R{totalLifetimeEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Unified Profile Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {unifiedProfiles.map((profile, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${getProfileColor(profile.userType)} flex items-center justify-center text-white`}>
                    {getProfileIcon(profile.userType)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{profile.firstName} {profile.lastName}</h4>
                    <p className="text-sm text-gray-500 capitalize">{profile.userType} Profile</p>
                    <p className="text-xs text-gray-400">Card: ****{profile.cardNumber.slice(-4)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">R{profile.balance.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Earned: R{profile.totalEarned.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Bank Redemption
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Redemption Information</h4>
              <p className="text-blue-700 text-sm mb-3">
                Your consolidated cashback balance will be transferred to the bank account registered during your initial registration.
              </p>
              <div className="flex items-center gap-2 text-blue-600">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Processing Time: 1-3 Business Days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Total Available for Redemption</h4>
                <p className="text-2xl font-bold text-green-600">R{totalConsolidatedBalance.toFixed(2)}</p>
              </div>
              <Button 
                onClick={handleRedeemToBank}
                disabled={totalConsolidatedBalance <= 0}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Redeem to Bank
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Architecture Note */}
      <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Cloud AI to Edge AI Architecture</h4>
          </div>
          <p className="text-blue-700 text-sm">
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
