
import { calculateProfitSharing } from '@/services/dealsService';
import { CartItem } from '@/types/deals';

export const calculateCartTotals = (cartItems: CartItem[], isVendor: boolean, purchaseMode: string) => {
  const networkCost = cartItems.reduce((sum, item) => sum + (item.networkPrice || 0), 0);
  const totalMarkup = cartItems.reduce((sum, item) => sum + (item.markupAmount || 0), 0);
  const customerPrice = cartItems.reduce((sum, item) => sum + item.discountedPrice, 0);
  
  // Calculate profit sharing based on purchase type and user type
  let profitSharing;
  
  if (isVendor) {
    profitSharing = calculateProfitSharing(totalMarkup, 'vendor', true);
  } else if (purchaseMode === 'self') {
    profitSharing = calculateProfitSharing(totalMarkup, 'self', false);
  } else {
    profitSharing = calculateProfitSharing(totalMarkup, 'third_party', false);
  }
  
  return { 
    networkCost, 
    customerPrice, 
    totalMarkup, 
    profitSharing,
    total: customerPrice 
  };
};
