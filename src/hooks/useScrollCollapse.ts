import { useState, useEffect } from 'react';

interface UseScrollCollapseOptions {
  scrollThreshold?: number;
}

export const useScrollCollapse = (options: UseScrollCollapseOptions = {}) => {
  const { scrollThreshold = 50 } = options;
  const [isBalancesCollapsed, setIsBalancesCollapsed] = useState(false);
  const [isCustomerProfileCollapsed, setIsCustomerProfileCollapsed] = useState(false);
  const [isVendorProfileCollapsed, setIsVendorProfileCollapsed] = useState(false);

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
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBalancesCollapsed, isCustomerProfileCollapsed, isVendorProfileCollapsed, scrollThreshold]);

  return {
    isBalancesCollapsed,
    setIsBalancesCollapsed,
    isCustomerProfileCollapsed,
    setIsCustomerProfileCollapsed,
    isVendorProfileCollapsed,
    setIsVendorProfileCollapsed
  };
};