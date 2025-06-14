
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, TrendingUp, Users } from 'lucide-react';

interface ReportsSectionProps {
  onGenerateMasterReport: () => void;
}

const ReportsSection = ({ onGenerateMasterReport }: ReportsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports & Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={onGenerateMasterReport} className="h-20">
            <div className="text-center">
              <Download className="w-6 h-6 mx-auto mb-2" />
              <div>Download Master Report</div>
              <div className="text-xs opacity-75">Complete platform overview</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <div>Financial Summary</div>
              <div className="text-xs opacity-75">Revenue and cashback analysis</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div>Growth Analytics</div>
              <div className="text-xs opacity-75">Customer acquisition trends</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20">
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div>Customer Insights</div>
              <div className="text-xs opacity-75">Behavioral analysis report</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsSection;
