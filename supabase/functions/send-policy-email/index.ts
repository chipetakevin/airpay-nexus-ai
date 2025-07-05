import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PolicyEmailRequest {
  policyId: string;
  policyTitle: string;
  policyVersion: string;
  policyCategory: string;
  recipients: Array<{
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    userType: string;
  }>;
  pdfBuffer?: string; // Base64 encoded PDF
  isTest?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestData: PolicyEmailRequest = await req.json();
    const { policyId, policyTitle, policyVersion, policyCategory, recipients, pdfBuffer, isTest } = requestData;

    const emailResults = [];
    let successCount = 0;
    let failureCount = 0;

    // Generate acknowledgment URL
    const acknowledgmentUrl = `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/policy-acknowledgment/${policyId}`;

    for (const recipient of recipients) {
      try {
        const emailContent = generateEmailContent(
          recipient,
          policyTitle,
          policyVersion,
          policyCategory,
          acknowledgmentUrl
        );

        const emailData: any = {
          from: "Divine Mobile Policy Updates <policies@divinemobile.co.za>",
          to: [recipient.email],
          subject: `${isTest ? '[TEST] ' : ''}Divine Mobile Policy Update: ${policyTitle} v${policyVersion}`,
          html: emailContent,
        };

        // Attach PDF if provided
        if (pdfBuffer) {
          emailData.attachments = [{
            filename: `${policyTitle.replace(/[^a-z0-9]/gi, '_')}_v${policyVersion}.pdf`,
            content: pdfBuffer,
            type: 'application/pdf',
          }];
        }

        const emailResponse = await resend.emails.send(emailData);
        
        if (emailResponse.data?.id) {
          successCount++;
          emailResults.push({
            recipient: recipient.email,
            status: 'sent',
            emailId: emailResponse.data.id
          });

          // Update last email sent timestamp
          if (!isTest) {
            await supabaseClient
              .from('stakeholder_contacts')
              .update({ last_email_sent: new Date().toISOString() })
              .eq('email', recipient.email);
          }
        } else {
          failureCount++;
          emailResults.push({
            recipient: recipient.email,
            status: 'failed',
            error: 'No email ID returned'
          });
        }
      } catch (emailError) {
        failureCount++;
        emailResults.push({
          recipient: recipient.email,
          status: 'failed',
          error: emailError.message
        });
        console.error(`Failed to send email to ${recipient.email}:`, emailError);
      }
    }

    // Update distribution record if not a test
    if (!isTest && policyId) {
      await supabaseClient
        .from('policy_distributions')
        .update({
          email_sent_count: successCount,
          email_failed_count: failureCount,
          distribution_status: failureCount === 0 ? 'completed' : 'partial',
          updated_at: new Date().toISOString()
        })
        .eq('policy_id', policyId)
        .order('created_at', { ascending: false })
        .limit(1);
    }

    console.log(`Email distribution complete: ${successCount} sent, ${failureCount} failed`);

    return new Response(JSON.stringify({
      success: true,
      totalRecipients: recipients.length,
      successCount,
      failureCount,
      results: emailResults
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-policy-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateEmailContent(
  recipient: any,
  policyTitle: string,
  policyVersion: string,
  policyCategory: string,
  acknowledgmentUrl: string
): string {
  const categoryDisplay = {
    'ict': 'ICT Policy',
    'cybersecurity': 'Cybersecurity Policy',
    'sop': 'Standard Operating Procedures',
    'training': 'Training Materials'
  }[policyCategory] || 'Policy Update';

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Divine Mobile Policy Update</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #FFD700, #FFA500); padding: 30px 20px; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; color: #000; margin-bottom: 10px; }
            .content { padding: 30px 20px; }
            .highlight { background: #f8f9fa; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0; }
            .button { display: inline-block; background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
            .important { color: #dc3545; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🔷 Divine Mobile</div>
                <h1 style="margin: 0; color: #000;">Policy Update Notification</h1>
            </div>
            
            <div class="content">
                <h2>Hello ${recipient.firstName} ${recipient.lastName},</h2>
                
                <p>A new <strong>${categoryDisplay}</strong> has been released and requires your immediate attention.</p>
                
                <div class="highlight">
                    <h3 style="margin-top: 0;">📋 Policy Details</h3>
                    <ul style="margin: 10px 0;">
                        <li><strong>Title:</strong> ${policyTitle}</li>
                        <li><strong>Version:</strong> ${policyVersion}</li>
                        <li><strong>Category:</strong> ${categoryDisplay}</li>
                        <li><strong>Your Role:</strong> ${recipient.role}</li>
                        <li><strong>Status:</strong> ${recipient.userType}</li>
                    </ul>
                </div>
                
                <p class="important">⚠️ Action Required: You must review and acknowledge this policy within 7 days.</p>
                
                <p>Please review the attached policy document and complete the acknowledgment process:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${acknowledgmentUrl}" class="button">
                        📝 Review & Acknowledge Policy
                    </a>
                </div>
                
                <div style="border: 1px solid #dee2e6; border-radius: 6px; padding: 15px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📚 What's Required:</h4>
                    <ol style="margin: 10px 0; padding-left: 20px;">
                        <li>Read the attached policy document carefully</li>
                        <li>Complete the brief comprehension quiz</li>
                        <li>Submit your acknowledgment</li>
                        <li>Save this email for your records</li>
                    </ol>
                </div>
                
                <p><strong>Important Notes:</strong></p>
                <ul>
                    <li>This policy is effective immediately</li>
                    <li>Compliance is mandatory for all Divine Mobile stakeholders</li>
                    <li>Contact support if you have questions or concerns</li>
                    <li>Keep this document accessible for future reference</li>
                </ul>
                
                <p>Thank you for your attention to this important matter.</p>
                
                <p>Best regards,<br>
                <strong>Divine Mobile Policy Team</strong><br>
                Addex Hub Nerve Center</p>
            </div>
            
            <div class="footer">
                <p><strong>Divine Mobile - Addex Hub Nerve Center</strong></p>
                <p>This is an automated policy distribution. For questions, contact: <a href="mailto:policies@divinemobile.co.za">policies@divinemobile.co.za</a></p>
                <p style="font-size: 12px; margin-top: 15px;">
                    © ${new Date().getFullYear()} Divine Mobile. All rights reserved.<br>
                    This communication contains confidential information intended only for the addressee.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

serve(handler);