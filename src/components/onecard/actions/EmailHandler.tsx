
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Transaction } from '../types/admin';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedReceiptGenerator } from '@/components/receipts/EnhancedReceiptGenerator';

interface EmailHandlerProps {
  transaction?: Transaction;
}

export const EmailHandler = ({ transaction }: EmailHandlerProps) => {
  const { toast } = useToast();
  const { generateProfessionalEmailReceipt, generateReceiptNumber, formatDateTime } = useEnhancedReceiptGenerator();

  const handleEmailReceipt = () => {
    if (!transaction) {
      toast({
        title: "Error",
        description: "No transaction data available for email receipt",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get customer info
      let customerInfo = { name: 'Valued Customer', mobile: '', email: '' };
      
      try {
        const userCredentials = localStorage.getItem('userCredentials');
        const userData = localStorage.getItem('onecardUser');
        
        if (userCredentials) {
          const credentials = JSON.parse(userCredentials);
          customerInfo.email = credentials.email || '';
        }
        
        if (userData) {
          const user = JSON.parse(userData);
          customerInfo.name = user.firstName && user.lastName ? 
            `${user.firstName} ${user.lastName}` : 'Valued Customer';
          customerInfo.mobile = user.registeredPhone || user.phone || '';
        }
      } catch (error) {
        console.error('Error getting customer info:', error);
      }

      const receiptData = {
        receiptNo: generateReceiptNumber(),
        transactionId: `AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`,
        dateTime: formatDateTime(transaction.timestamp || new Date().toISOString()),
        customer: {
          name: customerInfo.name,
          mobile: transaction.recipient_phone || customerInfo.mobile,
          email: customerInfo.email
        },
        items: [{
          name: `${transaction.network?.toUpperCase() || 'DIVINELY'} MOBILE SERVICE`,
          quantity: 1,
          unitPrice: transaction.amount || 0,
          subtotal: transaction.amount || 0,
          network: transaction.network || 'DIVINELY',
          type: transaction.transaction_type?.includes('airtime') ? 'airtime' : 'data'
        }],
        subtotal: transaction.amount || 0,
        discounts: 0,
        tax: 0,
        totalPaid: transaction.amount || 0,
        paymentMethod: 'OneCard Mobile Payment',
        cashbackEarned: transaction.cashback_earned || transaction.cashbackEarned || 0,
        deliveryPhone: transaction.recipient_phone || customerInfo.mobile
      };

      const emailContent = generateProfessionalEmailReceipt(receiptData);
      
      // Create email with the generated content
      const subject = `Divinely Mobile Receipt - ${receiptData.transactionId}`;
      const body = `Please find your professional receipt attached.\n\nTransaction ID: ${receiptData.transactionId}\nDate: ${receiptData.dateTime}\nAmount: R${receiptData.totalPaid.toFixed(2)}\n\nThank you for choosing Divinely Mobile!`;
      
      const mailtoLink = `mailto:${customerInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      toast({
        title: "📧 Email Receipt Prepared",
        description: "Professional email receipt opened in your email client",
        duration: 3000,
      });
      
      // Also log the HTML content for development/admin purposes
      console.log('Professional Email Receipt Generated:', emailContent);
      
    } catch (error) {
      console.error('Error generating email receipt:', error);
      toast({
        title: "Email Receipt Failed",
        description: "There was an error generating the email receipt. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handleEmailReceipt}
      className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
    >
      <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">Email</span>
    </Button>
  );
};
