import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Target,
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
  AlertCircle,
  Filter,
  MapPin,
  User,
  Calendar,
  PieChart,
  LineChart,
  TrendingDown,
  Zap
} from 'lucide-react';
import FraudAwarenessModal from './FraudAwarenessModal';

const Analytics = ({ onBackToHome, onNavigateTo }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('fraud-rate');

  // Mock analytics data
  const analyticsData = {
    fraudRate: {
      current: 4.26,
      previous: 5.12,
      change: -16.8,
      trend: 'down'
    },
    totalAlerts: {
      current: 156,
      previous: 142,
      change: 9.9,
      trend: 'up'
    },
    avgResponseTime: {
      current: '2.3s',
      previous: '3.1s',
      change: -25.8,
      trend: 'down'
    },
    accuracy: {
      current: 98.7,
      previous: 97.2,
      change: 1.5,
      trend: 'up'
    }
  };

  // Mock chart data
  const fraudTrendData = [
    { date: 'Mon', fraud: 12, legitimate: 288 },
    { date: 'Tue', fraud: 8, legitimate: 312 },
    { date: 'Wed', fraud: 15, legitimate: 285 },
    { date: 'Thu', fraud: 11, legitimate: 289 },
    { date: 'Fri', fraud: 18, legitimate: 282 },
    { date: 'Sat', fraud: 14, legitimate: 286 },
    { date: 'Sun', fraud: 9, legitimate: 291 }
  ];

  const channelData = [
    { channel: 'Online', fraud: 45, legitimate: 855 },
    { channel: 'Mobile', fraud: 32, legitimate: 768 },
    { channel: 'ATM', fraud: 18, legitimate: 432 },
    { channel: 'POS', fraud: 12, legitimate: 324 }
  ];

  const riskDistribution = [
    { risk: 'High', count: 23, percentage: 15 },
    { risk: 'Medium', count: 67, percentage: 43 },
    { risk: 'Low', count: 66, percentage: 42 }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = (trend, change) => {
    if (trend === 'up') {
      return change > 0 ? 'text-green-400' : 'text-red-400';
    }
    return change < 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
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
              <button 
                onClick={() => setShowHelpModal(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                title="Fraud Awareness Guide"
              >
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
        {/* Analytics Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h1>
          <p className="text-gray-400">Comprehensive fraud detection analytics and performance metrics.</p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
              {['1d', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedTimeRange === range
                      ? 'bg-cyan-500 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {Object.entries(analyticsData).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  key === 'fraudRate' ? 'bg-red-500/20' :
                  key === 'totalAlerts' ? 'bg-yellow-500/20' :
                  key === 'avgResponseTime' ? 'bg-blue-500/20' :
                  'bg-green-500/20'
                }`}>
                  {key === 'fraudRate' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                  {key === 'totalAlerts' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                  {key === 'avgResponseTime' && <Clock className="w-5 h-5 text-blue-400" />}
                  {key === 'accuracy' && <Target className="w-5 h-5 text-green-400" />}
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor(data.trend, data.change)}`}>
                    {getTrendIcon(data.trend)}
                    <span>{data.change > 0 ? '+' : ''}{data.change}%</span>
                  </div>
                  <p className="text-xs text-gray-400">vs previous</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {key === 'fraudRate' ? `${data.current}%` :
                 key === 'avgResponseTime' ? data.current :
                 key === 'accuracy' ? `${data.current}%` :
                 data.current.toLocaleString()}
              </h3>
              <p className="text-gray-400 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Fraud Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Fraud Trends</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span className="text-gray-300">Fraudulent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-gray-300">Legitimate</span>
                </div>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {fraudTrendData.map((day, index) => (
                <div key={day.date} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full flex flex-col-reverse space-y-1">
                    {/* Legitimate transactions */}
                    <div 
                      className="bg-green-400/60 rounded-t"
                      style={{ height: `${(day.legitimate / 400) * 100}%` }}
                    />
                    {/* Fraudulent transactions */}
                    <div 
                      className="bg-red-400/80 rounded-t"
                      style={{ height: `${(day.fraud / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{day.date}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Risk Distribution</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={item.risk} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      item.risk === 'High' ? 'bg-red-400' :
                      item.risk === 'Medium' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`} />
                    <span className="text-white font-medium">{item.risk} Risk</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{item.count}</p>
                    <p className="text-gray-400 text-sm">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Channel Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Fraud by Channel</h3>
          
          <div className="space-y-4">
            {channelData.map((channel, index) => {
              const total = channel.fraud + channel.legitimate;
              const fraudPercentage = ((channel.fraud / total) * 100).toFixed(1);
              
              return (
                <div key={channel.channel} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 text-white font-medium">{channel.channel}</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-red-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${fraudPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{channel.fraud}</p>
                    <p className="text-gray-400 text-sm">{fraudPercentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Top Performance Metrics */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-6">Performance Insights</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-white">Detection Speed</span>
                </div>
                <span className="text-green-400 font-medium">2.3s avg</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Accuracy Rate</span>
                </div>
                <span className="text-blue-400 font-medium">98.7%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Blocked Amount</span>
                </div>
                <span className="text-cyan-400 font-medium">$234K</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts Summary */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Alerts Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">High Value Transaction</p>
                    <p className="text-gray-400 text-sm">TXN-56789</p>
                  </div>
                </div>
                <span className="text-red-400 text-sm">92% Risk</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Multiple Failed Attempts</p>
                    <p className="text-gray-400 text-sm">TXN-67890</p>
                  </div>
                </div>
                <span className="text-yellow-400 text-sm">85% Risk</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Legitimate Transaction</p>
                    <p className="text-gray-400 text-sm">TXN-12345</p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">12% Risk</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Fraud Awareness Modal */}
      <FraudAwarenessModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
};

export default Analytics; 