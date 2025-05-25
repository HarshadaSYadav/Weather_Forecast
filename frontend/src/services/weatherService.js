import axios from 'axios';

// Fetch weather data from our backend
export const fetchWeatherData = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(`https://weather-forecast-ae2y.vercel.app/api/weather?city=${encodeURIComponent(city)}&units=${unit}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request. Please try again.');
    }
  }
};

// Cache weather searches locally to reduce API calls
export const cacheWeatherData = (city, data) => {
  const cachedData = {
    timestamp: Date.now(),
    data,
  };
  
  localStorage.setItem(`weather_${city.toLowerCase()}`, JSON.stringify(cachedData));
};

// Get cached weather data if it exists and is recent (less than 30 minutes old)
export const getCachedWeatherData = (city) => {
  const cachedItem = localStorage.getItem(`weather_${city.toLowerCase()}`);
  
  if (!cachedItem) return null;
  
  try {
    const cached = JSON.parse(cachedItem);
    const thirtyMinutesInMs = 30 * 60 * 1000;
    
    // Check if cache is less than 30 minutes old
    if (Date.now() - cached.timestamp < thirtyMinutesInMs) {
      return cached.data;
    }
    
    return null;
  } catch (error) {
    return null;
  }
};
