
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { ReceiptData, corsHeaders } from './types.ts';
import { handleReceiptGeneration, handleError } from './receipt-handler.ts';

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const receiptData: ReceiptData = await req.json();
    const result = await handleReceiptGeneration(receiptData);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    return handleError(error);
  }
};

serve(handler);
