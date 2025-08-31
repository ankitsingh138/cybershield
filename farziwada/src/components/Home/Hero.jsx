import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Hero = ({ onGetStartedClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Real-time fraud detection
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">
            you can trust.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Detect anomalies, stop fraud, and protect your users with AI-powered insights.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary Get Started Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStartedClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-bold text-lg rounded-2xl shadow-neon-cyan hover:shadow-neon-cyan-hover transition-all duration-300 focus-visible animate-pulse-glow"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
          </motion.button>

          {/* Secondary Learn More Link */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#get-started"
            className="px-8 py-4 text-white border border-white/20 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 hover:shadow-neon-cyan transition-all duration-300 focus-visible"
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Optional: Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-gray-400 mb-4">Trusted by teams worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-40">
            {/* Placeholder logos - replace with actual logos later */}
            <div className="w-16 h-8 bg-white/20 rounded animate-pulse" />
            <div className="w-20 h-8 bg-white/20 rounded animate-pulse" />
            <div className="w-14 h-8 bg-white/20 rounded animate-pulse" />
            <div className="w-18 h-8 bg-white/20 rounded animate-pulse" />
          </div>
        </motion.div>
        
        {/* Floating security icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute text-cyan-400/20"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i % 2 * 20)}%`,
              }}
            >
              <Shield className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 