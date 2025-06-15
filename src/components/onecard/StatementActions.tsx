
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
    // TODO: Implement actual PDF generation for individual transactions
    // This could use the same PDF generators but for single transaction receipts
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
      `👤 Recipient: ${transaction.recipientName || transaction.recipient_name || 'N/A'}\n` +
      `💚 Cashback: R${(transaction.cashbackEarned || transaction.cashback_earned || 0).toFixed(2)}\n` +
      `📅 Date: ${transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-ZA') : 'N/A'}\n` +
      `✅ Status: ${transaction.status || 'N/A'}\n\n` +
      `Thank you for using OneCard! 🙏`
    ) : encodeURIComponent('Transaction receipt details');
    
    // Use a default WhatsApp number for demo purposes
    const phoneNumber = '27832466539';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex gap-1 w-full max-w-[200px]">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handlePDFDownload}
        className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
      >
        <Download className="w-3 h-3 mr-1 flex-shrink-0" />
        <span className="truncate">PDF</span>
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleEmailSend}
        className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
      >
        <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
        <span className="truncate">Email</span>
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleWhatsAppSend}
        className="flex-1 text-xs px-2 py-1 h-8 min-w-0 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
      >
        <MessageCircle className="w-3 h-3 mr-1 flex-shrink-0" />
        <span className="truncate">WhatsApp</span>
      </Button>
    </div>
  );
};
