import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, BarChart3 } from 'lucide-react';

const SectionGetStarted = () => {
  const features = [
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Monitor transactions and user behavior in real-time with advanced AI algorithms.'
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Get immediate notifications when suspicious activity is detected.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Machine learning models that continuously improve and adapt to new threats.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting and analytics to track fraud patterns and trends.'
    }
  ];

  return (
    <section id="get-started" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">FraudShield</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive fraud detection platform combines cutting-edge AI with industry expertise to protect your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl mb-4 group-hover:shadow-neon-cyan transition-all duration-300">
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Protect Your Business?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust FraudShield to detect and prevent fraud in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-bold text-lg rounded-2xl shadow-neon-cyan hover:shadow-neon-cyan-hover transition-all duration-300 focus-visible"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white border border-white/20 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 hover:shadow-neon-cyan transition-all duration-300 focus-visible"
              >
                Schedule Demo
              </motion.button>
            </div>
            
            {/* Quick Navigation */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-4 text-center">Quick Navigation</p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#dashboard'}
                  className="px-4 py-2 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-all duration-300 text-sm"
                >
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#alerts'}
                  className="px-4 py-2 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-all duration-300 text-sm"
                >
                  Fraud Alerts
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#analytics'}
                  className="px-4 py-2 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-all duration-300 text-sm"
                >
                  Analytics
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '99.9%', label: 'Detection Rate' },
            { number: '< 100ms', label: 'Response Time' },
            { number: '10K+', label: 'Businesses Protected' },
            { number: '$2B+', label: 'Fraud Prevented' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionGetStarted; 