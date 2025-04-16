import { getWeatherCondition } from '@/lib/condition';
import { getIcon } from '@/lib/icons';
import { Location } from '@/types/geocoding';
import { DailyUnits, HourlyUnits, WeatherForecast } from '@/types/weather';
import { cn } from '@/utils/cn';
import dayjs from 'dayjs';
import { MapPinIcon } from 'lucide-react';
import { WeatherForecastUpdater } from './weather-forecast.updater';

interface WeatherForecastClientProps extends React.ComponentProps<'section'> {
	forecast?: WeatherForecast;
	location?: Location;
}

export const WeatherForecastSectionClient = ({
	forecast,
	location,
	className,
	...props
}: WeatherForecastClientProps) => {
	const currentWeather = forecast?.current;
	const currentUnits = forecast?.current_units;
	const hourlyWeather = forecast?.hourly;

	const hourlyForecast =
		forecast?.hourly?.temperature_2m?.map((temp, index) => ({
			temp,
			code: hourlyWeather?.weather_code?.[index],
			time: hourlyWeather?.time?.[index],
		})) ?? [];
	const hourlyUnits = forecast?.hourly_units;

	const dailyForecast =
		forecast?.daily?.temperature_2m_max?.map((temp, index) => ({
			tempMax: temp,
			tempMin: forecast?.daily?.temperature_2m_min?.[index],
			code: forecast?.daily?.weather_code?.[index],
			time: forecast?.daily?.time?.[index],
		})) ?? [];
	const dailyUnits = forecast?.daily_units;

	const Icon = getIcon(currentWeather?.weather_code, currentWeather?.is_day);

	return (
		<section
			className={cn('bg-background flex flex-col gap-5 rounded-xl border p-5', className)}
			{...props}
		>
			<div className='flex flex-col justify-between sm:flex-row'>
				<div className='flex flex-col gap-1'>
					<div className='flex items-start gap-2'>
						<Icon className='text-5xl' />
						<p className='flex items-center gap-1'>
							<span className='text-5xl font-medium'>
								{currentWeather?.temperature_2m ? Math.round(currentWeather?.temperature_2m) : 0}
							</span>
							<sup className='text-base'>{currentUnits?.temperature_2m}</sup>
						</p>
						<div className='text-xs'>
							<p>{`Precipitation: ${currentWeather?.precipitation} ${currentUnits?.precipitation}`}</p>
							<p>{`Humidity: ${currentWeather?.relative_humidity_2m} ${currentUnits?.relative_humidity_2m}`}</p>
							<p>{`Wind: ${currentWeather?.wind_speed_10m} ${currentUnits?.wind_speed_10m}`}</p>
						</div>
					</div>
					<p>{`Feels like ${currentWeather?.apparent_temperature ? Math.round(currentWeather?.apparent_temperature) : 0} ${currentUnits?.apparent_temperature}`}</p>
				</div>
				<div className='sm:text-right'>
					<p className='flex items-center justify-end gap-1'>
						<MapPinIcon className='inline text-lg' />
						<span className='text-2xl font-medium'>{location?.name}</span>
					</p>
					<p className='text-accent-foreground text-base leading-tight'>
						{dayjs(currentWeather?.time).format('dddd HH:mm')}
					</p>
					<p className='text-accent-foreground text-base leading-tight'>
						{getWeatherCondition(currentWeather?.weather_code)}
					</p>
				</div>
			</div>
			<div className='bg-muted flex h-25 w-full items-center overflow-auto rounded-lg border p-2'>
				{hourlyForecast.map(item => (
					<HourlyWeatherItem
						key={item.time}
						temp={item.temp}
						code={item.code}
						units={hourlyUnits}
						time={item.time}
					/>
				))}
			</div>
			<div className='bg-muted flex h-34 w-full items-center overflow-auto rounded-lg border p-2'>
				{dailyForecast.map(item => (
					<DailyWeatherItem
						key={item.time}
						code={item.code}
						time={item.time}
						units={dailyUnits}
						tempMax={item.tempMax}
						tempMin={item.tempMin}
					/>
				))}
			</div>
		</section>
	);
};

const HourlyWeatherItem = ({
	temp,
	time,
	units,
	code,
}: {
	temp: number;
	code?: number;
	time?: string;
	units?: Partial<HourlyUnits>;
}) => {
	const Icon = getIcon(code);

	return (
		<div className='flex min-w-12 flex-col items-center border-r p-1 last-of-type:border-none'>
			<p className='text-accent-foreground text-xs leading-tight'>{dayjs(time).format('HH:mm')}</p>
			<Icon className='mt-1' />
			<p>
				<span className='text-lg font-medium'>{Math.round(temp)}</span>
				<sup className='text-xs'>{units?.temperature_2m}</sup>
			</p>
		</div>
	);
};

interface DailyWeatherItemProps {
	tempMin?: number;
	tempMax?: number;
	time?: string;
	units?: Partial<DailyUnits>;
	code?: number;
}

const DailyWeatherItem = ({ tempMin = 0, tempMax = 0, code, time, units }: DailyWeatherItemProps) => {
	const Icon = getIcon(code);

	return (
		<div className='flex flex-col items-center gap-1 border-r px-2 py-1 last-of-type:border-none'>
			<div className='flex flex-col items-center'>
				<p className='text-sm'>{dayjs(time).format('dddd')}</p>
				<p className='text-accent-foreground text-xs'>{dayjs(time).format('DD/MM/YY')}</p>
			</div>
			<Icon className='text-3xl' />
			<p className='flex space-x-1'>
				<span className='inline-block'>
					<span className='w-5 font-semibold'>{Math.round(tempMax)}</span>
					<sup>{units?.temperature_2m_max}</sup>
				</span>
				<span className='inline-block'>
					<span>{Math.round(tempMin)}</span>
					<sup>{units?.temperature_2m_min}</sup>
				</span>
			</p>

			<WeatherForecastUpdater />
		</div>
	);
};
