
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BenefitsPreview = () => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-center text-green-800">
          🎁 What Your Network Gets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-semibold text-green-800">R10 Free Airtime</div>
            <div className="text-sm text-gray-600">New member bonus</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-green-800">10% Extra Cashback</div>
            <div className="text-sm text-gray-600">First purchase reward</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-green-800">Instant Access</div>
            <div className="text-sm text-gray-600">VIP deal notifications</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsPreview;
