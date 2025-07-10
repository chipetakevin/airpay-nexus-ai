import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AdminPlatformBrandingProps {
  size?: 'small' | 'medium' | 'large';
  showSubtitle?: boolean;
}

const AdminPlatformBranding: React.FC<AdminPlatformBrandingProps> = ({ 
  size = 'medium',
  showSubtitle = true 
}) => {
  const sizeConfig = {
    small: {
      container: 'gap-2',
      satellite: 'w-8 h-8',
      satelliteContainer: 'p-2',
      badge: 'text-xs px-2 py-1',
      title: 'text-xl',
      subtitle: 'text-lg',
      description: 'text-sm'
    },
    medium: {
      container: 'gap-4',
      satellite: 'w-12 h-12',
      satelliteContainer: 'p-4',
      badge: 'text-sm px-3 py-1',
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-2xl',
      description: 'text-lg'
    },
    large: {
      container: 'gap-6',
      satellite: 'w-16 h-16',
      satelliteContainer: 'p-6',
      badge: 'text-base px-4 py-2',
      title: 'text-4xl md:text-5xl',
      subtitle: 'text-3xl',
      description: 'text-xl'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex flex-col items-center justify-center ${config.container} mb-6`}>
      {/* Satellite Dish Icon with ADMIN Badge */}
      <div className="relative">
        <div className={`${config.satelliteContainer} bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl`}>
          <img 
            src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
            alt="Addex Hub Satellite"
            className={`${config.satellite} object-contain`}
          />
        </div>
        <Badge className={`absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 font-bold ${config.badge} shadow-lg animate-pulse`}>
          ADMIN
        </Badge>
      </div>
      
      {/* Platform Title */}
      <div className="space-y-2 text-center">
        <h1 className={`${config.title} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
          Addex Hub Platform
        </h1>
        {showSubtitle && (
          <>
            <h2 className={`${config.subtitle} font-bold bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent`}>
              The Nerve Center
            </h2>
            <p className={`text-muted-foreground ${config.description}`}>
              Telecom Infrastructure • Admin Portal
            </p>
          </>
        )}
      </div>

      {/* Status Indicators */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-green-700">NEURAL</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-blue-700">ADMIN</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-purple-700">SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPlatformBranding;