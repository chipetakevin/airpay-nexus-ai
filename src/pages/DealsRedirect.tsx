
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DealsRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Intelligent redirect to Smart Deals tab in portal
    console.log('Redirecting from /deals to Smart Deals tab in portal');
    navigate('/portal?tab=deals', { replace: true });
  }, [navigate]);

  // Show loading state during redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-orange-800 mb-2">Redirecting to Smart Deals...</h2>
        <p className="text-orange-600">Taking you to the Smart Deals section</p>
      </div>
    </div>
  );
};

export default DealsRedirect;
