
import React, { useState } from 'react';
import { CartItem } from '@/types/deals';
import { useDealsData } from '@/hooks/useDealsData';
import DealsHeader from './deals/DealsHeader';
import DealsFiltersSection from './deals/DealsFiltersSection';
import DealsGrid from './deals/DealsGrid';
import SystemInfo from './deals/SystemInfo';
import ShoppingCart from './ShoppingCart';
import AuthenticationIndicator from './deals/AuthenticationIndicator';
import RegistrationGate from './auth/RegistrationGate';
import CrossPlatformNavigation from './navigation/CrossPlatformNavigation';

const AirtimeDealsSystem = () => {
  const { deals, isLoading, lastRefresh, scrapingStatus, handleManualRefresh } = useDealsData();
  // Set defaults: Divine Mobile as default network, airtime as default deal type
  const [selectedNetwork, setSelectedNetwork] = useState('divine mobile');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDealType, setSelectedDealType] = useState('airtime');
  const [showCart, setShowCart] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<CartItem | null>(null);

  const filteredDeals = deals.filter(deal => {
    const networkMatch = selectedNetwork === 'all' || deal.network.toLowerCase() === selectedNetwork.toLowerCase();
    const amountMatch = selectedAmount === 'all' || deal.amount === parseInt(selectedAmount);
    const dealTypeMatch = selectedDealType === 'all' || deal.deal_type === selectedDealType;
    return networkMatch && amountMatch && dealTypeMatch;
  });

  const handleGrabDeal = (cartItem: CartItem) => {
    setSelectedDeal(cartItem);
    setShowCart(true);
  };

  const handleClearFilters = () => {
    // Reset to defaults: Divine Mobile and airtime
    setSelectedNetwork('divine mobile');
    setSelectedAmount('all');
    setSelectedDealType('airtime');
  };

  return (
    <RegistrationGate 
      serviceName="airtime deals and payments"
      requireBankingInfo={true}
      allowedPaths={['/portal?tab=registration', '/portal?tab=deals']}
    >
      <div className="space-y-6">
        {/* Cross-Platform Navigation */}
        <CrossPlatformNavigation currentPlatform="portal" />

        {/* Authentication Indicator - but NO session management */}
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

        {/* Deals Grid */}
        <DealsGrid
          deals={filteredDeals}
          isLoading={isLoading}
          onGrabDeal={handleGrabDeal}
        />

        <SystemInfo />

        {/* Shopping Cart Modal - NO session management */}
        {showCart && (
          <ShoppingCart 
            initialDeal={selectedDeal}
            onClose={() => {
              setShowCart(false);
              setSelectedDeal(null);
            }}
          />
        )}
      </div>
    </RegistrationGate>
  );
};

export default AirtimeDealsSystem;
