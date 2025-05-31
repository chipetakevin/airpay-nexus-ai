
import { supabase } from '@/integrations/supabase/client';
import { Deal } from '@/types/deals';

export const getSampleDeals = (): Deal[] => [
  {
    id: '1',
    network: 'MTN',
    amount: 50,
    original_price: 50,
    discounted_price: 42.50,
    discount_percentage: 15,
    vendor_name: 'Makro',
    availability: 'available',
    demand_level: 'normal',
    bonus: 'Free 100MB',
    verified: true
  },
  {
    id: '2',
    network: 'Vodacom',
    amount: 100,
    original_price: 100,
    discounted_price: 89.00,
    discount_percentage: 11,
    vendor_name: 'Pick n Pay',
    availability: 'limited',
    demand_level: 'high',
    verified: true
  },
  {
    id: '3',
    network: 'Cell C',
    amount: 25,
    original_price: 25,
    discounted_price: 20.75,
    discount_percentage: 17,
    vendor_name: 'Capitec Bank',
    availability: 'available',
    demand_level: 'normal',
    bonus: 'Free 50SMS',
    verified: true
  },
  {
    id: '4',
    network: 'Telkom',
    amount: 200,
    original_price: 200,
    discounted_price: 174.00,
    discount_percentage: 13,
    vendor_name: 'Takealot',
    availability: 'available',
    demand_level: 'very_high',
    verified: true
  }
];

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

  return dealsData.map(deal => ({
    id: deal.id,
    network: deal.network,
    amount: deal.amount,
    original_price: parseFloat(deal.original_price),
    discounted_price: parseFloat(deal.discounted_price),
    discount_percentage: deal.discount_percentage,
    vendor_name: deal.vendors?.business_name || 'Unknown Vendor',
    availability: deal.availability,
    demand_level: deal.demand_level,
    bonus: deal.bonus,
    expires_at: deal.expires_at,
    verified: deal.verified
  }));
};
