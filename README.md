# Weather Dashboard

A modern, responsive weather dashboard application built with Next.js that provides real-time weather information and forecasts.

![Weather Dashboard](/public/weather-dashboard-preview.jpeg)

![Weather Dashboard Tablet Horizontal](/public/weather-dashboard-preview-tablet-horizontal.jpeg)

![Weather Dashboard Tablet](/public/weather-dashboard-preview-tablet.jpeg)

![Weather Dashboard Mobile](/public/weather-dashboard-preview-phone.jpeg)

## Demo

Check out the live demo: [Weather Dashboard](https://weather-dashboard-rho-beige.vercel.app/)

## Features

- **Real-time Weather Data**: Current temperature, humidity, wind speed, precipitation, and more
- **Weather Forecast**: Daily and hourly weather forecasts
- **Weather Widgets**: Drag-and-drop customizable weather widgets for multiple locations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Filter System**: Filter weather data by location and forecast days
- **Smart Auto Refresh**: Precisely timed data updates at 15-minute intervals (00, 15, 30, 45 minutes of each hour)
- **Light/Dark Mode**: Theme toggle for different viewing preferences
- **Location Search**: Search for locations to get their weather data
- **Optimized Rendering**: Efficient component rendering with React 19
- **Error Handling**: Graceful error boundaries for robust user experience

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom UI components
- **Data Fetching**: React Query with server-side caching
- **API Integration**: Open-Meteo API for weather data
- **Drag and Drop**: DND Kit for draggable weather widgets
- **Date Handling**: Day.js for date and time formatting
- **State Management**: React Hooks and Context API
- **Animation**: Motion library for smooth transitions

## Getting Started

### Prerequisites

- Node.js v18.18 or later (tested with v22.14)
- pnpm (recommended) or npm or yarn
- Modern browser with JavaScript enabled

### Dependencies

Key dependencies include:

- Next.js: ^15.3.0
- React: ^19.0.0
- TanStack Query: ^5.74.3
- Tailwind CSS: ^4
- Dnd Kit: ^6.3.1

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather-report.git
cd weather-report

# Install dependencies
pnpm install
```

### Running the Development Server

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

## Project Structure

The project follows a modular architecture with the following structure:

- `src/components/weather`: Weather-related components
- `weather-forecast`: Main forecast section with detailed weather information
- `weather-widget`: Compact weather widgets showing key metrics
- `src/components/core`: Core UI components like error boundaries and filters
- `src/components/ui`: Reusable UI components (buttons, cards, fields, etc.)
- `src/services`: API service functions for weather data and geocoding
- `src/lib`: Utilities and constants
- `src/types`: TypeScript type definitions
- `src/utils`: Helper functions

## Key Components

- **WeatherForecastSection**: Main component displaying detailed weather forecast
- **WeatherWidgetSection**: Collection of customizable weather widgets with synchronized refresh
- **FilterSection**: Allows filtering weather data by various parameters
- **WeatherForecastUpdater**: Handles automatic data refreshing

## API Integration

This project uses the [Open-Meteo API](https://open-meteo.com/), a free and open-source weather API that doesn't require API keys for standard usage.

Key endpoints used:

- Forecast: `https://api.open-meteo.com/v1/forecast`
- Geocoding: Used for location search

Weather data parameters include:

- Current weather variables: temperature, precipitation, humidity, etc.
- Daily forecast data: min/max temperatures, weather codes
- Hourly forecast: detailed temperature variations throughout the day

## Performance Optimizations

The application implements several performance optimizations:

- React Query's caching mechanism to reduce API calls
- Precise timing for data refetching to minimize unnecessary updates
- Efficient component re-rendering with React's latest features
- Memoization of expensive calculations

## Troubleshooting

Common issues and solutions:

1. **Weather data not loading**

   - Check your internet connection
   - Verify that the Open-Meteo API is available
   - Clear browser cache and refresh

2. **Location search not working**

   - Ensure you're entering valid location names
   - Try using more specific location names with country/region

3. **Widget reordering issues**
   - Make sure you're dragging from the designated drag handle area
