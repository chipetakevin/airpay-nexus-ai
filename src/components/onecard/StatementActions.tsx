
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Mail, MessageCircle, Send, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface Transaction {
  customer_id: string;
  vendor_id: string;
  deal_id: string;
  recipient_phone: string;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  original_price: number;
  discounted_price: number;
  network: string;
  transaction_type: string;
  cashback_earned: number;
  admin_fee: number;
  vendor_commission: number;
  status: string;
  timestamp: string;
}

interface StatementActionsProps {
  transaction: Transaction;
}

export const StatementActions = ({ transaction }: StatementActionsProps) => {
  const { toast } = useToast();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSending, setIsSending] = useState(false);

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    let displayName = 'Valued Customer';
    
    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      
      // Priority: nickname > full name > first name > email prefix
      if (parsedCredentials.nickname) {
        displayName = parsedCredentials.nickname;
      } else if (parsedCredentials.firstName && parsedCredentials.lastName) {
        displayName = `${parsedCredentials.firstName} ${parsedCredentials.lastName}`;
      } else if (parsedCredentials.firstName) {
        displayName = parsedCredentials.firstName;
      } else if (parsedCredentials.email) {
        // Use email prefix as last resort
        displayName = parsedCredentials.email.split('@')[0];
      }
    }
    
    return displayName;
  };

  const generatePDFStatement = () => {
    try {
      // Get customer details from localStorage
      const credentials = localStorage.getItem('userCredentials');
      const customerName = getCustomerDisplayName();
      let customerPhone = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerPhone = parsedCredentials.phone || '';
      }

      const doc = new jsPDF();
      const transactionId = generateTransactionId(transaction.timestamp);
      const formattedDate = new Date(transaction.timestamp).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Header
      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129); // Green color
      doc.text('📱 Divinely Mobile', 20, 30);
      
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Transaction Statement', 20, 45);

      // Transaction Details Box
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(1);
      doc.rect(20, 55, 170, 40);
      
      doc.setFontSize(12);
      doc.text('Transaction Details', 25, 65);
      doc.setFontSize(10);
      doc.text(`Customer: ${customerName}`, 25, 75);
      doc.text(`Phone: ${customerPhone}`, 25, 82);
      doc.text(`Transaction ID: ${transactionId}`, 25, 89);
      doc.text(`Date: ${formattedDate}`, 120, 75);
      doc.text(`Status: ${transaction.status}`, 120, 82);
      doc.text(`Network: ${transaction.network}`, 120, 89);

      // Purchase Details
      doc.setFontSize(12);
      doc.text('Purchase Details', 25, 110);
      doc.setLineWidth(0.5);
      doc.line(25, 115, 185, 115);
      
      doc.setFontSize(10);
      doc.text('Item', 25, 125);
      doc.text('Amount', 120, 125);
      doc.text('Price', 160, 125);
      doc.line(25, 128, 185, 128);
      
      doc.text(`${transaction.network} Airtime R${transaction.amount}`, 25, 138);
      doc.text(`R${transaction.amount.toFixed(2)}`, 120, 138);
      doc.text(`R${transaction.discounted_price.toFixed(2)}`, 160, 138);

      // Recipient Details
      doc.setFontSize(12);
      doc.text('Recipient Details', 25, 155);
      doc.setLineWidth(0.5);
      doc.line(25, 160, 185, 160);
      
      doc.setFontSize(10);
      doc.text(`Name: ${transaction.recipient_name}`, 25, 170);
      doc.text(`Phone: ${transaction.recipient_phone}`, 25, 177);
      if (transaction.recipient_relationship) {
        doc.text(`Relationship: ${transaction.recipient_relationship}`, 25, 184);
      }

      // Payment Summary
      doc.setDrawColor(16, 185, 129);
      doc.setFillColor(240, 253, 244);
      doc.rect(20, 195, 170, 35, 'FD');
      
      doc.setFontSize(12);
      doc.setTextColor(16, 185, 129);
      doc.text('Payment Summary', 25, 205);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Paid: R${transaction.amount.toFixed(2)}`, 25, 215);
      doc.text(`Cashback Earned: R${transaction.cashback_earned.toFixed(2)}`, 25, 222);
      doc.text('✅ Transaction Successful!', 120, 215);
      
      const purchaseType = transaction.transaction_type === 'self_purchase' ? 
        'Airtime loaded to your number' : `Airtime sent to ${transaction.recipient_name}`;
      doc.text(purchaseType, 120, 222);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('Continue shopping: https://divinely-mobile.com', 25, 250);
      doc.text('Support: +27 100 2827', 25, 257);
      doc.text('© 2024 Divinely Mobile. All rights reserved.', 25, 264);
      doc.text('Brought To You By OneCard Global Rewards Program', 25, 271);

      // Download the PDF
      doc.save(`transaction-statement-${transactionId}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: "Transaction statement downloaded successfully"
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "Could not generate PDF statement. Please try again.",
        variant: "destructive"
      });
    }
  };

  const sendEmailStatement = async () => {
    if (!emailAddress) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Get customer details from localStorage
      const credentials = localStorage.getItem('userCredentials');
      const customerName = getCustomerDisplayName();
      let customerPhone = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerPhone = parsedCredentials.phone || '';
      }

      const receiptData = {
        customerName,
        customerEmail: emailAddress,
        customerPhone,
        recipientPhone: transaction.recipient_phone,
        recipientName: transaction.recipient_name,
        transactionId: generateTransactionId(transaction.timestamp),
        items: [{
          network: transaction.network,
          amount: transaction.amount,
          price: transaction.discounted_price,
          type: 'airtime'
        }],
        total: transaction.amount,
        cashbackEarned: transaction.cashback_earned,
        timestamp: transaction.timestamp,
        purchaseType: transaction.transaction_type === 'self_purchase' ? 'self' : 'other'
      };

      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Statement Sent",
        description: `Transaction statement sent to ${emailAddress}`,
      });
      
      setIsEmailDialogOpen(false);
      setEmailAddress('');
      
    } catch (error) {
      console.error('Error sending email statement:', error);
      toast({
        title: "Send Failed",
        description: "Could not send email statement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendWhatsAppReceipt = async () => {
    if (!whatsappNumber) {
      toast({
        title: "WhatsApp Number Required",
        description: "Please enter a WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Get customer details from localStorage
      const customerName = getCustomerDisplayName();

      const receiptData = {
        customerName,
        customerEmail: '', // Not needed for WhatsApp
        customerPhone: whatsappNumber, // Use the provided WhatsApp number
        recipientPhone: transaction.recipient_phone,
        recipientName: transaction.recipient_name,
        transactionId: generateTransactionId(transaction.timestamp),
        items: [{
          network: transaction.network,
          amount: transaction.amount,
          price: transaction.discounted_price,
          type: 'airtime'
        }],
        total: transaction.amount,
        cashbackEarned: transaction.cashback_earned,
        timestamp: transaction.timestamp,
        purchaseType: transaction.transaction_type === 'self_purchase' ? 'self' : 'other'
      };

      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        throw error;
      }

      // Open WhatsApp with receipt if URL provided
      if (data?.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }

      toast({
        title: "Receipt Sent",
        description: `Transaction receipt sent to WhatsApp ${whatsappNumber}`,
      });
      
      setIsWhatsAppDialogOpen(false);
      setWhatsappNumber('');
      
    } catch (error) {
      console.error('Error sending WhatsApp receipt:', error);
      toast({
        title: "Send Failed",
        description: "Could not send WhatsApp receipt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* PDF Download Button */}
      <Button size="sm" variant="outline" className="text-xs" onClick={generatePDFStatement}>
        <FileText className="w-3 h-3 mr-1" />
        PDF
      </Button>

      {/* Email Statement Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="text-xs">
            <Mail className="w-3 h-3 mr-1" />
            Email
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Transaction Statement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEmailDialogOpen(false)}
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button onClick={sendEmailStatement} disabled={isSending}>
                {isSending ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Statement
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Receipt Dialog */}
      <Dialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            WhatsApp
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Receipt to WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="e.g., +27123456789"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsWhatsAppDialogOpen(false)}
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button onClick={sendWhatsAppReceipt} disabled={isSending}>
                {isSending ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Receipt
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
