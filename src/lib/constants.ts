export const DEFAULT_LATITUDE = 1.28967; // Singapore
export const DEFAULT_LONGITUDE = 103.85007; // Singapore
export const DEFAULT_LOCATION_ID = 1880252; // Singapore

export const DAILY_VARIABLES = [
	'temperature_2m_max',
	'temperature_2m_min',
	'weather_code',
	'apparent_temperature_max',
	'apparent_temperature_min',
	'sunrise',
	'sunset',
	'daylight_duration',
	'sunshine_duration',
	'uv_index_max',
	'uv_index_clear_sky_max',
	'showers_sum',
	'rain_sum',
	'snowfall_sum',
	'precipitation_sum',
	'precipitation_hours',
	'precipitation_probability_max',
	'et0_fao_evapotranspiration',
	'shortwave_radiation_sum',
	'wind_direction_10m_dominant',
	'wind_gusts_10m_max',
	'wind_speed_10m_max',
];

export const HOURLY_VARIABLES = [
	'temperature_2m',
	'relative_humidity_2m',
	'dew_point_2m',
	'precipitation',
	'precipitation_probability',
	'apparent_temperature',
	'rain',
	'showers',
	'snowfall',
	'snow_depth',
	'vapour_pressure_deficit',
	'et0_fao_evapotranspiration',
	'evapotranspiration',
	'visibility',
	'cloud_cover_high',
	'cloud_cover_mid',
	'cloud_cover_low',
	'cloud_cover',
	'surface_pressure',
	'pressure_msl',
	'weather_code',
	'wind_speed_80m',
	'wind_speed_10m',
	'wind_speed_120m',
	'wind_speed_180m',
	'wind_direction_10m',
	'wind_direction_80m',
	'wind_direction_120m',
	'wind_direction_180m',
	'wind_gusts_10m',
	'temperature_80m',
	'temperature_120m',
	'temperature_180m',
	'soil_moisture_27_to_81cm',
	'soil_moisture_9_to_27cm',
	'soil_moisture_3_to_9cm',
	'soil_moisture_1_to_3cm',
	'soil_moisture_0_to_1cm',
	'soil_temperature_54cm',
	'soil_temperature_18cm',
	'soil_temperature_6cm',
	'soil_temperature_0cm',
	'uv_index',
	'uv_index_clear_sky',
	'is_day',
];

export const CURRENT_WEATHER_VARIABLES = [
	'temperature_2m',
	'relative_humidity_2m',
	'apparent_temperature',
	'is_day',
	'snowfall',
	'showers',
	'rain',
	'precipitation',
	'weather_code',
	'cloud_cover',
	'pressure_msl',
	'surface_pressure',
	'wind_direction_10m',
	'wind_speed_10m',
	'wind_gusts_10m',
];

export enum QueryKey {
	WeatherForecast = 'weather-forecast',
	WeatherForecastByLocation = 'weather-forecast-by-location',
	Location = 'location',
}

export enum StorageKey {
	WeatherWidgetList = 'weather-widget-list',
}

export const REFETCH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const WEATHER_FORECAST_TAG = 'weather-forecast';
