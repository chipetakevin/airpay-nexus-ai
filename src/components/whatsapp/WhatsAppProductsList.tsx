
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: React.ReactNode;
  description: string;
  network?: string;
  popular?: boolean;
}

interface WhatsAppProductsListProps {
  products: Product[];
  activeCategory: string;
  onAddToCart: (product: Product) => void;
}

const WhatsAppProductsList: React.FC<WhatsAppProductsListProps> = ({ 
  products, 
  activeCategory, 
  onAddToCart 
}) => {
  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <div className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="border-2 border-gray-100 rounded-2xl hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  {product.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    {product.popular && (
                      <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                        ⭐ Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">R{product.price}</div>
                </div>
                <Button
                  onClick={() => onAddToCart(product)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WhatsAppProductsList;
