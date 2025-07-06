import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RICAUpdateRequest {
  customerIds: string[];
  update_type: 'check_status' | 'force_update' | 'bulk_verify';
  rica_status?: 'verified' | 'pending' | 'expired' | 'rejected';
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Mock RICA status check - In production, integrate with actual RICA APIs
const checkRICAStatus = async (msisdn: string, id_number: string) => {
  console.log(`🔍 Checking RICA status for ${msisdn}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
  
  // Simulate different RICA statuses with realistic distribution
  const statusOptions = [
    { status: 'verified', probability: 0.7 },
    { status: 'pending', probability: 0.2 },
    { status: 'expired', probability: 0.08 },
    { status: 'rejected', probability: 0.02 }
  ];
  
  const rand = Math.random();
  let cumulative = 0;
  
  for (const option of statusOptions) {
    cumulative += option.probability;
    if (rand <= cumulative) {
      return {
        msisdn,
        id_number,
        rica_status: option.status,
        verification_date: option.status === 'verified' ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : null,
        expiry_date: option.status === 'verified' ? new Date(Date.now() + (2 * 365 * 24 * 60 * 60 * 1000)).toISOString() : null,
        notes: getRICAStatusNotes(option.status),
        last_checked: new Date().toISOString()
      };
    }
  }
  
  // Fallback
  return {
    msisdn,
    id_number,
    rica_status: 'pending',
    verification_date: null,
    expiry_date: null,
    notes: 'Status check completed',
    last_checked: new Date().toISOString()
  };
};

const getRICAStatusNotes = (status: string): string => {
  switch (status) {
    case 'verified':
      return 'RICA verification completed successfully';
    case 'pending':
      return 'RICA verification documents under review';
    case 'expired':
      return 'RICA verification has expired - re-verification required';
    case 'rejected':
      return 'RICA verification rejected - incomplete or invalid documents';
    default:
      return 'RICA status unknown';
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerIds, update_type, rica_status }: RICAUpdateRequest = await req.json();
    
    if (!customerIds || customerIds.length === 0) {
      throw new Error('No customer IDs provided');
    }
    
    if (!update_type) {
      throw new Error('Update type is required');
    }

    console.log(`🚀 Starting RICA status update for ${customerIds.length} customers (${update_type})`);

    // Fetch customer data
    const { data: customers, error: customerError } = await supabase
      .from('comprehensive_user_profiles')
      .select('id, first_name, last_name, phone, id_number, rica_status')
      .in('id', customerIds)
      .not('phone', 'is', null);

    if (customerError) {
      throw new Error(`Failed to fetch customers: ${customerError.message}`);
    }

    if (!customers || customers.length === 0) {
      throw new Error('No valid customers found');
    }

    const results: any[] = [];
    let updated = 0;
    let unchanged = 0;
    let failed = 0;

    // Process customers based on update type
    if (update_type === 'force_update' && rica_status) {
      // Force update all customers to specified status
      for (const customer of customers) {
        try {
          const { error: updateError } = await supabase
            .from('comprehensive_user_profiles')
            .update({ 
              rica_status: rica_status,
              updated_at: new Date().toISOString()
            })
            .eq('id', customer.id);

          if (updateError) throw updateError;

          results.push({
            customer_id: customer.id,
            customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
            msisdn: customer.phone,
            old_status: customer.rica_status,
            new_status: rica_status,
            status: 'updated',
            notes: `Force updated to ${rica_status}`
          });
          updated++;
        } catch (error: any) {
          results.push({
            customer_id: customer.id,
            customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
            msisdn: customer.phone,
            status: 'failed',
            error: error.message
          });
          failed++;
        }
      }
    } else {
      // Check status with external RICA service
      const concurrencyLimit = 5; // Process 5 at a time to respect API limits
      
      for (let i = 0; i < customers.length; i += concurrencyLimit) {
        const batch = customers.slice(i, i + concurrencyLimit);
        
        const batchPromises = batch.map(async (customer) => {
          try {
            const ricaResult = await checkRICAStatus(customer.phone, customer.id_number);
            
            // Update customer record if status changed
            if (ricaResult.rica_status !== customer.rica_status) {
              const { error: updateError } = await supabase
                .from('comprehensive_user_profiles')
                .update({ 
                  rica_status: ricaResult.rica_status,
                  updated_at: new Date().toISOString()
                })
                .eq('id', customer.id);

              if (updateError) throw updateError;
              
              // Log RICA audit
              await supabase.from('rica_audit_logs').insert([{
                customer_id: customer.id,
                action: 'bulk_status_update',
                old_status: customer.rica_status,
                new_status: ricaResult.rica_status,
                verification_method: 'automated_check',
                compliance_notes: ricaResult.notes
              }]);

              updated++;
              return {
                customer_id: customer.id,
                customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
                msisdn: customer.phone,
                old_status: customer.rica_status,
                new_status: ricaResult.rica_status,
                status: 'updated',
                verification_date: ricaResult.verification_date,
                expiry_date: ricaResult.expiry_date,
                notes: ricaResult.notes
              };
            } else {
              unchanged++;
              return {
                customer_id: customer.id,
                customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
                msisdn: customer.phone,
                rica_status: ricaResult.rica_status,
                status: 'unchanged',
                notes: 'Status confirmed - no change needed'
              };
            }
          } catch (error: any) {
            failed++;
            return {
              customer_id: customer.id,
              customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
              msisdn: customer.phone,
              status: 'failed',
              error: error.message || 'RICA status check failed'
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Delay between batches to respect API rate limits
        if (i + concurrencyLimit < customers.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }

    const summary = {
      total_customers: customers.length,
      updated: updated,
      unchanged: unchanged,
      failed: failed,
      success_rate: `${((updated / customers.length) * 100).toFixed(2)}%`,
      update_type: update_type
    };

    console.log(`✅ RICA status update completed: ${updated} updated, ${unchanged} unchanged, ${failed} failed`);

    return new Response(JSON.stringify({
      success: true,
      summary,
      results,
      failed_customers: failed > 0 ? results.filter(r => r.status === 'failed') : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    console.error('❌ RICA status update error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to process RICA status update'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

serve(handler);