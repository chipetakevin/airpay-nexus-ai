
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import StatsGrid from '@/components/StatsGrid';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileCustomerLanding from '@/components/MobileCustomerLanding';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const Index = () => {
  const { isAuthenticated } = useMobileAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Mobile Customer Experience - Only show for authenticated users */}
      {isAuthenticated && (
        <section className="container mx-auto px-4 py-8">
          <MobileCustomerLanding />
        </section>
      )}
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <StatsGrid />
        <TestimonialsCarousel />
        <CTASection />
        <FAQSection />
        <NewsletterSignup />
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
