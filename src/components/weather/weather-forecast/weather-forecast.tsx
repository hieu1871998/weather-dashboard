import { WeatherForecast } from '@/types/weather';

interface WeatherForecastProps {
	data: WeatherForecast;
}

export const WeatherForecastSection = ({ data }: WeatherForecastProps) => {
	return (
		<section className='bg-background rounded-lg border p-4 shadow-sm'>
			<div></div>
		</section>
	);
};
