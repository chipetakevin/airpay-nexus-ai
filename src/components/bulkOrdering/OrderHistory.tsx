import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Search, 
  Eye, 
  Download, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  XCircle,
  Filter,
  Calendar
} from 'lucide-react';
import { useBulkOrdering } from '@/hooks/useBulkOrdering';
import { BulkOrderSummary } from '@/types/bulkOrdering';
import { format } from 'date-fns';

const OrderHistory = () => {
  const { orderHistory } = useBulkOrdering();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusIcon = (status: BulkOrderSummary['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'submitted':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: BulkOrderSummary['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.configuration.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.configuration.network.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: BulkOrderSummary) => {
    // TODO: Implement order details modal
    console.log('View order:', order);
  };

  const handleDownloadReceipt = (order: BulkOrderSummary) => {
    // TODO: Implement receipt download
    console.log('Download receipt for order:', order.orderId);
  };

  if (orderHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <History className="w-6 h-6" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No order history</h3>
            <p className="text-muted-foreground mb-4">
              Your bulk orders will appear here once you start placing them
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <History className="w-6 h-6" />
            Order History
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track and manage your bulk order history
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, provider, or network..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredOrders.length} of {orderHistory.length} orders
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

            <div className={`${!showFilters ? 'hidden md:block' : ''}`}>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 h-11">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.orderId} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base">{order.orderId}</h3>
                    <Badge className={`text-xs border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(order.createdAt), 'PPp')}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewOrder(order)}
                    className="h-8"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadReceipt(order)}
                    className="h-8"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Order Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Items</div>
                  <div className="font-medium">{order.items.reduce((sum, item) => sum + item.quantity, 0)} products</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total</div>
                  <div className="font-medium">R{order.totals.total.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Provider</div>
                  <div className="font-medium">{order.configuration.provider}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Network</div>
                  <div className="font-medium">{order.configuration.network}</div>
                </div>
              </div>

              {/* Order Progress */}
              {order.trackingInfo && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{order.trackingInfo.currentStage}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(order.trackingInfo.itemsProcessed / (order.trackingInfo.itemsProcessed + order.trackingInfo.itemsRemaining)) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{order.trackingInfo.itemsProcessed} processed</span>
                    <span>{order.trackingInfo.itemsRemaining} remaining</span>
                  </div>
                </div>
              )}

              {/* Storage Location */}
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Storage:</span>
                <Badge variant="outline" className="text-xs">
                  {order.configuration.storageLocation === 'onecard' ? 'OneCard Digital Wallet' :
                   order.configuration.storageLocation === 'revenue' ? 'Revenue Management' :
                   'Both Systems (Synchronized)'}
                </Badge>
              </div>

              {/* Estimated Delivery */}
              {order.estimatedDelivery && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Estimated completion:</span>
                  <span className="font-medium">
                    {format(new Date(order.estimatedDelivery), 'PPp')}
                  </span>
                </div>
              )}

              {/* Savings */}
              {order.totals.estimatedSavings > 0 && (
                <div className="text-sm text-green-600">
                  You saved R{order.totals.estimatedSavings.toFixed(2)} on this order!
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No orders found matching your search criteria</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
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

export default OrderHistory;