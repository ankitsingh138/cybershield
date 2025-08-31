import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from './dashboard/DashboardHeader';
import TotalTransactions from './dashboard/TotalTransactions';
import FraudDetected from './dashboard/FraudDetected';
import AmountBlocked from './dashboard/AmountBlocked';
import FalsePositives from './dashboard/FalsePositives';
import LiveTransactionFeed from './dashboard/LiveTransactionFeed';
import FraudAwarenessModal from './help/FraudAwarenessModal';

const Dashboard = ({ onBackToHome, onNavigateTo }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveTransactions, setLiveTransactions] = useState([]);
  const [isLive, setIsLive] = useState(true);

  // Mock data for KPIs
  const kpiData = [
    {
      title: 'Total Transactions',
      value: '12,847',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'text-blue-400'
    },
    {
      title: 'Fraud Detected',
      value: '89',
      change: '-5.2%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'text-red-400'
    },
    {
      title: 'Amount Blocked',
      value: '$234,567',
      change: '+23.1%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-green-400'
    },
    {
      title: 'False Positives',
      value: '23',
      change: '-8.7%',
      changeType: 'positive',
      icon: 'Target',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <DashboardHeader 
        activeTab={activeTab}
        onNavigateTo={onNavigateTo}
        onShowHelp={() => setShowHelpModal(true)}
        onBackToHome={onBackToHome}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Fraud Detection Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring and AI-powered fraud detection.</p>
        </motion.div>

        {/* Channel Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {['Online', 'ATM', 'POS', 'Mobile'].map((channel) => (
              <button
                key={channel}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                {channel}
              </button>
            ))}
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <TotalTransactions 
            value={kpiData[0].value}
            change={kpiData[0].change}
            changeType={kpiData[0].changeType}
            index={0}
          />
          <FraudDetected 
            value={kpiData[1].value}
            change={kpiData[1].change}
            changeType={kpiData[1].changeType}
            index={1}
          />
          <AmountBlocked 
            value={kpiData[2].value}
            change={kpiData[2].change}
            changeType={kpiData[2].changeType}
            index={2}
          />
          <FalsePositives 
            value={kpiData[3].value}
            change={kpiData[3].change}
            changeType={kpiData[3].changeType}
            index={3}
          />
        </motion.div>

        {/* Charts and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Fraud Detection Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Fraud Detection Trends (24h)</h3>
              <div className="text-right">
                <p className="text-sm text-gray-400">Fraud Rate</p>
                <p className="text-lg font-bold text-red-400">4.26%</p>
              </div>
            </div>
            
            {/* Enhanced Area Chart */}
            <div className="h-64 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg p-4 relative overflow-hidden border border-white/5">
              {/* Chart Background Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full flex flex-col justify-between">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="border-b border-white/10"></div>
                  ))}
                </div>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                <span>600</span>
                <span>500</span>
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-4 pb-2">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
              </div>
              
              {/* Chart Area */}
              <div className="relative h-full ml-12 mr-4 mb-8">
                {/* Legitimate Transactions Area (Green) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="legitimateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 L20,75 L40,60 L60,45 L80,35 L100,30 L100,100 L0,100 Z"
                    fill="url(#legitimateGradient)"
                  />
                  <path
                    d="M0,80 L20,75 L40,60 L60,45 L80,35 L100,30"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                
                {/* Fraudulent Transactions Area (Red) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fraudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,95 L20,90 L40,85 L60,80 L80,75 L100,70 L100,100 L0,100 Z"
                    fill="url(#fraudGradient)"
                  />
                  <path
                    d="M0,95 L20,90 L40,85 L60,80 L80,75 L100,70"
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Risk Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'High Risk', percentage: 15, color: 'bg-red-400' },
                { label: 'Medium Risk', percentage: 43, color: 'bg-yellow-400' },
                { label: 'Low Risk', percentage: 42, color: 'bg-green-400' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-white font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live Transaction Feed */}
        <LiveTransactionFeed 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLive={isLive}
          setIsLive={setIsLive}
          transactions={liveTransactions}
          index={0}
        />
      </main>

      {/* Fraud Awareness Modal */}
      <FraudAwarenessModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
};

export default Dashboard; 