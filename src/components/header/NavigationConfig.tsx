
import { Home, ShoppingCart, MessageCircle, Star, Phone } from 'lucide-react';

export const navigationItems = [
  { 
    path: '/', 
    label: 'Home', 
    icon: <Home className="w-4 h-4" />
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
  }
];
