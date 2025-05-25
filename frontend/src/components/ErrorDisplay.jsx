import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorDisplay = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 text-center max-w-md mx-auto border border-accent-danger border-opacity-50"
    >
      <AlertTriangle size={48} className="text-accent-danger mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Error</h3>
      <p className="text-gray-300">{message || 'Could not fetch weather data. Please try again.'}</p>
      <p className="mt-4 text-sm text-gray-400">Try searching for a different city or check your connection.</p>
    </motion.div>
  );
};

export default ErrorDisplay;