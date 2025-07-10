
import { Home, ShoppingCart, MessageCircle, Star, Phone, Store, Server, Rocket, Satellite, Zap, Brain, CreditCard as Card } from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon: JSX.Element;
  badge?: string;
  isHighlight?: boolean;
  requiresAuth?: boolean;
  userTypes?: string[];
}

export const navigationItems: NavigationItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />
  },
  { 
    path: '/portal?tab=deals', 
    label: 'Deals Hub', 
    icon: <ShoppingCart className="w-4 h-4" />,
    badge: 'USSD'
  },
  { 
    path: '/whatsapp-assistant', 
    label: 'WhatsApp Shopping', 
    icon: <MessageCircle className="w-4 h-4" />,
    badge: 'AI'
  },
  { 
    path: '/porting-system', 
    label: 'Number Porting', 
    icon: <Phone className="w-4 h-4" />,
    badge: 'NEW'
  },
  { 
    path: '/portal', 
    label: 'Portal', 
    icon: <Star className="w-4 h-4" />
  },
  { 
    path: '/dgx-station', 
    label: 'DGX Station', 
    icon: <Server className="w-4 h-4" />
  },
  { 
    path: '/portal?tab=registration', 
    label: 'Get Started', 
    icon: <Rocket className="w-4 h-4" />,
    isHighlight: true
  }
];

// Admin-specific navigation items
export const adminNavigationItems: NavigationItem[] = [
  { 
    path: '/admin/addex-hub', 
    label: 'Addex Hub Platform', 
    icon: <Satellite className="w-4 h-4" />,
    badge: 'TELECOM',
    requiresAuth: true,
    userTypes: ['admin']
  },
  { 
    path: '/admin/api-toolkit', 
    label: 'API Toolkit', 
    icon: <Zap className="w-4 h-4" />,
    badge: 'MNO',
    requiresAuth: true,
    userTypes: ['admin']
  },
  { 
    path: '/admin/nerve-center', 
    label: 'The Nerve Center', 
    icon: <Brain className="w-4 h-4" />,
    badge: 'NEURAL',
    requiresAuth: true,
    userTypes: ['admin']
  },
  { 
    path: '/admin/onecard', 
    label: 'OneCard Management', 
    icon: <Card className="w-4 h-4" />,
    badge: 'ADMIN',
    requiresAuth: true,
    userTypes: ['admin']
  }
];

// Function to get navigation items based on user authentication and type
export const getNavigationItems = (isAuthenticated: boolean, userType?: string): NavigationItem[] => {
  let items = [...navigationItems];
  
  if (isAuthenticated && userType === 'admin') {
    // Add admin-specific items after the regular navigation
    items = [...items, ...adminNavigationItems];
  }
  
  return items;
};
