import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from './useMobileAuth';
import { 
  BulkOrderProduct, 
  BulkCartItem, 
  BulkOrderConfiguration, 
  BulkOrderSummary,
  StorageLocation,
  ProductCatalog,
  InventoryLevel,
  CustomerAssignment
} from '@/types/bulkOrdering';

export const useBulkOrdering = () => {
  const { toast } = useToast();
  const { currentUser, userType } = useMobileAuth();
  
  const [catalog, setCatalog] = useState<ProductCatalog | null>(null);
  const [cartItems, setCartItems] = useState<BulkCartItem[]>([]);
  const [configuration, setConfiguration] = useState<BulkOrderConfiguration>({
    provider: '',
    network: '',
    storageLocation: 'onecard',
    customerAssignments: {
      type: 'bulk',
      autoDistribute: true
    },
    deliveryPreferences: {
      immediate: true
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState<InventoryLevel[]>([]);
  const [orderHistory, setOrderHistory] = useState<BulkOrderSummary[]>([]);

  // Storage locations configuration
  const storageLocations: StorageLocation[] = [
    {
      id: 'onecard',
      name: 'OneCard Digital Wallet',
      description: 'Digital wallet for instant customer access and cashback rewards',
      icon: 'Wallet',
      available: true,
      capacity: 1000000,
      currentUsage: 750000
    },
    {
      id: 'revenue',
      name: 'Revenue Management',
      description: 'Centralized system for tracking, reporting, and bulk distribution',
      icon: 'BarChart3',
      available: true,
      capacity: 5000000,
      currentUsage: 2100000
    },
    {
      id: 'both',
      name: 'Both Systems (Synchronized)',
      description: 'Dual storage for flexibility, redundancy, and real-time sync',
      icon: 'RefreshCw',
      available: true
    }
  ];

  // Initialize catalog with comprehensive product data
  const initializeCatalog = useCallback(() => {
    const sampleCatalog: ProductCatalog = {
      categories: [
        {
          id: 'airtime',
          name: 'Airtime',
          description: 'Voice calling credits for all networks',
          icon: 'Phone',
          products: [
            {
              id: 'airtime-10',
              name: 'R10 Airtime',
              type: 'airtime',
              category: 'airtime',
              description: 'R10 airtime credit for all South African networks',
              price: 9.50,
              originalPrice: 10.00,
              discount: 5,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 10000,
              network: 'All Networks'
            },
            {
              id: 'airtime-20',
              name: 'R20 Airtime',
              type: 'airtime',
              category: 'airtime',
              description: 'R20 airtime credit for all South African networks',
              price: 19.00,
              originalPrice: 20.00,
              discount: 5,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 8500,
              network: 'All Networks'
            },
            {
              id: 'airtime-50',
              name: 'R50 Airtime',
              type: 'airtime',
              category: 'airtime',
              description: 'R50 airtime credit for all South African networks',
              price: 47.50,
              originalPrice: 50.00,
              discount: 5,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 5000,
              network: 'All Networks'
            }
          ]
        },
        {
          id: 'data',
          name: 'Data Bundles',
          description: 'Internet data packages for mobile devices',
          icon: 'Wifi',
          products: [
            {
              id: 'data-1gb',
              name: '1GB Data Bundle',
              type: 'data',
              category: 'data',
              description: '1GB monthly data bundle valid for 30 days',
              price: 75.00,
              originalPrice: 89.00,
              discount: 16,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 3000,
              network: 'All Networks'
            },
            {
              id: 'data-5gb',
              name: '5GB Data Bundle',
              type: 'data',
              category: 'data',
              description: '5GB monthly data bundle valid for 30 days',
              price: 350.00,
              originalPrice: 399.00,
              discount: 12,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 2500,
              network: 'All Networks'
            }
          ]
        },
        {
          id: 'devices',
          name: 'Devices',
          description: 'Mobile devices and accessories',
          icon: 'Smartphone',
          products: [
            {
              id: 'sim-card',
              name: 'Divine Mobile SIM Card',
              type: 'sim',
              category: 'devices',
              description: 'Triple-cut SIM card compatible with all devices',
              price: 5.00,
              originalPrice: 10.00,
              discount: 50,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 15000,
              specifications: { type: 'Triple-cut', compatibility: 'All networks' }
            }
          ]
        },
        {
          id: 'promotional',
          name: 'Promotional Bundles',
          description: 'Special offers and promotional packages',
          icon: 'Gift',
          products: [
            {
              id: 'starter-pack',
              name: 'Divine Mobile Starter Pack',
              type: 'promotional',
              category: 'promotional',
              description: 'SIM + R20 Airtime + 1GB Data Bundle',
              price: 75.00,
              originalPrice: 104.00,
              discount: 28,
              provider: 'Divine Mobile',
              availability: 'in_stock',
              stockLevel: 1000,
              isPromotional: true,
              promotionalBundle: 'New Customer Special'
            }
          ]
        }
      ],
      providers: [
        {
          id: 'divine-mobile',
          name: 'Divine Mobile',
          networks: ['Vodacom', 'MTN', 'Cell C', 'Telkom'],
          available: true
        }
      ],
      promotions: [
        {
          id: 'bulk-discount',
          title: 'Bulk Purchase Discount',
          description: 'Additional 5% off orders over R1000',
          products: ['*'],
          discountType: 'percentage',
          discountValue: 5,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      ]
    };
    
    setCatalog(sampleCatalog);
  }, []);

  // Add item to bulk cart
  const addToCart = useCallback((product: BulkOrderProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          totalPrice: (updated[existingIndex].quantity + quantity) * product.price
        };
        return updated;
      } else {
        const newItem: BulkCartItem = {
          ...product,
          quantity,
          totalPrice: quantity * product.price
        };
        return [...prev, newItem];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to bulk order`,
      duration: 2000
    });
  }, [toast]);

  // Update item quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
      return;
    }

    setCartItems(prev => prev.map(item =>
      item.id === productId
        ? { ...item, quantity, totalPrice: quantity * item.price }
        : item
    ));
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Item Removed",
      description: "Item removed from bulk order",
      duration: 2000
    });
  }, [toast]);

  // Calculate cart totals
  const calculateTotals = useCallback(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalOriginalPrice = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const discounts = totalOriginalPrice - subtotal;
    
    // Apply bulk discount if applicable
    let bulkDiscount = 0;
    if (subtotal > 1000) {
      bulkDiscount = subtotal * 0.05; // 5% bulk discount
    }
    
    const total = subtotal - bulkDiscount;
    const estimatedSavings = discounts + bulkDiscount;

    return {
      subtotal,
      discounts: discounts + bulkDiscount,
      total,
      estimatedSavings,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [cartItems]);

  // Get recommended storage location
  const getRecommendedStorage = useCallback((items: BulkCartItem[]) => {
    const hasPromotional = items.some(item => item.isPromotional);
    const totalValue = calculateTotals().total;
    const hasHighVolume = items.some(item => item.quantity > 100);

    if (hasPromotional || totalValue > 5000) {
      return 'both'; // High-value or promotional items get dual storage
    } else if (hasHighVolume || totalValue > 1000) {
      return 'revenue'; // Bulk items go to revenue management
    } else {
      return 'onecard'; // Small orders go to OneCard wallet
    }
  }, [calculateTotals]);

  // Submit bulk order
  const submitOrder = useCallback(async (): Promise<BulkOrderSummary | null> => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your bulk order",
        variant: "destructive"
      });
      return null;
    }

    if (!configuration.provider || !configuration.network) {
      toast({
        title: "Configuration Required",
        description: "Please select provider and network",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);

    try {
      const totals = calculateTotals();
      const orderId = `BULK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const orderSummary: BulkOrderSummary = {
        orderId,
        items: [...cartItems],
        configuration: { ...configuration },
        totals,
        status: 'submitted',
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        trackingInfo: {
          itemsProcessed: 0,
          itemsRemaining: totals.itemCount,
          currentStage: 'Order Submitted'
        }
      };

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add to order history
      setOrderHistory(prev => [orderSummary, ...prev]);
      
      // Clear cart
      setCartItems([]);
      
      // Reset configuration
      setConfiguration(prev => ({
        ...prev,
        provider: '',
        network: ''
      }));

      toast({
        title: "Order Submitted Successfully",
        description: `Bulk order ${orderId} has been submitted for processing`,
        duration: 4000
      });

      return orderSummary;

    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Order Failed",
        description: "Failed to submit bulk order. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [cartItems, configuration, calculateTotals, toast]);

  // Initialize on mount
  useEffect(() => {
    initializeCatalog();
  }, [initializeCatalog]);

  // Auto-recommend storage location when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      const recommended = getRecommendedStorage(cartItems);
      setConfiguration(prev => ({
        ...prev,
        storageLocation: recommended
      }));
    }
  }, [cartItems, getRecommendedStorage]);

  return {
    // Data
    catalog,
    cartItems,
    configuration,
    storageLocations,
    inventory,
    orderHistory,
    isLoading,
    
    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    setConfiguration,
    submitOrder,
    
    // Calculations
    calculateTotals,
    getRecommendedStorage
  };
};