import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const ForecastCards = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) return null;
  
  // Get yesterday, today, and tomorrow
  const yesterday = forecast[0];
  const today = forecast[1];
  const tomorrow = forecast[2];
  
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Yesterday */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-xl font-semibold text-center mb-1">Yesterday</h3>
        <p className="text-sm text-gray-300 text-center mb-4">{moment(yesterday.dt * 1000).format('MMM D')}</p>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2">
            <WeatherIcon weatherCode={yesterday.weather[0].id} />
          </div>
          <p className="text-3xl font-bold mb-2">{Math.round(yesterday.temp.day)}{tempUnit}</p>
          <p className="capitalize text-gray-300">{yesterday.weather[0].description}</p>
          <div className="flex justify-between w-full mt-4 text-sm">
            <span>Min: {Math.round(yesterday.temp.min)}°</span>
            <span>Max: {Math.round(yesterday.temp.max)}°</span>
          </div>
        </div>
      </motion.div>
      
      {/* Today */}
      <motion.div variants={item} className="glass-card-active p-6 transform scale-105">
        <h3 className="text-xl font-semibold text-center mb-1">Today</h3>
        <p className="text-sm text-gray-300 text-center mb-4">{moment(today.dt * 1000).format('MMM D')}</p>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2">
            <WeatherIcon weatherCode={today.weather[0].id} />
          </div>
          <p className="text-3xl font-bold mb-2">{Math.round(today.temp.day)}{tempUnit}</p>
          <p className="capitalize text-gray-300">{today.weather[0].description}</p>
          <div className="flex justify-between w-full mt-4 text-sm">
            <span>Min: {Math.round(today.temp.min)}°</span>
            <span>Max: {Math.round(today.temp.max)}°</span>
          </div>
        </div>
      </motion.div>
      
      {/* Tomorrow */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-xl font-semibold text-center mb-1">Tomorrow</h3>
        <p className="text-sm text-gray-300 text-center mb-4">{moment(tomorrow.dt * 1000).format('MMM D')}</p>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2">
            <WeatherIcon weatherCode={tomorrow.weather[0].id} />
          </div>
          <p className="text-3xl font-bold mb-2">{Math.round(tomorrow.temp.day)}{tempUnit}</p>
          <p className="capitalize text-gray-300">{tomorrow.weather[0].description}</p>
          <div className="flex justify-between w-full mt-4 text-sm">
            <span>Min: {Math.round(tomorrow.temp.min)}°</span>
            <span>Max: {Math.round(tomorrow.temp.max)}°</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForecastCards;