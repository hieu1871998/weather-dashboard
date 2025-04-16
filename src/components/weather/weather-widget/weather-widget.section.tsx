'use client';

import { FilterSchema } from '@/components/core/filter-section/filter-section.schema';
import { QueryKey, REFETCH_INTERVAL, StorageKey } from '@/lib/constants';
import { getWeatherForecast } from '@/services/weather';
import { GetWeatherForecastPayload } from '@/types/weather';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useMemo } from 'react';
import { WeatherWidget } from './weather-widget';

export const WeatherWidgetSection = () => {
	const [widgetPayloads] = useLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);

	const payload: GetWeatherForecastPayload = useMemo(
		() => ({
			latitude: widgetPayloads.map(payload => payload.latitude),
			longitude: widgetPayloads.map(payload => payload.longitude),
			current: [
				'temperature_2m',
				'apparent_temperature',
				'precipitation',
				'relative_humidity_2m',
				'wind_speed_10m',
				'weather_code',
				'is_day',
			],
			daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code', 'rain_sum'],
			forecast_days: 7,
			timezone: 'auto',
			temporal_resolution: 'hourly_1',
			forecast_hours: 24,
		}),
		[widgetPayloads]
	);

	const { data } = useQuery({
		queryKey: [QueryKey.WeatherForecast, payload],
		queryFn: () => getWeatherForecast(payload),
		refetchInterval: REFETCH_INTERVAL,
		placeholderData: keepPreviousData,
	});

	const forecasts = data !== undefined ? (Array.isArray(data) ? data : [data]) : [];

	return (
		// <section className='grid h-fit min-w-0 flex-1 gap-2 2xl:grid-cols-3'>
		<>
			{forecasts.map((forecast, index) => (
				<WeatherWidget
					key={`${forecast?.latitude}${forecast?.longitude}`}
					forecast={forecast}
					index={index}
				/>
			))}
		</>
		// </section>
	);
};
