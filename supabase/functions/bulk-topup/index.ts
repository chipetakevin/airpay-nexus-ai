import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BulkTopUpRequest {
  customerIds: string[];
  amount: number;
  network?: string;
  product_type?: 'airtime' | 'data' | 'sms';
  reference?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Mock MNO API integration - In production, integrate with actual MNO APIs
const processMNOTopUp = async (msisdn: string, amount: number, network: string, product_type: string) => {
  console.log(`💳 Processing ${product_type} top-up: ${msisdn} - R${amount} (${network})`);
  
  // Simulate MNO API processing time
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
  
  // Simulate success/failure (95% success rate)
  const success = Math.random() > 0.05;
  
  return {
    msisdn,
    amount,
    network,
    product_type,
    status: success ? 'completed' : 'failed',
    transaction_id: success ? `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 8)}` : null,
    error_code: success ? null : 'INSUFFICIENT_BALANCE',
    error_message: success ? null : 'Insufficient balance for top-up',
    processed_at: new Date().toISOString()
  };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerIds, amount, network, product_type, reference }: BulkTopUpRequest = await req.json();
    
    if (!customerIds || customerIds.length === 0) {
      throw new Error('No customer IDs provided');
    }
    
    if (!amount || amount <= 0) {
      throw new Error('Valid top-up amount is required');
    }

    if (amount < 5 || amount > 1000) {
      throw new Error('Top-up amount must be between R5 and R1000');
    }

    console.log(`🚀 Starting bulk top-up for ${customerIds.length} customers - R${amount} each`);

    // Fetch customer data with phone numbers
    const { data: customers, error: customerError } = await supabase
      .from('comprehensive_user_profiles')
      .select('id, first_name, last_name, phone, user_type')
      .in('id', customerIds)
      .not('phone', 'is', null);

    if (customerError) {
      throw new Error(`Failed to fetch customers: ${customerError.message}`);
    }

    if (!customers || customers.length === 0) {
      throw new Error('No valid customers found with phone numbers');
    }

    // Process top-ups concurrently with controlled concurrency
    const concurrencyLimit = 10; // Process 10 at a time
    const topUpPromises: Promise<any>[] = [];
    const results: any[] = [];

    for (let i = 0; i < customers.length; i += concurrencyLimit) {
      const batch = customers.slice(i, i + concurrencyLimit);
      
      const batchPromises = batch.map(async (customer) => {
        try {
          // Auto-detect network if not specified
          const customerNetwork = network || detectNetwork(customer.phone);
          
          const result = await processMNOTopUp(
            customer.phone, 
            amount, 
            customerNetwork, 
            product_type || 'airtime'
          );
          
          return {
            customer_id: customer.id,
            customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
            ...result
          };
        } catch (error: any) {
          return {
            customer_id: customer.id,
            customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
            msisdn: customer.phone,
            status: 'failed',
            error_message: error.message || 'Processing failed'
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + concurrencyLimit < customers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Calculate summary statistics
    const successful = results.filter(r => r.status === 'completed');
    const failed = results.filter(r => r.status === 'failed');
    const totalAmount = successful.length * amount;
    
    // Store bulk transaction records
    const transactionRecords = successful.map(result => ({
      customer_id: result.customer_id,
      amount: amount,
      transaction_type: 'bulk_topup',
      network_provider: result.network,
      recipient_msisdn: result.msisdn,
      status: 'completed',
      transaction_reference: result.transaction_id,
      mvne_reference: `BULK_${reference || Date.now()}`,
      created_at: new Date().toISOString()
    }));

    if (transactionRecords.length > 0) {
      await supabase.from('mvne_compliant_transactions').insert(transactionRecords);
    }

    // Update customer balances for successful top-ups
    for (const successResult of successful) {
      await supabase
        .from('comprehensive_user_profiles')
        .update({ 
          onecard_balance: supabase.raw('onecard_balance + ?', [amount * 0.05]) // 5% cashback
        })
        .eq('id', successResult.customer_id);
    }

    const summary = {
      total_customers: customers.length,
      successful_topups: successful.length,
      failed_topups: failed.length,
      total_amount_processed: totalAmount,
      success_rate: `${((successful.length / customers.length) * 100).toFixed(2)}%`,
      reference: reference || `BULK_${Date.now()}`
    };

    console.log(`✅ Bulk top-up completed: ${successful.length} successful, ${failed.length} failed`);

    return new Response(JSON.stringify({
      success: true,
      summary,
      results: results.map(r => ({
        customer_id: r.customer_id,
        customer_name: r.customer_name,
        msisdn: r.msisdn,
        status: r.status,
        transaction_id: r.transaction_id,
        error_message: r.error_message
      })),
      failed_customers: failed.length > 0 ? failed.map(f => ({
        customer_id: f.customer_id,
        customer_name: f.customer_name,
        msisdn: f.msisdn,
        error: f.error_message
      })) : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    console.error('❌ Bulk top-up error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to process bulk top-up'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

// Simple network detection based on phone number patterns
const detectNetwork = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // South African network prefixes
  if (cleanPhone.match(/^(27)?83/)) return 'MTN';
  if (cleanPhone.match(/^(27)?82|84/)) return 'Vodacom';
  if (cleanPhone.match(/^(27)?81|85/)) return 'Cell C';
  if (cleanPhone.match(/^(27)?87/)) return 'Telkom';
  
  return 'MTN'; // Default fallback
};

serve(handler);