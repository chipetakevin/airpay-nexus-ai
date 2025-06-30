
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
  deal_type?: string;
  bonus?: string;
  expires_at?: string;
  verified: boolean;
  network_price?: number;
  markup_amount?: number;
}

export interface CartItem {
  id: string;
  network: string;
  amount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  vendor: string;
  dealType: string;
  bonus?: string;
  networkPrice?: number;
  markupAmount?: number;
}

export interface ProfitAllocation {
  customerCashback?: number;
  vendorProfit?: number;
  adminProfit?: number;
  registeredCustomerReward?: number;
  unregisteredRecipientReward?: number;
}
