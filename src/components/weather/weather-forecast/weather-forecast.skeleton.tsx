import { Skeleton, SkeletonProps } from '@/components/ui/skeleton';
import { cn } from '@/utils/cn';

export const WeatherForecastSectionSkeleton = ({ className, ...props }: SkeletonProps) => {
	return (
		<div className={cn('bg-background flex flex-col gap-5 rounded-xl border p-5 shadow', className)}>
			<div className='flex gap-2'>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						<Skeleton
							className={cn('h-12 w-12', className)}
							{...props}
						/>
						<div className='flex gap-1'>
							<Skeleton
								className={cn('h-12 w-12', className)}
								{...props}
							/>
							<Skeleton
								className={cn('h-4 w-4', className)}
								{...props}
							/>
						</div>
					</div>
					<Skeleton
						className={cn('h-4 w-40', className)}
						{...props}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<Skeleton
						className={cn('h-4 w-30', className)}
						{...props}
					/>
					<Skeleton
						className={cn('h-4 w-30', className)}
						{...props}
					/>
					<Skeleton
						className={cn('h-4 w-30', className)}
						{...props}
					/>
				</div>
			</div>

			<Skeleton
				className={cn('h-20 w-full', className)}
				{...props}
			/>
			<Skeleton
				className={cn('h-32 w-full', className)}
				{...props}
			/>
		</div>
	);
};
