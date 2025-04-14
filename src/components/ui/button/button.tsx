'use client';

import { forwardRef } from 'react';
import { Button as AriaButton, ButtonProps as AriaButtonProps, composeRenderProps } from 'react-aria-components';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
	base: 'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		iconOnly: {
			true: '',
			false: '',
		},
		size: {
			default: 'h-9 px-4 py-2',
			xs: 'h-6 rounded-sm px-2 text-xs',
			sm: 'h-8 rounded-md px-3 text-xs',
			lg: 'h-10 rounded-md px-8',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
	compoundVariants: [
		{
			iconOnly: true,
			size: 'default',
			class: 'h-9 w-9',
		},
		{
			iconOnly: true,
			size: 'xs',
			class: 'h-6 w-6',
		},
		{
			iconOnly: true,
			size: 'sm',
			class: 'h-8 w-8',
		},
		{
			iconOnly: true,
			size: 'lg',
			class: 'h-10 w-10',
		},
	],
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends AriaButtonProps, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, size, ...props }, ref) => {
	return (
		<AriaButton
			{...props}
			className={composeRenderProps(props.className, (className, props) =>
				buttonVariants({ ...props, variant, size, className })
			)}
			ref={ref}
		/>
	);
});
Button.displayName = 'Button';
