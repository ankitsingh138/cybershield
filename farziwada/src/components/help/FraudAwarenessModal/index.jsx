import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, CreditCard, Smartphone, Monitor, MessageCircle } from 'lucide-react';
import AccordionItem from '../AccordionItem';

const FraudAwarenessModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState(null);

  const fraudTypes = [
    {
      id: 'online',
      title: 'Online Fraud',
      icon: Monitor,
      examples: ['Phishing emails', 'Fake shopping sites', 'Payment gateway scams'],
      prevention: ['Verify website URLs', 'Enable 2FA', "Don't share OTPs", 'Use secure payment gateways']
    },
    {
      id: 'atm',
      title: 'ATM Fraud',
      icon: CreditCard,
      examples: ['Skimming devices', 'Card trapping', 'Shoulder surfing'],
      prevention: ['Cover keypad while entering PIN', 'Avoid suspicious ATMs', 'Regularly check account statements']
    },
    {
      id: 'pos',
      title: 'POS (Point of Sale) Fraud',
      icon: CreditCard,
      examples: ['Tampered card readers', 'Duplicate receipts', 'Fake merchants'],
      prevention: ['Use contactless payments when possible', 'Check merchant legitimacy', 'Keep receipts']
    },
    {
      id: 'mobile',
      title: 'Mobile App Fraud',
      icon: Smartphone,
      examples: ['Fake apps', 'Malicious links via SMS/WhatsApp', 'Screen mirroring scams'],
      prevention: ['Download apps only from trusted stores', "Don't click unknown links", 'Keep apps updated']
    },
    {
      id: 'social',
      title: 'Social Engineering Fraud',
      icon: MessageCircle,
      examples: ['Impersonation calls (bank staff, relatives)', 'Fake loan offers', 'Lottery scams'],
      prevention: ['Never share sensitive info on calls', 'Verify caller identity', 'Remember banks never ask for OTPs/PINs']
    }
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Fraud Awareness & Prevention</h2>
                <p className="text-gray-400 text-sm">Protect yourself from common fraud schemes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-4 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-xl border border-cyan-400/20"
            >
              <p className="text-gray-300 text-center">
                This section helps you understand different types of fraud transactions and how you can protect yourself against them.
              </p>
            </motion.div>

            {/* Fraud Types Accordion */}
            <div className="space-y-4">
              {fraudTypes.map((type, index) => (
                <AccordionItem
                  key={type.id}
                  type={type}
                  isActive={activeSection === type.id}
                  onToggle={toggleSection}
                  index={index}
                />
              ))}
            </div>

            {/* Closing Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl border border-yellow-400/20 text-center"
            >
              <p className="text-yellow-400 font-semibold">
                Stay alert, verify before you trust, and report suspicious activity immediately.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FraudAwarenessModal; 