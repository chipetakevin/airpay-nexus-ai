export interface BulkOrderProduct {
  id: string;
  name: string;
  type: 'airtime' | 'data' | 'sim' | 'device' | 'promotional';
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discount?: number;
  network?: string;
  provider: string;
  availability: 'in_stock' | 'limited' | 'out_of_stock';
  stockLevel: number;
  isPromotional?: boolean;
  promotionalBundle?: string;
  imageUrl?: string;
  specifications?: Record<string, any>;
}

export interface BulkCartItem extends BulkOrderProduct {
  quantity: number;
  totalPrice: number;
  customAssignments?: {
    customerId?: string;
    customerGroup?: string;
    notes?: string;
  };
}

export interface StorageLocation {
  id: 'onecard' | 'revenue' | 'both';
  name: string;
  description: string;
  icon: string;
  available: boolean;
  capacity?: number;
  currentUsage?: number;
}

export interface BulkOrderConfiguration {
  provider: string;
  network: string;
  storageLocation: StorageLocation['id'];
  customerAssignments: {
    type: 'individual' | 'group' | 'bulk';
    customers?: string[];
    groups?: string[];
    autoDistribute?: boolean;
  };
  deliveryPreferences: {
    immediate: boolean;
    scheduled?: Date;
    batchSize?: number;
  };
}

export interface BulkOrderSummary {
  orderId: string;
  items: BulkCartItem[];
  configuration: BulkOrderConfiguration;
  totals: {
    subtotal: number;
    discounts: number;
    total: number;
    estimatedSavings: number;
  };
  status: 'draft' | 'submitted' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingInfo?: {
    itemsProcessed: number;
    itemsRemaining: number;
    currentStage: string;
  };
}

export interface ProductCatalog {
  categories: {
    id: string;
    name: string;
    description: string;
    icon: string;
    products: BulkOrderProduct[];
  }[];
  providers: {
    id: string;
    name: string;
    networks: string[];
    available: boolean;
  }[];
  promotions: {
    id: string;
    title: string;
    description: string;
    products: string[];
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    validUntil: Date;
  }[];
}

export interface InventoryLevel {
  productId: string;
  storageLocation: StorageLocation['id'];
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  lastUpdated: Date;
}

export interface CustomerAssignment {
  customerId: string;
  customerName: string;
  customerType: 'individual' | 'business';
  products: {
    productId: string;
    quantity: number;
    storageLocation: StorageLocation['id'];
    assignedAt: Date;
  }[];
  totalValue: number;
  status: 'pending' | 'assigned' | 'delivered';
}