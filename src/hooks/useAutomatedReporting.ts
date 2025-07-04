import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReportSchedule {
  weekly: boolean;
  monthly: boolean;
  smsAlerts: boolean;
}

interface NotificationSettings {
  critical: boolean;
  warning: boolean;
  info: boolean;
}

interface SuspiciousActivity {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  user_type: 'customer' | 'contractor' | 'vendor' | 'admin';
  ip_address: string;
  location: string;
  activity_type: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  status: 'new' | 'under_review' | 'resolved' | 'false_positive';
  reported_to: string[];
  action_taken?: string;
}

interface EmailReport {
  reportId: string;
  type: 'weekly' | 'monthly' | 'immediate';
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  summary: {
    totalEvents: number;
    criticalAlerts: number;
    resolvedEvents: number;
    pendingReview: number;
  };
  activities: SuspiciousActivity[];
}

export const useAutomatedReporting = () => {
  const { toast } = useToast();
  const [reportSchedule, setReportSchedule] = useState<ReportSchedule>({
    weekly: true,
    monthly: true,
    smsAlerts: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    critical: true,
    warning: true,
    info: false
  });

  const [notificationEmails] = useState<string[]>([
    'security@company.com',
    'admin@company.com',
    'support@company.com'
  ]);

  const [smsNumbers] = useState<string[]>([
    '+27821234567',
    '+27829876543'
  ]);

  // Generate automated reports
  const generateWeeklyReport = (activities: SuspiciousActivity[]): EmailReport => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyActivities = activities.filter(activity => 
      new Date(activity.timestamp) >= startDate && new Date(activity.timestamp) <= endDate
    );

    return {
      reportId: `weekly-${Date.now()}`,
      type: 'weekly',
      generatedAt: new Date().toISOString(),
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      summary: {
        totalEvents: weeklyActivities.length,
        criticalAlerts: weeklyActivities.filter(a => a.severity === 'critical').length,
        resolvedEvents: weeklyActivities.filter(a => a.status === 'resolved').length,
        pendingReview: weeklyActivities.filter(a => a.status === 'new' || a.status === 'under_review').length
      },
      activities: weeklyActivities
    };
  };

  const generateMonthlyReport = (activities: SuspiciousActivity[]): EmailReport => {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    
    const monthlyActivities = activities.filter(activity => 
      new Date(activity.timestamp) >= startDate && new Date(activity.timestamp) <= endDate
    );

    return {
      reportId: `monthly-${Date.now()}`,
      type: 'monthly',
      generatedAt: new Date().toISOString(),
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      summary: {
        totalEvents: monthlyActivities.length,
        criticalAlerts: monthlyActivities.filter(a => a.severity === 'critical').length,
        resolvedEvents: monthlyActivities.filter(a => a.status === 'resolved').length,
        pendingReview: monthlyActivities.filter(a => a.status === 'new' || a.status === 'under_review').length
      },
      activities: monthlyActivities
    };
  };

  // Email notification functions
  const sendEmailNotification = async (activity: SuspiciousActivity): Promise<boolean> => {
    try {
      // Mock email sending implementation
      const shouldSend = (
        (activity.severity === 'critical' && notificationSettings.critical) ||
        (activity.severity === 'warning' && notificationSettings.warning) ||
        (activity.severity === 'info' && notificationSettings.info)
      );

      if (!shouldSend) return false;

      const emailContent = {
        to: notificationEmails,
        subject: `[ALERT] Suspicious Activity Detected – ${activity.severity.toUpperCase()}`,
        body: `
          <h2>Suspicious Activity Alert</h2>
          <p>A suspicious activity was detected:</p>
          <ul>
            <li><strong>User:</strong> ${activity.user_name} (${activity.user_type})</li>
            <li><strong>IP:</strong> ${activity.ip_address}</li>
            <li><strong>Location:</strong> ${activity.location}</li>
            <li><strong>Time:</strong> ${new Date(activity.timestamp).toLocaleString()}</li>
            <li><strong>Activity:</strong> ${activity.description}</li>
            <li><strong>Severity:</strong> ${activity.severity.toUpperCase()}</li>
          </ul>
          ${activity.action_taken ? `<p><strong>Action Taken:</strong> ${activity.action_taken}</p>` : ''}
          <p><a href="${window.location.origin}/portal?tab=admin-reg">View in Dashboard</a></p>
        `
      };

      // Simulate email sending
      console.log('Sending email notification:', emailContent);
      
      return true;
    } catch (error) {
      console.error('Failed to send email notification:', error);
      return false;
    }
  };

  const sendSMSAlert = async (activity: SuspiciousActivity): Promise<boolean> => {
    try {
      if (!reportSchedule.smsAlerts || activity.severity !== 'critical') {
        return false;
      }

      const smsContent = {
        to: smsNumbers,
        message: `[CRITICAL ALERT] Suspicious activity detected: ${activity.user_name} - ${activity.description}. Check email for details.`
      };

      // Simulate SMS sending
      console.log('Sending SMS alert:', smsContent);
      
      return true;
    } catch (error) {
      console.error('Failed to send SMS alert:', error);
      return false;
    }
  };

  const sendReportEmail = async (report: EmailReport): Promise<boolean> => {
    try {
      const reportContent = {
        to: notificationEmails,
        subject: `${report.type.charAt(0).toUpperCase() + report.type.slice(1)} Security Report - ${new Date(report.generatedAt).toLocaleDateString()}`,
        body: `
          <h2>${report.type.charAt(0).toUpperCase() + report.type.slice(1)} Suspicious Activity Report</h2>
          <p><strong>Report Period:</strong> ${new Date(report.period.start).toLocaleDateString()} - ${new Date(report.period.end).toLocaleDateString()}</p>
          
          <h3>Summary</h3>
          <table border="1" cellpadding="8" cellspacing="0">
            <tr><td><strong>Total Events</strong></td><td>${report.summary.totalEvents}</td></tr>
            <tr><td><strong>Critical Alerts</strong></td><td>${report.summary.criticalAlerts}</td></tr>
            <tr><td><strong>Resolved Events</strong></td><td>${report.summary.resolvedEvents}</td></tr>
            <tr><td><strong>Pending Review</strong></td><td>${report.summary.pendingReview}</td></tr>
          </table>

          ${report.activities.length > 0 ? `
            <h3>Recent Activities</h3>
            <table border="1" cellpadding="8" cellspacing="0">
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
              ${report.activities.slice(0, 10).map(activity => `
                <tr>
                  <td>${new Date(activity.timestamp).toLocaleString()}</td>
                  <td>${activity.user_name}</td>
                  <td>${activity.user_type}</td>
                  <td>${activity.severity}</td>
                  <td>${activity.status.replace('_', ' ')}</td>
                  <td>${activity.description}</td>
                </tr>
              `).join('')}
            </table>
          ` : '<p>No suspicious activities detected during this period.</p>'}

          <p><a href="${window.location.origin}/portal?tab=admin-reg">View Full Dashboard</a></p>
        `
      };

      // Simulate email sending
      console.log('Sending report email:', reportContent);
      
      return true;
    } catch (error) {
      console.error('Failed to send report email:', error);
      return false;
    }
  };

  // Automated scheduling simulation
  useEffect(() => {
    const scheduleReports = () => {
      // Weekly reports - every Monday at 8:00 AM
      if (reportSchedule.weekly) {
        const now = new Date();
        const nextMonday = new Date();
        nextMonday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
        nextMonday.setHours(8, 0, 0, 0);

        console.log('Next weekly report scheduled for:', nextMonday);
      }

      // Monthly reports - first day of month at 9:00 AM
      if (reportSchedule.monthly) {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 9, 0, 0, 0);

        console.log('Next monthly report scheduled for:', nextMonth);
      }
    };

    scheduleReports();
  }, [reportSchedule]);

  // Real-time activity monitoring
  const processNewActivity = async (activity: SuspiciousActivity): Promise<void> => {
    try {
      // Send immediate email notification
      const emailSent = await sendEmailNotification(activity);
      
      // Send SMS for critical events
      const smsSent = await sendSMSAlert(activity);

      if (emailSent || smsSent) {
        toast({
          title: "Alert Sent",
          description: `Notifications sent for ${activity.severity} event`,
        });
      }

      // Log the notification attempt
      console.log('Activity processed:', {
        activityId: activity.id,
        emailSent,
        smsSent,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to process new activity:', error);
      toast({
        title: "Notification Failed",
        description: "Failed to send alert notifications",
        variant: "destructive"
      });
    }
  };

  return {
    reportSchedule,
    setReportSchedule,
    notificationSettings,
    setNotificationSettings,
    notificationEmails,
    smsNumbers,
    generateWeeklyReport,
    generateMonthlyReport,
    sendEmailNotification,
    sendSMSAlert,
    sendReportEmail,
    processNewActivity
  };
};