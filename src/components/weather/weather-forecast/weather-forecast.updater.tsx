'use client';

import { REFETCH_INTERVAL } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import { revalidateWeatherForecast } from './weather-forecast.actions';

export const WeatherForecastUpdater = () => {
	// Use refs to track intervals/timeouts across renders
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const hasInitializedRef = useRef(false);

	useEffect(() => {
		// Skip if already initialized to prevent duplicate timers on re-renders
		if (hasInitializedRef.current) {
			return;
		}

		hasInitializedRef.current = true;

		// Calculate time until next 15-minute mark
		const calculateNextRefreshTime = () => {
			const now = new Date();
			const minutes = now.getMinutes();
			const seconds = now.getSeconds();
			const milliseconds = now.getMilliseconds();

			// Calculate minutes until next 15-minute mark (0, 15, 30, 45)
			const minutesToNext = 15 - (minutes % 15);

			// Convert everything to milliseconds
			const timeToNext = minutesToNext * 60 * 1000 - seconds * 1000 - milliseconds;

			// Add 5 seconds delay to account for server data mismatch
			return timeToNext + 5000;
		};

		// Calculate time to next 15-minute mark
		const timeToNext = calculateNextRefreshTime();

		// Set timeout to align with the next 15-minute mark
		timeoutRef.current = setTimeout(() => {
			revalidateWeatherForecast();

			// Once aligned, use interval that's synchronized with clock
			intervalRef.current = setInterval(() => {
				revalidateWeatherForecast();
			}, REFETCH_INTERVAL);
		}, timeToNext);

		// Clear both timeout and interval on unmount
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
		// Empty dependency array ensures this only runs once on mount
	}, []);

	return <></>;
};
