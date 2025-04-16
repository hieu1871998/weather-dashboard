import { FilterSchema } from '@/components/core/filter-section/filter-section.schema';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { QueryKey, StorageKey } from '@/lib/constants';
import { getIcon } from '@/lib/icons';
import { getLocationById } from '@/services/geocoding';
import { DailyUnits, WeatherForecast } from '@/types/weather';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { CloudRainIcon, DropletsIcon, TrashIcon, WindIcon } from 'lucide-react';
import { Separator } from 'react-aria-components';

interface WeatherWidgetProps {
	index: number;
	forecast: WeatherForecast;
}

export const WeatherWidget = ({ forecast, index }: WeatherWidgetProps) => {
	const [widgetPayloads, setWidgetPayloads] = useLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);

	const currentWeather = forecast.current;
	const currentUnits = forecast.current_units;

	const dailyWeather =
		forecast.daily?.temperature_2m_max?.map((temp, index) => ({
			tempMax: temp,
			tempMin: forecast.daily?.temperature_2m_min?.[index],
			code: forecast.daily?.weather_code?.[index],
			time: forecast.daily?.time?.[index],
		})) ?? [];
	const dailyUnits = forecast.daily_units;

	const locationId = widgetPayloads[index]?.locationId;

	const { data: location, isLoading } = useQuery({
		queryKey: [QueryKey.Location, locationId],
		queryFn: () => getLocationById({ id: locationId }),
		enabled: !!locationId,
	});

	const Icon = getIcon(currentWeather?.weather_code, currentWeather?.is_day);

	const queryClient = useQueryClient();

	const handleDelete = () => {
		setWidgetPayloads(prev => {
			const updatedPayloads = prev.filter(item => item.locationId !== locationId);

			return updatedPayloads;
		});

		queryClient.invalidateQueries({
			queryKey: [QueryKey.WeatherForecast],
		});
	};

	return (
		<div className='bg-background relative flex flex-col gap-2 rounded-xl border px-4 pt-3'>
			<Button
				iconOnly
				size='xs'
				variant='outline'
				className='absolute -top-2 -right-2'
				onPress={handleDelete}
			>
				<TrashIcon />
			</Button>
			<div className='flex justify-between'>
				<div className='flex flex-col'>
					{isLoading ? <Skeleton className='my-1 h-4 w-20' /> : <p>{location?.name}</p>}
					<p className='text-accent-foreground text-xs'>{dayjs(currentWeather?.time).format('dddd, HH:mm')}</p>
					<div className='flex items-center gap-2'>
						<p>
							<span className='text-4xl font-medium'>
								{forecast.current?.temperature_2m ? Math.round(forecast.current?.temperature_2m) : 0}
							</span>
							<span className='align-top text-base'>{currentUnits?.temperature_2m}</span>
						</p>
						<Icon className='text-4xl' />
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center justify-end gap-1 text-sm'>
						<p>
							{forecast.current?.precipitation} {currentUnits?.precipitation}
						</p>
						<CloudRainIcon className='inline' />
					</div>
					<div className='flex items-center justify-end gap-1 text-sm'>
						<p>
							{forecast.current?.relative_humidity_2m} {currentUnits?.relative_humidity_2m}
						</p>
						<DropletsIcon className='inline' />
					</div>
					<div className='flex items-center justify-end gap-1 text-sm'>
						<p>
							{forecast.current?.wind_speed_10m} {currentUnits?.wind_speed_10m}
						</p>
						<WindIcon className='inline' />
					</div>
					<p className='text-right text-sm'>{`Feels like ${forecast.current?.apparent_temperature ? Math.round(forecast.current?.apparent_temperature) : 0} ${currentUnits?.apparent_temperature}`}</p>
				</div>
			</div>
			<Separator />
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
		<div className='flex flex-col items-center gap-1 px-2'>
			<div className='flex flex-col items-center'>
				<p className='text-sm'>{dayjs(time).format('dddd')}</p>
				<p className='text-accent-foreground text-xs'>{dayjs(time).format('DD/MM/YY')}</p>
			</div>
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
