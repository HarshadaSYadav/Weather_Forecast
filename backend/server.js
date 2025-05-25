import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';

// Load env variables
dotenv.config();

// Routes
import weatherRoutes from './routes/weatherRoutes.js';
const corsOptions = {
  origin:'https://weather-forecast-azure-one.vercel.app',// Allow the frontend domain
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };

// Middleware
app.use(cors(corsOptions));
// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Continue running even if MongoDB fails to connect
    console.log('Continuing without MongoDB...');
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again after 15 minutes',
});

// Apply rate limiting to all requests
app.use(limiter);

// Routes
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ 
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
