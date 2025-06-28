
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Share2, Eye, CheckCircle } from 'lucide-react';

interface ReceiptPreviewProps {
  receiptData: {
    receiptNo: string;
    transactionId: string;
    dateTime: string;
    customer: {
      name: string;
      mobile: string;
      email?: string;
    };
    items: Array<{
      name: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }>;
    totalPaid: number;
    cashbackEarned: number;
    paymentMethod: string;
    deliveryPhone: string;
  };
  onShare: () => void;
  onDownload: () => void;
}

export const MobileReceiptPreview = ({ receiptData, onShare, onDownload }: ReceiptPreviewProps) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <span className="text-2xl">📱</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">DIVINE MOBILE</h1>
            <p className="text-sm opacity-90">Official Receipt</p>
          </div>
        </div>
      </div>

      {/* Receipt Details */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Receipt No:</span>
          <Badge variant="outline" className="text-xs">{receiptData.receiptNo}</Badge>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-600">Transaction ID:</span>
          <span className="text-xs font-mono text-blue-600">{receiptData.transactionId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Date & Time:</span>
          <span className="text-xs">{receiptData.dateTime}</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Customer Details</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">Name:</span>
            <span className="text-xs font-medium">{receiptData.customer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">Mobile:</span>
            <span className="text-xs font-medium">{receiptData.customer.mobile}</span>
          </div>
          {receiptData.customer.email && (
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Email:</span>
              <span className="text-xs font-medium">{receiptData.customer.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Purchase Details</h3>
        <div className="space-y-3">
          {receiptData.items.map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
                <span className="text-sm font-bold text-green-600">R{item.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Qty: {item.quantity}</span>
                <span>Unit: R{item.unitPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-4 border-b">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-gray-800">TOTAL PAID:</span>
            <span className="text-lg font-bold text-blue-600">R{receiptData.totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Payment Method:</span>
            <span>{receiptData.paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* Status & Rewards */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-center bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <div className="text-center">
            <p className="text-sm font-semibold text-green-800">Payment Successful</p>
            <p className="text-xs text-green-600">Delivered to {receiptData.deliveryPhone}</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-yellow-50 p-3 rounded-lg">
          <span className="text-xl mr-2">🎁</span>
          <div className="text-center">
            <p className="text-sm font-semibold text-yellow-800">Cashback Earned</p>
            <p className="text-lg font-bold text-yellow-600">R{receiptData.cashbackEarned.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 space-y-2">
        <div className="flex gap-2">
          <Button onClick={onShare} size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
            <Share2 className="w-4 h-4 mr-1" />
            Share via WhatsApp
          </Button>
          <Button onClick={onDownload} size="sm" variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm font-semibold mb-1">Thank you for choosing Divine Mobile!</p>
        <p className="text-xs opacity-75 italic">Fast • Secure • Reliable</p>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="text-xs opacity-60">Support: +27 100 2827 | myonecard.co.za</p>
        </div>
      </div>
    </div>
  );
};
