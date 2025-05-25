import React from 'react';
import { Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center md:justify-start space-x-3"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sun size={32} className="text-gold" />
      </motion.div>
      <div>
        <h1 className="text-2xl font-bold text-white">Weather Forecast</h1>
        <p className="text-sm text-gray-300">Your daily weather companion</p>
      </div>
    </motion.div>
  );
};

export default Header;