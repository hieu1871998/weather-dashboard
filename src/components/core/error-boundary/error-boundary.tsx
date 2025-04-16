'use client';

import { ErrorBoundaryProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './error-boundary.fallback';

export const ErrorBoundary = (props: Omit<ErrorBoundaryProps, 'fallback' | 'fallbackRender'>) => {
	return (
		<ReactErrorBoundary
			FallbackComponent={ErrorFallback}
			{...props}
		/>
	);
};
