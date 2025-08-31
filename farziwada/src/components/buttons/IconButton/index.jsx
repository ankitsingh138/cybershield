import React from 'react';
import { motion } from 'framer-motion';

const IconButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button',
  size = 'md',
  variant = 'default',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const variantClasses = {
    default: 'text-gray-400 hover:text-white transition-colors',
    primary: 'text-cyan-400 hover:text-cyan-300 transition-colors',
    danger: 'text-red-400 hover:text-red-300 transition-colors'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} ${variantClasses[variant]} hover:bg-white/5 rounded-lg transition-all duration-300 focus-visible disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default IconButton; 