import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Minus, 
  Package, 
  Phone, 
  Wifi, 
  Smartphone, 
  Gift,
  Star,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';
import { BulkOrderProduct } from '@/types/bulkOrdering';

const ProductCatalog = () => {
  const { catalog, cartItems, addToCart, updateQuantity } = useBulkOrdering();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const getIcon = (iconName: string) => {
    const icons = {
      Phone,
      Wifi,
      Smartphone,
      Gift,
      Package
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Package;
    return <IconComponent className="w-5 h-5" />;
  };

  const getCartQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem?.quantity || 0;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!catalog) return [];

    let allProducts: BulkOrderProduct[] = [];
    
    // Collect all products from categories
    catalog.categories.forEach(category => {
      if (selectedCategory === 'all' || category.id === selectedCategory) {
        allProducts.push(...category.products);
      }
    });

    // Apply search filter
    if (searchTerm) {
      allProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply provider filter
    if (selectedProvider !== 'all') {
      allProducts = allProducts.filter(product => 
        product.provider === selectedProvider
      );
    }

    // Sort products
    allProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'stock':
          return b.stockLevel - a.stockLevel;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return allProducts;
  }, [catalog, searchTerm, selectedCategory, selectedProvider, sortBy]);

  const handleQuantityChange = (product: BulkOrderProduct, change: number) => {
    const currentQuantity = getCartQuantity(product.id);
    const newQuantity = Math.max(0, currentQuantity + change);
    
    if (newQuantity === 0) {
      // Remove from cart handled by updateQuantity
      updateQuantity(product.id, 0);
    } else if (currentQuantity === 0) {
      // Add to cart
      addToCart(product, change);
    } else {
      // Update quantity
      updateQuantity(product.id, newQuantity);
    }
  };

  if (!catalog) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Loading product catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Product Catalog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${!showFilters ? 'hidden md:grid' : ''}`}>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {catalog.categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {catalog.providers.map(provider => (
                  <SelectItem key={provider.id} value={provider.name}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-muted rounded-lg">
                    {getIcon(product.category === 'airtime' ? 'Phone' : 
                             product.category === 'data' ? 'Wifi' :
                             product.category === 'devices' ? 'Smartphone' : 'Gift')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.provider}</p>
                  </div>
                </div>
                
                {product.isPromotional && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Promo
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                
                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      R{product.price.toFixed(2)}
                    </span>
                    {product.discount && (
                      <span className="text-xs text-muted-foreground line-through">
                        R{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <Badge variant="destructive" className="text-xs">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Stock and Network Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span className={`flex items-center gap-1 ${
                    product.availability === 'in_stock' ? 'text-green-600' :
                    product.availability === 'limited' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      product.availability === 'in_stock' ? 'bg-green-500' :
                      product.availability === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    {product.stockLevel} in stock
                  </span>
                  {product.network && (
                    <span>{product.network}</span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleQuantityChange(product, -1)}
                    disabled={getCartQuantity(product.id) === 0}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  
                  <span className="text-sm font-medium min-w-[2rem] text-center">
                    {getCartQuantity(product.id)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleQuantityChange(product, 1)}
                    disabled={product.availability === 'out_of_stock'}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button
                  onClick={() => addToCart(product, 10)}
                  size="sm"
                  variant={getCartQuantity(product.id) > 0 ? "secondary" : "default"}
                  className="h-8 text-xs"
                  disabled={product.availability === 'out_of_stock'}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add 10
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No products found matching your criteria</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedProvider('all');
              }}
              className="mt-2"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductCatalog;