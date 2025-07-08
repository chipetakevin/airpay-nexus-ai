
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
      description: "Save money on every airtime purchase while earning rewards",
      buttonText: "Register as Customer",
      link: "/portal"
    },
    {
      title: "For Vendors",
      stats: [
        { label: "Revenue Increase", value: "40%" },
        { label: "Customer Retention", value: "85%" },
        { label: "Setup Time", value: "24hrs" }
      ],
      description: "Expand your business with our comprehensive distribution network",
      buttonText: "Become a Vendor",
      link: "/portal"
    },
    {
      title: "For Field Workers",
      stats: [
        { label: "Commission Rate", value: "12%" },
        { label: "Mobile Coverage", value: "95%" },
        { label: "Training Time", value: "4hrs" }
      ],
      description: "Join our field team and earn competitive commissions on mobile activations",
      buttonText: "Join Field Team",
      link: "/portal"
    },
    {
      title: "For Admins",
      stats: [
        { label: "System Uptime", value: "99.9%" },
        { label: "Data Analytics", value: "Real-time" },
        { label: "Access Control", value: "Multi-tier" }
      ],
      description: "Comprehensive admin tools for efficient platform management and oversight",
      buttonText: "Admin Access",
      link: "/portal"
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12">
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
                <Link to={benefit.link}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {benefit.buttonText}
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
