'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { useState } from 'react';

interface ProvidersProps {
	children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute='class'
					enableSystem
					defaultTheme='system'
				>
					{children}
				</ThemeProvider>
			</QueryClientProvider>
		</NuqsAdapter>
	);
};
