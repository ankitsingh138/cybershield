import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const AccordionItem = ({ 
  type, 
  isActive, 
  onToggle, 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
    >
      <button
        onClick={() => onToggle(type.id)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg">
            <type.icon className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-semibold text-white">{type.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-cyan-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10"
          >
            <div className="p-4 space-y-4">
              {/* Examples */}
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Common Examples
                </h4>
                <ul className="space-y-1">
                  {type.examples.map((example, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Prevention Tips
                </h4>
                <ul className="space-y-1">
                  {type.prevention.map((tip, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccordionItem; 