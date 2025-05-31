
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart as CartIcon, 
  User, 
  Phone, 
  CreditCard, 
  AlertTriangle,
  CheckCircle,
  Gift,
  ArrowLeft
} from 'lucide-react';
import NetworkDetector from './NetworkDetector';
import PurchaseProcessor from './PurchaseProcessor';
import RicaValidator from './RicaValidator';

interface CartItem {
  id: string;
  network: string;
  amount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  vendor: string;
  dealType: 'airtime' | 'data';
  bonus?: string;
}

interface ShoppingCartProps {
  initialDeal?: CartItem;
  onClose: () => void;
}

const ShoppingCart = ({ initialDeal, onClose }: ShoppingCartProps) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialDeal ? [initialDeal] : []);
  const [purchaseMode, setPurchaseMode] = useState<'self' | 'other'>('self');
  const [recipientData, setRecipientData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [customerPhone, setCustomerPhone] = useState('');
  const [detectedNetwork, setDetectedNetwork] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load customer data from localStorage
    const storedUser = localStorage.getItem('onecardUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCustomerPhone(userData.phoneNumber || '');
    }
  }, []);

  const validatePhoneNumber = async (phoneNumber: string) => {
    setIsValidating(true);
    setValidationError('');
    
    try {
      // Simulate RICA validation and network detection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const networkFromPrefix = detectNetworkFromPrefix(phoneNumber);
      setDetectedNetwork(networkFromPrefix);
      
      // Check if network matches cart items
      const networkMismatch = cartItems.some(item => 
        item.network.toLowerCase() !== networkFromPrefix.toLowerCase()
      );
      
      if (networkMismatch && cartItems.length > 0) {
        setValidationError(
          `This number belongs to ${networkFromPrefix}. Please select a ${networkFromPrefix} deal or use a different number.`
        );
      }
    } catch (error) {
      setValidationError('Unable to validate number. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const detectNetworkFromPrefix = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('27')) {
      const prefix = cleanPhone.substring(2, 5);
      if (['083', '084', '073', '074'].includes(prefix)) return 'MTN';
      if (['082', '071', '072', '060', '061', '062', '063', '064', '065', '066', '067', '068', '069'].includes(prefix)) return 'Vodacom';
      if (['084', '076'].includes(prefix)) return 'Cell C';
      if (['081', '079'].includes(prefix)) return 'Telkom';
    }
    return 'Unknown';
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice, 0);
    const cashback = subtotal * 0.025; // 2.5% cashback
    const adminFee = subtotal * 0.025; // 2.5% admin markup
    const total = subtotal;
    
    return { subtotal, cashback, adminFee, total };
  };

  const processPurchase = async () => {
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate purchase processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const { total, cashback } = calculateTotals();
      const purchaseData = {
        items: cartItems,
        recipient: purchaseMode === 'other' ? recipientData : { 
          name: 'Self', 
          phone: customerPhone 
        },
        total,
        cashback,
        timestamp: new Date().toISOString()
      };

      // Update user's cashback balance
      const storedUser = localStorage.getItem('onecardUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.cashbackBalance = (userData.cashbackBalance || 0) + cashback;
        userData.totalSpent = (userData.totalSpent || 0) + total;
        userData.totalEarned = (userData.totalEarned || 0) + cashback;
        localStorage.setItem('onecardUser', JSON.stringify(userData));
      }

      toast({
        title: "Purchase Successful! 🎉",
        description: `Airtime purchased successfully. R${cashback.toFixed(2)} cashback earned!`
      });

      // Reset cart and close
      setCartItems([]);
      onClose();
      
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to process purchase. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const { subtotal, cashback, total } = calculateTotals();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CartIcon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Smart Shopping Cart</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Cart Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Cart Items</h3>
            {cartItems.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.network}</Badge>
                      <span className="text-sm font-medium">R{item.amount} Airtime</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      from {item.vendor} • -{item.discount}% off
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-gray-500 text-xs">R{item.originalPrice}</span>
                      <span className="font-bold text-green-600">R{item.discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCartItems([])}>
                    ×
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Purchase Mode Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Purchase For</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={purchaseMode === 'self' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPurchaseMode('self')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Myself
              </Button>
              <Button
                variant={purchaseMode === 'other' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPurchaseMode('other')}
                className="flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Someone Else
              </Button>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">
              {purchaseMode === 'self' ? 'Your Details' : 'Recipient Details'}
            </h3>
            
            {purchaseMode === 'other' && (
              <>
                <div>
                  <Label htmlFor="recipientName" className="text-xs">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    value={recipientData.name}
                    onChange={(e) => setRecipientData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter recipient name"
                    className="h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship" className="text-xs">Relationship</Label>
                  <Input
                    id="relationship"
                    value={recipientData.relationship}
                    onChange={(e) => setRecipientData(prev => ({ ...prev, relationship: e.target.value }))}
                    placeholder="e.g., Family, Friend, Colleague"
                    className="h-9"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="phone" className="text-xs">
                {purchaseMode === 'self' ? 'Your Phone Number' : 'Recipient Phone Number'}
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  value={purchaseMode === 'self' ? customerPhone : recipientData.phone}
                  onChange={(e) => {
                    const phone = e.target.value;
                    if (purchaseMode === 'self') {
                      setCustomerPhone(phone);
                    } else {
                      setRecipientData(prev => ({ ...prev, phone }));
                    }
                    if (phone.length >= 10) {
                      validatePhoneNumber(phone);
                    }
                  }}
                  placeholder="+27 XX XXX XXXX"
                  className="h-9"
                  disabled={purchaseMode === 'self'}
                />
                {isValidating && (
                  <div className="absolute right-2 top-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              {detectedNetwork && (
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600">Detected: {detectedNetwork}</span>
                </div>
              )}
              
              {validationError && (
                <div className="flex items-center gap-2 mt-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-red-600">{validationError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>OneCard Cashback (2.5%):</span>
                <span>+R{cashback.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>R{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Button */}
          <Button
            onClick={processPurchase}
            disabled={isProcessing || !!validationError || cartItems.length === 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Complete Purchase - R{total.toFixed(2)}
              </div>
            )}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            🔒 Secured by OneCard • Bank-level encryption
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
