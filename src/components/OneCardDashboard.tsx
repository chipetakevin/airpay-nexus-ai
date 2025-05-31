
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AirtimeDealsSystem from './AirtimeDealsSystem';

const OneCardDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('onecardUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const maskCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '**** **** **** ****';
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  if (!userData) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
          Please register first to access your OneCard rewards and smart deals
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Track your cashback rewards and discover the best airtime deals
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Smart Deals</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* OneCard Display */}
          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/20 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
            <CardContent className="p-4 sm:p-6 relative z-10">
              <div className="text-lg sm:text-xl font-bold mb-2 tracking-wider">
                {maskCardNumber(userData.cardNumber)}
              </div>
              <div className="text-base sm:text-lg mb-4">
                {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase()}
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">
                  R{userData.cashbackBalance?.toFixed(2) || '0.00'}
                </div>
                <div className="text-xs sm:text-sm opacity-80">Available Cashback</div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
                  R{userData.totalEarned?.toFixed(2) || '0.00'}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Total Earned</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
                  R{userData.totalSpent?.toFixed(2) || '0.00'}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Total Spent</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">2.5%</div>
                <div className="text-gray-600 text-sm sm:text-base">Cashback Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-800">
                🔐 <strong>Secure Rewards:</strong> Your OneCard rewards are securely maintained with enterprise-level encryption.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4 sm:space-y-6">
          <AirtimeDealsSystem />
        </TabsContent>

        <TabsContent value="history" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <p className="text-sm sm:text-base">
                  No transactions yet. Start purchasing airtime and data to earn rewards!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OneCardDashboard;
