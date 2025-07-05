import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, FileText, MapPin, CheckCircle } from 'lucide-react';

interface ContractorRegistrationCardProps {
  onStartRegistration: () => void;
}

export const ContractorRegistrationCard: React.FC<ContractorRegistrationCardProps> = ({ 
  onStartRegistration 
}) => {
  const features = [
    { icon: Shield, text: 'Secure registration process' },
    { icon: FileText, text: 'AI document processing' },
    { icon: Award, text: 'Skills & certifications verification' },
    { icon: MapPin, text: 'Work area selection' },
    { icon: Users, text: 'Join our contractor network' },
    { icon: CheckCircle, text: 'Fast approval process' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Card - Matching the visual style from the image */}
      <Card className="relative overflow-hidden border-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <CardContent className="relative p-8 text-center text-primary-foreground">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Field Contractor Registration</h2>
          <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
            Join our network of professional contractors with our AI-enhanced onboarding process
          </p>
          
          <Button 
            onClick={onStartRegistration}
            size="lg"
            className="bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
          >
            Start Registration Process
          </Button>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{feature.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Process Overview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Registration Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Personal Details', desc: 'Basic information & contact details' },
              { step: '2', title: 'Business Info', desc: 'Company details & registration' },
              { step: '3', title: 'Upload Documents', desc: 'AI-powered document extraction' },
              { step: '4', title: 'Review & Submit', desc: 'Final review and approval' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};