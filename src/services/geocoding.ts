import { GetLocationPayload, LocationResponse } from '@/types/geocoding';
import { stringify } from 'qs';
import { Endpoint } from './endpoints';
import { fetcher } from './fetch';

export const getLocation = (payload: GetLocationPayload) => {
	const params = stringify(payload, { addQueryPrefix: true });

	return fetcher<LocationResponse>(`${Endpoint.Location}${params}`);
};
