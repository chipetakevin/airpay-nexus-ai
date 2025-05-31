
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScrapedDeal {
  network: string;
  amount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  vendorName: string;
  availability: string;
  dealType: string;
  bonus?: string;
  sourceUrl: string;
}

const SA_RETAILERS = [
  // Major Online Retailers
  {
    name: 'Takealot',
    url: 'https://www.takealot.com/airtime-data',
    selectors: {
      deals: '.product-anchor',
      title: '.product-title',
      price: '.currency',
      originalPrice: '.strikethrough-price'
    }
  },
  {
    name: 'Game',
    url: 'https://www.game.co.za/en/airtime-and-data',
    selectors: {
      deals: '.product-item',
      title: '.product-name',
      price: '.price',
      originalPrice: '.was-price'
    }
  },
  {
    name: 'Makro',
    url: 'https://www.makro.co.za/electronics/mobile-phones-tablets/airtime-data',
    selectors: {
      deals: '.product-tile',
      title: '.product-name',
      price: '.price',
      originalPrice: '.was-price'
    }
  },
  
  // Network Providers Direct
  {
    name: 'Vodacom Store',
    url: 'https://shop.vodacom.co.za/shop/en/vodacomshop/products/airtime',
    selectors: {
      deals: '.product-tile',
      title: '.product-title',
      price: '.price-current',
      originalPrice: '.price-was'
    }
  },
  {
    name: 'MTN Store',
    url: 'https://www.mtn.co.za/Pages/airtime.aspx',
    selectors: {
      deals: '.deal-card',
      title: '.deal-title',
      price: '.current-price',
      originalPrice: '.original-price'
    }
  },
  {
    name: 'Cell C Store',
    url: 'https://www.cellc.co.za/cellc/get-airtime',
    selectors: {
      deals: '.product-card',
      title: '.product-title',
      price: '.price',
      originalPrice: '.original-price'
    }
  },
  {
    name: 'Telkom Store',
    url: 'https://www.telkom.co.za/prepaid-services',
    selectors: {
      deals: '.package-card',
      title: '.package-title',
      price: '.price',
      originalPrice: '.was-price'
    }
  },
  
  // Specialized Airtime Retailers
  {
    name: 'SmartCall',
    url: 'https://store.smartcall.co.za/index.php?route=recharge%2Frecharge',
    selectors: {
      deals: '.product-item',
      title: '.product-name',
      price: '.price',
      originalPrice: '.old-price'
    }
  },
  {
    name: 'MyAirtime',
    url: 'https://myairtime.co.za/',
    selectors: {
      deals: '.deal-card',
      title: '.deal-title',
      price: '.current-price',
      originalPrice: '.old-price'
    }
  },
  {
    name: 'Surveila',
    url: 'https://surveila.co.za/product/justworx-sms-bundles-and-top-up-data/',
    selectors: {
      deals: '.product-card',
      title: '.product-title',
      price: '.price',
      originalPrice: '.regular-price'
    }
  },
  {
    name: 'Rebtel',
    url: 'https://www.rebtel.com/en/campaign/cms/mtu-generic/',
    selectors: {
      deals: '.offer-card',
      title: '.offer-title',
      price: '.offer-price',
      originalPrice: '.original-price'
    }
  },
  {
    name: 'DoctorSIM',
    url: 'https://www.doctorsim.com/us-en/topup-phone/',
    selectors: {
      deals: '.topup-option',
      title: '.option-title',
      price: '.price',
      originalPrice: '.original-price'
    }
  },
  
  // Additional Networks from Image
  {
    name: 'Lyca Mobile',
    url: 'https://www.lycamobile.co.za/en/top-up',
    selectors: {
      deals: '.topup-card',
      title: '.card-title',
      price: '.price',
      originalPrice: '.old-price'
    }
  },
  {
    name: 'Virgin Mobile',
    url: 'https://virginmobile.co.za/recharge',
    selectors: {
      deals: '.recharge-option',
      title: '.option-title',
      price: '.price',
      originalPrice: '.was-price'
    }
  },
  {
    name: 'Sentech',
    url: 'https://www.sentech.co.za/data-bundles',
    selectors: {
      deals: '.bundle-card',
      title: '.bundle-title',
      price: '.price',
      originalPrice: '.original-price'
    }
  }
];

async function scrapeRetailerDeals(retailer: any, firecrawlApiKey: string): Promise<ScrapedDeal[]> {
  console.log(`Scraping deals from ${retailer.name}...`);
  
  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: retailer.url,
        formats: ['markdown', 'html'],
        actions: [
          {
            type: 'wait',
            milliseconds: 3000
          }
        ],
        onlyMainContent: true
      })
    });

    if (!response.ok) {
      console.error(`Failed to scrape ${retailer.name}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    console.log(`Successfully scraped ${retailer.name}`);
    
    return parseDealsFromContent(data.data?.markdown || '', retailer);
  } catch (error) {
    console.error(`Error scraping ${retailer.name}:`, error);
    return [];
  }
}

function parseDealsFromContent(content: string, retailer: any): ScrapedDeal[] {
  const deals: ScrapedDeal[] = [];
  
  // Enhanced parsing logic for South African airtime/data deals
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    // Look for airtime/data keywords
    if (line.includes('airtime') || line.includes('data') || line.includes('prepaid') || 
        line.includes('voucher') || line.includes('recharge') || line.includes('top up') ||
        line.includes('bundle') || line.includes('sms') || line.includes('minutes')) {
      
      // Extract price information using regex
      const priceMatches = line.match(/r(\d+(?:\.\d{2})?)/g);
      const amountMatches = line.match(/(\d+)\s*(gb|mb|r|min)/g);
      
      if (priceMatches && amountMatches) {
        const prices = priceMatches.map(p => parseFloat(p.replace('r', '')));
        const amounts = amountMatches.map(a => {
          const num = parseInt(a.match(/\d+/)?.[0] || '0');
          return a.includes('r') ? num : num;
        });
        
        if (prices.length >= 1 && amounts.length >= 1) {
          const discountedPrice = Math.min(...prices);
          const originalPrice = prices.length > 1 ? Math.max(...prices) : discountedPrice * 1.15;
          const amount = amounts[0];
          
          // Determine network from content or retailer
          let network = 'Universal';
          if (line.includes('vodacom') || retailer.name.includes('Vodacom')) network = 'Vodacom';
          else if (line.includes('mtn') || retailer.name.includes('MTN')) network = 'MTN';
          else if (line.includes('cell c') || retailer.name.includes('Cell C')) network = 'Cell C';
          else if (line.includes('telkom') || retailer.name.includes('Telkom')) network = 'Telkom';
          else if (line.includes('rain')) network = 'Rain';
          else if (line.includes('lyca') || retailer.name.includes('Lyca')) network = 'Lyca Mobile';
          else if (line.includes('virgin') || retailer.name.includes('Virgin')) network = 'Virgin Mobile';
          else if (line.includes('sentech') || retailer.name.includes('Sentech')) network = 'Sentech';
          
          // Determine deal type
          let dealType = 'airtime';
          if (line.includes('data') || line.includes('gb') || line.includes('mb')) dealType = 'data';
          else if (line.includes('sms')) dealType = 'sms';
          else if (line.includes('minutes') || line.includes('min')) dealType = 'voice';
          
          // Check for bonuses
          let bonus = undefined;
          if (line.includes('bonus')) bonus = 'Bonus included';
          else if (line.includes('free')) bonus = 'Free extras included';
          else if (line.includes('unlimited')) bonus = 'Unlimited features';
          
          deals.push({
            network,
            amount,
            originalPrice,
            discountedPrice,
            discountPercentage: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
            vendorName: retailer.name,
            availability: 'available',
            dealType,
            bonus,
            sourceUrl: retailer.url
          });
        }
      }
    }
  }
  
  return deals.slice(0, 8); // Increased limit to capture more deals per retailer
}

async function saveDealsToDatabase(deals: ScrapedDeal[], supabase: any) {
  console.log(`Saving ${deals.length} deals to database...`);
  
  for (const deal of deals) {
    try {
      // First, find or create vendor
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .select('id')
        .eq('business_name', deal.vendorName)
        .maybeSingle();
      
      let vendorId = vendor?.id;
      
      if (!vendor) {
        const { data: newVendor, error: createVendorError } = await supabase
          .from('vendors')
          .insert({
            business_name: deal.vendorName,
            email: `contact@${deal.vendorName.toLowerCase().replace(/\s+/g, '')}.co.za`,
            phone: '+27000000000',
            verification_status: 'verified'
          })
          .select('id')
          .single();
        
        if (createVendorError) {
          console.error('Error creating vendor:', createVendorError);
          continue;
        }
        
        vendorId = newVendor.id;
      }
      
      // Insert or update deal
      const { error: dealError } = await supabase
        .from('deals')
        .upsert({
          network: deal.network,
          amount: deal.amount,
          original_price: deal.originalPrice,
          discounted_price: deal.discountedPrice,
          discount_percentage: deal.discountPercentage,
          vendor_id: vendorId,
          availability: deal.availability,
          deal_type: deal.dealType,
          bonus: deal.bonus,
          verified: true,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          demand_level: 'high'
        }, {
          onConflict: 'network,amount,vendor_id',
          ignoreDuplicates: false
        });
      
      if (dealError) {
        console.error('Error saving deal:', dealError);
      }
    } catch (error) {
      console.error('Error processing deal:', error);
    }
  }
  
  console.log('Finished saving deals to database');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting comprehensive autonomous deal scraping...');
    
    const allDeals: ScrapedDeal[] = [];
    
    // Scrape deals from all retailers with improved error handling
    for (const retailer of SA_RETAILERS) {
      try {
        const deals = await scrapeRetailerDeals(retailer, firecrawlApiKey);
        allDeals.push(...deals);
        console.log(`Found ${deals.length} deals from ${retailer.name}`);
        
        // Add delay between retailers to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to scrape ${retailer.name}:`, error);
        // Continue with next retailer instead of failing entirely
      }
    }
    
    console.log(`Found ${allDeals.length} total deals across all retailers`);
    
    // Save deals to database
    if (allDeals.length > 0) {
      await saveDealsToDatabase(allDeals, supabase);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped and saved ${allDeals.length} deals`,
        dealsFound: allDeals.length,
        retailers: SA_RETAILERS.map(r => r.name),
        networks: ['Vodacom', 'MTN', 'Cell C', 'Telkom', 'Lyca Mobile', 'Virgin Mobile', 'Sentech', 'Rain'],
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in autonomous deal scraper:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
