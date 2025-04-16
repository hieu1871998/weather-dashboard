'use client';

import { useEffect, useState } from 'react';

/**
 * A version of useLocalStorage that works safely with SSR
 * and follows React Hook rules (never conditional)
 */
export function useClientLocalStorage<T>(key: string, initialValue: T) {
	// Always use useState to maintain hook order consistency
	const [state, setState] = useState<T>(initialValue);
	const [isClient, setIsClient] = useState(false);

	// This effect will only run on the client after hydration
	useEffect(() => {
		setIsClient(true);

		// If we're on the client, try to get the value from localStorage
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setState(JSON.parse(item));
			}
		} catch (error) {
			console.error('Error reading from localStorage:', error);
		}
	}, [key]);

	// This function handles writing to localStorage, but only on the client
	const setStateAndStorage = (value: T | ((val: T) => T)) => {
		try {
			// Similar to useState API
			const valueToStore = value instanceof Function ? value(state) : value;
			setState(valueToStore);

			// Only attempt to use localStorage on the client
			if (isClient) {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.error('Error writing to localStorage:', error);
		}
	};

	return [state, setStateAndStorage] as const;
}
