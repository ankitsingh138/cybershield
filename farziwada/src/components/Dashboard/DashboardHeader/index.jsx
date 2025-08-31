import React from 'react';
import NavLogo from '../../navbar/NavLogo';
import NavLinks from '../../navbar/NavLinks';
import HelpIcon from '../../navbar/HelpIcon';
import UserMenu from '../../navbar/UserMenu';

const DashboardHeader = ({ activeTab, onNavigateTo, onShowHelp, onBackToHome }) => {
  return (
    <header className="glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <NavLogo />
            
            {/* Navigation Tabs */}
            <NavLinks activeTab={activeTab} onNavigateTo={onNavigateTo} />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <HelpIcon onClick={onShowHelp} />
            <UserMenu onBackToHome={onBackToHome} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 