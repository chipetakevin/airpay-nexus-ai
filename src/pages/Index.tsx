
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
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsCarousel />
      <StatsGrid />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
