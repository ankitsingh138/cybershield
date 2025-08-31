import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const LiveTransactionFeed = ({ 
  searchQuery, 
  setSearchQuery, 
  isLive, 
  setIsLive,
  transactions = [],
  index = 0 
}) => {
  const mockTransactions = [
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
  ];

  const displayTransactions = transactions.length > 0 ? transactions : mockTransactions;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Legitimate':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'Suspicious':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'Fraudulent':
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Legitimate':
        return 'text-green-400 bg-green-400/10';
      case 'Suspicious':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Fraudulent':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
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
            {displayTransactions.map((transaction, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
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
  );
};

export default LiveTransactionFeed; 