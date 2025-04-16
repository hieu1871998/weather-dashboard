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

			console.log(`Current time: ${now.toLocaleTimeString()}`);
			console.log(`Minutes to next 15-minute mark: ${minutesToNext}`);
			console.log(`Time until next refresh: ${timeToNext}ms (${timeToNext / 1000} seconds)`);
			console.log(`Next refresh will happen at: ${new Date(now.getTime() + timeToNext).toLocaleTimeString()}`);

			return timeToNext;
		};

		// Immediately refresh once on component mount
		console.log(`Initial refresh at: ${new Date().toLocaleTimeString()}`);
		revalidateWeatherForecast();

		// Calculate time to next 15-minute mark
		const timeToNext = calculateNextRefreshTime();

		// Set timeout to align with the next 15-minute mark
		timeoutRef.current = setTimeout(() => {
			console.log(`First aligned refresh triggered at: ${new Date().toLocaleTimeString()}`);
			revalidateWeatherForecast();

			// Once aligned, use interval that's synchronized with clock
			intervalRef.current = setInterval(() => {
				console.log(`Scheduled refresh at: ${new Date().toLocaleTimeString()}`);
				revalidateWeatherForecast();
			}, REFETCH_INTERVAL);
		}, timeToNext);

		// Clear both timeout and interval on unmount
		return () => {
			console.log('Component unmounting, cleaning up timers');
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
