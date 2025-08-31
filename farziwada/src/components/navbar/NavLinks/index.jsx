import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, BarChart3 } from 'lucide-react';

const NavLinks = ({ activeTab, onNavigateTo }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Fraud Alerts', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <nav className="hidden md:flex space-x-1 ml-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            if (onNavigateTo) {
              onNavigateTo(tab.id);
            }
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavLinks; 