import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  type: string;
  field_worker_id: string;
  field_worker_name: string;
  field_worker_email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, field_worker_id, field_worker_name, field_worker_email, message }: AdminNotificationRequest = await req.json();

    // Generate approval link for admin
    const approvalLink = `${Deno.env.get("SITE_URL")}/admin/approve-field-worker?id=${field_worker_id}`;

    const emailResponse = await resend.emails.send({
      from: "Divine Mobile <noreply@divinemobile.co.za>",
      to: ["admin@divinemobile.co.za"], // Admin email
      subject: `Field Worker Registration Pending Approval - ${field_worker_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Field Worker Registration Approval Required</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Application Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${field_worker_name}</li>
              <li><strong>Email:</strong> ${field_worker_email}</li>
              <li><strong>Application ID:</strong> ${field_worker_id}</li>
              <li><strong>Status:</strong> Pending Admin Approval</li>
            </ul>
          </div>
          
          <p>A new field worker has submitted their registration and requires your approval to proceed.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${approvalLink}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Review and Approve Application
            </a>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please review the application and either approve or reject 
              within 48 hours to maintain service quality.
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated notification from the Divine Mobile Field Worker Management System.<br>
            If you have any questions, please contact the system administrator.
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, message: "Admin notification sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending admin notification:", error);
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