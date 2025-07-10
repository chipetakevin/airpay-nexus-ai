
// Simulate payment processing
export const processPayment = async (formData: any, saveCard: boolean, toast: any, onBack: () => void) => {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      // Save card if enabled (only last 4 digits, no CVV)
      if (saveCard) {
        const maskedCard = {
          lastFour: formData.cardNumber.replace(/\s/g, '').slice(-4),
          type: formData.cardType,
          expiryMonth: formData.expiryDate.split('/')[0],
          expiryYear: formData.expiryDate.split('/')[1]
        };
        localStorage.setItem('savedCard', JSON.stringify(maskedCard));
      }
      
      toast({
        title: "Payment Successful! ✅",
        description: `Transaction ID: ${transactionId}. Preparing your receipt...`,
      });
      
      // Return success with transaction data for receipt generation
      return {
        success: true,
        transactionId,
        customerData: formData
      };
      
      // Redirect back after success
      setTimeout(() => {
        onBack();
      }, 3000);
      
    } else {
      // Simulate various decline reasons
      const declineReasons = [
        'Insufficient funds',
        'Card declined by issuer',
        'Invalid card details',
        'Transaction limit exceeded',
        'Card has been blocked'
      ];
      
      const reason = declineReasons[Math.floor(Math.random() * declineReasons.length)];
      
      toast({
        title: "Payment Declined ❌",
        description: `Reason: ${reason}. Please try a different card or contact your bank.`,
        variant: "destructive"
      });
    }
  } catch (error) {
    toast({
      title: "Payment Error ⚠️",
      description: "An error occurred while processing your payment. Please try again.",
      variant: "destructive"
    });
  }
};
