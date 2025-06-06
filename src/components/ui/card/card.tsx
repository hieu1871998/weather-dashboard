import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
		{...props}
	/>
));
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		/>
	)
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	)
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('p-6 pt-0', className)}
			{...props}
		/>
	)
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	)
);
CardFooter.displayName = 'CardFooter';
