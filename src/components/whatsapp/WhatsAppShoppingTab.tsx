
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MobileOptimizedShoppingInterface from './MobileOptimizedShoppingInterface';

const WhatsAppShoppingTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Mobile WhatsApp Shopping Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Purchase airtime and data directly from your smartphone through WhatsApp - optimized for mobile users with or without airtime
        </p>
      </div>

      <div className="flex justify-center">
        <MobileOptimizedShoppingInterface />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Mobile-First Design</h3>
            <p className="text-sm text-gray-600">
              Fully optimized for smartphones with touch-friendly interface and WhatsApp integration
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold mb-2">WhatsApp Checkout</h3>
            <p className="text-sm text-gray-600">
              Complete purchases directly through WhatsApp with pre-filled order details
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Instant Delivery</h3>
            <p className="text-sm text-gray-600">
              Immediate airtime and data delivery after payment confirmation via WhatsApp
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mt-8">
        <div className="text-center space-y-4">
          <div className="text-3xl">🚀</div>
          <h3 className="text-xl font-bold text-green-800">Works With or Without Airtime</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div className="space-y-2">
              <h4 className="font-semibold">📞 With Airtime:</h4>
              <ul className="space-y-1 text-left">
                <li>• Use your existing airtime for WhatsApp</li>
                <li>• Instant purchase confirmation</li>
                <li>• Seamless mobile experience</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">📶 Without Airtime:</h4>
              <ul className="space-y-1 text-left">
                <li>• Use WiFi or free WhatsApp bundles</li>
                <li>• Emergency airtime purchase</li>
                <li>• Alternative payment methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppShoppingTab;
