
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

const SmoothScrollNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scrollToSection('hero')}
          className="bg-white/90 hover:bg-white text-gray-700 text-xs px-3 py-1"
        >
          Home
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => scrollToSection('features')}
          className="bg-white/90 hover:bg-white text-gray-700 text-xs px-3 py-1"
        >
          Features
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => scrollToSection('testimonials')}
          className="bg-white/90 hover:bg-white text-gray-700 text-xs px-3 py-1"
        >
          Reviews
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => scrollToSection('faq')}
          className="bg-white/90 hover:bg-white text-gray-700 text-xs px-3 py-1"
        >
          FAQ
        </Button>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg"
          size="sm"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default SmoothScrollNav;
