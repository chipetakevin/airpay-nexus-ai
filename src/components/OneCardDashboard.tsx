
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

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '0125 8456 355 258';
    // Generate a formatted card number based on the stored card number
    const masked = cardNumber.replace(/(.{4})/g, '$1 ').trim();
    return masked;
  };

  const getValidThru = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() + 3; // 3 years from now
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${month}/${String(year).slice(-2)}`;
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
          {/* Professional OneCard Display */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Front of Card */}
            <div className="relative w-full h-56 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl overflow-hidden">
              {/* Background Design Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-black">
                {/* Top Section - Logo and Card Type */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-sm">A</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-black">AirPay</div>
                      <div className="text-xs text-black/80">Powered by OneCard</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm font-bold text-black">CARD</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="text-center">
                  <div className="text-xl font-mono font-bold tracking-wider mb-1">
                    {formatCardNumber(userData.cardNumber)}
                  </div>
                </div>

                {/* Bottom Section - Cardholder Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-black/70 mb-1">CARD HOLDER</div>
                    <div className="text-sm font-bold tracking-wide">
                      {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase()}
                    </div>
                    <div className="text-xs text-black/70 mt-1">
                      Member Since {new Date().getFullYear()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-black/70 mb-1">VALID THRU</div>
                    <div className="text-sm font-bold">{getValidThru()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cashback Display Card */}
            <div className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">
                R{userData.cashbackBalance?.toFixed(2) || '0.00'}
              </div>
              <div className="text-sm opacity-80">Available Cashback</div>
            </div>
          </div>

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
                🔐 <strong>Secure Rewards:</strong> Your AirPay OneCard rewards are securely maintained with enterprise-level encryption.
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
