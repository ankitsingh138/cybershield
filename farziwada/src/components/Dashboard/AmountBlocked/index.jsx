import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const AmountBlocked = ({ value, change, changeType, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <DollarSign className="w-8 h-8 text-green-400" />
        <div className="text-right">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-400' : 'text-red-400'
          }`}>
            {change}
          </span>
          <p className="text-xs text-gray-400">vs yesterday</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">Amount Blocked</p>
    </motion.div>
  );
};

export default AmountBlocked; 