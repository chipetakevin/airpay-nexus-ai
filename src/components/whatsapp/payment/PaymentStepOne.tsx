
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface PaymentStepOneProps {
  formData: any;
  errors: Record<string, string>;
  showCvv: boolean;
  saveCard: boolean;
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onInputChange: (field: string, value: string) => void;
  onToggleCvv: () => void;
  onToggleSaveCard: (checked: boolean) => void;
  onNextStep: () => void;
  getCardIcon: () => string;
  cardType: string;
}

const PaymentStepOne = ({
  formData,
  errors,
  showCvv,
  saveCard,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  onInputChange,
  onToggleCvv,
  onToggleSaveCard,
  onNextStep,
  getCardIcon,
  cardType
}: PaymentStepOneProps) => {
  return (
    <>
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Card Number {getCardIcon()}
        </label>
        <Input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
          className={errors.cardNumber ? 'border-red-500' : ''}
          maxLength={19}
        />
        {cardType && (
          <p className="text-xs text-green-600 mt-1 capitalize">
            {cardType} detected
          </p>
        )}
        {errors.cardNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <Input
            id="expiry-input"
            type="text"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) => onExpiryDateChange(e.target.value)}
            className={errors.expiryDate ? 'border-red-500' : ''}
            maxLength={5}
          />
          {errors.expiryDate && (
            <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <div className="relative">
            <Input
              id="cvv-input"
              type={showCvv ? 'text' : 'password'}
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => onCvvChange(e.target.value)}
              className={errors.cvv ? 'border-red-500' : ''}
              maxLength={cardType === 'amex' ? 4 : 3}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
              onClick={onToggleCvv}
            >
              {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {errors.cvv && (
            <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Cardholder Name (as it appears on card)
        </label>
        <Input
          id="name-input"
          type="text"
          placeholder="John Smith"
          value={formData.cardholderName}
          onChange={(e) => onInputChange('cardholderName', e.target.value)}
          className={errors.cardholderName ? 'border-red-500' : ''}
        />
        {errors.cardholderName && (
          <p className="text-xs text-red-500 mt-1">{errors.cardholderName}</p>
        )}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <Input
            type="email"
            placeholder="example@divinemobile.co.za"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            type="tel"
            placeholder="+27 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Save Card Option */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="save-card"
          checked={saveCard}
          onChange={(e) => onToggleSaveCard(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="save-card" className="text-sm">
          Save card for future purchases (secure)
        </label>
      </div>

      <Button 
        onClick={onNextStep}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        Continue to Billing Address
        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
      </Button>
    </>
  );
};

export default PaymentStepOne;
