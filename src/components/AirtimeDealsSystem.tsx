
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

      {/* Service Access Gate for Deals Grid */}
      <ServiceAccessGate
        serviceName="airtime deals and payments"
        onNavigateToRegistration={handleNavigateToRegistration}
        isAuthenticated={isAuthenticated}
      >
        <DealsGrid
          deals={filteredDeals}
          isLoading={isLoading}
          onGrabDeal={handleGrabDeal}
        />
      </ServiceAccessGate>

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
