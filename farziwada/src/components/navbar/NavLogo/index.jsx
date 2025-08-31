import React from 'react';
import { Shield } from 'lucide-react';

const NavLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Shield className="w-8 h-8 text-cyan-400" />
      <div>
        <h1 className="text-xl font-bold text-white">FraudGuard</h1>
        <p className="text-xs text-gray-400">AI Powered</p>
      </div>
    </div>
  );
};

export default NavLogo; 