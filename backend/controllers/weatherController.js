import axios from 'axios';
import dotenv from 'dotenv';
import WeatherSearch from '../models/WeatherSearch.js';

dotenv.config();

// OpenWeather API configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = process.env.OPENWEATHER_BASE_URL;

// Helper function to fetch from OpenWeather API
const fetchFromWeatherAPI = async (endpoint, params) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}${endpoint}`, {
      params: {
        ...params,
        appid: OPENWEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('OpenWeather API Error:', error.response?.data || error.message);

    if (error.response) {
      const status = error.response.status;
      let message;

      switch (status) {
        case 401:
          message = 'Invalid API key';
          break;
        case 404:
          message = 'City not found';
          break;
        case 429:
          message = 'Too many requests';
          break;
        default:
          message = `Weather API error: ${error.response.data.message || 'Unknown error'}`;
      }

      const customError = new Error(message);
      customError.statusCode = status;
      throw customError;
    } else {
      const customError = new Error('Failed to connect to weather service');
      customError.statusCode = 500;
      throw customError;
    }
  }
};

// Save search to MongoDB
const saveSearch = async (city, userId = null) => {
  try {
    const search = new WeatherSearch({
      city: city.toLowerCase(),
      userId,
      timestamp: new Date(),
    });
    await search.save();
  } catch (error) {
    // Log but don't fail if DB save fails
    console.error('Error saving search:', error);
  }
};

// Get combined weather data (current, forecast, hourly)
export const getWeatherByCity = async (req, res, next) => {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // Save search to database
    saveSearch(city);

    // Get current weather data
    const currentWeatherData = await fetchFromWeatherAPI('/weather', {
      q: city,
      units,
    });

    // Get 5-day/3-hour forecast data
    const forecastData = await fetchFromWeatherAPI('/forecast', {
      q: city,
      units,
    });

    // Format hourly data (next 8 periods, 3-hour step)
    const hourly = forecastData.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather,
    }));

    // Format daily forecast (group by date)
    const dailyMap = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = [];
      }
      dailyMap[date].push(item);
    });

    const forecast = Object.keys(dailyMap).slice(0, 3).map(date => {
      const dayItems = dailyMap[date];
      const temps = dayItems.map(i => i.main.temp);
      const min = Math.min(...dayItems.map(i => i.main.temp_min));
      const max = Math.max(...dayItems.map(i => i.main.temp_max));
      return {
        dt: dayItems[0].dt,
        temp: {
          day: temps[Math.floor(temps.length / 2)],
          min,
          max,
        },
        weather: dayItems[0].weather,
        // ...add more fields if needed
      };
    });

    const response = {
      city: currentWeatherData.name,
      country: currentWeatherData.sys.country,
      current: {
        temp: currentWeatherData.main.temp,
        feels_like: currentWeatherData.main.feels_like,
        weather: currentWeatherData.weather,
        wind_speed: currentWeatherData.wind.speed,
        humidity: currentWeatherData.main.humidity,
        visibility: currentWeatherData.visibility,
        // Add more fields if needed
      },
      hourly,
      forecast,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

// Get 5-day forecast (raw)
export const get5DayForecast = async (req, res, next) => {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const forecastData = await fetchFromWeatherAPI('/forecast', {
      q: city,
      units,
    });

    res.json(forecastData);
  } catch (error) {
    next(error);
  }
};