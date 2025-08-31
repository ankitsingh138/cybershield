import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Target,
  Bell,
  HelpCircle,
  LogOut,
  Search,
  Activity,
  BarChart3,
  Users,
  Eye,
  EyeOff,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = ({ onBackToHome, onNavigateTo }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
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
      icon: Activity,
      color: 'text-blue-400'
    },
    {
      title: 'Fraud Detected',
      value: '89',
      change: '-5.2%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      title: 'Amount Blocked',
      value: '$234,567',
      change: '+23.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'False Positives',
      value: '23',
      change: '-8.7%',
      changeType: 'positive',
      icon: Target,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-white">FraudGuard</h1>
                  <p className="text-xs text-gray-400">AI Powered</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex space-x-1 ml-8">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Activity },
                  { id: 'alerts', label: 'Fraud Alerts', icon: AlertTriangle },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
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
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={onBackToHome}
                className="px-4 py-2 text-white border border-white/20 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

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
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    kpi.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {kpi.change}
                  </span>
                  <p className="text-xs text-gray-400">vs yesterday</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{kpi.value}</h3>
              <p className="text-gray-400 text-sm">{kpi.title}</p>
            </motion.div>
          ))}
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
                      <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)" />
                      <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 L5,75 L10,70 L15,65 L20,60 L25,55 L30,50 L35,45 L40,40 L45,35 L50,30 L55,35 L60,40 L65,45 L70,50 L75,55 L80,60 L85,65 L90,70 L95,75 L100,80 L100,100 L0,100 Z"
                    fill="url(#legitimateGradient)"
                    stroke="rgba(34, 197, 94, 0.6)"
                    strokeWidth="0.5"
                  />
                </svg>
                
                {/* Fraudulent Transactions Area (Red) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fraudulentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 L5,78 L10,76 L15,74 L20,72 L25,70 L30,68 L35,66 L40,64 L45,62 L50,60 L55,62 L60,64 L65,66 L70,68 L75,70 L80,72 L85,74 L90,76 L95,78 L100,80 L100,100 L0,100 Z"
                    fill="url(#fraudulentGradient)"
                    stroke="rgba(239, 68, 68, 0.5)"
                    strokeWidth="0.5"
                  />
                </svg>
                
                                 {/* Data Points */}
                 <div className="absolute inset-0 flex items-end justify-between px-2 pb-8">
                   {[80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75].map((height, i) => (
                     <motion.div
                       key={i}
                       initial={{ height: 0 }}
                       animate={{ height: `${height}%` }}
                       transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                       className="w-1 bg-green-400 rounded-full"
                     />
                   ))}
                 </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-gray-300">Legitimate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span className="text-gray-300">Fraudulent</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Risky Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Top Risky Users</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 'USR12345', transactions: 15, fraudScore: 95, riskLevel: 'High Risk' },
                { id: 'USR67890', transactions: 8, fraudScore: 88, riskLevel: 'High Risk' },
                { id: 'USR11111', transactions: 12, fraudScore: 72, riskLevel: 'Medium Risk' },
                { id: 'USR22222', transactions: 6, fraudScore: 68, riskLevel: 'Medium Risk' },
                { id: 'USR33333', transactions: 9, fraudScore: 65, riskLevel: 'Medium Risk' }
              ].map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-white/3 rounded-lg border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.id}</p>
                      <p className="text-gray-400 text-sm">{user.transactions} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{user.fraudScore}%</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      user.riskLevel === 'High Risk' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {user.riskLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live Transaction Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm"
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-white">Live Transaction Feed</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Live</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isLive 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  {isLive ? 'Live' : 'Paused'}
                </button>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/3">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Old Balance Orig</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">New Balance Orig</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Old Balance Dest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">New Balance Dest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  {
                    from: 'USR-001',
                    to: 'USR-002',
                    amount: '$1,250.00',
                    type: 'Transfer',
                    oldBalanceOrig: '$5,000.00',
                    newBalanceOrig: '$3,750.00',
                    oldBalanceDest: '$2,500.00',
                    newBalanceDest: '$3,750.00',
                    status: 'Legitimate',
                    time: '2 min ago'
                  },
                  {
                    from: 'USR-003',
                    to: 'USR-004',
                    amount: '$3,450.00',
                    type: 'Payment',
                    oldBalanceOrig: '$8,200.00',
                    newBalanceOrig: '$4,750.00',
                    oldBalanceDest: '$1,100.00',
                    newBalanceDest: '$4,550.00',
                    status: 'Suspicious',
                    time: '5 min ago'
                  },
                  {
                    from: 'USR-005',
                    to: 'USR-006',
                    amount: '$890.00',
                    type: 'Transfer',
                    oldBalanceOrig: '$3,100.00',
                    newBalanceOrig: '$2,210.00',
                    oldBalanceDest: '$4,500.00',
                    newBalanceDest: '$5,390.00',
                    status: 'Legitimate',
                    time: '8 min ago'
                  }
                ].map((transaction, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.oldBalanceOrig}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.newBalanceOrig}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.oldBalanceDest}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.newBalanceDest}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'Legitimate' 
                          ? 'text-green-400 bg-green-400/10'
                          : transaction.status === 'Suspicious'
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-red-400 bg-red-400/10'
                      }`}>
                        {transaction.status === 'Legitimate' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {transaction.status === 'Suspicious' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {transaction.status === 'Fraudulent' && <XCircle className="w-3 h-3 mr-1" />}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {transaction.time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard; 