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
  ChevronRight
} from 'lucide-react';
import FraudAwarenessModal from './FraudAwarenessModal';

const FraudAlerts = ({ onBackToHome, onNavigateTo }) => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Mock alerts data
  const alerts = [
    {
      id: 'TXN-56789',
      title: 'Unusual high-value online transaction',
      status: 'open',
      risk: 92,
      user: 'USR-102',
      location: 'San Francisco, USA',
      amount: '$899.99',
      date: '27/2/2025, 6:00:00 PM',
      reason: 'Unusual high-value online transaction',
      riskFactors: ['New device', 'Different IP region']
    },
    {
      id: 'TXN-67890',
      title: 'Multiple failed transactions followed by success',
      status: 'investigating',
      risk: 85,
      user: 'USR-103',
      location: 'New York, USA',
      amount: '$1,250.00',
      date: '27/2/2025, 5:30:00 PM',
      reason: 'Multiple failed transactions followed by success',
      riskFactors: ['Multiple failed attempts', 'Unusual time']
    },
    {
      id: 'TXN-78901',
      title: 'Suspicious international transfer',
      status: 'resolved',
      risk: 78,
      user: 'USR-104',
      location: 'London, UK',
      amount: '$2,500.00',
      date: '27/2/2025, 4:15:00 PM',
      reason: 'Suspicious international transfer',
      riskFactors: ['International transfer', 'High amount']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (risk) => {
    if (risk >= 90) return 'text-red-400';
    if (risk >= 70) return 'text-yellow-400';
    return 'text-green-400';
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
        {/* Fraud Alerts Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Fraud Alerts</h1>
          <p className="text-gray-400">Monitor and investigate suspicious transactions.</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              >
                <option value="All Status">All Status</option>
                <option value="Open">Open</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30">
            1 Open Alerts
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-2">Alert List</h3>
              <p className="text-gray-400 text-sm mb-6">Recent fraud detection alerts.</p>
              
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => setSelectedAlert(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedAlert === index 
                        ? 'bg-cyan-500/10 border border-cyan-500/30' 
                        : 'bg-white/3 border border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium mb-1">{alert.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{alert.id}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <span className={`text-sm font-medium ${getRiskColor(alert.risk)}`}>
                            {alert.risk}% Risk
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alert Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-2">Alert Details</h3>
              <p className="text-gray-400 text-sm mb-6">Comprehensive information about the alert.</p>
              
              {alerts[selectedAlert] && (
                <div className="space-y-6">
                  {/* Alert Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">User</p>
                        <p className="text-white font-medium">{alerts[selectedAlert].user}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium">{alerts[selectedAlert].location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Amount</p>
                        <p className="text-white font-medium">{alerts[selectedAlert].amount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Date/Time</p>
                        <p className="text-white font-medium">{alerts[selectedAlert].date}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reason */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Reason</p>
                    <p className="text-white">{alerts[selectedAlert].reason}</p>
                  </div>
                  
                  {/* Risk Factors */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Risk Factors</p>
                    <ul className="space-y-1">
                      {alerts[selectedAlert].riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <span className="text-white">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                      <span>Investigate</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-all duration-300">
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Resolved</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* User Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">User Transaction History</h3>
                  <p className="text-gray-400 text-sm">Previous transactions by {alerts[selectedAlert]?.user || 'USR-102'}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-medium text-white">Live Transaction Feed</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="text-center py-8">
                    <td colSpan="9" className="text-gray-400 py-8">
                      No transaction data available
                    </td>
                  </tr>
                </tbody>
              </table>
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

export default FraudAlerts; 