
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
}

const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold text-green-600">R{item.price * item.quantity}</p>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between items-center">
          <p className="font-bold">Total Amount:</p>
          <p className="text-xl font-bold text-green-600">R{total}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
