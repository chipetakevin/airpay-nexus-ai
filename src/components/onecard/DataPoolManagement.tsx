
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Smartphone, ArrowRight, Gift, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminDataPoolManager } from './AdminDataPoolManager';
import { EligibilityChecker } from './EligibilityChecker';
import { useCustomerEligibility } from '@/hooks/useCustomerEligibility';

interface DataPoolProps {
  userData: any;
}

export const DataPoolManagement = ({ userData }: DataPoolProps) => {
  const [dataPoolBalance, setDataPoolBalance] = useState(0);
  const [availableAdminFunds, setAvailableAdminFunds] = useState(0);
  const { toast } = useToast();
  
  const {
    isEligible,
    automaticCutoff,
    simulateDataPurchaseSuccess
  } = useCustomerEligibility();

  useEffect(() => {
    // Calculate available admin funds from transaction history
    const transactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
    const totalAdminFees = transactions.reduce((sum: number, tx: any) => sum + (tx.admin_fee || 0), 0);
    
    // Get current data pool balance
    const poolData = localStorage.getItem('dataPoolBalance');
    if (poolData) {
      setDataPoolBalance(JSON.parse(poolData));
    }
    
    // Get admin pool balance
    const adminPoolBalance = JSON.parse(localStorage.getItem('adminDataPoolBalance') || '0');
    setAvailableAdminFunds(totalAdminFees + adminPoolBalance);
  }, []);

  const allocateDataFromAdminPool = (amount: number) => {
    // Check eligibility first - automatic cutoff
    if (!automaticCutoff()) {
      return;
    }

    if (availableAdminFunds >= amount) {
      const newDataPoolBalance = dataPoolBalance + amount;
      const newAdminFunds = availableAdminFunds - amount;
      
      setDataPoolBalance(newDataPoolBalance);
      setAvailableAdminFunds(newAdminFunds);
      
      // Save to localStorage
      localStorage.setItem('dataPoolBalance', JSON.stringify(newDataPoolBalance));
      
      // Update user's OneCard with allocated data credits
      const updatedUserData = {
        ...userData,
        dataPoolCredits: (userData.dataPoolCredits || 0) + amount,
        totalDataAllocated: (userData.totalDataAllocated || 0) + amount
      };
      localStorage.setItem('onecardUser', JSON.stringify(updatedUserData));
      
      toast({
        title: "Data Pool Allocation Successful! 📶",
        description: `R${amount} data credits allocated from admin pool to your account.`,
      });
    } else {
      toast({
        title: "Insufficient Admin Pool Funds",
        description: "Admin needs to top-up the data pool. Notification sent.",
        variant: "destructive"
      });
    }
  };

  const purchaseAirtimeFromDataPool = (amount: number) => {
    // Check eligibility first
    if (!automaticCutoff()) {
      return;
    }

    if (dataPoolBalance >= amount) {
      const newBalance = dataPoolBalance - amount;
      setDataPoolBalance(newBalance);
      localStorage.setItem('dataPoolBalance', JSON.stringify(newBalance));
      
      // Simulate successful data purchase and receipt
      simulateDataPurchaseSuccess(amount);
      
      // Update user's cashback balance
      const updatedUserData = {
        ...userData,
        cashbackBalance: (userData.cashbackBalance || 0) + amount,
        dataPoolUsed: (userData.dataPoolUsed || 0) + amount,
        airtimeBalance: (userData.airtimeBalance || 0) + amount,
        dataBalance: (userData.dataBalance || 0) + (amount * 100) // Convert to MB
      };
      localStorage.setItem('onecardUser', JSON.stringify(updatedUserData));
      
      toast({
        title: "🎉 Purchase Complete & Data Activated!",
        description: `R${amount} airtime purchased. ${amount * 100}MB data now active. Access Smart Deals now!`,
      });
    } else {
      toast({
        title: "Insufficient Data Pool Balance",
        description: "Not enough data pool credits for this purchase.",
        variant: "destructive"
      });
    }
  };

  const handlePoolUpdate = (amount: number) => {
    setAvailableAdminFunds(prev => prev + amount);
  };

  return (
    <div className="space-y-4">
      {/* Customer Eligibility Status */}
      <EligibilityChecker />

      {/* Admin Data Pool Manager - Only visible to admin */}
      {userData?.userType === 'admin' && (
        <AdminDataPoolManager onPoolUpdate={handlePoolUpdate} />
      )}

      {/* Data Pool Balance Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Wifi className="w-5 h-5" />
            Divinely Mobile Data Pool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Available Data Credits</p>
              <p className="text-2xl font-bold text-purple-800">
                R{dataPoolBalance.toFixed(2)}
              </p>
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
              From Admin Pool
            </Badge>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-600 mb-2">Admin Pool Available:</p>
            <p className="text-lg font-semibold text-purple-800">R{availableAdminFunds.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Data Pool Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Data Pool Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={() => allocateDataFromAdminPool(1000)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              disabled={!isEligible || availableAdminFunds < 1000}
            >
              <Gift className="w-4 h-4 mr-2" />
              {!isEligible ? "Not Eligible - Sufficient Balance" : "Allocate Data for Customers (R1000)"}
            </Button>
            
            <Button
              onClick={() => allocateDataFromAdminPool(5000)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              disabled={!isEligible || availableAdminFunds < 5000}
            >
              <Gift className="w-4 h-4 mr-2" />
              {!isEligible ? "Not Eligible - Sufficient Balance" : "Allocate Data for Customers (R5000)"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => purchaseAirtimeFromDataPool(5)}
              variant="outline"
              disabled={!isEligible || dataPoolBalance < 5}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Buy R5 Data
            </Button>
            <Button
              onClick={() => purchaseAirtimeFromDataPool(10)}
              variant="outline"
              disabled={!isEligible || dataPoolBalance < 10}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Buy R10 Data
            </Button>
          </div>

          {!isEligible && (
            <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              System detected sufficient balance - data pool access restricted
            </div>
          )}

          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
            <ArrowRight className="w-3 h-3 inline mr-1" />
            Data pool credits help customers without airtime access smart deals
          </div>
        </CardContent>
      </Card>

      {/* User Data Pool Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Allocated</p>
              <p className="text-lg font-bold text-green-800">
                R{(userData.totalDataAllocated || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Pool Used</p>
              <p className="text-lg font-bold text-green-800">
                R{(userData.dataPoolUsed || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
