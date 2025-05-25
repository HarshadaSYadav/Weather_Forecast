import React, { useState } from 'react';
import { Search, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, toggleUnit, unit }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name..."
            className="glass-input w-full py-3 px-4 pl-10 text-white placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn-primary flex items-center justify-center"
        >
          <Search size={20} className="mr-1" /> Search
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={toggleUnit}
          className="glass-card px-4 py-2 text-white flex items-center justify-center hover:bg-navy"
          title="Toggle temperature unit"
        >
          <RotateCw size={16} className="mr-1" /> {unit === 'metric' ? '°C' : '°F'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;