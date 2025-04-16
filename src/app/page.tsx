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
		<main className='flex w-full max-w-[120rem] gap-2 py-4 transition-all duration-300'>
			<div className='3xl:grid-cols-6 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
				<Suspense fallback={<WeatherForecastSectionSkeleton className='grid-cols-1 sm:col-span-2' />}>
					<ErrorBoundary>
						<WeatherForecastSection className='row-span-2 grid-cols-1 sm:col-span-2' />
					</ErrorBoundary>
				</Suspense>
				<FilterSection />
				<WeatherWidgetSection />
			</div>
		</main>
	);
};

export default Home;
