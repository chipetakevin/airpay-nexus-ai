
export interface Deal {
  id: string;
  network: string;
  amount: number;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  vendor_name: string;
  availability: string;
  demand_level: string;
  bonus?: string;
  expires_at?: string;
  verified: boolean;
  network_price?: number; // Hidden network cost
  markup_amount?: number; // Hidden markup profit pool
}

export interface CartItem {
  id: string;
  network: string;
  amount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  vendor: string;
  dealType: 'airtime';
  bonus?: string;
  networkPrice?: number; // Hidden network cost
  markupAmount?: number; // Hidden markup profit pool
}

export interface ProfitAllocation {
  customerCashback?: number;
  vendorProfit?: number;
  adminProfit?: number;
  registeredCustomerReward?: number;
  unregisteredRecipientReward?: number;
}
