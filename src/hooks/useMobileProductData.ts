
import { useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: string;
  description: string;
  features: string[];
  network?: string;
  validity?: string;
  popular?: boolean;
  discount?: number;
}

export const useMobileProductData = () => {
  const featuredProducts: Product[] = useMemo(() => [
    {
      id: 1,
      name: 'Airtime R20',
      price: 20,
      category: 'airtime',
      icon: '📞',
      description: 'Perfect for quick top-ups',
      features: ['Instant delivery', 'Divine Mobile', 'Never expires'],
      network: 'Divine Mobile',
      popular: true
    },
    {
      id: 2,
      name: 'Data 1GB',
      price: 49,
      category: 'data',
      icon: '📊',
      description: 'High-speed internet bundle',
      features: ['30-day validity', '4G/5G speed', 'Anytime data'],
      validity: '30 days',
      popular: true,
      discount: 10
    },
    {
      id: 3,
      name: 'WhatsApp Bundle',
      price: 15,
      category: 'data',
      icon: '💬',
      description: 'Unlimited WhatsApp for 7 days',
      features: ['7-day validity', 'Unlimited messaging', 'Video calls included'],
      validity: '7 days',
      popular: true
    }
  ], []);

  const airtimeProducts: Product[] = useMemo(() => [
    {
      id: 4,
      name: 'Airtime R10',
      price: 10,
      category: 'airtime',
      icon: '📞',
      description: 'Emergency top-up',
      features: ['Instant delivery', 'Divine Mobile', 'SMS & calls'],
      network: 'Divine Mobile'
    },
    {
      id: 5,
      name: 'Airtime R50',
      price: 50,
      category: 'airtime',
      icon: '📞',
      description: 'Standard top-up',
      features: ['Instant delivery', 'Divine Mobile', 'Bonus minutes'],
      network: 'Divine Mobile'
    },
    {
      id: 6,
      name: 'Airtime R100',
      price: 100,
      category: 'airtime',
      icon: '📞',
      description: 'Premium top-up',
      features: ['Instant delivery', 'Divine Mobile', 'Extra bonuses'],
      network: 'Divine Mobile'
    }
  ], []);

  const dataProducts: Product[] = useMemo(() => [
    {
      id: 7,
      name: 'Data 500MB',
      price: 29,
      category: 'data',
      icon: '📊',
      description: 'Light usage bundle',
      features: ['7-day validity', 'High-speed', 'Social media'],
      validity: '7 days'
    },
    {
      id: 8,
      name: 'Data 2GB',
      price: 79,
      category: 'data',
      icon: '📊',
      description: 'Standard usage bundle',
      features: ['30-day validity', 'High-speed', 'Streaming ready'],
      validity: '30 days'
    },
    {
      id: 9,
      name: 'Data 5GB',
      price: 149,
      category: 'data',
      icon: '📊',
      description: 'Heavy usage bundle',
      features: ['30-day validity', 'Ultra-fast', 'Unlimited streaming'],
      validity: '30 days'
    }
  ], []);

  const getProductsByCategory = (category: string): Product[] => {
    switch (category) {
      case 'featured': return featuredProducts;
      case 'airtime': return airtimeProducts;
      case 'data': return dataProducts;
      default: return featuredProducts;
    }
  };

  return {
    featuredProducts,
    airtimeProducts,
    dataProducts,
    getProductsByCategory
  };
};
