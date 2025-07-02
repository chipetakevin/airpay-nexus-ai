import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, ArrowLeft, Search, Bell, User } from 'lucide-react';

interface MobileAdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
  onBack?: () => void;
  showSearch?: boolean;
  onSearchToggle?: () => void;
}

const MobileAdminHeader: React.FC<MobileAdminHeaderProps> = ({
  title,
  subtitle,
  onMenuToggle,
  onBack,
  showSearch = false,
  onSearchToggle
}) => {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {onBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-foreground truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && onSearchToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearchToggle}
              className="p-2"
            >
              <Search className="w-5 h-5" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminHeader;