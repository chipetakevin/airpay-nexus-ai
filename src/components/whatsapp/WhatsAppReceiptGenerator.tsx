import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share, CheckCircle, Smartphone } from 'lucide-react';
import { CartItem } from '@/hooks/useWhatsAppShopping';

interface ReceiptData {
  transactionId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  paymentMethod: string;
  language?: string;
}

interface ReceiptGeneratorProps {
  receiptData: ReceiptData;
  onSendToWhatsApp: () => void;
  onDownload: () => void;
  onClose: () => void;
}

const WhatsAppReceiptGenerator: React.FC<ReceiptGeneratorProps> = ({
  receiptData,
  onSendToWhatsApp,
  onDownload,
  onClose
}) => {
  const { transactionId, customerName, customerPhone, items, total, timestamp, paymentMethod, language = 'en' } = receiptData;

  const translations = {
    en: {
      receipt: 'Digital Receipt',
      transactionId: 'Transaction ID',
      customer: 'Customer',
      phone: 'Phone',
      date: 'Date',
      paymentMethod: 'Payment Method',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      completed: 'Completed',
      sendWhatsApp: 'Send to WhatsApp',
      download: 'Download Receipt',
      secureTransaction: 'Secure Transaction Completed',
      thankYou: 'Thank you for your purchase!',
      support: 'Support: +27 100 2827'
    },
    af: {
      receipt: 'Digitale Kwitansie',
      transactionId: 'Transaksie ID',
      customer: 'Kliënt',
      phone: 'Telefoon',
      date: 'Datum',
      paymentMethod: 'Betaalmetode',
      items: 'Items',
      total: 'Totaal',
      status: 'Status',
      completed: 'Voltooid',
      sendWhatsApp: 'Stuur na WhatsApp',
      download: 'Laai Kwitansie Af',
      secureTransaction: 'Veilige Transaksie Voltooid',
      thankYou: 'Dankie vir jou aankoop!',
      support: 'Ondersteuning: +27 100 2827'
    },
    zu: {
      receipt: 'Irisidi Yedijithali',
      transactionId: 'I-ID Yentengiselwano',
      customer: 'Ikhasimende',
      phone: 'Ifoni',
      date: 'Usuku',
      paymentMethod: 'Indlela Yokukhokha',
      items: 'Izinto',
      total: 'Isamba',
      status: 'Isimo',
      completed: 'Kuqediwe',
      sendWhatsApp: 'Thumela ku-WhatsApp',
      download: 'Landa Irisidi',
      secureTransaction: 'Intengiselwano Ephephile Iqediwe',
      thankYou: 'Siyabonga ngokuthenga kwakho!',
      support: 'Usekelo: +27 100 2827'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateReceiptText = () => {
    const itemsList = items.map(item => 
      `• ${item.network} ${item.type.toUpperCase()} R${item.amount} (${item.quantity}x) - R${item.price * item.quantity}`
    ).join('\n');

    return `🌟 DIVINE MOBILE 📱
✨ ${t.receipt} ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TRANSACTION: CONFIRMED ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${t.transactionId}: ${transactionId}
${t.date}: ${formatDate(timestamp)} SAST

${t.customer}: ${customerName}
${t.phone}: ${customerPhone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 PURCHASE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

${t.total}: R${total}
${t.paymentMethod}: ${paymentMethod}
${t.status}: ${t.completed} ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SUPPORT & POLICIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${t.support}
Help: www.divinemobile.co.za/support

🌟 ${t.thankYou} 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable`;
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="border-2 border-green-200">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-green-600">{t.secureTransaction}</h2>
            <p className="text-gray-600">{t.thankYou}</p>
          </div>

          {/* Receipt Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.transactionId}:</span>
              <span className="font-mono font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.customer}:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.phone}:</span>
              <span className="font-medium">{customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.date}:</span>
              <span className="font-medium">{formatDate(timestamp)}</span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t.items}:</h3>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} ({item.quantity}x)</span>
                <span>R{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>{t.total}:</span>
              <span className="text-green-600">R{total}</span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">{t.status}: {t.completed}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onSendToWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Smartphone className="w-5 h-5" />
          {t.sendWhatsApp}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t.download}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Support Info */}
      <div className="text-center text-sm text-gray-600">
        <p>{t.support}</p>
        <p>🔒 End-to-end encrypted • ⚡ Instant delivery</p>
      </div>
    </div>
  );
};

export default WhatsAppReceiptGenerator;