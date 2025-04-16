import { cn } from '@/utils/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
	return (
		<div
			className={cn('bg-primary/10 animate-pulse rounded-lg', className)}
			{...props}
		/>
	);
};
