import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BulkSMSRequest {
  customerIds: string[];
  message: string;
  campaign_name?: string;
  scheduled_at?: string;
  sender_name?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Mock SMS service - In production, integrate with Twilio/WinSMS/etc
const sendSMSBatch = async (recipients: { phone: string; name: string; message: string }[]) => {
  console.log(`📱 Sending SMS to ${recipients.length} recipients`);
  
  const results = recipients.map(recipient => ({
    phone: recipient.phone,
    name: recipient.name,
    status: Math.random() > 0.1 ? 'sent' : 'failed', // 90% success rate
    message_id: `SMS_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    cost: 0.10, // R0.10 per SMS
    timestamp: new Date().toISOString()
  }));
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return results;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerIds, message, campaign_name, sender_name }: BulkSMSRequest = await req.json();
    
    if (!customerIds || customerIds.length === 0) {
      throw new Error('No customer IDs provided');
    }
    
    if (!message || message.trim().length === 0) {
      throw new Error('Message content is required');
    }

    console.log(`🚀 Starting bulk SMS campaign for ${customerIds.length} customers`);

    // Fetch customer data
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

    // Prepare SMS recipients
    const recipients = customers.map(customer => ({
      phone: customer.phone,
      name: `${customer.first_name} ${customer.last_name}`.trim(),
      message: message.replace(/\{name\}/g, customer.first_name || 'Customer')
    }));

    // Process in batches of 50 to avoid overwhelming SMS service
    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < recipients.length; i += batchSize) {
      batches.push(recipients.slice(i, i + batchSize));
    }

    let totalSent = 0;
    let totalFailed = 0;
    let totalCost = 0;
    const failedRecipients: string[] = [];
    const successResults: any[] = [];

    // Process batches sequentially to respect rate limits
    for (const batch of batches) {
      try {
        const batchResults = await sendSMSBatch(batch);
        
        for (const result of batchResults) {
          if (result.status === 'sent') {
            totalSent++;
            successResults.push(result);
          } else {
            totalFailed++;
            failedRecipients.push(result.phone);
          }
          totalCost += result.cost;
        }
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (batchError) {
        console.error('Batch processing error:', batchError);
        totalFailed += batch.length;
        failedRecipients.push(...batch.map(r => r.phone));
      }
    }

    // Log campaign results
    const campaignResult = {
      campaign_name: campaign_name || `Campaign_${Date.now()}`,
      sender_name: sender_name || 'Divine Mobile',
      message_content: message,
      total_recipients: recipients.length,
      total_sent: totalSent,
      total_failed: totalFailed,
      total_cost: totalCost,
      success_rate: ((totalSent / recipients.length) * 100).toFixed(2),
      failed_recipients: failedRecipients,
      created_at: new Date().toISOString()
    };

    // Store campaign audit log
    await supabase.from('sms_campaign_logs').insert([campaignResult]);

    console.log(`✅ Bulk SMS campaign completed: ${totalSent} sent, ${totalFailed} failed`);

    return new Response(JSON.stringify({
      success: true,
      campaign_id: campaignResult.campaign_name,
      summary: {
        total_recipients: recipients.length,
        sent: totalSent,
        failed: totalFailed,
        cost: totalCost,
        success_rate: `${campaignResult.success_rate}%`
      },
      failed_recipients: failedRecipients.length > 0 ? failedRecipients : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    console.error('❌ Bulk SMS campaign error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to process bulk SMS campaign'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

serve(handler);