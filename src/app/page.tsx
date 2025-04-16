import { ErrorBoundary } from '@/components/core/error-boundary';
import { FilterSection } from '@/components/core/filter-section';
import { filterCache } from '@/components/core/filter-section/filter-section.params';
import { WeatherForecastSection } from '@/components/weather/weather-forecast';
import { WeatherForecastSectionSkeleton } from '@/components/weather/weather-forecast/weather-forecast.skeleton';
import { WeatherWidgetSection } from '@/components/weather/weather-widget/weather-widget.section';
import { Suspense } from 'react';

const Home = async ({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) => {
	await filterCache.parse(searchParams);

	return (
		<main className='container flex w-full gap-2 py-2'>
			<div className='grid h-fit w-full gap-2 2xl:grid-cols-6'>
				<Suspense fallback={<WeatherForecastSectionSkeleton className='col-span-2' />}>
					<ErrorBoundary>
						<WeatherForecastSection className='col-span-2 row-span-2' />
					</ErrorBoundary>
				</Suspense>
				<FilterSection />
				<WeatherWidgetSection />
			</div>
		</main>
	);
};

export default Home;
