
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Smartphone, Wifi, Star, 
  TrendingUp, MessageCircle, ShoppingCart, Zap
} from 'lucide-react';
import EnhancedDealsGrid from './EnhancedDealsGrid';
import { useAutoReceiptGenerator } from '../receipts/AutoReceiptGenerator';

const MobileDealsInterface = () => {
  const { sendReceiptNotifications } = useAutoReceiptGenerator();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  
  // Sample enhanced deals data
  const deals = [
    {
      id: '1',
      network: 'divinely mobile',
      amount: 50,
      price: 45,
      original_price: 50,
      deal_type: 'airtime' as const,
      discount_percentage: 10,
      validity: 'Never expires',
      features: ['Instant delivery', 'All networks', 'USSD payment', 'WhatsApp receipts'],
      popular: true,
      limited_time: false
    },
    {
      id: '2',
      network: 'mtn',
      amount: 100,
      price: 89,
      original_price: 100,
      deal_type: 'data' as const,
      discount_percentage: 11,
      validity: '30 days',
      features: ['1GB High-speed data', '4G/5G ready', 'Anytime usage', 'Auto receipt'],
      popular: true,
      limited_time: true
    },
    {
      id: '3',
      network: 'vodacom',
      amount: 20,
      price: 18,
      original_price: 20,
      deal_type: 'airtime' as const,
      discount_percentage: 10,
      validity: 'Never expires',
      features: ['Emergency top-up', 'USSD *136#', 'Instant delivery', 'SMS receipts'],
      popular: false,
      limited_time: false
    },
    {
      id: '4',
      network: 'divinely mobile',
      amount: 500,
      price: 399,
      original_price: 500,
      deal_type: 'data' as const,
      discount_percentage: 20,
      validity: '60 days',
      features: ['5GB Premium data', 'Ultra-fast speeds', 'Bonus social media', 'VIP support'],
      popular: true,
      limited_time: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Deals', icon: <Star className="w-4 h-4" /> },
    { id: 'airtime', label: 'Airtime', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Wifi className="w-4 h-4" /> },
    { id: 'popular', label: 'Popular', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const networks = [
    'all', 'divinely mobile', 'mtn', 'vodacom', 'telkom'
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.network.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.deal_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           selectedCategory === deal.deal_type ||
                           (selectedCategory === 'popular' && deal.popular);
    const matchesNetwork = selectedNetwork === 'all' || deal.network === selectedNetwork;
    
    return matchesSearch && matchesCategory && matchesNetwork;
  });

  const handleDealSelect = (deal: any) => {
    console.log('Deal selected for cart:', deal);
    // This would typically add to cart or open detailed view
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Mobile-First Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-300" />
            Airtime & Data Deals
          </CardTitle>
          <p className="text-blue-100">
            Instant USSD payments • WhatsApp receipts • Best prices guaranteed
          </p>
        </CardHeader>
      </Card>

      {/* Mobile-Optimized Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search deals, networks, or types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>

        {/* Network Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {networks.map((network) => (
            <Badge
              key={network}
              variant={selectedNetwork === network ? "default" : "outline"}
              className="cursor-pointer capitalize px-3 py-1 text-sm"
              onClick={() => setSelectedNetwork(network)}
            >
              {network === 'all' ? 'All Networks' : network}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {filteredDeals.length} deals found
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp receipts included</span>
        </div>
      </div>

      {/* Enhanced Deals Grid */}
      <EnhancedDealsGrid 
        deals={filteredDeals}
        onDealSelect={handleDealSelect}
      />

      {/* Mobile Customer Service Footer */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">24/7 Customer Support</span>
          </div>
          <p className="text-sm text-green-700 mb-3">
            Need help? Get instant assistance via WhatsApp or call our support team
          </p>
          <div className="flex gap-2 justify-center">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://wa.me/27832466539', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp Support
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open('tel:+271002827', '_blank')}
            >
              📞 Call Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDealsInterface;
