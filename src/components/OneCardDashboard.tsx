
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRight } from 'lucide-react';
import AirtimeDealsSystem from './AirtimeDealsSystem';

const OneCardDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('deals');

  useEffect(() => {
    const storedUser = localStorage.getItem('onecardUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

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

  const navigateToRewards = () => {
    setActiveTab('deals');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Smart Deals</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* Enhanced OneCard Display */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Professional Card Design */}
            <div className="relative w-full h-64 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl overflow-hidden">
              {/* Background Design Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-black">
                {/* Top Section - Logo and Card Type */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-yellow-400 font-bold text-lg">A</span>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-black">AirPay</div>
                      <div className="text-sm text-black/80 font-medium">Powered by OneCard</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 rounded-full px-3 py-1">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm font-bold text-black">CARD</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="text-center my-4">
                  <div className="text-2xl font-mono font-bold tracking-[0.3em] mb-2 text-black">
                    {userData.cardNumber ? userData.cardNumber.replace(/(.{4})/g, '$1 ').trim() : 'OCRA 50TG WG'}
                  </div>
                </div>

                {/* Bottom Section - Cardholder Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-black/70 mb-1 font-medium">CARD HOLDER</div>
                    <div className="text-lg font-bold tracking-wide text-black">
                      {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase() || 'KEVIN CHIPETA'}
                    </div>
                    <div className="text-xs text-black/70 mt-1 font-medium">
                      Member Since 2025
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-black/70 mb-1 font-medium">VALID THRU</div>
                    <div className="text-lg font-bold text-black">
                      06/28
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards Tab at Bottom */}
            <div className="mt-6">
              <Button
                onClick={navigateToRewards}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <Gift className="w-6 h-6" />
                  <span className="text-lg">Access Smart Rewards</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-4 text-center border border-yellow-300">
                <div className="text-xl font-bold text-gray-800 mb-1">
                  R{userData.cashbackBalance?.toFixed(2) || '0.00'}
                </div>
                <div className="text-sm text-gray-600">Cashback Balance</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-4 text-center border border-yellow-300">
                <div className="text-xl font-bold text-gray-800 mb-1">2.5%</div>
                <div className="text-sm text-gray-600">Cashback Rate</div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200 mt-6">
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
