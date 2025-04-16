# Weather Dashboard

A modern, responsive weather dashboard application built with Next.js that provides real-time weather information and forecasts.

![Weather Dashboard](/public/weather-dashboard-preview.jpeg)

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
- **Auto Refresh**: Automatic data updates every 15 minutes
- **Light/Dark Mode**: Theme toggle for different viewing preferences
- **Location Search**: Search for locations to get their weather data

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom UI components
- **Data Fetching**: React Query with server-side caching
- **API Integration**: Open-Meteo API for weather data
- **Drag and Drop**: DND Kit for draggable weather widgets
- **Date Handling**: Day.js for date and time formatting
- **State Management**: React Hooks and Context API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm (recommended) or npm or yarn

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
- **WeatherWidgetSection**: Collection of customizable weather widgets
- **FilterSection**: Allows filtering weather data by various parameters
- **WeatherForecastUpdater**: Handles automatic data refreshing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
