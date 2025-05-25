import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, city, country, unit }) => {
  if (!data) return null;
  
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const formattedDate = moment().format('dddd, MMMM D, YYYY');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center space-x-1 text-gray-300 mb-1">
        <MapPin size={18} className="text-sky" />
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-semibold text-white"
        >
          {city}, {country}
        </motion.h2>
      </div>
      
      <div className="flex items-center text-sm text-gray-300 mb-6">
        <Calendar size={14} className="mr-1" />
        <span>{formattedDate}</span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center mb-4">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-24 h-24 mr-2"
          >
            <WeatherIcon weatherCode={data.weather[0].id} size="lg" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-6xl font-bold"
          >
            {Math.round(data.temp)}{tempUnit}
          </motion.div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-8 text-left">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl capitalize"
          >
            {data.weather[0].description}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-sm text-gray-300 mt-1"
          >
            Feels like {Math.round(data.feels_like)}{tempUnit}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;