
import React, { useState } from 'react';
import { CartItem } from '@/types/deals';
import { useDealsData } from '@/hooks/useDealsData';
import DealsHeader from './deals/DealsHeader';
import DealsFiltersSection from './deals/DealsFiltersSection';
import DealsGrid from './deals/DealsGrid';
import SystemInfo from './deals/SystemInfo';
import ShoppingCart from './ShoppingCart';
import AuthenticationIndicator from './deals/AuthenticationIndicator';
import ServiceAccessGate from './auth/ServiceAccessGate';
import CrossPlatformNavigation from './navigation/CrossPlatformNavigation';

const AirtimeDealsSystem = () => {
  const { deals, isLoading, lastRefresh, scrapingStatus, handleManualRefresh } = useDealsData();
  const [selectedNetwork, setSelectedNetwork] = useState('divine mobile');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDealType, setSelectedDealType] = useState('airtime');
  const [showCart, setShowCart] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<CartItem | null>(null);

  // Check authentication status
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';

  const filteredDeals = deals.filter(deal => {
    const networkMatch = selectedNetwork === 'all' || deal.network.toLowerCase() === selectedNetwork.toLowerCase();
    const amountMatch = selectedAmount === 'all' || deal.amount === parseInt(selectedAmount);
    const dealTypeMatch = selectedDealType === 'all' || deal.deal_type === selectedDealType;
    return networkMatch && amountMatch && dealTypeMatch;
  });

  const handleGrabDeal = (cartItem: CartItem) => {
    if (!isAuthenticated) {
      // Redirect to registration instead of showing cart
      window.location.href = '/portal?tab=registration';
      return;
    }
    setSelectedDeal(cartItem);
    setShowCart(true);
  };

  const handleNavigateToRegistration = () => {
    window.location.href = '/portal?tab=registration';
  };

  const handleClearFilters = () => {
    setSelectedNetwork('divine mobile');
    setSelectedAmount('all');
    setSelectedDealType('airtime');
  };

  // Show loading state first
  if (isLoading) {
    return (
      <div className="space-y-6 pb-8 mobile-deals-container">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 mobile-deals-container">
      {/* Cross-Platform Navigation */}
      <CrossPlatformNavigation currentPlatform="portal" />

      {/* Authentication Indicator */}
      <AuthenticationIndicator />

      {/* Header Section */}
      <DealsHeader
        lastRefresh={lastRefresh}
        scrapingStatus={scrapingStatus}
        isLoading={isLoading}
        onManualRefresh={handleManualRefresh}
      />

      {/* Enhanced Filters */}
      <DealsFiltersSection
        selectedDealType={selectedDealType}
        selectedNetwork={selectedNetwork}
        selectedAmount={selectedAmount}
        onDealTypeChange={setSelectedDealType}
        onNetworkChange={setSelectedNetwork}
        onAmountChange={setSelectedAmount}
        onClearFilters={handleClearFilters}
      />

      {/* Always show content - remove ServiceAccessGate for now */}
      <DealsGrid
        deals={filteredDeals}
        isLoading={isLoading}
        onGrabDeal={handleGrabDeal}
      />

      <SystemInfo />

      {/* Shopping Cart Modal - Only for authenticated users */}
      {showCart && isAuthenticated && (
        <ShoppingCart 
          initialDeal={selectedDeal}
          onClose={() => {
            setShowCart(false);
            setSelectedDeal(null);
          }}
        />
      )}
    </div>
  );
};

export default AirtimeDealsSystem;
