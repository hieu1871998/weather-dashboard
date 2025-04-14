import { createLoader, parseAsFloat } from 'nuqs/server';

export const coordinatesParams = {
	latitude: parseAsFloat.withOptions({ clearOnDefault: true }),
	longitude: parseAsFloat.withOptions({ clearOnDefault: true }),
};

export const loadCoordinatesParams = createLoader(coordinatesParams);
