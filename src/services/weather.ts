import { GetWeatherForecastPayload, WeatherForecast } from '@/types/weather';
import { stringify } from 'qs';
import { fetcher } from './fetch';

const WEATHER_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherForecast = async (payload: GetWeatherForecastPayload) => {
	const params = stringify(payload, { addQueryPrefix: true, arrayFormat: 'comma' });

	return fetcher<WeatherForecast | WeatherForecast[]>(`${WEATHER_FORECAST_URL}${params}`);
};
