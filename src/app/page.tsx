import { LocationSection } from '@/components/core/location-section';
import { WeatherForecastSection } from '@/components/weather/weather-forecast';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/lib/constants';
import { getWeatherForecast } from '@/services/weather';

const Home = async ({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) => {
	const params = await searchParams;

	console.log('params: ', params);

	const payload = {
		latitude: params.latitude ? parseFloat(params.latitude) : DEFAULT_LATITUDE,
		longitude: params.longitude ? parseFloat(params.longitude) : DEFAULT_LONGITUDE,
	};

	const forecast = await getWeatherForecast(payload);
	console.log('Forecast: ', forecast);

	return (
		<main className='w-primary container w-full max-w-7xl py-6'>
			<LocationSection />
			<WeatherForecastSection data={forecast} />
		</main>
	);
};

export default Home;
