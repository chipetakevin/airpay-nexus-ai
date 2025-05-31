
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Loader } from 'lucide-react';

interface NetworkDetectorProps {
  phoneNumber: string;
  onNetworkDetected: (network: string, isValid: boolean) => void;
}

const NetworkDetector = ({ phoneNumber, onNetworkDetected }: NetworkDetectorProps) => {
  const [detecting, setDetecting] = useState(false);
  const [network, setNetwork] = useState<string>('');
  const [isValid, setIsValid] = useState(false);

  const networkPrefixes = {
    MTN: ['083', '084', '073', '074'],
    Vodacom: ['082', '071', '072', '060', '061', '062', '063', '064', '065', '066', '067', '068', '069'],
    'Cell C': ['084', '076'],
    Telkom: ['081', '079'],
    Rain: ['087']
  };

  const detectNetwork = async (phone: string) => {
    setDetecting(true);
    
    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let detectedNetwork = 'Unknown';
    let valid = false;
    
    if (cleanPhone.length >= 10) {
      const prefix = cleanPhone.startsWith('27') ? cleanPhone.substring(2, 5) : cleanPhone.substring(0, 3);
      
      for (const [networkName, prefixes] of Object.entries(networkPrefixes)) {
        if (prefixes.includes(prefix)) {
          detectedNetwork = networkName;
          valid = true;
          break;
        }
      }
    }
    
    setNetwork(detectedNetwork);
    setIsValid(valid);
    setDetecting(false);
    onNetworkDetected(detectedNetwork, valid);
  };

  useEffect(() => {
    if (phoneNumber && phoneNumber.length >= 10) {
      detectNetwork(phoneNumber);
    } else {
      setNetwork('');
      setIsValid(false);
    }
  }, [phoneNumber]);

  if (!phoneNumber || phoneNumber.length < 10) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      {detecting ? (
        <>
          <Loader className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-gray-600">Detecting network...</span>
        </>
      ) : isValid ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          <Badge variant="outline" className="text-green-700 border-green-300">
            {network}
          </Badge>
          <span className="text-sm text-green-600">RICA Verified</span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-600">Invalid or unrecognized number</span>
        </>
      )}
    </div>
  );
};

export default NetworkDetector;
