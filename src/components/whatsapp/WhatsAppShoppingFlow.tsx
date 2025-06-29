
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CreditCard, Wifi, Gift, Globe, 
  CheckCircle, Star, Zap, ShoppingCart,
  Plus, Minus
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: 'airtime' | 'data' | 'bundle';
  network: string;
  amount: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  popular?: boolean;
  icon: React.ReactNode;
}

interface ShoppingFlowProps {
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
  cartCount: number;
}

const WhatsAppShoppingFlow: React.FC<ShoppingFlowProps> = ({
  onAddToCart,
  onViewCart,
  cartCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('airtime');

  const products: Product[] = [
    // Airtime Products
    {
      id: 'air-10',
      name: 'R10 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: 'R10',
      price: 10,
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: 'air-20',
      name: 'R20 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: 'R20',
      price: 20,
      popular: true,
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: 'air-50',
      name: 'R50 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: 'R50',
      price: 50,
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: 'air-100',
      name: 'R100 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: 'R100',
      price: 100,
      icon: <CreditCard className="w-4 h-4" />
    },
    // Data Products
    {
      id: 'data-1gb',
      name: '1GB Data',
      type: 'data',
      network: 'Vodacom',
      amount: '1GB',
      price: 29,
      originalPrice: 35,
      discount: 17,
      popular: true,
      icon: <Wifi className="w-4 h-4" />
    },
    {
      id: 'data-2gb',
      name: '2GB Data',
      type: 'data',
      network: 'MTN',
      amount: '2GB',
      price: 49,
      originalPrice: 59,
      discount: 17,
      icon: <Wifi className="w-4 h-4" />
    },
    {
      id: 'data-5gb',
      name: '5GB Data',
      type: 'data',
      network: 'Cell C',
      amount: '5GB',
      price: 99,
      originalPrice: 120,
      discount: 18,
      icon: <Wifi className="w-4 h-4" />
    },
    {
      id: 'data-10gb',
      name: '10GB Data',
      type: 'data',
      network: 'Telkom',
      amount: '10GB',
      price: 149,
      originalPrice: 180,
      discount: 17,
      icon: <Wifi className="w-4 h-4" />
    }
  ];

  const categories = [
    {
      id: 'airtime',
      name: 'Airtime',
      icon: <CreditCard className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      id: 'data',
      name: 'Data',
      icon: <Wifi className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      id: 'bundles',
      name: 'Bundles',
      icon: <Gift className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      id: 'international',
      name: 'International',
      icon: <Globe className="w-4 h-4" />,
      color: 'bg-orange-500'
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'airtime' ? product.type === 'airtime' :
    selectedCategory === 'data' ? product.type === 'data' :
    selectedCategory === 'bundles' ? product.type === 'bundle' :
    false
  );

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`h-16 flex flex-col items-center justify-center text-xs ${
              selectedCategory === category.id ? category.color : ''
            }`}
          >
            {category.icon}
            <span className="mt-1">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-2">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {product.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{product.name}</span>
                      {product.popular && (
                        <Badge className="bg-orange-500 text-white text-xs px-1 py-0">
                          <Star className="w-2 h-2 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{product.network} • {product.amount}</div>
                    {product.discount && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="line-through text-gray-400">R{product.originalPrice}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {product.discount}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">R{product.price}</div>
                  <Button
                    size="sm"
                    onClick={() => onAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700 h-8 px-3 text-xs mt-1"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={onViewCart}
            className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14 shadow-lg relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {cartCount}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppShoppingFlow;
