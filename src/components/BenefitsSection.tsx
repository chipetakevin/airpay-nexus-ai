
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      title: "For Customers",
      stats: [
        { label: "Average Savings", value: "15%" },
        { label: "Cashback Rate", value: "2.5%" },
        { label: "Processing Time", value: "<30s" }
      ],
      description: "Save money on every airtime purchase while earning rewards"
    },
    {
      title: "For Vendors",
      stats: [
        { label: "Revenue Increase", value: "40%" },
        { label: "Customer Retention", value: "85%" },
        { label: "Setup Time", value: "24hrs" }
      ],
      description: "Expand your business with our comprehensive distribution network"
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="opacity-90 mb-6">{benefit.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  {benefit.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <CardContent className="p-8">
                <Link to="/portal">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {index === 0 ? 'Register as Customer' : 'Become a Vendor'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
