
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Transaction } from '../types/admin';
import { useToast } from '@/hooks/use-toast';

interface EmailHandlerProps {
  transaction?: Transaction;
}

export const EmailHandler = ({ transaction }: EmailHandlerProps) => {
  const { toast } = useToast();

  const handleEmailSend = () => {
    if (!transaction) {
      toast({
        title: "Error", 
        description: "No transaction data available for email",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get customer email from stored credentials
      const credentials = localStorage.getItem('userCredentials');
      let customerEmail = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerEmail = parsedCredentials.email || '';
      }

      if (!customerEmail) {
        toast({
          title: "Email Not Available",
          description: "No email address found. Please ensure you're logged in.",
          variant: "destructive"
        });
        return;
      }

      // Generate email content
      const transactionId = `AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`;
      const emailSubject = `Divinely Mobile Transaction Receipt - ${transactionId}`;
      const emailBody = `
Dear Valued Customer,

Thank you for choosing Divinely Mobile! Here are your transaction details:

🧾 TRANSACTION RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━

📱 Transaction ID: ${transactionId}
📅 Date: ${transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-ZA') : 'N/A'}
🌐 Network: ${transaction.network || 'N/A'}
💰 Amount: R${transaction.amount?.toFixed(2) || '0.00'}
👤 Recipient: ${transaction.recipientName || transaction.recipient_name || 'N/A'}
✅ Status: COMPLETED
🎁 Cashback Earned: R${(transaction.cashbackEarned || transaction.cashback_earned || 0).toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for using Divinely Mobile OneCard Platform!

Best regards,
The Divinely Mobile Team
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:${customerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');

      toast({
        title: "📧 Email Opened",
        description: `Professional email receipt for ${transactionId} ready to send`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error preparing email:', error);
      toast({
        title: "Email Error",
        description: "There was an error preparing the email. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handleEmailSend}
      className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
    >
      <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">Email</span>
    </Button>
  );
};
