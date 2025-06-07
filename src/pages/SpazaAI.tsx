
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpazaAIAssistant from '@/components/spaza/SpazaAIAssistant';

const SpazaAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SpazaAIAssistant />
      <Footer />
    </div>
  );
};

export default SpazaAI;
