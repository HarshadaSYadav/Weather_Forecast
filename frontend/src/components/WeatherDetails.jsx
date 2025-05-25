import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, Wind, Eye, Sun, CloudRain, Thermometer 
} from 'lucide-react';

const WeatherDetails = ({ details, unit }) => {
  if (!details) return null;
  
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';
  const visibilityInKm = details.visibility / 1000;
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';
  
  const detailsData = [
    {
      icon: <Thermometer className="text-accent-danger" />,
      title: 'Feels Like',
      value: `${Math.round(details.feels_like)}°`,
    },
    {
      icon: <Droplets className="text-sky" />,
      title: 'Humidity',
      value: `${details.humidity}%`,
    },
    {
      icon: <Wind className="text-accent-info" />,
      title: 'Wind',
      value: `${Math.round(details.wind_speed)} ${windUnit}`,
    },
    {
      icon: <CloudRain className="text-accent-info" />,
      title: 'Precipitation',
      value: `${details.rain ? details.rain['1h'] : 0} mm`,
    },
    {
      icon: <Sun className="text-gold" />,
      title: 'UV Index',
      value: Math.round(details.uvi),
    },
    {
      icon: <Eye className="text-accent-success" />,
      title: 'Visibility',
      value: `${visibilityInKm} ${visibilityUnit}`,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Today's Details</h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {detailsData.map((detail, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="glass-card p-4 flex items-center"
          >
            <div className="mr-3">
              {detail.icon}
            </div>
            <div>
              <p className="text-sm text-gray-300">{detail.title}</p>
              <p className="text-lg font-semibold">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WeatherDetails;