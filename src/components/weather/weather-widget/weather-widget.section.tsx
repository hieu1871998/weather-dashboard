'use client';

import { FilterSchema } from '@/components/core/filter-section/filter-section.schema';
import { QueryKey, REFETCH_INTERVAL, StorageKey } from '@/lib/constants';
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
import { useLocalStorage } from '@uidotdev/usehooks';
import { AnimatePresence } from 'motion/react';
import { useMemo } from 'react';
import { WeatherWidget } from './weather-widget';
import { WeatherWidgetSkeleton } from './weather-widget.skeleton';

export const WeatherWidgetSection = () => {
	const [widgetPayloads, setWidgetPayloads] = useLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);

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

	const { data, isLoading } = useQuery({
		queryKey: [QueryKey.WeatherForecast, payload],
		queryFn: () => getWeatherForecast(payload),
		refetchInterval: REFETCH_INTERVAL,
		placeholderData: keepPreviousData,
	});

	const forecasts = data !== undefined ? (Array.isArray(data) ? data : [data]) : [];

	const mouseSensor = useSensor(MouseSensor);
	const keyboardSensor = useSensor(KeyboardSensor, {
		coordinateGetter: sortableKeyboardCoordinates,
	});
	const touchSensor = useSensor(TouchSensor);

	const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

	const sortableItems = forecasts.map(forecast => `${forecast?.latitude}${forecast?.longitude}`);

	const queryClient = useQueryClient();

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
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={sortableItems}
				strategy={rectSortingStrategy}
			>
				{isLoading ? Array.from({ length: 4 }).map((_, index) => <WeatherWidgetSkeleton key={index} />) : null}
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
	);
};
