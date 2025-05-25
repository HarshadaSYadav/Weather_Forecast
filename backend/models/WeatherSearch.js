import mongoose from 'mongoose';

const weatherSearchSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create index for efficient queries
weatherSearchSchema.index({ city: 1, timestamp: -1 });
weatherSearchSchema.index({ userId: 1, timestamp: -1 });

const WeatherSearch = mongoose.model('WeatherSearch', weatherSearchSchema);

export default WeatherSearch;