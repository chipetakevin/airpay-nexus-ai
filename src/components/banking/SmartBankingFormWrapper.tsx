import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import ModernBankAccountForm from './ModernBankAccountForm';
import useSecureBankingStorage from '@/hooks/useSecureBankingStorage';
import { useToast } from '@/hooks/use-toast';

interface BankingFormData {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
}

interface SmartBankingFormWrapperProps {
  onBankingComplete?: (data: BankingFormData) => void;
  onFormValidation?: (isValid: boolean) => void;
  title?: string;
  subtitle?: string;
  showStorageControls?: boolean;
  autoSave?: boolean;
  className?: string;
}

const SmartBankingFormWrapper: React.FC<SmartBankingFormWrapperProps> = ({
  onBankingComplete,
  onFormValidation,
  title = "Banking Information",
  subtitle = "Select your bank and enter your account details",
  showStorageControls = true,
  autoSave = true,
  className = ''
}) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [bankingData, setBankingData] = useState<BankingFormData | null>(null);
  
  const {
    bankingData: storedData,
    saveBankingData,
    clearBankingData,
    isAutoSaving,
    lastSaved,
    hasStoredData
  } = useSecureBankingStorage();
  
  const { toast } = useToast();

  // Handle banking form completion
  const handleBankingComplete = useCallback((data: BankingFormData) => {
    setBankingData(data);
    setIsFormValid(true);
    
    // Auto-save to secure storage
    if (autoSave) {
      saveBankingData(data);
    }
    
    // Notify parent component
    if (onBankingComplete) {
      onBankingComplete(data);
    }
    
    if (onFormValidation) {
      onFormValidation(true);
    }
    
    toast({
      title: "Banking Information Complete",
      description: "Your banking details have been securely saved.",
      duration: 3000
    });
  }, [autoSave, saveBankingData, onBankingComplete, onFormValidation, toast]);

  // Handle validation errors
  const handleValidationError = useCallback((errors: Record<string, string>) => {
    setFormErrors(errors);
    const hasErrors = Object.keys(errors).length > 0;
    setIsFormValid(!hasErrors);
    
    if (onFormValidation) {
      onFormValidation(!hasErrors);
    }
  }, [onFormValidation]);

  // Clear stored banking data
  const handleClearData = useCallback(() => {
    clearBankingData();
    setBankingData(null);
    setIsFormValid(false);
    setFormErrors({});
    
    toast({
      title: "Banking Data Cleared",
      description: "All stored banking information has been removed.",
      duration: 2000
    });
  }, [clearBankingData, toast]);

  const hasValidationErrors = Object.keys(formErrors).length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Form Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        
        {/* Stored Data Indicator */}
        {hasStoredData && autoSave && (
          <Alert className="border-primary/20 bg-primary/5">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              Previously saved banking information detected. Your details will be auto-populated.
              {lastSaved && (
                <span className="text-xs text-muted-foreground ml-2">
                  Last saved: {lastSaved.toLocaleString()}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Banking Form */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Bank Account Details</CardTitle>
            
            {/* Storage Controls */}
            {showStorageControls && hasStoredData && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearData}
                className="text-destructive hover:text-destructive/80 text-xs"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear Saved Data
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <ModernBankAccountForm
            onBankingComplete={handleBankingComplete}
            onValidationError={handleValidationError}
            defaultValues={storedData ? {
              bankName: storedData.bankName,
              accountNumber: storedData.accountNumber,
              branchCode: storedData.branchCode
            } : {}}
            autoSave={autoSave}
          />
        </CardContent>
      </Card>

      {/* Validation Status */}
      {hasValidationErrors && (
        <Alert variant="destructive" className="border-destructive/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {Object.entries(formErrors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Success Status */}
      {isFormValid && bankingData && (
        <Alert className="border-primary bg-primary/5">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            <div className="space-y-2">
              <p className="font-medium">Banking Information Complete!</p>
              <div className="text-sm space-y-1">
                <p>Bank: {bankingData.bankName}</p>
                <p>Account: ****{bankingData.accountNumber.slice(-4)}</p>
                <p>Branch Code: {bankingData.branchCode}</p>
                <p>Account Type: {bankingData.accountType}</p>
              </div>
              {isAutoSaving && (
                <p className="text-xs text-muted-foreground">Auto-saving...</p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SmartBankingFormWrapper;