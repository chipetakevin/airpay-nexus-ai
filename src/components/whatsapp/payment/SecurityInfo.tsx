
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityInfo = () => {
  return (
    <div className="text-center text-xs text-gray-600 space-y-1">
      <p className="flex items-center justify-center gap-1">
        <Shield className="w-3 h-3" />
        256-bit SSL encryption • PCI DSS compliant
      </p>
      <p>Your payment information is secure and encrypted</p>
    </div>
  );
};

export default SecurityInfo;
