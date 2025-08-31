import React from 'react';
import { motion } from 'framer-motion';

const SecondaryButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 text-white border border-white/20 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 hover:shadow-neon-cyan transition-all duration-300 focus-visible disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default SecondaryButton; 