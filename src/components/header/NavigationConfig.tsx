
import { Crown, ShoppingCart, MessageCircle, Star } from 'lucide-react';

export const navigationItems = [
  { 
    path: '/', 
    label: 'Home', 
    icon: <Crown className="w-4 h-4" /> 
  },
  { 
    path: '/deals', 
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
    path: '/portal', 
    label: 'Portal', 
    icon: <Star className="w-4 h-4" /> 
  }
];
