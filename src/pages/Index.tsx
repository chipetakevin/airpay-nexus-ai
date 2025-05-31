
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryNavigation from '../components/CategoryNavigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import BenefitsSection from '../components/BenefitsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

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
    <div className="min-h-screen bg-white">
      <Header onLogoClick={handleLogoClick} showAdminLink={showAdminLink || isAdminAuthenticated} />
      <CategoryNavigation isAdminAuthenticated={isAdminAuthenticated} />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
