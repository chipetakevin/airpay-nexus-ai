import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  CheckCircle,
  AlertCircle,
  Undo,
  MessageSquare,
  Globe,
  Shield,
  Clock
} from 'lucide-react';

interface ConfirmationProps {
  phoneNumber: string;
  action: 'opt_in' | 'opt_out' | 'language_change';
  language: string;
  onComplete: () => void;
}

const UserPreferenceConfirmation = ({ phoneNumber, action, language, onComplete }: ConfirmationProps) => {
  const { toast } = useToast();
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const getActionDisplay = () => {
    switch (action) {
      case 'opt_in': return { text: 'Subscribe to notifications', color: 'bg-green-500' };
      case 'opt_out': return { text: 'Unsubscribe from notifications', color: 'bg-red-500' };
      case 'language_change': return { text: `Change language to ${getLanguageDisplay(language)}`, color: 'bg-blue-500' };
    }
  };

  const getLanguageDisplay = (code: string) => {
    const languages: Record<string, string> = {
      'en': 'English', 'zu': 'isiZulu', 'xh': 'isiXhosa', 'af': 'Afrikaans',
      'st': 'Sesotho', 'tn': 'Setswana', 'nso': 'Sepedi', 'ts': 'Xitsonga',
      've': 'Tshivenda', 'nr': 'isiNdebele'
    };
    return languages[code] || code;
  };

  const sendConfirmationUSSD = async () => {
    setConfirming(true);
    
    try {
      const actionDisplay = getActionDisplay();
      const confirmationMessage = {
        'en': `You are about to ${actionDisplay.text.toLowerCase()}. Press 1 to confirm, 2 to cancel, 0 to exit.`,
        'zu': `Uzokwenza ${actionDisplay.text.toLowerCase()}. Cindezela u-1 ukuze uqinisekise, u-2 ukuze urhoxise, u-0 ukuze uphume.`,
        'af': `Jy gaan ${actionDisplay.text.toLowerCase()}. Druk 1 om te bevestig, 2 om te kanselleer, 0 om uit te gaan.`
      };

      // Send USSD confirmation prompt
      const { error } = await supabase.functions.invoke('notify-sim-activation', {
        body: {
          phone_number: phoneNumber,
          language: language,
          activation_type: 'ussd_confirmation',
          message_template: {
            [language]: confirmationMessage[language as keyof typeof confirmationMessage] || confirmationMessage['en']
          },
          action_type: action,
          requires_confirmation: true
        }
      });

      if (error) throw error;

      // Log the confirmation request
      await supabase.from('ussd_notification_logs').insert({
        phone_number: phoneNumber,
        message_type: 'ussd',
        message_content: `Confirmation prompt for ${action}`,
        language_used: language,
        delivery_status: 'sent',
        metadata: {
          action_type: action,
          confirmation_stage: 'prompt_sent',
          compliance_verified: true
        }
      });

      toast({
        title: "Confirmation Sent",
        description: `Confirmation prompt sent to ${phoneNumber}`,
      });

      setConfirmed(true);
    } catch (error) {
      console.error('Error sending confirmation:', error);
      toast({
        title: "Error",
        description: "Failed to send confirmation prompt.",
        variant: "destructive"
      });
    } finally {
      setConfirming(false);
    }
  };

  const handleConfirmAction = async () => {
    try {
      // Update user preferences based on action
      const updates: any = {
        phone_number: phoneNumber,
        last_interaction_at: new Date().toISOString()
      };

      if (action === 'opt_in') {
        updates.is_opted_in = true;
        updates.opted_in_at = new Date().toISOString();
        updates.opted_out_at = null;
      } else if (action === 'opt_out') {
        updates.is_opted_in = false;
        updates.opted_out_at = new Date().toISOString();
      } else if (action === 'language_change') {
        updates.preferred_language = language;
      }

      // Upsert user preferences
      const { error } = await supabase
        .from('ussd_user_preferences')
        .upsert(updates, { onConflict: 'phone_number' });

      if (error) throw error;

      // Log the completed action
      await supabase.from('ussd_notification_logs').insert({
        phone_number: phoneNumber,
        message_type: 'ussd',
        message_content: `${action} confirmed and processed`,
        language_used: language,
        delivery_status: 'delivered',
        metadata: {
          action_type: action,
          confirmation_stage: 'completed',
          compliance_verified: true,
          timestamp: new Date().toISOString()
        }
      });

      // Send final confirmation message
      const confirmationMessages = {
        opt_in: {
          'en': 'You have successfully subscribed to notifications. Thank you!',
          'zu': 'Usuphalise ukulandelela izaziso. Siyabonga!',
          'af': 'Jy het suksesvol ingeteken vir kennisgewings. Dankie!'
        },
        opt_out: {
          'en': 'You have unsubscribed. You will no longer receive notifications.',
          'zu': 'Usuyekile ukulandelela. Awusayikuthola izaziso.',
          'af': 'Jy het uitgeteken. Jy sal nie meer kennisgewings ontvang nie.'
        },
        language_change: {
          'en': `Language changed to ${getLanguageDisplay(language)}`,
          'zu': `Ulimi lushintshwe laba ngu-${getLanguageDisplay(language)}`,
          'af': `Taal verander na ${getLanguageDisplay(language)}`
        }
      };

      const finalMessage = confirmationMessages[action][language as keyof typeof confirmationMessages[typeof action]] || 
                          confirmationMessages[action]['en'];

      await supabase.functions.invoke('notify-sim-activation', {
        body: {
          phone_number: phoneNumber,
          language: language,
          activation_type: 'ussd_final_confirmation',
          message_template: { [language]: finalMessage }
        }
      });

      toast({
        title: "Action Confirmed",
        description: `${getActionDisplay().text} completed successfully`,
      });

      onComplete();
    } catch (error) {
      console.error('Error confirming action:', error);
      toast({
        title: "Error",
        description: "Failed to confirm action.",
        variant: "destructive"
      });
    }
  };

  const actionDisplay = getActionDisplay();

  return (
    <Card className="border-orange-200 bg-orange-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-600" />
          User Preference Confirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{phoneNumber}</div>
              <div className="text-sm text-muted-foreground">
                Action: <Badge variant="outline" className={`${actionDisplay.color} text-white`}>
                  {actionDisplay.text}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Language: {getLanguageDisplay(language)}
          </div>
        </div>

        {!confirmed ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Confirmation Required</p>
                  <p className="text-blue-700">
                    This action requires user confirmation via USSD. A confirmation prompt will be sent to the user's phone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={sendConfirmationUSSD}
                disabled={confirming}
                className="flex-1"
              >
                {confirming ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Confirmation
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onComplete}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 mb-1">Confirmation Sent</p>
                  <p className="text-green-700">
                    User will receive a confirmation prompt. You can manually confirm the action below or wait for user response.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleConfirmAction}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Action
              </Button>
              <Button variant="outline" onClick={() => setConfirmed(false)}>
                <Undo className="w-4 h-4 mr-2" />
                Resend
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground p-3 bg-gray-50 rounded border">
          <Shield className="w-3 h-3 inline mr-1" />
          All actions are logged for compliance and audit purposes. User confirmations are required for POPIA compliance.
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferenceConfirmation;