# Weather Forecast Application

A beautiful, responsive weather forecast application built with the MERN stack (MongoDB, Express, React, Node.js) that provides current weather information, 5-day forecasts, and hourly temperature data.

## Features

- City-based weather search with geolocation support
- Current weather data (temperature, conditions, humidity, wind)
- 5-day weather forecast
- Hourly temperature breakdown
- Toggle between Celsius and Fahrenheit
- Responsive design for all devices
- Error handling for invalid cities or API failures
- Weather data caching for improved performance

## Technologies Used

- **Frontend**: React, Tailwind CSS, Framer Motion for animations
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: OpenWeatherMap API
- **Other**: Axios for HTTP requests, React Query for data fetching

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running (or a MongoDB Atlas account)
- OpenWeatherMap API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm run install-all
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory based on `.env.example`
   - Add your OpenWeatherMap API key and MongoDB connection string

4. Start the development servers:
   ```
   npm run dev-all
   ```

## API Endpoints

- `GET /api/weather?city={cityName}&units={metric|imperial}` - Get current weather, forecast, and hourly data
- `GET /api/weather/forecast?city={cityName}&units={metric|imperial}` - Get 5-day forecast

> **Note:** Weather search is supported by city name only. Latitude/longitude search is not available.

## Project Structure

```
weather-forecast-app/
├── backend/               # Backend code
│   ├── controllers/       # Request handlers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   └── server.js          # Express server
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── services/          # API services
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── public/                # Static files
└── package.json           # Project configuration
```

## License

MIT