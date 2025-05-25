import express from 'express';
import { 
  getWeatherByCity, 
  get5DayForecast 
} from '../controllers/weatherController.js';

const router = express.Router();

// Routes
router.get('/', getWeatherByCity);
router.get('/forecast', get5DayForecast);

export default router;