import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DocumentationEmailRequest {
  email: string;
  message?: string;
  documentation: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, message, documentation }: DocumentationEmailRequest = await req.json();

    if (!email) {
      throw new Error("Email address is required");
    }

    // Create HTML version of the documentation
    const htmlContent = documentation
      .replace(/\n/g, '<br>')
      .replace(/#{4}\s*(.+)/g, '<h4 style="color: #4f46e5; margin: 16px 0 8px 0;">$1</h4>')
      .replace(/#{3}\s*(.+)/g, '<h3 style="color: #1e40af; margin: 20px 0 12px 0;">$1</h3>')
      .replace(/#{2}\s*(.+)/g, '<h2 style="color: #1f2937; margin: 24px 0 16px 0;">$1</h2>')
      .replace(/#{1}\s*(.+)/g, '<h1 style="color: #111827; margin: 32px 0 20px 0; text-align: center;">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/✅\s*(.+)/g, '<div style="margin: 4px 0; color: #059669;">✅ $1</div>')
      .replace(/^-\s*(.+)/gm, '<li style="margin: 2px 0;">$1</li>')
      .replace(/---/g, '<hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">');

    const emailResponse = await resend.emails.send({
      from: "MVNE Platform <onboarding@resend.dev>",
      to: [email],
      subject: "MVNE Platform Version 3.0 - Complete Documentation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MVNE Platform Documentation</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Version 3.0 - Production Ready</p>
          </div>
          
          ${message ? `
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #3b82f6;">
              <h3 style="margin: 0 0 10px 0; color: #1e40af;">Personal Message:</h3>
              <p style="margin: 0; color: #475569;">${message}</p>
            </div>
          ` : ''}
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            ${htmlContent}
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              This documentation was automatically generated from the MVNE Platform v3.0<br>
              Generated on: ${new Date().toLocaleDateString('en-ZA', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'Africa/Johannesburg'
              })}
            </p>
          </div>
        </div>
      `,
    });

    console.log("Documentation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Documentation sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-documentation-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);