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
    // Divinely Mobile deals - Always better pricing than MTN
    {
      id: 'dm-1',
      network: 'Divinely Mobile',
      amount: 50,
      network_price: 45, // Better base price than MTN
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'dm-2',
      network: 'Divinely Mobile',
      amount: 100,
      network_price: 85, // Better base price than MTN
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'dm-3',
      network: 'Divinely Mobile',
      amount: 25,
      network_price: 20, // Better base price than MTN
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'dm-4',
      network: 'Divinely Mobile',
      amount: 200,
      network_price: 175, // Better base price than MTN
      verified: true,
      deal_type: 'airtime'
    },
    // MTN deals - Standard pricing
    {
      id: 'mtn-1',
      network: 'MTN',
      amount: 50,
      network_price: 50, // Standard MTN price
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'mtn-2',
      network: 'MTN',
      amount: 100,
      network_price: 100, // Standard MTN price
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'mtn-3',
      network: 'MTN',
      amount: 25,
      network_price: 25, // Standard MTN price
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: 'mtn-4',
      network: 'MTN',
      amount: 200,
      network_price: 200, // Standard MTN price
      verified: true,
      deal_type: 'airtime'
    },
    // Other networks
    {
      id: '3',
      network: 'Vodacom',
      amount: 100,
      network_price: 100,
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: '4',
      network: 'Cell C',
      amount: 25,
      network_price: 25,
      verified: true,
      deal_type: 'airtime'
    },
    {
      id: '5',
      network: 'Telkom',
      amount: 200,
      network_price: 200,
      verified: true,
      deal_type: 'airtime'
    }
  ];

  return networkDeals.map(deal => {
    const markedUpPrice = calculateMarkupPrice(deal.network_price);
    const markupAmount = markedUpPrice - deal.network_price;
    
    // Calculate discount for display - Divinely Mobile gets better discount percentages
    let discountPercentage = 0;
    let discountedPrice = markedUpPrice;
    
    if (deal.network === 'Divinely Mobile') {
      // Divinely Mobile always shows better value
      discountPercentage = Math.floor(Math.random() * 15) + 20; // 20-35% discount
      discountedPrice = markedUpPrice * (1 - discountPercentage / 100);
    } else if (deal.network === 'MTN') {
      // MTN shows moderate discounts
      discountPercentage = Math.floor(Math.random() * 10) + 10; // 10-20% discount
      discountedPrice = markedUpPrice * (1 - discountPercentage / 100);
    } else {
      // Other networks get variable discounts
      discountPercentage = Math.floor(Math.random() * 15) + 5; // 5-20% discount
      discountedPrice = markedUpPrice * (1 - discountPercentage / 100);
    }
    
    return {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      original_price: markedUpPrice,
      discounted_price: Math.round(discountedPrice),
      discount_percentage: discountPercentage,
      vendor_name: deal.network === 'Divinely Mobile' ? 'Divinely Mobile' : 'AirPay Platform',
      availability: 'available',
      demand_level: deal.network === 'Divinely Mobile' ? 'very_high' : 'normal',
      verified: deal.verified,
      network_price: deal.network_price,
      markup_amount: markupAmount,
      deal_type: deal.deal_type,
      bonus: deal.network === 'Divinely Mobile' ? '🎁 EXCLUSIVE: Extra cashback + instant delivery' : undefined
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

  // If no data from Supabase, return sample deals
  if (!dealsData || dealsData.length === 0) {
    return getSampleDeals();
  }

  return dealsData.map(deal => {
    // Apply markup to network prices
    const networkPrice = typeof deal.original_price === 'string' ? parseFloat(deal.original_price) : deal.original_price;
    const markedUpPrice = calculateMarkupPrice(networkPrice);
    const markupAmount = markedUpPrice - networkPrice;

    // Ensure Divinely Mobile always has better pricing than MTN
    let finalPrice = markedUpPrice;
    let discountPercentage = deal.discount_percentage || 0;
    
    if (deal.network === 'Divinely Mobile') {
      // Ensure Divinely Mobile has at least 20% better value than standard
      discountPercentage = Math.max(discountPercentage, 25);
      finalPrice = markedUpPrice * (1 - discountPercentage / 100);
    } else if (deal.network === 'MTN') {
      // MTN gets moderate discounts
      discountPercentage = Math.min(discountPercentage, 20);
      finalPrice = markedUpPrice * (1 - discountPercentage / 100);
    }

    return {
      id: deal.id,
      network: deal.network,
      amount: deal.amount,
      original_price: markedUpPrice,
      discounted_price: Math.round(finalPrice),
      discount_percentage: discountPercentage,
      vendor_name: deal.vendors?.business_name || 'AirPay Platform',
      availability: deal.availability,
      demand_level: deal.network === 'Divinely Mobile' ? 'very_high' : deal.demand_level,
      bonus: deal.network === 'Divinely Mobile' ? '🎁 EXCLUSIVE: Premium network benefits' : deal.bonus,
      expires_at: deal.expires_at,
      verified: deal.verified,
      network_price: networkPrice,
      markup_amount: markupAmount,
      deal_type: deal.deal_type || 'airtime'
    };
  });
};

export { calculateProfitSharing, MARKUP_PERCENTAGE };
