
export const formatCurrency = (amount: number | null | undefined): string => {
  const numericAmount = Number(amount) || 0;
  return `R${numericAmount.toFixed(2)}`;
};

export const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
