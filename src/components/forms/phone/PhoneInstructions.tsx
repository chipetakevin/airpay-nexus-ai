
import React from 'react';

const PhoneInstructions = () => {
  return (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
      <p className="text-sm text-blue-700 font-medium mb-1">
        📱 Enter your 9-digit SA mobile number
      </p>
      <div className="text-xs text-blue-600 space-y-1">
        <p>• Without country code: <span className="font-mono">832466539</span></p>
        <p>• System will save: <span className="font-mono">+27832466539</span></p>
        <p>• Numbers are permanently stored for future use</p>
      </div>
    </div>
  );
};

export default PhoneInstructions;
