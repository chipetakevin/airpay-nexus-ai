
import React from 'react';
import CustomerRegistrationForm from './registration/CustomerRegistration';

// Main export component that wraps the registration form
const CustomerRegistration = () => {
  return (
    <div className="w-full">
      <CustomerRegistrationForm />
    </div>
  );
};

export default CustomerRegistration;
