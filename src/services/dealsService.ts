
import { supabase } from '@/integrations/supabase/client';
import { Deal, ProfitAllocation } from '@/types/deals';

export const loadDealsFromSupabase = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from('deals')
      .select(`
        *,
        vendors!inner(business_name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error);
      return [];
    }

    // Transform the data to include vendor_name
    const transformedData = (data || []).map(deal => ({
      ...deal,
      vendor_name: Array.isArray(deal.vendors) 
        ? deal.vendors[0]?.business_name || 'Unknown Vendor'
        : deal.vendors?.business_name || 'Unknown Vendor',
      network_price: deal.original_price * 0.8, // Estimated network cost
      markup_amount: deal.original_price - deal.discounted_price
    }));

    return transformedData;
  } catch (error) {
    console.error('Error loading deals from Supabase:', error);
    return [];
  }
};

export const calculateProfitSharing = (
  markupAmount: number,
  purchaseType: 'self' | 'third_party' | 'vendor',
  isVendor: boolean
): ProfitAllocation => {
  const allocation: ProfitAllocation = {};

  if (isVendor) {
    // Vendor purchase allocation
    allocation.vendorProfit = markupAmount * 0.7; // 70% to vendor
    allocation.adminProfit = markupAmount * 0.3; // 30% to admin
  } else if (purchaseType === 'self') {
    // Self purchase allocation
    allocation.customerCashback = markupAmount * 0.5; // 50% cashback
    allocation.adminProfit = markupAmount * 0.5; // 50% to admin
  } else {
    // Third party purchase allocation
    allocation.registeredCustomerReward = markupAmount * 0.3; // 30% to registered customer
    allocation.unregisteredRecipientReward = markupAmount * 0.2; // 20% to recipient
    allocation.adminProfit = markupAmount * 0.5; // 50% to admin
  }

  return allocation;
};

export const getSampleDeals = (): Deal[] => {
  return [
    {
      id: '1',
      network: 'Divine Mobile',
      amount: 10,
      original_price: 10,
      discounted_price: 7.50,
      discount_percentage: 25,
      vendor_name: 'Divine Mobile',
      availability: 'available',
      demand_level: 'high',
      deal_type: 'airtime',
      bonus: '🎁 EXCLUSIVE: Extra cashback + instant delivery',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 10,
      markup_amount: 2.50
    },
    {
      id: '2',
      network: 'Divine Mobile',
      amount: 25,
      original_price: 25,
      discounted_price: 17.00,
      discount_percentage: 32,
      vendor_name: 'Divine Mobile',
      availability: 'available',
      demand_level: 'high',
      deal_type: 'airtime',
      bonus: '🎁 EXCLUSIVE: Extra cashback + instant delivery',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 25,
      markup_amount: 8.00
    },
    {
      id: '3',
      network: 'Divine Mobile',
      amount: 50,
      original_price: 50,
      discounted_price: 35.00,
      discount_percentage: 30,
      vendor_name: 'Divine Mobile',
      availability: 'available',
      demand_level: 'high',
      deal_type: 'airtime',
      bonus: '🎁 EXCLUSIVE: Extra cashback + instant delivery',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 50,
      markup_amount: 15.00
    },
    {
      id: '4',
      network: 'MTN',
      amount: 10,
      original_price: 10,
      discounted_price: 8.50,
      discount_percentage: 15,
      vendor_name: 'AirPay Platform',
      availability: 'available',
      demand_level: 'medium',
      deal_type: 'airtime',
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 10,
      markup_amount: 1.50
    },
    {
      id: '5',
      network: 'MTN',
      amount: 25,
      original_price: 25,
      discounted_price: 23.00,
      discount_percentage: 8,
      vendor_name: 'AirPay Platform',
      availability: 'available',
      demand_level: 'medium',
      deal_type: 'airtime',
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 25,
      markup_amount: 2.00
    },
    {
      id: '6',
      network: 'Vodacom',
      amount: 50,
      original_price: 50,
      discounted_price: 45.00,
      discount_percentage: 10,
      vendor_name: 'MobileHub',
      availability: 'limited',
      demand_level: 'high',
      deal_type: 'airtime',
      expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 50,
      markup_amount: 5.00
    },
    {
      id: '7',
      network: 'Cell C',
      amount: 100,
      original_price: 100,
      discounted_price: 85.00,
      discount_percentage: 15,
      vendor_name: 'QuickRecharge',
      availability: 'available',
      demand_level: 'low',
      deal_type: 'airtime',
      expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 100,
      markup_amount: 15.00
    },
    {
      id: '8',
      network: 'Telkom',
      amount: 200,
      original_price: 200,
      discounted_price: 180.00,
      discount_percentage: 10,
      vendor_name: 'DataDeals',
      availability: 'available',
      demand_level: 'medium',
      deal_type: 'data',
      expires_at: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
      verified: true,
      network_price: 200,
      markup_amount: 20.00
    }
  ];
};
