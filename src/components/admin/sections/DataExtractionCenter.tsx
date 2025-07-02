import React from 'react';
import MVNEDataExtractionPanel from '../MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from '../MVNEDailyRechargePanel';

interface DataExtractionCenterProps {
  activeDataTab: string;
  onDataTabChange: (tabId: string) => void;
}

const DataExtractionCenter: React.FC<DataExtractionCenterProps> = ({
  activeDataTab,
  onDataTabChange
}) => {
  const dataTabs = [
    { id: 'sim-data', label: 'SIM Card Identifiers' },
    { id: 'recharge-data', label: 'Recharge Records' }
  ];

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Divine Mobile Data Extraction Center
      </h3>
      
      {/* Data Extraction Tabs */}
      <div className="w-full">
        <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-1.5 text-muted-foreground shadow-lg border border-blue-200 backdrop-blur-sm w-full">
          <div className="grid w-full grid-cols-2 gap-1">
            {dataTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  console.log('Data tab clicked:', tab.id);
                  onDataTabChange(tab.id);
                }}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[48px] flex-1 min-w-0 cursor-pointer ${
                  activeDataTab === tab.id
                    ? tab.id === 'sim-data' 
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-purple-500 text-white shadow-lg'
                    : 'hover:bg-white/70 hover:shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Tab Content */}
        <div className="mt-6">
          {activeDataTab === 'sim-data' && <MVNEDataExtractionPanel />}
          {activeDataTab === 'recharge-data' && <MVNEDailyRechargePanel />}
        </div>
      </div>
    </div>
  );
};

export default DataExtractionCenter;