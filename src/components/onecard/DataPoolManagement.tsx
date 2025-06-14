
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Smartphone, ArrowRight, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataPoolProps {
  userData: any;
}

export const DataPoolManagement = ({ userData }: DataPoolProps) => {
  const [dataPoolBalance, setDataPoolBalance] = useState(0);
  const [availableAdminFunds, setAvailableAdminFunds] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate available admin funds from transaction history
    const transactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
    const totalAdminFees = transactions.reduce((sum: number, tx: any) => sum + (tx.admin_fee || 0), 0);
    
    // Get current data pool balance
    const poolData = localStorage.getItem('dataPoolBalance');
    if (poolData) {
      setDataPoolBalance(JSON.parse(poolData));
    }
    
    setAvailableAdminFunds(totalAdminFees);
  }, []);

  const allocateDataFromAdminPool = () => {
    // Allocate data equivalent to R10 from admin pool (minimum allocation)
    const allocationAmount = 10;
    
    if (availableAdminFunds >= allocationAmount) {
      const newDataPoolBalance = dataPoolBalance + allocationAmount;
      const newAdminFunds = availableAdminFunds - allocationAmount;
      
      setDataPoolBalance(newDataPoolBalance);
      setAvailableAdminFunds(newAdminFunds);
      
      // Save to localStorage
      localStorage.setItem('dataPoolBalance', JSON.stringify(newDataPoolBalance));
      
      // Update user's OneCard with allocated data credits
      const updatedUserData = {
        ...userData,
        dataPoolCredits: (userData.dataPoolCredits || 0) + allocationAmount,
        totalDataAllocated: (userData.totalDataAllocated || 0) + allocationAmount
      };
      localStorage.setItem('onecardUser', JSON.stringify(updatedUserData));
      
      toast({
        title: "Data Pool Allocation Successful! 📶",
        description: `R${allocationAmount} data credits allocated from admin pool to your account.`,
      });
    } else {
      toast({
        title: "Insufficient Admin Pool Funds",
        description: "Not enough admin pool balance for data allocation.",
        variant: "destructive"
      });
    }
  };

  const purchaseAirtimeFromDataPool = (amount: number) => {
    if (dataPoolBalance >= amount) {
      const newBalance = dataPoolBalance - amount;
      setDataPoolBalance(newBalance);
      localStorage.setItem('dataPoolBalance', JSON.stringify(newBalance));
      
      // Update user's cashback balance
      const updatedUserData = {
        ...userData,
        cashbackBalance: (userData.cashbackBalance || 0) + amount,
        dataPoolUsed: (userData.dataPoolUsed || 0) + amount
      };
      localStorage.setItem('onecardUser', JSON.stringify(updatedUserData));
      
      toast({
        title: "Airtime Purchase Complete! 📱",
        description: `R${amount} airtime purchased using data pool credits.`,
      });
    } else {
      toast({
        title: "Insufficient Data Pool Balance",
        description: "Not enough data pool credits for this purchase.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
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
          <Button
            onClick={allocateDataFromAdminPool}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            disabled={availableAdminFunds < 10}
          >
            <Gift className="w-4 h-4 mr-2" />
            Allocate R10 Data Credits from Admin Pool
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => purchaseAirtimeFromDataPool(5)}
              variant="outline"
              disabled={dataPoolBalance < 5}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Buy R5 Airtime
            </Button>
            <Button
              onClick={() => purchaseAirtimeFromDataPool(10)}
              variant="outline"
              disabled={dataPoolBalance < 10}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Buy R10 Airtime
            </Button>
          </div>

          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
            <ArrowRight className="w-3 h-3 inline mr-1" />
            Data pool credits are allocated from admin percentage shares to help customers without airtime
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
