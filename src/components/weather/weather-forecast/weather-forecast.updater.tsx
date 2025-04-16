'use client';

import { REFETCH_INTERVAL } from '@/lib/constants';
import { useEffect } from 'react';
import { revalidateWeatherForecast } from './weather-forecast.actions';

export const WeatherForecastUpdater = () => {
	useEffect(() => {
		const interval = setInterval(() => {
			revalidateWeatherForecast();
		}, REFETCH_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	return <></>;
};
