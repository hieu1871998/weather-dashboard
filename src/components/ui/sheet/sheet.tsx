'use client';

import { XIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import { Modal, ModalOverlay, Text } from 'react-aria-components';
import { Button } from '../button';

const SheetOverlay = forwardRef<
	React.ComponentRef<typeof ModalOverlay>,
	React.ComponentPropsWithoutRef<typeof ModalOverlay>
>(({ className, ...props }, ref) => (
	<ModalOverlay
		className={cn(
			'entering:animate-in exiting:animate-out exiting:fade-out-0 entering:fade-in-0 fixed inset-0 z-50 bg-black/80',
			className
		)}
		{...props}
		ref={ref}
	/>
));
SheetOverlay.displayName = 'SheetOverlay';

const sheetVariants = tv({
	base: 'bg-background entering:animate-in exiting:animate-out exiting:duration-300 entering:duration-500 fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out',
	variants: {
		side: {
			top: 'exiting:slide-out-to-top entering:slide-in-from-top inset-x-0 top-0 border-b',
			bottom: 'exiting:slide-out-to-bottom entering:slide-in-from-bottom inset-x-0 bottom-0 border-t',
			left: 'exiting:slide-out-to-left entering:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
			right:
				'exiting:slide-out-to-right entering:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
		},
	},
	defaultVariants: {
		side: 'right',
	},
});

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof Modal>, VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<React.ComponentRef<typeof Modal>, SheetContentProps>(
	({ side = 'right', className, children, ...props }, ref) => (
		<SheetOverlay>
			<Modal
				ref={ref}
				className={cn(sheetVariants({ side }), className)}
				{...props}
			>
				{values => (
					<>
						<Button
							className='ring-offset-background focus:ring-ring entering:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'
							size='icon'
							variant='ghost'
						>
							<XIcon className='h-4 w-4' />
							<span className='sr-only'>Close</span>
						</Button>
						{typeof children === 'function' ? children(values) : children}
					</>
				)}
			</Modal>
		</SheetOverlay>
	)
);
SheetContent.displayName = 'SheetContent';

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
		{...props}
	/>
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
		{...props}
	/>
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef<React.ComponentRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
	({ className, ...props }, ref) => (
		<Text
			ref={ref}
			className={cn('text-foreground text-lg font-semibold', className)}
			{...props}
		/>
	)
);
SheetTitle.displayName = Text.displayName;

const SheetDescription = forwardRef<React.ComponentRef<typeof Text>, React.ComponentPropsWithoutRef<typeof Text>>(
	({ className, ...props }, ref) => (
		<Text
			ref={ref}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
);
SheetDescription.displayName = Text.displayName;

export { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle };
