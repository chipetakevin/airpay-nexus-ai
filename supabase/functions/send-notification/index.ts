import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  event_type: 'database_error' | 'auto_fix' | 'feature_update' | 'integration_failure' | 'scheduled_report';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  component?: string;
  affected_system?: string;
  dashboard_link?: string;
  specific_recipients?: string[];
}

const getDefaultRecipients = () => {
  return [
    { email: 'admin@addexhub.com', types: ['database_error', 'auto_fix', 'feature_update', 'integration_failure', 'scheduled_report'] },
    { email: 'support@addexhub.com', types: ['database_error', 'auto_fix', 'integration_failure'] },
    { email: 'manager@addexhub.com', types: ['feature_update', 'scheduled_report'] }
  ];
};

const formatEmailContent = (request: NotificationRequest): { subject: string; html: string } => {
  const { event_type, severity, title, message, component, affected_system, dashboard_link } = request;
  
  const severityColor = severity === 'critical' ? '#ef4444' : severity === 'warning' ? '#f59e0b' : '#10b981';
  const severityBg = severity === 'critical' ? '#fef2f2' : severity === 'warning' ? '#fefbeb' : '#f0fdf4';

  const subject = title;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: ${severityBg}; border-left: 4px solid ${severityColor}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="width: 8px; height: 8px; background: ${severityColor}; border-radius: 50%;"></div>
          <strong style="color: ${severityColor}; text-transform: uppercase; font-size: 12px; font-weight: 600;">
            ${severity} Alert
          </strong>
        </div>
        <h2 style="margin: 0; color: #1f2937; font-size: 18px;">${title}</h2>
      </div>

      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <h3 style="margin-top: 0; color: #1f2937; font-size: 16px; margin-bottom: 16px;">Event Details</h3>
        
        <div style="white-space: pre-line; margin-bottom: 20px; color: #4b5563; line-height: 1.6;">
          ${message}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <strong style="display: block; color: #374151; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Event Type</strong>
            <span style="color: #6b7280; text-transform: capitalize;">${event_type.replace('_', ' ')}</span>
          </div>
          ${component ? `
          <div>
            <strong style="display: block; color: #374151; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Component</strong>
            <span style="color: #6b7280;">${component}</span>
          </div>
          ` : ''}
          ${affected_system ? `
          <div>
            <strong style="display: block; color: #374151; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Affected System</strong>
            <span style="color: #6b7280;">${affected_system}</span>
          </div>
          ` : ''}
          <div>
            <strong style="display: block; color: #374151; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Timestamp</strong>
            <span style="color: #6b7280;">${new Date().toLocaleString()}</span>
          </div>
        </div>

        ${dashboard_link ? `
        <div style="margin-top: 24px;">
          <a href="${dashboard_link}" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">
            View in Dashboard →
          </a>
        </div>
        ` : ''}
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This is an automated notification from Addex Hub Nerve Center.<br>
          For support, contact your system administrator.
        </p>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: NotificationRequest = await req.json();
    const { event_type, specific_recipients } = request;

    // Determine recipients
    let recipients: string[] = [];
    
    if (specific_recipients && specific_recipients.length > 0) {
      recipients = specific_recipients;
    } else {
      // Use default recipients based on event type
      const defaultRecipients = getDefaultRecipients();
      recipients = defaultRecipients
        .filter(recipient => recipient.types.includes(event_type))
        .map(recipient => recipient.email);
    }

    if (recipients.length === 0) {
      throw new Error('No recipients configured for this notification type');
    }

    // Format email content
    const { subject, html } = formatEmailContent(request);

    // Send email to all recipients
    const emailPromises = recipients.map(async (email) => {
      return resend.emails.send({
        from: "Addex Hub Alerts <alerts@addexhub.com>",
        to: [email],
        subject,
        html,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    
    // Check for failures
    const failures = results
      .map((result, index) => ({ result, email: recipients[index] }))
      .filter(({ result }) => result.status === 'rejected');

    if (failures.length > 0) {
      console.error('Failed to send to some recipients:', failures);
    }

    const successCount = results.filter(r => r.status === 'fulfilled').length;

    return new Response(JSON.stringify({ 
      success: true,
      recipients: recipients,
      sent_count: successCount,
      failed_count: failures.length,
      failures: failures.map(f => ({
        email: f.email,
        error: f.result.status === 'rejected' ? f.result.reason : 'Unknown error'
      }))
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to send notification'
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);