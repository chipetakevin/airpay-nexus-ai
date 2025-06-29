
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import PaymentStepOne from './PaymentStepOne';
import PaymentStepTwo from './PaymentStepTwo';

interface PaymentFormProps {
  currentStep: number;
  formData: any;
  errors: Record<string, string>;
  showCvv: boolean;
  saveCard: boolean;
  addressSuggestions: string[];
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onInputChange: (field: string, value: string) => void;
  onToggleCvv: () => void;
  onToggleSaveCard: (checked: boolean) => void;
  onAddressSuggestionClick: (suggestion: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
  total: number;
  getCardIcon: () => string;
  cardType: string;
}

const PaymentForm = (props: PaymentFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
          <Badge variant="outline" className="ml-auto">
            Step {props.currentStep} of 2
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {props.currentStep === 1 ? (
          <PaymentStepOne {...props} />
        ) : (
          <PaymentStepTwo {...props} />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
