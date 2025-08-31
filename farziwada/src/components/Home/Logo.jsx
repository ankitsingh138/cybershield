import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

const Logo = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      {/* Shield Icon with Glow */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 10px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(0, 255, 255, 0.8)",
              "0 0 10px rgba(0, 255, 255, 0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <Shield className="w-8 h-8 text-cyan-400" fill="currentColor" />
        </motion.div>
        
        {/* Lightning bolt inside shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Zap className="w-4 h-4 text-white" />
        </motion.div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          FraudShield
        </motion.h1>
        <motion.p 
          className="text-xs text-gray-400 -mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Secure • Fast • Reliable
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Logo; 