'use server';

import { WEATHER_FORECAST_TAG } from '@/lib/constants';
import { revalidateTag } from 'next/cache';

export const revalidateWeatherForecast = async () => {
	revalidateTag(WEATHER_FORECAST_TAG);
};
