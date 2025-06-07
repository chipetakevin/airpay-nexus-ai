
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import StatsGrid from '@/components/StatsGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsCarousel />
      <StatsGrid />
      <NewsletterSignup />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
