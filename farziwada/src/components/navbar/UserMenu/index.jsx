import React from 'react';
import { LogOut } from 'lucide-react';
import SecondaryButton from '../../buttons/SecondaryButton';

const UserMenu = ({ onBackToHome, className = '' }) => {
  return (
    <SecondaryButton 
      onClick={onBackToHome}
      className={`px-4 py-2 ${className}`}
    >
      <LogOut className="w-4 h-4 inline mr-2" />
      Back to Home
    </SecondaryButton>
  );
};

export default UserMenu; 