
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Heart, Star, Check, X, UserPlus
} from 'lucide-react';
import { useRecipientMemory } from '@/hooks/useRecipientMemory';
import EnhancedPhoneInput from '@/components/forms/EnhancedPhoneInput';
import { Input } from '@/components/ui/input';

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
    getFrequentRecipients
  } = useRecipientMemory();

  const [frequentRecipients, setFrequentRecipients] = useState<any[]>([]);
  const [autoDetectedRecipient, setAutoDetectedRecipient] = useState<any>(null);

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
      <div className="space-y-2">
        <Label htmlFor="recipientName" className="text-sm font-medium">
          Recipient Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="recipientName"
            value={recipientData.name}
            onChange={(e) => onRecipientDataChange({ ...recipientData, name: e.target.value })}
            onBlur={handleAutoSave}
            placeholder="Enter recipient's name"
            className="pl-10"
          />
        </div>
      </div>

      {/* Enhanced Phone Input */}
      <EnhancedPhoneInput
        value={recipientData.phone}
        onChange={(value) => {
          onRecipientDataChange({ ...recipientData, phone: value });
          if (onPhoneValidation) {
            onPhoneValidation(value);
          }
        }}
        userType="guest"
        label="Recipient Phone Number"
        placeholder="Enter recipient's phone number"
        autoFill={false}
        showSuggestions={true}
      />

      {/* Relationship Input */}
      <div className="space-y-2">
        <Label htmlFor="relationship" className="text-sm font-medium">
          Relationship
        </Label>
        <div className="relative">
          <Heart className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="relationship"
            value={recipientData.relationship}
            onChange={(e) => onRecipientDataChange({ ...recipientData, relationship: e.target.value })}
            onBlur={handleAutoSave}
            placeholder="e.g., Family, Friend, Colleague"
            className="pl-10"
          />
        </div>
      </div>

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
