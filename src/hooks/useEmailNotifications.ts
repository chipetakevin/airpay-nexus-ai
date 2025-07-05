import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface NotificationRecipient {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'support' | 'manager';
  notification_types: string[];
  is_active: boolean;
}

export interface NotificationEvent {
  id: string;
  event_type: 'database_error' | 'auto_fix' | 'feature_update' | 'integration_failure' | 'scheduled_report';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  component?: string;
  affected_system?: string;
  dashboard_link?: string;
  created_at: string;
  sent_to: string[];
  status: 'pending' | 'sent' | 'failed';
}

export const useEmailNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [recentNotifications, setRecentNotifications] = useState<NotificationEvent[]>([]);
  const { toast } = useToast();

  const sendNotification = useCallback(async (
    eventType: NotificationEvent['event_type'],
    severity: NotificationEvent['severity'],
    title: string,
    message: string,
    options?: {
      component?: string;
      affectedSystem?: string;
      dashboardLink?: string;
      specificRecipients?: string[];
    }
  ) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: {
          event_type: eventType,
          severity,
          title,
          message,
          component: options?.component,
          affected_system: options?.affectedSystem,
          dashboard_link: options?.dashboardLink || `${window.location.origin}/system-management`,
          specific_recipients: options?.specificRecipients
        }
      });

      if (error) throw error;

      // Add to recent notifications
      const newNotification: NotificationEvent = {
        id: crypto.randomUUID(),
        event_type: eventType,
        severity,
        title,
        message,
        component: options?.component,
        affected_system: options?.affectedSystem,
        dashboard_link: options?.dashboardLink,
        created_at: new Date().toISOString(),
        sent_to: data?.recipients || [],
        status: 'sent'
      };

      setRecentNotifications(prev => [newNotification, ...prev.slice(0, 49)]);

      toast({
        title: "Notification Sent",
        description: `Email sent to ${data?.recipients?.length || 0} recipients`,
      });

      return { success: true, recipients: data?.recipients };
    } catch (error: any) {
      console.error('Failed to send notification:', error);
      
      toast({
        title: "Notification Failed",
        description: error.message || "Failed to send email notification",
        variant: "destructive"
      });

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const sendDatabaseErrorAlert = useCallback(async (
    errorDetails: {
      component: string;
      errorType: string;
      severity: 'critical' | 'warning' | 'info';
      message: string;
      autoFixAttempted?: boolean;
      autoFixSuccess?: boolean;
    }
  ) => {
    const title = `[${errorDetails.severity.toUpperCase()}] Database Error Detected`;
    const message = `
Component: ${errorDetails.component}
Error Type: ${errorDetails.errorType}
Details: ${errorDetails.message}
${errorDetails.autoFixAttempted ? 
  `Auto-Fix: ${errorDetails.autoFixSuccess ? 'Successful' : 'Failed'}` : 
  'Auto-Fix: Not attempted'
}

View details in the System Management Dashboard.
    `.trim();

    return await sendNotification('database_error', errorDetails.severity, title, message, {
      component: errorDetails.component,
      affectedSystem: 'Database'
    });
  }, [sendNotification]);

  const sendFeatureUpdateNotification = useCallback(async (
    updateDetails: {
      featureName: string;
      status: 'approved' | 'deployed' | 'rolled_back';
      description: string;
      approvedBy?: string;
    }
  ) => {
    const title = `[ACTION] Feature Update ${updateDetails.status.charAt(0).toUpperCase() + updateDetails.status.slice(1)}`;
    const message = `
Feature: ${updateDetails.featureName}
Status: ${updateDetails.status.replace('_', ' ').toUpperCase()}
Description: ${updateDetails.description}
${updateDetails.approvedBy ? `Approved by: ${updateDetails.approvedBy}` : ''}

View details in the System Management Dashboard.
    `.trim();

    return await sendNotification('feature_update', 'info', title, message, {
      component: updateDetails.featureName,
      affectedSystem: 'Platform'
    });
  }, [sendNotification]);

  const sendScheduledReport = useCallback(async (
    reportType: 'daily' | 'weekly' | 'monthly',
    reportData: {
      title: string;
      summary: string;
      keyMetrics: Array<{ label: string; value: string; status?: 'good' | 'warning' | 'critical' }>;
      downloadLink?: string;
    }
  ) => {
    const title = `[REPORT] ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} ${reportData.title}`;
    const message = `
${reportData.summary}

Key Metrics:
${reportData.keyMetrics.map(metric => 
  `• ${metric.label}: ${metric.value}${metric.status ? ` (${metric.status})` : ''}`
).join('\n')}

${reportData.downloadLink ? `Download full report: ${reportData.downloadLink}` : ''}

View details in the System Management Dashboard.
    `.trim();

    return await sendNotification('scheduled_report', 'info', title, message, {
      affectedSystem: 'Reporting'
    });
  }, [sendNotification]);

  const loadRecipients = useCallback(async () => {
    // Mock data for now - in real implementation, this would load from database
    const mockRecipients: NotificationRecipient[] = [
      {
        id: '1',
        email: 'admin@addexhub.com',
        name: 'System Administrator',
        role: 'admin',
        notification_types: ['database_error', 'auto_fix', 'feature_update', 'integration_failure', 'scheduled_report'],
        is_active: true
      },
      {
        id: '2',
        email: 'support@addexhub.com',
        name: 'Support Team',
        role: 'support',
        notification_types: ['database_error', 'auto_fix', 'integration_failure'],
        is_active: true
      },
      {
        id: '3',
        email: 'manager@addexhub.com',
        name: 'Technical Manager',
        role: 'manager',
        notification_types: ['feature_update', 'scheduled_report'],
        is_active: true
      }
    ];

    setRecipients(mockRecipients);
  }, []);

  const updateRecipient = useCallback(async (
    recipientId: string, 
    updates: Partial<NotificationRecipient>
  ) => {
    setRecipients(prev => prev.map(recipient => 
      recipient.id === recipientId 
        ? { ...recipient, ...updates }
        : recipient
    ));

    toast({
      title: "Recipient Updated",
      description: "Notification preferences have been saved",
    });
  }, [toast]);

  return {
    isLoading,
    recipients,
    recentNotifications,
    sendNotification,
    sendDatabaseErrorAlert,
    sendFeatureUpdateNotification,
    sendScheduledReport,
    loadRecipients,
    updateRecipient
  };
};