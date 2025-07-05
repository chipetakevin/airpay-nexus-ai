import React, { useState } from 'react';
import { ContractorRegistrationCard } from './ContractorRegistrationCard';
import { ContractorRegistrationForm } from './ContractorRegistrationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const ContractorRegistrationContainer: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setShowForm(false)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Overview</span>
        </Button>
        <ContractorRegistrationForm />
      </div>
    );
  }

  return (
    <ContractorRegistrationCard 
      onStartRegistration={() => setShowForm(true)} 
    />
  );
};