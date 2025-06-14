
import React from 'react';
import { Card } from '@/components/ui/card';
import { useElementVisibilityControl } from '@/hooks/useElementVisibilityControl';

interface ShoppingCartLayoutProps {
  children: React.ReactNode;
}

const ShoppingCartLayout = ({ children }: ShoppingCartLayoutProps) => {
  useElementVisibilityControl();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto bg-white shadow-2xl border-none outline-none ring-0" style={{ border: 'none', outline: 'none' }}>
        {children}
      </Card>
    </div>
  );
};

export default ShoppingCartLayout;
