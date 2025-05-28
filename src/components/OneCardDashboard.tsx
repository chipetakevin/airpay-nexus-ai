
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600 mb-6">Please register first to access your OneCard rewards</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600">Track your cashback rewards and manage your digital gold card</p>
      </div>

      {/* OneCard Display */}
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
        <CardContent className="p-6 relative z-10">
          <div className="text-xl font-bold mb-2 tracking-wider">
            {maskCardNumber(userData.cardNumber)}
          </div>
          <div className="text-lg mb-4">
            {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase()}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              R{userData.cashbackBalance?.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm opacity-80">Available Cashback</div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              R{userData.totalEarned?.toFixed(2) || '0.00'}
            </div>
            <div className="text-gray-600">Total Earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              R{userData.totalSpent?.toFixed(2) || '0.00'}
            </div>
            <div className="text-gray-600">Total Spent</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">2.5%</div>
            <div className="text-gray-600">Cashback Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🔐 <strong>Secure Rewards:</strong> Your OneCard rewards are securely maintained with enterprise-level encryption.
          </p>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No transactions yet. Start purchasing airtime and data to earn rewards!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneCardDashboard;
