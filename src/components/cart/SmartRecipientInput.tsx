
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Phone, Heart, Clock, Star, 
  Check, X, UserPlus, Smartphone 
} from 'lucide-react';
import { useRecipientMemory } from '@/hooks/useRecipientMemory';

interface SmartRecipientInputProps {
  recipientData: {
    name: string;
    phone: string;
    relationship: string;
  };
  onRecipientDataChange: (data: any) => void;
  onPhoneValidation?: (phone: string) => void;
  detectedNetwork?: string;
}

const SmartRecipientInput = ({
  recipientData,
  onRecipientDataChange,
  onPhoneValidation,
  detectedNetwork
}: SmartRecipientInputProps) => {
  const {
    detectRecipient,
    getSuggestions,
    saveRecipient,
    getFrequentRecipients,
    removeRecipient
  } = useRecipientMemory();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [frequentRecipients, setFrequentRecipients] = useState<any[]>([]);
  const [autoDetectedRecipient, setAutoDetectedRecipient] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load frequent recipients on mount
  useEffect(() => {
    setFrequentRecipients(getFrequentRecipients(3));
  }, [getFrequentRecipients]);

  // Auto-detect recipient when phone changes
  useEffect(() => {
    if (recipientData.phone && recipientData.phone.length >= 10) {
      const detected = detectRecipient(recipientData.phone);
      if (detected && !autoDetectedRecipient) {
        setAutoDetectedRecipient(detected);
      }
    } else {
      setAutoDetectedRecipient(null);
    }
  }, [recipientData.phone, detectRecipient, autoDetectedRecipient]);

  // Handle input changes and show suggestions
  const handleInputChange = (field: string, value: string) => {
    onRecipientDataChange({
      ...recipientData,
      [field]: value
    });

    if (field === 'phone' && onPhoneValidation) {
      onPhoneValidation(value);
    }

    // Show suggestions for phone and name fields
    if ((field === 'phone' || field === 'name') && value.length >= 2) {
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Apply auto-detected recipient
  const applyDetectedRecipient = () => {
    if (autoDetectedRecipient) {
      onRecipientDataChange({
        name: autoDetectedRecipient.name,
        phone: autoDetectedRecipient.phone,
        relationship: autoDetectedRecipient.relationship
      });
      setAutoDetectedRecipient(null);
    }
  };

  // Apply suggestion
  const applySuggestion = (suggestion: any) => {
    onRecipientDataChange({
      name: suggestion.name,
      phone: suggestion.phone,
      relationship: suggestion.relationship
    });
    setShowSuggestions(false);
    setAutoDetectedRecipient(null);
  };

  // Save current recipient
  const handleSaveRecipient = async () => {
    if (recipientData.name && recipientData.phone && recipientData.relationship) {
      await saveRecipient(recipientData, detectedNetwork);
      setFrequentRecipients(getFrequentRecipients(3));
    }
  };

  // Auto-save when all fields are filled and user moves away
  const handleAutoSave = () => {
    if (recipientData.name && recipientData.phone && recipientData.relationship) {
      saveRecipient(recipientData, detectedNetwork);
    }
  };

  return (
    <div className="space-y-4">
      {/* Frequent Recipients Quick Access */}
      {frequentRecipients.length > 0 && !recipientData.phone && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Frequent Recipients</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {frequentRecipients.map((recipient) => (
                <Button
                  key={recipient.id}
                  variant="outline"
                  size="sm"
                  onClick={() => applySuggestion(recipient)}
                  className="h-auto p-2 border-blue-300 hover:bg-blue-100"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <div className="text-left">
                      <div className="text-xs font-medium">{recipient.name}</div>
                      <div className="text-xs text-gray-600">{recipient.phone}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {recipient.frequency}x
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto-Detection Alert */}
      {autoDetectedRecipient && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-green-800">
                    Recipient Found: {autoDetectedRecipient.name}
                  </div>
                  <div className="text-xs text-green-600">
                    Used {autoDetectedRecipient.frequency} times • {autoDetectedRecipient.relationship}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={applyDetectedRecipient}
                  className="bg-green-600 hover:bg-green-700 text-white h-8"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Use
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAutoDetectedRecipient(null)}
                  className="h-8"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recipient Name Input */}
      <div className="space-y-2 relative">
        <Label htmlFor="recipientName" className="text-sm font-medium">
          Recipient Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="recipientName"
            ref={inputRef}
            value={recipientData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={handleAutoSave}
            placeholder="Enter recipient's name"
            className="pl-10"
          />
        </div>
      </div>

      {/* Recipient Phone Input */}
      <div className="space-y-2 relative">
        <Label htmlFor="recipientPhone" className="text-sm font-medium">
          Recipient Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="recipientPhone"
            value={recipientData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={handleAutoSave}
            placeholder="Enter recipient's phone number"
            className="pl-10"
          />
          {detectedNetwork && (
            <Badge 
              variant="outline" 
              className="absolute right-2 top-2 text-xs bg-white"
            >
              <Smartphone className="w-3 h-3 mr-1" />
              {detectedNetwork}
            </Badge>
          )}
        </div>
      </div>

      {/* Relationship Input */}
      <div className="space-y-2 relative">
        <Label htmlFor="relationship" className="text-sm font-medium">
          Relationship
        </Label>
        <div className="relative">
          <Heart className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="relationship"
            value={recipientData.relationship}
            onChange={(e) => handleInputChange('relationship', e.target.value)}
            onBlur={handleAutoSave}
            placeholder="e.g., Family, Friend, Colleague"
            className="pl-10"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 border-gray-200 shadow-lg">
          <CardContent className="p-2">
            <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Recent Recipients
            </div>
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="ghost"
                size="sm"
                onClick={() => applySuggestion(suggestion)}
                className="w-full justify-start h-auto p-2 mb-1"
              >
                <div className="flex items-center gap-2 w-full">
                  <User className="w-3 h-3 text-gray-400" />
                  <div className="flex-1 text-left">
                    <div className="text-xs font-medium">{suggestion.name}</div>
                    <div className="text-xs text-gray-500">
                      {suggestion.phone} • {suggestion.relationship}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.frequency}x
                  </Badge>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Manual Save Button */}
      {recipientData.name && recipientData.phone && recipientData.relationship && (
        <Button
          onClick={handleSaveRecipient}
          variant="outline"
          size="sm"
          className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <UserPlus className="w-3 h-3 mr-2" />
          Save for Future Payments
        </Button>
      )}
    </div>
  );
};

export default SmartRecipientInput;
