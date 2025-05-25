import React from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const HourlyForecast = ({ hourly, unit }) => {
  if (!hourly || hourly.length === 0) return null;
  
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  
  // Get the next 8 hours of data
  const hourlyData = hourly.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Today's Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          {hourlyData.map((hour, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              key={hour.dt}
              className="flex flex-col items-center"
            >
              <p className="text-gray-300 text-sm mb-2">
                {moment(hour.dt * 1000).format('h A')}
              </p>
              <div className="w-10 h-10 my-2">
                <WeatherIcon weatherCode={hour.weather[0].id} size="sm" />
              </div>
              <p className="text-lg font-semibold">{Math.round(hour.temp)}{tempUnit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;