
import React from 'react';
import { Transaction } from './types/admin';
import { PDFGenerator } from './actions/PDFGenerator';
import { EmailHandler } from './actions/EmailHandler';
import { WhatsAppHandler } from './actions/WhatsAppHandler';

interface StatementActionsProps {
  transaction?: Transaction;
}

export const StatementActions = ({ transaction }: StatementActionsProps) => {
  return (
    <div className="flex gap-1 w-full max-w-[200px]">
      <PDFGenerator transaction={transaction} />
      <EmailHandler transaction={transaction} />
      <WhatsAppHandler transaction={transaction} />
    </div>
  );
};
