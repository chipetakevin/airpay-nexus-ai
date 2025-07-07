import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SIMActivationRequest {
  customer_name: string;
  sim_iccid: string;
  rica_reference: string;
  field_worker_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customer_name, sim_iccid, rica_reference, field_worker_id }: SIMActivationRequest = await req.json();

    // Generate activation link for admin
    const activationLink = `${Deno.env.get("SITE_URL")}/admin/activate-sim?rica=${rica_reference}`;

    const emailResponse = await resend.emails.send({
      from: "Divine Mobile <noreply@divinemobile.co.za>",
      to: ["admin@divinemobile.co.za"], // Admin email
      subject: `SIM Activation Required - ${customer_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">SIM Card Activation Required</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Customer Details:</h3>
            <ul>
              <li><strong>Customer Name:</strong> ${customer_name}</li>
              <li><strong>SIM ICCID:</strong> ${sim_iccid}</li>
              <li><strong>RICA Reference:</strong> ${rica_reference}</li>
              <li><strong>Field Worker ID:</strong> ${field_worker_id}</li>
            </ul>
          </div>
          
          <p>A new customer has been registered and their SIM card is ready for activation.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${activationLink}" 
               style="background-color: #10b981; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Activate SIM Card
            </a>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #10b981;">
            <p style="margin: 0; color: #047857;">
              <strong>Next Steps:</strong> 
              <br>1. Verify customer documentation
              <br>2. Activate SIM card via MVNE platform
              <br>3. Send welcome notification to customer
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated notification from the Divine Mobile MVNE System.<br>
            Customer notifications will be sent automatically upon activation.
          </p>
        </div>
      `,
    });

    console.log("SIM activation notification sent successfully:", emailResponse);

    // Also send to MVNE platform for automatic processing
    await fetch(`${Deno.env.get("MVNE_API_URL")}/activate-sim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("MVNE_API_KEY")}`
      },
      body: JSON.stringify({
        sim_iccid,
        rica_reference,
        customer_name,
        activation_type: 'field_worker_registration'
      })
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "SIM activation notification sent" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending SIM activation notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);