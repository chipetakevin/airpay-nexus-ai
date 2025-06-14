
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRight } from 'lucide-react';
import AirtimeDealsSystem from './AirtimeDealsSystem';

const OneCardDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleAccessRewards = () => {
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
            {/* Gold OneCard Image */}
            <div className="relative w-full">
              <img 
                src="/lovable-uploads/ba334c5a-5d5a-4c29-a99b-3961e7a7f11a.png" 
                alt="AirPay OneCard Gold"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Rewards Tab at Bottom */}
            <div className="mt-6">
              <Button
                onClick={handleAccessRewards}
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
