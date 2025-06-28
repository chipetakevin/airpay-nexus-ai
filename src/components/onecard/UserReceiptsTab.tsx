
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Receipt, Download, Eye, Trash2, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useReceiptStorage, StoredReceipt } from '@/hooks/useReceiptStorage';
import { useToast } from '@/hooks/use-toast';

interface UserReceiptsTabProps {
  userType: 'customer' | 'vendor' | 'admin';
  userId: string;
  isAdminView?: boolean;
}

export const UserReceiptsTab = ({ userType, userId, isAdminView = false }: UserReceiptsTabProps) => {
  const [receipts, setReceipts] = useState<StoredReceipt[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<StoredReceipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'self' | 'gift' | 'admin'>('all');
  const { getUserReceipts, getAllReceipts, getReceiptsByUserType, deleteReceipt } = useReceiptStorage();
  const { toast } = useToast();

  useEffect(() => {
    loadReceipts();
  }, [userType, userId, isAdminView]);

  useEffect(() => {
    filterReceipts();
  }, [receipts, searchTerm, filterType]);

  const loadReceipts = () => {
    let loadedReceipts: StoredReceipt[] = [];
    
    if (isAdminView) {
      // Admin can see all receipts
      loadedReceipts = getAllReceipts();
    } else {
      // Regular users see only their own receipts
      loadedReceipts = getUserReceipts(userType, userId);
    }
    
    setReceipts(loadedReceipts);
  };

  const filterReceipts = () => {
    let filtered = receipts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(receipt => 
        receipt.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.recipientPhone.includes(searchTerm) ||
        (receipt.recipientName && receipt.recipientName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(receipt => {
        switch (filterType) {
          case 'self':
            return receipt.purchaseType === 'self';
          case 'gift':
            return receipt.purchaseType === 'sender' || receipt.purchaseType === 'recipient';
          case 'admin':
            return receipt.purchaseType === 'admin_notification';
          default:
            return true;
        }
      });
    }

    setFilteredReceipts(filtered);
  };

  const handleDeleteReceipt = (receipt: StoredReceipt) => {
    if (deleteReceipt(receipt.id, receipt.userType, receipt.userId)) {
      loadReceipts(); // Reload receipts after deletion
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPurchaseTypeLabel = (type: string) => {
    switch (type) {
      case 'self':
        return 'Self Purchase';
      case 'sender':
        return 'Gift Sent';
      case 'recipient':
        return 'Gift Received';
      case 'admin_notification':
        return 'Admin Notification';
      default:
        return type;
    }
  };

  if (filteredReceipts.length === 0 && searchTerm === '' && filterType === 'all') {
    return (
      <div className="space-y-4 p-4">
        <Card className="w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Receipt className="w-5 h-5" />
              {isAdminView ? 'All User Receipts' : 'My Receipts'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-sm">
              {isAdminView 
                ? 'No receipts found across all users' 
                : 'No receipts yet. Complete a purchase to see your receipt history!'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 max-w-full">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {isAdminView ? `All User Receipts (${filteredReceipts.length})` : `My Receipts (${filteredReceipts.length})`}
          </CardTitle>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'self' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('self')}
              >
                Self
              </Button>
              <Button
                variant={filterType === 'gift' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('gift')}
              >
                Gifts
              </Button>
              {isAdminView && (
                <Button
                  variant={filterType === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('admin')}
                >
                  Admin
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3">
          <div className="space-y-4">
            {filteredReceipts.map((receipt) => (
              <Card key={receipt.id} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Receipt Header */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-600">
                          {receipt.transactionId}
                        </span>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(receipt.status)} variant="secondary">
                            {receipt.status}
                          </Badge>
                          {isAdminView && (
                            <Badge variant="outline" className="text-xs">
                              {receipt.userType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {getPurchaseTypeLabel(receipt.purchaseType)}
                      </Badge>
                    </div>
                    
                    {/* Receipt Details */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Customer:</span>
                          <span className="font-semibold text-right">{receipt.customerName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Items:</span>
                          <span className="font-semibold text-right">
                            {receipt.items.length} item{receipt.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Total:</span>
                          <span className="font-bold text-green-600 text-right">R{receipt.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Cashback:</span>
                          <span className="font-bold text-green-600 text-right">
                            R{receipt.cashbackEarned.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Recipient:</span>
                          <span className="font-semibold text-right">
                            {receipt.recipientName || receipt.recipientPhone}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 font-medium">Date:</span>
                          <span className="text-xs text-gray-500 text-right">
                            {formatDate(receipt.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delivery Status */}
                    <div className="flex gap-2 text-xs">
                      <Badge variant={receipt.whatsappDelivered ? "default" : "destructive"}>
                        📱 WhatsApp: {receipt.whatsappDelivered ? 'Sent' : 'Failed'}
                      </Badge>
                      <Badge variant={receipt.emailDelivered ? "default" : "secondary"}>
                        📧 Email: {receipt.emailDelivered ? 'Sent' : 'N/A'}
                      </Badge>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        {(isAdminView || receipt.userType === userType) && (
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="text-xs"
                            onClick={() => handleDeleteReceipt(receipt)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReceiptsTab;
