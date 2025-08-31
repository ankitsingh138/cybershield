import React from 'react';
import { motion } from 'framer-motion';

const PrimaryButton = ({ 
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
      className={`px-6 py-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-semibold rounded-2xl shadow-neon-cyan hover:shadow-neon-cyan-hover transition-all duration-300 focus-visible disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton; 