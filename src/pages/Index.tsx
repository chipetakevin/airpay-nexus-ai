
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AnimatedStats from '../components/AnimatedStats';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import BenefitsSection from '../components/BenefitsSection';
import FAQSection from '../components/FAQSection';
import NewsletterSignup from '../components/NewsletterSignup';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ParticleEffects from '../components/ParticleEffects';
import SmoothScrollNav from '../components/SmoothScrollNav';

const Index = () => {
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  React.useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated');
    setIsAdminAuthenticated(adminAuth === 'true');
  }, []);

  const handleLogoClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount === 5) {
      setShowAdminLink(true);
    } else if (newCount > 5) {
      setAdminClickCount(0);
      setShowAdminLink(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <ParticleEffects />
      <SmoothScrollNav />
      
      <Header onLogoClick={handleLogoClick} showAdminLink={showAdminLink || isAdminAuthenticated} />
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <AnimatedStats />
      
      <div id="features">
        <FeaturesSection />
      </div>
      
      <div id="testimonials">
        <TestimonialsCarousel />
      </div>
      
      <BenefitsSection />
      
      <div id="faq">
        <FAQSection />
      </div>
      
      <NewsletterSignup />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
