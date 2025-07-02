import { useState, useEffect } from 'react';

interface UseScrollCollapseOptions {
  scrollThreshold?: number;
}

export const useScrollCollapse = (options: UseScrollCollapseOptions = {}) => {
  const { scrollThreshold = 50 } = options;
  const [isBalancesCollapsed, setIsBalancesCollapsed] = useState(false);
  const [isCustomerProfileCollapsed, setIsCustomerProfileCollapsed] = useState(false);
  const [isVendorProfileCollapsed, setIsVendorProfileCollapsed] = useState(false);
  const [isRevenueCardsCollapsed, setIsRevenueCardsCollapsed] = useState(false);
  const [isNetworkRevenueCollapsed, setIsNetworkRevenueCollapsed] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and sections are not collapsed, collapse them
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        if (!isBalancesCollapsed) {
          setIsBalancesCollapsed(true);
        }
        if (!isCustomerProfileCollapsed) {
          setIsCustomerProfileCollapsed(true);
        }
        if (!isVendorProfileCollapsed) {
          setIsVendorProfileCollapsed(true);
        }
        if (!isRevenueCardsCollapsed) {
          setIsRevenueCardsCollapsed(true);
        }
        if (!isNetworkRevenueCollapsed) {
          setIsNetworkRevenueCollapsed(true);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBalancesCollapsed, isCustomerProfileCollapsed, isVendorProfileCollapsed, isRevenueCardsCollapsed, isNetworkRevenueCollapsed, scrollThreshold]);

  return {
    isBalancesCollapsed,
    setIsBalancesCollapsed,
    isCustomerProfileCollapsed,
    setIsCustomerProfileCollapsed,
    isVendorProfileCollapsed,
    setIsVendorProfileCollapsed,
    isRevenueCardsCollapsed,
    setIsRevenueCardsCollapsed,
    isNetworkRevenueCollapsed,
    setIsNetworkRevenueCollapsed
  };
};