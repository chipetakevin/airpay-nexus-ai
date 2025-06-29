
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  onecardBalance: number;
  totalCashback: number;
  registrationDate: string;
  networkProvider: string;
  ricaVerified: boolean;
  isActive: boolean;
}

export interface Transaction {
  id?: string;
  customerId?: string;
  customerName?: string;
  vendorId?: string;
  dealId?: string;
  recipientPhone?: string;
  recipientName?: string;
  recipientRelationship?: string | null;
  amount: number;
  originalPrice?: number;
  discountedPrice?: number;
  network?: string;
  transactionType?: string;
  cashbackEarned?: number;
  adminFee?: number;
  vendorCommission?: number;
  status?: string;
  timestamp: string;
  
  // Legacy fields for backward compatibility
  customer_id?: string;
  vendor_id?: string;
  deal_id?: string;
  recipient_phone?: string;
  recipient_name?: string;
  recipient_relationship?: string | null;
  original_price?: number;
  discounted_price?: number;
  transaction_type?: string;
  cashback_earned?: number;
  admin_fee?: number;
  vendor_commission?: number;
}

export interface AdminStats {
  totalCustomers: number;
  totalTransactions: number;
  totalRevenue: number;
  totalCashback: number;
  activeCards: number;
  platformBalance: number;
}

export interface NetworkStats {
  [network: string]: {
    customers: number;
    transactions: number;
    revenue: number;
  };
}
