'use client';

import { useEffect } from 'react';
import { revalidateWeatherForecast } from './weather-forecast.actions';

export const WeatherForecastUpdater = () => {
	useEffect(() => {
		const interval = setInterval(
			() => {
				revalidateWeatherForecast();
			},
			5 * 60 * 1000
		); // 5 minutes

		return () => clearInterval(interval);
	}, []);

	return <></>;
};
