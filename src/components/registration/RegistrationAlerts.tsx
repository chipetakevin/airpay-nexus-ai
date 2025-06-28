
import React from 'react';
import CollapsibleRegistrationInfo from './CollapsibleRegistrationInfo';

interface RegistrationAlertsProps {
  location?: string;
}

const RegistrationAlerts: React.FC<RegistrationAlertsProps> = ({ location }) => {
  return <CollapsibleRegistrationInfo location={location} />;
};

export default RegistrationAlerts;
