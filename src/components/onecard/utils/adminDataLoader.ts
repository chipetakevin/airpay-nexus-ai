
import { Customer, Transaction } from '../types/admin';

export const loadCustomerData = (): Customer[] => {
  const storedCustomers: Customer[] = [];
  
  // Check for registered customers
  const customerData = localStorage.getItem('onecardUser');
  if (customerData) {
    const customer = JSON.parse(customerData);
    storedCustomers.push({
      id: customer.cardNumber || 'user-1',
      firstName: customer.firstName || 'Unknown',
      lastName: customer.lastName || 'User',
      email: customer.email || 'unknown@email.com',
      phone: customer.registeredPhone || 'Unknown',
      cardNumber: customer.cardNumber || 'Unknown',
      onecardBalance: Number(customer.onecardBalance) || 0,
      totalCashback: Number(customer.totalCashback) || 0,
      registrationDate: customer.registrationDate || new Date().toISOString(),
      networkProvider: customer.networkProvider || 'Unknown',
      ricaVerified: Boolean(customer.ricaVerified)
    });
  }

  // Add sample admin data for demonstration
  storedCustomers.push(
    {
      id: 'admin-kevin',
      firstName: 'Kevin',
      lastName: 'Chipeta',
      email: 'kevin@divinely.com',
      phone: '+27832466539',
      cardNumber: 'DC2024001',
      onecardBalance: 1500.00,
      totalCashback: 245.50,
      registrationDate: '2024-01-15T10:30:00Z',
      networkProvider: 'Vodacom',
      ricaVerified: true
    },
    {
      id: 'cust-001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '+27821234567',
      cardNumber: 'DC2024002',
      onecardBalance: 850.75,
      totalCashback: 125.25,
      registrationDate: '2024-02-10T14:20:00Z',
      networkProvider: 'MTN',
      ricaVerified: true
    },
    {
      id: 'cust-002',
      firstName: 'Michael',
      lastName: 'Smith',
      email: 'michael@example.com',
      phone: '+27837654321',
      cardNumber: 'DC2024003',
      onecardBalance: 420.00,
      totalCashback: 78.90,
      registrationDate: '2024-03-05T09:15:00Z',
      networkProvider: 'Cell C',
      ricaVerified: false
    }
  );

  return storedCustomers;
};

export const loadTransactionData = (): Transaction[] => {
  const storedTransactions = localStorage.getItem('userTransactions') || '[]';
  try {
    const userTransactions = JSON.parse(storedTransactions);
    
    const sampleTransactions = [
      {
        id: 'txn-001',
        customerId: 'admin-kevin',
        customerName: 'Kevin Chipeta',
        amount: 100.00,
        cashbackEarned: 5.00,
        network: 'Vodacom',
        status: 'completed',
        timestamp: '2024-12-14T10:00:00Z',
        transactionType: 'airtime_purchase'
      },
      {
        id: 'txn-002',
        customerId: 'cust-001',
        customerName: 'Sarah Johnson',
        amount: 50.00,
        cashbackEarned: 2.50,
        network: 'MTN',
        status: 'completed',
        timestamp: '2024-12-13T15:30:00Z',
        transactionType: 'data_bundle'
      }
    ];
    
    const processedTransactions = [...userTransactions, ...sampleTransactions].map(tx => ({
      ...tx,
      amount: Number(tx.amount) || 0,
      cashbackEarned: Number(tx.cashbackEarned) || 0
    }));
    
    return processedTransactions;
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};
