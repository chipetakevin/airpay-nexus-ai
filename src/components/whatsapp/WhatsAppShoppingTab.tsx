
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WhatsAppShoppingInterface from './WhatsAppShoppingInterface';

const WhatsAppShoppingTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          WhatsApp Shopping Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Modern mobile-first shopping with seamless WhatsApp checkout integration
        </p>
      </div>

      <div className="flex justify-center">
        <WhatsAppShoppingInterface />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-semibold mb-2">Smart Shopping Cart</h3>
            <p className="text-sm text-gray-600">
              Add multiple items, adjust quantities, and checkout seamlessly via WhatsApp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Mobile-First Design</h3>
            <p className="text-sm text-gray-600">
              Optimized for mobile devices with intuitive touch-friendly interface
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Instant Checkout</h3>
            <p className="text-sm text-gray-600">
              Direct WhatsApp integration for immediate order processing and payment
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsAppShoppingTab;
