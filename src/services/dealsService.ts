
import { supabase } from '@/integrations/supabase/client';
import { Deal } from '@/types/deals';

// Markup configuration - 10% markup on all network deals
const MARKUP_PERCENTAGE = 10;

// Profit allocation percentages
const PROFIT_ALLOCATION = {
  vendor_purchase: {
    vendor: 75,
    admin: 12.5,
    customer_cashback: 12.5
  },
  customer_self_purchase: {
    customer: 50,
    admin: 25,
    vendor: 25
  },
  customer_third_party_purchase: {
    registered_customer: 50,
    unregistered_recipient: 50,
    admin: 0,
    vendor: 0
  }
};

const calculateMarkupPrice = (networkPrice: number): number => {
  return networkPrice * (1 + MARKUP_PERCENTAGE / 100);
};

const calculateProfitSharing = (markupAmount: number, purchaseType: string, isVendor: boolean = false) => {
  if (isVendor) {
    return {
      vendorProfit: markupAmount * (PROFIT_ALLOCATION.vendor_purchase.vendor / 100),
      adminProfit: markupAmount * (PROFIT_ALLOCATION.vendor_purchase.admin / 100),
      customerCashback: markupAmount * (PROFIT_ALLOCATION.vendor_purchase.customer_cashback / 100)
    };
  }

  if (purchaseType === 'self') {
    return {
      customerCashback: markupAmount * (PROFIT_ALLOCATION.customer_self_purchase.customer / 100),
      adminProfit: markupAmount * (PROFIT_ALLOCATION.customer_self_purchase.admin / 100),
      vendorProfit: markupAmount * (PROFIT_ALLOCATION.customer_self_purchase.vendor / 100)
    };
  }

  // Third party purchase
  return {
    registeredCustomerReward: markupAmount * (PROFIT_ALLOCATION.customer_third_party_purchase.registered_customer / 100),
    unregisteredRecipientReward: markupAmount * (PROFIT_ALLOCATION.customer_third_party_purchase.unregistered_recipient / 100),
    adminProfit: 0,
    vendorProfit: 0
  };
};

export const getSampleDeals = (): Deal[] => {
  const networkDeals = [
    {
      id: '1',
      network: 'MTN',
      amount: 50,
      network_price: 50, // Original network price
      verified: true
    },
    {
      id: '2',
      network: 'Vodacom',
      amount: 100,
      network_price: 100,
      verified: true
    },
    {
      id: '3',
      network: 'Cell C',
      amount: 25,
      network_price: 25,
      verified: true
    },
    {
      id: '4',
      network: 'Telkom',
      amount: 200,
      network_price: 200,
      verified: true
    }
  ];

  return networkDeals.map(deal => {
    const markedUpPrice = calculateMarkupPrice(deal.network_price);
    const markupAmount = markedUpPrice - deal.network_price;
    
    return {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      original_price: markedUpPrice, // This is now the marked-up price shown to users
      discounted_price: markedUpPrice, // No "discount" shown - just the final price
      discount_percentage: 0, // Hide discount to conceal markup
      vendor_name: 'AirPay Platform',
      availability: 'available',
      demand_level: 'normal',
      verified: deal.verified,
      network_price: deal.network_price, // Hidden from users
      markup_amount: markupAmount // Hidden profit pool
    };
  });
};

export const loadDealsFromSupabase = async (): Promise<Deal[]> => {
  const { data: dealsData, error } = await supabase
    .from('deals')
    .select(`
      *,
      vendors (
        business_name
      )
    `)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading deals:', error);
    throw error;
  }

  return dealsData.map(deal => {
    // Apply markup to network prices
    const networkPrice = typeof deal.original_price === 'string' ? parseFloat(deal.original_price) : deal.original_price;
    const markedUpPrice = calculateMarkupPrice(networkPrice);
    const markupAmount = markedUpPrice - networkPrice;

    return {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      original_price: markedUpPrice, // Show marked-up price as the "original"
      discounted_price: markedUpPrice, // Same as original to hide markup
      discount_percentage: 0, // Hide any discount to conceal markup
      vendor_name: deal.vendors?.business_name || 'AirPay Platform',
      availability: deal.availability,
      demand_level: deal.demand_level,
      bonus: deal.bonus,
      expires_at: deal.expires_at,
      verified: deal.verified,
      network_price: networkPrice, // Hidden from users
      markup_amount: markupAmount // Hidden profit pool
    };
  });
};

export { calculateProfitSharing, MARKUP_PERCENTAGE };
