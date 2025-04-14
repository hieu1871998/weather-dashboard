'use client';

import { composeTailwindRenderProps } from '@/utils/react-aria';
import { forwardRef } from 'react';
import { Input as AriaInput, InputProps as AriaInputProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const inputStyles = tv({
	base: 'border-input focus:ring-ring border file:border-0 focus:ring-1 focus:outline-none',
});

export const Input = forwardRef<HTMLInputElement, AriaInputProps>((props, ref) => {
	return (
		<AriaInput
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				'file:text-foreground placeholder:text-muted-foreground flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base transition-colors outline-none file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
			)}
			ref={ref}
		/>
	);
});
Input.displayName = 'Input';
