
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CreditCard, User, Users, Gift } from 'lucide-react';
import { CartItem } from '@/types/deals';
import PaymentMethodSelector from './PaymentMethodSelector';
import { useToast } from '@/hooks/use-toast';
import { useShoppingCart } from '@/hooks/useShoppingCart';

interface ShoppingCartContentProps {
  initialDeal?: CartItem;
}

const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({ initialDeal }) => {
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'admin'>('customer');

  const {
    cartItems,
    setCartItems,
    purchaseMode,
    setPurchaseMode,
    recipientData,
    setRecipientData,
    customerPhone,
    setCustomerPhone,
    isProcessing,
    currentUser,
    isVendor,
    isAuthenticated,
    calculateTotals,
    processPurchase
  } = useShoppingCart(initialDeal);

  // Initialize cart and detect user type
  useEffect(() => {
    // Detect user type from stored credentials
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsed = JSON.parse(credentials);
        setUserType(parsed.userType || 'customer');
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, []);

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
    toast({
      title: "Payment Method Selected",
      description: `${method.displayName} will be used for this purchase.`,
    });
  };

  const handleCompletePurchase = async () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    let validationError = '';
    
    if (cartItems.length === 0) {
      validationError = 'Your cart is empty';
    } else if (purchaseMode === 'other' && (!recipientData.name || !recipientData.phone)) {
      validationError = 'Please provide recipient details for third-party purchases';
    } else if (!customerPhone) {
      validationError = 'Customer phone number is required';
    }

    // Process the purchase using the existing shopping cart logic
    const success = await processPurchase(validationError, 'Auto-detected');
    
    if (success) {
      // Clear cart and selected payment method on success
      setCartItems([]);
      setSelectedPaymentMethod(null);
    }
  };

  const totals = calculateTotals();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some deals to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{item.network} {item.dealType}</h4>
                <p className="text-sm text-gray-600">R{item.amount} {item.dealType}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.discount}% OFF
                  </Badge>
                  {item.bonus && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Gift className="w-3 h-3 mr-1" />
                      {item.bonus}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">R{item.originalPrice.toFixed(2)}</span>
                  <span className="font-medium text-green-600">R{item.discountedPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-green-600">Save R{(item.originalPrice - item.discountedPrice).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <PaymentMethodSelector
        userType={userType}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        selectedMethod={selectedPaymentMethod?.id}
      />

      {/* Order Summary */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <CreditCard className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>R{totals.customerPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>You Save:</span>
              <span>-R{(totals.total - totals.customerPrice).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>R{totals.customerPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-blue-600">
              <span>Cashback Earned:</span>
              <span>R{(totals.profitSharing.customerCashback || totals.profitSharing.adminCashback || totals.profitSharing.vendorProfit || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800 mb-2">
              <User className="w-4 h-4" />
              <span className="font-medium">Payment Details</span>
            </div>
            {selectedPaymentMethod ? (
              <div className="text-sm text-blue-700">
                <p>Method: {selectedPaymentMethod.displayName}</p>
                <p>Type: {selectedPaymentMethod.type === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Please select a payment method above</p>
            )}
          </div>

          <Button
            onClick={handleCompletePurchase}
            disabled={!selectedPaymentMethod || isProcessing || !isAuthenticated}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Complete Purchase - R{totals.customerPrice.toFixed(2)}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-600">
            🔒 Your payment information is secure and encrypted. All transactions are processed safely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCartContent;
