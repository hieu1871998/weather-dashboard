'use client';

import { FilterSchema } from '@/components/core/filter-section/filter-section.schema';
import { QueryKey, StorageKey } from '@/lib/constants';
import { getWeatherForecast } from '@/services/weather';
import { GetWeatherForecastPayload } from '@/types/weather';
import { reorderArray } from '@/utils/array';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { WeatherWidget } from './weather-widget';
import { WeatherWidgetSkeleton } from './weather-widget.skeleton';

export const WeatherWidgetSection = () => {
	const [widgetPayloads, setWidgetPayloads] = useLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);
	const queryClient = useQueryClient();

	// Refs to track timers and initialization across re-renders
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const hasInitializedRef = useRef(false);
	const lastPayloadRef = useRef<string>('');

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

	// Stringify payload for comparison
	const payloadString = JSON.stringify(payload);

	const { data, isLoading, refetch } = useQuery({
		queryKey: [QueryKey.WeatherForecast, payload],
		queryFn: () => getWeatherForecast(payload),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		enabled: widgetPayloads.length > 0,
	});

	console.log('widgetPayloads: ', widgetPayloads.length > 0);

	// Setup synchronized refresh with clock time
	useEffect(() => {
		// Check if payload has changed significantly enough to warrant re-initialization
		const payloadChanged = lastPayloadRef.current !== payloadString;

		// If this is a re-render with the same payload and we've already initialized, skip
		if (hasInitializedRef.current && !payloadChanged) {
			return;
		}

		// Clean up previous timer if it exists
		if (timeoutRef.current) {
			console.log('[WeatherWidgetSection] Cleaning up previous timer due to payload change');
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		// Update the last payload ref
		lastPayloadRef.current = payloadString;
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

			// Debug info to verify timing calculations
			console.log('[WeatherWidgetSection] Current time:', now.toLocaleTimeString());
			console.log('[WeatherWidgetSection] Minutes to next 15-minute mark:', minutesToNext);
			console.log('[WeatherWidgetSection] Time until next refresh:', timeToNext, 'ms');
			console.log('[WeatherWidgetSection] Next refresh at:', new Date(now.getTime() + timeToNext).toLocaleTimeString());

			return timeToNext;
		};

		// Setup recurring refresh function
		const setupRecurringRefresh = () => {
			// Perform the refetch
			console.log('[WeatherWidgetSection] Performing scheduled refresh at:', new Date().toLocaleTimeString());
			refetch();

			// Calculate time to next refresh and set up next timeout
			const timeToNext = calculateNextRefreshTime();
			timeoutRef.current = setTimeout(setupRecurringRefresh, timeToNext);
		};

		// Set timeout to align with the next 15-minute mark
		const timeToNext = calculateNextRefreshTime();
		timeoutRef.current = setTimeout(setupRecurringRefresh, timeToNext);

		return () => {
			if (timeoutRef.current) {
				console.log('[WeatherWidgetSection] Cleaning up timer on unmount');
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [payload, payloadString, refetch]); // Added refetch to dependencies

	const forecasts = data !== undefined ? (Array.isArray(data) ? data : [data]) : [];

	const mouseSensor = useSensor(MouseSensor);
	const keyboardSensor = useSensor(KeyboardSensor, {
		coordinateGetter: sortableKeyboardCoordinates,
	});
	const touchSensor = useSensor(TouchSensor);

	const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

	const sortableItems = forecasts.map(forecast => `${forecast?.latitude}${forecast?.longitude}`);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		if (activeId === overId) {
			return;
		}

		const activeIndex = sortableItems.indexOf(activeId);
		const overIndex = sortableItems.indexOf(overId);

		if (activeIndex === -1 || overIndex === -1) {
			return;
		}

		queryClient.setQueryData([QueryKey.WeatherForecast, payload], (old: unknown) => {
			if (!Array.isArray(old)) return old;
			return reorderArray(old, activeIndex, overIndex);
		});

		const newPayloads = reorderArray(widgetPayloads, activeIndex, overIndex);

		setWidgetPayloads(newPayloads);
	};

	return (
		<>
			{isLoading ? Array.from({ length: 4 }).map((_, index) => <WeatherWidgetSkeleton key={index} />) : null}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sortableItems}
					strategy={rectSortingStrategy}
				>
					<AnimatePresence>
						{forecasts.map((forecast, index) => (
							<WeatherWidget
								locationId={widgetPayloads[index]?.locationId}
								key={widgetPayloads[index]?.locationId}
								forecast={forecast}
								currentPayload={payload}
							/>
						))}
					</AnimatePresence>
				</SortableContext>
			</DndContext>
		</>
	);
};
