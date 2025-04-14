'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next';

interface ProvidersProps {
	children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	const queryClient = new QueryClient();

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</NuqsAdapter>
	);
};
