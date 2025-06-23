
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RicaServicesSection from '@/components/RicaServicesSection';
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
import MobileLayout from '@/components/navigation/MobileLayout';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const Index = () => {
  const { isAuthenticated } = useMobileAuth();

  return (
    <MobileLayout>
      <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-3xl rounded-3xl mx-2 mb-8 border border-white border-opacity-20 shadow-2xl overflow-hidden">
        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:block">
          <Header />
        </div>
        
        {/* Mobile Customer Experience - Only show for authenticated users */}
        {isAuthenticated && (
          <section className="p-6">
            <MobileCustomerLanding />
          </section>
        )}
        
        <main className="p-6 space-y-8">
          <div id="hero">
            <HeroSection />
          </div>
          
          {/* RICA Services Section */}
          <RicaServicesSection />
          
          {/* WhatsApp Shopping Section */}
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
        
        {/* Desktop Footer - Hidden on mobile */}
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
      
      <WhatsAppFloatingButton />
      <SmoothScrollNav />
    </MobileLayout>
  );
};

export default Index;
