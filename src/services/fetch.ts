export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options);

	if (!response.ok) {
		// Attempt to parse an error response if possible
		let errorData: unknown;
		const contentType = response.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			try {
				errorData = await response.json();
			} catch {
				errorData = await response.text();
			}
		} else {
			errorData = await response.text();
		}

		throw new Error(`Fetch error: ${response.status} ${response.statusText} — ${JSON.stringify(errorData)}`);
	}

	// Parse and return response as type T
	try {
		const data = (await response.json()) as T;
		return data;
	} catch (error) {
		throw new Error(`Failed to parse JSON: ${error}`);
	}
}
