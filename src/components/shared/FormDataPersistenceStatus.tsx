import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Database, Smartphone, Globe, HardDrive } from 'lucide-react';

interface FormDataPersistenceStatusProps {
  formType: string;
  isVisible?: boolean;
  className?: string;
}

const FormDataPersistenceStatus: React.FC<FormDataPersistenceStatusProps> = ({
  formType,
  isVisible = true,
  className = ""
}) => {
  if (!isVisible) return null;

  const persistenceFeatures = [
    {
      icon: <Database className="w-4 h-4" />,
      title: "Multi-Storage",
      description: "LocalStorage + SessionStorage + IndexedDB"
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      title: "Cross-Device",
      description: "Syncs across all your devices"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      title: "Offline Ready",
      description: "Works without internet connection"
    },
    {
      icon: <HardDrive className="w-4 h-4" />,
      title: "Permanent",
      description: "Never expires, always available"
    }
  ];

  return (
    <Card className={`border-green-200 bg-green-50/30 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Data Persistence Active</span>
          </div>
          <Badge className="bg-green-100 text-green-700">
            {formType.charAt(0).toUpperCase() + formType.slice(1)} Form
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          {persistenceFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-green-700">
              {feature.icon}
              <div>
                <div className="font-medium">{feature.title}</div>
                <div className="text-green-600">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-700">
          ✅ Your {formType} registration data is automatically saved and will be restored whenever you return to this form, even after closing your browser or going offline.
        </div>
      </CardContent>
    </Card>
  );
};

export default FormDataPersistenceStatus;