
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: string;
  description: string;
  features: string[];
  network?: string;
  validity?: string;
  popular?: boolean;
  discount?: number;
}

interface MobileProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickCheckout: (product: Product) => void;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickCheckout 
}) => (
  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-green-200 relative overflow-hidden">
    <CardContent className="p-4">
      {/* Popular badge positioned at top left, not overlapping price */}
      {product.popular && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
            <span className="text-yellow-300">🔥</span>
            Popular
          </Badge>
        </div>
      )}
      
      {/* Discount badge positioned at top right if no popular badge */}
      {product.discount && !product.popular && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            {product.discount}% OFF
          </Badge>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4 mt-8">
        <div className="text-4xl">{product.icon}</div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            {product.discount ? (
              <>
                <span className="text-sm text-gray-400 line-through">R{(product.price * 1.1).toFixed(0)}</span>
                <span className="text-xl font-bold text-green-600">R{product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">R{product.price}</span>
            )}
          </div>
          <div className="flex gap-1 mt-1">
            {product.network && (
              <Badge variant="outline" className="text-xs">{product.network}</Badge>
            )}
            {product.validity && (
              <Badge variant="outline" className="text-xs">{product.validity}</Badge>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
      
      <div className="space-y-2 mb-4">
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="space-y-2">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11 text-base font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        
        <Button 
          onClick={() => onQuickCheckout(product)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-11 text-base font-semibold"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Quick Checkout
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default MobileProductCard;
