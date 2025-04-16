export const OPENMETEO_API_URL = 'https://api.open-meteo.com';
export const OPENMETEO_GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export enum Endpoint {
	Locations = 'https://geocoding-api.open-meteo.com/v1/search',
	Location = 'https://geocoding-api.open-meteo.com/v1/get',
	WeatherForecast = 'https://api.open-meteo.com/v1/forecast',
}
