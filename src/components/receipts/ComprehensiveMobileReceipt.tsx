
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Share2, CheckCircle } from 'lucide-react';

interface ComprehensiveReceiptProps {
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
      network: string;
      type: string;
    }>;
    subtotal: number;
    discounts: number;
    tax: number;
    totalPaid: number;
    paymentMethod: string;
    cashbackEarned: number;
    deliveryPhone: string;
    vendor?: {
      name: string;
      id: string;
      commission: number;
    };
  };
  onShare: () => void;
  onDownload: () => void;
}

export const ComprehensiveMobileReceipt = ({ receiptData, onShare, onDownload }: ComprehensiveReceiptProps) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full mr-3">
              <span className="text-2xl">📱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">DIVINELY MOBILE</h1>
              <p className="text-sm opacity-90">Official Receipt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-600">Receipt No:</span>
            <div className="font-mono text-indigo-600 font-semibold">{receiptData.receiptNo}</div>
          </div>
          <div>
            <span className="text-gray-600">Transaction ID:</span>
            <div className="font-mono text-indigo-600 font-semibold">{receiptData.transactionId}</div>
          </div>
        </div>
        <div className="mt-2 text-xs">
          <span className="text-gray-600">Date & Time:</span>
          <div className="font-semibold">{receiptData.dateTime}</div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-2">Customer Details</h3>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold">{receiptData.customer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Mobile:</span>
            <span className="font-semibold">{receiptData.customer.mobile}</span>
          </div>
          {receiptData.customer.email && (
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-xs">{receiptData.customer.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Purchase Details</h3>
        <div className="space-y-2">
          {receiptData.items.map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-600">
                    {item.network.toUpperCase()} • {item.type.toUpperCase()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-green-600">R{item.subtotal.toFixed(2)}</div>
                  <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R{receiptData.subtotal.toFixed(2)}</span>
            </div>
            {receiptData.discounts > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discounts:</span>
                <span>-R{receiptData.discounts.toFixed(2)}</span>
              </div>
            )}
            {receiptData.tax > 0 && (
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>R{receiptData.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-indigo-300 pt-2">
              <div className="flex justify-between font-bold text-lg text-indigo-800">
                <span>TOTAL PAID:</span>
                <span>R{receiptData.totalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-semibold">{receiptData.paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* Status & Rewards */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-center bg-green-50 p-3 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <div className="text-center">
            <p className="text-sm font-bold text-green-800">Payment Successful</p>
            <p className="text-xs text-green-600">Delivered to {receiptData.deliveryPhone}</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <span className="text-xl mr-2">🎁</span>
          <div className="text-center">
            <p className="text-sm font-bold text-yellow-800">Cashback Earned</p>
            <p className="text-lg font-bold text-yellow-600">R{receiptData.cashbackEarned.toFixed(2)}</p>
          </div>
        </div>

        {receiptData.vendor && (
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="text-center">
              <p className="text-xs font-bold text-purple-800">Agent Details</p>
              <p className="text-xs text-purple-600">{receiptData.vendor.name}</p>
              <p className="text-xs text-purple-600">Commission: R{receiptData.vendor.commission.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 space-y-2">
        <div className="flex gap-2">
          <Button onClick={onShare} size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-xs">
            <Share2 className="w-3 h-3 mr-1" />
            Share WhatsApp
          </Button>
          <Button onClick={onDownload} size="sm" variant="outline" className="flex-1 text-xs">
            <Download className="w-3 h-3 mr-1" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm font-bold mb-1">Thank you for choosing Divinely Mobile!</p>
        <p className="text-xs opacity-75 italic">Fast • Secure • Reliable</p>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="text-xs opacity-60">Support: +27 100 2827 | myonecard.co.za</p>
        </div>
      </div>
    </div>
  );
};
