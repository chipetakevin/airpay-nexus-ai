import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Package, 
  CreditCard,
  CheckCircle,
  Clock,
  TrendingDown
} from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';

interface BulkShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkShoppingCart = ({ isOpen, onClose }: BulkShoppingCartProps) => {
  const {
    cartItems,
    configuration,
    storageLocations,
    updateQuantity,
    removeFromCart,
    calculateTotals,
    submitOrder,
    isLoading
  } = useBulkOrdering();

  const totals = calculateTotals();
  const selectedStorage = storageLocations.find(loc => loc.id === configuration.storageLocation);

  const handleSubmitOrder = async () => {
    const order = await submitOrder();
    if (order) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="w-6 h-6" />
            Bulk Order Cart
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 px-6">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">
                Add products from the catalog to start building your bulk order
              </p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Order Items ({totals.itemCount})</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cartItems.forEach(item => removeFromCart(item.id))}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                </div>

                <ScrollArea className="h-80 lg:h-96">
                  <div className="space-y-3 pr-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{item.name}</h4>
                              {item.isPromotional && (
                                <Badge variant="secondary" className="text-xs">Promo</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="font-semibold">R{item.price.toFixed(2)}</span>
                                {item.discount && (
                                  <span className="text-xs text-muted-foreground line-through ml-2">
                                    R{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm font-medium">
                                R{item.totalPrice.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>

                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totals.itemCount} items)</span>
                      <span>R{totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    {totals.discounts > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Discounts & Savings
                        </span>
                        <span>-R{totals.discounts.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">R{totals.total.toFixed(2)}</span>
                    </div>

                    {totals.estimatedSavings > 0 && (
                      <div className="text-xs text-green-600 text-center">
                        You save R{totals.estimatedSavings.toFixed(2)}!
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Storage Location */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Storage Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedStorage && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {selectedStorage.name}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {selectedStorage.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Configuration Status */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Provider:</span>
                      <span className={configuration.provider ? 'text-foreground' : 'text-muted-foreground'}>
                        {configuration.provider || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Network:</span>
                      <span className={configuration.network ? 'text-foreground' : 'text-muted-foreground'}>
                        {configuration.network || 'Not selected'}
                      </span>
                    </div>
                    
                    {(!configuration.provider || !configuration.network) && (
                      <p className="text-xs text-yellow-600 mt-2">
                        Complete configuration before ordering
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Order Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isLoading || !configuration.provider || !configuration.network}
                    className="w-full h-12 text-base font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Bulk Order
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkShoppingCart;