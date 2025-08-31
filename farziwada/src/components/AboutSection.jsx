import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, BarChart3, Zap, Globe, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const keyFeatures = [
    'Real-time fraud detection and alerts',
    'Multi-channel coverage (Online, ATM, POS, Mobile)',
    'AI/ML-driven risk scoring system',
    'Transparent reporting and analytics',
    'Easy integration for businesses'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/20">
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
            About Our <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Fraud Detection Platform</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Introduction</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Our platform is designed to protect individuals and businesses from fraudulent transactions across multiple channels. With the rise of online payments and digital banking, fraud risks have grown significantly. We provide an AI-powered solution that continuously monitors, detects, and prevents fraudulent activities in real time.
              </p>
            </div>
          </motion.div>

          {/* Right Column - How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl mb-6">
                <Brain className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">How It Works</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                The system analyzes every transaction using advanced machine learning models. Each transaction is checked against multiple risk factors such as transaction patterns, device information, user behavior, and geolocation. Suspicious transactions are flagged instantly and can be blocked before any damage occurs. Our dashboard provides real-time monitoring, detailed fraud alerts, and actionable insights for smarter decision-making.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Key Features</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mb-6">
              <Globe className="w-10 h-10 text-black" />
            </div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We believe awareness and prevention are the first steps toward fighting fraud. Our mission is to create a safer digital transaction environment for everyone.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 