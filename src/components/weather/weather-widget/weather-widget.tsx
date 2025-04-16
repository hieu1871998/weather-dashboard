'use client';

import { FilterSchema } from '@/components/core/filter-section/filter-section.schema';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { QueryKey, StorageKey } from '@/lib/constants';
import { getIcon } from '@/lib/icons';
import { getLocationById } from '@/services/geocoding';
import { DailyUnits, GetWeatherForecastPayload, WeatherForecast } from '@/types/weather';
import { useClientLocalStorage } from '@/utils/use-client-storage';
import { useSortable } from '@dnd-kit/sortable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { CloudRainIcon, DropletsIcon, GripVerticalIcon, TrashIcon, WindIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { CSSProperties } from 'react';
import { Separator } from 'react-aria-components';

interface WeatherWidgetProps {
	locationId: number;
	forecast: WeatherForecast;
	currentPayload: GetWeatherForecastPayload;
}

export const WeatherWidget = ({ forecast, locationId, currentPayload }: WeatherWidgetProps) => {
	const [, setWidgetPayloads] = useClientLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);

	const currentUnits = forecast.current_units;
	const currentWeather = forecast.current;

	// const locationId = useMemo(() => widgetPayloads[index]?.locationId, [index, widgetPayloads]);

	const dragId = `${forecast.latitude}${forecast.longitude}`;

	const { attributes, listeners, setNodeRef, transform, isDragging, isOver, setActivatorNodeRef } = useSortable({
		id: dragId,
	});

	const style = transform
		? ({
				'--translate-x': `${transform?.x ?? 0}px`,
				'--translate-y': `${transform?.y ?? 0}px`,
			} as CSSProperties)
		: undefined;

	const dailyWeather =
		forecast.daily?.temperature_2m_max?.map((temp, index) => ({
			tempMax: temp,
			tempMin: forecast.daily?.temperature_2m_min?.[index],
			code: forecast.daily?.weather_code?.[index],
			time: forecast.daily?.time?.[index],
		})) ?? [];
	const dailyUnits = forecast.daily_units;

	const { data: location, isLoading } = useQuery({
		queryKey: [QueryKey.Location, locationId],
		queryFn: () => getLocationById({ id: locationId }),
		enabled: !!locationId,
	});

	const Icon = getIcon(currentWeather?.weather_code, currentWeather?.is_day);

	const queryClient = useQueryClient();

	const handleDelete = () => {
		queryClient.setQueryData<WeatherForecast[]>([QueryKey.WeatherForecast, currentPayload], old => {
			if (Array.isArray(old)) {
				return old.filter(item => item.latitude !== forecast.latitude && item.longitude !== forecast.longitude);
			}

			return old;
		});

		setWidgetPayloads(prev => {
			const updatedPayloads = prev.filter(item => item.locationId !== locationId);

			return updatedPayloads;
		});
	};

	return (
		<motion.div
			ref={setNodeRef}
			style={style}
			layoutId={dragId}
			layout
			exit={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.3,
				ease: [0, 0.4, 0.2, 1],
			}}
			{...attributes}
			className='bg-background relative flex translate-x-[var(--translate-x)] translate-y-[var(--translate-y)] flex-col gap-2 rounded-xl border pt-3 data-dragging:z-10 data-dragging:scale-105 data-dragging:shadow-lg'
			data-dragging={isDragging ? 'true' : undefined}
			data-over={isOver ? 'true' : undefined}
		>
			<Button
				iconOnly
				size='xs'
				variant='outline'
				className='absolute -top-2 -right-2'
				onPress={handleDelete}
			>
				<TrashIcon />
			</Button>
			<div className='flex justify-between pr-4'>
				<div className='flex gap-1'>
					<button
						ref={setActivatorNodeRef}
						className='h-full cursor-grab rounded-l-xl rounded-r-none px-1'
						{...listeners}
					>
						<GripVerticalIcon />
					</button>
					<div className='flex flex-col'>
						{isLoading ? <Skeleton className='my-1 h-4 w-20' /> : <p className='font-medium'>{location?.name}</p>}
						<p className='text-accent-foreground text-xs'>{dayjs(currentWeather?.time).format('dddd, HH:mm')}</p>
						<div className='flex items-center gap-2'>
							<p>
								<span className='text-3xl font-medium'>
									{forecast.current?.temperature_2m ? Math.round(forecast.current?.temperature_2m) : 0}
								</span>
								<span className='align-top text-base'>{currentUnits?.temperature_2m}</span>
							</p>
							<Icon className='text-3xl' />
						</div>
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center justify-end gap-1 text-xs'>
						<p>
							{forecast.current?.precipitation} {currentUnits?.precipitation}
						</p>
						<CloudRainIcon className='inline' />
					</div>
					<div className='flex items-center justify-end gap-1 text-xs'>
						<p>
							{forecast.current?.relative_humidity_2m} {currentUnits?.relative_humidity_2m}
						</p>
						<DropletsIcon className='inline' />
					</div>
					<div className='flex items-center justify-end gap-1 text-xs'>
						<p>
							{forecast.current?.wind_speed_10m} {currentUnits?.wind_speed_10m}
						</p>
						<WindIcon className='inline' />
					</div>
					<p className='text-right text-xs'>{`Feels like ${forecast.current?.apparent_temperature ? Math.round(forecast.current?.apparent_temperature) : 0} ${currentUnits?.apparent_temperature}`}</p>
				</div>
			</div>
			<Separator />
			<div className='w-full px-2'>
				<div className='flex w-full overflow-auto pb-1'>
					{dailyWeather?.map(daily => (
						<WeatherWidgetDailyItem
							key={daily.time}
							tempMax={daily.tempMax}
							tempMin={daily.tempMin}
							time={daily.time}
							code={daily.code}
							units={dailyUnits}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
};

const WeatherWidgetDailyItem = ({
	tempMax = 0,
	tempMin = 0,
	time,
	code,
	units,
}: {
	tempMax?: number;
	tempMin?: number;
	time?: string;
	code?: number;
	units?: Partial<DailyUnits>;
}) => {
	const Icon = getIcon(code);

	return (
		<div className='flex flex-col items-center justify-center gap-1'>
			<p className='w-20 text-center text-xs'>{dayjs(time).format('ddd, DD/MM')}</p>
			<Icon className='text-3xl' />
			<p className='flex space-x-1'>
				<span className='inline-block text-sm'>
					<span className='w-5 font-semibold'>{Math.round(tempMax)}</span>
					<sup>{units?.temperature_2m_max}</sup>
				</span>
				<span className='inline-block text-sm'>
					<span>{Math.round(tempMin)}</span>
					<sup>{units?.temperature_2m_min}</sup>
				</span>
			</p>
		</div>
	);
};
