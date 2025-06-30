
import { useState } from 'react';

interface ReportData {
  type: 'success' | 'warning' | 'error';
  message: string;
  redirectPath?: string;
  actionLabel?: string;
}

export const useIntelligentReporting = () => {
  const [activeReport, setActiveReport] = useState<ReportData | null>(null);

  const showSuccessReport = (message: string) => {
    setActiveReport({
      type: 'success',
      message: `✅ ${message}`
    });
  };

  const showErrorReport = (message: string, redirectPath?: string, actionLabel?: string) => {
    setActiveReport({
      type: 'error',
      message,
      redirectPath,
      actionLabel
    });
  };

  const showWarningReport = (message: string, redirectPath?: string, actionLabel?: string) => {
    setActiveReport({
      type: 'warning',
      message,
      redirectPath,
      actionLabel
    });
  };

  const clearReport = () => {
    setActiveReport(null);
  };

  return {
    activeReport,
    showSuccessReport,
    showErrorReport,
    showWarningReport,
    clearReport
  };
};
