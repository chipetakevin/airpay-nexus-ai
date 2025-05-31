
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationTemplates = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Receipt Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs bg-gray-50 p-3 rounded">
            <div className="font-semibold">Transaction Receipt</div>
            <div className="mt-1">Hi [NAME], your R[AMOUNT] [NETWORK] purchase is complete. Profit earned: R[PROFIT]. Thank you!</div>
          </div>
          <Button size="sm" variant="outline">Edit Template</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Profit Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs bg-gray-50 p-3 rounded">
            <div className="font-semibold">Weekly Profit Summary</div>
            <div className="mt-1">Your AirPay profits: R[TOTAL_PROFIT]. Transactions: [COUNT]. Keep growing!</div>
          </div>
          <Button size="sm" variant="outline">Edit Template</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationTemplates;
