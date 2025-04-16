import { filterCache } from '@/components/core/filter-section/filter-section.params';
import { getLocationById } from '@/services/geocoding';
import { getWeatherForecast } from '@/services/weather';
import { GetWeatherForecastPayload, WeatherForecast } from '@/types/weather';
import { WeatherForecastSectionClient } from './weather-forecast.client';

type WeatherForecastSectionProps = React.ComponentProps<'section'>;

export const WeatherForecastSection = async (props: WeatherForecastSectionProps) => {
	const { latitude, locationId, longitude, forecast_days } = filterCache.all();

	const location = await getLocationById({ id: locationId });

	const payload: GetWeatherForecastPayload = {
		latitude: [latitude],
		longitude: [longitude],
		current: [
			'temperature_2m',
			'apparent_temperature',
			'precipitation',
			'relative_humidity_2m',
			'wind_speed_10m',
			'weather_code',
			'is_day',
		],
		hourly: ['temperature_2m', 'apparent_temperature', 'weather_code', 'rain'],
		daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code', 'rain_sum'],
		forecast_days,
		timezone: 'auto',
		temporal_resolution: 'hourly_1',
		forecast_hours: 24,
	};

	const forecast = await getWeatherForecast(payload);

	return (
		<WeatherForecastSectionClient
			forecast={forecast as WeatherForecast}
			location={location}
			{...props}
		/>
	);
};
