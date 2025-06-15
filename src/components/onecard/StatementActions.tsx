import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, MessageCircle } from 'lucide-react';
import { Transaction } from './types/admin';

interface StatementActionsProps {
  transaction?: Transaction;
}

export const StatementActions = ({ transaction }: StatementActionsProps) => {
  const handlePDFDownload = () => {
    console.log('Downloading PDF for transaction:', transaction);
    // PDF download logic will be implemented
  };

  const handleEmailSend = () => {
    console.log('Sending email for transaction:', transaction);
    // Email send logic will be implemented
  };

  const handleWhatsAppSend = () => {
    console.log('Sending WhatsApp message for transaction:', transaction);
    
    // Format transaction details for WhatsApp
    const message = transaction ? encodeURIComponent(
      `🧾 Transaction Receipt\n\n` +
      `📱 Transaction ID: AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}\n` +
      `🌐 Network: ${transaction.network || 'N/A'}\n` +
      `💰 Amount: R${transaction.amount?.toFixed(2) || '0.00'}\n` +
      `👤 Recipient: ${transaction.customerName || 'N/A'}\n` +
      `💚 Cashback: R${transaction.cashbackEarned?.toFixed(2) || '0.00'}\n` +
      `📅 Date: ${transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-ZA') : 'N/A'}\n` +
      `✅ Status: ${transaction.status || 'N/A'}\n\n` +
      `Thank you for using Divinely Mobile! 🙏`
    ) : encodeURIComponent('Transaction receipt details');
    
    // Use a default WhatsApp number for demo purposes
    const phoneNumber = '27832466539';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      {/* Mobile: Stacked buttons */}
      <div className="flex flex-col gap-2 sm:hidden w-full">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handlePDFDownload}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Download className="w-3 h-3" />
          PDF
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleEmailSend}
          className="w-full text-xs flex items-center justify-center gap-1"
        >
          <Mail className="w-3 h-3" />
          Email
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleWhatsAppSend}
          className="w-full text-xs flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
        >
          <MessageCircle className="w-3 h-3" />
          WhatsApp
        </Button>
      </div>

      {/* Desktop: Horizontal buttons */}
      <div className="hidden sm:flex gap-2 w-full">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handlePDFDownload}
          className="flex-1 text-xs flex items-center justify-center gap-1"
        >
          <Download className="w-3 h-3" />
          PDF
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleEmailSend}
          className="flex-1 text-xs flex items-center justify-center gap-1"
        >
          <Mail className="w-3 h-3" />
          Email
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleWhatsAppSend}
          className="flex-1 text-xs flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
        >
          <MessageCircle className="w-3 h-3" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};
