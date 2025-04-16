'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const router = useRouter();

	const handleReload = () => {
		router.refresh();
		resetErrorBoundary();
	};

	return (
		<div className='border-destructive bg-destructive/10 flex h-full w-full flex-col justify-center gap-5 rounded-xl border p-5'>
			<div className='flex flex-col gap-1'>
				<p className='text-destructive text-left font-medium'>Something went wrong!</p>
				<p className='text-destructive/80 wrap-anywhere'>{error.message}</p>
			</div>
			{/* <p>{error.}</p> */}
			<div className='grid grid-cols-2 gap-3'>
				<Button
					onPress={resetErrorBoundary}
					variant='outline'
				>
					Try again
				</Button>
				<Button onPress={handleReload}>Reload</Button>
			</div>
		</div>
	);
};
