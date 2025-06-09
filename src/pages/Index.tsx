
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import StatsGrid from '@/components/StatsGrid';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced background with glassmorphism effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50"></div>
        
        {/* Floating glassmorphism elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full backdrop-blur-sm animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-teal-400/10 rounded-full backdrop-blur-sm animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full backdrop-blur-sm animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-10 w-28 h-28 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full backdrop-blur-sm animate-bounce delay-1000"></div>
      </div>

      {/* Content with enhanced z-index */}
      <div className="relative z-10">
        <div className="animate-fade-in">
          <Header />
        </div>
        
        <div className="animate-fade-in delay-100">
          <HeroSection />
        </div>
        
        <div className="animate-fade-in delay-200">
          <FeaturesSection />
        </div>
        
        <div className="animate-fade-in delay-300">
          <BenefitsSection />
        </div>
        
        <div className="animate-fade-in delay-400">
          <TestimonialsCarousel />
        </div>
        
        <div className="animate-fade-in delay-500">
          <StatsGrid />
        </div>
        
        <div className="animate-fade-in delay-600">
          <FAQSection />
        </div>
        
        <div className="animate-fade-in delay-700">
          <CTASection />
        </div>
        
        <div className="animate-fade-in delay-800">
          <Footer />
        </div>
        
        <WhatsAppFloatingButton />
      </div>
    </div>
  );
};

export default Index;
