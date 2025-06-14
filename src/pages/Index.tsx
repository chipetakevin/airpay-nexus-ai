
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
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileCustomerLanding from '@/components/MobileCustomerLanding';
import WhatsAppShoppingSection from '@/components/WhatsAppShoppingSection';
import SmoothScrollNav from '@/components/SmoothScrollNav';
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
        <div id="hero">
          <HeroSection />
        </div>
        
        {/* WhatsApp Shopping Section - New addition */}
        <WhatsAppShoppingSection />
        
        <div id="features">
          <FeaturesSection />
        </div>
        <BenefitsSection />
        <StatsGrid />
        <div id="testimonials">
          <TestimonialsCarousel />
        </div>
        <CTASection />
        <div id="faq">
          <FAQSection />
        </div>
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
      <SmoothScrollNav />
    </div>
  );
};

export default Index;
