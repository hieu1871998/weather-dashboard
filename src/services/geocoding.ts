import { GetLocationPayload, GetLocationsPayload, Location, LocationResponse } from '@/types/geocoding';
import { stringify } from 'qs';
import { Endpoint } from './endpoints';
import { fetcher } from './fetch';

export const getLocations = (payload: GetLocationsPayload) => {
	const params = stringify(payload, { addQueryPrefix: true });

	return fetcher<LocationResponse>(`${Endpoint.Locations}${params}`);
};

export const getLocationById = (payload: GetLocationPayload) => {
	const params = stringify(payload, { addQueryPrefix: true });

	return fetcher<Location>(`${Endpoint.Location}${params}`);
};
