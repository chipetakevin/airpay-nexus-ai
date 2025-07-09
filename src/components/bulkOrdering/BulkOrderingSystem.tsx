import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, BarChart3, History, Settings } from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';
import ProductCatalog from './ProductCatalog';
import BulkShoppingCart from './BulkShoppingCart';
import OrderConfiguration from './OrderConfiguration';
import OrderHistory from './OrderHistory';
import InventoryDashboard from './InventoryDashboard';

const BulkOrderingSystem = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [showCart, setShowCart] = useState(false);
  
  const {
    catalog,
    cartItems,
    configuration,
    storageLocations,
    orderHistory,
    calculateTotals,
    submitOrder,
    isLoading
  } = useBulkOrdering();

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Bulk Ordering</h1>
                <p className="text-xs text-muted-foreground">Divine Mobile Wholesale</p>
              </div>
            </div>
            
            {/* Cart Button */}
            <Button
              onClick={() => setShowCart(true)}
              variant="outline"
              size="sm"
              className="relative h-10 w-10 p-0 md:w-auto md:px-4"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Cart</span>
              {cartItems.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {totals.itemCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Quick Stats */}
          {cartItems.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cart Total:</span>
                <span className="font-semibold text-foreground">R{totals.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{totals.itemCount} items</span>
                <span className="text-green-600">Save R{totals.estimatedSavings.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile-First Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger 
              value="catalog" 
              className="flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Catalog</span>
              <span className="sm:hidden">Shop</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="inventory" 
              className="flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Inventory</span>
              <span className="sm:hidden">Stock</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="config" 
              className="flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config</span>
              <span className="sm:hidden">Setup</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="history" 
              className="flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>

            <TabsTrigger 
              value="analytics" 
              className="hidden md:flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="mt-6">
            <TabsContent value="catalog" className="space-y-6">
              <ProductCatalog />
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <InventoryDashboard />
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              <OrderConfiguration />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Bulk Order Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics dashboard coming soon</p>
                    <p className="text-sm">Track your bulk order performance and savings</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bulk Shopping Cart Modal */}
      <BulkShoppingCart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          onClick={() => setShowCart(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg relative"
          disabled={cartItems.length === 0}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-6 w-6 p-0 text-xs flex items-center justify-center bg-destructive text-destructive-foreground"
            >
              {totals.itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BulkOrderingSystem;