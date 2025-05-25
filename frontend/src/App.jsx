import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastCards from './components/ForecastCards';
import HourlyForecast from './components/HourlyForecast';
import WeatherDetails from './components/WeatherDetails';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData } from './services/weatherService';

function App() {
  // Set a default city (e.g., London)
  const [city, setCity] = useState('London');
  const [searchedCity, setSearchedCity] = useState('London');
  const [unit, setUnit] = useState('metric');

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setSearchedCity(searchCity);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // Fetch weather data
  const { data, isLoading, error, refetch } = useQuery(
    ['weatherData', searchedCity, unit],
    () => fetchWeatherData(searchedCity, unit),
    {
      enabled: !!searchedCity,
      refetchOnWindowFocus: false,
    }
  );

  // Refetch when unit changes
  useEffect(() => {
    if (searchedCity) {
      refetch();
    }
  }, [unit, refetch, searchedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-dark to-navy pb-10">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="mt-6 mb-8">
          <SearchBar onSearch={handleSearch} toggleUnit={toggleUnit} unit={unit} />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error.message} />
        ) : data ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <CurrentWeather data={data.current} city={data.city} country={data.country} unit={unit} />
            <ForecastCards forecast={data.forecast} unit={unit} />
            <HourlyForecast hourly={data.hourly} unit={unit} />
            <WeatherDetails details={data.current} unit={unit} />
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>Search for a city to see the weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;