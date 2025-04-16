import { DEFAULT_LATITUDE, DEFAULT_LOCATION_ID, DEFAULT_LONGITUDE } from '@/lib/constants';
import { createLoader, createSearchParamsCache, parseAsFloat, parseAsInteger } from 'nuqs/server';

export const filterParsers = {
	latitude: parseAsFloat.withDefault(DEFAULT_LATITUDE).withOptions({ clearOnDefault: true }),
	longitude: parseAsFloat.withDefault(DEFAULT_LONGITUDE).withOptions({ clearOnDefault: true }),
	locationId: parseAsInteger.withDefault(DEFAULT_LOCATION_ID).withOptions({ clearOnDefault: true }),
	forecast_days: parseAsInteger.withDefault(7).withOptions({ clearOnDefault: true }),
};

export const loadFilter = createLoader(filterParsers);

export const filterCache = createSearchParamsCache(filterParsers);
