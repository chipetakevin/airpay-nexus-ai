
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  onecardBalance: number;
  totalCashback: number;
  registrationDate: string;
  networkProvider: string;
  ricaVerified: boolean;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  cashbackEarned: number;
  network: string;
  status: string;
  timestamp: string;
  transactionType: string;
}
