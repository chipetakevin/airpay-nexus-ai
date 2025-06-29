
import React from 'react';

export interface CartItem {
  id: string;
  name: string;
  type: string;
  network: string;
  amount: string;
  price: number;
  quantity: number;
  icon: React.ReactNode;
}

interface CartManagerProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addMessage: (message: string, type: 'user' | 'bot') => void;
}

export const useCartManager = ({ cart, setCart, addMessage }: CartManagerProps) => {
  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    addMessage(`Added ${product.name} to cart! 🛒`, 'bot');
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    getCartCount
  };
};
