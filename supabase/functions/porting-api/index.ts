import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PortingRequest {
  phone_number: string;
  current_network: string;
  target_network: string;
  request_type?: string;
  priority?: string;
  scheduled_cutover?: string;
  documents?: any[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const url = new URL(req.url);
    const path = url.pathname;

    // Log API access
    await logApiAccess(supabaseClient, req, path);

    if (req.method === 'POST' && path.endsWith('/initiate')) {
      return await initiatePorting(supabaseClient, req);
    }

    if (req.method === 'GET' && path.includes('/status/')) {
      const id = path.split('/').pop();
      return await getPortingStatus(supabaseClient, id);
    }

    if (req.method === 'GET' && path.endsWith('/analytics')) {
      return await getAnalytics(supabaseClient, req);
    }

    if (req.method === 'POST' && path.endsWith('/bulk')) {
      return await initiateBulkPorting(supabaseClient, req);
    }

    if (req.method === 'POST' && path.endsWith('/webhook')) {
      return await handleWebhook(supabaseClient, req);
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in porting-api function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function logApiAccess(supabaseClient: any, req: Request, endpoint: string) {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    await supabaseClient.from('api_access_logs').insert({
      user_id: user?.id,
      api_endpoint: endpoint,
      method: req.method,
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
      user_agent: req.headers.get('user-agent'),
    });
  } catch (error) {
    console.warn('Failed to log API access:', error);
  }
}

async function initiatePorting(supabaseClient: any, req: Request) {
  const portingData: PortingRequest = await req.json();
  
  // Validate required fields
  if (!portingData.phone_number || !portingData.current_network || !portingData.target_network) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Insert porting request
  const { data, error } = await supabaseClient
    .from('porting_requests')
    .insert({
      user_id: user.id,
      ...portingData,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Send notification
  await sendNotification(supabaseClient, data.id, user.id, 'Porting request initiated successfully');

  // Simulate AI processing
  setTimeout(() => processPortingRequest(data.id), 2000);

  return new Response(JSON.stringify({ 
    success: true, 
    request_id: data.id,
    message: 'Porting request initiated successfully'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getPortingStatus(supabaseClient: any, requestId: string) {
  const { data, error } = await supabaseClient
    .from('porting_requests')
    .select('*')
    .eq('id', requestId)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Request not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getAnalytics(supabaseClient: any, req: Request) {
  const url = new URL(req.url);
  const days = parseInt(url.searchParams.get('days') || '30');

  const { data, error } = await supabaseClient
    .from('porting_analytics')
    .select('*')
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function initiateBulkPorting(supabaseClient: any, req: Request) {
  const { batch_name, numbers, scheduled_cutover } = await req.json();
  
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create bulk batch
  const { data: batch, error: batchError } = await supabaseClient
    .from('bulk_porting_batches')
    .insert({
      user_id: user.id,
      batch_name,
      total_numbers: numbers.length,
      scheduled_cutover
    })
    .select()
    .single();

  if (batchError) {
    return new Response(JSON.stringify({ error: batchError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create individual porting requests
  const portingRequests = numbers.map((number: any) => ({
    user_id: user.id,
    phone_number: number.phone_number,
    current_network: number.current_network,
    target_network: number.target_network,
    request_type: 'bulk',
    scheduled_cutover
  }));

  await supabaseClient.from('porting_requests').insert(portingRequests);

  return new Response(JSON.stringify({ 
    success: true, 
    batch_id: batch.id,
    message: `Bulk porting initiated for ${numbers.length} numbers`
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sendNotification(supabaseClient: any, requestId: string, userId: string, message: string) {
  await supabaseClient.from('porting_notifications').insert({
    porting_request_id: requestId,
    user_id: userId,
    notification_type: 'push',
    status: 'info',
    message,
    delivery_status: 'sent'
  });
}

async function handleWebhook(supabaseClient: any, req: Request) {
  const webhookData = await req.json();
  
  // Process webhook based on type
  if (webhookData.type === 'status_update') {
    await supabaseClient
      .from('porting_requests')
      .update({
        status: webhookData.status,
        progress_percentage: webhookData.progress,
        npc_reference: webhookData.npc_reference
      })
      .eq('id', webhookData.request_id);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function processPortingRequest(requestId: string) {
  // This would typically integrate with NPC and carrier systems
  // For demo purposes, we'll simulate the process
  console.log(`Processing porting request: ${requestId}`);
}