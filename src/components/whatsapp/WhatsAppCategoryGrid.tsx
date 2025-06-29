
import React from 'react';
import { CreditCard, Wifi, Gift, Globe } from 'lucide-react';

interface WhatsAppCategoryGridProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const WhatsAppCategoryGrid: React.FC<WhatsAppCategoryGridProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const categories = [
    { id: 'airtime', label: 'Airtime', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'data', label: 'Data', icon: <Wifi className="w-6 h-6" /> },
    { id: 'bundles', label: 'Bundles', icon: <Gift className="w-6 h-6" /> },
    { id: 'international', label: 'International', icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="p-4 grid grid-cols-4 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
            activeCategory === category.id
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.icon}
          <span className="text-sm font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default WhatsAppCategoryGrid;
