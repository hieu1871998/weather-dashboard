import { Skeleton } from '@/components/ui/skeleton';

export const WeatherWidgetSkeleton = () => {
	return (
		<div className='bg-background rounded-xl border px-4 pt-3'>
			<div className='flex justify-between'>
				<div className='flex flex-col gap-1'>
					<div className='flex justify-between'>
						<div className='flex flex-col gap-1'>
							<Skeleton className='h-4 w-20' />
							<Skeleton className='h-3 w-30' />
						</div>
					</div>
					<div className='flex gap-2'>
						<Skeleton className='h-10 w-10' />
						<Skeleton className='h-10 w-10' />
					</div>
				</div>
				<div className='flex flex-col items-end gap-1'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-3 w-14' />
					<Skeleton className='h-3 w-24' />
					<Skeleton className='h-3 w-28' />
				</div>
			</div>
		</div>
	);
};
