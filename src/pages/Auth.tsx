import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Bypass auth and redirect to home page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Auth;