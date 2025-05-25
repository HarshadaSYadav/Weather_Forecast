import mongoose from 'mongoose';

const weatherCacheSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  data: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 1800, // 30 minutes in seconds
  },
});

const WeatherCache = mongoose.model('WeatherCache', weatherCacheSchema);

export default WeatherCache;