
import React from 'react';
import { CartItem } from '@/types/deals';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import CartHeader from '@/components/cart/CartHeader';
import ShoppingCartLayout from '@/components/cart/ShoppingCartLayout';
import ShoppingCartContent from '@/components/cart/ShoppingCartContent';

interface ShoppingCartProps {
  initialDeal?: CartItem;
  onClose: () => void;
}

const ShoppingCart = ({ initialDeal, onClose }: ShoppingCartProps) => {
  const { currentUser, isVendor } = useShoppingCart(initialDeal);

  return (
    <ShoppingCartLayout>
      <CartHeader 
        onClose={onClose} 
        currentUser={currentUser}
        isVendor={isVendor}
      />
      <ShoppingCartContent initialDeal={initialDeal} />
    </ShoppingCartLayout>
  );
};

export default ShoppingCart;
