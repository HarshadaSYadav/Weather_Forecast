import React from 'react';
import { 
  Cloud, CloudDrizzle, CloudFog, CloudLightning, 
  CloudRain, CloudSnow, Sun, CloudSun, Wind
} from 'lucide-react';

const WeatherIcon = ({ weatherCode, size = 'md' }) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };
  
  // Colors
  const sunColor = 'text-gold';
  const cloudColor = 'text-gray-300';
  const rainColor = 'text-sky';
  const snowColor = 'text-blue-100';
  const thunderColor = 'text-yellow-400';
  const fogColor = 'text-gray-400';
  
  // Map weather code to icon
  // See: https://openweathermap.org/weather-conditions
  const getWeatherIcon = () => {
    // Thunderstorm
    if (weatherCode >= 200 && weatherCode < 300) {
      return <CloudLightning className={`${sizeClasses[size]} ${thunderColor} animate-pulse-slow`} />;
    }
    // Drizzle
    else if (weatherCode >= 300 && weatherCode < 400) {
      return <CloudDrizzle className={`${sizeClasses[size]} ${rainColor} rain-drop`} />;
    }
    // Rain
    else if (weatherCode >= 500 && weatherCode < 600) {
      return <CloudRain className={`${sizeClasses[size]} ${rainColor} rain-drop`} />;
    }
    // Snow
    else if (weatherCode >= 600 && weatherCode < 700) {
      return <CloudSnow className={`${sizeClasses[size]} ${snowColor} animate-pulse-slow`} />;
    }
    // Atmosphere (fog, mist, etc)
    else if (weatherCode >= 700 && weatherCode < 800) {
      return <CloudFog className={`${sizeClasses[size]} ${fogColor} animate-pulse-slow`} />;
    }
    // Clear
    else if (weatherCode === 800) {
      return <Sun className={`${sizeClasses[size]} ${sunColor} sun-pulse`} />;
    }
    // Clouds
    else if (weatherCode === 801) {
      return <CloudSun className={`${sizeClasses[size]} ${cloudColor} cloud-float`} />;
    }
    // Cloudy
    else if (weatherCode > 801 && weatherCode < 900) {
      return <Cloud className={`${sizeClasses[size]} ${cloudColor} cloud-float`} />;
    }
    // Extreme (tornado, hurricane)
    else {
      return <Wind className={`${sizeClasses[size]} text-gray-400 animate-spin-slow`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getWeatherIcon()}
    </div>
  );
};

export default WeatherIcon;